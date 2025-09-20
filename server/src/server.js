// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

console.log('Environment variables loaded:');
console.log(`PORT: ${process.env.PORT}`);
console.log(`FRONTEND_URL: ${process.env.FRONTEND_URL}`);
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';

// Import routes
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import careerRoutes from './routes/careers.js';
import recommendRoutes from './routes/recommend.js';
import aiAnalysisRoutes from './routes/aiAnalysis.js';

// Import middleware
import errorHandler from './middleware/errorHandler.js';
import notFoundHandler from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  }
});
app.use(limiter);

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Career Path Finder API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/recommend', recommendRoutes);
app.use('/api/ai', aiAnalysisRoutes);

// API documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'Career Path Finder API',
    version: '1.0.0',
    endpoints: {
      auth: {
        'POST /api/auth/signup': 'Create new user account',
        'POST /api/auth/verify-token': 'Verify Firebase ID token',
        'POST /api/auth/refresh-token': 'Refresh user claims',
        'POST /api/auth/logout': 'Logout user'
      },
      users: {
        'GET /api/users/profile': 'Get user profile',
        'PUT /api/users/profile': 'Update user profile',
        'POST /api/users/quiz-results': 'Save quiz results',
        'GET /api/users/quiz-results': 'Get quiz history',
        'POST /api/users/save-career-path': 'Save career to favorites',
        'DELETE /api/users/save-career-path/:id': 'Remove from favorites',
        'GET /api/users/saved-career-paths': 'Get saved careers'
      },
      careers: {
        'GET /api/careers': 'Get all career paths (with filters)',
        'GET /api/careers/:id': 'Get specific career path',
        'POST /api/careers': 'Create career path (Admin)',
        'PUT /api/careers/:id': 'Update career path (Admin)',
        'DELETE /api/careers/:id': 'Delete career path (Admin)',
        'GET /api/careers/categories/list': 'Get all categories',
        'GET /api/careers/skills/list': 'Get all skills'
      },
      recommendations: {
        'POST /api/recommend/careers': 'Get career recommendations',
        'POST /api/recommend/quiz-based': 'Quiz-based recommendations',
        'GET /api/recommend/similar/:id': 'Get similar careers',
        'POST /api/recommend/personalized': 'Personalized recommendations'
      }
    }
  });
});

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Career Path Finder API server running on port ${PORT}`);
  console.log(`📖 API Documentation: http://localhost:${PORT}/api`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated');
  });
});

export default app;
