// src/common/db/mongo.ts

import mongoose from 'mongoose';
import { ConnectOptions } from 'mongoose';
import { env } from '@repo/utils';
import { baseLogger } from '@repo/middleware'; // point to your shared package

const logger = baseLogger.child({ module: 'MongoDB' });

/**
 * Establishes a MongoDB connection using Mongoose.
 * @param uri - MongoDB connection string; defaults to env.MONGO_URI
 */
export async function connectDB(
    uri: string = env.MONGO_URI
): Promise<void> {
  // 1) Listen for connection events
  mongoose.connection.on('connected', () =>
    logger.info('🗄️  MongoDB connected')
  );

  mongoose.connection.on('error', (err) =>
    logger.error('MongoDB connection error', {
      message: err.message,
      stack: err.stack,
    })
  );

  mongoose.connection.on('disconnected', () =>
    logger.warn('MongoDB disconnected')
  );

  // 2) Graceful shutdown on SIGINT
  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    logger.info('MongoDB connection closed due to app termination (SIGINT)');
    process.exit(0);
  });

  // 3) Connect with options
  try {
    await mongoose.connect(
      uri,
      {
        // Mongoose v6 defaults to new URL parser & unified topology,
        // but you can still override other options here:
        autoIndex:       true,   // build indexes on startup
        maxPoolSize:     10,     // maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000,  // 5s timeout to find a server
        socketTimeoutMS: 45000,  // 45s inactivity timeout
      } as ConnectOptions
    );
  } catch (err: any) {
    logger.error('Failed initial MongoDB connection', {
      message: err.message,
      stack:   err.stack,
    });
    // exit the process—without a DB, the app can’t really function
    process.exit(1);
  }
}
