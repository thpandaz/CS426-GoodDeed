import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';
import { baseLogger } from '@repo/middleware';

const logger = baseLogger.child({ module: 'RequestLogger' });

// Add request ID to Express Request
declare global {
  namespace Express {
    interface Request {
      id?: string;
      startTime?: number;
    }
  }
}

/**
 * Middleware to log all incoming requests and assign a unique request ID
 */
const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  // Generate a unique ID for this request
  req.id = (req.headers['x-request-id'] as string) || randomUUID();
  
  // Set start time to calculate request duration
  req.startTime = Date.now();
  
  // Add request ID to response headers
  res.setHeader('X-Request-ID', req.id);
  
  // Basic request information
  logger.info(`${req.method} ${req.originalUrl}`, {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    requestId: req.id,
    userAgent: req.headers['user-agent'],
    referer: req.headers.referer || req.headers.referrer,
  });
  
  // Log response when it completes
  res.on('finish', () => {
    const duration = req.startTime ? Date.now() - req.startTime : 0;
    const level = res.statusCode >= 400 ? 'warn' : 'info';
    
    logger[level](`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`, {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration,
      requestId: req.id || 'unknown',
    });
  });
  
  next();
};

export default requestLogger; 