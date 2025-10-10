# Graphy SSO Implementation with Google OAuth

## Overview
This implementation integrates Graphy Single Sign-On (SSO) with Google OAuth authentication for the Shikshanam platform, providing multiple authentication options for users to access their learning dashboard.

## Features Implemented

### 1. Graphy SSO Integration (`lib/auth/GraphySSO.ts`)
- JWT token generation using HMAC SHA256
- Base64 URL encoding for JWT components
- SSO URL generation with proper token parameters
- SSO callback handling for user authentication

### 2. Google OAuth Integration (`lib/auth/GoogleOAuth.ts`)
- Google OAuth 2.0 flow implementation
- Authorization code exchange for access tokens
- User information retrieval from Google APIs
- JWT ID token decoding for user data
- Seamless integration with Graphy SSO

### 3. Authentication Context (`lib/auth/AuthContext.tsx`)
- Global authentication state management
- User session persistence using cookies
- Automatic SSO callback processing
- Login/logout functionality

### 4. Enhanced SSO Login Modal (`components/auth/SSOLoginModal.tsx`)
- **Google OAuth Button**: "Continue with Google" option
- **Email Authentication**: Direct redirect to Graphy email auth
- User-friendly interface with clear options
- Visual feedback and loading states
- Comprehensive error handling

### 5. User Dropdown (`components/auth/UserDropdown.tsx`)
- Displays when user is authenticated
- "My Learning Hub" button (opens courses.shikshanam.in/t/u/activeCourses)
- Logout functionality
- User information display

### 6. Updated Header Component
- Conditional rendering based on authentication status
- Shows login button when not authenticated
- Shows user dropdown when authenticated
- Integrated with AuthProvider

### 7. Session Persistence
- Uses existing cookie system (`lib/cookies.ts`)
- 30-day session duration
- Automatic session validation
- Secure cookie handling

### 8. API Routes
- `/api/auth/google/callback` - Handles Google OAuth callback
- `/api/auth/sso-callback` - Handles Graphy SSO callback

## Configuration

### Graphy Settings
- **Merchant ID**: Set via `GRAPHY_MERCHANT_ID` environment variable
- **API Token**: Set via `GRAPHY_API_TOKEN` environment variable
- **Base URL**: Set via `GRAPHY_BASE_URL` environment variable
- **Learning Hub URL**: Set via `GRAPHY_LEARNING_HUB_URL` environment variable
- **Auth URL**: Set via `GRAPHY_AUTH_URL` environment variable

### Google OAuth Settings
- **Client ID**: Set via `GOOGLE_CLIENT_ID` environment variable
- **Client Secret**: Set via `GOOGLE_CLIENT_SECRET` environment variable
- **Redirect URI**: `/api/auth/google/callback`
- **Scope**: `openid email profile`

## User Flow

### Google OAuth Login Process
1. User clicks "Login" button in header
2. SSO Login Modal opens with two options
3. User clicks "Continue with Google"
4. Redirected to Google OAuth consent screen
5. User authorizes the application
6. Google redirects back with authorization code
7. System exchanges code for access token and user info
8. System generates Graphy JWT token with Google user data
9. User is redirected to Graphy Learning Hub with SSO token
10. After Graphy authentication, user returns to homepage
11. System processes SSO callback and logs user in
12. Header shows user dropdown instead of login button

### Email Authentication Process
1. User clicks "Login" button in header
2. SSO Login Modal opens
3. User enters email (and optional password)
4. User clicks "Continue with Email"
5. User is redirected to Graphy email authentication page
6. User completes authentication on Graphy
7. User is redirected back to homepage
8. System processes authentication and logs user in
9. Header shows user dropdown instead of login button

### Logout Process
1. User clicks "Logout" in user dropdown
2. System clears authentication cookies
3. User is redirected to homepage
4. Header shows login button again

### My Learning Hub Access
1. User clicks "My Learning Hub" in user dropdown
2. Opens `https://courses.shikshanam.in/t/u/activeCourses` in new tab
3. User can access their courses and progress

## Files Created/Modified

### New Files
- `lib/auth/GraphySSO.ts` - Core SSO functionality
- `lib/auth/GoogleOAuth.ts` - Google OAuth integration
- `lib/auth/AuthContext.tsx` - Authentication context
- `lib/config/auth.ts` - Centralized authentication configuration
- `components/auth/SSOLoginModal.tsx` - Enhanced SSO login modal with dual options
- `components/auth/UserDropdown.tsx` - User dropdown component
- `app/api/auth/sso-callback/route.ts` - SSO callback handler
- `app/api/auth/google/callback/route.ts` - Google OAuth callback handler
- `app/test-sso/page.tsx` - Testing page for all authentication methods

### Modified Files
- `components/Header.tsx` - Updated to use new auth system
- `app/layout.tsx` - Added AuthProvider wrapper

## Testing

### Test Page
Visit `/test-sso` to test the SSO functionality:
- Generate JWT tokens
- Test local login
- Test SSO redirect
- Verify authentication status

### Manual Testing Steps
1. Go to homepage
2. Click "Login" button
3. Enter email and click "Access My Learning Hub"
4. Verify redirect to Graphy
5. Return to homepage and check authentication status
6. Test "My Learning Hub" and "Logout" functionality

## Security Considerations

- JWT tokens are signed with HMAC SHA256
- Tokens have expiration time (default 60 minutes)
- Secure cookie handling with proper flags
- Client-side token validation
- Automatic session cleanup on expiration

## Browser Compatibility

- Uses Web Crypto API for HMAC SHA256 (modern browsers)
- Fallback handling for older browsers
- Progressive enhancement approach

## Future Enhancements

- Add course-specific SSO tokens
- Implement refresh token mechanism
- Add user profile management
- Enhanced error handling and user feedback
- Analytics integration for login events
