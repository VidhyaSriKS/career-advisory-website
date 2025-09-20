# Career Advisory Platform - Monitoring System

This document provides an overview of the monitoring system implemented in the Career Advisory Platform.

## Overview

The monitoring system tracks various metrics and events related to career recommendations, including:

- Recommendation requests and responses
- Error tracking
- Performance metrics (response times)
- User engagement with recommendations
- Engineering field popularity

## Architecture

The monitoring system consists of the following components:

1. **Monitoring Service** (`/server/src/services/monitoring.js`)
   - Handles event tracking and metrics collection
   - Stores data in Firestore
   - Provides methods for retrieving aggregated metrics

2. **Recommendation Engine Integration** (`/server/src/services/recommendationEngine.js`)
   - Tracks recommendation generation
   - Monitors performance and errors
   - Captures engineering field preferences

3. **API Endpoints** (`/server/src/routes/recommend.js`)
   - `/api/recommend/metrics` - Get recommendation metrics
   - Integrated monitoring middleware for all recommendation endpoints

4. **Admin Dashboard** (`/src/pages/admin/MetricsDashboard.tsx`)
   - Visualizes recommendation metrics
   - Provides insights into system performance

## Getting Started

### Prerequisites

- Node.js 14+
- Firebase project with Firestore enabled
- Service account credentials for Firestore

### Setup

1. **Configure Firebase**
   - Create a new Firebase project
   - Enable Firestore database
   - Generate a service account key and save it as `serviceAccountKey.json` in the server directory

2. **Environment Variables**
   Create a `.env` file in the server directory with the following variables:
   ```
   GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json
   NODE_ENV=development
   ```

3. **Install Dependencies**
   ```bash
   npm install
   cd server
   npm install
   ```

## Usage

### Tracking Events

To track a recommendation event:

```javascript
const MonitoringService = require('./services/monitoring');

// Track a recommendation request
await MonitoringService.trackRecommendationEvent({
  type: 'recommendation_request',
  userId: 'user-123',
  request: {
    interests: ['engineering'],
    skills: ['programming']
  },
  metadata: {
    userAgent: 'Test Client',
    ip: '127.0.0.1',
    timestamp: new Date().toISOString()
  }
});
```

### Retrieving Metrics

To get recommendation metrics:

```javascript
const metrics = await MonitoringService.getRecommendationMetrics(30); // Last 30 days
console.log('Total requests:', metrics.totalRequests);
console.log('Average response time:', metrics.avgResponseTime);
```

### Viewing Metrics in Admin Dashboard

1. Log in as an admin user
2. Navigate to the Admin Dashboard
3. View the following metrics:
   - Total requests over time
   - Success/error rates
   - Most popular engineering fields
   - Average response times
   - User engagement

## Available Metrics

The monitoring system tracks the following metrics:

- **Total Requests**: Number of recommendation requests
- **By Type**: Breakdown of different event types
- **Response Times**: Average and distribution
- **Error Rates**: Percentage of failed requests
- **Engineering Fields**: Popularity of different fields
- **Recommendation Performance**: Match scores and engagement

## Best Practices

1. **Error Handling**
   - Always wrap monitoring calls in try/catch blocks
   - Handle Firestore errors gracefully
   - Don't let monitoring failures affect core functionality

2. **Performance**
   - Use async/await for all monitoring operations
   - Batch events when possible
   - Monitor the performance impact of monitoring

3. **Data Retention**
   - Set up Firestore TTL policies for old events
   - Aggregate data periodically to reduce storage costs
   - Consider data privacy regulations

## Troubleshooting

### Common Issues

1. **Permission Denied**
   - Verify service account has proper Firestore permissions
   - Check that the service account key is valid

2. **Missing Data**
   - Ensure events are being tracked
   - Check Firestore rules
   - Verify timestamps are in the expected range

3. **Performance Issues**
   - Check for excessive event volume
   - Optimize Firestore queries
   - Consider adding indexes for common queries

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
