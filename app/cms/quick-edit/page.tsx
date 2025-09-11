'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/cms/context/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Edit, 
  Save,
  Eye,
  Palette,
  Type,
  MousePointer,
  RefreshCw,
  Plus,
  Search,
  Filter,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Zap,
  History,
  Settings
} from 'lucide-react'

interface QuickEditItem {
  id: string
  key: string
  type: 'TEXT' | 'COLOR' | 'BUTTON_LABEL' | 'BUTTON_COLOR' | 'BACKGROUND_COLOR' | 'FONT_SIZE' | 'FONT_WEIGHT' | 'SPACING' | 'BORDER_RADIUS' | 'SHADOW'
  page: string
  component: string
  element: string
  value: string
  defaultValue: string
  isActive: boolean
  metadata?: any
  createdAt: string
  updatedAt: string
}

interface LivePreviewChanges {
  [key: string]: {
    value: string
    type: string
    cssProperty?: string
  }
}

export default function QuickEditPage() {
  const { user } = useAuth()
  const [items, setItems] = useState<QuickEditItem[]>([])
  const [filteredItems, setFilteredItems] = useState<QuickEditItem[]>([])
  const [selectedPage, setSelectedPage] = useState<string>('homepage')
  const [selectedComponent, setSelectedComponent] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [editingItem, setEditingItem] = useState<QuickEditItem | null>(null)
  const [editValue, setEditValue] = useState('')
  const [saving, setSaving] = useState(false)
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [livePreviewToken, setLivePreviewToken] = useState<string | null>(null)
  const [liveChanges, setLiveChanges] = useState<LivePreviewChanges>({})

  // Load real data from API
  useEffect(() => {
    loadQuickEditItems()
  }, [])

  const loadQuickEditItems = async () => {
    try {
      const response = await fetch('/api/cms/quick-edit')
      if (response.ok) {
        const data = await response.json()
        setItems(data)
        setFilteredItems(data)
      } else {
        console.error('Failed to load quick edit items:', response.statusText)
        // Fallback to empty array if API fails
        setItems([])
        setFilteredItems([])
      }
    } catch (error) {
      console.error('Error loading quick edit items:', error)
      // Fallback to empty array if API fails
      setItems([])
      setFilteredItems([])
    }
  }

  // Filter items based on search and selection
  useEffect(() => {
    let filtered = items

    if (selectedPage !== 'all') {
      filtered = filtered.filter(item => item.page === selectedPage)
    }

    if (selectedComponent !== 'all') {
      filtered = filtered.filter(item => item.component === selectedComponent)
    }

    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.element.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredItems(filtered)
  }, [items, selectedPage, selectedComponent, searchTerm])

  const pages = [...new Set(items.map(item => item.page))]
  const components = [...new Set(items.map(item => item.component))]

  const handleEdit = (item: QuickEditItem) => {
    setEditingItem(item)
    setEditValue(item.value)
  }

  const handleSave = async () => {
    if (!editingItem) return

    setSaving(true)
    
    try {
      const response = await fetch(`/api/cms/quick-edit/${editingItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          value: editValue
        })
      })

      if (response.ok) {
        // Update local state
        setItems(prev => prev.map(item => 
          item.id === editingItem.id 
            ? { ...item, value: editValue, updatedAt: new Date().toISOString() }
            : item
        ))
        
        // Add to live changes
        setLiveChanges(prev => ({
          ...prev,
          [editingItem.key]: {
            value: editValue,
            type: editingItem.type
          }
        }))

        setEditingItem(null)
        setEditValue('')
      } else {
        console.error('Failed to save quick edit item:', response.statusText)
        alert('Failed to save changes. Please try again.')
      }
    } catch (error) {
      console.error('Error saving quick edit item:', error)
      alert('Error saving changes. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleReset = () => {
    if (!editingItem) return
    setEditValue(editingItem.defaultValue)
  }

  const handleCreateLivePreview = async () => {
    try {
      const response = await fetch('/api/cms/quick-edit/live-preview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page: selectedPage,
          changes: liveChanges
        })
      })

      if (response.ok) {
        const data = await response.json()
        setLivePreviewToken(data.token)
      } else {
        console.error('Failed to create live preview:', response.statusText)
        alert('Failed to create live preview. Please try again.')
      }
    } catch (error) {
      console.error('Error creating live preview:', error)
      alert('Error creating live preview. Please try again.')
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'TEXT': return <Type className="w-4 h-4" />
      case 'COLOR':
      case 'BUTTON_COLOR':
      case 'BACKGROUND_COLOR': return <Palette className="w-4 h-4" />
      case 'BUTTON_LABEL': return <MousePointer className="w-4 h-4" />
      default: return <Edit className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'TEXT': return 'bg-blue-100 text-blue-800'
      case 'COLOR':
      case 'BUTTON_COLOR':
      case 'BACKGROUND_COLOR': return 'bg-purple-100 text-purple-800'
      case 'BUTTON_LABEL': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
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
          <h1 className="text-2xl font-bold text-gray-900">Quick Edit</h1>
          <p className="text-gray-600">Edit text, colors, and buttons across all pages instantly</p>
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
          <Button variant="outline" onClick={handleCreateLivePreview}>
            <Zap className="w-4 h-4 mr-2" />
            Live Preview
          </Button>
        </div>
      </div>

      {/* Live Preview Status */}
      {livePreviewToken && (
        <Alert>
          <Zap className="h-4 w-4" />
          <AlertDescription>
            Live preview active! Changes are visible in real-time. 
            <a href={`/preview/${livePreviewToken}`} target="_blank" className="ml-2 text-blue-600 hover:underline">
              Open preview →
            </a>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Page
                </label>
                <select
                  value={selectedPage}
                  onChange={(e) => setSelectedPage(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="all">All Pages</option>
                  {pages.map(page => (
                    <option key={page} value={page}>{page}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Component
                </label>
                <select
                  value={selectedComponent}
                  onChange={(e) => setSelectedComponent(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="all">All Components</option>
                  {components.map(component => (
                    <option key={component} value={component}>{component}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4 border-t">
                <div className="text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Total Items:</span>
                    <span className="font-medium">{filteredItems.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Live Changes:</span>
                    <span className="font-medium text-orange-600">{Object.keys(liveChanges).length}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Edit Items */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="items" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="items">Edit Items</TabsTrigger>
              <TabsTrigger value="preview">Live Preview</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="items" className="space-y-4">
              <div className="grid gap-4">
                {filteredItems.map((item) => (
                  <Card key={item.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getTypeIcon(item.type)}
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-sm">{item.key}</span>
                              <Badge className={`text-xs ${getTypeColor(item.type)}`}>
                                {item.type.replace('_', ' ')}
                              </Badge>
                            </div>
                            <div className="text-xs text-gray-500">
                              {item.page} • {item.component} • {item.element}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {item.type.includes('COLOR') ? (
                            <div 
                              className="w-6 h-6 rounded border border-gray-300"
                              style={{ backgroundColor: item.value }}
                            />
                          ) : (
                            <span className="text-sm text-gray-700 max-w-xs truncate">
                              {item.value}
                            </span>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(item)}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="preview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {getPreviewIcon()}
                    <span className="ml-2">Live Preview</span>
                    <Badge className="ml-2 capitalize">{previewMode}</Badge>
                  </CardTitle>
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
                          Live Preview
                        </h3>
                        <p className="text-sm text-gray-500 mb-4">
                          Changes appear here in real-time
                        </p>
                        {Object.keys(liveChanges).length > 0 && (
                          <div className="space-y-2">
                            <p className="text-xs font-medium text-orange-600">Pending Changes:</p>
                            {Object.entries(liveChanges).map(([key, change]) => (
                              <div key={key} className="text-xs bg-orange-100 p-2 rounded">
                                {key}: {change.value}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <History className="w-5 h-5 mr-2" />
                    Change History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-700 mb-2">
                      No changes yet
                    </h3>
                    <p className="text-sm text-gray-500">
                      Start editing items to see change history
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle className="flex items-center">
                {getTypeIcon(editingItem.type)}
                <span className="ml-2">Edit {editingItem.type.replace('_', ' ')}</span>
              </CardTitle>
              <CardDescription>
                {editingItem.key}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {editingItem.type.includes('COLOR') ? (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Color Value
                  </label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="color"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      placeholder="#000000"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    {editingItem.type === 'TEXT' ? 'Text Content' : 'Value'}
                  </label>
                  {editingItem.type === 'TEXT' ? (
                    <Textarea
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      rows={3}
                    />
                  ) : (
                    <Input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                    />
                  )}
                </div>
              )}

              <div className="flex items-center justify-between pt-4">
                <Button variant="outline" onClick={handleReset}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset to Default
                </Button>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setEditingItem(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave} disabled={saving}>
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? 'Saving...' : 'Save'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
