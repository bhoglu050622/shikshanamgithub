'use client';

import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Wand2, 
  Palette, 
  Smartphone, 
  BookOpen, 
  Lightbulb,
  Save,
  Eye,
  Settings,
  HelpCircle,
  Star,
  Zap
} from 'lucide-react';

// Import all the new components
import VisualContentBuilder from './VisualContentBuilder';
import SmartContentAssistant from './SmartContentAssistant';
import MobilePreview from './MobilePreview';
import OneClickDesignSystem from './OneClickDesignSystem';
import ContentTemplatesLibrary from './ContentTemplatesLibrary';

interface EnhancedNonTechCMSProps {
  content: any;
  onUpdate: (content: any) => void;
  sectionName: string;
}

export default function EnhancedNonTechCMS({ content, onUpdate, sectionName }: EnhancedNonTechCMSProps) {
  const [activeTab, setActiveTab] = useState('builder');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    try {
      // Simulate save operation
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLastSaved(new Date());
      console.log('Content saved successfully');
    } catch (error) {
      console.error('Error saving content:', error);
    } finally {
      setIsSaving(false);
    }
  }, []);

  const handleContentUpdate = useCallback((updatedContent: any) => {
    onUpdate(updatedContent);
  }, [onUpdate]);

  const handleTemplateApply = useCallback((template: any) => {
    const updatedContent = {
      ...content,
      ...template.content,
      templateApplied: {
        templateId: template.id,
        templateName: template.name,
        appliedAt: new Date().toISOString()
      }
    };
    onUpdate(updatedContent);
  }, [content, onUpdate]);

  const handleSuggestionApply = useCallback((suggestion: any, updatedContent: any) => {
    onUpdate(updatedContent);
  }, [onUpdate]);

  const getTabIcon = (tabId: string) => {
    switch (tabId) {
      case 'builder': return Wand2;
      case 'templates': return BookOpen;
      case 'design': return Palette;
      case 'mobile': return Smartphone;
      case 'assistant': return Lightbulb;
      default: return Settings;
    }
  };

  const getTabLabel = (tabId: string) => {
    switch (tabId) {
      case 'builder': return 'Visual Builder';
      case 'templates': return 'Templates';
      case 'design': return 'Design System';
      case 'mobile': return 'Mobile Preview';
      case 'assistant': return 'AI Assistant';
      default: return 'Settings';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Enhanced CMS Editor</h2>
          <p className="text-gray-600">
            Edit your {sectionName} section with powerful, user-friendly tools
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {lastSaved && (
            <div className="text-sm text-gray-500">
              Last saved: {lastSaved.toLocaleTimeString()}
            </div>
          )}
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-green-500 hover:bg-green-600"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Wand2 className="w-5 h-5 text-blue-500" />
              <div>
                <div className="text-sm font-medium">Visual Builder</div>
                <div className="text-xs text-gray-500">Drag & Drop</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-green-500" />
              <div>
                <div className="text-sm font-medium">Templates</div>
                <div className="text-xs text-gray-500">6 Available</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Palette className="w-5 h-5 text-purple-500" />
              <div>
                <div className="text-sm font-medium">Design System</div>
                <div className="text-xs text-gray-500">6 Themes</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              <div>
                <div className="text-sm font-medium">AI Assistant</div>
                <div className="text-xs text-gray-500">Smart Suggestions</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Editor */}
      <Card>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b">
              <TabsList className="w-full justify-start bg-transparent p-0">
                {['builder', 'templates', 'design', 'mobile', 'assistant'].map((tabId) => {
                  const Icon = getTabIcon(tabId);
                  return (
                    <TabsTrigger
                      key={tabId}
                      value={tabId}
                      className="flex items-center space-x-2 px-6 py-4 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{getTabLabel(tabId)}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            <div className="p-6">
              <TabsContent value="builder" className="mt-0">
                <VisualContentBuilder
                  content={content}
                  onUpdate={handleContentUpdate}
                  sectionName={sectionName}
                />
              </TabsContent>

              <TabsContent value="templates" className="mt-0">
                <ContentTemplatesLibrary
                  content={content}
                  onApplyTemplate={handleTemplateApply}
                  sectionName={sectionName}
                />
              </TabsContent>

              <TabsContent value="design" className="mt-0">
                <OneClickDesignSystem
                  content={content}
                  onUpdate={handleContentUpdate}
                  sectionName={sectionName}
                />
              </TabsContent>

              <TabsContent value="mobile" className="mt-0">
                <MobilePreview
                  content={content}
                  onUpdate={handleContentUpdate}
                  sectionName={sectionName}
                />
              </TabsContent>

              <TabsContent value="assistant" className="mt-0">
                <SmartContentAssistant
                  content={content}
                  sectionName={sectionName}
                  onApplySuggestion={handleSuggestionApply}
                />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* Help Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <HelpCircle className="w-5 h-5 text-blue-500" />
            <span>Quick Help</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-sm">🎯 Getting Started</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Use the Visual Builder to drag and drop content blocks</li>
                <li>• Browse templates for quick content creation</li>
                <li>• Apply design themes for consistent styling</li>
                <li>• Preview on mobile devices for responsive design</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-sm">💡 Pro Tips</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Use the AI Assistant for content optimization</li>
                <li>• Test your content on different screen sizes</li>
                <li>• Save your work frequently</li>
                <li>• Use templates as starting points</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="w-5 h-5 text-blue-600" />
              <h4 className="font-medium text-blue-900">No-Code Editing</h4>
            </div>
            <p className="text-sm text-blue-700">
              Build beautiful content without writing any code. Just drag, drop, and customize.
            </p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Star className="w-5 h-5 text-green-600" />
              <h4 className="font-medium text-green-900">Professional Templates</h4>
            </div>
            <p className="text-sm text-green-700">
              Choose from professionally designed templates that are proven to convert.
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Eye className="w-5 h-5 text-purple-600" />
              <h4 className="font-medium text-purple-900">Live Preview</h4>
            </div>
            <p className="text-sm text-purple-700">
              See exactly how your content will look on different devices in real-time.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
