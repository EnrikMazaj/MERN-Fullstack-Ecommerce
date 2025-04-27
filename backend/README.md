# Bus E-commerce Backend

## Deployment to Render

This backend service is configured to be deployed on Render.com.

### Prerequisites

- A Render.com account
- MongoDB database (Render provides MongoDB as a service)

### Deployment Steps

1. **Using the render.yaml (automatic)**:
   - Fork/clone this repository to your GitHub account
   - In Render dashboard, go to "Blueprints"
   - Connect your GitHub repository
   - Render will automatically detect the render.yaml file and set up the services

2. **Manual Setup**:
   - Create a new Web Service in Render
   - Connect your repository
   - Set the following:
     - Build Command: `cd backend && npm install && npm run build`
     - Start Command: `cd backend && npm start`
     - Environment Variables:
       - `PORT`: 3000 (or let Render assign one)
       - `MONGODB_URL`: Your MongoDB connection string
       - `NODE_ENV`: production

### Environment Variables

The following environment variables are required:

- `PORT`: The port on which the server will run
- `MONGODB_URL`: MongoDB connection string
- `NODE_ENV`: Set to 'production' for deployment

### Health Check

The service includes a health check endpoint at `/healthcheck` which Render uses to monitor the application status.

## Local Development

1. Install dependencies: `npm install`
2. Run in development mode: `npm run dev`
3. Build for production: `npm run build`
4. Start production build: `npm start` 