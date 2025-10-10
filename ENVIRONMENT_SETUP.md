# Environment Setup Guide

## Quick Setup

1. **Run the setup script:**
   ```bash
   ./setup-env.sh
   ```

2. **Edit the environment file:**
   - Open `.env.local` in Cursor
   - Replace placeholder values with your actual credentials

## Environment Files

### `.env.local` (for local development)
- **Purpose**: Local development environment variables
- **Status**: Not committed to git (protected by .gitignore)
- **Usage**: Copy from `config-template.env` and customize

### `config-template.env` (template)
- **Purpose**: Template for environment configuration
- **Status**: Committed to git
- **Usage**: Copy to `.env.local` and customize

### `env.example` (production template)
- **Purpose**: Example for production environment variables
- **Status**: Committed to git
- **Usage**: Reference for production deployment

## Required Environment Variables

### Google OAuth (Required for Google Login)
```bash
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

### Application Configuration
```bash
NEXT_PUBLIC_APP_URL=https://shikshanamv10.vercel.app
NEXT_PUBLIC_DOMAIN=shikshanamv10.vercel.app
```

### Graphy SSO (Optional)
```bash
GRAPHY_MERCHANT_ID=your_graphy_merchant_id
GRAPHY_API_TOKEN=your_graphy_api_token
GRAPHY_BASE_URL=your_graphy_base_url
GRAPHY_LEARNING_HUB_URL=https://courses.shikshanam.in
GRAPHY_AUTH_URL=your_graphy_auth_url
```

## Getting Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API and OAuth consent screen
4. Create OAuth 2.0 credentials
5. Add redirect URI: `https://shikshanamv10.vercel.app/api/auth/google/callback`
6. Copy Client ID and Client Secret

## Deployment to Vercel

1. Go to Vercel Dashboard → Your Project
2. Go to Settings → Environment Variables
3. Add all required environment variables
4. Redeploy your application

## Testing

- Visit `/test-google-oauth` to verify your configuration
- Check the console for any configuration errors
- Test Google login functionality

## Security Notes

- Never commit `.env.local` or any file with real credentials
- Use different credentials for development and production
- Rotate credentials regularly
- Keep credentials secure and don't share them publicly
