'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { 
  Search,
  Globe,
  Eye,
  Target,
  TrendingUp,
  BarChart3,
  CheckCircle,
  AlertCircle,
  XCircle,
  Lightbulb,
  Copy,
  RefreshCw,
  ExternalLink,
  Settings,
  Image,
  Link,
  Hash,
  FileText,
  Calendar,
  User,
  Tag,
  Plus,
  Minus,
  Edit,
  Save,
  Download,
  Upload,
  Zap,
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Share2,
  Bookmark,
  Heart,
  Clock,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Github,
  Rss,
  Bot,
  Shield,
  Lock,
  Unlock,
  Key,
  Database,
  Server,
  Cloud,
  Wifi,
  WifiOff,
  Activity,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  Minus as MinusIcon,
  Maximize,
  Minimize,
  RotateCw,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Focus,
  Layers,
  Grid,
  List,
  Filter,
  SortAsc,
  SortDesc,
  Search as SearchIcon,
  X,
  Check,
  AlertTriangle,
  Info,
  HelpCircle,
  BookOpen,
  File,
  Folder,
  Archive,
  Trash2,
  Move,
  Grip,
  GripVertical,
  MoreHorizontal,
  MoreVertical,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  ArrowUp as ArrowUpIcon,
  ArrowDown as ArrowDownIcon,
  Home,
  Menu,
  Sidebar,
  PanelLeft,
  PanelRight,
  PanelTop,
  PanelBottom,
  Layout,
  LayoutGrid,
  LayoutList,
  LayoutTemplate,
  LayoutDashboard,
} from 'lucide-react'

interface SEOData {
  title: string
  metaDescription: string
  keywords: string[]
  canonicalUrl: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogType?: string
  twitterCard?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  twitterSite?: string
  twitterCreator?: string
  structuredData?: any
  robots?: string
  sitemapPriority?: number
  sitemapChangeFreq?: string
  lastModified?: Date
  author?: string
  publishedDate?: Date
  modifiedDate?: Date
  category?: string
  tags?: string[]
  language?: string
  locale?: string
  alternateLanguages?: Array<{ lang: string; url: string }>
  breadcrumbs?: Array<{ name: string; url: string }>
  faqSchema?: Array<{ question: string; answer: string }>
  reviewSchema?: {
    rating: number
    reviewCount: number
    bestRating: number
    worstRating: number
  }
  productSchema?: {
    name: string
    description: string
    image: string
    price: number
    currency: string
    availability: string
    brand: string
    sku: string
  }
  courseSchema?: {
    name: string
    description: string
    provider: string
    courseMode: string
    educationalLevel: string
    teaches: string[]
    about: string
    inLanguage: string
  }
}

interface SEOAnalysis {
  score: number
  issues: Array<{
    type: 'error' | 'warning' | 'info'
    message: string
    suggestion?: string
    field?: string
  }>
  recommendations: Array<{
    priority: 'high' | 'medium' | 'low'
    title: string
    description: string
    action?: string
  }>
  readability: {
    score: number
    gradeLevel: string
    wordCount: number
    sentenceCount: number
    paragraphCount: number
    averageWordsPerSentence: number
    averageSyllablesPerWord: number
  }
  keywordDensity: Array<{
    keyword: string
    density: number
    count: number
  }>
  socialPreview: {
    title: string
    description: string
    image?: string
    url: string
  }
}

interface SEOManagerProps {
  contentType: string
  contentId: string
  initialData?: SEOData
  content?: string
  onSave: (seoData: SEOData) => Promise<void>
  onAnalyze?: (seoData: SEOData, content: string) => Promise<SEOAnalysis>
  showAnalysis?: boolean
  showSocialPreview?: boolean
  showStructuredData?: boolean
  showAdvanced?: boolean
}

export function SEOManager({
  contentType,
  contentId,
  initialData = {
    title: '',
    metaDescription: '',
    keywords: [],
    canonicalUrl: ''
  },
  content = '',
  onSave,
  onAnalyze,
  showAnalysis = true,
  showSocialPreview = true,
  showStructuredData = true,
  showAdvanced = true
}: SEOManagerProps) {
  const [seoData, setSeoData] = useState<SEOData>({
    language: 'en',
    locale: 'en_US',
    ...initialData
  })
  
  const [analysis, setAnalysis] = useState<SEOAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('basic')
  const [newKeyword, setNewKeyword] = useState('')
  const [newFaqQuestion, setNewFaqQuestion] = useState('')
  const [newFaqAnswer, setNewFaqAnswer] = useState('')

  const handleFieldChange = useCallback((field: keyof SEOData, value: any) => {
    setSeoData(prev => ({ ...prev, [field]: value }))
  }, [])

  const handleAddKeyword = () => {
    if (newKeyword.trim() && !seoData.keywords.includes(newKeyword.trim())) {
      setSeoData(prev => ({
        ...prev,
        keywords: [...prev.keywords, newKeyword.trim()]
      }))
      setNewKeyword('')
    }
  }

  const handleRemoveKeyword = (keyword: string) => {
    setSeoData(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }))
  }

  const handleAddFaq = () => {
    if (newFaqQuestion.trim() && newFaqAnswer.trim()) {
      setSeoData(prev => ({
        ...prev,
        faqSchema: [
          ...(prev.faqSchema || []),
          { question: newFaqQuestion.trim(), answer: newFaqAnswer.trim() }
        ]
      }))
      setNewFaqQuestion('')
      setNewFaqAnswer('')
    }
  }

  const handleRemoveFaq = (index: number) => {
    setSeoData(prev => ({
      ...prev,
      faqSchema: prev.faqSchema?.filter((_, i) => i !== index) || []
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await onSave(seoData)
    } catch (error) {
      console.error('Failed to save SEO data:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleAnalyze = async () => {
    if (!onAnalyze) return
    
    setIsAnalyzing(true)
    try {
      const analysisResult = await onAnalyze(seoData, content)
      setAnalysis(analysisResult)
    } catch (error) {
      console.error('Failed to analyze SEO:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100'
    if (score >= 60) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'error': return XCircle
      case 'warning': return AlertTriangle
      case 'info': return Info
      default: return HelpCircle
    }
  }

  const getIssueColor = (type: string) => {
    switch (type) {
      case 'error': return 'text-red-600'
      case 'warning': return 'text-yellow-600'
      case 'info': return 'text-blue-600'
      default: return 'text-gray-600'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const generateCanonicalUrl = () => {
    const baseUrl = window.location.origin
    const slug = seoData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    return `${baseUrl}/${contentType}/${slug}`
  }

  const generateMetaDescription = () => {
    if (content.length > 0) {
      return content.substring(0, 160).replace(/<[^>]*>/g, '').trim()
    }
    return seoData.metaDescription
  }

  const generateKeywords = () => {
    if (content.length > 0) {
      const words = content.toLowerCase().replace(/<[^>]*>/g, '').split(/\W+/)
      const wordCount: Record<string, number> = {}
      
      words.forEach(word => {
        if (word.length > 3) {
          wordCount[word] = (wordCount[word] || 0) + 1
        }
      })
      
      return Object.entries(wordCount)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([word]) => word)
    }
    return seoData.keywords
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">SEO & Metadata</h2>
          <p className="text-gray-600">Optimize your content for search engines</p>
        </div>
        <div className="flex items-center gap-2">
          {showAnalysis && onAnalyze && (
            <Button
              variant="outline"
              onClick={handleAnalyze}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <BarChart3 className="w-4 h-4 mr-2" />
              )}
              Analyze SEO
            </Button>
          )}
          <Button
            onClick={handleSave}
            disabled={isSaving}
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save SEO Data'}
          </Button>
        </div>
      </div>

      {/* SEO Score */}
      {analysis && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${getScoreBgColor(analysis.score)}`}>
                  <span className={`text-2xl font-bold ${getScoreColor(analysis.score)}`}>
                    {analysis.score}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">SEO Score</h3>
                  <p className="text-sm text-gray-600">
                    {analysis.score >= 80 ? 'Excellent' : 
                     analysis.score >= 60 ? 'Good' : 
                     analysis.score >= 40 ? 'Needs Improvement' : 'Poor'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Issues Found</div>
                <div className="text-2xl font-bold text-red-600">
                  {analysis.issues.filter(i => i.type === 'error').length}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="basic">Basic SEO</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          {showStructuredData && <TabsTrigger value="structured">Structured Data</TabsTrigger>}
          {showAdvanced && <TabsTrigger value="advanced">Advanced</TabsTrigger>}
          {showAnalysis && analysis && <TabsTrigger value="analysis">Analysis</TabsTrigger>}
        </TabsList>

        {/* Basic SEO */}
        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="seo-title">SEO Title</Label>
                <Input
                  id="seo-title"
                  value={seoData.title}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                  placeholder="Enter SEO optimized title"
                  maxLength={60}
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Recommended: 50-60 characters</span>
                  <span className={seoData.title.length > 60 ? 'text-red-600' : ''}>
                    {seoData.title.length}/60
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta-description">Meta Description</Label>
                <Textarea
                  id="meta-description"
                  value={seoData.metaDescription}
                  onChange={(e) => handleFieldChange('metaDescription', e.target.value)}
                  placeholder="Brief description for search engines"
                  rows={3}
                  maxLength={160}
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Recommended: 150-160 characters</span>
                  <span className={seoData.metaDescription.length > 160 ? 'text-red-600' : ''}>
                    {seoData.metaDescription.length}/160
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="canonical-url">Canonical URL</Label>
                <Input
                  id="canonical-url"
                  value={seoData.canonicalUrl}
                  onChange={(e) => handleFieldChange('canonicalUrl', e.target.value)}
                  placeholder="https://example.com/page"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleFieldChange('canonicalUrl', generateCanonicalUrl())}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Generate from title
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Keywords</Label>
                <div className="flex gap-2">
                  <Input
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    placeholder="Add keyword"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddKeyword()}
                  />
                  <Button onClick={handleAddKeyword} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {seoData.keywords.map((keyword) => (
                    <Badge key={keyword} variant="secondary" className="flex items-center gap-1">
                      {keyword}
                      <button
                        onClick={() => handleRemoveKeyword(keyword)}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleFieldChange('keywords', generateKeywords())}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Auto-generate from content
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Media */}
        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Open Graph (Facebook)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="og-title">OG Title</Label>
                <Input
                  id="og-title"
                  value={seoData.ogTitle || ''}
                  onChange={(e) => handleFieldChange('ogTitle', e.target.value)}
                  placeholder="Title for social media sharing"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="og-description">OG Description</Label>
                <Textarea
                  id="og-description"
                  value={seoData.ogDescription || ''}
                  onChange={(e) => handleFieldChange('ogDescription', e.target.value)}
                  placeholder="Description for social media sharing"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="og-image">OG Image</Label>
                <Input
                  id="og-image"
                  value={seoData.ogImage || ''}
                  onChange={(e) => handleFieldChange('ogImage', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="og-type">OG Type</Label>
                <Select
                  value={seoData.ogType || 'article'}
                  onValueChange={(value) => handleFieldChange('ogType', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="article">Article</SelectItem>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="book">Book</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="music">Music</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Twitter Cards</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="twitter-card">Twitter Card Type</Label>
                <Select
                  value={seoData.twitterCard || 'summary_large_image'}
                  onValueChange={(value) => handleFieldChange('twitterCard', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="summary">Summary</SelectItem>
                    <SelectItem value="summary_large_image">Summary Large Image</SelectItem>
                    <SelectItem value="app">App</SelectItem>
                    <SelectItem value="player">Player</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter-title">Twitter Title</Label>
                <Input
                  id="twitter-title"
                  value={seoData.twitterTitle || ''}
                  onChange={(e) => handleFieldChange('twitterTitle', e.target.value)}
                  placeholder="Title for Twitter sharing"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter-description">Twitter Description</Label>
                <Textarea
                  id="twitter-description"
                  value={seoData.twitterDescription || ''}
                  onChange={(e) => handleFieldChange('twitterDescription', e.target.value)}
                  placeholder="Description for Twitter sharing"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter-image">Twitter Image</Label>
                <Input
                  id="twitter-image"
                  value={seoData.twitterImage || ''}
                  onChange={(e) => handleFieldChange('twitterImage', e.target.value)}
                  placeholder="https://example.com/twitter-image.jpg"
                />
              </div>
            </CardContent>
          </Card>

          {/* Social Preview */}
          {showSocialPreview && (
            <Card>
              <CardHeader>
                <CardTitle>Social Media Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Facebook Preview */}
                  <div className="border rounded-lg p-4 bg-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Facebook className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">Facebook</span>
                    </div>
                    <div className="bg-gray-100 rounded p-3">
                      {seoData.ogImage && (
                        <img
                          src={seoData.ogImage}
                          alt="OG Image"
                          className="w-full h-48 object-cover rounded mb-3"
                        />
                      )}
                      <div className="text-sm">
                        <div className="font-semibold text-blue-600 mb-1">
                          {seoData.ogTitle || seoData.title || 'Your Title'}
                        </div>
                        <div className="text-gray-600 mb-2">
                          {seoData.ogDescription || seoData.metaDescription || 'Your description'}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {seoData.canonicalUrl || 'your-domain.com'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Twitter Preview */}
                  <div className="border rounded-lg p-4 bg-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Twitter className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-medium">Twitter</span>
                    </div>
                    <div className="bg-gray-100 rounded p-3">
                      {seoData.twitterImage && (
                        <img
                          src={seoData.twitterImage}
                          alt="Twitter Image"
                          className="w-full h-48 object-cover rounded mb-3"
                        />
                      )}
                      <div className="text-sm">
                        <div className="font-semibold mb-1">
                          {seoData.twitterTitle || seoData.title || 'Your Title'}
                        </div>
                        <div className="text-gray-600 mb-2">
                          {seoData.twitterDescription || seoData.metaDescription || 'Your description'}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {seoData.canonicalUrl || 'your-domain.com'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Structured Data */}
        {showStructuredData && (
          <TabsContent value="structured" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>FAQ Schema</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="faq-question">Question</Label>
                  <Input
                    id="faq-question"
                    value={newFaqQuestion}
                    onChange={(e) => setNewFaqQuestion(e.target.value)}
                    placeholder="Enter a frequently asked question"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="faq-answer">Answer</Label>
                  <Textarea
                    id="faq-answer"
                    value={newFaqAnswer}
                    onChange={(e) => setNewFaqAnswer(e.target.value)}
                    placeholder="Enter the answer"
                    rows={3}
                  />
                </div>
                <Button onClick={handleAddFaq} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add FAQ
                </Button>
                
                {seoData.faqSchema && seoData.faqSchema.length > 0 && (
                  <div className="space-y-3 mt-4">
                    {seoData.faqSchema.map((faq, index) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{faq.question}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveFaq(index)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {contentType === 'course' && (
              <Card>
                <CardHeader>
                  <CardTitle>Course Schema</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="course-name">Course Name</Label>
                    <Input
                      id="course-name"
                      value={seoData.courseSchema?.name || ''}
                      onChange={(e) => handleFieldChange('courseSchema', {
                        ...seoData.courseSchema,
                        name: e.target.value
                      })}
                      placeholder="Course name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="course-description">Course Description</Label>
                    <Textarea
                      id="course-description"
                      value={seoData.courseSchema?.description || ''}
                      onChange={(e) => handleFieldChange('courseSchema', {
                        ...seoData.courseSchema,
                        description: e.target.value
                      })}
                      placeholder="Course description"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="course-provider">Provider</Label>
                    <Input
                      id="course-provider"
                      value={seoData.courseSchema?.provider || ''}
                      onChange={(e) => handleFieldChange('courseSchema', {
                        ...seoData.courseSchema,
                        provider: e.target.value
                      })}
                      placeholder="Course provider"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        )}

        {/* Advanced */}
        {showAdvanced && (
          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="robots">Robots</Label>
                  <Select
                    value={seoData.robots || 'index, follow'}
                    onValueChange={(value) => handleFieldChange('robots', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="index, follow">Index, Follow</SelectItem>
                      <SelectItem value="index, nofollow">Index, No Follow</SelectItem>
                      <SelectItem value="noindex, follow">No Index, Follow</SelectItem>
                      <SelectItem value="noindex, nofollow">No Index, No Follow</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sitemap-priority">Sitemap Priority</Label>
                  <Select
                    value={seoData.sitemapPriority?.toString() || '0.5'}
                    onValueChange={(value) => handleFieldChange('sitemapPriority', parseFloat(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1.0">1.0 (Highest)</SelectItem>
                      <SelectItem value="0.8">0.8 (High)</SelectItem>
                      <SelectItem value="0.5">0.5 (Medium)</SelectItem>
                      <SelectItem value="0.3">0.3 (Low)</SelectItem>
                      <SelectItem value="0.1">0.1 (Lowest)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sitemap-change-freq">Sitemap Change Frequency</Label>
                  <Select
                    value={seoData.sitemapChangeFreq || 'monthly'}
                    onValueChange={(value) => handleFieldChange('sitemapChangeFreq', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="always">Always</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Analysis */}
        {showAnalysis && analysis && (
          <TabsContent value="analysis" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>SEO Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium">Issues Found</h4>
                  {analysis.issues.map((issue, index) => {
                    const IssueIcon = getIssueIcon(issue.type)
                    return (
                      <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                        <IssueIcon className={`w-5 h-5 mt-0.5 ${getIssueColor(issue.type)}`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{issue.message}</p>
                          {issue.suggestion && (
                            <p className="text-sm text-gray-600 mt-1">{issue.suggestion}</p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {analysis.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                    <Badge className={getPriorityColor(rec.priority)}>
                      {rec.priority}
                    </Badge>
                    <div className="flex-1">
                      <h4 className="font-medium">{rec.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Readability Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{analysis.readability.score}</div>
                    <div className="text-sm text-gray-600">Readability Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{analysis.readability.gradeLevel}</div>
                    <div className="text-sm text-gray-600">Grade Level</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{analysis.readability.wordCount}</div>
                    <div className="text-sm text-gray-600">Word Count</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{analysis.readability.sentenceCount}</div>
                    <div className="text-sm text-gray-600">Sentences</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
