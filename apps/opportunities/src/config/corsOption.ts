/**
 * Configuration options for Cross-Origin Resource Sharing (CORS).
 */
import { env } from "@repo/utils";

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

const corsOptions = {
    /**
     * Determines whether the request origin is allowed or not.
     * @param origin - The request origin.
     * @param callback - The callback function to be called with the result.
     */
    origin: getAllowedOrigins(),
    credentials: true,
    optionsSuccessStatus: 200,
};

export default corsOptions;

