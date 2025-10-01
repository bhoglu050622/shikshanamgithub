'use client'

import { useState, useEffect, useCallback } from 'react'
import { SchoolPageContent } from './school-page-types'

export function useSchoolCMSContent(apiEndpoint: string) {
  const [content, setContent] = useState<SchoolPageContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchContent = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(apiEndpoint)
      const result = await response.json()
      
      if (result.success) {
        setContent(result.data)
        setError(null)
      } else {
        setError('Failed to load content')
      }
    } catch (err) {
      setError('Failed to load content')
    } finally {
      setLoading(false)
    }
  }, [apiEndpoint])

  useEffect(() => {
    fetchContent()
  }, [fetchContent])

  const updateContent = async (newContent: SchoolPageContent) => {
    try {
      const response = await fetch(apiEndpoint, {
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

  return {
    content,
    loading,
    error,
    updateContent,
    refetch: fetchContent
  }
}
