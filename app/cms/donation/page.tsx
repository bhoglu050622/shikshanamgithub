'use client'

import { useState, useEffect } from 'react'
import { DonationContent } from '@/lib/cms/donation-types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Save, RotateCcw, Eye, Heart } from 'lucide-react'
import DonationHeroEditor from '@/components/cms/DonationHeroEditor'
import DonationImpactEditor from '@/components/cms/DonationImpactEditor'
import DonationCausesEditor from '@/components/cms/DonationCausesEditor'
import DonationOptionsEditor from '@/components/cms/DonationOptionsEditor'
import DonationTestimonialsEditor from '@/components/cms/DonationTestimonialsEditor'
import DonationFAQEditor from '@/components/cms/DonationFAQEditor'
import DonationCTAEditor from '@/components/cms/DonationCTAEditor'

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

      {/* Content Editor */}
      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="hero" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="impact">Impact</TabsTrigger>
            <TabsTrigger value="causes">Causes</TabsTrigger>
            <TabsTrigger value="options">Options</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="cta">CTA</TabsTrigger>
          </TabsList>

          <TabsContent value="hero" className="mt-6">
            <DonationHeroEditor 
              content={content.hero} 
              onChange={(hero) => setContent({ ...content, hero })}
            />
          </TabsContent>

          <TabsContent value="impact" className="mt-6">
            <DonationImpactEditor 
              content={content.impact} 
              onChange={(impact) => setContent({ ...content, impact })}
            />
          </TabsContent>

          <TabsContent value="causes" className="mt-6">
            <DonationCausesEditor 
              content={content.causes} 
              onChange={(causes) => setContent({ ...content, causes })}
            />
          </TabsContent>

          <TabsContent value="options" className="mt-6">
            <DonationOptionsEditor 
              content={content.donationOptions} 
              onChange={(donationOptions) => setContent({ ...content, donationOptions })}
            />
          </TabsContent>

          <TabsContent value="testimonials" className="mt-6">
            <DonationTestimonialsEditor 
              content={content.testimonials} 
              onChange={(testimonials) => setContent({ ...content, testimonials })}
            />
          </TabsContent>

          <TabsContent value="faq" className="mt-6">
            <DonationFAQEditor 
              content={content.faq} 
              onChange={(faq) => setContent({ ...content, faq })}
            />
          </TabsContent>

          <TabsContent value="cta" className="mt-6">
            <DonationCTAEditor 
              content={content.cta} 
              onChange={(cta) => setContent({ ...content, cta })}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
