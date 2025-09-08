# Dashboard System Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create a `.env.local` file in the root directory with the following variables:

```env
# Graphy (Spayee) API Configuration
GRAPHY_API_BASE_URL=https://api.graphy.com
GRAPHY_API_KEY=your_graphy_api_key_here
GRAPHY_SECRET_KEY=your_graphy_secret_key_here

# Dashboard Configuration
DASHBOARD_CACHE_TTL_STATIC=3600  # 1 hour for static data
DASHBOARD_CACHE_TTL_DYNAMIC=60   # 1 minute for dynamic data
DASHBOARD_RATE_LIMIT_PER_MINUTE=100

# Security
JWT_SECRET=your_jwt_secret_here
ADMIN_API_KEY=your_admin_api_key_here
ADMIN_JWT_TOKEN=your_admin_jwt_token_here

# Logging
LOG_LEVEL=info
ENABLE_API_LOGGING=true
```

### 3. Start Development Server
```bash
npm run dev
```

## 🧪 Testing the Dashboard

### Test Pages Available:
- **Dashboard Demo**: `http://localhost:3000/dashboard-demo`
- **API Test**: `http://localhost:3000/test-dashboard`
- **Main Dashboard**: `http://localhost:3000/dashboard?email=student@example.com`

### API Endpoints:
- `GET /api/dashboard/by-email?email=student@example.com`
- `POST /api/admin/assign-course`
- `DELETE /api/admin/unassign-course`
- `POST /api/admin/process-refund`

## 🔧 Troubleshooting

### Common Issues:

1. **Module not found errors**: Run `npm install` to ensure all dependencies are installed
2. **API errors**: Check your Graphy API credentials in `.env.local`
3. **Rate limiting**: Adjust `DASHBOARD_RATE_LIMIT_PER_MINUTE` if needed

### Dependencies Installed:
- `@radix-ui/react-label` - For form labels
- All existing project dependencies

## 📚 Next Steps

1. Configure your Graphy API credentials
2. Test the API endpoints using the test page
3. Customize the dashboard components as needed
4. Deploy to production following the README-DASHBOARD.md guide

The dashboard system is now ready to use! 🎉
