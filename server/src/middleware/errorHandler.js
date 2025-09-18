/**
 * Global error handling middleware
 * Catches and formats all errors in a consistent manner
 */
export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Default error response
  let error = {
    success: false,
    message: 'Internal server error',
    statusCode: 500
  };

  // Firebase Auth errors
  if (err.code && err.code.startsWith('auth/')) {
    error.statusCode = 401;
    error.message = getFirebaseAuthErrorMessage(err.code);
  }
  
  // Firestore errors
  else if (err.code && err.code.includes('firestore')) {
    error.statusCode = 500;
    error.message = 'Database operation failed';
  }
  
  // Validation errors (Joi)
  else if (err.isJoi) {
    error.statusCode = 400;
    error.message = 'Validation error';
    error.errors = err.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message
    }));
  }
  
  // Custom application errors
  else if (err.statusCode) {
    error.statusCode = err.statusCode;
    error.message = err.message;
  }
  
  // Network/timeout errors
  else if (err.code === 'ECONNREFUSED' || err.code === 'ETIMEDOUT') {
    error.statusCode = 503;
    error.message = 'Service temporarily unavailable';
  }

  // Don't expose internal error details in production
  if (process.env.NODE_ENV === 'production') {
    delete error.stack;
  } else {
    error.stack = err.stack;
  }

  res.status(error.statusCode).json(error);
};

/**
 * Maps Firebase Auth error codes to user-friendly messages
 */
const getFirebaseAuthErrorMessage = (errorCode) => {
  const errorMessages = {
    'auth/user-not-found': 'User not found',
    'auth/wrong-password': 'Invalid password',
    'auth/email-already-in-use': 'Email is already registered',
    'auth/weak-password': 'Password is too weak',
    'auth/invalid-email': 'Invalid email address',
    'auth/user-disabled': 'User account has been disabled',
    'auth/too-many-requests': 'Too many failed attempts. Please try again later',
    'auth/id-token-expired': 'Session has expired. Please login again',
    'auth/id-token-revoked': 'Session has been revoked. Please login again',
    'auth/invalid-id-token': 'Invalid authentication token'
  };

  return errorMessages[errorCode] || 'Authentication error occurred';
};

/**
 * 404 Not Found handler
 */
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
};

/**
 * Async error wrapper
 * Wraps async route handlers to catch errors automatically
 */
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
