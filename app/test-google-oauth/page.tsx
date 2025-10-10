'use client'

import { useState } from 'react'
import { AUTH_CONFIG } from '@/lib/config/auth'
import { generateGoogleOAuthURL } from '@/lib/auth/GoogleOAuth'

export default function TestGoogleOAuthPage() {
  const [configStatus, setConfigStatus] = useState<{
    clientId: boolean
    clientSecret: boolean
    appUrl: boolean
  }>({
    clientId: false,
    clientSecret: false,
    appUrl: false
  })

  const checkConfiguration = () => {
    const clientId = !!AUTH_CONFIG.GOOGLE.CLIENT_ID
    const clientSecret = !!AUTH_CONFIG.GOOGLE.CLIENT_SECRET
    const appUrl = !!process.env.NEXT_PUBLIC_APP_URL

    setConfigStatus({
      clientId,
      clientSecret,
      appUrl
    })
  }

  const testGoogleOAuth = () => {
    try {
      const authUrl = generateGoogleOAuthURL('/test-google-oauth')
      window.open(authUrl, '_blank')
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Google OAuth Configuration Test
          </h1>

          <div className="space-y-6">
            {/* Configuration Status */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Configuration Status
              </h2>
              <button
                onClick={checkConfiguration}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mb-4"
              >
                Check Configuration
              </button>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${configStatus.clientId ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-gray-700">
                    GOOGLE_CLIENT_ID: {configStatus.clientId ? '✅ Configured' : '❌ Missing'}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${configStatus.clientSecret ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-gray-700">
                    GOOGLE_CLIENT_SECRET: {configStatus.clientSecret ? '✅ Configured' : '❌ Missing'}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${configStatus.appUrl ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-gray-700">
                    NEXT_PUBLIC_APP_URL: {configStatus.appUrl ? '✅ Configured' : '❌ Missing'}
                  </span>
                </div>
              </div>
            </div>

            {/* Current Configuration Values */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Current Configuration Values
              </h2>
              <div className="bg-gray-100 p-4 rounded-md space-y-2">
                <div>
                  <strong>Client ID:</strong> {AUTH_CONFIG.GOOGLE.CLIENT_ID || 'Not set'}
                </div>
                <div>
                  <strong>Client Secret:</strong> {AUTH_CONFIG.GOOGLE.CLIENT_SECRET ? '***configured***' : 'Not set'}
                </div>
                <div>
                  <strong>App URL:</strong> {process.env.NEXT_PUBLIC_APP_URL || 'Not set'}
                </div>
                <div>
                  <strong>Redirect URI:</strong> {AUTH_CONFIG.GOOGLE.REDIRECT_URI}
                </div>
                <div>
                  <strong>Scope:</strong> {AUTH_CONFIG.GOOGLE.SCOPE}
                </div>
              </div>
            </div>

            {/* Test Google OAuth */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Test Google OAuth
              </h2>
              <button
                onClick={testGoogleOAuth}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md"
                disabled={!configStatus.clientId}
              >
                Test Google OAuth Flow
              </button>
              {!configStatus.clientId && (
                <p className="text-red-600 mt-2">
                  Cannot test Google OAuth: GOOGLE_CLIENT_ID is not configured
                </p>
              )}
            </div>

            {/* Setup Instructions */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Setup Instructions
              </h2>
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Go to <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Cloud Console</a></li>
                  <li>Create a new project or select existing one</li>
                  <li>Enable Google+ API and OAuth consent screen</li>
                  <li>Create OAuth 2.0 credentials</li>
                  <li>Add redirect URI: <code className="bg-gray-200 px-1 rounded">{window.location.origin}/api/auth/google/callback</code></li>
                  <li>Set environment variables in your deployment platform</li>
                  <li>For Vercel: Go to project settings → Environment Variables</li>
                </ol>
              </div>
            </div>

            {/* Environment Variables Template */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Required Environment Variables
              </h2>
              <div className="bg-gray-900 text-green-400 p-4 rounded-md font-mono text-sm">
                <div>GOOGLE_CLIENT_ID=your_google_client_id_here</div>
                <div>GOOGLE_CLIENT_SECRET=your_google_client_secret_here</div>
                <div>NEXT_PUBLIC_APP_URL=https://shikshanamv10.vercel.app</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
