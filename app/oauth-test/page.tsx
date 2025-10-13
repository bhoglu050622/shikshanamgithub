'use client'

import { useState } from 'react'
import { redirectToGoogleOAuth } from '@/lib/auth/GoogleOAuth'
import { AUTH_CONFIG } from '@/lib/config/auth'

export default function OAuthTestPage() {
  const [debugInfo, setDebugInfo] = useState<any>(null)

  const testOAuth = () => {
    const info = {
      clientId: AUTH_CONFIG.GOOGLE.CLIENT_ID,
      redirectUri: AUTH_CONFIG.GOOGLE.REDIRECT_URI,
      fullRedirectUri: `${window.location.origin}${AUTH_CONFIG.GOOGLE.REDIRECT_URI}`,
      scopes: AUTH_CONFIG.GOOGLE.SCOPES,
      hasClientId: !!AUTH_CONFIG.GOOGLE.CLIENT_ID,
      hasClientSecret: !!AUTH_CONFIG.GOOGLE.CLIENT_SECRET,
      currentOrigin: window.location.origin
    }
    
    setDebugInfo(info)
    console.log('OAuth Debug Info:', info)
    
    // Try OAuth
    try {
      redirectToGoogleOAuth()
    } catch (error) {
      console.error('OAuth Error:', error)
      alert(`OAuth Error: ${error}`)
    }
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">OAuth Debug Test</h1>
      
      <div className="mb-6">
        <button 
          onClick={testOAuth}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Test Google OAuth
        </button>
      </div>

      {debugInfo && (
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Debug Information:</h2>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </div>
      )}

      <div className="mt-6 text-sm text-gray-600">
        <p><strong>Expected Redirect URI:</strong> https://shikshanamgithub.vercel.app/api/auth/google/callback</p>
        <p><strong>Current Origin:</strong> {typeof window !== 'undefined' ? window.location.origin : 'Loading...'}</p>
      </div>
    </div>
  )
}
