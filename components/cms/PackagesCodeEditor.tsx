'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Save, 
  RefreshCw, 
  Download, 
  Upload, 
  Code, 
  Eye, 
  CheckCircle, 
  AlertCircle,
  Package,
  Users,
  Clock,
  Star,
  DollarSign,
  Gift
} from 'lucide-react';

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
  status: string;
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
}

interface PackagesCodeEditorProps {
  onSave?: (packages: Package[]) => void;
  onPreview?: (pkg: Package) => void;
}

export default function PackagesCodeEditor({ onSave, onPreview }: PackagesCodeEditorProps) {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('list');
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Load packages data
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
        setPackages(result.data);
        setCode(JSON.stringify(result.data, null, 2));
        console.log('Loaded packages:', result.data.length);
      }
    } catch (error) {
      console.error('Error loading packages:', error);
      setError('Failed to load packages data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPackages();
  }, []);

  // Save packages data
  const savePackages = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      // Validate JSON
      const parsedPackages = JSON.parse(code);
      if (!Array.isArray(parsedPackages)) {
        throw new Error('Packages data must be an array');
      }

      // Validate package structure
      for (const pkg of parsedPackages) {
        if (!pkg.id || !pkg.title || !pkg.price) {
          throw new Error('Each package must have id, title, and price');
        }
      }

      // Save to API
      const response = await fetch('/api/cms/packages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ packages: parsedPackages })
      });

      if (!response.ok) {
        throw new Error('Failed to save packages');
      }

      setPackages(parsedPackages);
      setSuccess('Packages saved successfully!');
      
      if (onSave) {
        onSave(parsedPackages);
      }
    } catch (error) {
      console.error('Error saving packages:', error);
      setError(error instanceof Error ? error.message : 'Failed to save packages');
    } finally {
      setSaving(false);
    }
  };

  // Download packages data
  const downloadPackages = () => {
    const dataStr = JSON.stringify(packages, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'packages-data.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Upload packages data
  const uploadPackages = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);
        setCode(content);
        setError(null);
      } catch (error) {
        setError('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Packages Code Editor</h2>
          <p className="text-gray-600 mt-1">Edit packages data directly in JSON format</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadPackages} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" onClick={downloadPackages}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <label className="cursor-pointer">
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
            <input
              type="file"
              accept=".json"
              onChange={uploadPackages}
              className="hidden"
            />
          </label>
          <Button onClick={savePackages} disabled={saving}>
            <Save className={`h-4 w-4 mr-2 ${saving ? 'animate-spin' : ''}`} />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <span className="text-red-700">{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span className="text-green-700">{success}</span>
        </div>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="list">Package List</TabsTrigger>
          <TabsTrigger value="code">Code Editor</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        {/* Package List Tab */}
        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Packages ({packages.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedPackage(pkg)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{pkg.title}</h3>
                        <p className="text-gray-600 mt-1">{pkg.subtitle}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
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
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={pkg.status === 'available' ? 'default' : 'secondary'}>
                          {pkg.status}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onPreview) onPreview(pkg);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Code Editor Tab */}
        <TabsContent value="code" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                JSON Code Editor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-96 p-4 border rounded-lg font-mono text-sm"
                placeholder="Enter packages JSON data..."
                style={{ fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace' }}
              />
              <div className="mt-4 text-sm text-gray-500">
                <p>• Edit the JSON data directly in the textarea above</p>
                <p>• Use the Save button to apply changes</p>
                <p>• Use Download/Upload to backup and restore data</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preview Tab */}
        <TabsContent value="preview" className="space-y-4">
          {selectedPackage ? (
            <Card>
              <CardHeader>
                <CardTitle>{selectedPackage.title}</CardTitle>
                <p className="text-gray-600">{selectedPackage.subtitle}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold">Duration</h4>
                    <p>{selectedPackage.duration}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Level</h4>
                    <p>{selectedPackage.level}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Price</h4>
                    <p>{selectedPackage.price}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Courses</h4>
                    <p>{selectedPackage.courses} courses</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold">Description</h4>
                  <p className="text-gray-600">{selectedPackage.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold">Features</h4>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {selectedPackage.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold">Benefits</h4>
                  <div className="grid grid-cols-1 gap-1 mt-2">
                    {selectedPackage.benefits.slice(0, 5).map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Gift className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Package Selected</h3>
                <p className="text-gray-500">Select a package from the Package List tab to preview it here.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
