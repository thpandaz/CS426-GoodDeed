# PowerShell script for Windows users

# Define color codes and functions for better readability
function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

function Cleanup {
    Write-ColorOutput Yellow "Gracefully shutting down docker-compose services..."
    docker-compose down
    exit
}

# Register cleanup handler
$null = Register-EngineEvent -SourceIdentifier ([System.Management.Automation.PsEngineEvent]::Exiting) -Action { Cleanup }

# Create necessary directories if they don't exist
Write-ColorOutput Green "Creating configuration directories..."
if (-not (Test-Path -Path "prometheus")) { New-Item -Path "prometheus" -ItemType Directory }
if (-not (Test-Path -Path "grafana")) { New-Item -Path "grafana" -ItemType Directory }

# Create prometheus configuration if it doesn't exist
if (-not (Test-Path -Path "prometheus\prometheus.yml")) {
    Write-ColorOutput Yellow "Creating default prometheus.yml"
    @"
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
"@ | Out-File -FilePath "prometheus\prometheus.yml" -Encoding utf8
}

# Create grafana configuration if it doesn't exist
if (-not (Test-Path -Path "grafana\grafana.ini")) {
    Write-ColorOutput Yellow "Creating default grafana.ini"
    @"
[auth.anonymous]
enabled = true
org_name = Main Org.
org_role = Viewer

[security]
admin_user = admin
"@ | Out-File -FilePath "grafana\grafana.ini" -Encoding utf8
}
try{
    # Build and start the services
    Write-ColorOutput Green "Building Docker images..."
    docker-compose build

    Write-ColorOutput Green "Starting services..."
    docker-compose up -d

    Write-ColorOutput Green "Services started successfully!"
    Write-ColorOutput Yellow "Access points:"
    Write-Host "- API Gateway: http://localhost:4000"
    Write-Host "- Grafana:     http://localhost:3000"
    Write-Host "- Prometheus:  http://localhost:9090"
    Write-Host "- Web App:     http://localhost:8000"

    # Ask if the user wants to follow logs
    $response = Read-Host "Do you want to view logs? (y/n)"
    if ($response -eq "y") {
        docker-compose logs -f
    }else{
        # stall the script
        Write-ColorOutput Yellow "Press Enter to exit..."
        $null = Read-Host
    }
}
finally{
    Cleanup
}