'use client';

import { useState } from 'react';
import CMSSidebar from './CMSSidebar';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  Bell, 
  User, 
  Settings, 
  Search,
  Eye,
  Save,
  RotateCcw,
  ExternalLink,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

interface CMSLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  currentPage?: string;
  showSaveButton?: boolean;
  onSave?: () => void;
  onReset?: () => void;
  onPreview?: () => void;
  isSaving?: boolean;
}

export default function CMSLayout({
  children,
  title = 'CMS',
  description = 'Content Management System',
  currentPage,
  showSaveButton = true,
  onSave,
  onReset,
  onPreview,
  isSaving = false
}: CMSLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handlePreview = () => {
    if (onPreview) {
      onPreview();
    } else {
      window.open('/', '_blank');
    }
  };

  return (
    <div className="h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} lg:block`}>
        <CMSSidebar 
          isCollapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </Button>

              {/* Desktop Sidebar Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden lg:flex"
              >
                <Menu className="w-5 h-5" />
              </Button>

              {/* Page Title */}
              <div>
                <h1 className="text-xl font-semibold text-slate-800">{title}</h1>
                <p className="text-sm text-slate-500">{description}</p>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-3">
              {/* Search */}
              <div className="hidden md:flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-saffron-500 focus:border-transparent text-sm w-64"
                  />
                </div>
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </Button>

              {/* Preview Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreview}
                className="flex items-center space-x-2"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">Preview</span>
              </Button>

              {/* Save Button */}
              {showSaveButton && (
                <Button
                  onClick={onSave}
                  disabled={isSaving}
                  className="flex items-center space-x-2 bg-saffron-600 hover:bg-saffron-700"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Saving...' : 'Save'}</span>
                </Button>
              )}

              {/* Reset Button */}
              {onReset && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onReset}
                  className="flex items-center space-x-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span className="hidden sm:inline">Reset</span>
                </Button>
              )}

              {/* User Menu */}
              <div className="relative">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-slate-600" />
                  </div>
                  <span className="hidden sm:inline text-sm font-medium">Admin</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 px-4 py-3">
          <div className="flex items-center justify-between text-sm text-slate-500">
            <div className="flex items-center space-x-4">
              <span>CMS v2.0</span>
              <span>•</span>
              <span>Last saved: 2 minutes ago</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="hover:text-saffron-600 transition-colors">
                <HelpCircle className="w-4 h-4" />
              </button>
              <button className="hover:text-saffron-600 transition-colors">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
