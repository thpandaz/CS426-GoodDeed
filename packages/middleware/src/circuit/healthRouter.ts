import { Router } from 'express';
import CircuitBreaker from 'opossum';
import { getCircuit } from './breakerFactory.js';
import { baseLogger } from '../logger.js';

const logger = baseLogger.child({ module: 'CircuitHealth' });

// Define interface for the stats object
interface CircuitStats {
  [key: string]: string | number | boolean | object;
}

export function healthRouter(path = '/health'): Router {
  const router = Router();
  
  router.get(path, (_req, res) => {
    const stats: CircuitStats = {};
    
    // Get the default circuit first to check if it exists
    const defaultCircuit = getCircuit('default');
    
    if (!defaultCircuit) {
      // No circuits registered yet
      logger.debug('Health check called, but no circuits registered');
      return res.json({ 
        circuits: {}, 
        timestamp: Date.now(),
        status: 'ok'
      });
    }
    
    // Get circuit health information
    // Start with the default circuit
    stats['default'] = {
      state: getCircuitState(defaultCircuit),
      stats: defaultCircuit.stats
    };
    
    // Try to get other circuits by common names
    ['api', 'db', 'auth', 'cache'].forEach(name => {
      const circuit = getCircuit(name);
      if (circuit) {
        stats[name] = {
          state: getCircuitState(circuit),
          stats: circuit.stats
        };
      }
    });
    
    logger.debug('Health check completed', { circuitCount: Object.keys(stats).length });
    
    res.json({ 
      circuits: stats, 
      timestamp: Date.now(),
      status: 'ok'
    });
  });
  
  return router;
}

// Helper function to determine circuit state
function getCircuitState(circuit: CircuitBreaker): 'closed' | 'open' | 'half-open' {
  if (circuit.opened) {
    return 'open';
  } else if (circuit.halfOpen) {
    return 'half-open';
  } else {
    return 'closed';
  }
}