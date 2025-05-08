// metrics.ts
import { collectDefaultMetrics, Registry, Histogram } from 'prom-client';
import responseTime from 'response-time';
import type { RequestHandler, Request, Response } from 'express';

// 1) New registry and default metrics
const registry = new Registry();
collectDefaultMetrics({ register: registry });

// 2) One histogram for all HTTP calls
const httpDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration in seconds',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5],
  registers: [registry],
});

// 3) Middleware: measure time and record it
export const metricsMiddleware: RequestHandler = responseTime((req: Request, res: Response, time: number) => {
  const route = req.route?.path || req.path;
  httpDuration.observe({ method: req.method, route, status: String(res.statusCode) }, time / 1000);
});

// 4) Endpoint to expose metrics
export const metricsEndpoint: RequestHandler = async (_req, res) => {
  res.set('Content-Type', registry.contentType);
  res.end(await registry.metrics());
};
