'use client'

import React, { useState, useCallback } from 'react'
import { useAuth } from '@/cms/context/AuthContext'
import { useContentSections, useSectionStats, useSectionRealtime, useSectionDragAndDrop, useSectionTemplates } from '@/cms/lib/core/section-hooks'
import { ContentType } from '@/cms/lib/generated/prisma'
import { ContentSection, BulkEditOperation } from '@/cms/lib/core/section-editor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Loader2, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Copy, 
  Move, 
  GripVertical,
  Settings,
  BarChart3,
  Save,
  X
} from 'lucide-react'

interface SectionEditorProps {
  contentType: ContentType
  contentId: string
  className?: string
}

export function SectionEditor({ contentType, contentId, className }: SectionEditorProps) {
  const { user } = useAuth()
  const [selectedSections, setSelectedSections] = useState<string[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [showStats, setShowStats] = useState(false)

  // Hooks
  const {
    sections,
    isLoading,
    error,
    refetch,
    createSection,
    updateSection,
    deleteSection,
    moveSection,
    duplicateSection,
    toggleSectionVisibility,
    bulkEditSections
  } = useContentSections(contentType, contentId, user)

  const { stats, isLoading: statsLoading } = useSectionStats(contentType, contentId, user)
  const { isUpdating } = useSectionRealtime(contentType, contentId, user)
  const { templates, getTemplate, getAvailableTypes } = useSectionTemplates()

  // Drag and drop
  const handleReorder = useCallback(async (sectionId: string, newOrder: number) => {
    await moveSection(sectionId, newOrder)
  }, [moveSection])
  
  const { draggedSection, dragOverSection, handleDragStart, handleDragOver, handleDragEnd } = 
    useSectionDragAndDrop(sections, handleReorder)

  // Section form state
  const [sectionForm, setSectionForm] = useState<Partial<ContentSection>>({
    type: 'text',
    content: {},
    metadata: {},
    isVisible: true
  })

  const handleCreateSection = async () => {
    try {
      const template = getTemplate(sectionForm.type || 'text')
      const newSection = {
        ...template,
        ...sectionForm,
        type: sectionForm.type || 'text',
        order: sections.length + 1
      }
      
      await createSection(newSection)
      setIsCreating(false)
      setSectionForm({ type: 'text', content: {}, metadata: {}, isVisible: true })
    } catch (error) {
      console.error('Failed to create section:', error)
    }
  }

  const handleUpdateSection = async (sectionId: string, updateData: Partial<ContentSection>) => {
    try {
      await updateSection(sectionId, updateData)
      setEditingSection(null)
    } catch (error) {
      console.error('Failed to update section:', error)
    }
  }

  const handleDeleteSection = async (sectionId: string) => {
    if (confirm('Are you sure you want to delete this section?')) {
      try {
        await deleteSection(sectionId)
      } catch (error) {
        console.error('Failed to delete section:', error)
      }
    }
  }

  const handleDuplicateSection = async (sectionId: string) => {
    try {
      await duplicateSection(sectionId)
    } catch (error) {
      console.error('Failed to duplicate section:', error)
    }
  }

  const handleToggleVisibility = async (sectionId: string) => {
    try {
      await toggleSectionVisibility(sectionId)
    } catch (error) {
      console.error('Failed to toggle visibility:', error)
    }
  }

  const handleBulkOperation = async (operation: BulkEditOperation['operation']) => {
    if (selectedSections.length === 0) return

    try {
      const operations: BulkEditOperation[] = [{
        operation,
        sectionIds: selectedSections
      }]

      await bulkEditSections(operations)
      setSelectedSections([])
    } catch (error) {
      console.error('Failed to perform bulk operation:', error)
    }
  }

  const handleSelectSection = (sectionId: string, selected: boolean) => {
    if (selected) {
      setSelectedSections(prev => [...prev, sectionId])
    } else {
      setSelectedSections(prev => prev.filter(id => id !== sectionId))
    }
  }

  const handleSelectAll = () => {
    if (selectedSections.length === sections.length) {
      setSelectedSections([])
    } else {
      setSelectedSections(sections.map(s => s.id))
    }
  }

  if (!user) {
    return (
      <Alert>
        <AlertDescription>
          Please log in to edit sections.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">Section Editor</h2>
          {isUpdating && (
            <Badge variant="outline" className="text-blue-600">
              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
              Updating...
            </Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowStats(!showStats)}>
            <BarChart3 className="w-4 h-4 mr-2" />
            Stats
          </Button>
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Section
          </Button>
        </div>
      </div>

      {/* Statistics */}
      {showStats && stats && (
        <Card>
          <CardHeader>
            <CardTitle>Section Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.totalSections}</div>
                <p className="text-sm text-muted-foreground">Total Sections</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.visibleSections}</div>
                <p className="text-sm text-muted-foreground">Visible</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">{stats.hiddenSections}</div>
                <p className="text-sm text-muted-foreground">Hidden</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {Object.keys(stats.sectionsByType).length}
                </div>
                <p className="text-sm text-muted-foreground">Types</p>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-medium mb-2">Sections by Type</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(stats.sectionsByType).map(([type, count]) => (
                  <Badge key={type} variant="outline">
                    {type}: {count}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bulk Operations */}
      {selectedSections.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {selectedSections.length} section(s) selected
              </span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkOperation('toggle_visibility')}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Toggle Visibility
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkOperation('duplicate')}
                >
                  <Copy className="w-4 h-4 mr-1" />
                  Duplicate
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleBulkOperation('delete')}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error Display */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Sections List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : sections.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">No sections yet. Create your first section!</p>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Select All */}
            <div className="flex items-center gap-2">
              <Checkbox
                checked={selectedSections.length === sections.length}
                onCheckedChange={handleSelectAll}
              />
              <span className="text-sm font-medium">Select All</span>
            </div>

            {/* Sections */}
            {sections.map((section, index) => (
              <Card
                key={section.id}
                className={`transition-all ${
                  draggedSection === section.id ? 'opacity-50' : ''
                } ${
                  dragOverSection === section.id ? 'ring-2 ring-blue-500' : ''
                }`}
                draggable
                onDragStart={() => handleDragStart(section.id)}
                onDragOver={(e) => {
                  e.preventDefault()
                  handleDragOver(section.id)
                }}
                onDragEnd={handleDragEnd}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                      <Checkbox
                        checked={selectedSections.includes(section.id)}
                        onCheckedChange={(checked) => 
                          handleSelectSection(section.id, checked as boolean)
                        }
                      />
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {section.metadata?.title || `${section.type} Section`}
                          <Badge variant="outline">{section.type}</Badge>
                          {!section.isVisible && (
                            <Badge variant="secondary">Hidden</Badge>
                          )}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Order: {section.order} • Created: {new Date(section.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingSection(section.id)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleVisibility(section.id)}
                      >
                        {section.isVisible ? (
                          <Eye className="w-4 h-4" />
                        ) : (
                          <EyeOff className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDuplicateSection(section.id)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteSection(section.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    {section.metadata?.description || 'No description'}
                  </div>
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </div>

      {/* Create Section Dialog */}
      <Dialog open={isCreating} onOpenChange={setIsCreating}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Section</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Section Type</label>
              <Select
                value={sectionForm.type}
                onValueChange={(value) => setSectionForm({ ...sectionForm, type: value as any })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select section type" />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableTypes().map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input
                value={sectionForm.metadata?.title || ''}
                onChange={(e) => setSectionForm({
                  ...sectionForm,
                  metadata: { ...sectionForm.metadata, title: e.target.value }
                })}
                placeholder="Section title"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Input
                value={sectionForm.metadata?.description || ''}
                onChange={(e) => setSectionForm({
                  ...sectionForm,
                  metadata: { ...sectionForm.metadata, description: e.target.value }
                })}
                placeholder="Section description"
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={sectionForm.isVisible}
                onCheckedChange={(checked) => 
                  setSectionForm({ ...sectionForm, isVisible: checked as boolean })
                }
              />
              <label className="text-sm font-medium">Visible</label>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCreateSection}>
                <Save className="w-4 h-4 mr-2" />
                Create Section
              </Button>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Section Dialog */}
      {editingSection && (
        <SectionEditDialog
          section={sections.find(s => s.id === editingSection)}
          onSave={(updateData) => handleUpdateSection(editingSection, updateData)}
          onClose={() => setEditingSection(null)}
        />
      )}
    </div>
  )
}

// Section Edit Dialog Component
interface SectionEditDialogProps {
  section: ContentSection | undefined
  onSave: (updateData: Partial<ContentSection>) => void
  onClose: () => void
}

function SectionEditDialog({ section, onSave, onClose }: SectionEditDialogProps) {
  const [formData, setFormData] = useState<Partial<ContentSection>>(
    section || { type: 'text', content: {}, metadata: {}, isVisible: true }
  )

  const handleSave = () => {
    onSave(formData)
  }

  if (!section) return null

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Section</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Title</label>
            <Input
              value={formData.metadata?.title || ''}
              onChange={(e) => setFormData({
                ...formData,
                metadata: { ...formData.metadata, title: e.target.value }
              })}
              placeholder="Section title"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Description</label>
            <Input
              value={formData.metadata?.description || ''}
              onChange={(e) => setFormData({
                ...formData,
                metadata: { ...formData.metadata, description: e.target.value }
              })}
              placeholder="Section description"
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              checked={formData.isVisible}
              onCheckedChange={(checked) => 
                setFormData({ ...formData, isVisible: checked as boolean })
              }
            />
            <label className="text-sm font-medium">Visible</label>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
            <Button variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
