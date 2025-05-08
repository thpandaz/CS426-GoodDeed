import { Request, Response, NextFunction } from 'express';
import NodeCache from 'node-cache';
import { createClient } from 'redis';
import { baseLogger } from './logger.js';

const logger = baseLogger.child({ module: 'CacheMiddleware' });

export interface CacheOptions {
  ttl?: number;          // Time to live in seconds (default: 60)
  prefix?: string;       // Cache key prefix (default: 'api-cache:')
  methods?: string[];    // HTTP methods to cache (default: ['GET'])
  statusCodes?: number[]; // Status codes to cache (default: [200])
  store?: 'memory' | 'redis'; // Cache store to use (default: 'memory')
  redisUrl?: string;     // Redis connection URL (required for redis store)
  ignore?: RegExp[];     // URL patterns to ignore (default: [])
  keyFn?: (req: Request) => string; // Custom key generator
  ignoreFn?: (req: Request) => boolean; // Custom ignore function
}

export interface CacheStore {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttl?: number): Promise<void>;
  del(key: string): Promise<void>;
  flush(): Promise<void>;
}

// Memory cache store implementation using node-cache
class MemoryCacheStore implements CacheStore {
  private cache: NodeCache;

  constructor(ttl: number = 60) {
    this.cache = new NodeCache({
      stdTTL: ttl,
      checkperiod: ttl * 0.2,
    });
  }

  async get<T>(key: string): Promise<T | null> {
    const value = this.cache.get<T>(key);
    return value || null;
  }
  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    if (ttl !== undefined) {
      this.cache.set(key, value, ttl);
    } else {
      this.cache.set(key, value);
    }
  }

  async del(key: string): Promise<void> {
    this.cache.del(key);
  }

  async flush(): Promise<void> {
    this.cache.flushAll();
  }
}

// Redis cache store implementation
class RedisCacheStore implements CacheStore {
  private client;
  private prefix: string;
  private ttl: number;
  private connected = false;

  constructor(redisUrl: string, prefix: string = 'api-cache:', ttl: number = 60) {
    this.prefix = prefix;
    this.ttl = ttl;
    this.client = createClient({ url: redisUrl });
    
    this.client.on('error', (err) => {
      logger.error('Redis client error:', err);
    });
    
    this.client.on('ready', () => {
      this.connected = true;
      logger.info('Redis cache store connected');
    });
    
    this.client.connect().catch((err) => {
      logger.error('Redis connection error:', err);
    });
  }

  async get<T>(key: string): Promise<T | null> {
    if (!this.connected) return null;
    
    try {
      const fullKey = `${this.prefix}${key}`;
      const value = await this.client.get(fullKey);
      return value ? JSON.parse(value) as T : null;
    } catch (error) {
      logger.error('Redis get error:', error);
      return null;
    }
  }

  async set<T>(key: string, value: T, ttl: number = this.ttl): Promise<void> {
    if (!this.connected) return;
    
    try {
      const fullKey = `${this.prefix}${key}`;
      const stringValue = JSON.stringify(value);
      await this.client.set(fullKey, stringValue, { EX: ttl });
    } catch (error) {
      logger.error('Redis set error:', error);
    }
  }

  async del(key: string): Promise<void> {
    if (!this.connected) return;
    
    try {
      const fullKey = `${this.prefix}${key}`;
      await this.client.del(fullKey);
    } catch (error) {
      logger.error('Redis del error:', error);
    }
  }

  async flush(): Promise<void> {
    if (!this.connected) return;
    
    try {
      const keys = await this.client.keys(`${this.prefix}*`);
      if (keys.length > 0) {
        await this.client.del(keys);
      }
    } catch (error) {
      logger.error('Redis flush error:', error);
    }
  }
}

// Default options
const defaultOptions: CacheOptions = {
  ttl: 60,
  prefix: 'api-cache:',
  methods: ['GET'],
  statusCodes: [200],
  store: 'memory',
  ignore: [],
};

// Generate cache key from request
const generateKey = (req: Request, prefix: string): string => {
  const url = req.originalUrl || req.url;
  const method = req.method;
  
  // Create a hash of the query parameters
  const queryHash = JSON.stringify(req.query);
  
  return `${prefix}${method}:${url}:${queryHash}`;
};

// Create cache middleware factory
export const createCacheMiddleware = (options: CacheOptions = {}) => {
  const opts = { ...defaultOptions, ...options };
  let store: CacheStore;

  // Initialize store based on options
  if (opts.store === 'redis') {
    if (!opts.redisUrl) {
      throw new Error('Redis URL is required when using Redis cache store');
    }
    store = new RedisCacheStore(opts.redisUrl, opts.prefix, opts.ttl);
    logger.info('Using Redis cache store');
  } else {
    store = new MemoryCacheStore(opts.ttl);
    logger.info('Using Memory cache store');
  }

  // Return the middleware function
  return async (req: Request, res: Response, next: NextFunction) => {
    // Skip caching if method is not cacheable
    if (!opts.methods?.includes(req.method)) {
      return next();
    }
    
    // Skip caching if URL matches ignore patterns
    if (opts.ignore && opts.ignore.some(pattern => pattern.test(req.originalUrl))) {
      return next();
    }

    // Skip caching based on custom function
    if (opts.ignoreFn && opts.ignoreFn(req)) {
      return next();
    }
    
    // Generate cache key
    const key = opts.keyFn ? opts.keyFn(req) : generateKey(req, opts.prefix || '');
    
    try {
      // Try to get from cache
      const cachedResponse = await store.get(key);
      
      if (cachedResponse) {
        const { body, statusCode, headers } = cachedResponse as any;
        
        // Set headers to indicate cache hit
        res.set('X-Cache', 'HIT');
        
        // Set the original headers
        if (headers) {
          Object.entries(headers).forEach(([name, value]) => {
            if (name !== 'x-cache') {
              res.set(name, value as string);
            }
          });
        }
        
        // Return cached response
        return res.status(statusCode).send(body);
      }
      
      // Set header to indicate cache miss
      res.set('X-Cache', 'MISS');
      
      // Capture the original response methods
      const originalSend = res.send;
      
      // Override send method to cache response before sending
      res.send = function (body: any): Response {
        // Restore original send method
        res.send = originalSend;
        
        // Cache only if status code is cacheable
        if (opts.statusCodes?.includes(res.statusCode)) {
          const responseToCache = {
            body,
            statusCode: res.statusCode,
            headers: res.getHeaders(),
          };
          
          // Store in cache
          store.set(key, responseToCache, opts.ttl);
        }
        
        // Send the response
        return originalSend.call(this, body);
      };
      
      next();
    } catch (error) {
      // Log error and continue without caching
      logger.error('Cache middleware error:', error);
      next();
    }
  };
};

// Helper to invalidate cache
export const invalidateCache = async (pattern: string, options: CacheOptions = {}) => {
  const opts = { ...defaultOptions, ...options };
  let store: CacheStore;

  // Initialize store based on options
  if (opts.store === 'redis') {
    if (!opts.redisUrl) {
      throw new Error('Redis URL is required when using Redis cache store');
    }
    store = new RedisCacheStore(opts.redisUrl, opts.prefix, opts.ttl);
  } else {
    store = new MemoryCacheStore(opts.ttl);
  }

  if (pattern === '*') {
    await store.flush();
    logger.info('Cache flushed');
  } else {
    await store.del(`${opts.prefix}${pattern}`);
    logger.info(`Cache invalidated for pattern: ${pattern}`);
  }
}; 