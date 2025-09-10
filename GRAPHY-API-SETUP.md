# Graphy API Setup Guide

## Overview
This guide explains how to configure the Graphy API integration for the Shikshanam dashboard.

## Prerequisites
- A Graphy account with Advanced Plan (API access is only available on Advanced Plan)
- Access to your Graphy course platform

## Step 1: Get API Credentials

1. Log in to your Graphy course platform
2. In the menu bar, select **Integration API**
3. On the right-hand side, you'll see your API dashboard
4. Copy your **Merchant ID (MID)** and **API Token (Key)**

## Step 2: Configure Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Graphy API Configuration
GRAPHY_API_BASE_URL_V1=https://api.ongraphy.com/public/v1
GRAPHY_API_BASE_URL_V3=https://api.ongraphy.com/t/api/public/v3
GRAPHY_API_KEY=your_merchant_id_here
GRAPHY_SECRET_KEY=your_api_token_here
GRAPHY_MID=your_merchant_id_here

# Dashboard Configuration
DASHBOARD_CACHE_TTL_STATIC=3600
DASHBOARD_CACHE_TTL_DYNAMIC=60
DASHBOARD_RATE_LIMIT_PER_MINUTE=100

# Security
JWT_SECRET=your-jwt-secret-here
CORS_ORIGINS=http://localhost:3000,https://shikshanam.com

# Logging
LOG_LEVEL=info
ENABLE_API_LOGGING=true
```

## Step 3: API Endpoints

The Graphy API provides the following endpoints that we use:

### v1 API Endpoints (https://api.ongraphy.com/public/v1)
- `POST /learners` - Create a new learner
- `POST /learners/validity/update` - Update course validity for a learner
- `GET /quizzes/{quizId}/reports` - Get quiz reports
- `GET /transactions` - Get transactions with filtering
- `GET /learners/{learnerId}/usage` - Get learner usage statistics
- `GET /learners/{learnerId}/discussions` - Get learner discussions

### v3 API Endpoints (https://api.ongraphy.com/t/api/public/v3)
- `GET /products/activelearners` - Get active learners for products
- `GET /products/courseprogressreports` - Get course progress reports
- `GET /products/liveclass/attendees` - Get live class attendees

### Authentication
All API requests use form-urlencoded authentication with:
- `mid` (Merchant ID) - required
- `key` (API Key) - required

## Step 4: Testing the Integration

1. Start your development server: `npm run dev`
2. Log in to the dashboard
3. Check the browser console for API status messages:
   - ✅ "Using REAL data from Graphy API" - API is working
   - 🔄 "Using fallback data - Graphy API unavailable" - API is not configured
   - ⚠️ "Using mock/cached data" - API may not be configured

## Troubleshooting

### API Not Configured Error
If you see "Graphy API not configured" errors:

1. Verify your `.env.local` file exists and has the correct values
2. Restart your development server after adding environment variables
3. Check that your API keys are correct (no extra spaces or quotes)

### 500 Internal Server Error
If you get 500 errors from the Graphy API:

1. Verify your API credentials are correct
2. Check that your Graphy account has Advanced Plan
3. Ensure the API endpoints are accessible from your server
4. Check the server logs for detailed error messages

### Rate Limiting
The API has rate limits. If you hit them:

1. The system will automatically retry with exponential backoff
2. Consider increasing the cache TTL values
3. Monitor your API usage in the Graphy dashboard

## Fallback Mode

If the Graphy API is not configured or fails, the system will automatically fall back to demo data. This allows the dashboard to function for development and demonstration purposes.

## Documentation

- [Graphy API Documentation](https://help.graphy.com/support/solutions/articles/1060000131905-how-to-use-apis-to-get-data-from-your-graphy-course-platform-)
- [Graphy API Postman Collection](https://documenter.getpostman.com/view/15796483/Tzz5vKKr)

## Support

If you need help with the Graphy API integration:

1. Check the Graphy support documentation
2. Contact Graphy support for API-related issues
3. Check the application logs for detailed error messages