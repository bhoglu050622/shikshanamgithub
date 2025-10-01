'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  Palette, 
  Image as ImageIcon, 
  Video, 
  Link as LinkIcon,
  Type,
  Eye,
  Save,
  Download,
  Upload,
  Wand2,
  HelpCircle,
  CheckCircle,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

import VisualCustomizer from './VisualCustomizer';
import UserFriendlyEditor from './UserFriendlyEditor';

interface EnhancedCMSProps {
  content: any;
  onUpdate: (updates: any) => void;
  section: string;
}

export default function EnhancedCMS({ content, onUpdate, section }: EnhancedCMSProps) {
  const [activeTab, setActiveTab] = useState('friendly');
  const [previewMode, setPreviewMode] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    // Auto-save functionality
    const interval = setInterval(() => {
      if (content) {
        setLastSaved(new Date());
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(interval);
  }, [content]);

  const handleUpdate = (updates: any) => {
    onUpdate(updates);
    setLastSaved(new Date());
  };

  const exportCustomizations = () => {
    const customizations = {
      section,
      timestamp: new Date().toISOString(),
      colors: content?.customization?.colors || {},
      text: content?.customization?.text || {},
      images: content?.customization?.images || [],
      videos: content?.customization?.videos || [],
      links: content?.customization?.links || []
    };

    const blob = new Blob([JSON.stringify(customizations, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${section}-customizations.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importCustomizations = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const customizations = JSON.parse(e.target?.result as string);
            handleUpdate({
              ...content,
              customization: customizations
            });
            alert('Customizations imported successfully!');
          } catch (error) {
            alert('Error importing customizations. Please check the file format.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const resetCustomizations = () => {
    if (confirm('Are you sure you want to reset all customizations? This action cannot be undone.')) {
      handleUpdate({
        ...content,
        customization: {
          colors: {},
          text: {},
          images: [],
          videos: [],
          links: []
        }
      });
    }
  };

  const generatePreviewHTML = () => {
    const colors = content?.customization?.colors || {};
    const text = content?.customization?.text || {};
    const images = content?.customization?.images || [];
    const videos = content?.customization?.videos || [];
    const links = content?.customization?.links || [];

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${section} Preview</title>
        <style>
          :root {
            --primary-color: ${colors.primary || '#3b82f6'};
            --secondary-color: ${colors.secondary || '#64748b'};
            --accent-color: ${colors.accent || '#f59e0b'};
            --background-color: ${colors.background || '#ffffff'};
            --text-color: ${colors.text || '#1f2937'};
          }
          
          body {
            font-family: ${text.fontFamily || 'Inter'};
            font-size: ${text.fontSize || '16px'};
            line-height: ${text.lineHeight || '1.5'};
            font-weight: ${text.fontWeight || '400'};
            background-color: var(--background-color);
            color: var(--text-color);
            margin: 0;
            padding: 20px;
          }
          
          .preview-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          
          .preview-header {
            background: var(--primary-color);
            color: white;
            padding: 20px;
            text-align: center;
          }
          
          .preview-content {
            padding: 20px;
          }
          
          .preview-image {
            max-width: 100%;
            height: auto;
            border-radius: 4px;
            margin: 10px 0;
          }
          
          .preview-video {
            width: 100%;
            height: 300px;
            border-radius: 4px;
            margin: 10px 0;
          }
          
          .preview-link {
            color: var(--primary-color);
            text-decoration: none;
            font-weight: 500;
          }
          
          .preview-link:hover {
            text-decoration: underline;
          }
          
          .button-primary {
            background-color: var(--primary-color);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            margin: 5px;
          }
          
          .button-secondary {
            background-color: var(--secondary-color);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            margin: 5px;
          }
        </style>
      </head>
      <body>
        <div class="preview-container">
          <div class="preview-header">
            <h1>${section} Preview</h1>
            <p>This is how your content will look with the current customizations.</p>
          </div>
          <div class="preview-content">
            ${images.map((img: any) => `
              <div>
                <img src="${img.url}" alt="${img.alt}" class="preview-image" />
                ${img.caption ? `<p><em>${img.caption}</em></p>` : ''}
              </div>
            `).join('')}
            
            ${videos.map((video: any) => `
              <div>
                <h3>${video.title}</h3>
                <p>${video.description || ''}</p>
                <div class="preview-video">
                  ${video.url.includes('<iframe') ? video.url : `
                    <iframe src="${video.url}" width="100%" height="300" frameborder="0" allowfullscreen></iframe>
                  `}
                </div>
              </div>
            `).join('')}
            
            ${links.map((link: any) => `
              <p>
                <a href="${link.url}" class="preview-link" target="${link.target || '_blank'}" rel="${link.rel || 'noopener noreferrer'}">
                  ${link.text}
                </a>
              </p>
            `).join('')}
            
            <div style="margin-top: 20px;">
              <button class="button-primary">Primary Button</button>
              <button class="button-secondary">Secondary Button</button>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  const openPreview = () => {
    const html = generatePreviewHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Wand2 className="w-6 h-6" />
              <CardTitle>Enhanced Content Management</CardTitle>
              <Badge variant="secondary">{section}</Badge>
            </div>
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
                variant="outline"
                size="sm"
                onClick={openPreview}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Full Preview
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
          
          {showHelp && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Quick Start Guide</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
                <div>
                  <h4 className="font-medium mb-1">For Beginners:</h4>
                  <ul className="space-y-1">
                    <li>• Use the "Easy Mode" tab for simple customization</li>
                    <li>• Click on color boxes to change colors</li>
                    <li>• Use the "Add" buttons to add images, videos, and links</li>
                    <li>• Preview your changes before saving</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-1">For Advanced Users:</h4>
                  <ul className="space-y-1">
                    <li>• Use the "Advanced Mode" for detailed customization</li>
                    <li>• Copy CSS code for external use</li>
                    <li>• Import/export customizations</li>
                    <li>• Use the full preview for testing</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="friendly" className="flex items-center space-x-2">
                <Wand2 className="w-4 h-4" />
                <span>Easy Mode</span>
              </TabsTrigger>
              <TabsTrigger value="advanced" className="flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Advanced Mode</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="friendly" className="mt-6">
              <UserFriendlyEditor
                content={content}
                onUpdate={handleUpdate}
                section={section}
              />
            </TabsContent>

            <TabsContent value="advanced" className="mt-6">
              <VisualCustomizer
                content={content}
                onUpdate={handleUpdate}
                section={section}
              />
            </TabsContent>
          </Tabs>

          {/* Action Bar */}
          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={importCustomizations}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Import
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={exportCustomizations}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetCustomizations}
                >
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                {lastSaved && (
                  <Badge variant="secondary">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Saved {lastSaved.toLocaleTimeString()}
                  </Badge>
                )}
                <Button
                  variant="primary"
                  onClick={() => {
                    // Trigger save
                    handleUpdate(content);
                  }}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
