import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

async function testAPI() {
    try {
        console.log('Testing API endpoints...');

        // Test healthcheck endpoint
        console.log('\n1. Testing /api/healthcheck endpoint:');
        const healthcheckResponse = await axios.get(`${API_URL}/healthcheck`);
        console.log('Status:', healthcheckResponse.status);
        console.log('Response:', healthcheckResponse.data);

        // Test test endpoint
        console.log('\n2. Testing /api/test endpoint:');
        const testResponse = await axios.get(`${API_URL}/test`);
        console.log('Status:', testResponse.status);
        console.log('Response:', testResponse.data);

        console.log('\nAll tests completed successfully!');
    } catch (error) {
        console.error('Error testing API:', error);
    }
}

// Run the tests
testAPI(); 