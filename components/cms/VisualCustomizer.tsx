'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Palette, 
  Type, 
  Image as ImageIcon, 
  Video, 
  Link as LinkIcon,
  Upload,
  Eye,
  Save,
  RotateCcw,
  Copy,
  ExternalLink
} from 'lucide-react';

interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  textSecondary: string;
  border: string;
  cardBackground: string;
  cardBorder: string;
}

interface ImageData {
  url: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

interface VideoData {
  url: string;
  title: string;
  description?: string;
  thumbnail?: string;
  embedCode?: string;
}

interface LinkData {
  url: string;
  text: string;
  target?: '_blank' | '_self';
  rel?: string;
}

interface VisualCustomizerProps {
  content: any;
  onUpdate: (updates: any) => void;
  section: string;
}

const defaultColorScheme: ColorScheme = {
  primary: '#3b82f6',
  secondary: '#64748b',
  accent: '#f59e0b',
  background: '#ffffff',
  text: '#1f2937',
  textSecondary: '#6b7280',
  border: '#e5e7eb',
  cardBackground: '#ffffff',
  cardBorder: '#e5e7eb'
};

const predefinedColorSchemes = {
  'Saffron Traditional': {
    primary: '#f59e0b',
    secondary: '#d97706',
    accent: '#fbbf24',
    background: '#fef3c7',
    text: '#92400e',
    textSecondary: '#a16207',
    border: '#fbbf24',
    cardBackground: '#fffbeb',
    cardBorder: '#f59e0b'
  },
  'Modern Blue': {
    primary: '#3b82f6',
    secondary: '#1d4ed8',
    accent: '#60a5fa',
    background: '#eff6ff',
    text: '#1e40af',
    textSecondary: '#3b82f6',
    border: '#60a5fa',
    cardBackground: '#ffffff',
    cardBorder: '#3b82f6'
  },
  'Elegant Purple': {
    primary: '#8b5cf6',
    secondary: '#7c3aed',
    accent: '#a78bfa',
    background: '#faf5ff',
    text: '#6b21a8',
    textSecondary: '#8b5cf6',
    border: '#a78bfa',
    cardBackground: '#ffffff',
    cardBorder: '#8b5cf6'
  },
  'Nature Green': {
    primary: '#10b981',
    secondary: '#059669',
    accent: '#34d399',
    background: '#ecfdf5',
    text: '#047857',
    textSecondary: '#10b981',
    border: '#34d399',
    cardBackground: '#ffffff',
    cardBorder: '#10b981'
  }
};

export default function VisualCustomizer({ content, onUpdate, section }: VisualCustomizerProps) {
  const [activeTab, setActiveTab] = useState<'colors' | 'images' | 'videos' | 'links'>('colors');
  const [colorScheme, setColorScheme] = useState<ColorScheme>(defaultColorScheme);
  const [customColors, setCustomColors] = useState<ColorScheme>(defaultColorScheme);
  const [images, setImages] = useState<ImageData[]>([]);
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [links, setLinks] = useState<LinkData[]>([]);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    // Load existing customization data
    if (content?.customization) {
      setColorScheme(content.customization.colors || defaultColorScheme);
      setImages(content.customization.images || []);
      setVideos(content.customization.videos || []);
      setLinks(content.customization.links || []);
    }
  }, [content]);

  const handleColorChange = (colorType: keyof ColorScheme, value: string) => {
    const newColors = { ...customColors, [colorType]: value };
    setCustomColors(newColors);
    applyColorScheme(newColors);
  };

  const applyColorScheme = (colors: ColorScheme) => {
    setColorScheme(colors);
    onUpdate({
      ...content,
      customization: {
        ...content?.customization,
        colors: colors
      }
    });
  };

  const applyPresetScheme = (schemeName: string) => {
    const scheme = predefinedColorSchemes[schemeName as keyof typeof predefinedColorSchemes];
    if (scheme) {
      setCustomColors(scheme);
      applyColorScheme(scheme);
    }
  };

  const addImage = (imageData: ImageData) => {
    const newImages = [...images, imageData];
    setImages(newImages);
    onUpdate({
      ...content,
      customization: {
        ...content?.customization,
        images: newImages
      }
    });
  };

  const updateImage = (index: number, imageData: ImageData) => {
    const newImages = [...images];
    newImages[index] = imageData;
    setImages(newImages);
    onUpdate({
      ...content,
      customization: {
        ...content?.customization,
        images: newImages
      }
    });
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onUpdate({
      ...content,
      customization: {
        ...content?.customization,
        images: newImages
      }
    });
  };

  const addVideo = (videoData: VideoData) => {
    const newVideos = [...videos, videoData];
    setVideos(newVideos);
    onUpdate({
      ...content,
      customization: {
        ...content?.customization,
        videos: newVideos
      }
    });
  };

  const updateVideo = (index: number, videoData: VideoData) => {
    const newVideos = [...videos];
    newVideos[index] = videoData;
    setVideos(newVideos);
    onUpdate({
      ...content,
      customization: {
        ...content?.customization,
        videos: newVideos
      }
    });
  };

  const removeVideo = (index: number) => {
    const newVideos = videos.filter((_, i) => i !== index);
    setVideos(newVideos);
    onUpdate({
      ...content,
      customization: {
        ...content?.customization,
        videos: newVideos
      }
    });
  };

  const addLink = (linkData: LinkData) => {
    const newLinks = [...links, linkData];
    setLinks(newLinks);
    onUpdate({
      ...content,
      customization: {
        ...content?.customization,
        links: newLinks
      }
    });
  };

  const updateLink = (index: number, linkData: LinkData) => {
    const newLinks = [...links];
    newLinks[index] = linkData;
    setLinks(newLinks);
    onUpdate({
      ...content,
      customization: {
        ...content?.customization,
        links: newLinks
      }
    });
  };

  const removeLink = (index: number) => {
    const newLinks = links.filter((_, i) => i !== index);
    setLinks(newLinks);
    onUpdate({
      ...content,
      customization: {
        ...content?.customization,
        links: newLinks
      }
    });
  };

  const generateCSS = () => {
    return `
      :root {
        --primary-color: ${colorScheme.primary};
        --secondary-color: ${colorScheme.secondary};
        --accent-color: ${colorScheme.accent};
        --background-color: ${colorScheme.background};
        --text-color: ${colorScheme.text};
        --text-secondary-color: ${colorScheme.textSecondary};
        --border-color: ${colorScheme.border};
        --card-background: ${colorScheme.cardBackground};
        --card-border: ${colorScheme.cardBorder};
      }
      
      .custom-card {
        background-color: var(--card-background);
        border-color: var(--card-border);
        color: var(--text-color);
      }
      
      .custom-text-primary {
        color: var(--text-color);
      }
      
      .custom-text-secondary {
        color: var(--text-secondary-color);
      }
      
      .custom-button-primary {
        background-color: var(--primary-color);
        color: white;
      }
      
      .custom-button-secondary {
        background-color: var(--secondary-color);
        color: white;
      }
    `;
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Palette className="w-5 h-5" />
              <span>Visual Customizer</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant={previewMode ? "primary" : "outline"}
                size="sm"
                onClick={() => setPreviewMode(!previewMode)}
              >
                <Eye className="w-4 h-4 mr-2" />
                {previewMode ? 'Edit' : 'Preview'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const css = generateCSS();
                  navigator.clipboard.writeText(css);
                }}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy CSS
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
            {[
              { id: 'colors', label: 'Colors', icon: Palette },
              { id: 'images', label: 'Images', icon: ImageIcon },
              { id: 'videos', label: 'Videos', icon: Video },
              { id: 'links', label: 'Links', icon: LinkIcon }
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "primary" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(tab.id as any)}
                className="flex-1"
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Color Customization */}
          {activeTab === 'colors' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Preset Color Schemes</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(predefinedColorSchemes).map(([name, scheme]) => (
                    <Card 
                      key={name}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => applyPresetScheme(name)}
                    >
                      <CardContent className="p-4">
                        <div className="flex space-x-1 mb-2">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: scheme.primary }}
                          />
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: scheme.secondary }}
                          />
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: scheme.accent }}
                          />
                        </div>
                        <p className="text-sm font-medium">{name}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Custom Colors</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(customColors).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <Label htmlFor={key} className="capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id={key}
                          type="color"
                          value={value}
                          onChange={(e) => handleColorChange(key as keyof ColorScheme, e.target.value)}
                          className="w-12 h-10 p-1 border rounded"
                        />
                        <Input
                          value={value}
                          onChange={(e) => handleColorChange(key as keyof ColorScheme, e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Image Management */}
          {activeTab === 'images' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Image Management</h3>
                <Button onClick={() => addImage({ url: '', alt: '' })}>
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Add Image
                </Button>
              </div>

              <div className="space-y-4">
                {images.map((image, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Image URL</Label>
                          <Input
                            value={image.url}
                            onChange={(e) => updateImage(index, { ...image, url: e.target.value })}
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Alt Text</Label>
                          <Input
                            value={image.alt}
                            onChange={(e) => updateImage(index, { ...image, alt: e.target.value })}
                            placeholder="Description of the image"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Caption (Optional)</Label>
                          <Input
                            value={image.caption || ''}
                            onChange={(e) => updateImage(index, { ...image, caption: e.target.value })}
                            placeholder="Image caption"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Width (px)</Label>
                          <Input
                            type="number"
                            value={image.width || ''}
                            onChange={(e) => updateImage(index, { ...image, width: parseInt(e.target.value) || undefined })}
                            placeholder="Auto"
                          />
                        </div>
                      </div>
                      {image.url && (
                        <div className="mt-4">
                          <Image 
                            src={image.url} 
                            alt={image.alt}
                            width={400}
                            height={128}
                            className="max-w-full h-32 object-cover rounded"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                      <div className="flex justify-end mt-4">
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => removeImage(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Video Management */}
          {activeTab === 'videos' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Video Management</h3>
                <Button onClick={() => addVideo({ url: '', title: '' })}>
                  <Video className="w-4 h-4 mr-2" />
                  Add Video
                </Button>
              </div>

              <div className="space-y-4">
                {videos.map((video, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Video URL or Embed Code</Label>
                          <Textarea
                            value={video.url}
                            onChange={(e) => updateVideo(index, { ...video, url: e.target.value })}
                            placeholder="https://youtube.com/watch?v=... or <iframe>...</iframe>"
                            rows={3}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Video Title</Label>
                          <Input
                            value={video.title}
                            onChange={(e) => updateVideo(index, { ...video, title: e.target.value })}
                            placeholder="Video title"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Description (Optional)</Label>
                          <Textarea
                            value={video.description || ''}
                            onChange={(e) => updateVideo(index, { ...video, description: e.target.value })}
                            placeholder="Video description"
                            rows={2}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Thumbnail URL (Optional)</Label>
                          <Input
                            value={video.thumbnail || ''}
                            onChange={(e) => updateVideo(index, { ...video, thumbnail: e.target.value })}
                            placeholder="https://example.com/thumbnail.jpg"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end mt-4">
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => removeVideo(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Link Management */}
          {activeTab === 'links' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Link Management</h3>
                <Button onClick={() => addLink({ url: '', text: '' })}>
                  <LinkIcon className="w-4 h-4 mr-2" />
                  Add Link
                </Button>
              </div>

              <div className="space-y-4">
                {links.map((link, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Link URL</Label>
                          <Input
                            value={link.url}
                            onChange={(e) => updateLink(index, { ...link, url: e.target.value })}
                            placeholder="https://example.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Link Text</Label>
                          <Input
                            value={link.text}
                            onChange={(e) => updateLink(index, { ...link, text: e.target.value })}
                            placeholder="Click here"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Open in New Tab</Label>
                          <select
                            value={link.target || '_self'}
                            onChange={(e) => updateLink(index, { ...link, target: e.target.value as '_blank' | '_self' })}
                            className="w-full p-2 border rounded"
                          >
                            <option value="_self">Same Tab</option>
                            <option value="_blank">New Tab</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label>Rel Attribute (Optional)</Label>
                          <Input
                            value={link.rel || ''}
                            onChange={(e) => updateLink(index, { ...link, rel: e.target.value })}
                            placeholder="noopener noreferrer"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end mt-4">
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => removeLink(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Preview Mode */}
          {previewMode && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Live Preview</h3>
              <div className="space-y-4">
                <style dangerouslySetInnerHTML={{ __html: generateCSS() }} />
                <div className="custom-card p-4 rounded border">
                  <h4 className="custom-text-primary text-xl font-bold mb-2">Sample Card</h4>
                  <p className="custom-text-secondary mb-4">This is how your content will look with the selected colors.</p>
                  <div className="flex space-x-2">
                    <button className="custom-button-primary px-4 py-2 rounded">Primary Button</button>
                    <button className="custom-button-secondary px-4 py-2 rounded">Secondary Button</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
