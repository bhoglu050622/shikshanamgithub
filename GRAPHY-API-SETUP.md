# Graphy API Setup for Real Dashboard Data

## Overview
The dashboard is now configured to pull real-time data from the Graphy API using the correct endpoints from the official documentation. If the API is not configured, it will fall back to mock data for development.

## Environment Variables Required

Add these to your `.env.local` file:

```bash
# Graphy API Configuration
GRAPHY_API_BASE_URL=https://api.graphy.com
GRAPHY_API_KEY=your_graphy_api_key_here
GRAPHY_SECRET_KEY=your_graphy_secret_key_here

# Optional: Cache and Rate Limiting
DASHBOARD_CACHE_TTL_STATIC=3600
DASHBOARD_CACHE_TTL_DYNAMIC=60
DASHBOARD_RATE_LIMIT_PER_MINUTE=100
```

## API Endpoints Used

The integration now uses the correct Graphy API endpoints:

- **Learners**: `/api/v1/learners`
- **Products**: `/api/v1/products`
- **Enrollments**: `/api/v1/learners/{id}/enrollments`
- **Progress**: `/api/v1/courses/{id}/progress/{learnerId}`
- **Analytics**: `/api/v1/learners/{id}/analytics/usage`
- **Transactions**: `/api/v1/learners/{id}/transactions`
- **Admin**: `/api/v1/admin/*`

## How to Get Graphy API Credentials

1. **Log in to your Graphy Admin Dashboard**
2. **Go to Settings > API Integration**
3. **Generate API Key and Secret Key**
4. **Copy the credentials to your environment variables**

## Testing the Setup

1. **Start the development server**: `npm run dev`
2. **Test API connection**: Navigate to `/api/test-graphy` to verify API connectivity
3. **Open the dashboard**: Navigate to `/dashboard`
4. **Check the console logs**:
   - ✅ "Using REAL data from Graphy API" = API is working
   - ⚠️ "Using mock/cached data" = API not configured or failing
5. **Check the UI indicator**:
   - Green "✅ Live Data" badge = Real Graphy data
   - Amber "⚠️ Demo Data" badge = Mock data

## Dashboard Features

### Real-time Data Refresh
- **Auto-refresh**: Every 10 minutes
- **Manual refresh**: Click "Refresh" button in dashboard header
- **Last updated**: Shows timestamp of last data fetch

### Data Sources
- **Course enrollment data**
- **Progress reports**
- **Activity timeline**
- **Recommendations**
- **Transactions**
- **Certificates**

### Error Handling
- Graceful fallback to mock data if API fails
- User-friendly error messages
- Automatic retry mechanisms
- Rate limiting protection

## Troubleshooting

### Common Issues

1. **"Learner not found" error**
   - Check if the email exists in Graphy
   - Verify email authentication is working
   - Contact support if needed

2. **"Dashboard service error"**
   - Check API credentials are correct
   - Verify Graphy API is accessible
   - Check network connectivity

3. **Rate limiting errors**
   - Reduce refresh frequency
   - Check API usage limits
   - Contact Graphy support for higher limits

### Debug Mode

Set `ENABLE_API_LOGGING=true` in your environment to see detailed API logs.

## API Endpoints Used

The dashboard now uses `/api/dashboard/real-data` which:
- Authenticates the user via cookies
- Fetches real data from Graphy API
- Returns structured dashboard data
- Includes metadata about data source

## Development vs Production

- **Development**: Falls back to mock data if API not configured
- **Production**: Requires valid API credentials to function

This ensures developers can work without API access while production uses real data.
