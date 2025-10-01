'use client';

import React, { useState, useEffect } from 'react';
import CMSSidebar from './CMSSidebar';
import { Button } from '@/components/ui/button';
import { Save, RotateCcw, Eye, ExternalLink, PanelLeftOpen, PanelLeftClose, Maximize2, Minimize2 } from 'lucide-react';
import Link from 'next/link';
import { Message } from '@/lib/cms/types';
import LivePreview from './LivePreview';
import { cn } from '@/lib/utils';

interface CMSLayoutWithPreviewProps {
  children: React.ReactNode;
  pageTitle: string;
  pageDescription: string;
  currentPage: string;
  previewLink: string;
  onSave: () => void;
  onReset?: () => void;
  saving: boolean;
  message: Message | null;
}

export default function CMSLayoutWithPreview({
  children,
  pageTitle,
  pageDescription,
  currentPage,
  previewLink,
  onSave,
  onReset,
  saving,
  message,
}: CMSLayoutWithPreviewProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [isFullScreenPreview, setIsFullScreenPreview] = useState(false);
  const [contentKey, setContentKey] = useState(Date.now().toString());

  // Effect to update contentKey when saving is complete and successful
  useEffect(() => {
    if (!saving && message?.type === 'success') {
      setContentKey(Date.now().toString());
    }
  }, [saving, message]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
    if (isFullScreenPreview && !showPreview) {
      setIsFullScreenPreview(false);
    }
  };

  const toggleFullScreenPreview = () => {
    setIsFullScreenPreview(!isFullScreenPreview);
    if (!showPreview && !isFullScreenPreview) {
      setShowPreview(true);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <CMSSidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />

      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-300 ease-in-out",
          isSidebarCollapsed ? "md:ml-20" : "md:ml-64",
          isFullScreenPreview ? "w-full" : (showPreview ? "md:w-1/2" : "w-full")
        )}
      >
        {/* Enhanced Header */}
        <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200/60 shadow-sm z-10 sticky top-0">
          <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleSidebar}
                  className="hidden md:flex hover:bg-gray-100 transition-colors"
                  title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                >
                  {isSidebarCollapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
                </Button>
                <div className="flex flex-col">
                  <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{pageTitle}</h1>
                  <p className="text-sm text-gray-600 mt-1">{pageDescription}</p>
                </div>
              </div>
              
              {/* Enhanced Action Buttons */}
              <div className="flex items-center space-x-2">
                {/* Preview Controls */}
                <div className="flex items-center space-x-2 border-r border-gray-200 pr-3 mr-3">
                  <Button
                    variant={showPreview ? "default" : "outline"}
                    onClick={togglePreview}
                    size="sm"
                    className="flex items-center space-x-2 transition-all duration-200 hover:scale-105"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="hidden sm:inline">{showPreview ? 'Hide Preview' : 'Show Preview'}</span>
                  </Button>
                  {showPreview && (
                    <Button
                      variant="outline"
                      onClick={toggleFullScreenPreview}
                      size="sm"
                      className="transition-all duration-200 hover:scale-105"
                      title={isFullScreenPreview ? "Exit Fullscreen" : "Fullscreen Preview"}
                    >
                      {isFullScreenPreview ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                      <span className="hidden sm:inline ml-2">{isFullScreenPreview ? 'Exit' : 'Fullscreen'}</span>
                    </Button>
                  )}
                </div>

                {/* External Link */}
                <Link href={previewLink} target="_blank">
                  <Button variant="outline" size="sm" className="flex items-center space-x-2 transition-all duration-200 hover:scale-105">
                    <ExternalLink className="w-4 h-4" />
                    <span className="hidden sm:inline">Live Site</span>
                  </Button>
                </Link>

                {/* Reset Button */}
                {onReset && (
                  <Button
                    variant="outline"
                    onClick={onReset}
                    disabled={saving}
                    size="sm"
                    className="flex items-center space-x-2 transition-all duration-200 hover:scale-105 disabled:opacity-50"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span className="hidden sm:inline">Reset</span>
                  </Button>
                )}

                {/* Save Button */}
                <Button 
                  onClick={onSave} 
                  disabled={saving} 
                  size="sm"
                  className="flex items-center space-x-2 bg-saffron-600 hover:bg-saffron-700 text-white transition-all duration-200 hover:scale-105 disabled:opacity-50 shadow-lg shadow-saffron-200"
                >
                  <Save className="w-4 h-4" />
                  <span className="hidden sm:inline font-medium">{saving ? 'Saving...' : 'Save All'}</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Enhanced Message Display */}
        {message && (
          <div className={`mx-4 mt-4 rounded-lg shadow-sm border-l-4 transition-all duration-300 ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 border-green-400 shadow-green-100'
              : message.type === 'error'
              ? 'bg-red-50 text-red-800 border-red-400 shadow-red-100'
              : 'bg-blue-50 text-blue-800 border-blue-400 shadow-blue-100'
          }`}>
            <div className="flex items-center p-4">
              <div className="flex-shrink-0">
                {message.type === 'success' && (
                  <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                {message.type === 'error' && (
                  <div className="w-5 h-5 bg-red-400 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                {message.type === 'info' && (
                  <div className="w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{message.text}</p>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Main Content Area */}
        <main className={cn(
          "flex-1 overflow-y-auto transition-all duration-300",
          isFullScreenPreview ? "hidden" : "",
          "bg-gradient-to-br from-slate-50 via-white to-gray-50"
        )}>
          <div className="max-w-7xl mx-auto p-6 lg:p-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/60 p-6 lg:p-8 hover:shadow-xl transition-all duration-300">
              {children}
            </div>
          </div>
        </main>

        {/* Enhanced Live Preview Panel */}
        {showPreview && (
          <div className={cn(
            "border-l border-gray-200/60 bg-white shadow-lg",
            isFullScreenPreview ? "fixed inset-0 z-50" : "w-1/2"
          )}>
            <div className="h-full flex flex-col">
              <div className="bg-gray-50 border-b border-gray-200 px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Live Preview</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">Auto-refresh: 5s</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <LivePreview
                  url={previewLink}
                  title="Live Preview"
                  description="Real-time preview of your content changes"
                  autoRefresh={true}
                  refreshInterval={5000}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}