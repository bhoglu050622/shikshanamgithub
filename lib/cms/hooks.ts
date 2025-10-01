'use client'

import { useState, useEffect, useCallback } from 'react'
import { HomepageContent } from './types'

export function useCMSContent(section?: string) {
  const [content, setContent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchContent = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/cms/content')
      const result = await response.json()
      
      if (result.success) {
        if (section) {
          setContent(result.data[section] || null)
        } else {
          setContent(result.data)
        }
        setError(null)
      } else {
        setError('Failed to load content')
      }
    } catch (err) {
      setError('Failed to load content')
    } finally {
      setLoading(false)
    }
  }, [section])

  useEffect(() => {
    fetchContent()
  }, [fetchContent])

  const updateContent = async (newContent: HomepageContent) => {
    try {
      const response = await fetch('/api/cms/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContent),
      })
      
      const result = await response.json()
      
      if (result.success) {
        setContent(newContent)
        return true
      } else {
        setError('Failed to update content')
        return false
      }
    } catch (err) {
      setError('Failed to update content')
      return false
    }
  }

  const updateSection = async (sectionName: keyof HomepageContent, data: any) => {
    try {
      const response = await fetch('/api/cms/section', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ section: sectionName, data }),
      })
      
      const result = await response.json()
      
      if (result.success) {
        if (content) {
          setContent({
            ...content,
            [sectionName]: { ...content[sectionName], ...data }
          })
        }
        return true
      } else {
        setError('Failed to update section')
        return false
      }
    } catch (err) {
      setError('Failed to update section')
      return false
    }
  }

  return {
    content,
    loading,
    error,
    updateContent,
    updateSection,
    refetch: fetchContent
  }
}
