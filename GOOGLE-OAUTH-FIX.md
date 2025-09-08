# Google OAuth Redirect URI Fix

## The Problem
You're getting a **redirect_uri_mismatch** error because the redirect URI `http://localhost:3000/api/auth/google/callback` is not registered in your Google Cloud Console.

## Solution 1: Register the Redirect URI (Recommended)

### Steps to Fix:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (or create one if needed)
3. Navigate to **APIs & Services** > **Credentials**
4. Find your OAuth 2.0 Client ID: `467999087721-un7t152lhmdk995hbjgidsm6ckv8rvqo.apps.googleusercontent.com`
5. Click on the client ID to edit it
6. In the **Authorized redirect URIs** section, add:
   ```
   http://localhost:3000/api/auth/google/callback
   ```
7. Save the changes

### For Production:
Also add your production domain:
```
https://yourdomain.com/api/auth/google/callback
```

## Solution 2: Alternative Redirect URIs to Try

If you can't modify the Google Cloud Console, try these common redirect URIs that might already be registered:

### Option A: Use `/oauth2callback`
Update `lib/config/auth.ts`:
```typescript
REDIRECT_URI: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/oauth2callback`,
```

### Option B: Use `/auth/callback`
Update `lib/config/auth.ts`:
```typescript
REDIRECT_URI: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/auth/callback`,
```

### Option C: Use root path
Update `lib/config/auth.ts`:
```typescript
REDIRECT_URI: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/`,
```

## Solution 3: Use Google Identity Services (Modern Approach)

This approach doesn't require redirect URI registration:

1. Add Google Identity Services script to your layout
2. Use the `google.accounts.oauth2` API
3. Handle authentication in the frontend

## Current Status
- ✅ Server running on http://localhost:3000
- ✅ OAuth routes configured
- ❌ Redirect URI not registered in Google Cloud Console
- 🔄 Need to register redirect URI or use alternative approach

## Next Steps
1. **Immediate**: Register the redirect URI in Google Cloud Console (Solution 1)
2. **Alternative**: Try different redirect URIs (Solution 2)
3. **Modern**: Implement Google Identity Services (Solution 3)

## Testing
After fixing the redirect URI:
1. Go to http://localhost:3000
2. Click "Login" button
3. Select "Continue with Google"
4. Complete OAuth flow
5. Should redirect back to your app with user data
