# Graphy API Integration Update Summary

## Overview
Updated the Graphy API integration to match the actual API documentation provided. The previous implementation was using incorrect endpoints, authentication methods, and base URLs.

## Key Changes Made

### 1. Updated API Base URLs
**Before:**
- Single base URL: `https://api.graphy.com`

**After:**
- v1 API: `https://api.ongraphy.com/public/v1`
- v3 API: `https://api.ongraphy.com/t/api/public/v3`

### 2. Updated Authentication Method
**Before:**
- Bearer token authentication
- JSON request/response format

**After:**
- Form-urlencoded authentication with `mid` (Merchant ID) and `key` (API Key)
- Form-urlencoded for POST requests, JSON for GET requests

### 3. Implemented Missing API Endpoints

#### v1 API Endpoints Added:
- `POST /learners` - Create a new learner
- `POST /learners/validity/update` - Update course validity for a learner
- `GET /quizzes/{quizId}/reports` - Get quiz reports
- `GET /transactions` - Get transactions with filtering
- `GET /learners/{learnerId}/usage` - Get learner usage statistics
- `GET /learners/{learnerId}/discussions` - Get learner discussions

#### v3 API Endpoints Added:
- `GET /products/activelearners` - Get active learners for products
- `GET /products/courseprogressreports` - Get course progress reports
- `GET /products/liveclass/attendees` - Get live class attendees

### 4. Updated Configuration
**File:** `lib/config/dashboard.ts`
- Added `BASE_URL_V1` and `BASE_URL_V3` configuration
- Updated environment variable names

### 5. Enhanced API Client
**File:** `lib/api/graphy-client.ts`
- Added support for form-urlencoded requests
- Implemented all missing API endpoints
- Added proper error handling and logging
- Maintained backward compatibility with existing methods

### 6. Created Test Endpoints
- `/api/test-graphy-v1` - Test v1 API endpoints
- `/api/test-graphy-v3` - Test v3 API endpoints
- `/api/test-graphy-create-learner` - Test learner creation

## Environment Variables Required

```bash
# Graphy API Configuration
GRAPHY_API_BASE_URL_V1=https://api.ongraphy.com/public/v1
GRAPHY_API_BASE_URL_V3=https://api.ongraphy.com/t/api/public/v3
GRAPHY_API_KEY=your_merchant_id_here
GRAPHY_SECRET_KEY=your_api_token_here
GRAPHY_MID=your_merchant_id_here
```

## Testing the Integration

### 1. Test v1 API Endpoints
```bash
curl http://localhost:3000/api/test-graphy-v1
```

### 2. Test v3 API Endpoints
```bash
curl http://localhost:3000/api/test-graphy-v3
```

### 3. Test Learner Creation
```bash
curl -X POST http://localhost:3000/api/test-graphy-create-learner \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "name": "Test User"}'
```

## API Usage Examples

### Create a Learner
```typescript
const result = await graphyClient.createLearner({
  email: 'student@example.com',
  name: 'John Doe',
  mobile: '+1234567890',
  sendEmail: true,
  customFields: {
    'Department': 'Engineering',
    'Year': '2024'
  }
});
```

### Get Transactions
```typescript
const transactions = await graphyClient.getTransactions({
  limit: 10,
  skip: 0,
  startDate: '2024/01/01',
  endDate: '2024/12/31',
  status: 'success'
});
```

### Get Active Learners
```typescript
const activeLearners = await graphyClient.getActiveLearners({
  productIds: ['product-id-1', 'product-id-2'],
  dateFrom: '2024/01/01',
  dateTo: '2024/12/31',
  limit: 50
});
```

### Update Course Validity
```typescript
const result = await graphyClient.updateCourseValidity({
  email: 'student@example.com',
  productId: 'course-id',
  validityDate: '2025-12-31'
});
```

## Benefits of the Update

1. **Correct API Integration**: Now uses the actual Graphy API endpoints and authentication
2. **Complete Feature Set**: Access to all available API endpoints (v1 and v3)
3. **Better Error Handling**: Improved error messages and logging
4. **Form-urlencoded Support**: Proper handling of POST requests with form data
5. **Comprehensive Testing**: Test endpoints for all major functionality
6. **Backward Compatibility**: Existing code continues to work

## Next Steps

1. **Configure Environment Variables**: Set up the correct API keys and merchant ID
2. **Test Integration**: Use the test endpoints to verify connectivity
3. **Update Dashboard**: Integrate the new API methods into the dashboard
4. **Monitor Usage**: Check API logs and usage patterns
5. **Optimize Caching**: Fine-tune cache settings based on usage patterns

## Troubleshooting

### Common Issues:
1. **API Not Configured**: Ensure all environment variables are set
2. **Authentication Errors**: Verify MID and API key are correct
3. **Network Issues**: Check connectivity to api.ongraphy.com
4. **Rate Limiting**: Monitor API usage and implement proper rate limiting

### Debug Information:
- Check browser console for detailed API request/response logs
- Use test endpoints to isolate specific API issues
- Review server logs for authentication and network errors
