import express from 'express';
import { RecommendationEngine } from '../services/recommendationEngine.js';
import { optionalAuth } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { validate, recommendationSchema } from '../middleware/validation.js';

const router = express.Router();

/**
 * POST /api/recommend/careers
 * Get career recommendations based on user interests and skills
 */
router.post('/careers', optionalAuth, validate(recommendationSchema), asyncHandler(async (req, res) => {
  const { interests, skills, educationLevel, preferences } = req.body;

  try {
    const recommendations = await RecommendationEngine.generateRecommendations({
      interests,
      skills,
      educationLevel,
      preferences
    });

    res.json({
      success: true,
      message: 'Career recommendations generated successfully',
      data: {
        recommendations,
        totalFound: recommendations.length,
        generatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Career recommendation error:', error);
    throw error;
  }
}));

/**
 * POST /api/recommend/quiz-based
 * Get career recommendations based on quiz results
 */
router.post('/quiz-based', optionalAuth, asyncHandler(async (req, res) => {
  const { answers } = req.body;

  if (!answers || !Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Quiz answers are required'
    });
  }

  try {
    const recommendations = await RecommendationEngine.getRecommendationsFromQuiz(answers);

    res.json({
      success: true,
      message: 'Quiz-based recommendations generated successfully',
      data: {
        recommendations,
        totalFound: recommendations.length,
        generatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Quiz-based recommendation error:', error);
    throw error;
  }
}));

/**
 * GET /api/recommend/similar/:careerPathId
 * Get similar career paths based on a specific career
 */
router.get('/similar/:careerPathId', optionalAuth, asyncHandler(async (req, res) => {
  const { careerPathId } = req.params;

  try {
    // Get the reference career path
    const { firestore } = await import('../config/firebase.js');
    const careerDoc = await firestore.collection('careers').doc(careerPathId).get();

    if (!careerDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Career path not found'
      });
    }

    const referenceCareeer = careerDoc.data();

    // Use the career's required skills and category as interests for recommendation
    const similarRecommendations = await RecommendationEngine.generateRecommendations({
      interests: [referenceCareeer.category, ...referenceCareeer.requiredSkills.slice(0, 3)],
      skills: referenceCareeer.requiredSkills,
      educationLevel: referenceCareeer.educationRequirements[0]?.toLowerCase().replace(/\s+/g, '_')
    });

    // Filter out the reference career itself
    const filteredRecommendations = similarRecommendations.filter(rec => rec.id !== careerPathId);

    res.json({
      success: true,
      message: 'Similar career paths found',
      data: {
        referenceCareeer: {
          id: careerPathId,
          title: referenceCareeer.title,
          category: referenceCareeer.category
        },
        recommendations: filteredRecommendations.slice(0, 5), // Limit to 5 similar careers
        totalFound: filteredRecommendations.length
      }
    });
  } catch (error) {
    console.error('Similar careers recommendation error:', error);
    throw error;
  }
}));

/**
 * POST /api/recommend/personalized
 * Get personalized recommendations for authenticated users based on their profile
 */
router.post('/personalized', optionalAuth, asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required for personalized recommendations'
    });
  }

  try {
    // Get user profile from Firestore
    const { firestore } = await import('../config/firebase.js');
    const userDoc = await firestore.collection('users').doc(req.user.uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found'
      });
    }

    const userProfile = userDoc.data();

    // Generate recommendations based on user profile
    const recommendations = await RecommendationEngine.generateRecommendations({
      interests: userProfile.interests || [],
      skills: userProfile.skills || [],
      educationLevel: userProfile.educationLevel,
      preferences: userProfile.preferences || {}
    });

    res.json({
      success: true,
      message: 'Personalized recommendations generated successfully',
      data: {
        recommendations,
        totalFound: recommendations.length,
        basedOn: {
          interests: userProfile.interests?.length || 0,
          skills: userProfile.skills?.length || 0,
          educationLevel: userProfile.educationLevel
        },
        generatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Personalized recommendation error:', error);
    throw error;
  }
}));

export default router;
