import { Express, Request, Response, NextFunction, RequestHandler } from 'express';
import { createProxyMiddleware, Options as ProxyOptions } from 'http-proxy-middleware';
import { baseLogger, circuit, createCacheMiddleware } from '@repo/middleware';
import type { ServiceConfig, ServiceRegistry } from '../types/index.js';

const logger = baseLogger.child({ module: 'RouteSetup' });

/**
 * Set up a circuit breaker for a service if configured
 */
export function setupCircuitBreaker(service: ServiceConfig): RequestHandler | null {
  if (!service.options?.circuitBreakerOptions) {
    return null;
  }
  
  try {
    // Use imported circuit module directly
    if (!circuit || typeof circuit.createBreaker !== 'function') {
      logger.warn(`Circuit breaker middleware not available for ${service.name}`);
      return null;
    }
    
    const options = {
      name: `${service.name}-circuit`,
      ...service.options.circuitBreakerOptions
    };
    
    logger.info(`Creating circuit breaker for ${service.name}`, { options });
    return circuit.createBreaker(options).middleware;
  } catch (error) {
    logger.error(`Failed to create circuit breaker for ${service.name}`, {
      error: error instanceof Error ? error.message : String(error)
    });
    return null;
  }
}

/**
 * Set up a cache middleware for a service if configured
 */
export function setupCache(service: ServiceConfig): RequestHandler | null {
  if (!service.options?.cacheOptions) {
    return null;
  }
  
  try {
    // Use imported createCacheMiddleware directly
    if (!createCacheMiddleware || typeof createCacheMiddleware !== 'function') {
      logger.warn(`Cache middleware not available for ${service.name}`);
      return null;
    }
    
    const options = {
      prefix: `${service.name}:`,
      ...service.options.cacheOptions
    };
    
    logger.info(`Creating cache middleware for ${service.name}`, { options });
    return createCacheMiddleware(options);
  } catch (error) {
    logger.error(`Failed to create cache for ${service.name}`, {
      error: error instanceof Error ? error.message : String(error)
    });
    return null;
  }
}

/**
 * Configure service routes in the Express application
 */
export function setupRoutes(app: Express, services: ServiceConfig[], serviceRegistry: ServiceRegistry): void {
  logger.info(`Setting up routes for ${services.length} services`);
  
  services.forEach(service => {
    const { path, target, options } = service;

    const getServiceInstances = () => serviceRegistry.getInstances(service.name);
    const targetSelector = (req: Request) => {
      const instances = getServiceInstances();
      return instances[Math.floor(Math.random() * instances.length)];
    };
    
    // Create proxy middleware for this service
    const proxyOptions: ProxyOptions = {
      target,  
      changeOrigin: true,
      pathRewrite: options?.pathRewrite,
      // router: (req) => targetSelector(req), haven't deployed the instances yet
      logLevel: 'silent', // We handle our own logging
      logProvider: () => ({
        log: (msg: string) => logger.debug(msg),
        debug: (msg: string) => logger.debug(msg),
        info: (msg: string) => logger.info(msg),
        warn: (msg: string) => logger.warn(msg),
        error: (msg: string) => logger.error(msg),
      }),
      onProxyReq: (proxyReq, req, res) => {
        // Forward request ID if available
        if ((req as any).id) {
          proxyReq.setHeader('X-Request-ID', (req as any).id);
        }
        
        // Log proxied request
        logger.info(`Proxying request to ${service.name || path}`, {
          path: req.path,
          target: `${target}${req.url}`,
          method: req.method,
          service: service.name,
          requestId: (req as any).id
        });
        
        // Call custom onProxyReq if defined
        if (options?.onProxyReq) {
          options.onProxyReq(proxyReq, req, res);
        }
      },
      onProxyRes: (proxyRes, req, res) => {
        // Call custom onProxyRes if defined
        if (options?.onProxyRes) {
          options.onProxyRes(proxyRes, req, res);
        }
      },
      onError: (err, req, res, next) => {
        logger.error(`Proxy error for ${req.url}`, {
          error: err.message,
          path: req.path,
          service: service.name,
          requestId: (req as any).id,
        });
        
        // Call custom onError if defined
        if (options?.onError) {
          options.onError(err, req, res as Response, next as NextFunction);
        } else {
          // Safely check for the cause code
          const statusCode = (err.cause && (err.cause as any).code === 'ECONNREFUSED') ? 503 : 500;
          
          if (!res.headersSent) {
            res.status(statusCode).json({
              error: {
                code: statusCode === 503 ? 'SERVICE_UNAVAILABLE' : 'PROXY_ERROR',
                message: statusCode === 503 
                  ? `Service ${service.name || path} is currently unavailable`
                  : 'Error communicating with the service'
              }
            });
          }
        }
      },
      ...(options?.proxy || {})
    };
    
    const proxy = createProxyMiddleware(proxyOptions);
    
    // Set up middleware chain for this service
    const middlewareChain: RequestHandler[] = [];
    
    // Add custom middleware if defined
    if (options?.middleware && options.middleware.length > 0) {
      middlewareChain.push(...options.middleware);
    }
    
    // Add authentication middleware if defined
    if (options?.auth) {
      if (Array.isArray(options.auth)) {
        middlewareChain.push(...options.auth);
      } else {
        middlewareChain.push(options.auth);
      }
    }
    
    // Add circuit breaker if configured
    const circuitBreaker = setupCircuitBreaker(service);
    if (circuitBreaker) {
      middlewareChain.push(circuitBreaker);
    }
    
    // Add cache middleware if configured
    const cacheMiddleware = setupCache(service);
    if (cacheMiddleware) {
      middlewareChain.push(cacheMiddleware);
    }
    
    // Add proxy middleware
    middlewareChain.push(proxy as unknown as RequestHandler);
    
    // Apply middleware chain to route
    app.use(path, ...middlewareChain);
    
    logger.info(`Route configured for ${service.name || path} → ${target}`);
  });
} 