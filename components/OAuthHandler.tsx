'use client'

import { useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'

export default function OAuthHandler() {
  const { login } = useAuth()

  useEffect(() => {
    // Handle OAuth callback
    const urlParams = new URLSearchParams(window.location.search)
    const authStatus = urlParams.get('auth')
    const userParam = urlParams.get('user')
    const errorMessage = urlParams.get('message')

    if (authStatus === 'success' && userParam) {
      try {
        const userData = JSON.parse(decodeURIComponent(userParam))
        login(userData)
        
        // Clean up URL parameters
        const newUrl = new URL(window.location.href)
        newUrl.searchParams.delete('auth')
        newUrl.searchParams.delete('user')
        newUrl.searchParams.delete('message')
        window.history.replaceState({}, '', newUrl.toString())
      } catch (error) {
        console.error('Error parsing OAuth user data:', error)
      }
    } else if (authStatus === 'error') {
      console.error('OAuth error:', errorMessage)
      // Clean up URL parameters
      const newUrl = new URL(window.location.href)
      newUrl.searchParams.delete('auth')
      newUrl.searchParams.delete('user')
      newUrl.searchParams.delete('message')
      window.history.replaceState({}, '', newUrl.toString())
    }
  }, [login])

  return null // This component doesn't render anything
}
