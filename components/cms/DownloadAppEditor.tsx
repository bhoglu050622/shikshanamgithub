'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'

interface DownloadAppEditorProps {
  content: {
    title: string;
    subtitle: string;
    features: Array<{
      id: string;
      title: string;
      description: string;
      icon: string;
    }>;
    downloadLinks: {
      android: string;
      ios: string;
    };
  };
  onChange: (content: any) => void;
}

export default function DownloadAppEditor({ content, onChange }: DownloadAppEditorProps) {
  // Safe content with defaults
  const safeContent = {
    title: content?.title || '',
    subtitle: content?.subtitle || '',
    features: content?.features || [],
    downloadLinks: content?.downloadLinks || { android: '', ios: '' }
  };

  const updateField = (field: string, value: string) => {
    onChange({
      ...safeContent,
      [field]: value
    });
  };

  const addFeature = () => {
    const newFeature = {
      id: `feature-${Date.now()}`,
      title: "New Feature",
      description: "Feature description",
      icon: "star"
    };
    onChange({
      ...safeContent,
      features: [...safeContent.features, newFeature]
    });
  };

  const updateFeature = (index: number, field: string, value: string) => {
    const updatedFeatures = [...safeContent.features];
    updatedFeatures[index] = { ...updatedFeatures[index], [field]: value };
    onChange({
      ...safeContent,
      features: updatedFeatures
    });
  };

  const removeFeature = (index: number) => {
    const updatedFeatures = safeContent.features.filter((_, i) => i !== index);
    onChange({
      ...safeContent,
      features: updatedFeatures
    });
  };

  const updateDownloadLink = (platform: string, value: string) => {
    onChange({
      ...safeContent,
      downloadLinks: {
        ...safeContent.downloadLinks,
        [platform]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Download App Section</CardTitle>
          <CardDescription>
            Edit the download app section that promotes your mobile application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Section Title</Label>
            <Input
              id="title"
              value={safeContent.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Enter section title"
            />
          </div>
          
          <div>
            <Label htmlFor="subtitle">Section Subtitle</Label>
            <Textarea
              id="subtitle"
              value={safeContent.subtitle}
              onChange={(e) => updateField('subtitle', e.target.value)}
              placeholder="Enter section subtitle"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>App Features</CardTitle>
              <CardDescription>Manage app features and benefits</CardDescription>
            </div>
            <Button onClick={addFeature} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Feature
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {safeContent.features.map((feature, index) => (
            <div key={feature.id} className="p-4 border rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Feature #{index + 1}</h4>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeFeature(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={feature.title}
                    onChange={(e) => updateFeature(index, 'title', e.target.value)}
                    placeholder="Feature title"
                  />
                </div>
                <div>
                  <Label>Icon</Label>
                  <Input
                    value={feature.icon}
                    onChange={(e) => updateFeature(index, 'icon', e.target.value)}
                    placeholder="star, download, etc."
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Description</Label>
                  <Textarea
                    value={feature.description}
                    onChange={(e) => updateFeature(index, 'description', e.target.value)}
                    placeholder="Feature description"
                    rows={2}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Download Links</CardTitle>
          <CardDescription>Configure app store download links</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="android">Android Play Store Link</Label>
            <Input
              id="android"
              value={safeContent.downloadLinks.android}
              onChange={(e) => updateDownloadLink('android', e.target.value)}
              placeholder="https://play.google.com/store/apps/details?id=com.yourapp"
            />
          </div>
          
          <div>
            <Label htmlFor="ios">iOS App Store Link</Label>
            <Input
              id="ios"
              value={safeContent.downloadLinks.ios}
              onChange={(e) => updateDownloadLink('ios', e.target.value)}
              placeholder="https://apps.apple.com/app/yourapp"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
