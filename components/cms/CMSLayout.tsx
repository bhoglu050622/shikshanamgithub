'use client';

import React, { useState } from 'react';
import CMSNavigation from './CMSNavigation';
import RevampedCMSDashboard from './RevampedCMSDashboard';
import { Button } from '@/components/ui/button';
import { Menu, X, Maximize2, Minimize2 } from 'lucide-react';

interface CMSLayoutProps {
  onEditContent?: (contentId: string) => void;
  onPreviewContent?: (contentId: string) => void;
  onDuplicateContent?: (contentId: string) => void;
  onDeleteContent?: (contentId: string) => void;
}

export default function CMSLayout({
  onEditContent,
  onPreviewContent,
  onDuplicateContent,
  onDeleteContent
}: CMSLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-80'} transition-all duration-300 flex-shrink-0`}>
        <CMSNavigation 
          isCollapsed={sidebarCollapsed}
          onToggle={toggleSidebar}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="p-2"
            >
              {sidebarCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Content Management System</h1>
              <p className="text-sm text-gray-500">Manage your website content efficiently</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="p-2"
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className={`flex-1 overflow-auto ${isFullscreen ? 'fixed inset-0 z-50 bg-white' : ''}`}>
          <RevampedCMSDashboard
            onEditContent={onEditContent}
            onPreviewContent={onPreviewContent}
            onDuplicateContent={onDuplicateContent}
            onDeleteContent={onDeleteContent}
          />
        </div>
      </div>
    </div>
  );
}
