// React hooks for section editing
'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { sectionEditor } from './section-editor'
import { AuthUser } from '../auth'
import { 
  ContentSection, 
  SectionEditOperation, 
  BulkEditOperation 
} from './section-editor'
import { ContentType } from '../generated/prisma'
import { CMSError } from './types'

// Hook for managing sections of a content item
export function useContentSections(
  contentType: ContentType,
  contentId: string,
  user: AuthUser | null
) {
  const [sections, setSections] = useState<ContentSection[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchSections = useCallback(async () => {
    if (!user || !contentId) return

    setIsLoading(true)
    setError(null)

    try {
      const result = await sectionEditor.getSections(contentType, contentId, user)
      setSections(result)
    } catch (err) {
      const errorMessage = err instanceof CMSError ? err.message : 'Failed to fetch sections'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [user, contentType, contentId])

  useEffect(() => {
    fetchSections()
  }, [fetchSections])

  const createSection = useCallback(async (sectionData: Omit<ContentSection, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!user) throw new Error('User not authenticated')
    
    const newSection = await sectionEditor.createSection(contentType, contentId, sectionData, user)
    await fetchSections() // Refresh the list
    return newSection
  }, [user, contentType, contentId, fetchSections])

  const updateSection = useCallback(async (sectionId: string, updateData: Partial<ContentSection>) => {
    if (!user) throw new Error('User not authenticated')
    
    const updatedSection = await sectionEditor.updateSection(sectionId, updateData, user)
    setSections(prev => prev.map(s => s.id === sectionId ? updatedSection : s))
    return updatedSection
  }, [user])

  const deleteSection = useCallback(async (sectionId: string) => {
    if (!user) throw new Error('User not authenticated')
    
    await sectionEditor.deleteSection(sectionId, user)
    await fetchSections() // Refresh the list
  }, [user, fetchSections])

  const moveSection = useCallback(async (sectionId: string, newOrder: number) => {
    if (!user) throw new Error('User not authenticated')
    
    const updatedSections = await sectionEditor.moveSection(sectionId, newOrder, user)
    setSections(updatedSections)
    return updatedSections
  }, [user])

  const duplicateSection = useCallback(async (sectionId: string) => {
    if (!user) throw new Error('User not authenticated')
    
    const duplicatedSection = await sectionEditor.duplicateSection(sectionId, user)
    await fetchSections() // Refresh the list
    return duplicatedSection
  }, [user, fetchSections])

  const toggleSectionVisibility = useCallback(async (sectionId: string) => {
    if (!user) throw new Error('User not authenticated')
    
    const updatedSection = await sectionEditor.toggleSectionVisibility(sectionId, user)
    setSections(prev => prev.map(s => s.id === sectionId ? updatedSection : s))
    return updatedSection
  }, [user])

  const bulkEditSections = useCallback(async (operations: BulkEditOperation[]) => {
    if (!user) throw new Error('User not authenticated')
    
    const results = await sectionEditor.bulkEditSections(contentType, contentId, operations, user)
    await fetchSections() // Refresh the list
    return results
  }, [user, contentType, contentId, fetchSections])

  return {
    sections,
    isLoading,
    error,
    refetch: fetchSections,
    createSection,
    updateSection,
    deleteSection,
    moveSection,
    duplicateSection,
    toggleSectionVisibility,
    bulkEditSections
  }
}

// Hook for managing a single section
export function useSection(sectionId: string, user: AuthUser | null) {
  const [section, setSection] = useState<ContentSection | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchSection = useCallback(async () => {
    if (!user || !sectionId) return

    setIsLoading(true)
    setError(null)

    try {
      const result = await sectionEditor.getSection(sectionId, user)
      setSection(result)
    } catch (err) {
      const errorMessage = err instanceof CMSError ? err.message : 'Failed to fetch section'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [user, sectionId])

  useEffect(() => {
    fetchSection()
  }, [fetchSection])

  const updateSection = useCallback(async (updateData: Partial<ContentSection>) => {
    if (!user) throw new Error('User not authenticated')
    
    const updatedSection = await sectionEditor.updateSection(sectionId, updateData, user)
    setSection(updatedSection)
    return updatedSection
  }, [user, sectionId])

  return {
    section,
    isLoading,
    error,
    refetch: fetchSection,
    updateSection
  }
}

// Hook for section statistics
export function useSectionStats(
  contentType: ContentType,
  contentId: string,
  user: AuthUser | null
) {
  const [stats, setStats] = useState<{
    totalSections: number
    visibleSections: number
    hiddenSections: number
    sectionsByType: Record<string, number>
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = useCallback(async () => {
    if (!user || !contentId) return

    setIsLoading(true)
    setError(null)

    try {
      const result = await sectionEditor.getSectionStats(contentType, contentId, user)
      setStats(result)
    } catch (err) {
      const errorMessage = err instanceof CMSError ? err.message : 'Failed to fetch section stats'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [user, contentType, contentId])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  return {
    stats,
    isLoading,
    error,
    refetch: fetchStats
  }
}

// Hook for real-time section updates
export function useSectionRealtime(
  contentType: ContentType,
  contentId: string,
  user: AuthUser | null
) {
  const [isUpdating, setIsUpdating] = useState(false)
  const { subscribe } = require('./realtime').useCMSRealtime()

  useEffect(() => {
    if (!user || !contentId) return

    const unsubscribe = subscribe('cms_event', (event: any) => {
      if (event.entity === 'section' && 
          (event.entityId === contentId || event.data?.contentId === contentId)) {
        setIsUpdating(true)
        
        // Simulate update delay
        setTimeout(() => setIsUpdating(false), 1000)
      }
    })

    return unsubscribe
  }, [user, contentId, subscribe])

  return { isUpdating }
}

// Hook for section editing operations
export function useSectionOperations(user: AuthUser | null) {
  const createSection = useCallback(async (
    contentType: ContentType,
    contentId: string,
    sectionData: Omit<ContentSection, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    if (!user) throw new Error('User not authenticated')
    return await sectionEditor.createSection(contentType, contentId, sectionData, user)
  }, [user])

  const updateSection = useCallback(async (sectionId: string, updateData: Partial<ContentSection>) => {
    if (!user) throw new Error('User not authenticated')
    return await sectionEditor.updateSection(sectionId, updateData, user)
  }, [user])

  const deleteSection = useCallback(async (sectionId: string) => {
    if (!user) throw new Error('User not authenticated')
    return await sectionEditor.deleteSection(sectionId, user)
  }, [user])

  const moveSection = useCallback(async (sectionId: string, newOrder: number) => {
    if (!user) throw new Error('User not authenticated')
    return await sectionEditor.moveSection(sectionId, newOrder, user)
  }, [user])

  const duplicateSection = useCallback(async (sectionId: string) => {
    if (!user) throw new Error('User not authenticated')
    return await sectionEditor.duplicateSection(sectionId, user)
  }, [user])

  const toggleSectionVisibility = useCallback(async (sectionId: string) => {
    if (!user) throw new Error('User not authenticated')
    return await sectionEditor.toggleSectionVisibility(sectionId, user)
  }, [user])

  const bulkEditSections = useCallback(async (
    contentType: ContentType,
    contentId: string,
    operations: BulkEditOperation[]
  ) => {
    if (!user) throw new Error('User not authenticated')
    return await sectionEditor.bulkEditSections(contentType, contentId, operations, user)
  }, [user])

  return {
    createSection,
    updateSection,
    deleteSection,
    moveSection,
    duplicateSection,
    toggleSectionVisibility,
    bulkEditSections
  }
}

// Hook for section drag and drop
export function useSectionDragAndDrop(
  sections: ContentSection[],
  onReorder: (sectionId: string, newOrder: number) => Promise<void>
) {
  const [draggedSection, setDraggedSection] = useState<string | null>(null)
  const [dragOverSection, setDragOverSection] = useState<string | null>(null)

  const handleDragStart = useCallback((sectionId: string) => {
    setDraggedSection(sectionId)
  }, [])

  const handleDragOver = useCallback((sectionId: string) => {
    setDragOverSection(sectionId)
  }, [])

  const handleDragEnd = useCallback(async () => {
    if (draggedSection && dragOverSection && draggedSection !== dragOverSection) {
      const draggedIndex = sections.findIndex(s => s.id === draggedSection)
      const targetIndex = sections.findIndex(s => s.id === dragOverSection)
      
      if (draggedIndex !== -1 && targetIndex !== -1) {
        await onReorder(draggedSection, targetIndex + 1)
      }
    }
    
    setDraggedSection(null)
    setDragOverSection(null)
  }, [draggedSection, dragOverSection, sections, onReorder])

  return {
    draggedSection,
    dragOverSection,
    handleDragStart,
    handleDragOver,
    handleDragEnd
  }
}

// Hook for section templates
export function useSectionTemplates() {
  const templates = {
    text: {
      type: 'text',
      content: { text: '', format: 'markdown' },
      metadata: { title: 'Text Section' },
      isVisible: true
    },
    image: {
      type: 'image',
      content: { url: '', alt: '' },
      metadata: { title: 'Image Section', caption: '' },
      isVisible: true
    },
    video: {
      type: 'video',
      content: { url: '', provider: 'youtube' },
      metadata: { title: 'Video Section', description: '' },
      isVisible: true
    },
    quiz: {
      type: 'quiz',
      content: { questions: [] },
      metadata: { title: 'Quiz Section' },
      isVisible: true
    },
    code: {
      type: 'code',
      content: { code: '', language: 'javascript' },
      metadata: { title: 'Code Section', description: '' },
      isVisible: true
    },
    quote: {
      type: 'quote',
      content: { text: '', author: '' },
      metadata: { title: 'Quote Section' },
      isVisible: true
    },
    list: {
      type: 'list',
      content: { items: [], ordered: false },
      metadata: { title: 'List Section' },
      isVisible: true
    },
    table: {
      type: 'table',
      content: { headers: [], rows: [] },
      metadata: { title: 'Table Section' },
      isVisible: true
    }
  }

  const getTemplate = useCallback((type: string) => {
    return templates[type as keyof typeof templates] || templates.text
  }, [])

  const getAvailableTypes = useCallback(() => {
    return Object.keys(templates)
  }, [])

  return {
    templates,
    getTemplate,
    getAvailableTypes
  }
}
