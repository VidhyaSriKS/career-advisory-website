import { GoogleGenerativeAI } from '@google/generative-ai';
import MonitoringService from './monitoring.js';

// Get API key from environment
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('GEMINI_API_KEY environment variable not set');
}

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

class GeminiService {
  /**
   * Analyze open-ended quiz responses and generate career insights
   * @param {Object} userData - User's quiz responses and profile
   * @param {Object} req - Request object for monitoring
   * @returns {Promise<Object>} Analysis results with career suggestions
   */
  static async analyzeQuizResponses(userData, req) {
    const startTime = Date.now();
    const { responses = [], profile = {} } = userData;
    
    try {
      // Track the analysis request
      await MonitoringService.trackRecommendationEvent({
        type: 'gemini_analysis_request',
        userId: req?.user?.uid,
        metadata: {
          userAgent: req?.headers?.['user-agent'],
          ip: req?.ip,
          responseCount: responses.length,
          timestamp: new Date().toISOString()
        }
      });

      // Prepare the prompt for Gemini
      const prompt = this.buildAnalysisPrompt(responses, profile);
      
      // Generate content using Gemini
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Parse the response (assuming it's in JSON format)
      const analysis = this.parseGeminiResponse(text);
      
      // Track successful analysis
      await MonitoringService.trackRecommendationEvent({
        type: 'gemini_analysis_success',
        userId: req?.user?.uid,
        metadata: {
          durationMs: Date.now() - startTime,
          timestamp: new Date().toISOString()
        }
      });
      
      return analysis;
      
    } catch (error) {
      console.error('Error in Gemini analysis:', error);
      
      // Track the error
      await MonitoringService.trackRecommendationEvent({
        type: 'gemini_analysis_error',
        userId: req?.user?.uid,
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        metadata: {
          userAgent: req?.headers?.['user-agent'],
          ip: req?.ip,
          timestamp: new Date().toISOString(),
        },
      });
      
      throw new Error('Failed to analyze quiz responses');
    }
  }
  
  /**
   * Build a detailed prompt for Gemini based on quiz responses
   */
  static buildAnalysisPrompt(responses, profile) {
    return `
    You are a career guidance expert analyzing a student's quiz responses to provide personalized career recommendations.
    
    Student Profile:
    - Age: ${profile.age || 'Not specified'}
    - Education Level: ${profile.educationLevel || 'Not specified'}
    - Current Interests: ${profile.interests?.join(', ') || 'Not specified'}
    - Skills: ${profile.skills?.join(', ') || 'Not specified'}
    
    Quiz Responses:
    ${responses.map((r, i) => `
    Question ${i + 1}: ${r.question}
    Response: ${r.answer}
    `).join('\n')}
    
    Based on the above information, please provide:
    1. A brief analysis of the student's interests and strengths
    2. 3-5 recommended career paths with explanations
    3. Key skills to develop for each recommended path
    4. Suggested educational pathways
    5. Emerging fields that might align with their interests
    
    Format your response as a JSON object with the following structure:
    {
      "analysis": "Brief analysis of the student's profile",
      "careerPaths": [
        {
          "title": "Career Path Title",
          "description": "Detailed description",
          "reasoning": "Why this is a good fit",
          "requiredSkills": ["skill1", "skill2"],
          "educationPath": ["Step 1", "Step 2"],
          "growthPotential": "High/Medium/Low",
          "salaryRange": {"entry": "$X", "mid": "$Y", "senior": "$Z"}
        }
      ]
    }
    `;
  }
  
  /**
   * Parse and validate Gemini's response
   */
  static parseGeminiResponse(text) {
    try {
      // Try to extract JSON from markdown code blocks if present
      const jsonMatch = text.match(/```(?:json)?\n([\s\S]*?)\n```/);
      const jsonString = jsonMatch ? jsonMatch[1] : text;
      
      const result = JSON.parse(jsonString);
      
      // Basic validation
      if (!result.analysis || !Array.isArray(result.careerPaths)) {
        throw new Error('Invalid response format from Gemini');
      }
      
      return result;
      
    } catch (error) {
      console.error('Error parsing Gemini response:', error);
      throw new Error('Failed to process the analysis response');
    }
  }
}

export default GeminiService;
