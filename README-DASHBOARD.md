# Student Dashboard System

A production-ready, secure, and fully-featured personalized student dashboard that integrates with the Graphy (Spayee) API. This system provides comprehensive learner analytics, course management, and personalized recommendations.

## 🚀 Features

### Core Functionality
- **Learner Authentication**: Automatic email-based learner matching with Graphy API
- **Comprehensive Dashboard**: Aggregated view of courses, progress, activity, and recommendations
- **Real-time Data**: Progress tracking, usage analytics, and activity timeline
- **Personalized Recommendations**: AI-powered course suggestions based on learning patterns
- **Admin Management**: Course assignment, unassignment, and refund processing

### Technical Features
- **Secure API Integration**: Server-side Graphy API client with rate limiting and caching
- **Performance Optimized**: Parallel API calls, intelligent caching, and optimized data aggregation
- **Error Handling**: Robust error handling with user-friendly error states
- **Responsive Design**: Modern React components with Tailwind CSS styling
- **Type Safety**: Full TypeScript implementation with comprehensive type definitions

## 📋 Prerequisites

- Node.js 18+ and npm
- Graphy (Spayee) API credentials
- Redis (optional, for production caching)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shikshanam
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   # Graphy (Spayee) API Configuration
   GRAPHY_API_BASE_URL=https://api.graphy.com
   GRAPHY_API_KEY=your_graphy_api_key_here
   GRAPHY_SECRET_KEY=your_graphy_secret_key_here

   # Dashboard Configuration
   DASHBOARD_CACHE_TTL_STATIC=3600  # 1 hour for static data
   DASHBOARD_CACHE_TTL_DYNAMIC=60   # 1 minute for dynamic data
   DASHBOARD_RATE_LIMIT_PER_MINUTE=100

   # Redis Configuration (optional)
   REDIS_URL=redis://localhost:6379

   # Security
   JWT_SECRET=your_jwt_secret_here
   ADMIN_API_KEY=your_admin_api_key_here
   ADMIN_JWT_TOKEN=your_admin_jwt_token_here

   # Logging
   LOG_LEVEL=info
   ENABLE_API_LOGGING=true
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🔧 Configuration

### Graphy API Setup

1. **Obtain API Credentials**
   - Contact Graphy support to get your API key and secret
   - Ensure you have access to the required endpoints:
     - `GET /public/v2/learners?query=...`
     - `GET /public/v1/learners/:id?courseInfo=true`
     - `GET /public/v1/products/:productId`
     - `GET /t/api/public/v3/products/courseprogressreports`
     - `GET /public/v1/learners/:learnerId/usage`

2. **Configure Rate Limits**
   - Adjust `DASHBOARD_RATE_LIMIT_PER_MINUTE` based on your Graphy API limits
   - Monitor API usage to avoid hitting rate limits

### Caching Configuration

- **Static Data Cache**: Products, syllabus, and learner profiles (1 hour default)
- **Dynamic Data Cache**: Progress reports and usage data (1 minute default)
- **Redis Integration**: Optional for production environments

## 📚 API Endpoints

### Dashboard API

#### `GET /api/dashboard/by-email?email={email}`
Returns comprehensive dashboard data for a learner.

**Parameters:**
- `email` (required): Learner's email address

**Response:**
```json
{
  "success": true,
  "data": {
    "learner": {
      "id": "learner-123",
      "email": "student@example.com",
      "name": "John Doe"
    },
    "products": [
      {
        "product": { /* course details */ },
        "enrollment": { /* enrollment info */ },
        "progressReport": { /* progress data */ },
        "isEnrolled": true,
        "canResume": true,
        "nextLesson": { /* next lesson info */ }
      }
    ],
    "activityTimeline": [
      {
        "id": "activity-1",
        "type": "lesson_completion",
        "title": "Completed lesson",
        "description": "Sanskrit Basics - Lesson 1",
        "timestamp": "2024-01-15T10:30:00Z"
      }
    ],
    "recommendations": [
      {
        "productId": "course-456",
        "product": { /* course details */ },
        "score": 0.85,
        "reason": "Based on your interest in Sanskrit",
        "type": "category_match"
      }
    ],
    "summary": {
      "totalCourses": 5,
      "completedCourses": 2,
      "inProgressCourses": 3,
      "totalLearningTime": 1200,
      "averageCompletionRate": 75,
      "streakDays": 7
    }
  }
}
```

### Admin API

#### `POST /api/admin/assign-course`
Assigns a course to a learner.

**Headers:**
- `x-admin-api-key`: Admin API key
- `Content-Type`: application/json

**Body:**
```json
{
  "learnerId": "learner-123",
  "productId": "course-456",
  "reason": "Manual assignment"
}
```

#### `DELETE /api/admin/unassign-course`
Unassigns a course from a learner.

**Headers:**
- `x-admin-api-key`: Admin API key
- `Content-Type`: application/json

**Body:**
```json
{
  "learnerId": "learner-123",
  "enrollmentId": "enrollment-789",
  "reason": "Student request"
}
```

#### `POST /api/admin/process-refund`
Processes a refund for a transaction.

**Headers:**
- `x-admin-api-key`: Admin API key
- `Content-Type`: application/json

**Body:**
```json
{
  "transactionId": "transaction-123",
  "amount": 99.00,
  "reason": "Student request",
  "adminNotes": "Approved by manager"
}
```

## 🎨 Frontend Components

### Dashboard Page
- **URL**: `/dashboard?email={email}`
- **Features**: Complete dashboard view with all learner data

### Key Components

#### `DashboardSummary`
- Displays key metrics and statistics
- Learning time, completion rates, streak days
- Certificate count and last activity

#### `CourseCards`
- Course cards with progress indicators
- Resume functionality with last-watched lesson
- Enrollment and completion states

#### `ActivityFeed`
- Timeline of learner activities
- Discussions, quiz completions, lesson progress
- Real-time activity updates

#### `Recommendations`
- Personalized course suggestions
- Multiple recommendation types (resume, category match, popular)
- Scoring system with explanations

#### `Transactions`
- Payment history and transaction details
- Certificate downloads and receipts
- Refund status tracking

## 🧪 Testing

### Run Tests
```bash
# Run all tests
npm test

# Run specific test files
npm test dashboard-service.test.ts
npm test recommendation-engine.test.ts

# Run tests with coverage
npm test -- --coverage
```

### Test Coverage
- Dashboard service aggregation logic
- Recommendation engine algorithms
- API endpoint error handling
- Component rendering and interactions

## 🔒 Security Checklist

### API Security
- [ ] API keys stored in environment variables
- [ ] Rate limiting implemented and configured
- [ ] Input validation for all endpoints
- [ ] Error messages don't expose sensitive information
- [ ] Admin endpoints require authentication

### Data Security
- [ ] No sensitive data exposed to client
- [ ] Proper error handling and logging
- [ ] CORS configuration for production
- [ ] HTTPS enforced in production

### Authentication
- [ ] Admin API key authentication
- [ ] JWT token validation (if implemented)
- [ ] Session management (if applicable)

## 🚀 Deployment

### Production Setup

1. **Environment Variables**
   ```env
   NODE_ENV=production
   GRAPHY_API_BASE_URL=https://api.graphy.com
   GRAPHY_API_KEY=your_production_api_key
   GRAPHY_SECRET_KEY=your_production_secret_key
   REDIS_URL=your_production_redis_url
   ```

2. **Build and Deploy**
   ```bash
   npm run build
   npm start
   ```

3. **Monitoring**
   - Set up logging and monitoring
   - Configure error tracking (Sentry, etc.)
   - Monitor API rate limits and performance

### Docker Deployment (Optional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📊 Monitoring and Analytics

### Key Metrics to Monitor
- API response times
- Cache hit rates
- Error rates by endpoint
- User engagement metrics
- Recommendation click-through rates

### Logging
- API requests and responses
- Error occurrences and stack traces
- Performance metrics
- Security events

## 🔄 Real-time Updates

### Webhook Integration (Optional)
Configure Graphy webhooks to receive real-time updates:

```javascript
// Example webhook handler
app.post('/webhooks/graphy', (req, res) => {
  const { event, data } = req.body;
  
  switch (event) {
    case 'enrollment.created':
      // Clear learner cache
      graphyClient.clearLearnerCache(data.learnerId);
      break;
    case 'progress.updated':
      // Clear progress cache
      graphyClient.clearCache();
      break;
  }
  
  res.status(200).send('OK');
});
```

### Polling Alternative
If webhooks aren't available, implement polling:

```javascript
// Poll for updates every 5 minutes
setInterval(async () => {
  await dashboardService.refreshCache();
}, 5 * 60 * 1000);
```

## 🐛 Troubleshooting

### Common Issues

1. **API Rate Limiting**
   - Reduce `DASHBOARD_RATE_LIMIT_PER_MINUTE`
   - Implement exponential backoff
   - Monitor API usage

2. **Cache Issues**
   - Clear cache: `graphyClient.clearCache()`
   - Check Redis connection (if using)
   - Verify cache TTL settings

3. **Performance Issues**
   - Enable Redis caching
   - Optimize database queries
   - Implement request batching

### Debug Mode
Enable debug logging:
```env
LOG_LEVEL=debug
ENABLE_API_LOGGING=true
```

## 📞 Support

For technical support or questions:
- Email: support@shikshanam.com
- Documentation: [Link to detailed docs]
- Issues: [GitHub issues link]

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Note**: This dashboard system is designed to be production-ready with proper error handling, security measures, and performance optimizations. Make sure to review and customize the configuration based on your specific requirements and Graphy API capabilities.
