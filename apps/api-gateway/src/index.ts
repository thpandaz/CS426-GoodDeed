import express, { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import { baseLogger, rateLimiter } from '@repo/middleware';
import { env } from '@repo/utils';

// Import local middleware and config
import corsOptions from './config/corsOptions.js';
import errorHandler, { notFoundHandler } from './middleware/errorHandler.js';
import requestLogger from './middleware/requestLogger.js';
import gatewayConfig from './config/gateway.config.js';
import { setupRoutes, HttpServiceRegistry  } from './routes/index.js';
import type { ServiceRegistry } from './types/index.js';

// Create logger instance
const logger = baseLogger.child({ module: 'APIGateway' });

// Initialize Express app
const app: Express = express();
const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;

// Apply middleware
app.use(requestLogger);
app.use(helmet()); // Security headers
app.use(cors(corsOptions)); // CORS configuration
app.use(compression()); // Compress responses
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(rateLimiter); // Rate limiting

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || 'unknown',
  });
});

// Try to use circuit breaker health router if available
try {
  const middleware = require('@repo/middleware');
  if (middleware.circuit && typeof middleware.circuit.circuitBreakerHealth === 'function') {
    app.use('/circuits', middleware.circuit.circuitBreakerHealth());
    logger.info('Circuit breaker health endpoint enabled at /circuits');
  }
} catch (error) {
  logger.warn('Circuit breaker health endpoint not available', { 
    error: error instanceof Error ? error.message : String(error)
  });
}

// Create a simple service registry that uses configured targets
const registry = new HttpServiceRegistry({
  registryUrl: process.env.SERVICE_REGISTRY_URL!,
  services: gatewayConfig.services.map(svc => svc.name),
  refreshIntervalMs: 10_000,
});

// Set up service routes based on config
setupRoutes(app, gatewayConfig.services, registry);

// Catch 404 errors
app.use(notFoundHandler);

// Global error handler - must be last
app.use(errorHandler);

// Start server
const server = app.listen(port, () => {
  logger.info(`API Gateway running on port ${port}`, { port });
  logger.info(`Environment: ${env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received. Closing server...');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

export default app; 