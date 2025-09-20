const request = require('supertest');
const app = require('../server/app');

describe('Recommendation API Endpoints', () => {
  // Test 1: Basic career recommendations with engineering filters
  it('should return engineering career recommendations', async () => {
    const res = await request(app)
      .post('/api/recommend/careers')
      .send({
        interests: ['software', 'AI'],
        skills: ['Python', 'Machine Learning'],
        preferences: {
          engineeringFields: ['Computer Science'],
          minGrowthRate: 15,
          minSalary: 8
        }
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data.recommendations)).toBe(true);
    
    // Check if engineering-specific fields are present
    if (res.body.data.recommendations.length > 0) {
      const firstRec = res.body.data.recommendations[0];
      expect(firstRec).toHaveProperty('engineeringField');
      expect(firstRec).toHaveProperty('engineeringSkills');
    }
  });

  // Test 2: Quiz-based recommendations
  it('should handle quiz-based recommendations', async () => {
    const res = await request(app)
      .post('/api/recommend/quiz-based')
      .send({
        answers: [
          { questionId: 'engineeringInterest', answer: 'I love computer programming' },
          { questionId: 'skills', answer: 'Python, JavaScript, Algorithms' }
        ]
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data.recommendations)).toBe(true);
  });

  // Test 3: Similar careers endpoint
  it('should find similar engineering careers', async () => {
    // First, get a valid career ID
    const careersRes = await request(app)
      .post('/api/recommend/careers')
      .send({
        preferences: { engineeringFields: ['Computer Science'], limit: 1 }
      });
    
    if (careersRes.body.data.recommendations.length > 0) {
      const careerId = careersRes.body.data.recommendations[0].id;
      
      const res = await request(app)
        .get(`/api/recommend/similar/${careerId}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data.recommendations)).toBe(true);
    }
  });
});
