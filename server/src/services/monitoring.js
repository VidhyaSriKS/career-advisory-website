import { firestore } from '../config/firebase.js';

class MonitoringService {
  static async trackRecommendationEvent(event) {
    const eventData = {
      ...event,
      timestamp: new Date().toISOString(),
      metadata: {
        ...event.metadata,
        userAgent: event.metadata?.userAgent || 'unknown',
        ip: event.metadata?.ip || 'unknown'
      }
    };

    try {
      await firestore.collection('recommendationEvents').add(eventData);
      console.log(`[Monitoring] Tracked event: ${event.type}`);
      return true;
    } catch (error) {
      console.error('[Monitoring] Error tracking event:', error);
      return false;
    }
  }

  static async getRecommendationMetrics(days = 30) {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      
      const snapshot = await firestore
        .collection('recommendationEvents')
        .where('timestamp', '>=', startDate.toISOString())
        .get();

      const events = [];
      snapshot.forEach(doc => events.push({ id: doc.id, ...doc.data() }));

      // Calculate metrics
      const metrics = {
        totalRequests: events.length,
        byType: {},
        byEngineeringField: {},
        responseTimes: [],
        errorRate: 0,
        popularCareers: {}
      };

      events.forEach(event => {
        // Count by event type
        metrics.byType[event.type] = (metrics.byType[event.type] || 0) + 1;

        // Track engineering fields
        const field = event.engineeringField || 'other';
        if (field) {
          metrics.byEngineeringField[field] = (metrics.byEngineeringField[field] || 0) + 1;
        }

        // Track response times
        if (event.responseTime) {
          metrics.responseTimes.push(event.responseTime);
        }

        // Track errors
        if (event.error) {
          metrics.errorRate++;
        }

        // Track popular careers
        if (event.careerId) {
          metrics.popularCareers[event.careerId] = (metrics.popularCareers[event.careerId] || 0) + 1;
        }
      });

      // Calculate averages
      metrics.avgResponseTime = metrics.responseTimes.length > 0 
        ? metrics.responseTimes.reduce((a, b) => a + b, 0) / metrics.responseTimes.length 
        : 0;
      
      metrics.errorRate = metrics.totalRequests > 0 
        ? (metrics.errorRate / metrics.totalRequests) * 100 
        : 0;

      // Sort popular careers
      metrics.popularCareers = Object.entries(metrics.popularCareers)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

      return metrics;
    } catch (error) {
      console.error('[Monitoring] Error getting metrics:', error);
      throw error;
    }
  }

  static async logRecommendationRequest(req, res, next) {
    const startTime = Date.now();
    const originalSend = res.send;

    res.send = function (body) {
      const responseTime = Date.now() - startTime;
      
      // Track successful request
      MonitoringService.trackRecommendationEvent({
        type: 'recommendation_request',
        userId: req.user?.uid,
        request: {
          method: req.method,
          path: req.path,
          query: req.query,
          body: req.body
        },
        response: {
          statusCode: res.statusCode,
          body: res.statusCode === 200 ? JSON.parse(body) : { error: body }
        },
        responseTime,
        metadata: {
          userAgent: req.headers['user-agent'],
          ip: req.ip,
          timestamp: new Date().toISOString()
        }
      });

      originalSend.call(this, body);
    };

    next();
  }
}

export default MonitoringService;
