const request = require('supertest');
const app = require('../app');
const { firestore } = require('../config/firebase');

// Mock Firestore
jest.mock('../config/firebase', () => {
  const mockCollection = jest.fn().mockReturnThis();
  const mockAdd = jest.fn().mockResolvedValue({ id: 'test-event-id' });
  const mockGet = jest.fn().mockResolvedValue({
    forEach: (callback) => {
      // Mock some test data
      const testData = [
        { id: '1', data: () => ({ type: 'recommendation_request', timestamp: new Date().toISOString() }) },
        { id: '2', data: () => ({ type: 'recommendation_success', timestamp: new Date(Date.now() - 86400000).toISOString() }) },
      ];
      testData.forEach(item => callback(item));
    }
  });
  
  const mockWhere = jest.fn().mockReturnThis();
  
  return {
    firestore: {
      collection: mockCollection,
    },
    mockCollection,
    mockAdd,
    mockGet,
    mockWhere,
  };
});

describe('Monitoring Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/recommend/careers', () => {
    it('should track recommendation request', async () => {
      const response = await request(app)
        .post('/api/recommend/careers')
        .send({
          interests: ['engineering', 'technology'],
          skills: ['programming', 'problem-solving'],
          educationLevel: 'bachelors',
          preferences: {
            engineeringFields: ['Computer Science'],
            minGrowthRate: 10,
            minSalary: 50000,
          },
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      
      // Verify Firestore was called to log the event
      const { mockCollection, mockAdd } = require('../config/firebase');
      expect(mockCollection).toHaveBeenCalledWith('recommendationEvents');
      expect(mockAdd).toHaveBeenCalled();
    });
  });

  describe('GET /api/recommend/metrics', () => {
    it('should return recommendation metrics', async () => {
      const response = await request(app)
        .get('/api/recommend/metrics')
        .set('Authorization', 'Bearer test-token');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('totalRequests');
      expect(response.body.data).toHaveProperty('byType');
      expect(response.body.data).toHaveProperty('avgResponseTime');
      expect(response.body.data).toHaveProperty('errorRate');
      
      // Verify Firestore query was made
      const { mockCollection, mockWhere, mockGet } = require('../config/firebase');
      expect(mockCollection).toHaveBeenCalledWith('recommendationEvents');
      expect(mockWhere).toHaveBeenCalledWith('timestamp', '>=', expect.any(String));
      expect(mockGet).toHaveBeenCalled();
    });
  });

  describe('Error handling', () => {
    it('should handle Firestore errors when tracking events', async () => {
      // Mock Firestore to throw an error
      const { mockAdd } = require('../config/firebase');
      mockAdd.mockRejectedValueOnce(new Error('Firestore error'));

      // This will be caught by the error handler
      const response = await request(app)
        .post('/api/recommend/careers')
        .send({
          interests: ['engineering'],
          skills: ['programming'],
        });

      // The request should still succeed even if tracking fails
      expect(response.status).toBe(200);
    });
  });
});
