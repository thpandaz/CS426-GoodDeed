import axios from 'axios';

/**
 * Test script for Service Registry
 * This script will:
 * 1. Register multiple service instances
 * 2. Query the registry to get services
 * 3. Deregister services
 */

const registryUrl = process.env.REGISTRY_URL || 'http://localhost:4500';
const serviceNames = ['users', 'events', 'auth', 'notifications'];
const ports = [4001, 4002, 4003, 4004];

// Register a service instance
async function registerService(name: string, port: number): Promise<void> {
  try {
    const url = `http://localhost:${port}`;
    
    console.log(`Registering service ${name} at ${url}`);
    
    const response = await axios.post(`${registryUrl}/register`, {
      name,
      url
    });
    
    console.log(`✅ Registered ${name} service: ${JSON.stringify(response.data)}`);
  } catch (error) {
    console.error(`❌ Failed to register ${name} service:`, error);
  }
}

// Get all services from registry
async function getServices(): Promise<void> {
  try {
    console.log('Fetching all services from registry...');
    
    const response = await axios.get(`${registryUrl}/services`);
    
    console.log('✅ Services in registry:');
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('❌ Failed to fetch services:', error);
  }
}

// Get specific service instances
async function getServiceInstances(name: string): Promise<void> {
  try {
    console.log(`Fetching instances for ${name}...`);
    
    const response = await axios.get(`${registryUrl}/services/${name}`);
    
    console.log(`✅ Instances for ${name}:`);
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error(`❌ Failed to fetch instances for ${name}:`, error);
  }
}

// Deregister a service instance
async function deregisterService(name: string, port: number): Promise<void> {
  try {
    const url = `http://localhost:${port}`;
    
    console.log(`Deregistering service ${name} at ${url}`);
    
    const response = await axios.post(`${registryUrl}/deregister`, {
      name,
      url
    });
    
    console.log(`✅ Deregistered ${name} service: ${JSON.stringify(response.data)}`);
  } catch (error) {
    console.error(`❌ Failed to deregister ${name} service:`, error);
  }
}

async function runTest(): Promise<void> {
  try {
    console.log('🚀 Starting Service Registry Test\n');
    
    // Check registry status
    try {
      const healthResponse = await axios.get(`${registryUrl}/health`);
      console.log('Registry health check:', healthResponse.data);
    } catch (error) {
      console.error('❌ Registry not available. Please ensure the registry service is running at', registryUrl);
      return;
    }
    
    console.log('\n1️⃣ Registering services...');
    
    // Register multiple instances of each service
    for (const [index, name] of serviceNames.entries()) {
      // Register primary instance
      await registerService(name, ports[index]);
      
      // Register a second instance of each service at port+1000
      await registerService(name, ports[index] + 1000);
    }
    
    console.log('\n2️⃣ Get all services...');
    await getServices();
    
    console.log('\n3️⃣ Get service instances for each service...');
    for (const name of serviceNames) {
      await getServiceInstances(name);
    }
    
    console.log('\n4️⃣ Deregister some services...');
    await deregisterService('users', ports[0] + 1000);
    await deregisterService('events', ports[1]);
    
    console.log('\n5️⃣ Get services again after deregistration...');
    await getServices();
    
    console.log('\n✨ Test completed');
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run the test
runTest(); 