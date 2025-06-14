import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

async function testAPI() {
    try {

        const healthcheckResponse = await axios.get(`${API_URL}/healthcheck`);
        console.log('Status:', healthcheckResponse.status);
        console.log('Response:', healthcheckResponse.data);

        const testResponse = await axios.get(`${API_URL}/test`);
        console.log('Status:', testResponse.status);
        console.log('Response:', testResponse.data);

        const loginResponse = await axios.post(`${API_URL}/login`, {
            username: 'testuser',
            password: 'testpassword'
        });

        const protectedResponse = await axios.get(`${API_URL}/protected`, {
            headers: {
                'Authorization': `Bearer ${loginResponse.data.token}`
            }
        });
        console.log('Status:', protectedResponse.status);
        console.log('Response:', protectedResponse.data);

    } catch (error) {
        console.error('Error testing API:', error);
    }
}

testAPI(); 
