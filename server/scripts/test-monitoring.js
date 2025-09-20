const { RecommendationEngine } = require('../src/services/recommendationEngine');
const MonitoringService = require('../src/services/monitoring');

async function testMonitoring() {
  try {
    console.log('Testing monitoring service...');
    
    // Test tracking a recommendation request
    console.log('\n1. Testing recommendation request tracking...');
    await MonitoringService.trackRecommendationEvent({
      type: 'recommendation_request',
      userId: 'test-user-123',
      request: {
        interests: ['engineering', 'technology'],
        skills: ['programming', 'problem-solving'],
        preferences: {
          engineeringFields: ['Computer Science'],
          minGrowthRate: 10,
          minSalary: 80000
        }
      },
      metadata: {
        userAgent: 'Test Script',
        ip: '127.0.0.1',
        timestamp: new Date().toISOString()
      }
    });
    console.log('✅ Successfully tracked recommendation request');

    // Test getting metrics
    console.log('\n2. Testing metrics retrieval...');
    const metrics = await MonitoringService.getRecommendationMetrics(7);
    console.log('Retrieved metrics:', {
      totalRequests: metrics.totalRequests,
      byType: metrics.byType,
      avgResponseTime: metrics.avgResponseTime,
      errorRate: metrics.errorRate
    });
    console.log('✅ Successfully retrieved metrics');

    // Test recommendation engine with monitoring
    console.log('\n3. Testing recommendation engine with monitoring...');
    const recommendations = await RecommendationEngine.generateRecommendations(
      {
        interests: ['engineering', 'programming'],
        skills: ['JavaScript', 'React'],
        educationLevel: 'bachelors',
        preferences: {
          engineeringFields: ['Computer Science'],
          minGrowthRate: 10,
          minSalary: 80000
        }
      },
      { 
        user: { uid: 'test-user-123' },
        headers: { 'user-agent': 'Test Script' },
        ip: '127.0.0.1'
      }
    );
    
    console.log('Generated recommendations:', recommendations.map(r => ({
      title: r.title,
      matchScore: r.matchScore,
      engineeringField: r.engineeringField
    })));
    console.log('✅ Successfully generated recommendations with monitoring');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

testMonitoring();
