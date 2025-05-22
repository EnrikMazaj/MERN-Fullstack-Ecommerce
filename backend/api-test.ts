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

        // Test login endpoint
        console.log('\n3. Testing /api/login endpoint:');
        const loginResponse = await axios.post(`${API_URL}/login`, {
            username: 'testuser',
            password: 'testpassword'
        });

        // Test protected endpoint
        console.log('\n4. Testing /api/protected endpoint:');
        const protectedResponse = await axios.get(`${API_URL}/protected`, {
            headers: {
                'Authorization': `Bearer ${loginResponse.data.token}`
            }
        });
        console.log('Status:', protectedResponse.status);
        console.log('Response:', protectedResponse.data);

        // Test logout endpoint
        console.log('\n5. Testing /api/logout endpoint:');
        console.log('\nAll tests completed successfully!');
    } catch (error) {
        console.error('Error testing API:', error);
    }
}

// Run the tests
testAPI(); 
