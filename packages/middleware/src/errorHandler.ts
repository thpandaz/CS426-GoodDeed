// packages/api/src/middleware/errorHandler.ts
import {
    Request,
    Response,
    NextFunction,
    RequestHandler,
    ErrorRequestHandler,
  } from 'express';
  import { StatusCodes, getReasonPhrase } from 'http-status-codes';
  import { baseLogger } from './logger.js';       // point to your shared package
  
  // create a child logger so every message here is tagged
  const logger = baseLogger.child({ module: 'ErrorHandler' });
  
  const notFoundHandler: RequestHandler = (req, res) => {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({
        status: StatusCodes.NOT_FOUND,
        error: getReasonPhrase(StatusCodes.NOT_FOUND),
        message: `Cannot ${req.method} ${req.originalUrl}`,
      });
  };
  
  const logErrorHandler: ErrorRequestHandler = (err, req, _res, next) => {
    logger.error(`${req.method} ${req.originalUrl} → ${err.message}`, {
      stack: err.stack,
    });
    next(err);
  };
  
  const errorResponder: ErrorRequestHandler = (err, _req, res, _next) => {
    if (res.headersSent) return;
    const status =
      (typeof err.status === 'number' && err.status) ||
      (typeof err.statusCode === 'number' && err.statusCode) ||
      StatusCodes.INTERNAL_SERVER_ERROR;
  
    const payload: Record<string, any> = {
      status,
      error: getReasonPhrase(status),
      message: err.message || getReasonPhrase(status),
    };
  
    if (process.env.NODE_ENV === 'development') {
      payload.stack = err.stack;
    }
  
    res.status(status).json(payload);
  };
  
  // explicit type annotation so TS doesn’t infer weird pnpm paths
  export const errorHandlers: Array<RequestHandler | ErrorRequestHandler> = [
    notFoundHandler,
    logErrorHandler,
    errorResponder,
  ];
  
  