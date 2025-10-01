'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
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
  RefreshCw,
  Eye,
  Edit,
  ExternalLink,
  Calendar
} from 'lucide-react';
import { ContentRegistry } from '@/lib/cms/content-registry';
// Import ContentEditModal component
import ContentEditModal from './ContentEditModal';
// import SimpleTestModal from './SimpleTestModal';

interface ContentTypeStatus {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'coming-soon' | 'deprecated';
  category: string;
  features: string[];
  sections: string[];
  lastUpdated?: Date;
  isLoaded?: boolean;
}

export default function CategoryBasedCMS() {
  const [contentTypes, setContentTypes] = useState<ContentTypeStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContent, setSelectedContent] = useState<ContentTypeStatus | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadContentTypes();
  }, []);

  const loadContentTypes = () => {
    setLoading(true);
    try {
      console.log('CategoryBasedCMS: Starting to load content types');
      
      // Try to use ContentRegistry first
      let navigationStructure;
      try {
        if (!ContentRegistry) {
          throw new Error('ContentRegistry is not available');
        }
        
        console.log('CategoryBasedCMS: ContentRegistry found, calling getNavigationStructure');
        navigationStructure = ContentRegistry.getNavigationStructure();
        console.log('CategoryBasedCMS: Navigation structure received:', navigationStructure);
        
        if (!navigationStructure || !Array.isArray(navigationStructure)) {
          throw new Error('Invalid navigation structure received');
        }
      } catch (registryError) {
        console.warn('CategoryBasedCMS: ContentRegistry failed, using fallback:', registryError);
        
        // Fallback: Create a simple structure
        navigationStructure = [
          {
            id: 'main',
            title: 'Main Pages',
            items: [
              { id: 'homepage', title: 'Homepage', description: 'Main homepage content', status: 'active', features: [], sections: [] },
              { id: 'about', title: 'About', description: 'About page content', status: 'active', features: [], sections: [] },
              { id: 'contact', title: 'Contact', description: 'Contact page content', status: 'active', features: [], sections: [] }
            ]
          },
          {
            id: 'education',
            title: 'Education',
            items: [
              { id: 'sanskrit-course', title: 'Sanskrit Course', description: 'Sanskrit language course', status: 'active', features: [], sections: [] },
              { id: 'blog', title: 'Blog Posts', description: 'Blog content management', status: 'coming-soon', features: [], sections: [] }
            ]
          }
        ];
      }
      
      const allContentTypes: ContentTypeStatus[] = [];
      
      navigationStructure.forEach(category => {
        if (!category || !category.items) {
          console.warn('CategoryBasedCMS: Invalid category structure:', category);
          return;
        }
        
        category.items.forEach(item => {
          if (!item || !item.id) {
            console.warn('CategoryBasedCMS: Invalid item structure:', item);
            return;
          }
          
          allContentTypes.push({
            id: item.id,
            name: item.title || 'Untitled',
            description: item.description || 'No description',
            status: (item.status as 'active' | 'coming-soon' | 'deprecated') || 'active',
            category: category.id || 'unknown',
            features: item.features || [],
            sections: item.sections || [],
            isLoaded: false
          });
        });
      });
      
      console.log('CategoryBasedCMS: Processed content types:', allContentTypes);
      setContentTypes(allContentTypes);
    } catch (error) {
      console.error('CategoryBasedCMS: Failed to load content types:', error);
      // Set a fallback to prevent infinite loading
      setContentTypes([]);
    } finally {
      console.log('CategoryBasedCMS: Setting loading to false');
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    try {
      loadContentTypes();
      // Simulate a small delay to show refresh animation
      setTimeout(() => {
        setRefreshing(false);
      }, 1000);
    } catch (error) {
      console.error('Failed to refresh:', error);
      setRefreshing(false);
    }
  };

  const handleEditContent = (contentType: ContentTypeStatus) => {
    setSelectedContent(contentType);
    setIsModalOpen(true);
  };

  const handlePreview = (contentType: ContentTypeStatus) => {
    const frontendPath = ContentRegistry.getFrontendPath(contentType.id);
    if (frontendPath) {
      window.open(frontendPath, '_blank');
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      main: Home,
      education: School,
      content: FileText,
      system: Settings
    };
    return icons[category as keyof typeof icons] || FileText;
  };

  const getContentIcon = (id: string) => {
    const icons: Record<string, any> = {
      homepage: Home,
      donation: Heart,
      about: Users,
      contact: Mail,
      schools: School,
      'sanskrit-school': BookOpen,
      'darshana-school': Brain,
      'self-help-school': GraduationCap,
      blog: FileText,
      events: Calendar,
      'enhanced-homepage': Settings
    };
    return icons[id] || FileText;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      'coming-soon': 'bg-yellow-100 text-yellow-800',
      deprecated: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading CMS...</p>
        </div>
      </div>
    );
  }

  const categories = ['main', 'education', 'content', 'system'];
  const categoryTitles = {
    main: 'Main Pages',
    education: 'Education',
    content: 'Content Management',
    system: 'System'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Content Management System</h1>
              <p className="text-slate-600 mt-2">Manage all your website content from one place</p>
            </div>
            <Button 
              onClick={handleRefresh} 
              disabled={refreshing}
              className="bg-saffron-600 hover:bg-saffron-700 text-white"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
          </div>
        </div>

        {/* Categories */}
        {categories.map(category => {
          const categoryContentTypes = contentTypes.filter(ct => ct.category === category);
          if (categoryContentTypes.length === 0) return null;

          const CategoryIcon = getCategoryIcon(category);
          
          return (
            <div key={category} className="mb-12">
              <div className="flex items-center mb-6">
                <CategoryIcon className="w-6 h-6 text-saffron-600 mr-3" />
                <h2 className="text-2xl font-semibold text-slate-800">
                  {categoryTitles[category as keyof typeof categoryTitles]}
                </h2>
                <Badge variant="secondary" className="ml-3">
                  {categoryContentTypes.length} items
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryContentTypes.map(contentType => {
                  const ContentIcon = getContentIcon(contentType.id);
                  
                  return (
                    <Card 
                      key={contentType.id} 
                      className="hover:shadow-lg transition-all duration-200 border border-slate-200 hover:border-saffron-300"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-saffron-50 rounded-lg">
                              <ContentIcon className="w-5 h-5 text-saffron-600" />
                            </div>
                            <div>
                              <CardTitle className="text-lg text-slate-800">
                                {contentType.name}
                              </CardTitle>
                              <Badge 
                                className={`text-xs ${getStatusColor(contentType.status)}`}
                              >
                                {contentType.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="pt-0">
                        <CardDescription className="text-slate-600 mb-4">
                          {contentType.description}
                        </CardDescription>
                        
                        <div className="space-y-3">
                          <div className="flex flex-wrap gap-1">
                            {contentType.features.slice(0, 3).map(feature => (
                              <Badge key={feature} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                            {contentType.features.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{contentType.features.length - 3} more
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex space-x-2">
                            {contentType.status === 'active' && (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => handleEditContent(contentType)}
                                  className="flex-1 bg-saffron-600 hover:bg-saffron-700 text-white"
                                >
                                  <Edit className="w-4 h-4 mr-1" />
                                  Edit
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handlePreview(contentType)}
                                  className="flex-1"
                                >
                                  <Eye className="w-4 h-4 mr-1" />
                                  Preview
                                </Button>
                              </>
                            )}
                            {contentType.status === 'coming-soon' && (
                              <Button
                                size="sm"
                                variant="outline"
                                disabled
                                className="flex-1"
                              >
                                Coming Soon
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Modal */}
      {selectedContent && (
        <ContentEditModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedContent(null);
          }}
          contentType={selectedContent}
          onRefresh={handleRefresh}
        />
      )}
    </div>
  );
}
