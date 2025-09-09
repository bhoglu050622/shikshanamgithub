/**
 * Privacy Controls Component
 * Allows users to manage their analytics preferences
 */

'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Shield, Eye, EyeOff, Download, Trash2, Info } from 'lucide-react'

export default function PrivacyControls() {
  const [isOptedOut, setIsOptedOut] = useState(false)
  const [visitorId, setVisitorId] = useState('')
  const [sessionId, setSessionId] = useState('')
  const [queueLength, setQueueLength] = useState(0)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Check current opt-out status
    const optedOut = localStorage.getItem('analytics_opt_out') === 'true'
    setIsOptedOut(optedOut)

    // Get analytics IDs
    const vId = localStorage.getItem('analytics_visitor_id') || 'Not set'
    const sId = sessionStorage.getItem('analytics_session_id') || 'Not set'
    setVisitorId(vId)
    setSessionId(sId)

    // Get queue length
    try {
      const queue = localStorage.getItem('analytics_queue_v1')
      const queueData = queue ? JSON.parse(queue) : []
      setQueueLength(queueData.length)
    } catch {
      setQueueLength(0)
    }
  }, [])

  const handleOptOut = async () => {
    try {
      const { analyticsTracker } = await import('@/lib/analytics-tracker')
      analyticsTracker.optOut()
      setIsOptedOut(true)
      setQueueLength(0)
    } catch (error) {
      // Fallback
      localStorage.setItem('analytics_opt_out', 'true')
      localStorage.removeItem('analytics_queue_v1')
      localStorage.removeItem('analytics_visitor_id')
      sessionStorage.removeItem('analytics_session_id')
      setIsOptedOut(true)
      setQueueLength(0)
    }
  }

  const handleOptIn = async () => {
    try {
      const { analyticsTracker } = await import('@/lib/analytics-tracker')
      analyticsTracker.optIn()
      setIsOptedOut(false)
    } catch (error) {
      // Fallback
      localStorage.removeItem('analytics_opt_out')
      setIsOptedOut(false)
      window.location.reload() // Reload to reinitialize tracker
    }
  }

  const exportData = () => {
    try {
      const data = {
        visitor_id: visitorId,
        session_id: sessionId,
        opt_out_status: isOptedOut,
        queue_length: queueLength,
        exported_at: new Date().toISOString(),
        queue_data: JSON.parse(localStorage.getItem('analytics_queue_v1') || '[]')
      }

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `analytics-data-${Date.now()}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to export data:', error)
    }
  }

  const clearData = () => {
    if (confirm('Are you sure you want to clear all analytics data? This action cannot be undone.')) {
      localStorage.removeItem('analytics_queue_v1')
      localStorage.removeItem('analytics_visitor_id')
      sessionStorage.removeItem('analytics_session_id')
      sessionStorage.removeItem('analytics_session_id_timestamp')
      setQueueLength(0)
      setVisitorId('Cleared')
      setSessionId('Cleared')
    }
  }

  const forceFlush = async () => {
    try {
      const { analyticsTracker } = await import('@/lib/analytics-tracker')
      analyticsTracker.forceFlush()
      
      // Update queue length after a delay
      setTimeout(() => {
        try {
          const queue = localStorage.getItem('analytics_queue_v1')
          const queueData = queue ? JSON.parse(queue) : []
          setQueueLength(queueData.length)
        } catch {
          setQueueLength(0)
        }
      }, 1000)
    } catch (error) {
      console.error('Failed to flush queue:', error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Privacy Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <div>
              <CardTitle className="text-lg">Privacy Status</CardTitle>
              <CardDescription>Your analytics preferences</CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Analytics Tracking</h4>
              <p className="text-sm text-muted-foreground">
                {isOptedOut ? 'Disabled - No data is being collected' : 'Enabled - Anonymous usage data is collected'}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant={isOptedOut ? 'destructive' : 'default'}>
                {isOptedOut ? 'Opted Out' : 'Active'}
              </Badge>
              <Switch
                checked={!isOptedOut}
                onCheckedChange={(checked) => checked ? handleOptIn() : handleOptOut()}
              />
            </div>
          </div>

          {isOptedOut && (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Analytics tracking is disabled. No usage data is being collected or stored.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Data Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Your Data</CardTitle>
              <CardDescription>Analytics data associated with your browser</CardDescription>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showDetails ? 'Hide' : 'Show'} Details
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">{queueLength}</div>
              <div className="text-sm text-muted-foreground">Queued Events</div>
            </div>
            
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">{visitorId !== 'Not set' ? '1' : '0'}</div>
              <div className="text-sm text-muted-foreground">Visitor ID</div>
            </div>
            
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">{sessionId !== 'Not set' ? '1' : '0'}</div>
              <div className="text-sm text-muted-foreground">Session ID</div>
            </div>
          </div>

          {showDetails && (
            <div className="space-y-3 pt-4 border-t">
              <div>
                <h5 className="font-medium mb-1">Visitor ID</h5>
                <code className="text-xs bg-muted px-2 py-1 rounded break-all">
                  {visitorId}
                </code>
              </div>
              
              <div>
                <h5 className="font-medium mb-1">Session ID</h5>
                <code className="text-xs bg-muted px-2 py-1 rounded break-all">
                  {sessionId}
                </code>
              </div>
              
              <div>
                <h5 className="font-medium mb-1">Browser Settings</h5>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>Do Not Track: {navigator.doNotTrack === '1' ? 'Enabled' : 'Disabled'}</div>
                  <div>Cookies Enabled: {navigator.cookieEnabled ? 'Yes' : 'No'}</div>
                  <div>Local Storage: {typeof Storage !== 'undefined' ? 'Available' : 'Not Available'}</div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 pt-4 border-t">
            <Button variant="outline" size="sm" onClick={exportData}>
              <Download className="w-4 h-4 mr-1" />
              Export Data
            </Button>
            
            {queueLength > 0 && (
              <Button variant="outline" size="sm" onClick={forceFlush}>
                <Upload className="w-4 h-4 mr-1" />
                Send Queued Data
              </Button>
            )}
            
            <Button variant="outline" size="sm" onClick={clearData} className="text-destructive">
              <Trash2 className="w-4 h-4 mr-1" />
              Clear Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Usage Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">How We Use Your Data</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-3">
          <div className="text-sm space-y-2">
            <h5 className="font-medium">Data We Collect:</h5>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Page views and navigation patterns</li>
              <li>Browser type and operating system</li>
              <li>Screen resolution and device type</li>
              <li>Referrer websites (where you came from)</li>
              <li>General location (country level only)</li>
            </ul>
          </div>
          
          <div className="text-sm space-y-2">
            <h5 className="font-medium">Data We Don't Collect:</h5>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Personal information (names, emails, addresses)</li>
              <li>Passwords or sensitive form data</li>
              <li>Precise location data</li>
              <li>Cross-site tracking data</li>
            </ul>
          </div>
          
          <div className="text-sm space-y-2">
            <h5 className="font-medium">Data Retention:</h5>
            <p className="text-muted-foreground">
              Analytics data is automatically deleted after 90 days. You can request immediate deletion at any time.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Missing Upload icon - simple replacement
function Upload({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
  )
}
