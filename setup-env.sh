#!/bin/bash

# Setup Environment Script for Shikshanam
echo "🚀 Setting up environment for Shikshanam..."

# Check if .env.local already exists
if [ -f ".env.local" ]; then
    echo "⚠️  .env.local already exists. Backing up to .env.local.backup"
    cp .env.local .env.local.backup
fi

# Copy template to .env.local
echo "📋 Creating .env.local from template..."
cp config-template.env .env.local

echo "✅ Environment file created: .env.local"
echo ""
echo "🔧 Next steps:"
echo "1. Edit .env.local and add your actual Google OAuth credentials"
echo "2. Get credentials from: https://console.cloud.google.com/"
echo "3. See GOOGLE_OAUTH_SETUP.md for detailed instructions"
echo ""
echo "📝 To edit .env.local in Cursor:"
echo "   - Open .env.local file"
echo "   - Replace placeholder values with your actual credentials"
echo "   - Save the file"
echo ""
echo "🌐 For production deployment:"
echo "   - Add environment variables to Vercel dashboard"
echo "   - Go to Project Settings → Environment Variables"
