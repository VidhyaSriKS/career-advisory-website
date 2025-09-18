# Career Path Finder Backend API

A comprehensive Node.js backend API for the Career Path Finder web application, built with Express.js and Firebase Firestore.

## 🚀 Features

- **User Authentication**: Firebase Auth integration with JWT token verification
- **User Management**: Profile management, quiz results, and saved career paths
- **Career Path CRUD**: Complete career path management with admin controls
- **Smart Recommendations**: AI-powered career matching based on interests and skills
- **Admin Panel**: Role-based access control for content management
- **Input Validation**: Comprehensive request validation using Joi
- **Error Handling**: Centralized error handling with user-friendly messages
- **Rate Limiting**: Protection against API abuse
- **Security**: Helmet.js security headers and CORS configuration

## 🛠 Tech Stack

- **Backend Framework**: Node.js with Express.js
- **Database**: Firebase Firestore (NoSQL)
- **Authentication**: Firebase Authentication
- **Validation**: Joi
- **Testing**: Jest with Supertest
- **Security**: Helmet.js, CORS, Rate Limiting

## 📁 Project Structure

```
server/
├── src/
│   ├── config/
│   │   └── firebase.js          # Firebase Admin SDK configuration
│   ├── middleware/
│   │   ├── auth.js              # Authentication middleware
│   │   ├── validation.js        # Input validation schemas
│   │   └── errorHandler.js      # Error handling middleware
│   ├── routes/
│   │   ├── auth.js              # Authentication routes
│   │   ├── users.js             # User management routes
│   │   ├── careers.js           # Career path CRUD routes
│   │   └── recommend.js         # Recommendation engine routes
│   ├── services/
│   │   └── recommendationEngine.js  # Career recommendation logic
│   ├── data/
│   │   └── seedData.js          # Database seeding utilities
│   ├── tests/
│   │   └── recommendationEngine.test.js  # Unit tests
│   └── server.js                # Main server file
├── package.json
├── .env.example
└── README.md
```

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Environment Configuration

Copy the example environment file and configure your Firebase credentials:

```bash
cp .env.example .env
```

Update the `.env` file with your Firebase project credentials:

```env
# Firebase Admin SDK Configuration
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour-private-key\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=your-client-cert-url

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

### 3. Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication and Firestore Database
3. Generate a service account key:
   - Go to Project Settings > Service Accounts
   - Click "Generate new private key"
   - Download the JSON file and extract the credentials for your `.env` file

### 4. Database Seeding (Optional)

Seed the database with sample career data:

```bash
node -e "import('./src/data/seedData.js').then(m => m.seedCareers())"
```

### 5. Start the Server

Development mode with auto-reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/signup` | Create new user account | No |
| POST | `/verify-token` | Verify Firebase ID token | No |
| POST | `/refresh-token` | Refresh user claims | No |
| POST | `/logout` | Logout user | No |

### User Routes (`/api/users`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/profile` | Get user profile | Yes |
| PUT | `/profile` | Update user profile | Yes |
| POST | `/quiz-results` | Save quiz results | Yes |
| GET | `/quiz-results` | Get quiz history | Yes |
| POST | `/save-career-path` | Save career to favorites | Yes |
| DELETE | `/save-career-path/:id` | Remove from favorites | Yes |
| GET | `/saved-career-paths` | Get saved careers | Yes |

### Career Routes (`/api/careers`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all career paths (with filters) | No |
| GET | `/:id` | Get specific career path | No |
| POST | `/` | Create career path | Admin |
| PUT | `/:id` | Update career path | Admin |
| DELETE | `/:id` | Delete career path | Admin |
| GET | `/categories/list` | Get all categories | No |
| GET | `/skills/list` | Get all skills | No |

### Recommendation Routes (`/api/recommend`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/careers` | Get career recommendations | No |
| POST | `/quiz-based` | Quiz-based recommendations | No |
| GET | `/similar/:id` | Get similar careers | No |
| POST | `/personalized` | Personalized recommendations | Yes |

## 🔍 Query Parameters

### Career Filtering (`GET /api/careers`)

- `category`: Filter by career category
- `minSalary`: Minimum salary filter
- `maxSalary`: Maximum salary filter
- `educationLevel`: Filter by education requirement
- `search`: Text search in title/description
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)

Example:
```
GET /api/careers?category=Technology&minSalary=60000&page=1&limit=10
```

## 🧪 Testing

Run unit tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## 🔒 Security Features

- **JWT Authentication**: Firebase ID token verification
- **Role-based Access**: Admin-only routes for content management
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: Joi schema validation for all inputs
- **CORS Protection**: Configured for frontend domain
- **Security Headers**: Helmet.js for security headers
- **Error Sanitization**: No sensitive data in error responses

## 🚀 Deployment

### Environment Variables for Production

Ensure all environment variables are set in your production environment:

- Set `NODE_ENV=production`
- Configure `FRONTEND_URL` to your production frontend URL
- Use production Firebase credentials

### Docker Deployment (Optional)

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY src/ ./src/
EXPOSE 5000
CMD ["npm", "start"]
```

## 📊 API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "fieldName",
      "message": "Validation error message"
    }
  ]
}
```

## 🤝 Contributing

1. Follow the existing code structure and naming conventions
2. Add unit tests for new features
3. Update API documentation for new endpoints
4. Ensure all tests pass before submitting

## 📝 License

This project is licensed under the MIT License.
