'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Edit, 
  Eye, 
  Trash2, 
  Package,
  Clock,
  Users,
  Star,
  DollarSign,
  ArrowLeft,
  Save,
  RefreshCw,
  Gift,
  Award,
  Shield,
  Code
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PackageEditor from '@/components/cms/PackageEditor';

interface Package {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  duration: string;
  level: string;
  rating: number;
  reviewCount: number;
  type: string;
  status: 'available' | 'coming-soon' | 'archived';
  checkoutLink: string;
  contactNumber: string;
  features: string[];
  featureDetails: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  benefits: string[];
  courses: number;
  courseList: Array<{
    id: string;
    title: string;
    description: string;
    duration: string;
    level: string;
  }>;
  testimonials: Array<{
    name: string;
    role: string;
    content: string;
    rating: number;
  }>;
  faq: Array<{
    question: string;
    answer: string;
  }>;
  requirements: string[];
  outcomes: string[];
  instructorBio: string;
  tags: string[];
  category: string;
  difficulty: string;
  language: string;
  subtitles: string[];
  certificate: boolean;
  lifetimeAccess: boolean;
  mobileFriendly: boolean;
  supportIncluded: boolean;
  liveSessions: boolean;
  communityAccess: boolean;
  bonusMaterials: boolean;
  moneyBackGuarantee: boolean;
  earlyBirdDiscount: boolean;
  groupDiscount: boolean;
  paymentPlans: Array<{
    name: string;
    price: string;
    duration: string;
    features: string[];
  }>;
  comparison: any[];
  lastModified: Date;
  views: number;
  popularity: number;
}

const defaultPackages: Package[] = [];

export default function PackagesCMSAdmin() {
  const router = useRouter();
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [showPackageEditor, setShowPackageEditor] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'modified' | 'popularity'>('name');
  const [filterStatus, setFilterStatus] = useState<'all' | 'available' | 'coming-soon' | 'archived'>('all');

  // Load packages from API
  const loadPackages = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/cms/packages?t=${Date.now()}`, {
        cache: 'no-cache',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      const result = await response.json();
      
      if (result.success && result.data) {
        console.log('Loaded packages:', result.data.length);
        setPackages(result.data);
      }
    } catch (error) {
      console.error('Error loading packages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPackages();
  }, []);

  const filteredPackages = packages
    .filter(pkg => {
      const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pkg.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || pkg.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title);
        case 'modified':
          return b.lastModified.getTime() - a.lastModified.getTime();
        case 'popularity':
          return b.popularity - a.popularity;
        default:
          return 0;
      }
    });

  const handleAddPackage = () => {
    setSelectedPackage(null);
    setShowPackageEditor(true);
  };

  const handleEditPackage = (pkg: Package) => {
    setSelectedPackage(pkg);
    setShowPackageEditor(true);
  };

  const handleUpdatePackage = (content: any) => {
    // Convert PackageContent features to Package features format
    const features = content.features?.map((feature: any) => 
      typeof feature === 'string' ? feature : feature.title || ''
    ) || [];
    
    const updatedPackage: Package = {
      ...content,
      id: selectedPackage?.id || `package-${Date.now()}`,
      features: features,
      courses: content.courses?.length || 0,
      courseList: content.courses || [],
      lastModified: new Date(),
      views: selectedPackage?.views || 0,
      popularity: selectedPackage?.popularity || 0
    };
    
    if (selectedPackage) {
      setPackages(packages.map(pkg => 
        pkg.id === updatedPackage.id ? updatedPackage : pkg
      ));
    } else {
      setPackages([...packages, updatedPackage]);
    }
    setShowPackageEditor(false);
    setSelectedPackage(null);
  };

  const handleDeletePackage = (packageId: string) => {
    if (confirm('Are you sure you want to delete this package?')) {
      setPackages(packages.filter(pkg => pkg.id !== packageId));
    }
  };

  if (showPackageEditor) {
    const defaultContent = {
      title: '',
      subtitle: '',
      description: '',
      price: '',
      originalPrice: undefined,
      discount: undefined,
      duration: '',
      level: '',
      rating: 0,
      reviewCount: 0,
      type: '',
      status: 'available' as const,
      checkoutLink: '',
      contactNumber: '',
      features: [],
      featureDetails: [],
      benefits: [],
      courses: 0,
      courseList: [],
      testimonials: [],
      faq: [],
      requirements: [],
      outcomes: [],
      instructorBio: '',
      tags: [],
      category: '',
      difficulty: '',
      language: '',
      subtitles: [],
      certificate: false,
      lifetimeAccess: false,
      mobileFriendly: false,
      supportIncluded: false,
      liveSessions: false,
      communityAccess: false,
      bonusMaterials: false,
      moneyBackGuarantee: false,
      earlyBirdDiscount: false,
      groupDiscount: false,
      paymentPlans: [],
      comparison: []
    };

    // Convert Package to PackageContent format
    const convertPackageToContent = (pkg: Package | null) => {
      if (!pkg) return defaultContent;
      
      return {
        ...pkg,
        features: pkg.features.map(feature => ({
          icon: 'Gift',
          title: feature,
          description: ''
        })),
        courses: pkg.courseList || []
      } as any;
    };

    return (
      <PackageEditor
        content={convertPackageToContent(selectedPackage)}
        onUpdate={handleUpdatePackage}
        packageId={selectedPackage?.id || 'new'}
        onClose={() => {
          setShowPackageEditor(false);
          setSelectedPackage(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Packages Management</h1>
            <p className="text-gray-600 mt-2">Manage all your course packages and bundles</p>
          </div>
          <Button 
            variant="outline" 
            onClick={loadPackages}
            className="mr-2"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Link href="/cms/packages/code-editor">
            <Button variant="outline" className="mr-2">
              <Code className="h-4 w-4 mr-2" />
              Code Editor
            </Button>
          </Link>
          <Button onClick={handleAddPackage}>
            <Plus className="h-4 w-4 mr-2" />
            Add Package
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search packages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="coming-soon">Coming Soon</option>
                <option value="archived">Archived</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="name">Sort by Name</option>
                <option value="modified">Sort by Modified</option>
                <option value="popularity">Sort by Popularity</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? undefined : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? undefined : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Packages Grid/List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredPackages.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
          }>
            {filteredPackages.map((pkg) => (
              <Card key={pkg.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{pkg.title}</CardTitle>
                      <p className="text-gray-600 mt-1">{pkg.subtitle}</p>
                    </div>
                    <Badge variant={pkg.status === 'available' ? 'default' : 'secondary'}>
                      {pkg.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Package className="h-4 w-4" />
                        {pkg.courses} courses
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {pkg.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        {pkg.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {pkg.price}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mt-2">
                      {pkg.features.slice(0, 3).map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {pkg.features.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{pkg.features.length - 3} more
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        onClick={() => handleEditPackage(pkg)}
                        className="flex-1"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`/packages/${pkg.id}`, '_blank')}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeletePackage(pkg.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No packages found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first package.'}
            </p>
            <Button onClick={handleAddPackage}>
              <Plus className="h-4 w-4 mr-2" />
              Add Package
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
