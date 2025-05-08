# GoodDeed Service Registry

This is a lightweight service registry that enables service discovery for the GoodDeed microservices architecture. It allows services to register themselves, send heartbeats, and discover other services.

## Features

- **Service Registration**: Services can register themselves with the registry
- **Service Discovery**: API Gateway can discover available service instances
- **Health Checks**: Registry monitors service health through heartbeats
- **Load Balancing**: Registry enables round-robin load balancing across instances

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
cd apps/registry
pnpm install
```

### Running the Registry Service

```bash
pnpm dev
```

The service will start at http://localhost:4500.

## Testing the Registry System

You can test the registry with the included test script:

```bash
pnpm test-registry
```

This script will:
1. Register multiple service instances
2. Query the registry to get services
3. Deregister services
4. Show the updated service list

## Integration with Other Components

### Service Template Integration

Services built with the services_template automatically register with the registry service. The registration happens on startup, and the service sends regular heartbeats to maintain its "active" status.

Key files:
- `apps/services_template/src/index.ts`: Contains the registration logic

Environment variables:
- `SERVICE_NAME`: The name of your service
- `REGISTRY_URL`: URL of the registry service
- `HEARTBEAT_INTERVAL_MS`: How often to send heartbeats

### API Gateway Integration

The API Gateway uses the registry to discover service instances. It maintains a local cache of service instances and periodically refreshes it.

Key files:
- `apps/api-gateway/src/routes/serviceRegistry.ts`: Client for the registry service
- `apps/api-gateway/src/index.ts`: Configures and uses the service registry

Environment variables:
- `SERVICE_REGISTRY_URL`: URL of the registry service

## Manual Testing

To test the whole system manually:

1. Start the Registry Service:
   ```bash
   cd apps/registry
   pnpm dev
   ```

2. Start a Service:
   ```bash
   cd apps/services_template
   # Ensure SERVICE_NAME and PORT are set in .env
   pnpm dev
   ```

3. Start the API Gateway:
   ```bash
   cd apps/api-gateway
   pnpm dev
   ```

4. Make requests to the API Gateway, which will forward them to the appropriate service.

5. To verify everything is working:
   - Check the registry: http://localhost:4500/services
   - Check the API Gateway: http://localhost:4000/health

## API Endpoints

### Registry Service Endpoints

- `POST /register`: Register a service instance
- `POST /deregister`: Deregister a service instance
- `GET /services`: Get all registered services
- `GET /services/:name`: Get instances of a specific service
- `GET /health`: Check the health of the registry

## Architecture

```
┌─────────────┐      ┌─────────────┐
│  Service 1  ├─────►│             │
└─────────────┘      │             │
                     │   Service   │
┌─────────────┐      │   Registry  │
│  Service 2  ├─────►│             │
└─────────────┘      └──────┬──────┘
                            │
┌─────────────┐      ┌──────▼──────┐      ┌─────────────┐
│    Client   ├─────►│ API Gateway ├─────►│  Services   │
└─────────────┘      └─────────────┘      └─────────────┘
``` 