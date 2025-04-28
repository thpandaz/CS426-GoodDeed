import express, { Request, Response, NextFunction } from 'express';
import axios from 'axios';

import helmet from 'helmet';
import cors from 'cors';
import { xss } from 'express-xss-sanitizer';
import { sanitize } from 'express-mongo-sanitize';

import appRouter from './router/routes.js';
import corsOptions from './config/corsOption.js';

import { baseLogger, rateLimiter, errorHandlers } from '@repo/middleware';
import { connectDB } from '@repo/db';
import { env } from '@repo/utils';

const logger = baseLogger.child({ module: 'service-name-template' });
const port = env.PORT;

// Helper: sanitizes only body and params data
const sanitizeBodyAndParams = (req: Request, _res: Response, next: NextFunction): void => {
  if (req.body && typeof req.body === 'object') {
    req.body = sanitize(req.body);
  }
  if (req.params && typeof req.params === 'object') {
    req.params = sanitize(req.params);
  }
  next();
};

async function sendHeartbeat(): Promise<void> {
  try {
    await axios.post(`${env.REGISTRY_URL}/register`, {
      name: env.SERVICE_NAME,
      url: `http://${env.HOST}:${env.PORT}`,
    });
    logger.debug('💓 Heartbeat sent');
  } catch (err: any) {
    logger.error('💔 Heartbeat failed', { message: err.message });
  }
}

function setupGracefulShutdown(server: ReturnType<typeof express.application.listen>): void {
  const shutdown = (): void => {
    logger.info('⚡️ Shutdown signal received');
    server.close(() => {
      logger.info('✅ Server closed');
      process.exit(0);
    });
    setTimeout(() => {
      logger.error('❗️ Forced exit');
      process.exit(1);
    }, 10_000).unref();
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

async function start(): Promise<void> {
  try {
    // Connect to MongoDB
    const uri = `${env.MONGO_URI}/${env.MONGO_DB_NAME}`;
    await connectDB(uri);
    logger.info('✅ Connected to MongoDB');

    // Create Express App
    const app = express();

    // Setup Security & Rate Limiting Middlewares
    app.use(helmet());
    app.use(rateLimiter);
    app.use(cors(corsOptions));
    app.use(xss());

    // Body Parsing
    app.use(express.json({ limit: '100mb' }));
    app.use(express.urlencoded({ extended: false }));

    // Data Sanitization
    app.use(sanitizeBodyAndParams);

    // API Routes
    app.use('/service-name-template/v1', appRouter);

    // Error Handlers
    app.use(...errorHandlers);

    // Start HTTP Server
    const server = app.listen(port, () => {
      const { NODE_ENV, HOST } = env;
      logger.info(`Server (${NODE_ENV}) running at http://${HOST}:${port}`);
    });

    // Graceful Shutdown
    setupGracefulShutdown(server);

    // Heartbeat to Registry
    await sendHeartbeat();
    setInterval(sendHeartbeat, env.HEARTBEAT_INTERVAL_MS);
  } catch (err: any) {
    logger.error('❌ Startup failed', { message: err.message, stack: err.stack });
    process.exit(1);
  }
}
console.log('Starting service...');
start();
