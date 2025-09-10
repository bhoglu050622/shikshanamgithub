'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Plus,
  BookOpen,
  FileText,
  Image,
  BarChart3,
  Users,
  User,
  Settings,
  Eye,
  Send,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Activity,
  Zap,
  Target,
  Award,
  Globe,
  Lock,
  Unlock,
  Star,
  Heart,
  MessageSquare,
  Share2,
  Download,
  Upload,
  Edit,
  Trash2,
  Copy,
  Move,
  MoreHorizontal,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Grid,
  List,
  RefreshCw,
  Bell,
  Mail,
  Phone,
  MapPin,
  Link,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Minus,
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
import { ContentCreationWizard } from './wizard/ContentCreationWizard'
import { VisualEditor } from './editor/VisualEditor'
import { MediaManager } from './media/MediaManager'
import { PreviewSystem } from './preview/PreviewSystem'
import { PublishingWorkflow } from './publishing/PublishingWorkflow'
import { SEOManager } from './seo/SEOManager'
import { ContentAnalytics } from './analytics/ContentAnalytics'
import { EmailTemplateEditor } from './email/EmailTemplateEditor'
import { contentTemplates } from '@/cms/lib/templates/content-templates'

interface CMSMainPageProps {
  userRole: 'content_editor' | 'publisher' | 'instructor' | 'support_moderator' | 'admin'
  initialTab?: string
}

export function CMSMainPage({ userRole, initialTab = 'dashboard' }: CMSMainPageProps) {
  const [activeTab, setActiveTab] = useState(initialTab)
  const [showContentWizard, setShowContentWizard] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [selectedContent, setSelectedContent] = useState<any>(null)

  const canCreate = ['content_editor', 'publisher', 'instructor', 'admin'].includes(userRole)
  const canPublish = ['publisher', 'admin'].includes(userRole)
  const canManageUsers = ['admin'].includes(userRole)
  const canViewAnalytics = ['publisher', 'admin'].includes(userRole)

  const handleCreateContent = (template: any, initialData: any) => {
    setSelectedTemplate(template.id)
    setSelectedContent(initialData)
    setShowContentWizard(false)
    setActiveTab('editor')
  }

  const handleSaveContent = async (data: any): Promise<any> => {
    console.log('Saving content:', data)
    // Implement save logic and return saved content
    return {
      id: data.id || 'new-id',
      ...data,
      updatedAt: new Date()
    }
  }

  const handlePreviewContent = async (data: any): Promise<string> => {
    console.log('Previewing content:', data)
    // Implement preview logic and return preview URL
    return `/preview/${data.id || 'new'}`
  }

  const handlePublishContent = async (data: any) => {
    console.log('Publishing content:', data)
    // Implement publish logic
  }

  const handlePublishRevision = async (revisionId: string) => {
    console.log('Publishing content revision:', revisionId)
    // Implement publish logic
  }

  const handleScheduleContent = async (data: any, scheduleDate: Date) => {
    console.log('Scheduling content:', data, scheduleDate)
    // Implement schedule logic
  }

  const handleSubmitForReview = async (data: any) => {
    console.log('Submitting for review:', data)
    // Implement review submission logic
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800'
      case 'publisher': return 'bg-purple-100 text-purple-800'
      case 'instructor': return 'bg-blue-100 text-blue-800'
      case 'content_editor': return 'bg-green-100 text-green-800'
      case 'support_moderator': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return Settings
      case 'publisher': return Send
      case 'instructor': return BookOpen
      case 'content_editor': return Edit
      case 'support_moderator': return Users
      default: return User
    }
  }

  const RoleIcon = getRoleIcon(userRole)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Management System</h1>
          <p className="text-gray-600">Create, edit, and manage your content with ease</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={getRoleBadgeColor(userRole)}>
            <RoleIcon className="w-3 h-3 mr-1" />
            {userRole.replace('_', ' ').toUpperCase()}
          </Badge>
          {canCreate && (
            <Button onClick={() => setShowContentWizard(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Content
            </Button>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Content</p>
                <p className="text-2xl font-bold text-gray-900">247</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold text-gray-900">189</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Drafts</p>
                <p className="text-2xl font-bold text-gray-900">34</p>
              </div>
              <Edit className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="workflow">Workflow</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          {canViewAnalytics && <TabsTrigger value="analytics">Analytics</TabsTrigger>}
          <TabsTrigger value="email">Email</TabsTrigger>
        </TabsList>

        {/* Dashboard */}
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Content */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: 'Introduction to Sanskrit', type: 'course', status: 'published', updated: '2 hours ago' },
                    { title: 'Yoga Basics Blog Post', type: 'blog', status: 'draft', updated: '1 day ago' },
                    { title: 'Meditation Techniques', type: 'lesson', status: 'pending_review', updated: '2 days ago' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.type} • {item.updated}</p>
                      </div>
                      <Badge variant={
                        item.status === 'published' ? 'default' :
                        item.status === 'draft' ? 'secondary' :
                        'outline'
                      }>
                        {item.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {canCreate && (
                    <>
                      <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" onClick={() => setShowContentWizard(true)}>
                        <BookOpen className="w-6 h-6" />
                        <span>Create Course</span>
                      </Button>
                      <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" onClick={() => setShowContentWizard(true)}>
                        <FileText className="w-6 h-6" />
                        <span>Write Blog Post</span>
                      </Button>
                    </>
                  )}
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" onClick={() => setActiveTab('media')}>
                    <Image className="w-6 h-6" />
                    <span>Upload Media</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" onClick={() => setActiveTab('workflow')}>
                    <Send className="w-6 h-6" />
                    <span>Review Content</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content Templates */}
          <Card>
            <CardHeader>
              <CardTitle>Content Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {contentTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="p-4 border rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => canCreate && setShowContentWizard(true)}
                  >
                    <div className={`w-12 h-12 rounded-lg ${template.color} flex items-center justify-center mb-3`}>
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-medium mb-1">{template.name}</h3>
                    <p className="text-sm text-gray-600">{template.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Editor */}
        <TabsContent value="editor">
          {selectedTemplate ? (
            <VisualEditor
              templateId={selectedTemplate}
              initialData={selectedContent}
              onSave={handleSaveContent}
              onPreview={handlePreviewContent}
              onPublish={canPublish ? handlePublishContent : undefined}
              onSchedule={canPublish ? handleScheduleContent : undefined}
              onSubmitReview={handleSubmitForReview}
              showPublishingOptions={canPublish}
            />
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Content Selected</h3>
                <p className="text-gray-600 mb-4">Create new content or select existing content to edit</p>
                {canCreate && (
                  <Button onClick={() => setShowContentWizard(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Content
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Media */}
        <TabsContent value="media">
          <MediaManager
            onSelect={(file) => console.log('Selected file:', file)}
            onInsert={(file) => console.log('Insert file:', file)}
            showUpload={canCreate}
            showLibrary={true}
            showProcessing={true}
          />
        </TabsContent>

        {/* Preview */}
        <TabsContent value="preview">
          <PreviewSystem
            contentType="course"
            contentId="1"
            currentData={selectedContent || {}}
            revisions={[]}
            onSaveRevision={handleSaveContent}
            onPublishRevision={handlePublishRevision}
            onRollbackToRevision={async (revisionId: string) => {
              console.log('Rolling back to revision:', revisionId)
              // Implement rollback logic
            }}
            onGeneratePreview={() => Promise.resolve({ token: 'test', url: '/preview', expiresAt: new Date() })}
            onAddReviewComment={() => Promise.resolve()}
            canPublish={canPublish}
            canReview={canPublish}
            canRollback={canPublish}
          />
        </TabsContent>

        {/* Workflow */}
        <TabsContent value="workflow">
          <PublishingWorkflow
            items={[]}
            onUpdateStatus={() => Promise.resolve()}
            onSchedule={() => Promise.resolve()}
            onPublish={() => Promise.resolve()}
            onReject={() => Promise.resolve()}
            onApprove={() => Promise.resolve()}
            onBulkAction={() => Promise.resolve()}
            userRole={userRole}
            showFilters={true}
            showBulkActions={canPublish}
            showAnalytics={canViewAnalytics}
          />
        </TabsContent>

        {/* SEO */}
        <TabsContent value="seo">
          <SEOManager
            contentType="course"
            contentId="1"
            initialData={{
              title: '',
              metaDescription: '',
              keywords: [],
              canonicalUrl: ''
            }}
            content=""
            onSave={() => Promise.resolve()}
            onAnalyze={() => Promise.resolve({
              score: 85,
              issues: [],
              recommendations: [],
              readability: {
                score: 80,
                gradeLevel: '8th',
                wordCount: 500,
                sentenceCount: 25,
                paragraphCount: 5,
                averageWordsPerSentence: 20,
                averageSyllablesPerWord: 1.5
              },
              keywordDensity: [],
              socialPreview: {
                title: 'Test Title',
                description: 'Test Description',
                url: 'https://example.com'
              }
            })}
            showAnalysis={true}
            showSocialPreview={true}
            showStructuredData={true}
            showAdvanced={true}
          />
        </TabsContent>

        {/* Analytics */}
        {canViewAnalytics && (
          <TabsContent value="analytics">
            <ContentAnalytics
              dateRange="30d"
              onExport={(data) => console.log('Export data:', data)}
              showRevenue={true}
              showEngagement={true}
              showTrends={true}
            />
          </TabsContent>
        )}

        {/* Email */}
        <TabsContent value="email">
          <EmailTemplateEditor
            onSave={() => Promise.resolve()}
            onPreview={() => Promise.resolve()}
            onSendTest={() => Promise.resolve()}
            onDuplicate={() => Promise.resolve()}
            onDelete={() => Promise.resolve()}
            showPreview={true}
            showVariables={true}
            showTestSend={true}
          />
        </TabsContent>
      </Tabs>

      {/* Content Creation Wizard */}
      {showContentWizard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute inset-0 overflow-auto">
            <ContentCreationWizard
              onComplete={handleCreateContent}
              onCancel={() => setShowContentWizard(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
}
