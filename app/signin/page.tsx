'use client'

import { redirectToGoogleOAuth } from '@/lib/auth/GoogleOAuth'
import { FaGoogle } from 'react-icons/fa'

export default function SignInPage() {
  const handleSignIn = () => {
    // Redirect to Google OAuth flow
    redirectToGoogleOAuth('/my-journey')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in to continue your learning journey</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-8">
          <button
            onClick={handleSignIn}
            className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FaGoogle className="mr-2" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  )
}