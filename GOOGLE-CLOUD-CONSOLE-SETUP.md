# Google Cloud Console Setup - Fix Redirect URI Mismatch

## 🚨 **Current Error**
You're getting: **"Error 400: redirect_uri_mismatch"** because the redirect URI is not registered in Google Cloud Console.

## 🔧 **Solution: Register Redirect URI**

### **Step 1: Access Google Cloud Console**
1. Go to: https://console.cloud.google.com/
2. Sign in with your Google account
3. Select the project that contains your OAuth client ID

### **Step 2: Navigate to Credentials**
1. In the left sidebar, click **"APIs & Services"**
2. Click **"Credentials"**
3. You should see your OAuth 2.0 Client ID: `467999087721-un7t152lhmdk995hbjgidsm6ckv8rvqo.apps.googleusercontent.com`

### **Step 3: Edit OAuth Client**
1. Click on the OAuth 2.0 Client ID to edit it
2. Scroll down to **"Authorized redirect URIs"** section
3. Click **"+ ADD URI"**

### **Step 4: Add Redirect URIs**
Add these URIs one by one:

**For Development:**
```
http://localhost:3000/api/auth/google/callback
```

**For Production (when you deploy):**
```
https://yourdomain.com/api/auth/google/callback
```

### **Step 5: Save Changes**
1. Click **"SAVE"** at the bottom
2. Wait for the changes to be saved

## 🧪 **Test the Fix**

After registering the redirect URI:

1. **Go to**: http://localhost:3000
2. **Click**: "Login" button
3. **Select**: "Continue with Google"
4. **Complete**: OAuth authorization
5. **Result**: Should redirect back and log you in

## 🔍 **Alternative Solutions**

If you can't access the Google Cloud Console, try these redirect URIs that might already be registered:

### **Option 1: Try `/oauth2callback`**
Update `lib/config/auth.ts`:
```typescript
REDIRECT_URI: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/oauth2callback`,
```

### **Option 2: Try `/auth/callback`**
Update `lib/config/auth.ts`:
```typescript
REDIRECT_URI: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/auth/callback`,
```

### **Option 3: Try root path**
Update `lib/config/auth.ts`:
```typescript
REDIRECT_URI: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/`,
```

## 📋 **Current Configuration**
- **Client ID**: `467999087721-un7t152lhmdk995hbjgidsm6ckv8rvqo.apps.googleusercontent.com`
- **Redirect URI**: `http://localhost:3000/api/auth/google/callback`
- **OAuth Route**: `/api/auth/google`
- **Callback Route**: `/api/auth/google/callback`

## 🎯 **Expected Result**
After registering the redirect URI, the OAuth flow should work:
1. User clicks "Continue with Google"
2. Redirects to Google OAuth
3. User authorizes the app
4. Google redirects to `/api/auth/google/callback`
5. App processes the callback and logs user in
6. User sees the dropdown menu instead of login button

## 🆘 **Still Having Issues?**
If you still get the redirect URI mismatch error:
1. Double-check the URI is exactly: `http://localhost:3000/api/auth/google/callback`
2. Make sure you're in the correct Google Cloud project
3. Wait a few minutes for changes to propagate
4. Try clearing browser cache and cookies
