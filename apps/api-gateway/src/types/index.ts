import { RequestHandler, ErrorRequestHandler } from 'express';
import type { Options as ProxyOptions } from 'http-proxy-middleware';

/**
 * Configuration for a service endpoint in the API gateway
 */
export interface ServiceConfig {
  /** Service name for identification */
  name: string;
  
  /** Path pattern to match for this service (e.g., '/api/users*') */
  path: string;
  
  /** Target URL for the proxied service */
  target: string;
  
  /** Additional options for this service route */
  options?: {
    /** Path rewriting rules */
    pathRewrite?: Record<string, string>;
    
    /** HTTP proxy configuration options */
    proxy?: ProxyOptions;
    
    /** Circuit breaker middleware for this route */
    circuitBreaker?: RequestHandler;
    
    /** Circuit breaker options for this route */
    circuitBreakerOptions?: {
      name?: string;
      timeout?: number;
      errorThresholdPercentage?: number;
      resetTimeout?: number;
      rollingCountTimeout?: number;
      rollingCountBuckets?: number;
      healthPath?: string;
    };
    
    /** Request rate limiter for this route */
    rateLimiter?: RequestHandler;
    
    /** Cache middleware for this route */
    cache?: RequestHandler;
    
    /** Cache options for this route */
    cacheOptions?: {
      ttl?: number;
      methods?: string[];
      store?: 'memory' | 'redis';
      redisUrl?: string;
      ignore?: RegExp[];
    };
    
    /** Custom proxy request handler */
    onProxyReq?: (proxyReq: any, req: any, res: any) => void;
    
    /** Custom proxy response handler */
    onProxyRes?: (proxyRes: any, req: any, res: any) => void;
    
    /** Custom proxy error handler */
    onError?: ErrorRequestHandler;
    
    /** Authentication middleware for this route */
    auth?: RequestHandler | RequestHandler[];
    
    /** Additional middleware to apply before proxying */
    middleware?: RequestHandler[];
  };
}

/**
 * Service Registry interface for service discovery
 * Matches the interface of the service registry in the microservices architecture
 */
export interface ServiceRegistry {
  /** Get instances for a specific service by name */
  getInstances(serviceName: string): string[];
  
  /** Optional: Register a new service instance */
  register?: (serviceName: string, url: string) => void;
  
  /** Optional: Unregister a service instance */
  unregister?: (serviceName: string, url: string) => void;
}

/**
 * API Gateway configuration
 */
export interface GatewayConfig {
  /** List of service configurations */
  services: ServiceConfig[];
  
  /** Global options applied to all services */
  globalOptions?: {
    /** Default circuit breaker configuration */
    circuitBreaker?: {
      enabled: boolean;
      options: Record<string, unknown>;
    };
    
    /** Default rate limiter configuration */
    rateLimiter?: {
      enabled: boolean;
      options: Record<string, unknown>;
    };
    
    /** Default cache configuration */
    cache?: {
      enabled: boolean;
      options: Record<string, unknown>;
    };
    
    /** Default authentication configuration */
    auth?: {
      enabled: boolean;
      options: Record<string, unknown>;
    };
  };
} 