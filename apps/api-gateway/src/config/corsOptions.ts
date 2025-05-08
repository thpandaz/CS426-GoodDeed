import { CorsOptions } from 'cors';
import { env } from '@repo/utils';

/**
 * Get dynamic allowlist of origins based on environment
 */
const getAllowedOrigins = (): string[] => {
  // Check if origins are defined in environment
  if (env.CORS_ORIGINS && env.CORS_ORIGINS.length > 0) {
    return env.CORS_ORIGINS;
  }
  
  // Default origins based on environment
  if (env.isDev) {
    return [
      'http://localhost:3000',   // Web frontend
      'http://localhost:5173',   // Vite dev server
      'http://localhost:8000',   // Alternative dev port
    ];
  }
  
  if (env.isProd) {
    return [
      'https://gooddeed.example.com',  // Replace with actual production domains
      'https://*.gooddeed.example.com'
    ];
  }
  
  return ['*']; // Fallback
};

/**
 * CORS configuration options
 */
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Allow server-to-server requests (no origin)
    if (!origin) {
      return callback(null, true);
    }
    
    const allowedOrigins = getAllowedOrigins();
    
    // Allow all origins in development for ease of testing
    if (env.isDev || allowedOrigins.includes('*')) {
      return callback(null, true);
    }
    
    // Check if origin is in allowlist
    if (allowedOrigins.some(allowedOrigin => {
      // Support wildcard domains (e.g., *.example.com)
      if (allowedOrigin.includes('*')) {
        const regex = new RegExp('^' + allowedOrigin.replace(/\*/g, '.*') + '$');
        return regex.test(origin);
      }
      return allowedOrigin === origin;
    })) {
      return callback(null, true);
    }
    
    callback(new Error('CORS policy violation: Origin not allowed'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  exposedHeaders: ['Content-Length', 'X-Request-Id'],
  maxAge: 86400 // 24 hours
};

export default corsOptions; 