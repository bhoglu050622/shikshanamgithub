'use client';

import React from 'react';
import Image from 'next/image';
import { UniversalCMSProvider, useUniversalCMS } from './UniversalCMS';

// Higher-order component to wrap any page with CMS capabilities
export function withUniversalCMS<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  pageConfig: {
    pageId: string;
    pageTitle: string;
    sections: Array<{
      id: string;
      name: string;
      icon: React.ComponentType<any>;
      description?: string;
    }>;
  }
) {
  return function CMSWrappedComponent(props: P) {
    return (
      <UniversalCMSProvider 
        pageId={pageConfig.pageId}
        initialCustomizations={{}}
      >
        <WrappedComponent {...props} />
      </UniversalCMSProvider>
    );
  };
}

// Hook to apply CMS styles to any element
export function useCMSStyles(elementType: string, elementId?: string) {
  const { getElementStyles, applyStyles } = useUniversalCMS();
  
  const styles = getElementStyles(elementType, elementId);
  const css = applyStyles(elementType, elementId);
  
  return {
    styles,
    css,
    className: `universal-cms-${elementType}${elementId ? `-${elementId}` : ''}`
  };
}

// CMS-enabled components
export const CMSCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  elementId?: string;
}> = ({ children, className = '', elementId }) => {
  const { className: cmsClassName, css } = useCMSStyles('card', elementId);
  
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className={`universal-cms-card ${cmsClassName} ${className}`}>
        {children}
      </div>
    </>
  );
};

export const CMSButton: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  elementId?: string;
  onClick?: () => void;
}> = ({ children, variant = 'primary', className = '', elementId, onClick }) => {
  const { className: cmsClassName, css } = useCMSStyles('button', elementId);
  
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <button 
        className={`universal-cms-button-${variant} ${cmsClassName} ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};

export const CMSLink: React.FC<{
  children: React.ReactNode;
  href: string;
  className?: string;
  elementId?: string;
  target?: '_blank' | '_self';
}> = ({ children, href, className = '', elementId, target = '_self' }) => {
  const { className: cmsClassName, css } = useCMSStyles('link', elementId);
  
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <a 
        href={href}
        target={target}
        className={`universal-cms-link ${cmsClassName} ${className}`}
      >
        {children}
      </a>
    </>
  );
};

export const CMSText: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  className?: string;
  elementId?: string;
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  elementId, 
  as: Component = 'p' 
}) => {
  const { className: cmsClassName, css } = useCMSStyles('text', elementId);
  
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <Component className={`universal-cms-text-${variant} ${cmsClassName} ${className}`}>
        {children}
      </Component>
    </>
  );
};

export const CMSImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  elementId?: string;
  width?: number;
  height?: number;
}> = ({ src, alt, className = '', elementId, width, height }) => {
  const { className: cmsClassName, css } = useCMSStyles('image', elementId);
  
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <Image 
        src={src}
        alt={alt}
        width={width || 400}
        height={height || 300}
        className={`universal-cms-image ${cmsClassName} ${className}`}
      />
    </>
  );
};

export const CMSVideo: React.FC<{
  src: string;
  className?: string;
  elementId?: string;
  width?: number;
  height?: number;
  controls?: boolean;
}> = ({ src, className = '', elementId, width, height, controls = true }) => {
  const { className: cmsClassName, css } = useCMSStyles('video', elementId);
  
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <video 
        src={src}
        width={width}
        height={height}
        controls={controls}
        className={`universal-cms-video ${cmsClassName} ${className}`}
      />
    </>
  );
};

// CMS Admin Panel Component
export const CMSAdminPanel: React.FC<{
  pageId: string;
  pageTitle: string;
  sections: Array<{
    id: string;
    name: string;
    icon: React.ComponentType<any>;
    description?: string;
  }>;
}> = ({ pageId, pageTitle, sections }) => {
  const { customizations, updateCustomizations } = useUniversalCMS();
  
  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm">
        <h3 className="font-semibold text-lg mb-3">CMS Control Panel</h3>
        <div className="space-y-2">
          <button 
            className="w-full text-left px-3 py-2 bg-blue-50 hover:bg-blue-100 rounded text-sm"
            onClick={() => {
              const newColors = {
                primary: '#3b82f6',
                secondary: '#64748b',
                accent: '#f59e0b'
              };
              updateCustomizations({ ...customizations, colors: newColors });
            }}
          >
            Apply Blue Theme
          </button>
          <button 
            className="w-full text-left px-3 py-2 bg-green-50 hover:bg-green-100 rounded text-sm"
            onClick={() => {
              const newColors = {
                primary: '#10b981',
                secondary: '#059669',
                accent: '#34d399'
              };
              updateCustomizations({ ...customizations, colors: newColors });
            }}
          >
            Apply Green Theme
          </button>
          <button 
            className="w-full text-left px-3 py-2 bg-purple-50 hover:bg-purple-100 rounded text-sm"
            onClick={() => {
              const newColors = {
                primary: '#8b5cf6',
                secondary: '#7c3aed',
                accent: '#a78bfa'
              };
              updateCustomizations({ ...customizations, colors: newColors });
            }}
          >
            Apply Purple Theme
          </button>
          <button 
            className="w-full text-left px-3 py-2 bg-orange-50 hover:bg-orange-100 rounded text-sm"
            onClick={() => {
              const newColors = {
                primary: '#f59e0b',
                secondary: '#d97706',
                accent: '#fbbf24'
              };
              updateCustomizations({ ...customizations, colors: newColors });
            }}
          >
            Apply Orange Theme
          </button>
          <button 
            className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded text-sm"
            onClick={() => {
              updateCustomizations({});
            }}
          >
            Reset All
          </button>
        </div>
      </div>
    </div>
  );
};
