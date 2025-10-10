'use client'

import { useState } from 'react'
import { generateGraphyJWT, redirectToGraphySSO, GraphyUser } from '@/lib/auth/GraphySSO'
import { redirectToGoogleOAuth, generateGoogleOAuthURL } from '@/lib/auth/GoogleOAuth'
import { useAuth } from '@/lib/auth/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AUTH_CONFIG } from '@/lib/config/auth'

export default function TestSSOPage() {
  const [email, setEmail] = useState('test@example.com')
  const [name, setName] = useState('Test User')
  const [jwt, setJwt] = useState('')
  const { user, login, logout } = useAuth()

  const handleGenerateJWT = async () => {
    const userData: GraphyUser = {
      email,
      name: name || undefined
    }
    
    try {
      const token = await generateGraphyJWT(userData)
      setJwt(token)
    } catch (error) {
      console.error('Error generating JWT:', error)
    }
  }

  const handleSSOLogin = async () => {
    const userData: GraphyUser = {
      email,
      name: name || undefined
    }
    
    try {
      await redirectToGraphySSO(userData)
    } catch (error) {
      console.error('Error with SSO login:', error)
    }
  }

  const handleGoogleOAuth = () => {
    try {
      redirectToGoogleOAuth()
    } catch (error) {
      console.error('Error with Google OAuth:', error)
    }
  }

  const handleEmailAuth = () => {
    window.location.href = AUTH_CONFIG.GRAPHY.AUTH_URL
  }

  const handleTestLogin = () => {
    login({
      email,
      name: name || undefined,
      loginTime: Date.now()
    })
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Graphy SSO Test Page</h1>
      
      <div className="space-y-6">
        {/* User Input */}
        <div className="space-y-4 p-6 border rounded-lg">
          <h2 className="text-xl font-semibold">User Information</h2>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name (Optional)</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
            />
          </div>
        </div>

        {/* Current Auth Status */}
        <div className="space-y-4 p-6 border rounded-lg">
          <h2 className="text-xl font-semibold">Current Authentication Status</h2>
          {user ? (
            <div className="space-y-2">
              <p><strong>Logged in:</strong> Yes</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Name:</strong> {user.name || 'Not provided'}</p>
              <Button onClick={logout} variant="destructive">
                Logout
              </Button>
            </div>
          ) : (
            <div>
              <p><strong>Logged in:</strong> No</p>
              <Button onClick={handleTestLogin} variant="outline">
                Test Login (Local)
              </Button>
            </div>
          )}
        </div>

        {/* JWT Generation */}
        <div className="space-y-4 p-6 border rounded-lg">
          <h2 className="text-xl font-semibold">JWT Token Generation</h2>
          <Button onClick={handleGenerateJWT} className="w-full">
            Generate JWT Token
          </Button>
          {jwt && (
            <div className="space-y-2">
              <Label>Generated JWT:</Label>
              <div className="p-3 bg-muted rounded text-xs break-all">
                {jwt}
              </div>
            </div>
          )}
        </div>

        {/* Authentication Options */}
        <div className="space-y-4 p-6 border rounded-lg">
          <h2 className="text-xl font-semibold">Authentication Options</h2>
          
          <div className="space-y-3">
            <Button onClick={handleGoogleOAuth} className="w-full" variant="outline">
              Test Google OAuth
            </Button>
            <p className="text-sm text-muted-foreground">
              Google OAuth → Graphy → Homepage
            </p>
          </div>

          <div className="space-y-3">
            <Button onClick={handleEmailAuth} className="w-full" variant="outline">
              Test Email Authentication
            </Button>
            <p className="text-sm text-muted-foreground">
              Direct redirect to Graphy email authentication
            </p>
          </div>

          <div className="space-y-3">
            <Button onClick={handleSSOLogin} className="w-full" variant="primary">
              Test Direct SSO Login
            </Button>
            <p className="text-sm text-muted-foreground">
              Direct SSO with generated JWT token
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-4 p-6 border rounded-lg bg-muted/50">
          <h2 className="text-xl font-semibold">Instructions</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li><strong>Google OAuth:</strong> Click "Test Google OAuth" → Google login → Graphy authentication → Return to homepage</li>
            <li><strong>Email Auth:</strong> Click "Test Email Authentication" → Direct redirect to Graphy email auth page</li>
            <li><strong>Direct SSO:</strong> Enter email/name → Generate JWT → Test direct SSO login</li>
            <li><strong>Local Test:</strong> Use "Test Login (Local)" to simulate authentication without external services</li>
            <li>Check authentication status after any successful login</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
