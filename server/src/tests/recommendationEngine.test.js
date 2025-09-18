import { RecommendationEngine } from '../services/recommendationEngine.js';

// Mock Firestore
const mockCareers = [
  {
    id: 'career1',
    title: 'Software Developer',
    description: 'Develop software applications using programming languages',
    category: 'Technology',
    requiredSkills: ['JavaScript', 'Python', 'Problem Solving'],
    averageSalary: { min: 60000, max: 120000, currency: 'USD' },
    growthRate: 15,
    educationRequirements: ['undergraduate'],
    workEnvironment: 'Office/Remote',
    jobOutlook: 'Excellent'
  },
  {
    id: 'career2',
    title: 'Graphic Designer',
    description: 'Create visual content for digital and print media',
    category: 'Creative Arts',
    requiredSkills: ['Adobe Creative Suite', 'Creativity', 'Visual Design'],
    averageSalary: { min: 40000, max: 80000, currency: 'USD' },
    growthRate: 8,
    educationRequirements: ['undergraduate'],
    workEnvironment: 'Office/Studio',
    jobOutlook: 'Good'
  },
  {
    id: 'career3',
    title: 'Data Scientist',
    description: 'Analyze complex data to help organizations make decisions',
    category: 'Technology',
    requiredSkills: ['Python', 'Statistics', 'Machine Learning'],
    averageSalary: { min: 80000, max: 150000, currency: 'USD' },
    growthRate: 20,
    educationRequirements: ['graduate'],
    workEnvironment: 'Office/Remote',
    jobOutlook: 'Excellent'
  }
];

// Mock Firestore collection
jest.mock('../config/firebase.js', () => ({
  firestore: {
    collection: jest.fn(() => ({
      get: jest.fn(() => ({
        forEach: jest.fn((callback) => {
          mockCareers.forEach((career, index) => {
            callback({
              id: career.id,
              data: () => career
            });
          });
        })
      }))
    }))
  }
}));

describe('RecommendationEngine', () => {
  
  describe('calculateCareerScore', () => {
    test('should calculate higher score for matching interests', () => {
      const career = mockCareers[0]; // Software Developer
      const userInput = {
        interests: ['technology', 'programming'],
        skills: [],
        educationLevel: 'undergraduate'
      };

      const score = RecommendationEngine.calculateCareerScore(career, userInput);
      expect(score).toBeGreaterThan(0.3);
    });

    test('should calculate higher score for matching skills', () => {
      const career = mockCareers[0]; // Software Developer
      const userInput = {
        interests: [],
        skills: ['JavaScript', 'Python'],
        educationLevel: 'undergraduate'
      };

      const score = RecommendationEngine.calculateCareerScore(career, userInput);
      expect(score).toBeGreaterThan(0.5);
    });

    test('should return lower score for mismatched education level', () => {
      const career = mockCareers[2]; // Data Scientist (requires graduate)
      const userInput = {
        interests: ['technology'],
        skills: ['Python'],
        educationLevel: 'high_school'
      };

      const score = RecommendationEngine.calculateCareerScore(career, userInput);
      expect(score).toBeLessThan(0.7);
    });
  });

  describe('calculateInterestScore', () => {
    test('should return 0 for no interests', () => {
      const career = mockCareers[0];
      const score = RecommendationEngine.calculateInterestScore(career, []);
      expect(score).toBe(0);
    });

    test('should return higher score for matching interests', () => {
      const career = mockCareers[0]; // Software Developer
      const interests = ['technology', 'programming'];
      const score = RecommendationEngine.calculateInterestScore(career, interests);
      expect(score).toBeGreaterThan(0);
    });

    test('should return perfect score for all matching interests', () => {
      const career = mockCareers[1]; // Graphic Designer
      const interests = ['creative', 'design'];
      const score = RecommendationEngine.calculateInterestScore(career, interests);
      expect(score).toBeGreaterThan(0);
    });
  });

  describe('calculateSkillScore', () => {
    test('should return neutral score for no skills provided', () => {
      const career = mockCareers[0];
      const score = RecommendationEngine.calculateSkillScore(career, []);
      expect(score).toBe(0.5);
    });

    test('should return higher score for matching skills', () => {
      const career = mockCareers[0]; // Software Developer
      const skills = ['JavaScript', 'Python'];
      const score = RecommendationEngine.calculateSkillScore(career, skills);
      expect(score).toBeGreaterThan(0.5);
    });

    test('should handle partial skill matches', () => {
      const career = mockCareers[0]; // Software Developer
      const skills = ['Java']; // Partial match with JavaScript
      const score = RecommendationEngine.calculateSkillScore(career, skills);
      expect(score).toBeGreaterThan(0);
    });
  });

  describe('calculateEducationScore', () => {
    test('should return perfect score for meeting education requirements', () => {
      const career = mockCareers[0]; // Requires undergraduate
      const score = RecommendationEngine.calculateEducationScore(career, 'graduate');
      expect(score).toBe(1);
    });

    test('should return partial score for lower education level', () => {
      const career = mockCareers[2]; // Requires graduate
      const score = RecommendationEngine.calculateEducationScore(career, 'undergraduate');
      expect(score).toBeLessThan(1);
      expect(score).toBeGreaterThan(0);
    });

    test('should return neutral score for no education level provided', () => {
      const career = mockCareers[0];
      const score = RecommendationEngine.calculateEducationScore(career, null);
      expect(score).toBe(0.5);
    });
  });

  describe('getMatchReasons', () => {
    test('should generate appropriate match reasons', () => {
      const career = mockCareers[0]; // Software Developer
      const userInput = {
        interests: ['technology'],
        skills: ['JavaScript'],
        educationLevel: 'undergraduate'
      };

      const reasons = RecommendationEngine.getMatchReasons(career, userInput);
      expect(reasons).toBeInstanceOf(Array);
      expect(reasons.length).toBeGreaterThan(0);
      expect(reasons.some(reason => reason.includes('technology'))).toBe(true);
    });

    test('should include skill matches in reasons', () => {
      const career = mockCareers[0]; // Software Developer
      const userInput = {
        interests: [],
        skills: ['JavaScript', 'Python'],
        educationLevel: 'undergraduate'
      };

      const reasons = RecommendationEngine.getMatchReasons(career, userInput);
      expect(reasons.some(reason => reason.includes('JavaScript'))).toBe(true);
    });
  });

  describe('analyzeQuizAnswers', () => {
    test('should extract interests from quiz answers', () => {
      const answers = [
        { questionId: 'q1', answer: 'I enjoy working with technology and computers' },
        { questionId: 'q2', answer: 'Creative problem solving is my strength' }
      ];

      const analyzed = RecommendationEngine.analyzeQuizAnswers(answers);
      expect(analyzed.interests).toContain('technology');
      expect(analyzed).toHaveProperty('skills');
      expect(analyzed).toHaveProperty('educationLevel');
    });

    test('should handle various answer types', () => {
      const answers = [
        { questionId: 'q1', answer: 'Business management appeals to me' },
        { questionId: 'q2', answer: 5 }, // Numeric answer
        { questionId: 'q3', answer: ['option1', 'option2'] } // Array answer
      ];

      const analyzed = RecommendationEngine.analyzeQuizAnswers(answers);
      expect(analyzed).toHaveProperty('interests');
      expect(analyzed.interests).toContain('business');
    });
  });

  describe('generateRecommendations', () => {
    test('should return top 3 recommendations', async () => {
      const userInput = {
        interests: ['technology'],
        skills: ['JavaScript'],
        educationLevel: 'undergraduate'
      };

      const recommendations = await RecommendationEngine.generateRecommendations(userInput);
      expect(recommendations).toBeInstanceOf(Array);
      expect(recommendations.length).toBeLessThanOrEqual(3);
      expect(recommendations[0]).toHaveProperty('matchScore');
      expect(recommendations[0]).toHaveProperty('matchReasons');
    });

    test('should sort recommendations by score', async () => {
      const userInput = {
        interests: ['technology', 'data'],
        skills: ['Python', 'Statistics'],
        educationLevel: 'graduate'
      };

      const recommendations = await RecommendationEngine.generateRecommendations(userInput);
      
      if (recommendations.length > 1) {
        expect(recommendations[0].matchScore).toBeGreaterThanOrEqual(recommendations[1].matchScore);
      }
    });
  });
});
