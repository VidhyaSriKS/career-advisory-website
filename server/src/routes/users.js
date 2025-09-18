import express from 'express';
import { firestore } from '../config/firebase.js';
import { authenticateToken } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { validate, userProfileSchema, quizResultSchema } from '../middleware/validation.js';
import { initializeUserProfile } from '../functions/userFunctions.js';

const router = express.Router();

/**
 * GET /api/users/profile
 * Get current user's profile information
 */
router.get('/profile', authenticateToken, asyncHandler(async (req, res) => {
  try {
    const userDoc = await firestore.collection('users').doc(req.user.uid).get();
    
    if (!userDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found'
      });
    }

    const userProfile = userDoc.data();
    
    // Remove sensitive information
    delete userProfile.role;
    
    res.json({
      success: true,
      data: userProfile
    });
  } catch (error) {
    console.error('Get profile error:', error);
    throw error;
  }
}));

/**
 * PUT /api/users/profile
 * Update current user's profile information
 */
router.put('/profile', authenticateToken, validate(userProfileSchema), asyncHandler(async (req, res) => {
  const { name, age, grade, location, educationLevel, interests, skills, preferences } = req.body;

  try {
    const updateData = {
      updatedAt: new Date().toISOString()
    };

    // Only update provided fields
    if (name !== undefined) updateData.name = name;
    if (age !== undefined) updateData.age = age;
    if (grade !== undefined) updateData.grade = grade;
    if (location !== undefined) updateData.location = location;
    if (educationLevel !== undefined) updateData.educationLevel = educationLevel;
    if (interests !== undefined) updateData.interests = interests;
    if (skills !== undefined) updateData.skills = skills;
    if (preferences !== undefined) updateData.preferences = preferences;

    await firestore.collection('users').doc(req.user.uid).update(updateData);

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: updateData
    });
  } catch (error) {
    console.error('Update profile error:', error);
    throw error;
  }
}));

/**
 * POST /api/users/init
 * Initialize user profile after registration
 */
router.post('/init', authenticateToken, validate(userProfileSchema), asyncHandler(async (req, res) => {
  const { name, age, grade, location } = req.body;

  try {
    // Initialize user profile using Cloud Function
    await initializeUserProfile(req.user.uid, { name, age, grade, location });

    res.json({
      success: true,
      message: 'Profile initialized successfully',
      data: {
        status: 'success',
        uid: req.user.uid
      }
    });
  } catch (error) {
    console.error('Profile initialization error:', error);
    
    if (error.message === 'User profile not found') {
      return res.status(404).json({
        success: false,
        message: 'User profile not found'
      });
    }
    
    throw error;
  }
}));

/**
 * POST /api/users/quiz-results
 * Save user's quiz results and recommendations
 */
router.post('/quiz-results', authenticateToken, validate(quizResultSchema), asyncHandler(async (req, res) => {
  const { answers, completedAt } = req.body;

  try {
    const quizResult = {
      userId: req.user.uid,
      answers,
      completedAt: completedAt || new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    // Save quiz result
    const docRef = await firestore.collection('quizResults').add(quizResult);

    // Update user's last quiz completion
    await firestore.collection('users').doc(req.user.uid).update({
      lastQuizCompletedAt: quizResult.completedAt,
      updatedAt: new Date().toISOString()
    });

    res.status(201).json({
      success: true,
      message: 'Quiz results saved successfully',
      data: {
        id: docRef.id,
        ...quizResult
      }
    });
  } catch (error) {
    console.error('Save quiz results error:', error);
    throw error;
  }
}));

/**
 * GET /api/users/quiz-results
 * Get user's quiz history
 */
router.get('/quiz-results', authenticateToken, asyncHandler(async (req, res) => {
  try {
    const querySnapshot = await firestore
      .collection('quizResults')
      .where('userId', '==', req.user.uid)
      .orderBy('createdAt', 'desc')
      .limit(10)
      .get();

    const quizResults = [];
    querySnapshot.forEach(doc => {
      quizResults.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json({
      success: true,
      data: quizResults
    });
  } catch (error) {
    console.error('Get quiz results error:', error);
    throw error;
  }
}));

/**
 * POST /api/users/save-career-path
 * Save a career path to user's favorites
 */
router.post('/save-career-path', authenticateToken, asyncHandler(async (req, res) => {
  const { careerPathId } = req.body;

  if (!careerPathId) {
    return res.status(400).json({
      success: false,
      message: 'Career path ID is required'
    });
  }

  try {
    // Check if career path exists
    const careerDoc = await firestore.collection('careers').doc(careerPathId).get();
    
    if (!careerDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Career path not found'
      });
    }

    // Get user's current saved paths
    const userDoc = await firestore.collection('users').doc(req.user.uid).get();
    const userData = userDoc.data();
    const savedPaths = userData.savedCareerPaths || [];

    // Add to saved paths if not already saved
    if (!savedPaths.includes(careerPathId)) {
      savedPaths.push(careerPathId);
      
      await firestore.collection('users').doc(req.user.uid).update({
        savedCareerPaths: savedPaths,
        updatedAt: new Date().toISOString()
      });
    }

    res.json({
      success: true,
      message: 'Career path saved successfully'
    });
  } catch (error) {
    console.error('Save career path error:', error);
    throw error;
  }
}));

/**
 * DELETE /api/users/save-career-path/:id
 * Remove a career path from user's favorites
 */
router.delete('/save-career-path/:id', authenticateToken, asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    // Get user's current saved paths
    const userDoc = await firestore.collection('users').doc(req.user.uid).get();
    const userData = userDoc.data();
    const savedPaths = userData.savedCareerPaths || [];

    // Remove from saved paths
    const updatedPaths = savedPaths.filter(pathId => pathId !== id);
    
    await firestore.collection('users').doc(req.user.uid).update({
      savedCareerPaths: updatedPaths,
      updatedAt: new Date().toISOString()
    });

    res.json({
      success: true,
      message: 'Career path removed from favorites'
    });
  } catch (error) {
    console.error('Remove career path error:', error);
    throw error;
  }
}));

/**
 * GET /api/users/saved-career-paths
 * Get user's saved career paths
 */
router.get('/saved-career-paths', authenticateToken, asyncHandler(async (req, res) => {
  try {
    const userDoc = await firestore.collection('users').doc(req.user.uid).get();
    const userData = userDoc.data();
    const savedPathIds = userData.savedCareerPaths || [];

    if (savedPathIds.length === 0) {
      return res.json({
        success: true,
        data: []
      });
    }

    // Get career path details
    const careerPaths = [];
    for (const pathId of savedPathIds) {
      const careerDoc = await firestore.collection('careers').doc(pathId).get();
      if (careerDoc.exists) {
        careerPaths.push({
          id: careerDoc.id,
          ...careerDoc.data()
        });
      }
    }

    res.json({
      success: true,
      data: careerPaths
    });
  } catch (error) {
    console.error('Get saved career paths error:', error);
    throw error;
  }
}));

export default router;
