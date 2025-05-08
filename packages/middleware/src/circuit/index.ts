/**
 * Circuit Breaker Module
 * 
 * This module provides a circuit breaker implementation for Express applications
 * based on the Opossum library. It helps prevent cascading failures and
 * provides graceful degradation when downstream services fail.
 */

// Re-export with renamed functions to avoid conflicts
import { 
  getCircuit as getCircuitInstance,
  createBreaker,
  resetAllCircuits,
  type BreakerOptions 
} from './breakerFactory.js';
import { healthRouter } from './healthRouter.js';
import { attachLogging } from './events.js';
import { protectedExpressAction } from './protectedAction.js';

// Export renamed functions and types
export {
  getCircuitInstance,
  createBreaker,
  resetAllCircuits,
  attachLogging,
  protectedExpressAction,
  healthRouter
};

// Export types
export type { BreakerOptions };

/**
 * Create a circuit breaker middleware for Express
 * @example
 * // Create a circuit breaker middleware
 * const { middleware } = circuitBreaker();
 * app.use('/api', middleware);
 * 
 * // Add health endpoint
 * app.use(circuitBreakerHealth());
 */
export const circuitBreaker = createBreaker;

/**
 * Create a health check endpoint for circuit breakers
 * @example
 * app.use(circuitBreakerHealth('/health/circuits'));
 */
export const circuitBreakerHealth = healthRouter; 