'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { formatDateLong } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Plus, 
  Settings, 
  Eye, 
  Edit, 
  Trash2, 
  Copy, 
  ExternalLink,
  RefreshCw,
  Zap,
  Palette,
  Code,
  Image,
  Video,
  Link,
  Type,
  Layout,
  BarChart3,
  Clock,
  Star,
  TrendingUp,
  Users,
  Globe,
  Shield,
  ArrowRight,
  ChevronDown,
  MoreHorizontal,
  BookOpen,
  GraduationCap,
  Heart,
  DollarSign,
  MessageSquare,
  FileText,
  Package,
  Target,
  Lightbulb,
  CheckCircle,
  AlertCircle,
  Info,
  Database,
  Network,
  Cpu,
  MemoryStick,
  HardDrive,
  Cloud,
  Wifi,
  Smartphone,
  Monitor,
  Tablet,
  Laptop,
  Server,
  Router,
  ToggleLeft,
  Circle,
  Cable,
  Plug,
  Battery,
  Power,
  Zap as Lightning,
  Sparkles,
  Wand2,
  Brain,
  Cpu as Processor,
  MemoryStick as Ram,
  HardDrive as Storage,
  Cloud as CloudIcon,
  Wifi as WifiIcon,
  Smartphone as Phone,
  Monitor as Screen,
  Tablet as TabletIcon,
  Laptop as LaptopIcon,
  Monitor as DesktopIcon,
  Server as ServerIcon,
  Router as RouterIcon,
  ToggleLeft as SwitchIcon,
  Circle as HubIcon,
  Cable as CableIcon,
  Plug as PlugIcon,
  Battery as BatteryIcon,
  Power as PowerIcon,
  Zap as LightningIcon,
  Sparkles as SparklesIcon,
  Wand2 as Wand2Icon,
  Sparkles as MagicIcon,
  Brain as BrainIcon
} from 'lucide-react';

interface SmartContentManagerProps {
  onContentUpdate?: (content: any) => void;
  onContentSync?: (content: any) => void;
  onContentPublish?: (content: any) => void;
}

interface ContentItem {
  id: string;
  type: 'page' | 'component' | 'data' | 'asset';
  name: string;
  path: string;
  status: 'draft' | 'published' | 'archived';
  lastModified: Date;
  size: number;
  dependencies: string[];
  usage: number;
  tags: string[];
  metadata: any;
}

export default function SmartContentManager({ 
  onContentUpdate, 
  onContentSync, 
  onContentPublish 
}: SmartContentManagerProps) {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'modified' | 'size' | 'usage'>('name');
  const [showDependencies, setShowDependencies] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const [publishStatus, setPublishStatus] = useState<'idle' | 'publishing' | 'success' | 'error'>('idle');
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Load content items from Next.js frontend
  useEffect(() => {
    loadContentItems();
  }, []);

  const loadContentItems = async () => {
    try {
      // Load real content from CMS API
      const response = await fetch('/api/cms/content');
      if (!response.ok) {
        throw new Error('Failed to fetch content items');
      }
      
      const data = await response.json();
      const contentItems: ContentItem[] = data.contentTypes || [];
      
      // Transform API data to ContentItem format
      const transformedItems: ContentItem[] = contentItems.map((item: any) => ({
        id: item.id,
        type: item.type || 'page',
        name: item.name,
        path: `/${item.id}`,
        status: item.status || 'published',
        lastModified: new Date(item.lastModified),
        size: item.size || 0,
        dependencies: item.dependencies || [],
        usage: item.usage || 0,
        tags: item.tags || [],
        metadata: item.metadata || { title: item.name, description: '' }
      }));
      
      setContentItems(transformedItems);
      setLoading(false);
    } catch (error) {
      console.error('Error loading content items:', error);
      setLoading(false);
    }
  };

  const syncWithFrontend = async () => {
    setSyncStatus('syncing');
    try {
      // Sync with real frontend data
      const response = await fetch('/api/cms/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contentItems })
      });
      
      if (!response.ok) {
        throw new Error('Failed to sync with frontend');
      }
      
      const result = await response.json();
      setSyncStatus('success');
      
      if (onContentSync) {
        onContentSync(contentItems);
      }
    } catch (error) {
      setSyncStatus('error');
      console.error('Error syncing with frontend:', error);
    }
  };

  const publishContent = async () => {
    setPublishStatus('publishing');
    try {
      // Publish content to production
      const response = await fetch('/api/cms/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contentItems })
      });
      
      if (!response.ok) {
        throw new Error('Failed to publish content');
      }
      
      const result = await response.json();
      setPublishStatus('success');
      
      if (onContentPublish) {
        onContentPublish(contentItems);
      }
    } catch (error) {
      setPublishStatus('error');
      console.error('Error publishing content:', error);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'page': return FileText;
      case 'component': return Code;
      case 'data': return Database;
      case 'asset': return Image;
      default: return FileText;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800 border-green-200';
      case 'draft': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'archived': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const filteredItems = contentItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'modified':
        return b.lastModified.getTime() - a.lastModified.getTime();
      case 'size':
        return b.size - a.size;
      case 'usage':
        return b.usage - a.usage;
      default:
        return 0;
    }
  });

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl">
              <Brain className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Smart Content Manager
              </h1>
              <p className="text-gray-600 mt-1">
                Intelligent content management with Next.js integration
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowAnalytics(!showAnalytics)}
              className="bg-white/80 backdrop-blur-sm"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </Button>
            <Button
              variant="outline"
              onClick={syncWithFrontend}
              disabled={syncStatus === 'syncing'}
              className="bg-white/80 backdrop-blur-sm"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
              {syncStatus === 'syncing' ? 'Syncing...' : 'Sync Frontend'}
            </Button>
            <Button
              onClick={publishContent}
              disabled={publishStatus === 'publishing'}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              <Zap className="w-4 h-4 mr-2" />
              {publishStatus === 'publishing' ? 'Publishing...' : 'Publish All'}
            </Button>
          </div>
        </div>
      </div>

      {/* Analytics Panel */}
      {showAnalytics && (
        <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Content Analytics</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Total Items</p>
                  <p className="text-2xl font-bold text-blue-900">{contentItems.length}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Published</p>
                  <p className="text-2xl font-bold text-green-900">
                    {contentItems.filter(c => c.status === 'published').length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-600">Drafts</p>
                  <p className="text-2xl font-bold text-yellow-900">
                    {contentItems.filter(c => c.status === 'draft').length}
                  </p>
                </div>
                <AlertCircle className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Total Usage</p>
                  <p className="text-2xl font-bold text-purple-900">
                    {contentItems.reduce((sum, c) => sum + c.usage, 0)}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-1 items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/80 backdrop-blur-sm border-gray-200 focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Types</option>
              <option value="page">Pages</option>
              <option value="component">Components</option>
              <option value="data">Data</option>
              <option value="asset">Assets</option>
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 p-1">
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="px-3"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="px-3"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
            >
              <option value="name">Sort by Name</option>
              <option value="modified">Sort by Modified</option>
              <option value="size">Sort by Size</option>
              <option value="usage">Sort by Usage</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content Grid/List */}
      <div className={viewMode === 'grid' 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
        : "space-y-4"
      }>
        {sortedItems.map(item => {
          const TypeIcon = getTypeIcon(item.type);
          
          return (
            <Card key={item.id} className="bg-white/80 backdrop-blur-sm border-gray-200 hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
                      <TypeIcon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                        {item.name}
                      </CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={`text-xs ${getStatusColor(item.status)}`}>
                          {item.status}
                        </Badge>
                        <span className="text-xs text-gray-500 capitalize">
                          {item.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedItems(prev => 
                        prev.includes(item.id) 
                          ? prev.filter(id => id !== item.id)
                          : [...prev, item.id]
                      )}
                      className={`opacity-0 group-hover:opacity-100 transition-opacity ${
                        selectedItems.includes(item.id) ? 'bg-purple-100 text-purple-600' : ''
                      }`}
                    >
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="text-sm text-gray-600 mb-4">
                  <p className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                    {item.path}
                  </p>
                </div>
                
                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <HardDrive className="w-4 h-4" />
                      <span>{formatFileSize(item.size)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-4 h-4" />
                      <span>{item.usage} uses</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatDateLong(item.lastModified)}</span>
                  </div>
                </div>

                {/* Dependencies */}
                {item.dependencies.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-medium text-gray-700 mb-2">Dependencies:</p>
                    <div className="flex flex-wrap gap-1">
                      {item.dependencies.slice(0, 3).map(dep => (
                        <Badge key={dep} variant="outline" className="text-xs">
                          {dep}
                        </Badge>
                      ))}
                      {item.dependencies.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{item.dependencies.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {item.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {item.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{item.tags.length - 3} more
                    </Badge>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-gray-50"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {sortedItems.length === 0 && (
        <div className="text-center py-12">
          <div className="p-4 bg-white/80 backdrop-blur-sm rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No content found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search terms or filters to find what you're looking for.
          </p>
          <Button
            onClick={() => {
              setSearchTerm('');
              setFilterType('all');
              setFilterStatus('all');
            }}
            variant="outline"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
