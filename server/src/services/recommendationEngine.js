import { firestore } from '../config/firebase.js';

/**
 * Career Path Recommendation Engine
 * Matches user quiz results to career paths using rules-based matching
 */
export class RecommendationEngine {
  
  /**
   * Generate career recommendations based on quiz results
   * @param {string} uid - User ID
   * @returns {Promise<Array>} Top 3 recommended career paths with scores
   */
  static async generateRecommendations(uid) {
    try {
      // Get user's quiz results
      const quizResultsSnapshot = await firestore
        .collection('quizResults')
        .where('uid', '==', uid)
        .orderBy('completedAt', 'desc')
        .limit(1)
        .get();
      
      if (quizResultsSnapshot.empty) {
        throw new Error('No quiz results found for this user');
      }
      
      const quizResult = quizResultsSnapshot.docs[0].data();
      const { scores } = quizResult;
      
      // Get career mappings
      const careerMappingsSnapshot = await firestore.collection('careerMappings').get();
      const careerMappings = [];
      
      careerMappingsSnapshot.forEach(doc => {
        careerMappings.push({
          ...doc.data(),
          id: doc.id
        });
      });
      
      // Match scores with career mappings
      const matchedCareers = careerMappings
        .filter(career => {
          const { requiredTraits } = career;
          
          // Check if user meets minimum requirements for each trait
          return Object.keys(requiredTraits).every(trait => {
            const userScore = scores[trait] || 0;
            const minRequired = requiredTraits[trait].min || 0;
            return userScore >= minRequired;
          });
        })
        .map(career => {
          // Calculate match score (percentage)
          let totalScore = 0;
          let totalPossible = 0;
          
          Object.keys(career.requiredTraits).forEach(trait => {
            const userScore = scores[trait] || 0;
            const minRequired = career.requiredTraits[trait].min || 0;
            totalScore += Math.min(userScore, minRequired);
            totalPossible += minRequired;
          });
          
          const matchScore = Math.round((totalScore / totalPossible) * 100);
          
          return {
            careerId: career.careerId,
            careerName: career.careerName,
            matchScore
          };
        });
      
      // Sort by match score and get top 3
      const topCareers = matchedCareers
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 3);
      
      // Store recommendations in Firestore
      await firestore.collection('recommendations').doc(uid).set({
        uid,
        topCareers,
        generatedAt: new Date().toISOString()
      });
      
      return topCareers;
    } catch (error) {
      console.error('Recommendation generation error:', error);
      throw error;
    }
  }

  /**
   * Calculate compatibility score between user and career path
   * @param {Object} career - Career path data
   * @param {Object} userInput - User input data
   * @returns {number} Compatibility score (0-1)
   */
  static calculateCareerScore(career, userInput) {
    const { interests, skills = [], educationLevel, preferences = {} } = userInput;
    let totalScore = 0;
    let maxPossibleScore = 0;

    // Interest matching (40% weight)
    const interestScore = this.calculateInterestScore(career, interests);
    totalScore += interestScore * 0.4;
    maxPossibleScore += 0.4;

    // Skills matching (30% weight)
    const skillScore = this.calculateSkillScore(career, skills);
    totalScore += skillScore * 0.3;
    maxPossibleScore += 0.3;

    // Education level matching (20% weight)
    const educationScore = this.calculateEducationScore(career, educationLevel);
    totalScore += educationScore * 0.2;
    maxPossibleScore += 0.2;

    // Preferences matching (10% weight)
    const preferenceScore = this.calculatePreferenceScore(career, preferences);
    totalScore += preferenceScore * 0.1;
    maxPossibleScore += 0.1;

    return maxPossibleScore > 0 ? totalScore / maxPossibleScore : 0;
  }

  /**
   * Calculate interest compatibility score
   */
  static calculateInterestScore(career, interests) {
    if (!interests || interests.length === 0) return 0;

    const careerKeywords = [
      career.title.toLowerCase(),
      career.description.toLowerCase(),
      career.category.toLowerCase(),
      ...(career.requiredSkills || []).map(skill => skill.toLowerCase())
    ].join(' ');

    let matchCount = 0;
    interests.forEach(interest => {
      if (careerKeywords.includes(interest.toLowerCase())) {
        matchCount++;
      }
    });

    return interests.length > 0 ? matchCount / interests.length : 0;
  }

  /**
   * Calculate skills compatibility score
   */
  static calculateSkillScore(career, skills) {
    if (!skills || skills.length === 0) return 0.5; // Neutral score if no skills provided
    if (!career.requiredSkills || career.requiredSkills.length === 0) return 0.5;

    const userSkillsLower = skills.map(skill => skill.toLowerCase());
    const careerSkillsLower = career.requiredSkills.map(skill => skill.toLowerCase());

    let matchCount = 0;
    careerSkillsLower.forEach(careerSkill => {
      if (userSkillsLower.some(userSkill => 
        userSkill.includes(careerSkill) || careerSkill.includes(userSkill)
      )) {
        matchCount++;
      }
    });

    return careerSkillsLower.length > 0 ? matchCount / careerSkillsLower.length : 0;
  }

  /**
   * Calculate education level compatibility score
   */
  static calculateEducationScore(career, educationLevel) {
    if (!educationLevel || !career.educationRequirements) return 0.5;

    const educationLevels = {
      'high_school': 1,
      'undergraduate': 2,
      'graduate': 3,
      'postgraduate': 4
    };

    const userLevel = educationLevels[educationLevel] || 0;
    const careerRequirements = career.educationRequirements.map(req => 
      educationLevels[req.toLowerCase().replace(/\s+/g, '_')] || 0
    );

    const minRequired = Math.min(...careerRequirements.filter(level => level > 0));
    
    if (userLevel >= minRequired) {
      return 1; // Perfect match
    } else {
      return Math.max(0, userLevel / minRequired); // Partial match
    }
  }

  /**
   * Calculate preferences compatibility score
   */
  static calculatePreferenceScore(career, preferences) {
    let score = 0.5; // Default neutral score
    let factorsCount = 0;

    // Work environment preference
    if (preferences.workEnvironment && career.workEnvironment) {
      factorsCount++;
      if (career.workEnvironment.toLowerCase().includes(preferences.workEnvironment.toLowerCase())) {
        score += 0.3;
      }
    }

    // Salary range preference
    if (preferences.salaryRange && career.averageSalary) {
      factorsCount++;
      const { min, max } = preferences.salaryRange;
      const careerSalary = career.averageSalary;
      
      if ((!min || careerSalary.min >= min) && (!max || careerSalary.max <= max)) {
        score += 0.2;
      }
    }

    return Math.min(1, score);
  }

  /**
   * Generate match reasons for a career recommendation
   */
  static getMatchReasons(career, userInput) {
    const reasons = [];
    const { interests, skills = [], educationLevel } = userInput;

    // Interest matches
    const careerText = `${career.title} ${career.description} ${career.category}`.toLowerCase();
    const matchedInterests = interests.filter(interest => 
      careerText.includes(interest.toLowerCase())
    );
    
    if (matchedInterests.length > 0) {
      reasons.push(`Matches your interests: ${matchedInterests.join(', ')}`);
    }

    // Skill matches
    if (skills.length > 0 && career.requiredSkills) {
      const matchedSkills = skills.filter(skill => 
        career.requiredSkills.some(reqSkill => 
          reqSkill.toLowerCase().includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(reqSkill.toLowerCase())
        )
      );
      
      if (matchedSkills.length > 0) {
        reasons.push(`Utilizes your skills: ${matchedSkills.join(', ')}`);
      }
    }

    // Education compatibility
    if (educationLevel && career.educationRequirements) {
      const educationLevels = {
        'high_school': 'High School',
        'undergraduate': 'Bachelor\'s Degree',
        'graduate': 'Master\'s Degree',
        'postgraduate': 'Doctoral Degree'
      };
      
      reasons.push(`Compatible with your ${educationLevels[educationLevel]} education`);
    }

    // Growth potential
    if (career.growthRate > 10) {
      reasons.push(`High growth potential (${career.growthRate}% projected growth)`);
    }

    return reasons;
  }

  /**
   * Get career recommendations based on quiz results
   */
  static async getRecommendationsFromQuiz(quizAnswers) {
    try {
      // Analyze quiz answers to extract interests and preferences
      const analyzedData = this.analyzeQuizAnswers(quizAnswers);
      
      // Generate recommendations based on analyzed data
      return await this.generateRecommendations(analyzedData);
    } catch (error) {
      console.error('Quiz-based recommendation error:', error);
      throw error;
    }
  }

  /**
   * Analyze quiz answers to extract user preferences
   */
  static analyzeQuizAnswers(answers) {
    // This is a simplified analysis - in a real application,
    // you would have more sophisticated logic based on your quiz questions
    const interests = [];
    const skills = [];
    let educationLevel = 'undergraduate';

    answers.forEach(answer => {
      // Extract interests based on answer patterns
      if (typeof answer.answer === 'string') {
        const answerLower = answer.answer.toLowerCase();
        
        // Map common answer patterns to interests
        if (answerLower.includes('technology') || answerLower.includes('computer')) {
          interests.push('technology');
        }
        if (answerLower.includes('creative') || answerLower.includes('art')) {
          interests.push('creative arts');
        }
        if (answerLower.includes('business') || answerLower.includes('management')) {
          interests.push('business');
        }
        if (answerLower.includes('science') || answerLower.includes('research')) {
          interests.push('science');
        }
        if (answerLower.includes('health') || answerLower.includes('medical')) {
          interests.push('healthcare');
        }
      }
    });

    return {
      interests: [...new Set(interests)], // Remove duplicates
      skills,
      educationLevel
    };
  }
}
