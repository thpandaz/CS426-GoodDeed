import { Request, Response, NextFunction } from 'express';
import CircuitBreaker from 'opossum';
import { baseLogger } from './logger.js';

const logger = baseLogger.child({ module: 'CircuitBreaker' });

// Define types for Opossum's event handlers
type OpossumSettings = {
  timeout?: number;
  errorThresholdPercentage?: number;
  resetTimeout?: number;
  rollingCountTimeout?: number;
  rollingCountBuckets?: number;
  name?: string;
  [key: string]: any; // Allow other Opossum options
};

// Since Opossum's TypeScript definitions might be incomplete or incompatible,
// we'll use a more generic approach with type assertions where needed
type CircuitBreakerInstance = {
  circuit: CircuitBreaker;
  options: ResolvedCircuitBreakerOptions;
};

export interface CircuitBreakerOptions {
  name?: string;
  timeout?: number; 
  errorThresholdPercentage?: number; 
  resetTimeout?: number; 
  rollingCountTimeout?: number; 
  rollingCountBuckets?: number; 
  healthPath?: string; 
  fallbackFn?: (req: Request, res: Response, err: Error) => void; 
  onOpen?: (name: string) => void; 
  onClose?: (name: string) => void; 
  onHalfOpen?: (name: string) => void; 
  filter?: (req: Request) => boolean; 
  opossum?: OpossumSettings;
}

// Define a resolved options interface with all properties required
export interface ResolvedCircuitBreakerOptions {
  name: string;
  timeout: number;
  errorThresholdPercentage: number;
  resetTimeout: number;
  rollingCountTimeout: number;
  rollingCountBuckets: number;
  healthPath: string;
  fallbackFn: (req: Request, res: Response, err: Error) => void;
  onOpen: (name: string) => void;
  onClose: (name: string) => void;
  onHalfOpen: (name: string) => void;
  filter: (req: Request) => boolean;
  opossum: OpossumSettings;
}

export interface CircuitBreakerRegistry {
  [key: string]: CircuitBreakerInstance;
}

const registry: CircuitBreakerRegistry = {};

const defaultFallback = (req: Request, res: Response, err: Error): void => {
  logger.warn(`Default circuit breaker fallback for ${req.method} ${req.originalUrl}`, { error: err.message });
  if (!res.headersSent) {
    res.status(503).json({
      status: 503,
      error: 'Service Unavailable',
      message: 'The service is temporarily unavailable. Please try again later.',
    });
  }
};

// Default options for the circuit breaker behavior
const baseDefaultOptions = {
  timeout: 5000,
  errorThresholdPercentage: 50,
  resetTimeout: 30000,
  rollingCountTimeout: 10000,
  rollingCountBuckets: 10,
  healthPath: '/health',
};

const getCircuitState = (circuit: CircuitBreaker): 'open' | 'closed' | 'half-open' => {
  if (circuit.opened) return 'open';
  if (circuit.halfOpen) return 'half-open';
  return 'closed';
};

export const createCircuitBreakerHealthMiddleware = (): ((req: Request, res: Response) => void) => {
  return (_req: Request, res: Response): void => {
    const circuitStates = Object.values(registry).map(({ circuit, options }) => ({
      name: options.name,
      state: getCircuitState(circuit),
      stats: circuit.stats, // Opossum's stats object
      options: {
        timeout: options.timeout,
        errorThresholdPercentage: options.errorThresholdPercentage,
        resetTimeout: options.resetTimeout,
      },
    }));

    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      circuits: circuitStates,
    });
  };
};

// Define a more specific type for the action Opossum will execute
type ProtectedAction = (req: Request, res: Response, next: NextFunction) => Promise<void>;

const protectedExpressAction: ProtectedAction = (req, res, next) => {
  return new Promise<void>((resolve, reject) => {
    const originalEnd = res.end;
    let requestFinished = false;

    const finishRequest = (error?: Error): void => {
      if (requestFinished) return;
      requestFinished = true;

      // Restore original res.end
      res.end = originalEnd;
      res.removeListener('finish', handleSuccess);
      res.removeListener('error', handleError);
      res.removeListener('close', handlePrematureClose);

      if (error) {
        reject(error);
      } else {
        // Consider HTTP status codes for success/failure
        if (res.statusCode >= 400) {
          reject(new Error(`Request failed with status code ${res.statusCode} for ${req.originalUrl}`));
        } else {
          resolve();
        }
      }
    };

    const handleSuccess = (): void => finishRequest();
    const handleError = (err: Error): void => finishRequest(err);
    const handlePrematureClose = (): void => {
        if (!res.writableEnded) { // only if response hasn't already ended
            finishRequest(new Error('Client closed request prematurely'));
        }
    };

    res.on('finish', handleSuccess);
    res.on('error', handleError);
    res.on('close', handlePrematureClose); // For client disconnects

    // Instead of trying to fully monkey-patch res.end which has complex overloads,
    // we'll just listen for the 'finish' event which is more reliable and cleaner
    // No monkey-patching of res.end needed since we already have the finish event handler
    
    next(); // Proceed with the Express chain
  });
};

export const createCircuitBreakerMiddleware = (options: CircuitBreakerOptions = {}): ((req: Request, res: Response, next: NextFunction) => void) => {
  const resolvedName = options.name || 'default_circuit';
  
  // Create a fully resolved options object with no undefined values
  const opts: ResolvedCircuitBreakerOptions = {
    name: resolvedName,
    timeout: options.timeout ?? baseDefaultOptions.timeout,
    errorThresholdPercentage: options.errorThresholdPercentage ?? baseDefaultOptions.errorThresholdPercentage,
    resetTimeout: options.resetTimeout ?? baseDefaultOptions.resetTimeout,
    rollingCountTimeout: options.rollingCountTimeout ?? baseDefaultOptions.rollingCountTimeout,
    rollingCountBuckets: options.rollingCountBuckets ?? baseDefaultOptions.rollingCountBuckets,
    healthPath: options.healthPath ?? baseDefaultOptions.healthPath,
    fallbackFn: options.fallbackFn || defaultFallback,
    onOpen: options.onOpen || ((name: string) => {}),
    onClose: options.onClose || ((name: string) => {}),
    onHalfOpen: options.onHalfOpen || ((name: string) => {}),
    filter: options.filter || (() => true),
    opossum: options.opossum || {},
  };

  if (!registry[opts.name]) {
    const opossumSettings: OpossumSettings = {
      timeout: opts.timeout,
      errorThresholdPercentage: opts.errorThresholdPercentage,
      resetTimeout: opts.resetTimeout,
      rollingCountTimeout: opts.rollingCountTimeout,
      rollingCountBuckets: opts.rollingCountBuckets,
      name: opts.name,
      ...opts.opossum,
    };

    // Create circuit with explicit type
    const circuit = new CircuitBreaker(protectedExpressAction, opossumSettings);

    // Use type assertion for fallback to handle the correct parameter types
    circuit.fallback(function(callArgs?: any, err?: Error) {
        const currentReq = callArgs?.[0];
        const currentRes = callArgs?.[1];
        const error = err || new Error('Circuit open or action failed, fallback executed.');
        
        if (currentReq && currentRes) {
            opts.fallbackFn(currentReq, currentRes, error);
        } else {
            logger.error(`Circuit '${opts.name}' fallback triggered without request context.`, { error: error.message });
        }
        return undefined;
    });

    // Add event listeners with type assertions for each event
    // open event
    circuit.on('open', function() { 
        logger.warn(`Circuit '${opts.name}' has opened.`); 
        opts.onOpen(opts.name); 
    });
    
    // close event
    circuit.on('close', function() { 
        logger.info(`Circuit '${opts.name}' has closed.`); 
        opts.onClose(opts.name); 
    });
    
    // halfOpen event
    circuit.on('halfOpen', function() { 
        logger.info(`Circuit '${opts.name}' is half-open.`); 
        opts.onHalfOpen(opts.name); 
    });
    
    // Add success event listener
    (circuit as any).on('success', function(result: any, latencyMs: number, fireArgs: any[]) {
        const req = fireArgs[0] as Request;
        logger.debug(`Circuit '${opts.name}' action succeeded for ${req?.method} ${req?.originalUrl}`, { executionTime: latencyMs });
    });
    
    // Add failure event listener
    (circuit as any).on('failure', function(error: Error, latencyMs: number, fireArgs: any[]) {
        const req = fireArgs[0] as Request;
        logger.error(`Circuit '${opts.name}' action failed for ${req?.method} ${req?.originalUrl}`, 
            { error: error.message, executionTime: latencyMs });
    });
    
    // Add timeout event listener
    (circuit as any).on('timeout', function(error: Error, latencyMs: number, fireArgs: any[]) {
        const req = fireArgs[0] as Request;
        logger.warn(`Circuit '${opts.name}' action timed out for ${req?.method} ${req?.originalUrl}`, 
            { executionTime: latencyMs });
    });
    
    // Add reject event listener
    (circuit as any).on('reject', function(error: Error, fireArgs: any[]) {
        const req = fireArgs[0] as Request;
        logger.warn(`Circuit '${opts.name}' rejected call for ${req?.method} ${req?.originalUrl} (circuit is open).`);
    });
    
    // Add fallback event listener
    (circuit as any).on('fallback', function(result: any, error: Error, fireArgs: any[]) {
        const req = fireArgs[0] as Request;
        logger.info(`Circuit '${opts.name}' fallback executed for ${req?.method} ${req?.originalUrl}.`, 
            { error: error?.message });
    });

    registry[opts.name] = { circuit, options: opts };
  }

  const { circuit: currentCircuit, options: currentOpts } = registry[opts.name];

  return (req: Request, res: Response, next: NextFunction): void => {
    if (currentOpts.healthPath && req.path === currentOpts.healthPath) {
      const healthMiddleware = createCircuitBreakerHealthMiddleware();
      return healthMiddleware(req, res);
    }

    if (!currentOpts.filter(req)) {
      return next();
    }

    currentCircuit.fire(req, res, next)
      .catch((err: unknown) => {
        if (!res.headersSent) {
            const errToLog = err instanceof Error ? err : new Error(String(err));
            logger.error(`Circuit '${currentOpts.name}' .fire() promise rejected and headers not sent for ${req.method} ${req.originalUrl}. This indicates a potential issue beyond operational fallback.`, { error: errToLog.message });
            currentOpts.fallbackFn(req, res, errToLog);
        }
      });
  };
};

export const getCircuit = (name = 'default_circuit'): CircuitBreaker | undefined => {
  return registry[name]?.circuit;
};

export const resetAllCircuitBreakers = (): void => {
  Object.values(registry).forEach(({ circuit, options }) => {
    circuit.close();
    logger.info(`Circuit '${options.name}' manually reset and closed.`);
  });
}; 