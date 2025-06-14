# 🚌 Bus E-Commerce Platform

A modern, full-stack bus booking platform built with React, Node.js, and MongoDB. This application provides a seamless booking experience for bus travel with real-time availability, secure payments, and responsive design.

## 🚀 Features

- **🎟️ Bus Booking System** - Search, select, and book bus tickets with real-time availability
- **💳 Secure Payments** - Integrated Stripe payment gateway for safe transactions
- **📱 Responsive Design** - Optimized for both desktop and mobile devices
- **🗺️ Interactive Maps** - Leaflet integration for route visualization
- **📊 State Management** - Redux with persistence for optimal user experience
- **🔒 Session Management** - Redis-based session storage for security
- **📋 Booking Management** - User-friendly booking history and management

## 🖥️ Screenshots

### Desktop Home View

<img width="1431" alt="Screenshot 2025-06-02 at 3 26 00 PM" src="https://github.com/user-attachments/assets/6503a90d-4112-4903-8f60-6b8ab6619293" />

### Desktop Bus Panel

<img width="1426" alt="Screenshot 2025-06-02 at 3 27 38 PM" src="https://github.com/user-attachments/assets/7b0ba78c-5d6e-4ea9-9ccc-2b660b5844b0" />

### Mobile MyBookings Window

<img width="353" alt="Screenshot 2025-06-02 at 3 31 41 PM" src="https://github.com/user-attachments/assets/9ec408e2-b2ed-4449-a21f-3c5dd3189441" />

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Redux Toolkit** - State management with modern Redux patterns
- **React Router DOM** - Client-side routing
- **Stripe React** - Payment processing components
- **React Leaflet** - Interactive maps
- **React Calendar** - Date selection components
- **React Toastify** - Beautiful notifications

### Backend

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **TypeScript** - Type-safe server development
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Redis** - Session storage and caching
- **Bcrypt** - Password hashing
- **Stripe** - Payment processing

### DevOps & Tools

- **Docker** - Containerization
- **Docker Compose** - Multi-container deployment
- **Nginx** - Reverse proxy and static file serving
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Jest** - Testing framework
- **Nodemon** - Development server

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- MongoDB
- Redis
- Docker (optional)

### Local Development

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd bus-ecommerce
   ```

2. **Install dependencies**

   ```bash
   # Install root dependencies
   npm install

   # Install backend dependencies
   cd backend
   npm install
   cd ..
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ask for the .env here enrikmazaj77@gmail.com

4. **Start the development server**
   ```bash
   npm run dev
   ```

### Docker Deployment

1. **Build and run with Docker Compose**

   ```bash
   docker-compose up --build
   ```

2. **For testing environment**
   ```bash
   docker-compose -f docker-compose.test.yml up --build
   ```

## 🔧 Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run client` - Start only the React frontend
- `npm run server` - Start only the backend server
- `npm run build` - Build the React app for production
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🚀 Deployment

The application is configured for deployment on:

- **Render** - Configuration available in `render.yaml`
- **Docker** - Full containerization support
- **Traditional hosting** - Built React app can be served statically

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 📧 Contact

For questions or support, please contact this email - enrikmazaj77@gmail.com
