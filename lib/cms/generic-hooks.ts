'use client'

import { useState, useEffect, useCallback } from 'react'

export function useGenericCMSContent<T>(apiEndpoint: string) {
  const [content, setContent] = useState<T | null>(null)
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
        setError(result.error || 'Failed to load content')
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load content')
    } finally {
      setLoading(false)
    }
  }, [apiEndpoint])

  useEffect(() => {
    fetchContent()
  }, [fetchContent])

  const updateContent = async (newContent: T) => {
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
        setError(result.error || 'Failed to update content')
        return false
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update content')
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
