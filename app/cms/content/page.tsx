'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/cms/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Copy,
  Calendar,
  User,
  Globe,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
} from 'lucide-react'

interface ContentItem {
  id: string
  title: string
  type: 'page' | 'post' | 'product' | 'collection' | 'landing'
  status: 'draft' | 'published' | 'scheduled' | 'archived'
  author: string
  updated: string
  published?: string
  locale: string
  tags: string[]
  previewUrl?: string
}

const mockContent: ContentItem[] = [
  {
    id: '1',
    title: 'Introduction to Sanskrit Grammar',
    type: 'page',
    status: 'published',
    author: 'Dr. Priya Sharma',
    updated: '2024-01-15T10:30:00Z',
    published: '2024-01-10T09:00:00Z',
    locale: 'en',
    tags: ['grammar', 'sanskrit', 'beginner'],
    previewUrl: '/courses/sanskrit-grammar'
  },
  {
    id: '2',
    title: 'Advanced Yoga Philosophy',
    type: 'post',
    status: 'draft',
    author: 'Rajesh Kumar',
    updated: '2024-01-14T15:45:00Z',
    locale: 'en',
    tags: ['yoga', 'philosophy', 'advanced']
  },
  {
    id: '3',
    title: 'Sanskrit Learning Package',
    type: 'product',
    status: 'scheduled',
    author: 'Meera Patel',
    updated: '2024-01-13T12:20:00Z',
    published: '2024-01-20T08:00:00Z',
    locale: 'en',
    tags: ['package', 'sanskrit', 'premium']
  },
  {
    id: '4',
    title: 'Vedic Wisdom Collection',
    type: 'collection',
    status: 'published',
    author: 'Dr. Ananda',
    updated: '2024-01-12T14:15:00Z',
    published: '2024-01-08T10:00:00Z',
    locale: 'en',
    tags: ['vedic', 'wisdom', 'collection'],
    previewUrl: '/collections/vedic-wisdom'
  }
]

export default function ContentPage() {
  const { user } = useAuth()
  const [content, setContent] = useState<ContentItem[]>(mockContent)
  const [filteredContent, setFilteredContent] = useState<ContentItem[]>(mockContent)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [authorFilter, setAuthorFilter] = useState<string>('all')

  // Filter content based on search and filters
  useEffect(() => {
    let filtered = content

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.status === statusFilter)
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(item => item.type === typeFilter)
    }

    if (authorFilter !== 'all') {
      filtered = filtered.filter(item => item.author === authorFilter)
    }

    setFilteredContent(filtered)
  }, [content, searchTerm, statusFilter, typeFilter, authorFilter])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'draft': return <Edit className="w-4 h-4 text-yellow-500" />
      case 'scheduled': return <Calendar className="w-4 h-4 text-blue-500" />
      case 'archived': return <XCircle className="w-4 h-4 text-gray-500" />
      default: return <AlertCircle className="w-4 h-4 text-orange-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      published: 'bg-green-100 text-green-800',
      draft: 'bg-yellow-100 text-yellow-800',
      scheduled: 'bg-blue-100 text-blue-800',
      archived: 'bg-gray-100 text-gray-800'
    }
    return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800'
  }

  const getTypeBadge = (type: string) => {
    const variants = {
      page: 'bg-blue-100 text-blue-800',
      post: 'bg-purple-100 text-purple-800',
      product: 'bg-green-100 text-green-800',
      collection: 'bg-orange-100 text-orange-800',
      landing: 'bg-pink-100 text-pink-800'
    }
    return variants[type as keyof typeof variants] || 'bg-gray-100 text-gray-800'
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(filteredContent.map(item => item.id))
    } else {
      setSelectedItems([])
    }
  }

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id])
    } else {
      setSelectedItems(selectedItems.filter(item => item !== id))
    }
  }

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} on items:`, selectedItems)
    // Implement bulk actions
  }

  const uniqueAuthors = [...new Set(content.map(item => item.author))]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
          <p className="text-gray-600">Manage all your content types and publishing workflows</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Content
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Content Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="page">Pages</SelectItem>
                <SelectItem value="post">Posts</SelectItem>
                <SelectItem value="product">Products</SelectItem>
                <SelectItem value="collection">Collections</SelectItem>
                <SelectItem value="landing">Landing Pages</SelectItem>
              </SelectContent>
            </Select>

            <Select value={authorFilter} onValueChange={setAuthorFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Author" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Authors</SelectItem>
                {uniqueAuthors.map(author => (
                  <SelectItem key={author} value={author}>{author}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2">
              <Badge variant="outline">
                {filteredContent.length} items
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {selectedItems.length} item(s) selected
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction('publish')}
                >
                  Publish
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction('unpublish')}
                >
                  Unpublish
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction('delete')}
                >
                  Delete
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction('export')}
                >
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Content Table */}
      <Card>
        <CardHeader>
          <CardTitle>Content Library</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedItems.length === filteredContent.length && filteredContent.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead>Locale</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContent.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-gray-500 flex items-center space-x-2">
                        {item.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTypeBadge(item.type)}>
                      {item.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(item.status)}
                      <Badge className={getStatusBadge(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span>{item.author}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">
                        {new Date(item.updated).toLocaleDateString()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <span className="text-sm uppercase">{item.locale}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="w-4 h-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
