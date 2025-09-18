import express from 'express';
import { auth, firestore } from '../config/firebase.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { validate, userRegistrationSchema } from '../middleware/validation.js';
import { createUserProfile } from '../functions/userFunctions.js';

const router = express.Router();

/**
 * POST /api/auth/signup
 * Create a new user account with Firebase Auth and store profile in Firestore
 */
router.post('/signup', validate(userRegistrationSchema), asyncHandler(async (req, res) => {
  const { email, password, name, educationLevel, interests } = req.body;

  try {
    // Create user in Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name,
      emailVerified: false
    });

    // Create user profile in Firestore using Cloud Function
    const userData = { email, name, educationLevel, interests };
    await createUserProfile(userRecord.uid, userData);

    res.status(201).json({
      success: true,
      message: 'User account created successfully',
      data: {
        uid: userRecord.uid,
        email: userRecord.email,
        name: userRecord.displayName
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    
    if (error.code === 'auth/email-already-exists') {
      return res.status(400).json({
        success: false,
        message: 'Email is already registered'
      });
    }
    
    throw error;
  }
}));

/**
 * POST /api/auth/verify-token
 * Verify Firebase ID token and return user information
 */
router.post('/verify-token', asyncHandler(async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({
      success: false,
      message: 'ID token is required'
    });
  }

  try {
    // Verify the ID token
    const decodedToken = await auth.verifyIdToken(idToken);
    
    // Get user profile from Firestore
    const userDoc = await firestore.collection('users').doc(decodedToken.uid).get();
    
    if (!userDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found'
      });
    }

    const userProfile = userDoc.data();

    res.json({
      success: true,
      message: 'Token verified successfully',
      data: {
        uid: decodedToken.uid,
        email: decodedToken.email,
        emailVerified: decodedToken.email_verified,
        profile: userProfile
      }
    });
  } catch (error) {
    console.error('Token verification error:', error);
    
    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired'
      });
    }
    
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
}));

/**
 * POST /api/auth/refresh-token
 * Refresh user's custom claims (role, permissions)
 */
router.post('/refresh-token', asyncHandler(async (req, res) => {
  const { uid } = req.body;

  if (!uid) {
    return res.status(400).json({
      success: false,
      message: 'User ID is required'
    });
  }

  try {
    // Get user profile from Firestore
    const userDoc = await firestore.collection('users').doc(uid).get();
    
    if (!userDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const userProfile = userDoc.data();

    // Set custom claims
    await auth.setCustomUserClaims(uid, {
      role: userProfile.role || 'user'
    });

    res.json({
      success: true,
      message: 'Token refreshed successfully'
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    throw error;
  }
}));

/**
 * POST /api/auth/logout
 * Revoke user's refresh tokens (server-side logout)
 */
router.post('/logout', asyncHandler(async (req, res) => {
  const { uid } = req.body;

  if (!uid) {
    return res.status(400).json({
      success: false,
      message: 'User ID is required'
    });
  }

  try {
    // Revoke all refresh tokens for the user
    await auth.revokeRefreshTokens(uid);

    res.json({
      success: true,
      message: 'User logged out successfully'
    });
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
}));

export default router;
