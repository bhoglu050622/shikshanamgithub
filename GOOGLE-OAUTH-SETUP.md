# Google OAuth Setup for Shikshanam

## Overview
This document describes the Google OAuth integration for the Shikshanam platform, allowing users to authenticate using their Google accounts.

## Configuration

### Google OAuth Credentials
- **Client ID**: `YOUR_GOOGLE_CLIENT_ID`
- **Client Secret**: `YOUR_GOOGLE_CLIENT_SECRET`

### Environment Variables
Create a `.env.local` file in the root directory with the following variables:

```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# For production, update NEXTAUTH_URL to your domain
# NEXTAUTH_URL=https://yourdomain.com
```

## API Routes

### 1. Google OAuth Initiation
- **Route**: `/api/auth/google`
- **Method**: GET
- **Purpose**: Initiates Google OAuth flow by redirecting to Google's authorization server

### 2. Google OAuth Callback
- **Route**: `/api/auth/google/callback`
- **Method**: GET
- **Purpose**: Handles the callback from Google OAuth and processes the authorization code

## Authentication Flow

1. **User clicks "Continue with Google"** in the login modal
2. **Redirect to Google OAuth** (`/api/auth/google`)
3. **User authorizes the application** on Google's consent screen
4. **Google redirects back** to `/api/auth/google/callback` with authorization code
5. **Exchange code for access token** using Google's token endpoint
6. **Fetch user information** using the access token
7. **Create user session** and redirect back to the application
8. **Update UI** to show user dropdown menu

## User Data Structure

After successful authentication, the user object contains:

```typescript
interface User {
  name: string
  email: string
  avatar?: string
  provider: 'google'
  id: string
}
```

## Security Considerations

1. **Client Secret**: Never expose the client secret in client-side code
2. **HTTPS**: Always use HTTPS in production
3. **State Parameter**: Implement state parameter for CSRF protection
4. **Token Storage**: Access tokens are not stored permanently
5. **User Data**: Only essential user data is stored in localStorage

## Testing

### Local Development
1. Start the development server: `npm run dev`
2. Navigate to the homepage
3. Click the "Login" button
4. Select "Continue with Google"
5. Complete the OAuth flow

### Production Deployment
1. Update `NEXTAUTH_URL` to your production domain
2. Ensure Google OAuth credentials are configured for your domain
3. Test the complete authentication flow

## Troubleshooting

### Common Issues

1. **"redirect_uri_mismatch"**: Ensure the redirect URI in Google Console matches your callback URL
2. **"invalid_client"**: Verify client ID and secret are correct
3. **"access_denied"**: User denied permission or app not verified

### Debug Steps

1. Check browser console for errors
2. Verify environment variables are loaded
3. Test API routes directly
4. Check Google Cloud Console for OAuth configuration

## Files Modified/Created

- `app/api/auth/google/route.ts` - OAuth initiation route
- `app/api/auth/google/callback/route.ts` - OAuth callback route
- `lib/config/auth.ts` - OAuth configuration
- `lib/auth-context.tsx` - Authentication context (updated)
- `components/auth/LoginModal.tsx` - Login modal (updated)

## Next Steps

1. **Email Authentication**: The email authentication flow redirects to `https://courses.shikshanam.in/t/u/authenticate`
2. **User Profile**: Implement user profile management
3. **Session Management**: Add session timeout and refresh
4. **Error Handling**: Enhance error handling and user feedback
