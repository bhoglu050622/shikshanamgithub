'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Palette, 
  Image as ImageIcon, 
  Video, 
  Link as LinkIcon,
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
  Globe,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

import { UniversalCMSProvider, useUniversalCMS } from './UniversalCMS';
import { useCMSElement } from './UniversalCMSMiddleware';

interface CMSEnablerProps {
  children: React.ReactNode;
  pageId?: string;
  pageTitle?: string;
}

export default function CMSEnabler({ children, pageId, pageTitle }: CMSEnablerProps) {
  const [cmsEnabled, setCmsEnabled] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [currentPage, setCurrentPage] = useState({
    id: pageId || 'generic',
    title: pageTitle || 'Current Page'
  });

  useEffect(() => {
    // Check if CMS is enabled
    const enabled = localStorage.getItem('universal-cms-enabled') === 'true';
    setCmsEnabled(enabled);
    
    // Auto-detect page info if not provided
    if (!pageId || !pageTitle) {
      const path = window.location.pathname;
      const pageName = path.split('/').pop() || 'page';
      setCurrentPage({
        id: pageName,
        title: pageName.charAt(0).toUpperCase() + pageName.slice(1) + ' Page'
      });
    }
  }, [pageId, pageTitle]);

  const toggleCMS = () => {
    const newState = !cmsEnabled;
    setCmsEnabled(newState);
    localStorage.setItem('universal-cms-enabled', newState.toString());
    
    if (newState) {
      // Add CMS overlay styles
      const style = document.createElement('style');
      style.id = 'cms-overlay-styles';
      style.textContent = `
        .cms-enabled [data-cms] {
          position: relative;
          outline: 2px dashed rgba(59, 130, 246, 0.3);
          outline-offset: 2px;
        }
        .cms-enabled [data-cms]:hover {
          outline-color: rgba(59, 130, 246, 0.6);
          background-color: rgba(59, 130, 246, 0.05);
        }
        .cms-enabled [data-cms]:hover::after {
          content: attr(data-cms);
          position: absolute;
          top: -25px;
          left: 0;
          background: #3b82f6;
          color: white;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 12px;
          z-index: 1000;
        }
      `;
      document.head.appendChild(style);
      document.body.classList.add('cms-enabled');
    } else {
      // Remove CMS overlay
      const style = document.getElementById('cms-overlay-styles');
      if (style) style.remove();
      document.body.classList.remove('cms-enabled');
    }
  };

  const quickThemes = [
    { name: 'Blue', colors: { primary: '#3b82f6', secondary: '#1d4ed8', accent: '#60a5fa' }},
    { name: 'Green', colors: { primary: '#10b981', secondary: '#059669', accent: '#34d399' }},
    { name: 'Purple', colors: { primary: '#8b5cf6', secondary: '#7c3aed', accent: '#a78bfa' }},
    { name: 'Orange', colors: { primary: '#f59e0b', secondary: '#d97706', accent: '#fbbf24' }},
    { name: 'Red', colors: { primary: '#ef4444', secondary: '#dc2626', accent: '#f87171' }}
  ];

  const applyQuickTheme = (theme: any) => {
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--cms-${key}`, value as string);
    });
    
    // Add global CSS
    const style = document.createElement('style');
    style.id = 'cms-theme-styles';
    style.textContent = `
      .cms-theme-applied {
        --primary-color: var(--cms-primary);
        --secondary-color: var(--cms-secondary);
        --accent-color: var(--cms-accent);
      }
      .cms-theme-applied button {
        background-color: var(--primary-color);
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 6px;
        cursor: pointer;
      }
      .cms-theme-applied a {
        color: var(--primary-color);
        text-decoration: none;
      }
      .cms-theme-applied a:hover {
        text-decoration: underline;
      }
      .cms-theme-applied .card {
        background-color: white;
        border: 1px solid var(--secondary-color);
        border-radius: 8px;
        padding: 16px;
      }
    `;
    
    // Remove existing theme styles
    const existing = document.getElementById('cms-theme-styles');
    if (existing) existing.remove();
    
    document.head.appendChild(style);
    document.body.classList.add('cms-theme-applied');
  };

  const exportStyles = () => {
    const styles = getComputedStyle(document.documentElement);
    const css = `
      :root {
        --primary-color: ${styles.getPropertyValue('--cms-primary') || '#3b82f6'};
        --secondary-color: ${styles.getPropertyValue('--cms-secondary') || '#1d4ed8'};
        --accent-color: ${styles.getPropertyValue('--cms-accent') || '#60a5fa'};
      }
    `;
    
    navigator.clipboard.writeText(css);
    alert('CSS copied to clipboard!');
  };

  const resetStyles = () => {
    const style = document.getElementById('cms-theme-styles');
    if (style) style.remove();
    document.body.classList.remove('cms-theme-applied');
    
    // Reset CSS variables
    const root = document.documentElement;
    root.style.removeProperty('--cms-primary');
    root.style.removeProperty('--cms-secondary');
    root.style.removeProperty('--cms-accent');
  };

  return (
    <div className="relative">
      {children}
      
      {/* CMS Toggle Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={toggleCMS}
          className={`${cmsEnabled ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} text-white shadow-lg`}
        >
          {cmsEnabled ? (
            <>
              <ToggleRight className="w-4 h-4 mr-2" />
              CMS ON
            </>
          ) : (
            <>
              <ToggleLeft className="w-4 h-4 mr-2" />
              Enable CMS
            </>
          )}
        </Button>
      </div>

      {/* CMS Control Panel */}
      {cmsEnabled && (
        <div className="fixed top-4 right-4 z-50 max-w-sm">
          <Card className="shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Universal CMS
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPanel(!showPanel)}
                >
                  {showPanel ? '−' : '+'}
                </Button>
              </div>
              <Badge variant="secondary" className="w-fit">
                {currentPage.title}
              </Badge>
            </CardHeader>
            
            {showPanel && (
              <CardContent className="space-y-4">
                {/* Quick Themes */}
                <div>
                  <h4 className="font-semibold mb-2">Quick Themes</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {quickThemes.map((theme, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => applyQuickTheme(theme)}
                        className="text-xs"
                      >
                        {theme.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={exportStyles}
                    className="w-full justify-start"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Copy CSS
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetStyles}
                    className="w-full justify-start"
                  >
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Reset Styles
                  </Button>
                </div>

                {/* Help */}
                <div className="p-3 bg-blue-50 border border-blue-200 rounded text-sm">
                  <div className="flex items-start space-x-2">
                    <HelpCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-800 mb-1">How to use:</p>
                      <ul className="text-blue-700 text-xs space-y-1">
                        <li>• Hover over elements to see CMS labels</li>
                        <li>• Click themes to apply instantly</li>
                        <li>• Copy CSS to use elsewhere</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}

// Higher-order component to enable CMS on any page
export function withCMS<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  pageConfig?: {
    pageId?: string;
    pageTitle?: string;
  }
) {
  return function CMSEnabledComponent(props: P) {
    return (
      <CMSEnabler 
        pageId={pageConfig?.pageId}
        pageTitle={pageConfig?.pageTitle}
      >
        <WrappedComponent {...props} />
      </CMSEnabler>
    );
  };
}
