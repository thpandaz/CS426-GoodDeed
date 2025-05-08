import type { Request, Response } from 'express';
import CircuitBreaker from 'opossum';
import { baseLogger } from '../logger.js';

const logger = baseLogger.child({ module: 'CircuitBreaker' });

// Use 'any' for CircuitBreaker to avoid TypeScript errors with event handling
export function attachLogging(circuit: CircuitBreaker<any>) {
  // Handle failure events (when the request fails)
  circuit.on('failure', (err: Error, latencyMs: number, _args: any[]) => {
    logger.error(`Circuit failure: ${err.message}`, { 
      latency: latencyMs,
      name: circuit.name,
      error: err.message
    });
  });

  // Handle timeout events - use type assertion to avoid TypeScript errors
  (circuit as any).on('timeout', (err: Error, latencyMs: number, _args: any[]) => {
    logger.warn(`Circuit timeout`, { 
      latency: latencyMs,
      name: circuit.name,
      error: err.message
    });
  });

  // Handle rejection events (when circuit is open)
  (circuit as any).on('reject', () => {
    logger.warn(`Circuit rejection - circuit is open`, { 
      name: circuit.name
    });
  });

  // Handle circuit state changes
  circuit.on('open', () => {
    logger.warn(`Circuit opened`, { name: circuit.name });
  });

  circuit.on('close', () => {
    logger.info(`Circuit closed`, { name: circuit.name });
  });

  (circuit as any).on('halfOpen', () => {
    logger.info(`Circuit half-open`, { name: circuit.name });
  });
}