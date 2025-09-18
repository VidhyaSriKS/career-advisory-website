import express from 'express';
import { firestore } from '../config/firebase.js';
import { authenticateToken, optionalAuth } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { validate, quizResultSchema } from '../middleware/validation.js';

const router = express.Router();

/**
 * GET /api/quiz/questions
 * Returns grouped quiz questions by module
 */
router.get('/questions', asyncHandler(async (req, res) => {
  try {
    // Get all quiz questions from Firestore
    const questionsSnapshot = await firestore.collection('quizQuestions').get();
    
    if (questionsSnapshot.empty) {
      return res.status(404).json({
        success: false,
        message: 'No quiz questions found'
      });
    }
    
    // Group questions by module
    const groupedQuestions = {};
    
    questionsSnapshot.forEach(doc => {
      const question = doc.data();
      
      if (!groupedQuestions[question.module]) {
        groupedQuestions[question.module] = [];
      }
      
      groupedQuestions[question.module].push({
        questionId: question.questionId,
        question: question.question,
        options: question.options
      });
    });
    
    res.json({
      success: true,
      data: groupedQuestions
    });
  } catch (error) {
    console.error('Get quiz questions error:', error);
    throw error;
  }
}));

/**
 * POST /api/quiz/submit
 * Submit quiz answers and calculate scores
 */
router.post('/submit', optionalAuth, validate(quizResultSchema), asyncHandler(async (req, res) => {
  const { uid, answers } = req.body;
  
  // If authenticated, use the authenticated user's UID
  const userId = req.user ? req.user.uid : uid;
  
  if (!userId) {
    return res.status(400).json({
      success: false,
      message: 'User ID is required'
    });
  }
  
  try {
    // Check if user has already completed the quiz
    const existingResultSnapshot = await firestore
      .collection('quizResults')
      .where('uid', '==', userId)
      .get();
    
    if (!existingResultSnapshot.empty) {
      return res.status(400).json({
        success: false,
        message: 'User has already completed the quiz'
      });
    }
    
    // Get all quiz questions to calculate scores
    const questionsSnapshot = await firestore.collection('quizQuestions').get();
    const questions = {};
    
    questionsSnapshot.forEach(doc => {
      const question = doc.data();
      questions[question.questionId] = question;
    });
    
    // Calculate scores for each module
    const scores = {
      personality: 0,
      academic: 0,
      interests: 0
    };
    
    // Process each answer
    answers.forEach(answer => {
      const { questionId, selectedOption } = answer;
      const question = questions[questionId];
      
      if (!question) return; // Skip if question not found
      
      // Find the selected option
      const option = question.options.find(opt => opt.optionId === selectedOption);
      
      if (!option) return; // Skip if option not found
      
      // Add the weight to the appropriate module score
      if (scores[question.module] !== undefined) {
        scores[question.module] += option.weight;
      }
    });
    
    // Save quiz result to Firestore
    const quizResult = {
      uid: userId,
      answers,
      scores,
      completedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    
    await firestore.collection('quizResults').add(quizResult);
    
    res.json({
      success: true,
      message: 'Quiz submitted successfully',
      data: {
        status: 'success',
        scores
      }
    });
  } catch (error) {
    console.error('Quiz submission error:', error);
    throw error;
  }
}));

export default router;