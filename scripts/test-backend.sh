#!/bin/bash

echo "🧪 Testing backend API..."

# Test health check
echo "Testing health check..."
curl -s http://localhost:3000/api/healthcheck

echo ""
echo ""

# Test user endpoints
echo "Testing user endpoints..."

# Test register endpoint
echo "Testing register endpoint..."
curl -s -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "password": "password123"
  }'

echo ""
echo ""

# Test login endpoint
echo "Testing login endpoint..."
curl -s -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

echo ""
echo ""

echo "✅ Backend API tests completed!" 
