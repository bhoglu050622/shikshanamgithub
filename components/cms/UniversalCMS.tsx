'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
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
  ExternalLink,
  Zap,
  Globe
} from 'lucide-react';

import VisualCustomizer from './VisualCustomizer';
import UserFriendlyEditor from './UserFriendlyEditor';
import ImageUploader from './ImageUploader';
import VideoEmbedder from './VideoEmbedder';

// Universal CMS Context
interface UniversalCMSContextType {
  customizations: any;
  updateCustomizations: (updates: any) => void;
  getElementStyles: (elementType: string, elementId?: string) => any;
  applyStyles: (elementType: string, elementId?: string) => string;
}

const UniversalCMSContext = createContext<UniversalCMSContextType | null>(null);

export const useUniversalCMS = () => {
  const context = useContext(UniversalCMSContext);
  if (!context) {
    throw new Error('useUniversalCMS must be used within a UniversalCMSProvider');
  }
  return context;
};

// Universal CMS Provider
interface UniversalCMSProviderProps {
  children: React.ReactNode;
  pageId: string;
  initialCustomizations?: any;
}

export function UniversalCMSProvider({ 
  children, 
  pageId, 
  initialCustomizations = {} 
}: UniversalCMSProviderProps) {
  const [customizations, setCustomizations] = useState(initialCustomizations);

  const updateCustomizations = (updates: any) => {
    const newCustomizations = {
      ...customizations,
      ...updates,
      lastUpdated: new Date().toISOString()
    };
    setCustomizations(newCustomizations);
    
    // Auto-save to localStorage
    localStorage.setItem(`cms-${pageId}`, JSON.stringify(newCustomizations));
  };

  const getElementStyles = (elementType: string, elementId?: string) => {
    const elementKey = elementId ? `${elementType}-${elementId}` : elementType;
    return customizations[elementKey] || {};
  };

  const applyStyles = (elementType: string, elementId?: string) => {
    const styles = getElementStyles(elementType, elementId);
    const elementKey = elementId ? `${elementType}-${elementId}` : elementType;
    
    return `
      .universal-cms-${elementKey} {
        ${styles.colors ? Object.entries(styles.colors).map(([key, value]) => 
          `--${key}: ${value};`
        ).join('\n        ') : ''}
        ${styles.text ? Object.entries(styles.text).map(([key, value]) => 
          `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`
        ).join('\n        ') : ''}
        ${styles.spacing ? Object.entries(styles.spacing).map(([key, value]) => 
          `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`
        ).join('\n        ') : ''}
      }
    `;
  };

  useEffect(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem(`cms-${pageId}`);
    if (saved) {
      try {
        setCustomizations(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading CMS customizations:', error);
      }
    }
  }, [pageId]);

  const contextValue: UniversalCMSContextType = {
    customizations,
    updateCustomizations,
    getElementStyles,
    applyStyles
  };

  return (
    <UniversalCMSContext.Provider value={contextValue}>
      {children}
    </UniversalCMSContext.Provider>
  );
}

// Universal CMS Component
interface UniversalCMSProps {
  pageId: string;
  pageTitle: string;
  sections: Array<{
    id: string;
    name: string;
    icon: React.ComponentType<any>;
    description?: string;
  }>;
  children: React.ReactNode;
  onUpdate?: (customizations: any) => void;
}

export default function UniversalCMS({ 
  pageId, 
  pageTitle, 
  sections, 
  children, 
  onUpdate 
}: UniversalCMSProps) {
  const [activeTab, setActiveTab] = useState('friendly');
  const [activeSection, setActiveSection] = useState(sections[0]?.id || '');
  const [previewMode, setPreviewMode] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const { customizations, updateCustomizations } = useUniversalCMS();

  useEffect(() => {
    // Auto-save functionality
    const interval = setInterval(() => {
      if (customizations) {
        setLastSaved(new Date());
        if (onUpdate) {
          onUpdate(customizations);
        }
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(interval);
  }, [customizations, onUpdate]);

  const exportCustomizations = () => {
    const exportData = {
      pageId,
      pageTitle,
      timestamp: new Date().toISOString(),
      customizations
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${pageId}-customizations.json`;
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
            const data = JSON.parse(e.target?.result as string);
            updateCustomizations(data.customizations);
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
      updateCustomizations({});
      localStorage.removeItem(`cms-${pageId}`);
    }
  };

  const generateGlobalCSS = () => {
    return `
      /* Universal CMS Styles for ${pageTitle} */
      :root {
        --cms-primary: ${customizations.colors?.primary || '#3b82f6'};
        --cms-secondary: ${customizations.colors?.secondary || '#64748b'};
        --cms-accent: ${customizations.colors?.accent || '#f59e0b'};
        --cms-background: ${customizations.colors?.background || '#ffffff'};
        --cms-text: ${customizations.colors?.text || '#1f2937'};
        --cms-text-secondary: ${customizations.colors?.textSecondary || '#6b7280'};
        --cms-border: ${customizations.colors?.border || '#e5e7eb'};
        --cms-card-bg: ${customizations.colors?.cardBackground || '#ffffff'};
        --cms-card-border: ${customizations.colors?.cardBorder || '#e5e7eb'};
      }
      
      .universal-cms-card {
        background-color: var(--cms-card-bg);
        border-color: var(--cms-card-border);
        color: var(--cms-text);
      }
      
      .universal-cms-button-primary {
        background-color: var(--cms-primary);
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s;
      }
      
      .universal-cms-button-primary:hover {
        background-color: var(--cms-primary);
        opacity: 0.9;
        transform: translateY(-1px);
      }
      
      .universal-cms-button-secondary {
        background-color: var(--cms-secondary);
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s;
      }
      
      .universal-cms-button-secondary:hover {
        background-color: var(--cms-secondary);
        opacity: 0.9;
        transform: translateY(-1px);
      }
      
      .universal-cms-link {
        color: var(--cms-primary);
        text-decoration: none;
        font-weight: 500;
        transition: all 0.2s;
      }
      
      .universal-cms-link:hover {
        color: var(--cms-primary);
        text-decoration: underline;
        opacity: 0.8;
      }
      
      .universal-cms-text-primary {
        color: var(--cms-text);
      }
      
      .universal-cms-text-secondary {
        color: var(--cms-text-secondary);
      }
      
      .universal-cms-text-accent {
        color: var(--cms-accent);
      }
    `;
  };

  const openPreview = () => {
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${pageTitle} Preview</title>
        <style>${generateGlobalCSS()}</style>
      </head>
      <body style="background-color: var(--cms-background); color: var(--cms-text); font-family: ${customizations.text?.fontFamily || 'Inter'};">
        <div style="max-width: 1200px; margin: 0 auto; padding: 20px;">
          <h1 style="color: var(--cms-primary); text-align: center; margin-bottom: 30px;">${pageTitle} Preview</h1>
          <div class="universal-cms-card" style="padding: 20px; margin-bottom: 20px; border: 1px solid var(--cms-card-border); border-radius: 8px;">
            <h2 class="universal-cms-text-primary">Sample Card</h2>
            <p class="universal-cms-text-secondary">This is how your content will look with the current customizations.</p>
            <div style="margin-top: 15px;">
              <button class="universal-cms-button-primary" style="margin-right: 10px;">Primary Button</button>
              <button class="universal-cms-button-secondary">Secondary Button</button>
            </div>
            <div style="margin-top: 15px;">
              <a href="#" class="universal-cms-link">Sample Link</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
    
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
              <Zap className="w-6 h-6" />
              <CardTitle>Universal CMS - {pageTitle}</CardTitle>
              <Badge variant="secondary">{pageId}</Badge>
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
              <h3 className="font-semibold text-blue-800 mb-2">Universal CMS Guide</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
                <div>
                  <h4 className="font-medium mb-1">For Beginners:</h4>
                  <ul className="space-y-1">
                    <li>• Use "Easy Mode" for simple customization</li>
                    <li>• Colors apply to all cards, buttons, and links</li>
                    <li>• Changes are saved automatically</li>
                    <li>• Preview shows how it will look</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-1">For Advanced Users:</h4>
                  <ul className="space-y-1">
                    <li>• Use "Advanced Mode" for detailed control</li>
                    <li>• Customize individual elements</li>
                    <li>• Export/import customizations</li>
                    <li>• Copy CSS for external use</li>
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
                content={customizations}
                onUpdate={updateCustomizations}
                section={activeSection}
              />
            </TabsContent>

            <TabsContent value="advanced" className="mt-6">
              <VisualCustomizer
                content={customizations}
                onUpdate={updateCustomizations}
                section={activeSection}
              />
            </TabsContent>
          </Tabs>

          {/* Section Navigation */}
          <div className="mt-6 pt-6 border-t">
            <h3 className="text-lg font-semibold mb-4">Customize Sections</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setActiveSection(section.id)}
                  className="flex items-center space-x-2"
                >
                  <section.icon className="w-4 h-4" />
                  <span>{section.name}</span>
                </Button>
              ))}
            </div>
          </div>

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
                  onClick={() => {
                    const css = generateGlobalCSS();
                    navigator.clipboard.writeText(css);
                    alert('CSS copied to clipboard!');
                  }}
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Copy CSS
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
                    updateCustomizations(customizations);
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

      {/* Preview Mode */}
      {previewMode && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <style dangerouslySetInnerHTML={{ __html: generateGlobalCSS() }} />
            <div className="universal-cms-card p-6 rounded-lg border">
              <h2 className="universal-cms-text-primary text-2xl font-bold mb-4">
                {pageTitle} Preview
              </h2>
              <p className="universal-cms-text-secondary mb-6">
                This is how your content will look with the current customizations.
              </p>
              <div className="flex flex-wrap gap-4 mb-6">
                <button className="universal-cms-button-primary">
                  Primary Button
                </button>
                <button className="universal-cms-button-secondary">
                  Secondary Button
                </button>
              </div>
              <div>
                <a href="#" className="universal-cms-link">
                  Sample Link
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content */}
      <div className="universal-cms-content">
        {children}
      </div>
    </div>
  );
}
