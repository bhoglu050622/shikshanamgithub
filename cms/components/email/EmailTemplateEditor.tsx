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
import { 
  Mail,
  BookOpen,
  Save,
  Eye,
  Send,
  Copy,
  RefreshCw,
  Plus,
  Trash2,
  Edit,
  Settings,
  Palette,
  Type,
  Image,
  Link,
  Bold,
  Italic,
  Underline,
  List,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Code,
  FileText,
  User,
  Calendar,
  Clock,
  Tag,
  Hash,
  AtSign,
  DollarSign,
  Percent,
  Star,
  Heart,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Share2,
  Download,
  Upload,
  Search,
  Filter,
  Grid,
  List as ListIcon,
  MoreHorizontal,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Check,
  X,
  AlertCircle,
  CheckCircle,
  Info,
  HelpCircle,
  Lightbulb,
  Zap,
  Target,
  Award,
  Trophy,
  Gift,
  Bell,
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
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  LineChart,
  BarChart,
  Maximize,
  Minimize,
  RotateCw,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Focus,
  Layers,
  Layout,
  LayoutGrid,
  LayoutList,
  LayoutTemplate,
  LayoutDashboard,
} from 'lucide-react'

interface EmailTemplate {
  id: string
  name: string
  subject: string
  htmlContent: string
  textContent: string
  category: 'welcome' | 'course' | 'marketing' | 'notification' | 'transactional'
  isActive: boolean
  variables: string[]
  createdAt: Date
  updatedAt: Date
}

interface EmailVariable {
  name: string
  description: string
  example: string
  category: 'user' | 'course' | 'system' | 'custom'
}

interface EmailTemplateEditorProps {
  template?: EmailTemplate
  onSave: (template: EmailTemplate) => Promise<void>
  onPreview: (template: EmailTemplate) => Promise<void>
  onSendTest: (template: EmailTemplate, email: string) => Promise<void>
  onDuplicate?: (template: EmailTemplate) => Promise<void>
  onDelete?: (templateId: string) => Promise<void>
  showPreview?: boolean
  showVariables?: boolean
  showTestSend?: boolean
}

export function EmailTemplateEditor({
  template,
  onSave,
  onPreview,
  onSendTest,
  onDuplicate,
  onDelete,
  showPreview = true,
  showVariables = true,
  showTestSend = true
}: EmailTemplateEditorProps) {
  const [emailTemplate, setEmailTemplate] = useState<EmailTemplate>({
    id: '',
    name: '',
    subject: '',
    htmlContent: '',
    textContent: '',
    category: 'welcome',
    isActive: true,
    variables: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    ...template
  })
  
  const [activeTab, setActiveTab] = useState('content')
  const [isSaving, setIsSaving] = useState(false)
  const [isPreviewing, setIsPreviewing] = useState(false)
  const [isSendingTest, setIsSendingTest] = useState(false)
  const [testEmail, setTestEmail] = useState('')
  const [selectedVariable, setSelectedVariable] = useState<string>('')
  const [cursorPosition, setCursorPosition] = useState(0)

  const availableVariables: EmailVariable[] = [
    // User variables
    { name: '{{user_name}}', description: 'User\'s full name', example: 'John Doe', category: 'user' },
    { name: '{{user_email}}', description: 'User\'s email address', example: 'john@example.com', category: 'user' },
    { name: '{{user_first_name}}', description: 'User\'s first name', example: 'John', category: 'user' },
    { name: '{{user_last_name}}', description: 'User\'s last name', example: 'Doe', category: 'user' },
    { name: '{{user_username}}', description: 'User\'s username', example: 'johndoe', category: 'user' },
    
    // Course variables
    { name: '{{course_title}}', description: 'Course title', example: 'Introduction to Sanskrit', category: 'course' },
    { name: '{{course_description}}', description: 'Course description', example: 'Learn the basics of Sanskrit...', category: 'course' },
    { name: '{{course_instructor}}', description: 'Course instructor name', example: 'Dr. Sarah Johnson', category: 'course' },
    { name: '{{course_duration}}', description: 'Course duration', example: '4 weeks', category: 'course' },
    { name: '{{course_price}}', description: 'Course price', example: '$99.00', category: 'course' },
    { name: '{{course_url}}', description: 'Course URL', example: 'https://example.com/course/sanskrit', category: 'course' },
    
    // System variables
    { name: '{{site_name}}', description: 'Website name', example: 'Shikshanam', category: 'system' },
    { name: '{{site_url}}', description: 'Website URL', example: 'https://shikshanam.com', category: 'system' },
    { name: '{{current_date}}', description: 'Current date', example: 'January 15, 2024', category: 'system' },
    { name: '{{current_year}}', description: 'Current year', example: '2024', category: 'system' },
    { name: '{{unsubscribe_url}}', description: 'Unsubscribe URL', example: 'https://example.com/unsubscribe', category: 'system' },
    
    // Custom variables
    { name: '{{custom_message}}', description: 'Custom message', example: 'Welcome to our platform!', category: 'custom' },
    { name: '{{promo_code}}', description: 'Promotional code', example: 'SAVE20', category: 'custom' },
    { name: '{{discount_amount}}', description: 'Discount amount', example: '20%', category: 'custom' }
  ]

  const handleFieldChange = useCallback((field: keyof EmailTemplate, value: any) => {
    setEmailTemplate(prev => ({ ...prev, [field]: value }))
  }, [])

  const handleInsertVariable = (variable: string) => {
    const textarea = document.getElementById('html-content') as HTMLTextAreaElement
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const newContent = emailTemplate.htmlContent.substring(0, start) + variable + emailTemplate.htmlContent.substring(end)
      handleFieldChange('htmlContent', newContent)
      
      // Update cursor position
      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(start + variable.length, start + variable.length)
      }, 0)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await onSave(emailTemplate)
    } catch (error) {
      console.error('Failed to save email template:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handlePreview = async () => {
    setIsPreviewing(true)
    try {
      await onPreview(emailTemplate)
    } catch (error) {
      console.error('Failed to preview email template:', error)
    } finally {
      setIsPreviewing(false)
    }
  }

  const handleSendTest = async () => {
    if (!testEmail.trim()) return
    
    setIsSendingTest(true)
    try {
      await onSendTest(emailTemplate, testEmail)
    } catch (error) {
      console.error('Failed to send test email:', error)
    } finally {
      setIsSendingTest(false)
    }
  }

  const generateTextContent = () => {
    // Simple HTML to text conversion
    const textContent = emailTemplate.htmlContent
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/\s+/g, ' ')
      .trim()
    
    handleFieldChange('textContent', textContent)
  }

  const getVariableIcon = (category: string) => {
    switch (category) {
      case 'user': return User
      case 'course': return BookOpen
      case 'system': return Settings
      case 'custom': return Tag
      default: return Hash
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'user': return 'bg-blue-100 text-blue-800'
      case 'course': return 'bg-green-100 text-green-800'
      case 'system': return 'bg-purple-100 text-purple-800'
      case 'custom': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const extractVariables = (content: string): string[] => {
    const matches = content.match(/\{\{[^}]+\}\}/g)
    return matches ? [...new Set(matches)] : []
  }

  useEffect(() => {
    const variables = extractVariables(emailTemplate.htmlContent)
    handleFieldChange('variables', variables)
  }, [emailTemplate.htmlContent, handleFieldChange])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Email Template Editor</h2>
          <p className="text-gray-600">Create and customize email templates</p>
        </div>
        <div className="flex items-center gap-2">
          {showPreview && (
            <Button variant="outline" onClick={handlePreview} disabled={isPreviewing}>
              {isPreviewing ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Eye className="w-4 h-4 mr-2" />
              )}
              Preview
            </Button>
          )}
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Template'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              {showTestSend && <TabsTrigger value="test">Test</TabsTrigger>}
            </TabsList>

            {/* Content Tab */}
            <TabsContent value="content" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Email Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="template-name">Template Name</Label>
                    <Input
                      id="template-name"
                      value={emailTemplate.name}
                      onChange={(e) => handleFieldChange('name', e.target.value)}
                      placeholder="Enter template name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email-subject">Email Subject</Label>
                    <Input
                      id="email-subject"
                      value={emailTemplate.subject}
                      onChange={(e) => handleFieldChange('subject', e.target.value)}
                      placeholder="Enter email subject"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="html-content">HTML Content</Label>
                    <div className="border rounded-lg">
                      <div className="border-b p-2 flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Bold className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Italic className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Underline className="w-4 h-4" />
                        </Button>
                        <div className="w-px h-6 bg-gray-300"></div>
                        <Button variant="ghost" size="sm">
                          <List className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Quote className="w-4 h-4" />
                        </Button>
                        <div className="w-px h-6 bg-gray-300"></div>
                        <Button variant="ghost" size="sm">
                          <AlignLeft className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <AlignCenter className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <AlignRight className="w-4 h-4" />
                        </Button>
                        <div className="w-px h-6 bg-gray-300"></div>
                        <Button variant="ghost" size="sm" onClick={generateTextContent}>
                          <FileText className="w-4 h-4" />
                        </Button>
                      </div>
                      <Textarea
                        id="html-content"
                        value={emailTemplate.htmlContent}
                        onChange={(e) => handleFieldChange('htmlContent', e.target.value)}
                        placeholder="Enter HTML content for your email..."
                        rows={12}
                        className="border-0 resize-none focus:ring-0"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="text-content">Plain Text Content</Label>
                    <Textarea
                      id="text-content"
                      value={emailTemplate.textContent}
                      onChange={(e) => handleFieldChange('textContent', e.target.value)}
                      placeholder="Enter plain text version of your email..."
                      rows={6}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Template Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="template-category">Category</Label>
                    <Select
                      value={emailTemplate.category}
                      onValueChange={(value: any) => handleFieldChange('category', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="welcome">Welcome</SelectItem>
                        <SelectItem value="course">Course</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="notification">Notification</SelectItem>
                        <SelectItem value="transactional">Transactional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="is-active"
                      checked={emailTemplate.isActive}
                      onCheckedChange={(checked) => handleFieldChange('isActive', !!checked)}
                    />
                    <Label htmlFor="is-active">Active Template</Label>
                  </div>

                  <div className="space-y-2">
                    <Label>Used Variables</Label>
                    <div className="flex flex-wrap gap-2">
                      {emailTemplate.variables.map((variable) => (
                        <Badge key={variable} variant="secondary">
                          {variable}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Test Tab */}
            {showTestSend && (
              <TabsContent value="test" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Send Test Email</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="test-email">Test Email Address</Label>
                      <Input
                        id="test-email"
                        type="email"
                        value={testEmail}
                        onChange={(e) => setTestEmail(e.target.value)}
                        placeholder="Enter email address to send test to"
                      />
                    </div>
                    <Button
                      onClick={handleSendTest}
                      disabled={!testEmail.trim() || isSendingTest}
                    >
                      {isSendingTest ? (
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4 mr-2" />
                      )}
                      Send Test Email
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>

        {/* Variables Sidebar */}
        {showVariables && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Available Variables</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['user', 'course', 'system', 'custom'].map((category) => (
                    <div key={category}>
                      <h4 className="text-sm font-medium text-gray-700 mb-2 capitalize">
                        {category} Variables
                      </h4>
                      <div className="space-y-1">
                        {availableVariables
                          .filter(v => v.category === category)
                          .map((variable) => {
                            const VariableIcon = getVariableIcon(variable.category)
                            return (
                              <div
                                key={variable.name}
                                className="p-2 border rounded cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() => handleInsertVariable(variable.name)}
                              >
                                <div className="flex items-center gap-2">
                                  <VariableIcon className="w-3 h-3 text-gray-500" />
                                  <code className="text-xs font-mono">{variable.name}</code>
                                </div>
                                <p className="text-xs text-gray-600 mt-1">{variable.description}</p>
                              </div>
                            )
                          })}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Template Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Template Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {onDuplicate && (
                  <Button variant="outline" className="w-full" onClick={() => onDuplicate(emailTemplate)}>
                    <Copy className="w-4 h-4 mr-2" />
                    Duplicate Template
                  </Button>
                )}
                {onDelete && (
                  <Button variant="outline" className="w-full text-red-600 hover:text-red-700" onClick={() => onDelete(emailTemplate.id)}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Template
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
