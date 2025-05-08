# GoodDeed API Gateway

The API Gateway acts as the entry point for all client requests to the GoodDeed microservices architecture. This gateway handles routing, caching, circuit breaking, and authentication for the backend services.

## Features

- **Routing**: Routes client requests to appropriate backend microservices
- **Circuit Breaking**: Prevents cascading failures using circuit breaker patterns
- **Caching**: Implements configurable response caching for improved performance
- **Metrics**: Collects and exposes performance metrics via Prometheus
- **Authentication**: Integrates with Clerk for authentication and authorization
- **Logging**: Structured logging with contextual request information

## Architecture

```
Client ────► API Gateway ────► Microservices
                 │
                 ├──► Users Service
                 ├──► Events Service
                 ├──► Auth Service
                 ├──► Notifications Service
                 └──► Search Service
```

## Configuration

The gateway is configured using environment variables:

```
# Service URLs
USERS_SERVICE_URL=http://localhost:4001
EVENTS_SERVICE_URL=http://localhost:4002
AUTH_SERVICE_URL=http://localhost:4003
NOTIFICATIONS_SERVICE_URL=http://localhost:4004
SEARCH_SERVICE_URL=http://localhost:4005

# Optional Redis configuration for distributed caching
REDIS_URL=redis://localhost:6379

# Server configuration
PORT=4000
NODE_ENV=development
LOG_LEVEL=info
```

## Routes

| Endpoint | Service | Description |
|----------|---------|-------------|
| `/api/users/*` | Users Service | User profiles and management |
| `/api/events/*` | Events Service | Event listings and management |
| `/api/auth/*` | Auth Service | Authentication and authorization |
| `/api/notifications/*` | Notifications Service | User notifications |
| `/api/search/*` | Search Service | Search functionality |

## Health & Metrics

- Health check endpoint: `/health`
- Circuit breaker status: `/circuits`
- Prometheus metrics: `/metrics`

## Development

To run the API Gateway locally:

```bash
# Install dependencies
npm install

# Start in development mode
npm run dev
```

## Testing

```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration
```

## Dependencies

- Express.js - Web framework
- http-proxy-middleware - Proxy and routing
- Winston - Logging
- Prometheus - Metrics
- Circuit breaker and caching from @repo/middleware

## License

This project is part of the GoodDeed application. 