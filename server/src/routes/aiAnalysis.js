import express from 'express';
import GeminiService from '../services/geminiService.js';
import { optionalAuth } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

/**
 * POST /api/ai/analyze-quiz
 * Analyze open-ended quiz responses using Gemini AI
 */
router.post('/analyze-quiz', optionalAuth, asyncHandler(async (req, res) => {
  const { responses, profile } = req.body;

  if (!responses || !Array.isArray(responses) || responses.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Quiz responses are required'
    });
  }

  try {
    const analysis = await GeminiService.analyzeQuizResponses(
      { responses, profile },
      req
    );

    res.json({
      success: true,
      message: 'Analysis completed successfully',
      data: analysis
    });
  } catch (error) {
    console.error('Error in quiz analysis:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to analyze quiz responses',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}));

export default router;