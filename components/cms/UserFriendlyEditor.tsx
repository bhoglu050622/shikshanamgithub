'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Wand2, 
  Palette, 
  Image as ImageIcon, 
  Video, 
  Link as LinkIcon,
  Type,
  Save,
  Eye,
  Copy,
  ExternalLink,
  HelpCircle,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface UserFriendlyEditorProps {
  content: any;
  onUpdate: (updates: any) => void;
  section: string;
}

export default function UserFriendlyEditor({ content, onUpdate, section }: UserFriendlyEditorProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const steps = [
    {
      id: 'colors',
      title: 'Choose Your Colors',
      icon: Palette,
      description: 'Pick colors that match your brand or personal preference'
    },
    {
      id: 'text',
      title: 'Customize Text',
      icon: Type,
      description: 'Change fonts, sizes, and text colors'
    },
    {
      id: 'images',
      title: 'Add Images',
      icon: ImageIcon,
      description: 'Upload or link to images for your content'
    },
    {
      id: 'videos',
      title: 'Add Videos',
      icon: Video,
      description: 'Embed videos from YouTube, Vimeo, or other sources'
    },
    {
      id: 'links',
      title: 'Add Links',
      icon: LinkIcon,
      description: 'Create clickable links to other pages or websites'
    }
  ];

  const [customization, setCustomization] = useState({
    colors: {
      primary: '#3b82f6',
      secondary: '#64748b',
      accent: '#f59e0b',
      background: '#ffffff',
      text: '#1f2937'
    },
    text: {
      fontFamily: 'Inter',
      fontSize: '16px',
      lineHeight: '1.5',
      fontWeight: '400'
    },
    images: [],
    videos: [],
    links: []
  });

  useEffect(() => {
    if (content?.customization) {
      setCustomization(content.customization);
    }
  }, [content]);

  const handleColorChange = (colorType: string, value: string) => {
    const newCustomization = {
      ...customization,
      colors: {
        ...customization.colors,
        [colorType]: value
      }
    };
    setCustomization(newCustomization);
    onUpdate({
      ...content,
      customization: newCustomization
    });
  };

  const handleTextChange = (textType: string, value: string) => {
    const newCustomization = {
      ...customization,
      text: {
        ...customization.text,
        [textType]: value
      }
    };
    setCustomization(newCustomization);
    onUpdate({
      ...content,
      customization: newCustomization
    });
  };

  const addImage = () => {
    const imageUrl = prompt('Enter the image URL (e.g., https://example.com/image.jpg):');
    if (imageUrl) {
      const imageAlt = prompt('Enter a description of the image (for accessibility):');
      const newImages = [...customization.images, { url: imageUrl, alt: imageAlt || '' }];
      const newCustomization = { ...customization, images: newImages };
      setCustomization(newCustomization);
      onUpdate({
        ...content,
        customization: newCustomization
      });
    }
  };

  const addVideo = () => {
    const videoUrl = prompt('Enter the video URL (YouTube, Vimeo, etc.) or embed code:');
    if (videoUrl) {
      const videoTitle = prompt('Enter the video title:');
      const newVideos = [...customization.videos, { url: videoUrl, title: videoTitle || '' }];
      const newCustomization = { ...customization, videos: newVideos };
      setCustomization(newCustomization);
      onUpdate({
        ...content,
        customization: newCustomization
      });
    }
  };

  const addLink = () => {
    const linkUrl = prompt('Enter the link URL (e.g., https://example.com):');
    if (linkUrl) {
      const linkText = prompt('Enter the text to display for the link:');
      const newLinks = [...customization.links, { url: linkUrl, text: linkText || linkUrl }];
      const newCustomization = { ...customization, links: newLinks };
      setCustomization(newCustomization);
      onUpdate({
        ...content,
        customization: newCustomization
      });
    }
  };

  const removeItem = (type: string, index: number) => {
    const newItems = customization[type as keyof typeof customization].filter((_: any, i: number) => i !== index);
    const newCustomization = { ...customization, [type]: newItems };
    setCustomization(newCustomization);
    onUpdate({
      ...content,
      customization: newCustomization
    });
  };

  const generateCSS = () => {
    return `
      /* Custom Styles for ${section} */
      .custom-${section} {
        --primary-color: ${customization.colors.primary};
        --secondary-color: ${customization.colors.secondary};
        --accent-color: ${customization.colors.accent};
        --background-color: ${customization.colors.background};
        --text-color: ${customization.colors.text};
        font-family: ${customization.text.fontFamily};
        font-size: ${customization.text.fontSize};
        line-height: ${customization.text.lineHeight};
        font-weight: ${customization.text.fontWeight};
      }
      
      .custom-${section} .card {
        background-color: var(--background-color);
        color: var(--text-color);
        border: 1px solid var(--secondary-color);
      }
      
      .custom-${section} .button-primary {
        background-color: var(--primary-color);
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
      }
      
      .custom-${section} .button-secondary {
        background-color: var(--secondary-color);
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
      }
      
      .custom-${section} .text-accent {
        color: var(--accent-color);
      }
    `;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Wand2 className="w-5 h-5" />
              <span>Easy Content Customizer</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowHelp(!showHelp)}
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                Help
              </Button>
              <Button
                variant={previewMode ? "primary" : "outline"}
                size="sm"
                onClick={() => setPreviewMode(!previewMode)}
              >
                <Eye className="w-4 h-4 mr-2" />
                {previewMode ? 'Edit' : 'Preview'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {showHelp && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">How to Use This Editor</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• <strong>Colors:</strong> Click on color boxes to change colors</li>
                <li>• <strong>Images:</strong> Use image URLs from the internet (like Google Images)</li>
                <li>• <strong>Videos:</strong> Paste YouTube or Vimeo links</li>
                <li>• <strong>Links:</strong> Create clickable links to other websites</li>
                <li>• <strong>Preview:</strong> See how your changes look before saving</li>
              </ul>
            </div>
          )}

          {/* Step Navigation */}
          <div className="flex flex-wrap gap-2 mb-6">
            {steps.map((step, index) => (
              <Button
                key={step.id}
                variant={activeStep === index ? "primary" : "outline"}
                size="sm"
                onClick={() => setActiveStep(index)}
                className="flex items-center space-x-2"
              >
                <step.icon className="w-4 h-4" />
                <span>{step.title}</span>
              </Button>
            ))}
          </div>

          {/* Step Content */}
          <div className="min-h-[400px]">
            {/* Colors Step */}
            {activeStep === 0 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Choose Your Colors</h3>
                  <p className="text-gray-600 mb-4">Pick colors that represent your brand or personal style.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(customization.colors).map(([colorName, colorValue]) => (
                      <div key={colorName} className="space-y-2">
                        <Label className="capitalize">
                          {colorName.replace(/([A-Z])/g, ' $1').trim()}
                        </Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="color"
                            value={colorValue}
                            onChange={(e) => handleColorChange(colorName, e.target.value)}
                            className="w-12 h-10 p-1 border rounded"
                          />
                          <Input
                            value={colorValue}
                            onChange={(e) => handleColorChange(colorName, e.target.value)}
                            className="flex-1"
                            placeholder="#000000"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Quick Color Presets</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      { name: 'Blue Theme', colors: { primary: '#3b82f6', secondary: '#1d4ed8', accent: '#60a5fa', background: '#eff6ff', text: '#1e40af' }},
                      { name: 'Green Theme', colors: { primary: '#10b981', secondary: '#059669', accent: '#34d399', background: '#ecfdf5', text: '#047857' }},
                      { name: 'Purple Theme', colors: { primary: '#8b5cf6', secondary: '#7c3aed', accent: '#a78bfa', background: '#faf5ff', text: '#6b21a8' }},
                      { name: 'Orange Theme', colors: { primary: '#f59e0b', secondary: '#d97706', accent: '#fbbf24', background: '#fffbeb', text: '#92400e' }}
                    ].map((preset) => (
                      <Button
                        key={preset.name}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newCustomization = { ...customization, colors: preset.colors };
                          setCustomization(newCustomization);
                          onUpdate({ ...content, customization: newCustomization });
                        }}
                        className="text-xs"
                      >
                        {preset.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Text Step */}
            {activeStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Customize Your Text</h3>
                  <p className="text-gray-600 mb-4">Change how your text looks and feels.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Font Family</Label>
                      <select
                        value={customization.text.fontFamily}
                        onChange={(e) => handleTextChange('fontFamily', e.target.value)}
                        className="w-full p-2 border rounded"
                      >
                        <option value="Inter">Inter (Modern)</option>
                        <option value="Georgia">Georgia (Classic)</option>
                        <option value="Times New Roman">Times New Roman (Traditional)</option>
                        <option value="Arial">Arial (Clean)</option>
                        <option value="Helvetica">Helvetica (Professional)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Font Size</Label>
                      <select
                        value={customization.text.fontSize}
                        onChange={(e) => handleTextChange('fontSize', e.target.value)}
                        className="w-full p-2 border rounded"
                      >
                        <option value="14px">Small (14px)</option>
                        <option value="16px">Medium (16px)</option>
                        <option value="18px">Large (18px)</option>
                        <option value="20px">Extra Large (20px)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Line Height</Label>
                      <select
                        value={customization.text.lineHeight}
                        onChange={(e) => handleTextChange('lineHeight', e.target.value)}
                        className="w-full p-2 border rounded"
                      >
                        <option value="1.2">Tight (1.2)</option>
                        <option value="1.5">Normal (1.5)</option>
                        <option value="1.8">Loose (1.8)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Font Weight</Label>
                      <select
                        value={customization.text.fontWeight}
                        onChange={(e) => handleTextChange('fontWeight', e.target.value)}
                        className="w-full p-2 border rounded"
                      >
                        <option value="300">Light</option>
                        <option value="400">Normal</option>
                        <option value="600">Semi Bold</option>
                        <option value="700">Bold</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Images Step */}
            {activeStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Manage Your Images</h3>
                  <p className="text-gray-600 mb-4">Add images to make your content more engaging.</p>
                  
                  <Button onClick={addImage} className="mb-4">
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Add New Image
                  </Button>

                  <div className="space-y-4">
                    {customization.images.map((image: any, index: number) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-4">
                            {image.url && (
                              <img 
                                src={image.url} 
                                alt={image.alt}
                                className="w-20 h-20 object-cover rounded"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            )}
                            <div className="flex-1">
                              <p className="font-medium">{image.alt || 'No description'}</p>
                              <p className="text-sm text-gray-500 break-all">{image.url}</p>
                              <div className="flex items-center space-x-2 mt-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => window.open(image.url, '_blank')}
                                >
                                  <ExternalLink className="w-4 h-4 mr-1" />
                                  View
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => removeItem('images', index)}
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Videos Step */}
            {activeStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Manage Your Videos</h3>
                  <p className="text-gray-600 mb-4">Add videos from YouTube, Vimeo, or other sources.</p>
                  
                  <Button onClick={addVideo} className="mb-4">
                    <Video className="w-4 h-4 mr-2" />
                    Add New Video
                  </Button>

                  <div className="space-y-4">
                    {customization.videos.map((video: any, index: number) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-4">
                            <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center">
                              <Video className="w-8 h-8 text-gray-400" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{video.title || 'Untitled Video'}</p>
                              <p className="text-sm text-gray-500 break-all">{video.url}</p>
                              <div className="flex items-center space-x-2 mt-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => window.open(video.url, '_blank')}
                                >
                                  <ExternalLink className="w-4 h-4 mr-1" />
                                  View
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => removeItem('videos', index)}
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Links Step */}
            {activeStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Manage Your Links</h3>
                  <p className="text-gray-600 mb-4">Create clickable links to other pages or websites.</p>
                  
                  <Button onClick={addLink} className="mb-4">
                    <LinkIcon className="w-4 h-4 mr-2" />
                    Add New Link
                  </Button>

                  <div className="space-y-4">
                    {customization.links.map((link: any, index: number) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{link.text}</p>
                              <p className="text-sm text-gray-500 break-all">{link.url}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.open(link.url, '_blank')}
                              >
                                <ExternalLink className="w-4 h-4 mr-1" />
                                Test
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => removeItem('links', index)}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Preview and Actions */}
          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => copyToClipboard(generateCSS())}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy CSS
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    const css = generateCSS();
                    const blob = new Blob([css], { type: 'text/css' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${section}-custom-styles.css`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Download CSS
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Auto-saved
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
