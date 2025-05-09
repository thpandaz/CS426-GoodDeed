#!/bin/bash

# Define color codes for better readability
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

function cleanup() {
  echo -e "${YELLOW}Gracefully shutting down docker-compose services...${NC}"
  docker-compose down
  exit 0
}

# Set up trap to handle termination signals
trap cleanup SIGINT SIGTERM EXIT

# Create necessary directories if they don't exist
echo -e "${GREEN}Creating configuration directories...${NC}"
mkdir -p prometheus grafana

# Create prometheus configuration if it doesn't exist
if [ ! -f prometheus/prometheus.yml ]; then
  echo -e "${YELLOW}Creating default prometheus.yml${NC}"
  cat > prometheus/prometheus.yml << EOF
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'api-gateway'
    static_configs:
      - targets: ['api-gateway:4000']

  - job_name: 'services'
    static_configs:
      - targets: ['services_template:3000', 'organizations:3001']

  - job_name: 'registry'
    static_configs:
      - targets: ['registry:5000']
EOF
fi

# Create grafana configuration if it doesn't exist
if [ ! -f grafana/grafana.ini ]; then
  echo -e "${YELLOW}Creating default grafana.ini${NC}"
  cat > grafana/grafana.ini << EOF
[auth.anonymous]
enabled = true
org_name = Main Org.
org_role = Viewer

[security]
admin_user = admin
EOF
fi

# Build and start the services
echo -e "${GREEN}Building Docker images...${NC}"
docker-compose build

echo -e "${GREEN}Starting services...${NC}"
docker-compose up -d

echo -e "${GREEN}Services started successfully!${NC}"
echo -e "${YELLOW}Access points:${NC}"
echo -e "- API Gateway: http://localhost:4000"
echo -e "- Grafana:     http://localhost:3000"
echo -e "- Prometheus:  http://localhost:9090"
echo -e "- Web App:     http://localhost:8000"

# Ask if the user wants to follow logs
read -p "Do you want to view logs? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  docker-compose logs -f
fi