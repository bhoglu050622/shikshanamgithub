'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Eye, 
  Edit, 
  ExternalLink,
  FileText,
  Code,
  Image,
  Database,
  Globe,
  Clock,
  TrendingUp,
  Star,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface SearchResult {
  id: string;
  type: 'page' | 'component' | 'data' | 'asset';
  name: string;
  path: string;
  description: string;
  category: string;
  status: 'published' | 'draft' | 'archived';
  lastModified: Date;
  relevance: number;
  tags: string[];
  content?: string;
}

interface GlobalContentSearchProps {
  onResultClick?: (result: SearchResult) => void;
  onEditClick?: (result: SearchResult) => void;
  onPreviewClick?: (result: SearchResult) => void;
}

export default function GlobalContentSearch({ 
  onResultClick, 
  onEditClick, 
  onPreviewClick 
}: GlobalContentSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    category: 'all',
    sortBy: 'relevance'
  });
  const [expandedResults, setExpandedResults] = useState<Set<string>>(new Set());

  // Mock search results - in real implementation, this would come from API
  const allContent: SearchResult[] = useMemo(() => [
    {
      id: 'homepage',
      type: 'page',
      name: 'Homepage',
      path: '/',
      description: 'Main homepage content and sections',
      category: 'main',
      status: 'published',
      lastModified: new Date('2024-01-15'),
      relevance: 95,
      tags: ['homepage', 'landing', 'hero', 'sections'],
      content: 'Welcome to Shikshanam Singham, Where AI meets Ancient India'
    },
    {
      id: 'about',
      type: 'page',
      name: 'About Page',
      path: '/about',
      description: 'About page content and company information',
      category: 'main',
      status: 'published',
      lastModified: new Date('2024-01-10'),
      relevance: 88,
      tags: ['about', 'company', 'mission', 'values'],
      content: 'Learn about Shikshanam\'s mission to preserve and share ancient Indian knowledge'
    },
    {
      id: 'hero-component',
      type: 'component',
      name: 'Hero Component',
      path: '/components/sections/Hero.tsx',
      description: 'Main hero banner component',
      category: 'components',
      status: 'published',
      lastModified: new Date('2024-01-12'),
      relevance: 92,
      tags: ['hero', 'banner', 'component', 'sections'],
      content: 'Hero section with title, subtitle, and call-to-action buttons'
    },
    {
      id: 'schools-data',
      type: 'data',
      name: 'Schools Data',
      path: '/data/schools-content.json',
      description: 'School data and content',
      category: 'data',
      status: 'published',
      lastModified: new Date('2024-01-14'),
      relevance: 85,
      tags: ['schools', 'data', 'content', 'education'],
      content: 'Data for Sanskrit School, Darshana School, and Self-Help School'
    },
    {
      id: 'logo-asset',
      type: 'asset',
      name: 'Logo',
      path: '/public/assets/logo.svg',
      description: 'Main brand logo',
      category: 'assets',
      status: 'published',
      lastModified: new Date('2024-01-08'),
      relevance: 78,
      tags: ['logo', 'branding', 'asset', 'svg'],
      content: 'Shikshanam brand logo in SVG format'
    }
  ], []);

  const performSearch = useCallback(async (term: string) => {
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const results = allContent.filter(item => {
      const searchLower = term.toLowerCase();
      const matchesName = item.name.toLowerCase().includes(searchLower);
      const matchesDescription = item.description.toLowerCase().includes(searchLower);
      const matchesTags = item.tags.some(tag => tag.toLowerCase().includes(searchLower));
      const matchesContent = item.content?.toLowerCase().includes(searchLower);
      
      return matchesName || matchesDescription || matchesTags || matchesContent;
    }).map(item => ({
      ...item,
      relevance: calculateRelevance(item, term)
    }));

    // Apply filters
    const filteredResults = results.filter(item => {
      const typeMatch = filters.type === 'all' || item.type === filters.type;
      const statusMatch = filters.status === 'all' || item.status === filters.status;
      const categoryMatch = filters.category === 'all' || item.category === filters.category;
      
      return typeMatch && statusMatch && categoryMatch;
    });

    // Sort results
    const sortedResults = filteredResults.sort((a, b) => {
      switch (filters.sortBy) {
        case 'relevance':
          return b.relevance - a.relevance;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'modified':
          return b.lastModified.getTime() - a.lastModified.getTime();
        default:
          return b.relevance - a.relevance;
      }
    });

    setSearchResults(sortedResults);
    setIsSearching(false);
  }, [filters, allContent]);

  const calculateRelevance = (item: SearchResult, term: string): number => {
    const searchLower = term.toLowerCase();
    let score = 0;
    
    if (item.name.toLowerCase().includes(searchLower)) score += 30;
    if (item.description.toLowerCase().includes(searchLower)) score += 20;
    if (item.tags.some(tag => tag.toLowerCase().includes(searchLower))) score += 15;
    if (item.content?.toLowerCase().includes(searchLower)) score += 10;
    
    return Math.min(score, 100);
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

  const toggleExpanded = (id: string) => {
    setExpandedResults(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, filters, performSearch]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Search Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Global Content Search</h2>
            <p className="text-gray-600">Search across all content, components, and assets</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search content, components, data, assets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-10 bg-white border-gray-200 focus:ring-2 focus:ring-blue-500"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="page">Pages</option>
                  <option value="component">Components</option>
                  <option value="data">Data</option>
                  <option value="asset">Assets</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Categories</option>
                  <option value="main">Main</option>
                  <option value="components">Components</option>
                  <option value="data">Data</option>
                  <option value="assets">Assets</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="relevance">Relevance</option>
                  <option value="name">Name</option>
                  <option value="modified">Last Modified</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search Results */}
      <div className="space-y-4">
        {isSearching && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Searching content...</p>
          </div>
        )}

        {!isSearching && searchResults.length === 0 && searchTerm && (
          <div className="text-center py-8">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters</p>
          </div>
        )}

        {!isSearching && searchTerm && searchResults.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchTerm}"
            </p>
          </div>
        )}

        {searchResults.map((result) => {
          const TypeIcon = getTypeIcon(result.type);
          const isExpanded = expandedResults.has(result.id);
          
          return (
            <Card key={result.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <TypeIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{result.name}</h3>
                        <Badge className={`text-xs ${getStatusColor(result.status)}`}>
                          {result.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {result.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{result.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Globe className="w-3 h-3" />
                          <span>{result.path}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{result.lastModified.toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-3 h-3" />
                          <span>{result.relevance}% match</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpanded(result.id)}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {isExpanded && (
                <CardContent className="pt-0">
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Content Preview:</h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      {result.content || 'No content preview available'}
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Tags:</h4>
                    <div className="flex flex-wrap gap-1">
                      {result.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        onClick={() => onEditClick?.(result)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onPreviewClick?.(result)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(result.path, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </div>
                    <div className="text-xs text-gray-500">
                      {result.category} • {result.type}
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
