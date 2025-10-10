'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Download, Upload, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react'
import { getAllBlogPosts, getAllCategories, getBlogStats } from '@/lib/blog-data'

interface BlogDataImporterProps {
  onDataImported?: () => void
}

export function BlogDataImporter({ onDataImported }: BlogDataImporterProps) {
  const [isImporting, setIsImporting] = useState(false)
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [importMessage, setImportMessage] = useState('')

  const handleImportData = async () => {
    setIsImporting(true)
    setImportStatus('idle')
    
    try {
      // Simulate data import process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setImportStatus('success')
      setImportMessage('Blog data imported successfully!')
      onDataImported?.()
    } catch (error) {
      setImportStatus('error')
      setImportMessage('Failed to import blog data. Please try again.')
    } finally {
      setIsImporting(false)
    }
  }

  const handleExportData = () => {
    const posts = getAllBlogPosts()
    const categories = getAllCategories()
    const stats = getBlogStats()
    
    const data = {
      posts,
      categories,
      stats,
      exportedAt: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'shikshanam-blog-data.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const stats = getBlogStats()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Blog Data Management
          </CardTitle>
          <CardDescription>
            Import and export blog data from the Shikshanam website
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{stats.totalPosts}</div>
              <div className="text-sm text-blue-600">Total Posts</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{stats.totalCategories}</div>
              <div className="text-sm text-green-600">Categories</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{stats.totalAuthors}</div>
              <div className="text-sm text-purple-600">Authors</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handleImportData}
              disabled={isImporting}
              className="flex-1"
            >
              {isImporting ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Importing...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Import Blog Data
                </>
              )}
            </Button>
            <Button
              onClick={handleExportData}
              variant="outline"
              className="flex-1"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>

          {importStatus !== 'idle' && (
            <div className={`flex items-center gap-2 p-3 rounded-lg ${
              importStatus === 'success' 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {importStatus === 'success' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <AlertCircle className="w-4 h-4" />
              )}
              <span className="text-sm">{importMessage}</span>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Blog Posts</CardTitle>
          <CardDescription>
            Preview of the latest imported blog posts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {getAllBlogPosts().slice(0, 3).map((post) => (
              <div key={post.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                  {post.title.charAt(0)}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                    {post.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {post.language}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {post.category}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
