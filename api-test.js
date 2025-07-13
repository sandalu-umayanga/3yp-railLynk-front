// Test script to verify AdminTracking API endpoints
// Run this in the browser console to test API connectivity

const API_BASE = 'https://raillynk.site/api/';

async function testAPI() {
  console.log('🧪 Testing AdminTracking API endpoints...\n');
  
  // Test 1: Station list endpoint
  try {
    console.log('📍 Testing station/list/ endpoint...');
    const stationResponse = await fetch(`${API_BASE}station/list/`);
    const stationData = await stationResponse.json();
    console.log('✅ Stations endpoint working:', stationData?.length || 0, 'stations found');
    console.log('Station sample:', stationData?.[0]);
  } catch (error) {
    console.error('❌ Stations endpoint failed:', error.message);
  }
  
  // Test 2: Train locations endpoint
  try {
    console.log('\n🚂 Testing trains/locations/ endpoint...');
    const trainResponse = await fetch(`${API_BASE}trains/locations/`);
    const trainData = await trainResponse.json();
    console.log('✅ Trains endpoint working:', trainData?.length || 0, 'trains found');
    console.log('Train sample:', trainData?.[0]);
  } catch (error) {
    console.error('❌ Trains endpoint failed:', error.message);
  }
  
  // Test 3: Network connectivity
  try {
    console.log('\n🌐 Testing map tiles...');
    const tileResponse = await fetch('https://a.tile.openstreetmap.org/8/157/99.png');
    console.log('✅ Map tiles accessible:', tileResponse.status === 200);
  } catch (error) {
    console.error('❌ Map tiles failed:', error.message);
  }
  
  console.log('\n🔍 Test complete! Check results above.');
}

// Run the test
testAPI();
