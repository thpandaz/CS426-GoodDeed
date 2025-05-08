import axios from 'axios';
import { baseLogger } from '@repo/middleware';
import type { ServiceRegistry } from '../types/index.js';

const logger = baseLogger.child({ module: 'HttpServiceRegistry' });

interface HttpServiceRegistryOptions {
  registryUrl: string;
  services: string[];
  refreshIntervalMs?: number;
}

/**
 * HttpServiceRegistry - Client for the Service Registry
 * This class connects to the centralized service registry to get service instances
 */
export class HttpServiceRegistry implements ServiceRegistry {
  private registryUrl: string;
  private serviceCache: Map<string, string[]>;
  private lastRefresh: Map<string, number>;
  private refreshIntervalMs: number;
  private services: Set<string>;
  
  constructor(options: HttpServiceRegistryOptions) {
    this.registryUrl = options.registryUrl.replace(/\/$/, ''); // Remove trailing slash if present
    this.refreshIntervalMs = options.refreshIntervalMs || 10000; // 10 seconds default
    this.serviceCache = new Map();
    this.lastRefresh = new Map();
    this.services = new Set(options.services || []);
    
    logger.info(`HttpServiceRegistry initialized with ${options.services.length} services`, { 
      registryUrl: this.registryUrl,
      refreshInterval: this.refreshIntervalMs
    });
    
    // Prefetch services
    this.prefetchServices();
  }
  
  /**
   * Get instances for a specific service
   */
  getInstances(serviceName: string): string[] {
    // If cache is stale or doesn't exist, refresh synchronously
    const lastRefreshTime = this.lastRefresh.get(serviceName) || 0;
    const now = Date.now();
    
    if ((now - lastRefreshTime > this.refreshIntervalMs) || !this.serviceCache.has(serviceName)) {
      try {
        // Use the async version but with .then() to make it synchronous-like
        // This is a compromise since we can't do true sync HTTP in Node.js
        this.fetchService(serviceName).catch(error => {
          logger.error(`Failed to refresh service ${serviceName}`, {
            error: error instanceof Error ? error.message : String(error)
          });
        });
      } catch (error) {
        logger.error(`Failed to refresh service ${serviceName}`, {
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }
    
    return this.serviceCache.get(serviceName) || [];
  }
  
  /**
   * Register this instance with the service registry
   */
  register(serviceName: string, url: string): Promise<void> {
    logger.info(`Registering service ${serviceName} at ${url}`);
    
    return axios.post(`${this.registryUrl}/register`, {
      name: serviceName,
      url: url
    })
    .then(() => {
      logger.info(`Registered service ${serviceName} successfully`);
    })
    .catch(error => {
      logger.error(`Failed to register service ${serviceName}`, {
        error: error.message
      });
      throw error;
    });
  }
  
  /**
   * Unregister this instance from the service registry
   */
  unregister(serviceName: string, url: string): Promise<void> {
    logger.info(`Unregistering service ${serviceName} at ${url}`);
    
    return axios.post(`${this.registryUrl}/deregister`, {
      name: serviceName,
      url: url
    })
    .then(() => {
      logger.info(`Unregistered service ${serviceName} successfully`);
    })
    .catch(error => {
      logger.error(`Failed to unregister service ${serviceName}`, {
        error: error.message
      });
      throw error;
    });
  }
  
  /**
   * Prefetch all configured services to initialize the cache
   */
  private prefetchServices(): void {
    this.services.forEach(serviceName => {
      this.fetchService(serviceName).catch(error => {
        logger.warn(`Error prefetching service ${serviceName}`, {
          error: error instanceof Error ? error.message : String(error)
        });
      });
    });
  }
  
  /**
   * Fetch service instances asynchronously and update cache
   */
  private async fetchService(serviceName: string): Promise<string[]> {
    try {
      const response = await axios.get(`${this.registryUrl}/services/${serviceName}`);
      const instances = response.data.instances.map((instance: any) => instance.url);
      
      this.serviceCache.set(serviceName, instances);
      this.lastRefresh.set(serviceName, Date.now());
      
      logger.debug(`Refreshed service ${serviceName}, found ${instances.length} instances`);
      return instances;
    } catch (error) {
      // If service isn't found, cache an empty array
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        this.serviceCache.set(serviceName, []);
        this.lastRefresh.set(serviceName, Date.now());
        logger.warn(`No instances found for service ${serviceName}`);
        return [];
      }
      
      throw error;
    }
  }
}
