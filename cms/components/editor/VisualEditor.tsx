'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Save, 
  Eye, 
  Send, 
  Calendar,
  Image,
  Video,
  FileText,
  Link,
  Bold,
  Italic,
  Underline,
  List,
  Quote,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Settings,
  Plus,
  Trash2,
  Move,
  Copy,
  Upload,
  Download,
  Search,
  Filter,
  CheckCircle,
  AlertCircle,
  Clock,
  Users,
  Globe,
  Lock,
  Unlock
} from 'lucide-react'
import { ContentTemplate, TemplateField, getTemplateById, validateTemplateData, getDefaultTemplateData } from '@/cms/lib/templates/content-templates'
import { ContentType } from '@/cms/lib/generated/prisma'

interface VisualEditorProps {
  templateId: string
  initialData?: Record<string, any>
  onSave?: (data: Record<string, any>) => Promise<void>
  onPreview?: (data: Record<string, any>) => Promise<string>
  onSubmitReview?: (data: Record<string, any>) => Promise<void>
  onPublish?: (data: Record<string, any>) => Promise<void>
  onSchedule?: (data: Record<string, any>, scheduleDate: Date) => Promise<void>
  isReadOnly?: boolean
  showPublishingOptions?: boolean
}

interface EditorState {
  data: Record<string, any>
  errors: Record<string, string>
  isDirty: boolean
  isSaving: boolean
  lastSaved?: Date
  collaborators: Array<{
    id: string
    name: string
    avatar?: string
    isActive: boolean
  }>
}

export function VisualEditor({
  templateId,
  initialData = {},
  onSave,
  onPreview,
  onSubmitReview,
  onPublish,
  onSchedule,
  isReadOnly = false,
  showPublishingOptions = true
}: VisualEditorProps) {
  const [template, setTemplate] = useState<ContentTemplate | undefined>()
  const [state, setState] = useState<EditorState>({
    data: {},
    errors: {},
    isDirty: false,
    isSaving: false,
    collaborators: []
  })
  const [activeTab, setActiveTab] = useState('content')
  const [scheduleDate, setScheduleDate] = useState('')
  const [scheduleTime, setScheduleTime] = useState('')
  
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout>()

  // Load template and initialize data
  useEffect(() => {
    const loadedTemplate = getTemplateById(templateId)
    if (loadedTemplate) {
      setTemplate(loadedTemplate)
      const defaultData = getDefaultTemplateData(loadedTemplate)
      setState(prev => ({
        ...prev,
        data: { ...defaultData, ...initialData }
      }))
    }
  }, [templateId, initialData])

  // Auto-save functionality
  useEffect(() => {
    if (state.isDirty && !state.isSaving) {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current)
      }
      
      autoSaveTimeoutRef.current = setTimeout(() => {
        handleSave()
      }, 2000)
    }

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current)
      }
    }
  }, [state.isDirty, state.isSaving])

  const handleFieldChange = useCallback((fieldName: string, value: any) => {
    setState(prev => ({
      ...prev,
      data: { ...prev.data, [fieldName]: value },
      isDirty: true,
      errors: { ...prev.errors, [fieldName]: '' }
    }))
  }, [])

  const handleSave = async () => {
    if (!template || !onSave) return

    setState(prev => ({ ...prev, isSaving: true }))
    
    try {
      const validation = validateTemplateData(template, state.data)
      if (!validation.valid) {
        const errors: Record<string, string> = {}
        validation.errors.forEach(error => {
          // Extract field name from error message
          const fieldMatch = error.match(/^(.+?) is required$/)
          if (fieldMatch) {
            const fieldName = template.fields.find(f => f.label === fieldMatch[1])?.name
            if (fieldName) {
              errors[fieldName] = error
            }
          }
        })
        setState(prev => ({ ...prev, errors, isSaving: false }))
        return
      }

      await onSave(state.data)
      setState(prev => ({
        ...prev,
        isDirty: false,
        isSaving: false,
        lastSaved: new Date(),
        errors: {}
      }))
    } catch (error) {
      console.error('Save failed:', error)
      setState(prev => ({ ...prev, isSaving: false }))
    }
  }

  const handlePreview = async () => {
    if (!onPreview) return
    
    try {
      const previewUrl = await onPreview(state.data)
      window.open(previewUrl, '_blank')
    } catch (error) {
      console.error('Preview failed:', error)
    }
  }

  const handleSubmitReview = async () => {
    if (!onSubmitReview) return
    
    try {
      await onSubmitReview(state.data)
    } catch (error) {
      console.error('Submit review failed:', error)
    }
  }

  const handlePublish = async () => {
    if (!onPublish) return
    
    try {
      await onPublish(state.data)
    } catch (error) {
      console.error('Publish failed:', error)
    }
  }

  const handleSchedule = async () => {
    if (!onSchedule || !scheduleDate || !scheduleTime) return
    
    try {
      const scheduleDateTime = new Date(`${scheduleDate}T${scheduleTime}`)
      await onSchedule(state.data, scheduleDateTime)
    } catch (error) {
      console.error('Schedule failed:', error)
    }
  }

  const renderField = (field: TemplateField) => {
    const value = state.data[field.name] || field.defaultValue || ''
    const error = state.errors[field.name]

    const commonProps = {
      id: field.id,
      value: value,
      onChange: (e: any) => handleFieldChange(field.name, e.target.value),
      placeholder: field.placeholder,
      disabled: isReadOnly,
      className: error ? 'border-red-500' : ''
    }

    switch (field.type) {
      case 'text':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="flex items-center gap-2">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Input {...commonProps} type="text" />
            {field.helpText && (
              <p className="text-sm text-gray-600">{field.helpText}</p>
            )}
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
          </div>
        )

      case 'textarea':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="flex items-center gap-2">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Textarea {...commonProps} rows={4} />
            {field.helpText && (
              <p className="text-sm text-gray-600">{field.helpText}</p>
            )}
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
          </div>
        )

      case 'rich-text':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="flex items-center gap-2">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
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
                <Separator orientation="vertical" className="h-6" />
                <Button variant="ghost" size="sm">
                  <List className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Quote className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Code className="w-4 h-4" />
                </Button>
                <Separator orientation="vertical" className="h-6" />
                <Button variant="ghost" size="sm">
                  <AlignLeft className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <AlignCenter className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <AlignRight className="w-4 h-4" />
                </Button>
              </div>
              <Textarea
                {...commonProps}
                rows={8}
                className="border-0 resize-none focus:ring-0"
              />
            </div>
            {field.helpText && (
              <p className="text-sm text-gray-600">{field.helpText}</p>
            )}
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
          </div>
        )

      case 'select':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="flex items-center gap-2">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Select value={value} onValueChange={(val) => handleFieldChange(field.name, val)} disabled={isReadOnly}>
              <SelectTrigger className={error ? 'border-red-500' : ''}>
                <SelectValue placeholder={field.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {field.helpText && (
              <p className="text-sm text-gray-600">{field.helpText}</p>
            )}
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
          </div>
        )

      case 'multiselect':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="flex items-center gap-2">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            <div className="space-y-2">
              {field.options?.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${field.id}-${option.value}`}
                    checked={Array.isArray(value) && value.includes(option.value)}
                    onCheckedChange={(checked) => {
                      const currentValues = Array.isArray(value) ? value : []
                      if (checked) {
                        handleFieldChange(field.name, [...currentValues, option.value])
                      } else {
                        handleFieldChange(field.name, currentValues.filter((v: string) => v !== option.value))
                      }
                    }}
                    disabled={isReadOnly}
                  />
                  <Label htmlFor={`${field.id}-${option.value}`}>{option.label}</Label>
                </div>
              ))}
            </div>
            {field.helpText && (
              <p className="text-sm text-gray-600">{field.helpText}</p>
            )}
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
          </div>
        )

      case 'number':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="flex items-center gap-2">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              {...commonProps}
              type="number"
              min={field.validation?.min}
              max={field.validation?.max}
            />
            {field.helpText && (
              <p className="text-sm text-gray-600">{field.helpText}</p>
            )}
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
          </div>
        )

      case 'boolean':
        return (
          <div key={field.id} className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={field.id}
                checked={value}
                onCheckedChange={(checked) => handleFieldChange(field.name, checked)}
                disabled={isReadOnly}
              />
              <Label htmlFor={field.id} className="flex items-center gap-2">
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </Label>
            </div>
            {field.helpText && (
              <p className="text-sm text-gray-600">{field.helpText}</p>
            )}
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
          </div>
        )

      case 'date':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="flex items-center gap-2">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              {...commonProps}
              type="date"
            />
            {field.helpText && (
              <p className="text-sm text-gray-600">{field.helpText}</p>
            )}
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
          </div>
        )

      case 'image':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="flex items-center gap-2">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    // In a real implementation, you'd upload the file and get a URL
                    handleFieldChange(field.name, URL.createObjectURL(file))
                  }
                }}
                disabled={isReadOnly}
                className="hidden"
                id={field.id}
              />
              <Label htmlFor={field.id} className="cursor-pointer">
                <Button variant="outline" size="sm" disabled={isReadOnly}>
                  Choose File
                </Button>
              </Label>
            </div>
            {value && (
              <div className="mt-2">
                <img src={value} alt="Preview" className="w-32 h-20 object-cover rounded" />
              </div>
            )}
            {field.helpText && (
              <p className="text-sm text-gray-600">{field.helpText}</p>
            )}
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
          </div>
        )

      case 'tags':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="flex items-center gap-2">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              {...commonProps}
              placeholder={field.placeholder}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ',') {
                  e.preventDefault()
                  const input = e.target as HTMLInputElement
                  const newTag = input.value.trim()
                  if (newTag) {
                    const currentTags = Array.isArray(value) ? value : []
                    if (!currentTags.includes(newTag)) {
                      handleFieldChange(field.name, [...currentTags, newTag])
                    }
                    input.value = ''
                  }
                }
              }}
            />
            {Array.isArray(value) && value.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {value.map((tag: string, index: number) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    {!isReadOnly && (
                      <button
                        onClick={() => {
                          const newTags = value.filter((_: string, i: number) => i !== index)
                          handleFieldChange(field.name, newTags)
                        }}
                        className="ml-1 hover:text-red-500"
                      >
                        ×
                      </button>
                    )}
                  </Badge>
                ))}
              </div>
            )}
            {field.helpText && (
              <p className="text-sm text-gray-600">{field.helpText}</p>
            )}
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
          </div>
        )

      default:
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="flex items-center gap-2">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Input {...commonProps} />
            {field.helpText && (
              <p className="text-sm text-gray-600">{field.helpText}</p>
            )}
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
          </div>
        )
    }
  }

  if (!template) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading template...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Editor Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${template.color}`}>
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">{template.name} Editor</CardTitle>
                <p className="text-sm text-gray-600">{template.description}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {state.isDirty && (
                <Badge variant="outline" className="text-orange-600 border-orange-600">
                  <Clock className="w-3 h-3 mr-1" />
                  Unsaved changes
                </Badge>
              )}
              
              {state.isSaving && (
                <Badge variant="outline" className="text-blue-600 border-blue-600">
                  <Save className="w-3 h-3 mr-1" />
                  Saving...
                </Badge>
              )}
              
              {state.lastSaved && !state.isDirty && (
                <Badge variant="outline" className="text-green-600 border-green-600">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Saved {state.lastSaved.toLocaleTimeString()}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Content Area */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="seo">SEO & Metadata</TabsTrigger>
                  {showPublishingOptions && (
                    <TabsTrigger value="publishing">Publishing</TabsTrigger>
                  )}
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsContent value="content" className="space-y-6">
                  {template.fields.map(renderField)}
                </TabsContent>
                
                <TabsContent value="seo" className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">SEO Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>SEO Title</Label>
                        <Input
                          value={state.data.seoTitle || state.data.title || ''}
                          onChange={(e) => handleFieldChange('seoTitle', e.target.value)}
                          placeholder="SEO optimized title"
                          disabled={isReadOnly}
                        />
                        <p className="text-xs text-gray-500">
                          {state.data.seoTitle?.length || state.data.title?.length || 0}/60 characters
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label>Meta Description</Label>
                        <Textarea
                          value={state.data.metaDescription || state.data.shortDescription || ''}
                          onChange={(e) => handleFieldChange('metaDescription', e.target.value)}
                          placeholder="Brief description for search engines"
                          rows={3}
                          disabled={isReadOnly}
                        />
                        <p className="text-xs text-gray-500">
                          {state.data.metaDescription?.length || state.data.shortDescription?.length || 0}/160 characters
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {showPublishingOptions && (
                  <TabsContent value="publishing" className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Publishing Options</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Schedule Date</Label>
                          <Input
                            type="date"
                            value={scheduleDate}
                            onChange={(e) => setScheduleDate(e.target.value)}
                            disabled={isReadOnly}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Schedule Time</Label>
                          <Input
                            type="time"
                            value={scheduleTime}
                            onChange={(e) => setScheduleTime(e.target.value)}
                            disabled={isReadOnly}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Visibility</Label>
                        <Select
                          value={state.data.visibility || 'public'}
                          onValueChange={(value) => handleFieldChange('visibility', value)}
                          disabled={isReadOnly}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">
                              <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4" />
                                Public
                              </div>
                            </SelectItem>
                            <SelectItem value="private">
                              <div className="flex items-center gap-2">
                                <Lock className="w-4 h-4" />
                                Private
                              </div>
                            </SelectItem>
                            <SelectItem value="draft">
                              <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                Draft
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>
                )}
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={handleSave}
                disabled={state.isSaving || isReadOnly}
                className="w-full"
              >
                <Save className="w-4 h-4 mr-2" />
                {state.isSaving ? 'Saving...' : 'Save Draft'}
              </Button>
              
              <Button
                variant="outline"
                onClick={handlePreview}
                className="w-full"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              
              {onSubmitReview && (
                <Button
                  variant="outline"
                  onClick={handleSubmitReview}
                  disabled={isReadOnly}
                  className="w-full"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit for Review
                </Button>
              )}
              
              {onPublish && (
                <Button
                  onClick={handlePublish}
                  disabled={isReadOnly}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Publish Now
                </Button>
              )}
              
              {onSchedule && scheduleDate && scheduleTime && (
                <Button
                  variant="outline"
                  onClick={handleSchedule}
                  disabled={isReadOnly}
                  className="w-full"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Publish
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Collaborators */}
          {state.collaborators.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Collaborators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {state.collaborators.map((collaborator) => (
                    <div key={collaborator.id} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${collaborator.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
                      <span className="text-sm">{collaborator.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Words:</span>
                <span>{state.data.content?.split(' ').length || 0}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Characters:</span>
                <span>{state.data.content?.length || 0}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Last Modified:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
