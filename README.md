
# GoodDeed: Volunteer Opportunity Platform

GoodDeed connects volunteers with opportunities by aggregating volunteer opportunities from various organizations in one centralized platform. Our mission is to simplify the volunteer discovery process while helping organizations find the help they need.

## 🌟 Overview

Volunteers often struggle to find relevant, local, or time-flexible opportunities, while smaller organizations lack the resources to reach and coordinate with potential volunteers. GoodDeed bridges this gap by providing a comprehensive platform that matches volunteers with the right opportunities.

## Team Name

Deeders:

- Phong Trinh Ha [thpandaz](https://github.com/thpandaz)
- Gabriel Laboy [glaboy02](https://github.com/glaboy02)
- Cameron Proulx [0xPorkchops](https://github.com/0xPorkchops)
- Jacob Beaumont [jcbeaumont22](https://github.com/jcbeaumont22)

## Instructions

This Turborepo includes the following packages and apps:

### Dependencies

### Sprints

- Sprint 1: Vision Board (Completed)
- Sprint 2: Organize (Completed)
- Sprint 3: Initialize UI (Pending)

## 📋 Table of Contents

- [Architecture](#-architecture)
- [Services](#-services)
- [Getting Started](#-getting-started)
- [Development](#-development)
- [API Documentation](#-api-documentation)
- [Monitoring & Metrics](#-monitoring--metrics)
- [Troubleshooting](#-troubleshooting)
- [Team](#-team)

## 🏛 Architecture

GoodDeed uses a modern microservices architecture:

```
                 ┌───────────────┐
                 │  API Gateway  │
                 └───────┬───────┘
                         │
            ┌────────────┼────────────┐
            │            │            │
┌───────────▼──┐  ┌──────▼─────┐  ┌──▼──────────┐
│  Services    │  │Organizations│  │   Users     │ ...
└──────────────┘  └────────────┘  └─────────────┘
            │            │            │
            └────────────┼────────────┘
                         │
                  ┌──────▼──────┐
                  │  MongoDB    │
                  └─────────────┘
```

- **API Gateway**: Entry point for all client requests, handles routing and authentication
- **Microservices**: Specialized services for different business domains
- **MongoDB**: Shared database for persistence
- **Redis**: Caching layer for improved performance
- **Prometheus & Grafana**: Real-time monitoring and visualization

## 🧩 Services

| Service | Description | Port |
|---------|-------------|------|
| api-gateway | Routes client requests to appropriate microservices | 4000 |
| services_template | Template service for building new microservices | 3000 |
| organizations | Manages organization profiles and data | 3001 |
| users | Handles user authentication and profiles | 3000 |
| registry | Service discovery for microservices | 5000 |
| prometheus | Metrics collection | 9090 |
| grafana | Metrics visualization | 3000 |
| redis | Caching service | 6379 |
| mongo | Database | 27017 |
| web | Frontend application | 8000 |

## 🚀 Getting Started

### Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop) and Docker Compose
- [Node.js](https://nodejs.org/) (v16+)
- [pnpm](https://pnpm.io/installation)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/CS426-GoodDeed.git
cd CS426-GoodDeed
```

2. Install dependencies
```bash
pnpm install
```
4. Start the services
```bash
./build.sh # linux or max
./build.ps1 #powershell
```

5. Access the applications
- Web App: http://localhost:8000
- API Gateway: http://localhost:4000
- Grafana: http://localhost:3000 (admin/admin)
- Prometheus: http://localhost:9090

## 💻 Development

This project uses Turborepo for managing the monorepo structure:

```
.
├── apps/                  # Applications
│   ├── api-gateway/       # API Gateway Service
│   ├── organizations/     # Organizations Service
│   ├── registry/          # Service Registry
│   ├── services_template/ # Service Template
│   ├── users/             # Users Service 
│   └── web/               # Frontend application
├── packages/              # Shared packages
│   ├── db/                # Database utilities
│   ├── middleware/        # Shared middleware
│   ├── models/            # Data models
│   └── utils/             # Utility functions
└── ...
```

### Running in Development Mode

```bash
# Start all services
pnpm dev

# Start a specific service
pnpm dev --filter=api-gateway
```

### Building for Production

```bash
pnpm build
```

## 📚 API Documentation

### API Gateway Endpoints

The API Gateway routes requests to the appropriate services:

- **Service Template**: `/api/service-template/*`
- **Organizations**: `/api/organizations/*`
- **Users**: `/api/users/*`

Example API calls:

```bash
# Get service health
curl http://localhost:4000/api/service-template/health

# Get all organizations
curl http://localhost:4000/api/organizations

# Get user profile
curl http://localhost:4000/api/users/profile -H "Authorization: Bearer YOUR_TOKEN"
```

## 📊 Monitoring & Metrics

GoodDeed includes comprehensive monitoring with Prometheus and Grafana:

- **Prometheus**: http://localhost:9090
- **Grafana**: http://localhost:3000
  - Default credentials: admin/admin
  - Pre-configured dashboards for all services

Custom metrics:
- HTTP request durations
- Error rates
- Resource utilization

## ❓ Troubleshooting

### Common Issues

1. **API Gateway returns 503 errors**:
   - Ensure all services are running: `docker-compose ps`
   - Check service logs: `docker-compose logs services_template`
   - Verify network connectivity: `docker-compose exec api-gateway ping services_template`

2. **Services not registering with Registry**:
   - Check registry logs: `docker-compose logs registry`
   - Verify environment variables are set correctly
   - Ensure services can reach the registry at http://registry:5000

### Viewing Logs

```bash
# View logs for all services
docker-compose logs

# View logs for a specific service
docker-compose logs api-gateway

# Follow logs in real-time
docker-compose logs -f api-gateway
```

## 👥 Team

**Deeders:**

- Phong Trinh Ha ([@thpandaz](https://github.com/thpandaz))
- Gabriel Laboy ([@glaboy02](https://github.com/glaboy02))
- Cameron Proulx ([@0xPorkchops](https://github.com/0xPorkchops))
- Jacob Beaumont ([@jcbeaumont22](https://github.com/jcbeaumont22))

## Project Status

- Sprint 1: Vision Board ✅
- Sprint 2: Organize ✅ 
- Sprint 3: Initialize UI 🚧
- Sprint 4: Core Functionality 📅
- Sprint 5: Final Release 📅

---

© 2025 GoodDeed Team. All rights reserved.
