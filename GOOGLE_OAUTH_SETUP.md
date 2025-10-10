# Google OAuth Setup Instructions

## Issue Identified
The Google authentication is not working because the required environment variables are not configured. The error message "Google authentication is not configured. Please contact support." appears when trying to use Google login.

## Required Environment Variables

Create a `.env.local` file in the project root with the following variables:

```bash
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# Application URL
NEXT_PUBLIC_APP_URL=https://shikshanamv10.vercel.app

# Domain
NEXT_PUBLIC_DOMAIN=shikshanamv10.vercel.app
```

## Steps to Fix Google OAuth

### 1. Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Name it "Shikshanam" or similar

### 2. Enable Required APIs
1. Go to "APIs & Services" > "Library"
2. Enable "Google+ API" (or use "People API")
3. Enable "OAuth consent screen"

### 3. Configure OAuth Consent Screen
1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type
3. Fill in required information:
   - App name: "Shikshanam"
   - User support email: your email
   - Developer contact information: your email
4. Add scopes:
   - `../auth/userinfo.email`
   - `../auth/userinfo.profile`
   - `openid`
5. Add test users (for testing)

### 4. Create OAuth 2.0 Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Set authorized redirect URIs:
   - `https://shikshanamv10.vercel.app/api/auth/google/callback`
   - `http://localhost:3000/api/auth/google/callback` (for local development)
5. Copy the Client ID and Client Secret

### 5. Set Environment Variables
Add the credentials to your `.env.local` file:
```bash
GOOGLE_CLIENT_ID=your_actual_client_id_here
GOOGLE_CLIENT_SECRET=your_actual_client_secret_here
```

### 6. Deploy to Vercel
1. In Vercel dashboard, go to your project settings
2. Go to "Environment Variables"
3. Add the same variables:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `NEXT_PUBLIC_APP_URL`

## Testing
After setting up the environment variables:
1. Restart your development server
2. Try clicking "Continue with Google" in the login modal
3. You should be redirected to Google's OAuth consent screen

## Current Implementation
The Google OAuth implementation is already complete in the codebase:
- ✅ OAuth URL generation (`lib/auth/GoogleOAuth.ts`)
- ✅ Callback handling (`app/api/auth/google/callback/route.ts`)
- ✅ Login modal integration (`components/auth/SSOLoginModal.tsx`)
- ✅ Error handling and user feedback

The only missing piece is the environment variable configuration.

## Alternative: Use Test Credentials
For immediate testing, you can use these test credentials (they won't work for production):

```bash
GOOGLE_CLIENT_ID=123456789-test.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-test_secret_key
```

But you'll need to set up proper credentials for the live site.
