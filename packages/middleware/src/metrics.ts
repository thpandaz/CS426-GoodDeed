import { Request, Response, NextFunction, RequestHandler } from 'express';
import responseTime from 'response-time';
import client, { Registry, Counter, Histogram, Gauge, Summary } from 'prom-client';
import { baseLogger } from './logger.js';

const logger = baseLogger.child({ module: 'MetricsMiddleware' });

// Re-export prom-client for advanced usage
export { client };

export interface MetricsOptions {
  prefix?: string;              // Metrics prefix (default: 'app_')
  defaultLabels?: Record<string, string>; // Default labels for all metrics
  path?: string;                // Path to expose metrics (default: '/metrics')
  includeDefaultMetrics?: boolean; // Whether to include default Node.js metrics (default: true)
  responseTimeHistogramBuckets?: number[]; // Custom buckets for response time histogram
  routeMetricsLabels?: string[]; // Labels to include for route metrics (default: ['method', 'path', 'status'])
}

export interface MetricsRegistry {
  registry: Registry;
  metrics: {
    httpRequestsTotal: Counter<string>;
    httpRequestDurationSeconds: Histogram<string>;
    httpRequestSizeBytes: Summary<string>;
    httpResponseSizeBytes: Summary<string>;
    httpRequestsInFlight: Gauge<string>;
    errorRate: Gauge<string>;
    [key: string]: any;
  };
}

// Default options
const defaultOptions: MetricsOptions = {
  prefix: 'app_',
  defaultLabels: {},
  path: '/metrics',
  includeDefaultMetrics: true,
  responseTimeHistogramBuckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5, 10],
  routeMetricsLabels: ['method', 'path', 'status'],
};

// Global registry for metrics
let globalRegistry: MetricsRegistry | undefined;

// Configure and create a metrics registry
export const configureMetrics = (options: MetricsOptions = {}): MetricsRegistry => {
  const opts = { ...defaultOptions, ...options };
  const prefix = opts.prefix || '';
  
  // Create a new registry
  const registry = new client.Registry();

  // Add default labels
  if (opts.defaultLabels && Object.keys(opts.defaultLabels).length > 0) {
    registry.setDefaultLabels(opts.defaultLabels);
  }

  // Include default metrics if enabled
  if (opts.includeDefaultMetrics) {
    client.collectDefaultMetrics({ register: registry, prefix });
  }

  // Create custom metrics
  const httpRequestsTotal = new client.Counter({
    name: `${prefix}http_requests_total`,
    help: 'Total number of HTTP requests',
    labelNames: opts.routeMetricsLabels,
    registers: [registry],
  });

  const httpRequestDurationSeconds = new client.Histogram({
    name: `${prefix}http_request_duration_seconds`,
    help: 'Duration of HTTP requests in seconds',
    labelNames: opts.routeMetricsLabels,
    buckets: opts.responseTimeHistogramBuckets,
    registers: [registry],
  });

  const httpRequestSizeBytes = new client.Summary({
    name: `${prefix}http_request_size_bytes`,
    help: 'HTTP request size in bytes',
    labelNames: opts.routeMetricsLabels,
    registers: [registry],
  });

  const httpResponseSizeBytes = new client.Summary({
    name: `${prefix}http_response_size_bytes`,
    help: 'HTTP response size in bytes',
    labelNames: opts.routeMetricsLabels,
    registers: [registry],
  });

  const httpRequestsInFlight = new client.Gauge({
    name: `${prefix}http_requests_in_flight`,
    help: 'Number of HTTP requests in flight',
    labelNames: ['method', 'path'],
    registers: [registry],
  });

  const errorRate = new client.Gauge({
    name: `${prefix}error_rate`,
    help: 'Rate of HTTP errors (non-2xx responses)',
    labelNames: ['method', 'path'],
    registers: [registry],
  });

  // Create metrics registry
  const metricsRegistry: MetricsRegistry = {
    registry,
    metrics: {
      httpRequestsTotal,
      httpRequestDurationSeconds,
      httpRequestSizeBytes,
      httpResponseSizeBytes,
      httpRequestsInFlight,
      errorRate,
    },
  };

  // Store globally if not already set
  if (!globalRegistry) {
    globalRegistry = metricsRegistry;
  }

  logger.info('Metrics initialized', { prefix });
  return metricsRegistry;
};

// Get normalize path for metrics
const normalizePath = (req: Request): string => {
  // Use route path if available, otherwise use original URL
  let path = req.route?.path || req.path;

  // For express URLs with route parameters, convert :param to {param}
  path = path.replace(/:[^/]+/g, (match: string) => `{${match.slice(1)}}`);

  // Remove trailing slash
  return path.replace(/\/$/, '') || '/';
};

// Create metrics middleware
export const createMetricsMiddleware = (options: MetricsOptions = {}): RequestHandler => {
  const opts = { ...defaultOptions, ...options };
  
  // Configure metrics if not already configured
  const { registry, metrics } = globalRegistry || configureMetrics(opts);
  
  // Create middleware function
  return (req: Request, res: Response, next: NextFunction) => {
    // Skip metrics endpoint to avoid circular reporting
    if (req.path === opts.path) {
      return next();
    }

    const path = normalizePath(req);
    const method = req.method;

    // Track in-flight requests
    metrics.httpRequestsInFlight.inc({ method, path });

    // Track request size
    const requestSize = parseInt(req.get('content-length') || '0', 10);
    if (requestSize > 0) {
      metrics.httpRequestSizeBytes.observe({ method, path, status: '0' }, requestSize);
    }

    // Track timing with response-time
    responseTime((req: Request, res: Response, time: number) => {
      // Convert from ms to seconds
      const responseTimeInSeconds = time / 1000;
      const status = res.statusCode.toString();

      // Decrement in-flight counter
      metrics.httpRequestsInFlight.dec({ method, path });

      // Observe response time
      metrics.httpRequestDurationSeconds.observe({ method, path, status }, responseTimeInSeconds);

      // Track response size
      const responseSize = parseInt(res.get('content-length') || '0', 10);
      if (responseSize > 0) {
        metrics.httpResponseSizeBytes.observe({ method, path, status }, responseSize);
      }

      // Increment request counter
      metrics.httpRequestsTotal.inc({ method, path, status });

      // Update error rate for this route
      if (res.statusCode >= 400) {
        metrics.errorRate.set({ method, path }, 1);
      } else {
        // Gradually reduce error rate for successful responses
        metrics.errorRate.set({ method, path }, 0);
      }

      // Log metrics for debugging
      if (process.env.NODE_ENV === 'development') {
        logger.debug('Request metrics', {
          method,
          path,
          status,
          durationMs: time,
          requestSize,
          responseSize,
        });
      }
    })(req, res, next);
  };
};

// Create metrics endpoint handler
export const metricsEndpoint = (options: MetricsOptions = {}): RequestHandler => {
  const opts = { ...defaultOptions, ...options };
  const { registry } = globalRegistry || configureMetrics(opts);

  return async (_req: Request, res: Response) => {
    try {
      res.set('Content-Type', registry.contentType);
      res.end(await registry.metrics());
    } catch (err: any) {
      logger.error('Error generating metrics', { error: err.message });
      res.status(500).send('Error generating metrics');
    }
  };
};

// Register custom metrics
export const registerCustomMetric = (
  type: 'counter' | 'gauge' | 'histogram' | 'summary',
  name: string,
  help: string,
  labelNames: string[] = [],
  options: object = {}
): any => {
  if (!globalRegistry) {
    throw new Error('Metrics not configured. Call configureMetrics() first.');
  }

  const { registry, metrics } = globalRegistry;
  const prefix = defaultOptions.prefix || '';
  const metricName = `${prefix}${name}`;

  // Check if metric already exists
  if (metrics[name]) {
    return metrics[name];
  }

  let metric;

  // Create metric based on type
  switch (type) {
    case 'counter':
      metric = new client.Counter({
        name: metricName,
        help,
        labelNames,
        registers: [registry],
        ...options,
      });
      break;

    case 'gauge':
      metric = new client.Gauge({
        name: metricName,
        help,
        labelNames,
        registers: [registry],
        ...options,
      });
      break;

    case 'histogram':
      metric = new client.Histogram({
        name: metricName,
        help,
        labelNames,
        registers: [registry],
        ...options,
      });
      break;

    case 'summary':
      metric = new client.Summary({
        name: metricName,
        help,
        labelNames,
        registers: [registry],
        ...options,
      });
      break;

    default:
      throw new Error(`Unknown metric type: ${type}`);
  }

  // Store in metrics registry
  metrics[name] = metric;
  return metric;
};

// Get metrics registry
export const getMetricsRegistry = (): MetricsRegistry => {
  if (!globalRegistry) {
    throw new Error('Metrics not configured. Call configureMetrics() first.');
  }
  return globalRegistry;
}; 