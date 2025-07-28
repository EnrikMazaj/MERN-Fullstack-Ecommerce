# Development Setup Guide

## Prerequisites

1. **Node.js** (v16 or higher)
2. **MongoDB** - Install and start MongoDB
3. **Redis** - Install and start Redis

## Quick Start

### 1. Install Dependencies

```bash
npm install
cd backend && npm install
```

### 2. Start Required Services

**MongoDB:**

```bash
# macOS with Homebrew
brew services start mongodb-community

# Or manually
mongod --config /usr/local/etc/mongod.conf
```

**Redis:**

```bash
# macOS with Homebrew
brew services start redis

# Or manually
redis-server
```

### 3. Start Development Servers

**Option 1: Use the setup script**

```bash
./scripts/dev-setup.sh
```

**Option 2: Manual start**

```bash
# Terminal 1 - Start backend
cd backend
npm run dev

# Terminal 2 - Start frontend
npm run client
```

### 4. Test the Setup

```bash
# Test backend API
./scripts/test-backend.sh
```

## Environment Variables

For local development, the following environment variables are automatically set:

- `NODE_ENV=development`
- `PORT=3000` (backend)
- `MONGODB_URL=mongodb://localhost:27017/bus-ecommerce`
- `REDIS_URL=redis://localhost:6379`
- `SESSION_SECRET=your-development-secret-key`

## URLs

- **Backend API:** http://localhost:3000
- **Frontend:** http://localhost:3001
- **API Health Check:** http://localhost:3000/api/healthcheck

## Troubleshooting

### Sign-in not working

1. Check if MongoDB is running: `brew services list | grep mongodb`
2. Check if Redis is running: `brew services list | grep redis`
3. Check backend logs for connection errors
4. Verify the API URL in browser dev tools

### CORS errors

The backend is configured to allow:

- `http://localhost:3000`
- `http://localhost:3001`
- Production domains

### Database connection issues

1. Ensure MongoDB is running on port 27017
2. Check if the database exists: `mongo bus-ecommerce`
3. Verify connection in backend logs

## API Endpoints

- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `GET /api/users/check-auth` - Check authentication
- `POST /api/users/logout` - User logout
