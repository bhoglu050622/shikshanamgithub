'use client'

import { useState, useEffect } from 'react'
import { DonationContent } from '@/lib/cms/donation-types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Save, RotateCcw, Eye, Heart, Code } from 'lucide-react'
import EnhancedCodeEditor from '@/components/cms/EnhancedCodeEditor'

export default function DonationCMSAdmin() {
  const [content, setContent] = useState<DonationContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/cms/donation')
      const result = await response.json()
      
      if (result.success) {
        setContent(result.data)
      } else {
        setMessage({ type: 'error', text: 'Failed to load donation content' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load donation content' })
    } finally {
      setLoading(false)
    }
  }

  const saveContent = async (updatedContent: DonationContent) => {
    setSaving(true)
    try {
      const response = await fetch('/api/cms/donation', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedContent),
      })
      
      const result = await response.json()
      
      if (result.success) {
        setContent(updatedContent)
        setMessage({ type: 'success', text: 'Donation content saved successfully!' })
        setTimeout(() => setMessage(null), 3000)
      } else {
        setMessage({ type: 'error', text: 'Failed to save donation content' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save donation content' })
    } finally {
      setSaving(false)
    }
  }

  const previewDonationPage = () => {
    window.open('/donation', '_blank')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading donation content...</p>
        </div>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Error</CardTitle>
            <CardDescription className="text-center">
              Failed to load donation content. Please try again.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={fetchContent} className="w-full">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center">
                <Heart className="w-6 h-6 mr-2 text-primary" />
                Donation Page CMS
              </h1>
              <p className="text-muted-foreground">Edit your donation page content easily</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={previewDonationPage}
                className="flex items-center space-x-2"
              >
                <Eye className="w-4 h-4" />
                <span>Preview Page</span>
              </Button>
              <Button
                onClick={() => saveContent(content)}
                disabled={saving}
                className="flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save All'}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className={`container mx-auto px-4 py-2 ${
          message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {message.text}
        </div>
      )}

      {/* Content Editor - Code Only */}
      <div className="container mx-auto px-4 py-6">
        <div className="w-full">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Total Content - Code Editor
                </CardTitle>
                <CardDescription>
                  Edit the complete Donation page content as JSON. Be careful with syntax - invalid JSON will not be saved.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EnhancedCodeEditor
                  value={JSON.stringify(content, null, 2)}
                  onChange={(value) => {
                    try {
                      const parsed = JSON.parse(value);
                      setContent(parsed);
                    } catch (error) {
                      // Invalid JSON, don't update
                      console.error('Invalid JSON:', error);
                    }
                  }}
                  onSave={() => content && saveContent(content)}
                  language="json"
                  height="600px"
                  placeholder="Edit JSON content directly..."
                  enableSearch={true}
                  enableUndoRedo={true}
                  enableAutoFormat={true}
                  showLineNumbers={true}
                />
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}
