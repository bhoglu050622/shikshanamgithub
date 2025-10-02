'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Globe, 
  Home, 
  Heart, 
  Users, 
  Mail, 
  School, 
  BookOpen, 
  Brain, 
  GraduationCap,
  FileText,
  Settings,
  LayoutDashboard,
  BarChart3,
  Database,
  RefreshCw
} from 'lucide-react';
import { ContentRegistry } from '@/lib/cms/content-registry';

interface ContentTypeStatus {
  id: string;
  name: string;
  status: 'active' | 'loading' | 'error';
  lastUpdated?: Date;
  sections: number;
  features: string[];
}

export default function UniversalCMSDashboard() {
  const [contentTypes, setContentTypes] = useState<ContentTypeStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalContentTypes: 0,
    activeContentTypes: 0,
    comingSoonTypes: 0,
    totalSections: 0
  });

  useEffect(() => {
    loadContentTypes();
  }, []);

  const loadContentTypes = async () => {
    setLoading(true);
    try {
      // Get all content types from registry
      const allContentTypes = ContentRegistry.getAllContentTypes();
      
      const contentTypeStatuses: ContentTypeStatus[] = allContentTypes.map(contentType => ({
        id: contentType.id,
        name: contentType.name,
        status: contentType.status === 'active' ? 'active' : 'loading',
        lastUpdated: new Date(),
        sections: contentType.sections.length,
        features: contentType.features
      }));

      setContentTypes(contentTypeStatuses);
      
      // Calculate stats
      setStats({
        totalContentTypes: allContentTypes.length,
        activeContentTypes: allContentTypes.filter(ct => ct.status === 'active').length,
        comingSoonTypes: allContentTypes.filter(ct => ct.status === 'coming-soon').length,
        totalSections: allContentTypes.reduce((sum, ct) => sum + ct.sections.length, 0)
      });
    } catch (error) {
      console.error('Error loading content types:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'loading': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return '✓';
      case 'loading': return '⏳';
      case 'error': return '✗';
      default: return '?';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'main': return <Globe className="w-4 h-4" />;
      case 'education': return <School className="w-4 h-4" />;
      case 'content': return <FileText className="w-4 h-4" />;
      case 'system': return <Settings className="w-4 h-4" />;
      default: return <Database className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-saffron-600" />
          <p className="text-muted-foreground">Loading CMS dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Universal CMS Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage all content types across the Shikshanam platform
          </p>
        </div>
        <Button onClick={loadContentTypes} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Content Types</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalContentTypes}</div>
            <p className="text-xs text-muted-foreground">
              All content types in the system
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Content Types</CardTitle>
            <BarChart3 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.activeContentTypes}</div>
            <p className="text-xs text-muted-foreground">
              Ready for content management
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coming Soon</CardTitle>
            <RefreshCw className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.comingSoonTypes}</div>
            <p className="text-xs text-muted-foreground">
              In development
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sections</CardTitle>
            <LayoutDashboard className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.totalSections}</div>
            <p className="text-xs text-muted-foreground">
              Editable content sections
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Content Types Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="main">Main Pages</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contentTypes.map((contentType) => (
              <Card key={contentType.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{contentType.name}</CardTitle>
                    <Badge className={getStatusColor(contentType.status)}>
                      {getStatusIcon(contentType.status)} {contentType.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      {contentType.sections} sections
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <FileText className="w-4 h-4 mr-2" />
                      {contentType.features.length} features
                    </div>
                    {contentType.lastUpdated && (
                      <div className="text-xs text-muted-foreground">
                        Last updated: {contentType.lastUpdated.toISOString().split('T')[0]}
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <Link href={`/cms/${contentType.id}`}>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </Link>
                    <Link href={`/${contentType.id}`} target="_blank">
                      <Button size="sm" variant="outline">
                        Preview
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="main" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contentTypes
              .filter(ct => ['homepage', 'donation', 'about', 'contact'].includes(ct.id))
              .map((contentType) => (
                <Card key={contentType.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{contentType.name}</CardTitle>
                      <Badge className={getStatusColor(contentType.status)}>
                        {getStatusIcon(contentType.status)} {contentType.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        {contentType.sections} sections
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <FileText className="w-4 h-4 mr-2" />
                        {contentType.features.length} features
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <Link href={`/cms/${contentType.id}`}>
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      </Link>
                      <Link href={`/${contentType.id}`} target="_blank">
                        <Button size="sm" variant="outline">
                          Preview
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="education" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contentTypes
              .filter(ct => ['schools', 'sanskrit-school', 'darshana-school', 'self-help-school'].includes(ct.id))
              .map((contentType) => (
                <Card key={contentType.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{contentType.name}</CardTitle>
                      <Badge className={getStatusColor(contentType.status)}>
                        {getStatusIcon(contentType.status)} {contentType.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        {contentType.sections} sections
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <FileText className="w-4 h-4 mr-2" />
                        {contentType.features.length} features
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <Link href={`/cms/${contentType.id}`}>
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      </Link>
                      <Link href={`/${contentType.id}`} target="_blank">
                        <Button size="sm" variant="outline">
                          Preview
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="system" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contentTypes
              .filter(ct => ['dashboard', 'analytics'].includes(ct.id))
              .map((contentType) => (
                <Card key={contentType.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{contentType.name}</CardTitle>
                      <Badge className={getStatusColor(contentType.status)}>
                        {getStatusIcon(contentType.status)} {contentType.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        {contentType.sections} sections
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <FileText className="w-4 h-4 mr-2" />
                        {contentType.features.length} features
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <Link href={`/cms/${contentType.id}`}>
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      </Link>
                      <Link href={`/${contentType.id}`} target="_blank">
                        <Button size="sm" variant="outline">
                          Preview
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}