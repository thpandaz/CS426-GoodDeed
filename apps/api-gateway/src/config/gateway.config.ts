import { GatewayConfig } from '../types/index.js';

// Helper function for safe environment variable access
const getEnvVar = (key: string, defaultValue: string): string => {
  return typeof process.env[key] === 'string' ? process.env[key] as string : defaultValue;
};

// Service URL configurations from environment variables
const serviceUrls = {
  users: getEnvVar('USERS_SERVICE_URL', 'http://localhost:4001'),
  // events: getEnvVar('EVENTS_SERVICE_URL', 'http://localhost:4002'),
  // auth: getEnvVar('AUTH_SERVICE_URL', 'http://localhost:4003'),
  // notifications: getEnvVar('NOTIFICATIONS_SERVICE_URL', 'http://localhost:4004'),
  // search: getEnvVar('SEARCH_SERVICE_URL', 'http://localhost:4005'),
  organizations: getEnvVar('ORGANIZATIONS_SERVICE_URL', 'http://localhost:4006'),
  opportunities: getEnvVar('OPPORTUNITIES_SERVICE_URL', 'http://localhost:4007'),
  service_template: getEnvVar('SERVICE_TEMPLATE_URL', 'http://localhost:3000'),
};

// Redis configuration
const redisUrl = getEnvVar('REDIS_URL', '');
const useRedis = redisUrl !== '';

/**
 * Gateway service routing configuration
 * Circuit breaker and cache middleware will be added dynamically when routes are set up
 */
const gatewayConfig: GatewayConfig = {
  // List of service routes
  services: [
    // Users service
    {
      name: 'users',
      path: '/api/users',
      target: serviceUrls.users,
      options: {
        pathRewrite: { '^/api/users': '/users' },
        circuitBreakerOptions: {
          name: 'users-service',
          timeout: 5000,
          errorThresholdPercentage: 50,
          resetTimeout: 30000,
        },
        cacheOptions: {
          ttl: 60,    // 1 minute
          methods: ['GET'],
          store: useRedis ? 'redis' : 'memory',
          redisUrl
        },
      }
    },
    
    // // Events service
    // {
    //   name: 'events',
    //   path: '/api/events',
    //   target: serviceUrls.events,
    //   options: {
    //     pathRewrite: { '^/api/events': '/events' },
    //     circuitBreakerOptions: {
    //       name: 'events-service',
    //       timeout: 5000,
    //       errorThresholdPercentage: 50,
    //       resetTimeout: 30000,
    //     },
    //     cacheOptions: {
    //       ttl: 300,  // 5 minutes
    //       methods: ['GET'],
    //       store: useRedis ? 'redis' : 'memory',
    //       redisUrl
    //     }
    //   }
    // },
    
    // // Auth service - typically no caching but reliability is important
    // {
    //   name: 'auth',
    //   path: '/api/auth',
    //   target: serviceUrls.auth,
    //   options: {
    //     pathRewrite: { '^/api/auth': '/auth' },
    //     circuitBreakerOptions: {
    //       name: 'auth-service',
    //       timeout: 3000,  // Lower timeout for auth
    //       errorThresholdPercentage: 25, // More sensitive circuit
    //       resetTimeout: 10000, // Faster recovery attempt
    //     }
    //   }
    // },
    
    // Notifications service
    // {
    //   name: 'notifications',
    //   path: '/api/notifications',
    //   target: serviceUrls.notifications,
    //   options: {
    //     pathRewrite: { '^/api/notifications': '/notifications' },
    //     circuitBreakerOptions: {
    //       name: 'notifications-service',
    //       timeout: 4000,
    //       errorThresholdPercentage: 50,
    //       resetTimeout: 30000,
    //     }
    //   }
    // },
    
    // // Search service
    // {
    //   name: 'search',
    //   path: '/api/search',
    //   target: serviceUrls.search,
    //   options: {
    //     pathRewrite: { '^/api/search': '/search' },
    //     circuitBreakerOptions: {
    //       name: 'search-service',
    //       timeout: 10000, // Search can take longer
    //       errorThresholdPercentage: 50,
    //       resetTimeout: 30000,
    //     },
    //     cacheOptions: {
    //       ttl: 60,
    //       methods: ['GET'],
    //       store: useRedis ? 'redis' : 'memory',
    //       redisUrl
    //     }
    //   }
    // },
    
    // Service Template
    {
      name: 'service_template',
      path: '/api/service-template',
      target: serviceUrls.service_template,
      options: {
        pathRewrite: { '^/api/service-template': '' },
        circuitBreakerOptions: {
          name: 'service-template',
          timeout: 5000,
          errorThresholdPercentage: 50,
          resetTimeout: 30000,
        },
        cacheOptions: {
          ttl: 60,
          methods: ['GET'],
          store: useRedis ? 'redis' : 'memory',
          redisUrl
        }
      }
    },

    {
      name: 'organizations',
      path: '/api/organizations',
      target: serviceUrls.organizations,
      options: {
        pathRewrite: { '^/api/service-template': '' },
        circuitBreakerOptions: {
          name: 'service-template',
          timeout: 5000,
          errorThresholdPercentage: 50,
          resetTimeout: 30000,
        },
        cacheOptions: {
          ttl: 60,
          methods: ['GET'],
          store: useRedis ? 'redis' : 'memory',
          redisUrl
        }
      }
    },

    {
      name: 'opportunities',
      path: '/api/opportunities',
      target: serviceUrls.opportunities,
      options: {
        pathRewrite: { '^/api/opportunities': '/opportunities' },
        circuitBreakerOptions: {
          name: 'opportunities-service',
          timeout: 5000,
          errorThresholdPercentage: 50,
          resetTimeout: 30000,
        },
        cacheOptions: {
          ttl: 60,
          methods: ['GET'],
          store: useRedis ? 'redis' : 'memory',
          redisUrl
        }
      }
    }
  ],
  
  // Global options
  globalOptions: {
    circuitBreaker: {
      enabled: true,
      options: {
        timeout: 5000,
        errorThresholdPercentage: 50,
        resetTimeout: 30000,
      }
    },
    cache: {
      enabled: true,
      options: {
        ttl: 60,
        methods: ['GET'],
        store: useRedis ? 'redis' : 'memory',
        redisUrl,
      }
    }
  }
};

export default gatewayConfig; 