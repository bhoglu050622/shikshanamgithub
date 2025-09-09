'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/cms/context/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Globe, 
  Edit, 
  Eye, 
  Save,
  Home,
  FileText,
  Settings,
  Palette,
  Image as ImageIcon,
  Code,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react'

interface WebsitePage {
  id: string
  name: string
  path: string
  title: string
  description: string
  status: 'live' | 'draft' | 'maintenance'
  lastModified: string
  editor: string
  template: string
}

interface WebsiteSection {
  id: string
  name: string
  component: string
  props: Record<string, any>
  isVisible: boolean
  order: number
}

export default function WebsiteEditorPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [selectedPage, setSelectedPage] = useState<string>('homepage')
  const [pages, setPages] = useState<WebsitePage[]>([])
  const [sections, setSections] = useState<WebsiteSection[]>([])
  const [saving, setSaving] = useState(false)
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')

  // Mock website pages data
  useEffect(() => {
    const mockPages: WebsitePage[] = [
      {
        id: 'homepage',
        name: 'Homepage',
        path: '/',
        title: 'Shikshanam - Ancient Wisdom for Modern Living',
        description: 'Main landing page with hero section, features, and call-to-actions',
        status: 'live',
        lastModified: '2024-01-15T10:30:00Z',
        editor: 'shikshanam',
        template: 'home'
      },
      {
        id: 'about',
        name: 'About Us',
        path: '/about',
        title: 'About Shikshanam - Our Mission',
        description: 'Information about our mission, vision, and team',
        status: 'live',
        lastModified: '2024-01-10T14:20:00Z',
        editor: 'shikshanam',
        template: 'page'
      },
      {
        id: 'courses',
        name: 'Courses',
        path: '/courses',
        title: 'Courses - Learn Sanskrit & Philosophy',
        description: 'Course listing and category pages',
        status: 'live',
        lastModified: '2024-01-12T16:45:00Z',
        editor: 'shikshanam',
        template: 'courses'
      },
      {
        id: 'contact',
        name: 'Contact',
        path: '/contact',
        title: 'Contact Us - Get in Touch',
        description: 'Contact form and information',
        status: 'live',
        lastModified: '2024-01-08T09:15:00Z',
        editor: 'shikshanam',
        template: 'contact'
      }
    ]

    const mockSections: WebsiteSection[] = [
      {
        id: 'hero',
        name: 'Hero Section',
        component: 'Hero',
        props: {
          title: 'Ancient Wisdom for Modern Living',
          subtitle: 'Learn Sanskrit, Philosophy, and Spiritual Practices',
          ctaText: 'Start Learning',
          ctaLink: '/courses',
          backgroundImage: '/assets/hero-bg.jpg'
        },
        isVisible: true,
        order: 1
      },
      {
        id: 'features',
        name: 'Features Section',
        component: 'Features',
        props: {
          title: 'Why Choose Shikshanam?',
          features: [
            {
              title: 'Expert Teachers',
              description: 'Learn from renowned scholars and practitioners',
              icon: 'users'
            },
            {
              title: 'Authentic Content',
              description: 'Traditional knowledge presented in modern format',
              icon: 'book'
            },
            {
              title: 'Interactive Learning',
              description: 'Engage with content through interactive exercises',
              icon: 'play'
            }
          ]
        },
        isVisible: true,
        order: 2
      },
      {
        id: 'testimonials',
        name: 'Testimonials',
        component: 'Testimonials',
        props: {
          title: 'What Our Students Say',
          testimonials: [
            {
              name: 'Priya S.',
              text: 'Shikshanam transformed my understanding of Sanskrit',
              rating: 5
            },
            {
              name: 'Rajesh K.',
              text: 'The philosophy courses are incredibly insightful',
              rating: 5
            }
          ]
        },
        isVisible: true,
        order: 3
      }
    ]

    setPages(mockPages)
    setSections(mockSections)
  }, [])

  const currentPage = pages.find(p => p.id === selectedPage)
  const currentSections = sections.filter(s => s.isVisible).sort((a, b) => a.order - b.order)

  const handleSave = async () => {
    setSaving(true)
    
    // Simulate save
    setTimeout(() => {
      setSaving(false)
      // Show success message
    }, 1500)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'live': return <div className="w-2 h-2 bg-green-500 rounded-full" />
      case 'draft': return <div className="w-2 h-2 bg-yellow-500 rounded-full" />
      case 'maintenance': return <div className="w-2 h-2 bg-red-500 rounded-full" />
      default: return <div className="w-2 h-2 bg-gray-500 rounded-full" />
    }
  }

  const getPreviewIcon = () => {
    switch (previewMode) {
      case 'desktop': return <Monitor className="w-4 h-4" />
      case 'tablet': return <Tablet className="w-4 h-4" />
      case 'mobile': return <Smartphone className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Website Editor</h1>
          <p className="text-gray-600">Edit your website pages and content</p>
        </div>
        <div className="flex items-center space-x-3">
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
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Live Preview
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Page Selector */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Website Pages</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {pages.map((page) => (
                  <button
                    key={page.id}
                    onClick={() => setSelectedPage(page.id)}
                    className={`w-full text-left p-3 hover:bg-gray-50 transition-colors ${
                      selectedPage === page.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Globe className="w-4 h-4 text-gray-600" />
                        <span className="font-medium text-sm">{page.name}</span>
                      </div>
                      {getStatusIcon(page.status)}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{page.path}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Page Editor */}
        <div className="lg:col-span-3">
          {currentPage && (
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="sections">Sections</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Edit className="w-5 h-5 mr-2" />
                      Edit {currentPage.name}
                    </CardTitle>
                    <CardDescription>
                      Modify the content and metadata for this page
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Page Title
                      </label>
                      <Input
                        value={currentPage.title}
                        onChange={(e) => {
                          const updatedPages = pages.map(p => 
                            p.id === selectedPage ? { ...p, title: e.target.value } : p
                          )
                          setPages(updatedPages)
                        }}
                        placeholder="Page title for browser tab"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Meta Description
                      </label>
                      <Textarea
                        value={currentPage.description}
                        onChange={(e) => {
                          const updatedPages = pages.map(p => 
                            p.id === selectedPage ? { ...p, description: e.target.value } : p
                          )
                          setPages(updatedPages)
                        }}
                        placeholder="SEO description for search engines"
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Template
                        </label>
                        <Input
                          value={currentPage.template}
                          onChange={(e) => {
                            const updatedPages = pages.map(p => 
                              p.id === selectedPage ? { ...p, template: e.target.value } : p
                            )
                            setPages(updatedPages)
                          }}
                          placeholder="Template name"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Status
                        </label>
                        <div className="flex items-center space-x-2">
                          <Badge className={
                            currentPage.status === 'live' ? 'bg-green-100 text-green-800' :
                            currentPage.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }>
                            {currentPage.status.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sections" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Code className="w-5 h-5 mr-2" />
                      Page Sections
                    </CardTitle>
                    <CardDescription>
                      Manage the components and sections on this page
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {currentSections.map((section) => (
                        <div key={section.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <Code className="w-4 h-4 text-blue-600" />
                              <span className="font-medium">{section.name}</span>
                              <Badge variant="outline" className="text-xs">
                                {section.component}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className={section.isVisible ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                                {section.isVisible ? 'Visible' : 'Hidden'}
                              </Badge>
                              <Button variant="outline" size="sm">
                                <Edit className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          
                          {/* Section Props Preview */}
                          <div className="bg-gray-50 rounded p-3">
                            <p className="text-xs font-medium text-gray-600 mb-2">Properties:</p>
                            <pre className="text-xs text-gray-700 overflow-x-auto">
                              {JSON.stringify(section.props, null, 2)}
                            </pre>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="w-5 h-5 mr-2" />
                      Page Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Alert>
                      <AlertDescription>
                        Page settings allow you to configure SEO, social media previews, and advanced options.
                      </AlertDescription>
                    </Alert>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Open Graph Image
                        </label>
                        <Input placeholder="https://example.com/og-image.jpg" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Canonical URL
                        </label>
                        <Input placeholder="https://shikshanam.com/page" />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Custom CSS
                      </label>
                      <Textarea
                        placeholder="/* Custom CSS for this page */"
                        rows={6}
                        className="font-mono text-sm"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        {getPreviewIcon()}
                        <span className="ml-2">Live Preview</span>
                        <Badge className="ml-2 capitalize">{previewMode}</Badge>
                      </CardTitle>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Open in New Tab
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className={`border rounded-lg overflow-hidden bg-white ${
                      previewMode === 'desktop' ? 'w-full h-96' :
                      previewMode === 'tablet' ? 'w-3/4 h-96 mx-auto' :
                      'w-80 h-96 mx-auto'
                    }`}>
                      <div className="w-full h-full bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
                        <div className="text-center">
                          <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-700 mb-2">
                            {currentPage?.name} Preview
                          </h3>
                          <p className="text-sm text-gray-500">
                            {previewMode.charAt(0).toUpperCase() + previewMode.slice(1)} view
                          </p>
                          <div className="mt-4 space-y-2">
                            {currentSections.map((section) => (
                              <div key={section.id} className="p-2 bg-white/50 rounded text-xs">
                                {section.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Button variant="outline" className="justify-start">
              <Home className="w-4 h-4 mr-2" />
              Edit Homepage
            </Button>
            <Button variant="outline" className="justify-start">
              <Palette className="w-4 h-4 mr-2" />
              Theme Settings
            </Button>
            <Button variant="outline" className="justify-start">
              <ImageIcon className="w-4 h-4 mr-2" />
              Media Library
            </Button>
            <Button variant="outline" className="justify-start">
              <Code className="w-4 h-4 mr-2" />
              Custom Code
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
