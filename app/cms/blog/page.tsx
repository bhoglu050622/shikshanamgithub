'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/cms/context/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Eye, 
  Trash2,
  Clock,
  User,
  Calendar,
  Tag
} from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  tags: string[]
  series?: string
  publishDate?: string
  createdAt: string
  updatedAt: string
  creator: {
    username: string
  }
  author?: {
    name: string
  }
}

export default function BlogPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  // Mock data for demonstration
  useEffect(() => {
    const mockPosts: BlogPost[] = [
      {
        id: '1',
        title: 'Introduction to Vedanta Philosophy',
        slug: 'introduction-to-vedanta-philosophy',
        excerpt: 'Explore the fundamental concepts of Vedanta and its relevance in modern life.',
        status: 'PUBLISHED',
        tags: ['vedanta', 'philosophy', 'spirituality'],
        series: 'Philosophy Basics',
        publishDate: '2024-01-15',
        createdAt: '2024-01-10T10:00:00Z',
        updatedAt: '2024-01-15T14:30:00Z',
        creator: { username: 'shikshanam' },
        author: { name: 'Dr. Priya Sharma' }
      },
      {
        id: '2',
        title: 'Sanskrit Learning Tips for Beginners',
        slug: 'sanskrit-learning-tips-beginners',
        excerpt: 'Practical advice for starting your Sanskrit learning journey.',
        status: 'DRAFT',
        tags: ['sanskrit', 'learning', 'beginners'],
        createdAt: '2024-01-12T09:00:00Z',
        updatedAt: '2024-01-12T16:45:00Z',
        creator: { username: 'shikshanam' },
        author: { name: 'Prof. Rajesh Kumar' }
      },
      {
        id: '3',
        title: 'The Power of Meditation in Daily Life',
        slug: 'power-of-meditation-daily-life',
        excerpt: 'How ancient meditation practices can transform your modern lifestyle.',
        status: 'PUBLISHED',
        tags: ['meditation', 'lifestyle', 'wellness'],
        series: 'Mindful Living',
        publishDate: '2024-01-08',
        createdAt: '2024-01-05T11:00:00Z',
        updatedAt: '2024-01-08T13:20:00Z',
        creator: { username: 'shikshanam' },
        author: { name: 'Swami Ananda' }
      }
    ]

    // Simulate API call
    setTimeout(() => {
      setPosts(mockPosts)
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PUBLISHED': return 'bg-green-100 text-green-800'
      case 'DRAFT': return 'bg-yellow-100 text-yellow-800'
      case 'ARCHIVED': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredPosts = posts.filter(post => {
    const matchesSearch = search === '' || 
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(search.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-gray-600">Manage your blog content and articles</p>
        </div>
        <Button 
          className="bg-orange-600 hover:bg-orange-700"
          onClick={() => router.push('/cms/blog/new')}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search blog posts..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="DRAFT">Draft</SelectItem>
                <SelectItem value="PUBLISHED">Published</SelectItem>
                <SelectItem value="ARCHIVED">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Blog Posts */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredPosts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts found</h3>
            <p className="text-gray-600 text-center mb-4">
              {search || statusFilter !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Get started by writing your first blog post'
              }
            </p>
            <Button 
              className="bg-orange-600 hover:bg-orange-700"
              onClick={() => router.push('/cms/blog/new')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Write Post
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-1">
                      {post.title}
                    </CardTitle>
                    {post.excerpt && (
                      <CardDescription className="line-clamp-2 mt-2">
                        {post.excerpt}
                      </CardDescription>
                    )}
                  </div>
                  <Badge className={getStatusColor(post.status)}>
                    {post.status}
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                  {post.series && (
                    <Badge variant="secondary" className="text-xs">
                      Series: {post.series}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <User className="w-3 h-3 mr-1" />
                      {post.author?.name || post.creator.username}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {post.publishDate ? 
                        `Published ${new Date(post.publishDate).toLocaleDateString()}` :
                        `Created ${new Date(post.createdAt).toLocaleDateString()}`
                      }
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Preview
                  </Button>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => router.push(`/cms/blog/${post.id}/edit`)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    {user?.role === 'ADMIN' && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-600 hover:text-red-700"
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this blog post?')) {
                            console.log('Delete post:', post.id)
                          }
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
