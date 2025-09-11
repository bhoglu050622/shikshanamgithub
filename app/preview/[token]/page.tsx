'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useRealtimeLivePreview } from '@/cms/lib/core/realtime-quick-edit'
import { QuickEditWrapper } from '@/components/cms/QuickEditWrapper'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Eye, 
  Zap, 
  Clock, 
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  RefreshCw,
  AlertTriangle
} from 'lucide-react'

// TypeScript interfaces for better type safety
interface PreviewChange {
  value: string
  type: string
  cssProperty?: string
}

interface LivePreviewData {
  page: string
  changes: Record<string, PreviewChange>
  expiresAt: string
}

interface PreviewResponse {
  [key: string]: PreviewChange
}

// Type guard to check if an object is a valid PreviewChange
const isValidPreviewChange = (change: unknown): change is PreviewChange => {
  return (
    change !== null &&
    typeof change === 'object' &&
    'value' in change &&
    'type' in change &&
    typeof (change as any).value === 'string' &&
    typeof (change as any).type === 'string'
  )
}

// Validation helper for preview data
export const validatePreviewData = (data: unknown): data is PreviewResponse => {
  if (!data || typeof data !== 'object') {
    return false
  }
  
  // Check if it has at least one valid change
  const hasValidChanges = Object.values(data).some(isValidPreviewChange)
  
  return hasValidChanges
}

// Safe getter for preview changes with fallbacks
export const getPreviewValue = (changes: Record<string, PreviewChange> | null, key: string, defaultValue: string): string => {
  if (!changes || !changes[key]) {
    return defaultValue
  }
  return changes[key].value || defaultValue
}

// Debug logging helper (dev-only)
const debugLog = (message: string, data?: any) => {
  if (process.env.NODE_ENV !== 'production') {
    console.debug(`[LivePreview] ${message}`, data)
  }
}

export default function LivePreviewPage() {
  const params = useParams()
  const token = params.token as string
  const [previewData, setPreviewData] = useState<LivePreviewData | null>(null)
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [validationError, setValidationError] = useState<string | null>(null)

  // Use real-time hook for live updates
  const { changes, isConnected, lastUpdate } = useRealtimeLivePreview(token)

  // Load initial preview data with comprehensive error handling
  useEffect(() => {
    const loadPreviewData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        setValidationError(null)

        debugLog('Loading preview data for token:', token)

        const response = await fetch(`/api/cms/quick-edit/live-preview/${token}`)
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          const errorMessage = errorData.error || `HTTP ${response.status}: ${response.statusText}`
          setError(errorMessage)
          debugLog('API error response:', { status: response.status, error: errorMessage })
          return
        }

        const data = await response.json()
        debugLog('Received preview data:', data)

        // Validate the preview data
        if (!validatePreviewData(data)) {
          const validationErrorMsg = 'Preview data is missing required fields or has invalid structure'
          setValidationError(validationErrorMsg)
          debugLog('Validation failed:', { data, validationError: validationErrorMsg })
          return
        }

        // Transform API response to expected format
        const transformedData: LivePreviewData = {
          page: 'homepage', // Default page
          changes: data,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours from now
        }

        setPreviewData(transformedData)
        debugLog('Successfully loaded and validated preview data')
        
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
        console.error('Failed to load preview data:', err)
        setError(`Failed to load preview data: ${errorMessage}`)
        debugLog('Exception during preview load:', err)
      } finally {
        setIsLoading(false)
      }
    }

    if (token) {
      loadPreviewData()
    } else {
      setError('No preview token provided')
      setIsLoading(false)
    }
  }, [token])

  // Update preview data when real-time changes come in
  useEffect(() => {
    if (changes && Object.keys(changes).length > 0) {
      setPreviewData(prev => prev ? {
        ...prev,
        changes: {
          ...prev.changes,
          ...Object.fromEntries(
            Object.entries(changes).map(([key, value]) => [
              key, 
              typeof value === 'string' ? { value, type: 'TEXT' } : value
            ])
          )
        }
      } : null)
    }
  }, [changes])

  const getPreviewIcon = () => {
    switch (previewMode) {
      case 'desktop': return <Monitor className="w-4 h-4" />
      case 'tablet': return <Tablet className="w-4 h-4" />
      case 'mobile': return <Smartphone className="w-4 h-4" />
    }
  }

  const getPreviewDimensions = () => {
    switch (previewMode) {
      case 'desktop': return 'w-full h-screen'
      case 'tablet': return 'w-3/4 h-screen mx-auto'
      case 'mobile': return 'w-80 h-screen mx-auto'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">Loading Preview...</h2>
          <p className="text-gray-500">Setting up your live preview</p>
        </div>
      </div>
    )
  }

  // Early render guard for missing or invalid data
  if (error || validationError || !previewData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-red-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Preview Error
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-3">
              <p className="text-gray-600">
                {error || validationError || 'Preview not found'}
              </p>
              {validationError && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-sm text-yellow-800">
                    The preview data structure is invalid. This might be due to missing required fields.
                  </p>
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button onClick={() => window.location.reload()}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
                <Button variant="outline" onClick={() => window.history.back()}>
                  Go Back
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Preview Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-orange-500" />
              <h1 className="text-lg font-semibold">Live Preview</h1>
            </div>
            <Badge className="bg-orange-100 text-orange-800">
              {previewData.page}
            </Badge>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-sm text-gray-600">
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Preview Mode Toggle */}
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <Button
                variant={previewMode === 'desktop' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setPreviewMode('desktop')}
              >
                <Monitor className="w-4 h-4" />
              </Button>
              <Button
                variant={previewMode === 'tablet' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setPreviewMode('tablet')}
              >
                <Tablet className="w-4 h-4" />
              </Button>
              <Button
                variant={previewMode === 'mobile' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setPreviewMode('mobile')}
              >
                <Smartphone className="w-4 h-4" />
              </Button>
            </div>

            <Button variant="outline" size="sm">
              <Globe className="w-4 h-4 mr-2" />
              Open in New Tab
            </Button>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="p-4">
        <div className={`${getPreviewDimensions()} bg-white rounded-lg shadow-lg overflow-hidden`}>
          <div className="h-full bg-gradient-to-br from-orange-50 to-amber-50">
            {/* Simulated Page Content */}
            <div className="p-8">
              <div className="max-w-4xl mx-auto">
                {/* Hero Section Preview */}
                <div className="text-center mb-12">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    <QuickEditWrapper
                      page={previewData.page}
                      component="Hero"
                      element="title-prefix"
                      type="TEXT"
                      defaultValue="Welcome to"
                      showEditButton={false}
                    >
                      <span style={{ 
                        color: getPreviewValue(previewData.changes, 'homepage.Hero.title-prefix', 'inherit')
                      }}>
                        {getPreviewValue(previewData.changes, 'homepage.Hero.title-prefix', 'Welcome to')}
                      </span>
                    </QuickEditWrapper>
                    {' '}
                    <QuickEditWrapper
                      page={previewData.page}
                      component="Hero"
                      element="title-brand"
                      type="TEXT"
                      defaultValue="Shikshanam"
                      showEditButton={false}
                    >
                      <span style={{ 
                        color: getPreviewValue(previewData.changes, 'homepage.Hero.title-brand', 'inherit')
                      }}>
                        {getPreviewValue(previewData.changes, 'homepage.Hero.title-brand', 'Shikshanam')}
                      </span>
                    </QuickEditWrapper>
                  </h1>
                  
                  <p className="text-xl text-gray-600 mb-8">
                    <QuickEditWrapper
                      page={previewData.page}
                      component="Hero"
                      element="subtitle"
                      type="TEXT"
                      defaultValue="Where AI meets Ancient India"
                      showEditButton={false}
                    >
                      <span style={{ 
                        color: getPreviewValue(previewData.changes, 'homepage.Hero.subtitle', 'inherit')
                      }}>
                        {getPreviewValue(previewData.changes, 'homepage.Hero.subtitle', 'Where AI meets Ancient India')}
                      </span>
                    </QuickEditWrapper>
                  </p>

                  <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <QuickEditWrapper
                      page={previewData.page}
                      component="Hero"
                      element="cta-primary"
                      type="BUTTON_LABEL"
                      defaultValue="School of Sanskrit"
                      showEditButton={false}
                    >
                      <button 
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        style={{
                          backgroundColor: getPreviewValue(previewData.changes, 'homepage.Hero.cta-primary-color', '#3B82F6')
                        }}
                      >
                        {getPreviewValue(previewData.changes, 'homepage.Hero.cta-primary', 'School of Sanskrit')}
                      </button>
                    </QuickEditWrapper>

                    <QuickEditWrapper
                      page={previewData.page}
                      component="Hero"
                      element="cta-secondary"
                      type="BUTTON_LABEL"
                      defaultValue="School of Darshan"
                      showEditButton={false}
                    >
                      <button 
                        className="px-6 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors"
                        style={{
                          backgroundColor: getPreviewValue(previewData.changes, 'homepage.Hero.cta-secondary-color', '#D97706')
                        }}
                      >
                        {getPreviewValue(previewData.changes, 'homepage.Hero.cta-secondary', 'School of Darshan')}
                      </button>
                    </QuickEditWrapper>

                    <QuickEditWrapper
                      page={previewData.page}
                      component="Hero"
                      element="cta-tertiary"
                      type="BUTTON_LABEL"
                      defaultValue="School of Life Skills"
                      showEditButton={false}
                    >
                      <button 
                        className="px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                        style={{
                          backgroundColor: getPreviewValue(previewData.changes, 'homepage.Hero.cta-tertiary-color', '#EA580C')
                        }}
                      >
                        {getPreviewValue(previewData.changes, 'homepage.Hero.cta-tertiary', 'School of Life Skills')}
                      </button>
                    </QuickEditWrapper>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Changes Panel */}
      <div className="fixed bottom-4 right-4 w-80">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Live Changes
              {lastUpdate && (
                <span className="ml-2 text-xs text-gray-500">
                  {lastUpdate.toLocaleTimeString()}
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {previewData.changes && Object.keys(previewData.changes).length > 0 ? (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {Object.entries(previewData.changes).map(([key, change]) => (
                  <div key={key} className="text-xs bg-orange-50 p-2 rounded border border-orange-200">
                    <div className="font-medium text-orange-800 truncate">{key}</div>
                    <div className="text-orange-600 truncate">{change?.value || 'No value'}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                <Eye className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No changes yet</p>
                <p className="text-xs">Start editing to see live updates</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
