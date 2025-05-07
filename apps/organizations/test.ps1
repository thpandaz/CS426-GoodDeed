# Test script for organization endpoints

# Base URL
$baseUrl = "http://localhost:3001/organizations-service/v1/organizations"
$headers = @{
    "Content-Type" = "application/json"
}

# Helper function to make requests and handle errors
function Invoke-ApiRequest {
    param (
        [string]$Uri,
        [string]$Method = "GET",
        [string]$Body,
        [string]$TestName
    )
    Write-Host "Testing: $TestName"
    try {
        if ($Body) {
            $response = Invoke-RestMethod -Uri $Uri -Method $Method -Headers $headers -Body $Body
        } else {
            $response = Invoke-RestMethod -Uri $Uri -Method $Method -Headers $headers
        }
        Write-Host "Success: $TestName"
        return $response
    } catch {
        Write-Host "Failed: $TestName"
        Write-Host "Error: $($_.Exception.Message)"
        return $null
    }
}

# Generate unique identifiers
$timestamp = Get-Date -Format "yyyyMMddHHmmss"
$uniqueEmail = "test$timestamp@gooddeeds.org"
$uniqueClerkId = "clerk_$timestamp"

Write-Host "Starting Organization Service Tests"

# 1. Register Valid Organization
$registerBody = @{
    uuid = "org_$timestamp"
    clerkId = $uniqueClerkId
    name = "Good Deeds Foundation"
    email = $uniqueEmail
    location = @{
        city = "New York"
        country = "USA"
        state = "NY"
        cordinates = @{
            lat = 40.7128
            long = -74.0060
        }
    }
    phone = "+1-555-123-4567"
    industry = "Non-profit"
    reputation = @{
        score = 5
        amount_of_reviews = 1
    }
    events = @()
} | ConvertTo-Json -Depth 10

$org = Invoke-ApiRequest -Uri "$baseUrl/register" -Method "POST" -Body $registerBody -TestName "Register Organization"
if (-not $org) { exit 1 }
$orgId = $org._id

# Test duplicate registration
$duplicateResponse = Invoke-ApiRequest -Uri "$baseUrl/register" -Method "POST" -Body $registerBody -TestName "Register Duplicate (Should Fail)"

# Test get operations
$orgById = Invoke-ApiRequest -Uri "$baseUrl/$orgId" -Method "GET" -TestName "Get by ID"
$invalidOrgById = Invoke-ApiRequest -Uri "$baseUrl/507f1f77bcf86cd799439011" -Method "GET" -TestName "Get Invalid ID"
$orgByClerkId = Invoke-ApiRequest -Uri "$baseUrl/clerk/$uniqueClerkId" -Method "GET" -TestName "Get by Clerk ID"

# Test update
$updateBody = @{
    name = "Updated Good Deeds Foundation"
    phone = "+1-555-987-6543"
} | ConvertTo-Json

$updatedOrg = Invoke-ApiRequest -Uri "$baseUrl/$orgId" -Method "PUT" -Body $updateBody -TestName "Update Organization"

# Test invalid update
$invalidUpdateBody = @{
    reputation = @{
        score = "not a number"
    }
} | ConvertTo-Json

$invalidUpdate = Invoke-ApiRequest -Uri "$baseUrl/$orgId" -Method "PUT" -Body $invalidUpdateBody -TestName "Invalid Update"

# Test event management
$eventBody = @{
    eventId = "event_$timestamp"
} | ConvertTo-Json

$addedEvent = Invoke-ApiRequest -Uri "$baseUrl/$orgId/events" -Method "POST" -Body $eventBody -TestName "Add Event"
$removeEvent = Invoke-ApiRequest -Uri "$baseUrl/$orgId/events/event_$timestamp" -Method "DELETE" -TestName "Remove Event"

# Test reputation
$reputationBody = @{
    score = 4.5
} | ConvertTo-Json

$updatedReputation = Invoke-ApiRequest -Uri "$baseUrl/$orgId/reputation" -Method "POST" -Body $reputationBody -TestName "Update Reputation"

$invalidReputationBody = @{
    score = 6.0
} | ConvertTo-Json

$invalidReputation = Invoke-ApiRequest -Uri "$baseUrl/$orgId/reputation" -Method "POST" -Body $invalidReputationBody -TestName "Invalid Reputation"

# Test deletion
$deleteResponse = Invoke-ApiRequest -Uri "$baseUrl/$orgId" -Method "DELETE" -TestName "Delete Organization"
$deletedOrg = Invoke-ApiRequest -Uri "$baseUrl/$orgId" -Method "GET" -TestName "Verify Deletion"

Write-Host "All tests completed!" 