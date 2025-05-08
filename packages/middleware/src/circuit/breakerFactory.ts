import CircuitBreaker from 'opossum';
import { protectedExpressAction } from './protectedAction.js';
import type { Request, Response, NextFunction, RequestHandler } from 'express';
import { baseLogger } from '../logger.js';
import { attachLogging } from './events.js';

const logger = baseLogger.child({ module: 'CircuitBreaker' });

export interface BreakerOptions {
  name?: string;
  timeout?: number;
  errorThresholdPercentage?: number;
  resetTimeout?: number;
}

const defaultOptions: Required<BreakerOptions> = {
  name: 'default',
  timeout: 5000,
  errorThresholdPercentage: 50,
  resetTimeout: 30000,
};

// We'll use any here because of the complex typing mismatch between Opossum and Express
const registry = new Map<string, CircuitBreaker<any>>();

export function getCircuit(name = 'default'): CircuitBreaker<any> | undefined {
  return registry.get(name);
}

export function createBreaker(options: BreakerOptions = {}): { middleware: RequestHandler; circuit: CircuitBreaker<any> } {
  const opts = { ...defaultOptions, ...options };
  let circuit = registry.get(opts.name);
  
  if (!circuit) {
    // Since protectedExpressAction takes Request, Response, NextFunction and returns Promise<void>,
    // we can use it directly as the circuit's action
    circuit = new CircuitBreaker(protectedExpressAction, {
      timeout: opts.timeout,
      errorThresholdPercentage: opts.errorThresholdPercentage,
      resetTimeout: opts.resetTimeout,
      name: opts.name,
    });
    
    // Attach event logging
    attachLogging(circuit);
    
    // Define fallback function that matches the signature of protectedExpressAction
    circuit.fallback((req: Request, res: Response, _next: NextFunction) => {
      if (!res.headersSent) {
        logger.warn(`Circuit fallback triggered for ${req.method} ${req.path}`, {
          name: opts.name,
          path: req.path,
          method: req.method
        });
        res.status(503).send('Service unavailable');
      }
      return Promise.resolve();
    });

    registry.set(opts.name, circuit);
    logger.info(`Circuit '${opts.name}' registered`, {
      timeout: opts.timeout,
      errorThreshold: opts.errorThresholdPercentage,
      resetTimeout: opts.resetTimeout
    });
  }

  // Create middleware that passes the request to the circuit breaker
  const middleware: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
    try {
      // Fire the circuit with our Express handler arguments
      circuit!.fire(req, res, next)
        .catch((err: unknown) => {
          // Only pass the error to next() if headers haven't been sent
          if (!res.headersSent) {
            const error = err instanceof Error ? err : new Error(String(err));
            logger.error(`Circuit error for ${req.method} ${req.path}`, {
              name: opts.name,
              path: req.path,
              method: req.method,
              error: error.message
            });
            next(error);
          }
        });
    } catch (err) {
      // Handle any synchronous errors
      if (!res.headersSent) {
        const error = err instanceof Error ? err : new Error(String(err));
        logger.error(`Circuit synchronous error for ${req.method} ${req.path}`, {
          name: opts.name,
          path: req.path,
          method: req.method,
          error: error.message
        });
        next(error);
      }
    }
  };

  return { middleware, circuit };
}

// Utility function to reset all circuit breakers
export function resetAllCircuits(): void {
  registry.forEach((circuit, name) => {
    circuit.close();
    logger.info(`Circuit '${name}' manually reset`, {
      stats: circuit.stats
    });
  });
}
