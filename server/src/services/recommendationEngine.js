import { firestore } from '../config/firebase.js';
import { coursesData } from '../../src/data/courseData.js';
import MonitoringService from './monitoring.js';

/**
 * Career Path Recommendation Engine
 * Matches user interests and skills to career paths using weighted scoring
 * Now with enhanced support for engineering career paths
 */
class RecommendationEngine {
  
  /**
   * Generate career recommendations based on user input
   * @param {Object} userInput - User interests, skills, and preferences
   * @param {Object} req - Request object (optional)
   * @returns {Array} Top 3 recommended career paths with scores
   */
  static async generateRecommendations(userInput, req) {
    const startTime = Date.now();
    const { interests, skills = [], educationLevel, preferences = {} } = userInput;
    
    // Extract engineering-specific filters
    const { 
      engineeringFields = [], 
      minGrowthRate = 0, 
      minSalary = 0,
      experienceLevel = 'entry'
    } = preferences;

    // Track the recommendation request
    if (req) {
      await MonitoringService.trackRecommendationEvent({
        type: 'recommendation_request',
        userId: req.user?.uid,
        request: {
          interests,
          skills,
          educationLevel,
          preferences,
        },
        metadata: {
          userAgent: req.headers['user-agent'],
          ip: req.ip,
          timestamp: new Date().toISOString(),
        },
      });
    }

    try {
      // Get all career paths from both Firestore and courseData
      const [firestoreCareers, courseCareers] = await Promise.all([
        this.getFirestoreCareers(),
        this.getCourseCareers()
      ]);

      const allCareers = [...firestoreCareers, ...courseCareers];

      // Apply engineering filters if specified
      const filteredCareers = engineeringFields.length > 0
        ? allCareers.filter(career => 
            career.specialization && 
            engineeringFields.some(field => 
              career.specialization.toLowerCase().includes(field.toLowerCase())
            )
          )
        : allCareers;

      // Calculate scores for each career
      const scoredCareers = filteredCareers.map(career => {
        const baseScore = this.calculateCareerScore(career, userInput);
        
        // Apply engineering-specific scoring boosts
        let engineeringBoost = 0;
        if (career.stream === 'engineering') {
          // Bonus for matching exact engineering field
          if (engineeringFields.includes(career.specialization)) {
            engineeringBoost += 0.3;
          }
          
          // Bonus for high-growth engineering fields
          if (parseFloat(career.growthRate) >= 20) {
            engineeringBoost += 0.2;
          }
        }

        return {
          ...career,
          score: Math.min(1, baseScore + engineeringBoost),
          isEngineering: career.stream === 'engineering'
        };
      });

      // Apply growth rate and salary filters
      const filteredByGrowthSalary = scoredCareers.filter(career => {
        const growth = parseFloat(career.growthRate);
        const salary = this.extractSalaryNumber(career.avgSalary || career.averageSalary);
        return growth >= minGrowthRate && salary >= minSalary;
      });

      // Sort by score and return top recommendations
      const formattedRecommendations = filteredByGrowthSalary
        .sort((a, b) => b.score - a.score)
        .slice(0, preferences.limit || 10)
        .map(career => this.formatRecommendation(career, userInput));

      // Calculate response time
      const responseTime = Date.now() - startTime;

      // Track successful recommendation generation
      if (req) {
        await MonitoringService.trackRecommendationEvent({
          type: 'recommendation_success',
          userId: req.user?.uid,
          recommendationCount: formattedRecommendations.length,
          responseTime,
          metadata: {
            userAgent: req.headers?.['user-agent'],
            ip: req.ip,
            timestamp: new Date().toISOString(),
          },
        });
      }

      return formattedRecommendations;
    } catch (error) {
      console.error('Error generating recommendations:', error);
      
      // Track the error
      if (req) {
        await MonitoringService.trackRecommendationEvent({
          type: 'recommendation_error',
          userId: req.user?.uid,
          error: error.message,
          stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
          metadata: {
            userAgent: req.headers?.['user-agent'],
            ip: req.ip,
            timestamp: new Date().toISOString(),
          },
        });
      }
      
      throw error;
    }
  }

  /**
   * Analyze quiz answers to extract interests and skills
   * @param {Array} answers - User's quiz answers
   * @returns {Object} Extracted interests, skills, and preferences
   */
  /**
   * Get recommendations based on quiz answers
   * @param {Array} answers - User's quiz answers
   * @param {Object} req - Request object (for monitoring)
   * @returns {Promise<Array>} Recommended career paths
   */
  static async getRecommendationsFromQuiz(answers, req) {
    try {
      // Analyze quiz answers to get user interests and skills
      const { interests, skills, educationLevel, preferences } = this.analyzeQuizAnswers(answers);
      
      // Generate recommendations based on the analyzed data
      const recommendations = await this.generateRecommendations(
        { interests, skills, educationLevel, preferences },
        req // Pass the request object for monitoring
      );
      
      return recommendations;
    } catch (error) {
      console.error('Error getting quiz-based recommendations:', error);
      
      // Track the error
      if (req) {
        await MonitoringService.trackRecommendationEvent({
          type: 'quiz_recommendation_error',
          userId: req.user?.uid,
          error: error.message,
          stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
          metadata: {
            userAgent: req.headers?.['user-agent'],
            ip: req.ip,
            timestamp: new Date().toISOString(),
          },
        });
      }
      
      throw error;
    }
  }

  /**
   * Analyze quiz answers to extract interests and skills
   * @param {Array} answers - User's quiz answers
   * @returns {Object} Extracted interests, skills, and preferences
   */
  static analyzeQuizAnswers(answers) {
    const interests = [];
    const skills = [];
    const engineeringFields = new Set();
    let educationLevel = 'undergraduate';

    answers.forEach(answer => {
      const answerStr = String(answer.answer || '').toLowerCase();
      
      // Map answers to engineering fields
      if (answer.questionId === 'engineeringInterest') {
        if (answerStr.includes('computer') || answerStr.includes('software')) {
          engineeringFields.add('Computer Science');
          interests.push('programming', 'algorithms', 'software development');
        }
        if (answerStr.includes('mechanical') || answerStr.includes('design')) {
          engineeringFields.add('Mechanical');
          interests.push('mechanics', 'design', 'manufacturing');
        }
        if (answerStr.includes('electrical') || answerStr.includes('circuit')) {
          engineeringFields.add('Electrical');
          interests.push('electronics', 'circuit design', 'power systems');
        }
      }
      
      // Map to general interests and skills
      if (answerStr.includes('programming') || answerStr.includes('coding')) {
        skills.push('Programming', 'Algorithms', 'Problem Solving');
      }
      if (answerStr.includes('design') || answerStr.includes('cad')) {
        skills.push('CAD', '3D Modeling', 'Design Thinking');
      }
      if (answerStr.includes('math') || answerStr.includes('calculus')) {
        skills.push('Mathematics', 'Calculus', 'Linear Algebra');
      }
    });

    return {
      interests: [...new Set(interests)],
      skills: [...new Set(skills)],
      educationLevel,
      preferences: {
        engineeringFields: Array.from(engineeringFields),
        minGrowthRate: 10,
        limit: 5
      }
    };
  }
}

export default RecommendationEngine;
