'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/cms/context/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Settings, 
  Save, 
  Globe, 
  Palette, 
  Mail, 
  Shield, 
  Database,
  Bell,
  Users,
  FileText,
  Image,
  Link,
  Twitter,
  Facebook,
  Instagram,
  Youtube
} from 'lucide-react'

interface SettingsData {
  siteName: string
  siteDescription: string
  logoLight: string
  logoDark: string
  brandColors: {
    primary: string
    secondary: string
  }
  defaultSEO: {
    title: string
    description: string
    keywords: string
    ogImage: string
  }
  analytics: {
    localStorageKey: string
    endpointEnabled: boolean
    endpoint: string
  }
  contact: {
    email: string
    phone: string
    address: string
  }
  social: {
    twitter: string
    facebook: string
    instagram: string
    youtube: string
  }
  features: {
    registrationEnabled: boolean
    commentsEnabled: boolean
    ratingsEnabled: boolean
    certificatesEnabled: boolean
  }
}

export default function SettingsPage() {
  const { user } = useAuth()
  const [settings, setSettings] = useState<SettingsData>({
    siteName: 'Shikshanam',
    siteDescription: 'Ancient wisdom for modern living',
    logoLight: '/assets/logo-light.svg',
    logoDark: '/assets/logo-dark.svg',
    brandColors: {
      primary: '#ea580c',
      secondary: '#f59e0b',
    },
    defaultSEO: {
      title: 'Shikshanam - Ancient Wisdom for Modern Living',
      description: 'Learn Sanskrit, philosophy, and spiritual practices through comprehensive courses and guided learning.',
      keywords: 'sanskrit, philosophy, spirituality, vedanta, yoga, meditation',
      ogImage: '/assets/og-image.jpg',
    },
    analytics: {
      localStorageKey: 'analytics_queue_v1',
      endpointEnabled: true,
      endpoint: '/api/analytics/collect',
    },
    contact: {
      email: 'contact@shikshanam.com',
      phone: '',
      address: '',
    },
    social: {
      twitter: '',
      facebook: '',
      instagram: '',
      youtube: '',
    },
    features: {
      registrationEnabled: true,
      commentsEnabled: true,
      ratingsEnabled: true,
      certificatesEnabled: true,
    },
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('cmsAccessToken')
      const response = await fetch('/api/cms/settings', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setSettings(data)
      } else {
        console.error('Failed to fetch settings')
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveSettings = async () => {
    try {
      setSaving(true)
      const token = localStorage.getItem('cmsAccessToken')
      const response = await fetch('/api/cms/settings', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      })

      if (response.ok) {
        console.log('Settings saved successfully')
        // Show success message
      } else {
        console.error('Failed to save settings')
      }
    } catch (error) {
      console.error('Error saving settings:', error)
    } finally {
      setSaving(false)
    }
  }

  const updateSettings = (section: keyof SettingsData, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [field]: value
      }
    }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Configure your CMS and website settings</p>
        </div>
        <Button 
          className="bg-orange-600 hover:bg-orange-700"
          onClick={saveSettings}
          disabled={saving}
        >
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                General Settings
              </CardTitle>
              <CardDescription>
                Basic information about your website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) => updateSettings('siteName', 'siteName', e.target.value)}
                  placeholder="Your website name"
                />
              </div>
              <div>
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => updateSettings('siteDescription', 'siteDescription', e.target.value)}
                  placeholder="Brief description of your website"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="logoLight">Light Logo URL</Label>
                  <Input
                    id="logoLight"
                    value={settings.logoLight}
                    onChange={(e) => updateSettings('logoLight', 'logoLight', e.target.value)}
                    placeholder="/assets/logo-light.svg"
                  />
                </div>
                <div>
                  <Label htmlFor="logoDark">Dark Logo URL</Label>
                  <Input
                    id="logoDark"
                    value={settings.logoDark}
                    onChange={(e) => updateSettings('logoDark', 'logoDark', e.target.value)}
                    placeholder="/assets/logo-dark.svg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="w-5 h-5 mr-2" />
                Analytics Settings
              </CardTitle>
              <CardDescription>
                Configure analytics and tracking
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="analyticsKey">Analytics Storage Key</Label>
                <Input
                  id="analyticsKey"
                  value={settings.analytics.localStorageKey}
                  onChange={(e) => updateSettings('analytics', 'localStorageKey', e.target.value)}
                  placeholder="analytics_queue_v1"
                />
              </div>
              <div>
                <Label htmlFor="analyticsEndpoint">Analytics Endpoint</Label>
                <Input
                  id="analyticsEndpoint"
                  value={settings.analytics.endpoint}
                  onChange={(e) => updateSettings('analytics', 'endpoint', e.target.value)}
                  placeholder="/api/analytics/collect"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="analyticsEnabled"
                  checked={settings.analytics.endpointEnabled}
                  onCheckedChange={(checked) => updateSettings('analytics', 'endpointEnabled', checked)}
                />
                <Label htmlFor="analyticsEnabled">Enable Analytics Endpoint</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="w-5 h-5 mr-2" />
                Brand Colors
              </CardTitle>
              <CardDescription>
                Customize your brand colors
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="primaryColor"
                      value={settings.brandColors.primary}
                      onChange={(e) => updateSettings('brandColors', 'primary', e.target.value)}
                      placeholder="#ea580c"
                    />
                    <div 
                      className="w-10 h-10 rounded border"
                      style={{ backgroundColor: settings.brandColors.primary }}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="secondaryColor"
                      value={settings.brandColors.secondary}
                      onChange={(e) => updateSettings('brandColors', 'secondary', e.target.value)}
                      placeholder="#f59e0b"
                    />
                    <div 
                      className="w-10 h-10 rounded border"
                      style={{ backgroundColor: settings.brandColors.secondary }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO Settings */}
        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Default SEO Settings
              </CardTitle>
              <CardDescription>
                Default SEO settings for your website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="seoTitle">Default SEO Title</Label>
                <Input
                  id="seoTitle"
                  value={settings.defaultSEO.title}
                  onChange={(e) => updateSettings('defaultSEO', 'title', e.target.value)}
                  placeholder="Your website title"
                />
              </div>
              <div>
                <Label htmlFor="seoDescription">Default SEO Description</Label>
                <Textarea
                  id="seoDescription"
                  value={settings.defaultSEO.description}
                  onChange={(e) => updateSettings('defaultSEO', 'description', e.target.value)}
                  placeholder="Your website description"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="seoKeywords">Default Keywords</Label>
                <Input
                  id="seoKeywords"
                  value={settings.defaultSEO.keywords}
                  onChange={(e) => updateSettings('defaultSEO', 'keywords', e.target.value)}
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>
              <div>
                <Label htmlFor="ogImage">Default OG Image</Label>
                <Input
                  id="ogImage"
                  value={settings.defaultSEO.ogImage}
                  onChange={(e) => updateSettings('defaultSEO', 'ogImage', e.target.value)}
                  placeholder="/assets/og-image.jpg"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Settings */}
        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                Contact Information
              </CardTitle>
              <CardDescription>
                Your contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="contactEmail">Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={settings.contact.email}
                  onChange={(e) => updateSettings('contact', 'email', e.target.value)}
                  placeholder="contact@example.com"
                />
              </div>
              <div>
                <Label htmlFor="contactPhone">Phone</Label>
                <Input
                  id="contactPhone"
                  value={settings.contact.phone}
                  onChange={(e) => updateSettings('contact', 'phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <Label htmlFor="contactAddress">Address</Label>
                <Textarea
                  id="contactAddress"
                  value={settings.contact.address}
                  onChange={(e) => updateSettings('contact', 'address', e.target.value)}
                  placeholder="Your business address"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Settings */}
        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Link className="w-5 h-5 mr-2" />
                Social Media Links
              </CardTitle>
              <CardDescription>
                Your social media profiles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="twitter" className="flex items-center">
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                  </Label>
                  <Input
                    id="twitter"
                    value={settings.social.twitter}
                    onChange={(e) => updateSettings('social', 'twitter', e.target.value)}
                    placeholder="https://twitter.com/username"
                  />
                </div>
                <div>
                  <Label htmlFor="facebook" className="flex items-center">
                    <Facebook className="w-4 h-4 mr-2" />
                    Facebook
                  </Label>
                  <Input
                    id="facebook"
                    value={settings.social.facebook}
                    onChange={(e) => updateSettings('social', 'facebook', e.target.value)}
                    placeholder="https://facebook.com/username"
                  />
                </div>
                <div>
                  <Label htmlFor="instagram" className="flex items-center">
                    <Instagram className="w-4 h-4 mr-2" />
                    Instagram
                  </Label>
                  <Input
                    id="instagram"
                    value={settings.social.instagram}
                    onChange={(e) => updateSettings('social', 'instagram', e.target.value)}
                    placeholder="https://instagram.com/username"
                  />
                </div>
                <div>
                  <Label htmlFor="youtube" className="flex items-center">
                    <Youtube className="w-4 h-4 mr-2" />
                    YouTube
                  </Label>
                  <Input
                    id="youtube"
                    value={settings.social.youtube}
                    onChange={(e) => updateSettings('social', 'youtube', e.target.value)}
                    placeholder="https://youtube.com/channel/username"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Features Settings */}
        <TabsContent value="features" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Feature Toggles
              </CardTitle>
              <CardDescription>
                Enable or disable website features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="registration">User Registration</Label>
                  <p className="text-sm text-gray-600">Allow new users to register</p>
                </div>
                <Switch
                  id="registration"
                  checked={settings.features.registrationEnabled}
                  onCheckedChange={(checked) => updateSettings('features', 'registrationEnabled', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="comments">Comments</Label>
                  <p className="text-sm text-gray-600">Enable comments on content</p>
                </div>
                <Switch
                  id="comments"
                  checked={settings.features.commentsEnabled}
                  onCheckedChange={(checked) => updateSettings('features', 'commentsEnabled', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="ratings">Ratings</Label>
                  <p className="text-sm text-gray-600">Allow users to rate content</p>
                </div>
                <Switch
                  id="ratings"
                  checked={settings.features.ratingsEnabled}
                  onCheckedChange={(checked) => updateSettings('features', 'ratingsEnabled', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="certificates">Certificates</Label>
                  <p className="text-sm text-gray-600">Issue completion certificates</p>
                </div>
                <Switch
                  id="certificates"
                  checked={settings.features.certificatesEnabled}
                  onCheckedChange={(checked) => updateSettings('features', 'certificatesEnabled', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}