'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/cms/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Webhook,
  GitBranch,
  Server,
  Zap,
  Settings,
  Plus,
  Edit,
  Trash2,
  Copy,
  TestTube,
  CheckCircle,
  XCircle,
  AlertCircle,
  ExternalLink,
  Key,
  Globe,
  Database,
  Code,
  Activity,
} from 'lucide-react'

interface WebhookConfig {
  id: string
  name: string
  url: string
  events: string[]
  status: 'active' | 'inactive' | 'error'
  lastTriggered?: string
  secret?: string
  description: string
}

interface GitIntegration {
  id: string
  name: string
  provider: 'github' | 'gitlab' | 'bitbucket'
  repository: string
  branch: string
  status: 'connected' | 'disconnected' | 'error'
  lastSync?: string
  autoSync: boolean
}

interface APIConfig {
  id: string
  name: string
  endpoint: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  status: 'active' | 'inactive'
  rateLimit: number
  description: string
}

const mockWebhooks: WebhookConfig[] = [
  {
    id: '1',
    name: 'Content Published',
    url: 'https://api.shikshanam.com/webhooks/content-published',
    events: ['content.published', 'content.updated'],
    status: 'active',
    lastTriggered: '2024-01-15T10:30:00Z',
    secret: 'whsec_1234567890abcdef',
    description: 'Triggered when content is published to production'
  },
  {
    id: '2',
    name: 'Media Uploaded',
    url: 'https://cdn.shikshanam.com/webhooks/media-uploaded',
    events: ['media.uploaded', 'media.updated'],
    status: 'active',
    lastTriggered: '2024-01-14T15:45:00Z',
    secret: 'whsec_abcdef1234567890',
    description: 'Triggered when new media files are uploaded'
  },
  {
    id: '3',
    name: 'User Activity',
    url: 'https://analytics.shikshanam.com/webhooks/user-activity',
    events: ['user.login', 'user.logout', 'user.created'],
    status: 'error',
    lastTriggered: '2024-01-13T12:20:00Z',
    description: 'Track user activity for analytics'
  }
]

const mockGitIntegrations: GitIntegration[] = [
  {
    id: '1',
    name: 'Main Repository',
    provider: 'github',
    repository: 'shikshanam/shikshanam-cms',
    branch: 'main',
    status: 'connected',
    lastSync: '2024-01-15T10:30:00Z',
    autoSync: true
  },
  {
    id: '2',
    name: 'Content Repository',
    provider: 'github',
    repository: 'shikshanam/content',
    branch: 'master',
    status: 'connected',
    lastSync: '2024-01-14T15:45:00Z',
    autoSync: false
  }
]

const mockAPIs: APIConfig[] = [
  {
    id: '1',
    name: 'Content API',
    endpoint: '/api/content',
    method: 'GET',
    status: 'active',
    rateLimit: 1000,
    description: 'RESTful API for content management'
  },
  {
    id: '2',
    name: 'Media API',
    endpoint: '/api/media',
    method: 'POST',
    status: 'active',
    rateLimit: 500,
    description: 'API for media file operations'
  },
  {
    id: '3',
    name: 'Analytics API',
    endpoint: '/api/analytics',
    method: 'GET',
    status: 'inactive',
    rateLimit: 100,
    description: 'Analytics data API'
  }
]

export default function IntegrationsPage() {
  const { user } = useAuth()
  const [webhooks, setWebhooks] = useState<WebhookConfig[]>(mockWebhooks)
  const [gitIntegrations, setGitIntegrations] = useState<GitIntegration[]>(mockGitIntegrations)
  const [apis, setAPIs] = useState<APIConfig[]>(mockAPIs)
  const [createWebhookDialog, setCreateWebhookDialog] = useState(false)
  const [createGitDialog, setCreateGitDialog] = useState(false)
  const [testWebhookDialog, setTestWebhookDialog] = useState(false)
  const [selectedWebhook, setSelectedWebhook] = useState<WebhookConfig | null>(null)
  const [newWebhook, setNewWebhook] = useState({
    name: '',
    url: '',
    events: [] as string[],
    description: ''
  })

  const availableEvents = [
    'content.created',
    'content.updated',
    'content.published',
    'content.deleted',
    'media.uploaded',
    'media.updated',
    'media.deleted',
    'user.created',
    'user.updated',
    'user.login',
    'user.logout',
    'deployment.started',
    'deployment.completed',
    'deployment.failed'
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'connected': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'inactive':
      case 'disconnected': return <XCircle className="w-4 h-4 text-gray-500" />
      case 'error': return <AlertCircle className="w-4 h-4 text-red-500" />
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      connected: 'bg-green-100 text-green-800',
      disconnected: 'bg-gray-100 text-gray-800',
      error: 'bg-red-100 text-red-800'
    }
    return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800'
  }

  const handleCreateWebhook = () => {
    const webhook: WebhookConfig = {
      id: Date.now().toString(),
      name: newWebhook.name,
      url: newWebhook.url,
      events: newWebhook.events,
      status: 'active',
      description: newWebhook.description,
      secret: `whsec_${Math.random().toString(36).substring(2, 15)}`
    }
    
    setWebhooks(prev => [...prev, webhook])
    setCreateWebhookDialog(false)
    setNewWebhook({ name: '', url: '', events: [], description: '' })
  }

  const handleTestWebhook = (webhook: WebhookConfig) => {
    setSelectedWebhook(webhook)
    setTestWebhookDialog(true)
    
    // Simulate webhook test
    setTimeout(() => {
      console.log('Webhook test completed for:', webhook.name)
    }, 2000)
  }

  const handleToggleEvent = (event: string) => {
    setNewWebhook(prev => ({
      ...prev,
      events: prev.events.includes(event)
        ? prev.events.filter(e => e !== event)
        : [...prev.events, event]
    }))
  }

  const handleCopySecret = (secret: string) => {
    navigator.clipboard.writeText(secret)
    // Show toast notification
  }

  const handleSyncGit = (integrationId: string) => {
    setGitIntegrations(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { ...integration, lastSync: new Date().toISOString() }
        : integration
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
          <p className="text-gray-600">Connect external services, APIs, and automation tools</p>
        </div>
      </div>

      <Tabs defaultValue="webhooks" className="space-y-6">
        <TabsList>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="git">Git Sync</TabsTrigger>
          <TabsTrigger value="apis">APIs</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
        </TabsList>

        <TabsContent value="webhooks" className="space-y-6">
          {/* Webhooks */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Webhook className="w-5 h-5 mr-2" />
                  Webhooks
                </CardTitle>
                <Button onClick={() => setCreateWebhookDialog(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Webhook
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {webhooks.map((webhook) => (
                  <div key={webhook.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium">{webhook.name}</h3>
                        <p className="text-sm text-gray-600">{webhook.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(webhook.status)}
                        <Badge className={getStatusBadge(webhook.status)}>
                          {webhook.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                      <div>
                        <span className="font-medium">URL:</span>
                        <div className="flex items-center space-x-2">
                          <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                            {webhook.url}
                          </code>
                          <Button variant="ghost" size="sm" onClick={() => handleCopySecret(webhook.url)}>
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">Secret:</span>
                        <div className="flex items-center space-x-2">
                          <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                            {webhook.secret}
                          </code>
                          <Button variant="ghost" size="sm" onClick={() => handleCopySecret(webhook.secret || '')}>
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <span className="font-medium text-sm">Events:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {webhook.events.map(event => (
                          <Badge key={event} variant="outline" className="text-xs">
                            {event}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        Last triggered: {webhook.lastTriggered ? new Date(webhook.lastTriggered).toLocaleString() : 'Never'}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleTestWebhook(webhook)}>
                          <TestTube className="w-4 h-4 mr-2" />
                          Test
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="git" className="space-y-6">
          {/* Git Integrations */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <GitBranch className="w-5 h-5 mr-2" />
                  Git Integrations
                </CardTitle>
                <Button onClick={() => setCreateGitDialog(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Connect Repository
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {gitIntegrations.map((integration) => (
                  <div key={integration.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium">{integration.name}</h3>
                        <p className="text-sm text-gray-600">
                          {integration.provider}/{integration.repository}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(integration.status)}
                        <Badge className={getStatusBadge(integration.status)}>
                          {integration.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                      <div>
                        <span className="font-medium">Branch:</span>
                        <div className="flex items-center space-x-2">
                          <GitBranch className="w-4 h-4" />
                          <span>{integration.branch}</span>
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">Auto Sync:</span>
                        <div className="flex items-center space-x-2">
                          <Switch checked={integration.autoSync} />
                          <span>{integration.autoSync ? 'Enabled' : 'Disabled'}</span>
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">Last Sync:</span>
                        <div className="flex items-center space-x-2">
                          <Activity className="w-4 h-4" />
                          <span>{integration.lastSync ? new Date(integration.lastSync).toLocaleString() : 'Never'}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleSyncGit(integration.id)}>
                        <GitBranch className="w-4 h-4 mr-2" />
                        Sync Now
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Repository
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="apis" className="space-y-6">
          {/* API Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="w-5 h-5 mr-2" />
                API Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apis.map((api) => (
                  <div key={api.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium">{api.name}</h3>
                        <p className="text-sm text-gray-600">{api.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(api.status)}
                        <Badge className={getStatusBadge(api.status)}>
                          {api.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                      <div>
                        <span className="font-medium">Endpoint:</span>
                        <div className="flex items-center space-x-2">
                          <Server className="w-4 h-4" />
                          <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                            {api.method} {api.endpoint}
                          </code>
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">Rate Limit:</span>
                        <div className="flex items-center space-x-2">
                          <Zap className="w-4 h-4" />
                          <span>{api.rateLimit} requests/hour</span>
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">Status:</span>
                        <div className="flex items-center space-x-2">
                          <Activity className="w-4 h-4" />
                          <span>{api.status}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <TestTube className="w-4 h-4 mr-2" />
                        Test API
                      </Button>
                      <Button variant="outline" size="sm">
                        <Key className="w-4 h-4 mr-2" />
                        API Keys
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4 mr-2" />
                        Configure
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          {/* Automation Rules */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Automation Rules
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Zap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Automation Coming Soon</h3>
                <p className="text-gray-600">Set up automated workflows and triggers for your content management</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Webhook Dialog */}
      <Dialog open={createWebhookDialog} onOpenChange={setCreateWebhookDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Webhook</DialogTitle>
            <DialogDescription>
              Set up a new webhook to receive real-time notifications
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="webhook-name">Name</Label>
              <Input
                id="webhook-name"
                value={newWebhook.name}
                onChange={(e) => setNewWebhook(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Content Published"
              />
            </div>
            
            <div>
              <Label htmlFor="webhook-url">URL</Label>
              <Input
                id="webhook-url"
                value={newWebhook.url}
                onChange={(e) => setNewWebhook(prev => ({ ...prev, url: e.target.value }))}
                placeholder="https://your-app.com/webhook"
              />
            </div>
            
            <div>
              <Label htmlFor="webhook-description">Description</Label>
              <Textarea
                id="webhook-description"
                value={newWebhook.description}
                onChange={(e) => setNewWebhook(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe what this webhook does..."
                rows={3}
              />
            </div>
            
            <div>
              <Label>Events</Label>
              <div className="grid grid-cols-2 gap-2 mt-2 max-h-48 overflow-y-auto">
                {availableEvents.map(event => (
                  <div key={event} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={event}
                      checked={newWebhook.events.includes(event)}
                      onChange={() => handleToggleEvent(event)}
                      className="w-4 h-4"
                    />
                    <Label htmlFor={event} className="text-sm">
                      {event}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setCreateWebhookDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateWebhook}>
              Create Webhook
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Test Webhook Dialog */}
      <Dialog open={testWebhookDialog} onOpenChange={setTestWebhookDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Webhook</DialogTitle>
            <DialogDescription>
              Send a test payload to verify your webhook is working
            </DialogDescription>
          </DialogHeader>
          
          {selectedWebhook && (
            <div className="space-y-4">
              <div>
                <Label>Webhook URL</Label>
                <Input value={selectedWebhook.url} readOnly />
              </div>
              
              <div>
                <Label>Test Payload</Label>
                <Textarea
                  value={JSON.stringify({
                    event: 'test',
                    timestamp: new Date().toISOString(),
                    data: { message: 'This is a test webhook payload' }
                  }, null, 2)}
                  readOnly
                  rows={6}
                />
              </div>
              
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800">
                  This will send a test payload to your webhook URL. Make sure your endpoint is ready to receive it.
                </p>
              </div>
            </div>
          )}
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setTestWebhookDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setTestWebhookDialog(false)}>
              Send Test
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
