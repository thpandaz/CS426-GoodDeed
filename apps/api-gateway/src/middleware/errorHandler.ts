import { Request, Response, NextFunction } from 'express';
import { baseLogger } from '@repo/middleware';

// Create a child logger for the API gateway
const logger = baseLogger.child({ module: 'api-gateway' });

interface ApiError extends Error {
  statusCode?: number;
  code?: string;
  details?: unknown;
}

/**
 * Global error handling middleware for API Gateway
 * Processes various error types and formats them consistently
 */
const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  // Default to 500 server error
  const statusCode = err.statusCode || 500;
  const code = err.code || 'INTERNAL_SERVER_ERROR';
  const message = err.message || 'An unexpected error occurred';

  // Log error details
  logger.error('API Gateway Error', {
    errorCode: code,
    errorMessage: message,
    statusCode,
    details: err.details,
    path: req.path,
    method: req.method,
    requestId: req.id || 'unknown',
    stack: err.stack
  });

  // Send response to client
  res.status(statusCode).json({
    error: {
      code,
      message,
      ...(process.env.NODE_ENV !== 'production' && err.stack ? { stack: err.stack.split('\n') } : {}),
    },
    success: false,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Factory to create typed errors with consistent structure
 */
export const createApiError = (
  message: string,
  statusCode = 500,
  code = 'INTERNAL_SERVER_ERROR',
  details?: unknown
): ApiError => {
  const error: ApiError = new Error(message);
  error.statusCode = statusCode;
  error.code = code;
  error.details = details;
  return error;
};

/**
 * Handle 404 routes
 */
export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  const error = createApiError(`Route not found: ${req.method} ${req.originalUrl}`, 404, 'NOT_FOUND');
  next(error);
};

export default errorHandler; 