'use client'

import { useState, useEffect, useCallback } from 'react'
import { HomepageContent } from './types'
import { API_CONFIG, logApiCall } from '@/lib/config/api'

export function useCMSContent(section?: string) {
  const [content, setContent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchContent = useCallback(async () => {
    try {
      setLoading(true)
      const apiUrl = API_CONFIG.getCmsApiUrl('content')
      logApiCall(apiUrl, 'GET')
      
      const response = await fetch(apiUrl)
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
      console.error('CMS fetch error:', err)
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
      const apiUrl = API_CONFIG.getCmsApiUrl('content')
      logApiCall(apiUrl, 'PUT')
      
      const response = await fetch(apiUrl, {
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
      console.error('CMS update error:', err)
      setError('Failed to update content')
      return false
    }
  }

  const updateSection = async (sectionName: keyof HomepageContent, data: any) => {
    try {
      const apiUrl = API_CONFIG.getCmsApiUrl('section')
      logApiCall(apiUrl, 'PUT')
      
      const response = await fetch(apiUrl, {
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
      console.error('CMS section update error:', err)
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

// Generic CMS hook for different content types
export function useGenericCMSContent<T>(endpoint: string) {
  const [content, setContent] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchContent = useCallback(async () => {
    try {
      setLoading(true)
      const apiUrl = API_CONFIG.getApiUrl(endpoint)
      logApiCall(apiUrl, 'GET')
      
      const response = await fetch(apiUrl)
      const result = await response.json()
      
      if (result.success) {
        setContent(result.data)
        setError(null)
      } else {
        setError('Failed to load content')
      }
    } catch (err) {
      console.error(`CMS fetch error for ${endpoint}:`, err)
      setError('Failed to load content')
    } finally {
      setLoading(false)
    }
  }, [endpoint])

  useEffect(() => {
    fetchContent()
  }, [fetchContent])

  const updateContent = async (newContent: T) => {
    try {
      const apiUrl = API_CONFIG.getApiUrl(endpoint)
      logApiCall(apiUrl, 'PUT')
      
      const response = await fetch(apiUrl, {
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
      console.error(`CMS update error for ${endpoint}:`, err)
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
