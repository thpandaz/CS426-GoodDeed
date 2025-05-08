import express, { Request, Response } from 'express';
import cors from 'cors';
import { baseLogger } from '@repo/middleware';
import { env } from '@repo/utils';

// Create logger instance
const logger = baseLogger.child({ module: 'ServiceRegistry' });

// Types for service registry
interface ServiceInstance {
  url: string;
  name: string;
  lastHeartbeat: Date;
  status: 'active' | 'inactive';
}

interface Registry {
  [serviceName: string]: ServiceInstance[];
}

// In-memory registry storage
const registry: Registry = {};

// Registry configuration
const HEARTBEAT_INTERVAL = parseInt(process.env.HEARTBEAT_INTERVAL_MS || '30000', 10);
const CLEANUP_INTERVAL = parseInt(process.env.CLEANUP_INTERVAL_MS || '60000', 10);
const HEARTBEAT_TIMEOUT = parseInt(process.env.HEARTBEAT_TIMEOUT_MS || '90000', 10);

function setupGracefulShutdown(server: ReturnType<typeof express.application.listen>): void {
  const shutdown = async (): Promise<void> => {
    logger.info('⚡️ Shutdown signal received');
    
    server.close(() => {
      logger.info('✅ Server closed');
      process.exit(0);
    });    
    // Force exit after timeout
    setTimeout(() => {
      logger.error('❗️ Forced exit');
      process.exit(1);
    }, 10_000).unref();
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

// Initialize Express app
const app = express();
const port = process.env.PORT || 4500;

// Apply middleware
app.use(cors());
app.use(express.json());

/**
 * Register a service instance
 * POST /register
 */
app.post('/register', (req: Request, res: Response) => {
  const { name, url } = req.body;
  
  if (!name || !url) {
    return res.status(400).json({ 
      error: 'Missing required fields: name and url' 
    });
  }

  // Create or update the service
  if (!registry[name]) {
    registry[name] = [];
  }

  // Check if service instance already exists
  const existingInstance = registry[name].find(instance => instance.url === url);

  if (existingInstance) {
    // Update existing instance
    existingInstance.lastHeartbeat = new Date();
    existingInstance.status = 'active';
    logger.info(`Service instance heartbeat received: ${name} at ${url}`);
  } else {
    // Add new instance
    registry[name].push({
      url,
      name,
      lastHeartbeat: new Date(),
      status: 'active'
    });
    logger.info(`New service instance registered: ${name} at ${url}`);
  }

  return res.status(200).json({ 
    success: true, 
    message: 'Service registered successfully' 
  });
});

/**
 * Deregister a service instance
 * POST /deregister
 */
app.post('/deregister', (req: Request, res: Response) => {
  const { name, url } = req.body;
  
  if (!name || !url) {
    return res.status(400).json({ 
      error: 'Missing required fields: name and url' 
    });
  }

  if (!registry[name]) {
    return res.status(404).json({ 
      error: `Service ${name} not found` 
    });
  }

  // Filter out the deregistered instance
  const initialCount = registry[name].length;
  registry[name] = registry[name].filter(instance => instance.url !== url);
  
  // If we removed an instance, log it
  if (registry[name].length < initialCount) {
    logger.info(`Service instance deregistered: ${name} at ${url}`);
    return res.status(200).json({ 
      success: true, 
      message: 'Service deregistered successfully' 
    });
  }

  return res.status(404).json({ 
    error: `Service instance ${url} not found` 
  });
});

/**
 * Get all instances of a specific service
 * GET /services/:name
 */
app.get('/services/:name', (req: Request, res: Response) => {
  const { name } = req.params;
  
  if (!registry[name] || registry[name].length === 0) {
    return res.status(404).json({ 
      error: `No instances found for service ${name}` 
    });
  }
  
  // Only return active instances
  const activeInstances = registry[name]
    .filter(instance => instance.status === 'active')
    .map(({ name, url }) => ({ name, url }));
  
  if (activeInstances.length === 0) {
    return res.status(404).json({ 
      error: `No active instances found for service ${name}` 
    });
  }

  return res.status(200).json({ 
    service: name,
    instances: activeInstances 
  });
});

/**
 * Get all registered services
 * GET /services
 */
app.get('/services', (_req: Request, res: Response) => {
  const services = Object.keys(registry).map(name => {
    const activeInstances = registry[name].filter(instance => instance.status === 'active');
    return {
      name,
      instanceCount: activeInstances.length,
      instances: activeInstances.map(({ url }) => url)
    };
  });
  
  return res.status(200).json({ services });
});

/**
 * Health check endpoint
 * GET /health
 */
app.get('/health', (_req: Request, res: Response) => {
  return res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: Object.keys(registry).length,
    instances: Object.values(registry).reduce((sum, instances) => sum + instances.length, 0)
  });
});

/**
 * Clean up inactive service instances
 */
function cleanupInactiveInstances(): void {
  const now = new Date();
  let inactiveCount = 0;
  
  Object.keys(registry).forEach(serviceName => {
    registry[serviceName].forEach(instance => {
      const timeSinceHeartbeat = now.getTime() - instance.lastHeartbeat.getTime();
      
      if (timeSinceHeartbeat > HEARTBEAT_TIMEOUT && instance.status === 'active') {
        instance.status = 'inactive';
        inactiveCount++;
        logger.warn(`Service instance marked inactive due to missing heartbeat: ${instance.name} at ${instance.url}`);
      }
    });
    
    // Remove completely inactive services (optional)
    if (registry[serviceName].every(instance => instance.status === 'inactive')) {
      delete registry[serviceName];
      logger.info(`Removed inactive service: ${serviceName}`);
    }
  });
  
  if (inactiveCount > 0) {
    logger.info(`Marked ${inactiveCount} instances as inactive during cleanup`);
  }
}

// Start the server
const server = app.listen(port, () => {
  logger.info(`Service Registry listening on port ${port}`);
  
  // Set up periodic cleanup of inactive services
  setInterval(cleanupInactiveInstances, CLEANUP_INTERVAL);
  
  logger.info(`Environment: ${env.NODE_ENV}`);
  logger.info(`Heartbeat interval: ${HEARTBEAT_INTERVAL}ms`);
  logger.info(`Cleanup interval: ${CLEANUP_INTERVAL}ms`);
  logger.info(`Heartbeat timeout: ${HEARTBEAT_TIMEOUT}ms`);
});

setupGracefulShutdown(server);
