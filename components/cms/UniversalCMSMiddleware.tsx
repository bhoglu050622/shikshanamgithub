'use client';

import React, { useState, useEffect } from 'react';
import { UniversalCMSProvider, useUniversalCMS } from './UniversalCMS';
import { CMSAdminPanel } from './CMSWrapper';

interface UniversalCMSMiddlewareProps {
  children: React.ReactNode;
  pageId: string;
  pageTitle: string;
  enableCMS?: boolean;
  showAdminPanel?: boolean;
}

// Auto-detect page configuration based on URL
function getPageConfig(pathname: string) {
  const configs: Record<string, any> = {
    '/cms/donation': {
      pageId: 'donation',
      pageTitle: 'Donation Page',
      sections: [
        { id: 'hero', name: 'Hero Section', icon: 'Heart' },
        { id: 'impact', name: 'Impact Stories', icon: 'TrendingUp' },
        { id: 'causes', name: 'Causes', icon: 'Target' },
        { id: 'options', name: 'Donation Options', icon: 'DollarSign' },
        { id: 'testimonials', name: 'Testimonials', icon: 'MessageCircle' },
        { id: 'faq', name: 'FAQ', icon: 'HelpCircle' },
        { id: 'cta', name: 'Call to Action', icon: 'Gift' }
      ]
    },
    '/cms/about': {
      pageId: 'about',
      pageTitle: 'About Page',
      sections: [
        { id: 'hero', name: 'Hero Section', icon: 'Users' },
        { id: 'mission', name: 'Mission & Vision', icon: 'Target' },
        { id: 'values', name: 'Our Values', icon: 'Heart' },
        { id: 'team', name: 'Our Team', icon: 'Users' },
        { id: 'story', name: 'Our Story', icon: 'BookOpen' },
        { id: 'achievements', name: 'Achievements', icon: 'Award' },
        { id: 'impact', name: 'Impact', icon: 'Globe' }
      ]
    },
    '/cms/contact': {
      pageId: 'contact',
      pageTitle: 'Contact Page',
      sections: [
        { id: 'hero', name: 'Hero Section', icon: 'MessageCircle' },
        { id: 'form', name: 'Contact Form', icon: 'Mail' },
        { id: 'info', name: 'Contact Info', icon: 'Phone' },
        { id: 'map', name: 'Location Map', icon: 'MapPin' },
        { id: 'hours', name: 'Business Hours', icon: 'Clock' }
      ]
    },
    '/cms/schools': {
      pageId: 'schools',
      pageTitle: 'Schools Page',
      sections: [
        { id: 'hero', name: 'Hero Section', icon: 'BookOpen' },
        { id: 'sanskrit', name: 'Sanskrit School', icon: 'BookOpen' },
        { id: 'darshan', name: 'Darshan School', icon: 'Brain' },
        { id: 'life-skills', name: 'Life Skills School', icon: 'Heart' },
        { id: 'testimonials', name: 'Student Stories', icon: 'MessageCircle' }
      ]
    }
  };

  return configs[pathname] || {
    pageId: 'generic',
    pageTitle: 'Generic Page',
    sections: [
      { id: 'hero', name: 'Hero Section', icon: 'Star' },
      { id: 'content', name: 'Main Content', icon: 'FileText' },
      { id: 'cta', name: 'Call to Action', icon: 'Target' }
    ]
  };
}

// CMS Toggle Component
function CMSToggle() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // Check if CMS is enabled for this session
    const cmsEnabled = localStorage.getItem('cms-enabled') === 'true';
    setIsEnabled(cmsEnabled);
  }, []);

  const toggleCMS = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    localStorage.setItem('cms-enabled', newState.toString());
    
    if (newState) {
      // Add CMS styles to the page
      const style = document.createElement('style');
      style.id = 'universal-cms-styles';
      style.textContent = `
        .universal-cms-enabled * {
          position: relative;
        }
        .universal-cms-enabled [data-cms-element] {
          outline: 2px dashed #3b82f6;
          outline-offset: 2px;
        }
        .universal-cms-enabled [data-cms-element]:hover {
          outline-color: #1d4ed8;
          background-color: rgba(59, 130, 246, 0.05);
        }
      `;
      document.head.appendChild(style);
      document.body.classList.add('universal-cms-enabled');
    } else {
      // Remove CMS styles
      const style = document.getElementById('universal-cms-styles');
      if (style) style.remove();
      document.body.classList.remove('universal-cms-enabled');
    }
  };

  if (!isEnabled) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={toggleCMS}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
        >
          Enable CMS
        </button>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">CMS Active</h3>
        <button
          onClick={toggleCMS}
          className="text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>
      <div className="space-y-2">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="w-full text-left px-3 py-2 bg-blue-50 hover:bg-blue-100 rounded text-sm"
        >
          Open Settings
        </button>
        <button
          onClick={() => {
            const elements = document.querySelectorAll('[data-cms-element]');
            elements.forEach(el => {
              el.style.outline = '2px solid #10b981';
              setTimeout(() => {
                el.style.outline = '';
              }, 2000);
            });
          }}
          className="w-full text-left px-3 py-2 bg-green-50 hover:bg-green-100 rounded text-sm"
        >
          Highlight Elements
        </button>
        <button
          onClick={() => {
            const css = document.querySelector('#universal-cms-styles')?.textContent;
            if (css) {
              navigator.clipboard.writeText(css);
              alert('CSS copied to clipboard!');
            }
          }}
          className="w-full text-left px-3 py-2 bg-purple-50 hover:bg-purple-100 rounded text-sm"
        >
          Copy Styles
        </button>
      </div>
    </div>
  );
}

// Main Universal CMS Middleware Component
export default function UniversalCMSMiddleware({ 
  children, 
  pageId, 
  pageTitle, 
  enableCMS = true,
  showAdminPanel = true 
}: UniversalCMSMiddlewareProps) {
  const [cmsEnabled, setCmsEnabled] = useState(false);

  useEffect(() => {
    const enabled = localStorage.getItem('cms-enabled') === 'true';
    setCmsEnabled(enabled);
  }, []);

  if (!enableCMS) {
    return <>{children}</>;
  }

  return (
    <UniversalCMSProvider pageId={pageId}>
      <div className="relative">
        {children}
        
        {/* CMS Toggle */}
        <CMSToggle />
        
        {/* Admin Panel */}
        {cmsEnabled && showAdminPanel && (
          <CMSAdminPanel 
            pageId={pageId}
            pageTitle={pageTitle}
            sections={getPageConfig(window.location.pathname).sections}
          />
        )}
      </div>
    </UniversalCMSProvider>
  );
}

// Hook to mark elements as CMS-editable
export function useCMSElement(elementType: string, elementId?: string) {
  const { getElementStyles, applyStyles } = useUniversalCMS();
  
  const styles = getElementStyles(elementType, elementId);
  const css = applyStyles(elementType, elementId);
  
  return {
    'data-cms-element': `${elementType}${elementId ? `-${elementId}` : ''}`,
    'data-cms-type': elementType,
    'data-cms-id': elementId,
    style: {
      ...styles,
      '--cms-css': css
    }
  };
}

// Auto-CMS Wrapper for any component
export function withAutoCMS<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  pageConfig: {
    pageId: string;
    pageTitle: string;
    enableCMS?: boolean;
  }
) {
  return function AutoCMSComponent(props: P) {
    return (
      <UniversalCMSMiddleware
        pageId={pageConfig.pageId}
        pageTitle={pageConfig.pageTitle}
        enableCMS={pageConfig.enableCMS}
      >
        <WrappedComponent {...props} />
      </UniversalCMSMiddleware>
    );
  };
}
