'use client'

import { useAuth } from '@/cms/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  FileText, 
  BookOpen, 
  Image, 
  Activity, 
  Globe, 
  Server, 
  Package, 
  Users, 
  Settings,
  Plus,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Eye,
  Edit,
  Send
} from 'lucide-react'

export default function CMSDashboard() {
  const { user } = useAuth()

  const quickActions = [
    {
      title: 'Create Content',
      description: 'Start writing a new article or page',
      icon: FileText,
      href: '/cms/editor',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Upload Media',
      description: 'Add images, videos, or documents',
      icon: Image,
      href: '/cms/media',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Review Content',
      description: 'Check pending reviews and approvals',
      icon: Eye,
      href: '/cms/content',
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      title: 'Publish Changes',
      description: 'Deploy content to production',
      icon: Send,
      href: '/cms/publishing',
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ]

  const stats = [
    { label: 'Total Content', value: '247', icon: FileText, color: 'text-blue-600' },
    { label: 'Published', value: '189', icon: CheckCircle, color: 'text-green-600' },
    { label: 'Drafts', value: '34', icon: Edit, color: 'text-yellow-600' },
    { label: 'Pending Review', value: '24', icon: Clock, color: 'text-orange-600' }
  ]

  const recentActivity = [
    {
      id: 1,
      action: 'Published',
      content: 'Introduction to Sanskrit Grammar',
      author: 'Dr. Priya Sharma',
      time: '2 minutes ago',
      type: 'success'
    },
    {
      id: 2,
      action: 'Created',
      content: 'Advanced Yoga Philosophy',
      author: 'Rajesh Kumar',
      time: '15 minutes ago',
      type: 'info'
    },
    {
      id: 3,
      action: 'Updated',
      content: 'Sanskrit Learning Package',
      author: 'Meera Patel',
      time: '1 hour ago',
      type: 'info'
    },
    {
      id: 4,
      action: 'Review Required',
      content: 'Vedic Wisdom Collection',
      author: 'Dr. Ananda',
      time: '2 hours ago',
      type: 'warning'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.username}!
        </h1>
        <p className="text-orange-100">
          Manage your content, review workflows, and publish with confidence.
        </p>
        <div className="flex items-center space-x-3 mt-3">
          <Badge className="bg-white/20 text-white border-white/30">
            {user?.role} Access
          </Badge>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-100">System online</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <Button
                  key={index}
                  className={`${action.color} text-white h-auto p-4 flex flex-col items-center space-y-2`}
                  asChild
                >
                  <a href={action.href}>
                    <Icon className="w-6 h-6" />
                    <div className="text-center">
                      <div className="font-medium">{action.title}</div>
                      <div className="text-xs opacity-90">{action.description}</div>
                    </div>
                  </a>
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'success' ? 'bg-green-500' :
                    activity.type === 'warning' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.action}: {activity.content}
                    </p>
                    <p className="text-xs text-gray-500">
                      by {activity.author} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Content Server</span>
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Online
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Media Storage</span>
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Online
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Preview System</span>
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Online
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Publishing Queue</span>
                <Badge className="bg-yellow-100 text-yellow-800">
                  <Clock className="w-3 h-3 mr-1" />
                  3 Pending
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Cards */}
      <Card>
        <CardHeader>
          <CardTitle>CMS Navigation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex items-center space-x-3" asChild>
              <a href="/cms/content">
                <FileText className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">Content Management</div>
                  <div className="text-xs text-gray-500">Manage all content types</div>
                </div>
              </a>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex items-center space-x-3" asChild>
              <a href="/cms/editor">
                <BookOpen className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">WYSIWYG Editor</div>
                  <div className="text-xs text-gray-500">Create and edit content</div>
                </div>
              </a>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex items-center space-x-3" asChild>
              <a href="/cms/media">
                <Image className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">Media Library</div>
                  <div className="text-xs text-gray-500">Upload and manage files</div>
                </div>
              </a>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex items-center space-x-3" asChild>
              <a href="/cms/revisions">
                <Activity className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">Revisions</div>
                  <div className="text-xs text-gray-500">Version control and history</div>
                </div>
              </a>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex items-center space-x-3" asChild>
              <a href="/cms/preview">
                <Globe className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">Preview & Staging</div>
                  <div className="text-xs text-gray-500">Test before publishing</div>
                </div>
              </a>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex items-center space-x-3" asChild>
              <a href="/cms/publishing">
                <Server className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">Publishing</div>
                  <div className="text-xs text-gray-500">Deploy and manage releases</div>
                </div>
              </a>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex items-center space-x-3" asChild>
              <a href="/cms/users">
                <Users className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">Users & Permissions</div>
                  <div className="text-xs text-gray-500">Manage access and roles</div>
                </div>
              </a>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex items-center space-x-3" asChild>
              <a href="/cms/integrations">
                <Package className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">Integrations</div>
                  <div className="text-xs text-gray-500">Connect external services</div>
                </div>
              </a>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex items-center space-x-3" asChild>
              <a href="/cms/settings">
                <Settings className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">Settings</div>
                  <div className="text-xs text-gray-500">Configure system options</div>
                </div>
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
