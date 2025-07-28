#!/bin/bash

echo "🚀 Setting up development environment..."

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running. Please start MongoDB first:"
    echo "   brew services start mongodb-community"
    echo "   or"
    echo "   mongod --config /usr/local/etc/mongod.conf"
    exit 1
fi

# Check if Redis is running
if ! pgrep -x "redis-server" > /dev/null; then
    echo "⚠️  Redis is not running. Please start Redis first:"
    echo "   brew services start redis"
    echo "   or"
    echo "   redis-server"
    exit 1
fi

echo "✅ MongoDB and Redis are running"

# Set environment variables for development
export NODE_ENV=development
export PORT=3000
export MONGODB_URL=mongodb://localhost:27017/bus-ecommerce
export REDIS_URL=redis://localhost:6379
export SESSION_SECRET=your-development-secret-key

echo "📝 Environment variables set for development"

# Start the backend server
echo "🔧 Starting backend server..."
cd backend
npm run dev &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start the frontend
echo "🎨 Starting frontend..."
cd ..
npm run client &
FRONTEND_PID=$!

echo "✅ Development servers started!"
echo "   Backend: http://localhost:3000"
echo "   Frontend: http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
wait

# Cleanup
kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
echo "�� Servers stopped" 
