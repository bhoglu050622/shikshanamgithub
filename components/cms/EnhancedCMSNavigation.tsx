'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  ChevronDown, 
  ChevronRight,
  Menu, 
  X, 
  Home, 
  Heart, 
  Users, 
  Mail, 
  BookOpen, 
  School, 
  GraduationCap, 
  Brain, 
  Sparkles,
  ArrowRight,
  ExternalLink,
  Settings,
  Globe,
  FileText,
  Layers,
  Zap,
  Star,
  Shield,
  Target,
  Lightbulb,
  BookMarked,
  MessageSquare,
  BarChart3,
  Database,
  Cog,
  Eye,
  Edit3,
  Trash2,
  Plus,
  Search,
  Filter,
  SortAsc,
  Grid,
  List,
  MoreHorizontal,
  Calendar
} from 'lucide-react';

interface EnhancedCMSNavigationProps {
  currentPage?: string;
  onNavigate?: (href: string) => void;
}

const cmsSections = {
  main: {
    title: 'Main Pages',
    icon: Globe,
    color: 'bg-blue-500',
    items: [
      {
        id: 'homepage',
        title: 'Homepage',
        description: 'Main landing page content',
        icon: Home,
        href: '/cms',
        color: 'bg-blue-500',
        badge: 'Primary',
        status: 'active'
      },
      {
        id: 'about',
        title: 'About Us',
        description: 'Company information and team',
        icon: Users,
        href: '/cms/about',
        color: 'bg-green-500',
        badge: 'Company',
        status: 'active'
      },
      {
        id: 'contact',
        title: 'Contact',
        description: 'Contact forms and information',
        icon: Mail,
        href: '/cms/contact',
        color: 'bg-purple-500',
        badge: 'Support',
        status: 'active'
      }
    ]
  },
  fundraising: {
    title: 'Fundraising',
    icon: Heart,
    color: 'bg-red-500',
    items: [
      {
        id: 'donation',
        title: 'Donation Page',
        description: 'Donation campaigns and settings',
        icon: Heart,
        href: '/cms/donation',
        color: 'bg-red-500',
        badge: 'Fundraising',
        status: 'active'
      }
    ]
  },
  education: {
    title: 'Education',
    icon: School,
    color: 'bg-orange-500',
    items: [
      {
        id: 'schools',
        title: 'Schools Overview',
        description: 'All schools listing page',
        icon: School,
        href: '/cms/schools',
        color: 'bg-orange-500',
        badge: 'Overview',
        status: 'active'
      },
      {
        id: 'sanskrit',
        title: 'Sanskrit School',
        description: 'Ancient language learning',
        icon: BookOpen,
        href: '/cms/sanskrit-school',
        color: 'bg-yellow-500',
        badge: 'Language',
        status: 'active'
      },
      {
        id: 'darshana',
        title: 'Darshana School',
        description: 'Philosophy and wisdom',
        icon: Brain,
        href: '/cms/darshana-school',
        color: 'bg-indigo-500',
        badge: 'Philosophy',
        status: 'active'
      },
      {
        id: 'self-help',
        title: 'Self-Help School',
        description: 'Life skills and development',
        icon: GraduationCap,
        href: '/cms/self-help-school',
        color: 'bg-pink-500',
        badge: 'Life Skills',
        status: 'active'
      }
    ]
  },
  content: {
    title: 'Content Management',
    icon: FileText,
    color: 'bg-slate-500',
    items: [
      {
        id: 'blog',
        title: 'Blog Posts',
        description: 'Manage blog content',
        icon: FileText,
        href: '/cms/blog',
        color: 'bg-slate-500',
        badge: 'Content',
        status: 'coming-soon'
      },
      {
        id: 'events',
        title: 'Events',
        description: 'Manage events and workshops',
        icon: Calendar,
        href: '/cms/events',
        color: 'bg-emerald-500',
        badge: 'Events',
        status: 'coming-soon'
      }
    ]
  }
};

const quickActions = [
  {
    id: 'preview',
    title: 'Preview Site',
    description: 'View the live website',
    icon: Eye,
    action: () => window.open('/', '_blank'),
    color: 'bg-blue-500'
  },
  {
    id: 'settings',
    title: 'CMS Settings',
    description: 'Configure CMS options',
    icon: Settings,
    action: () => window.open('/cms/settings', '_blank'),
    color: 'bg-slate-500'
  },
  {
    id: 'analytics',
    title: 'Analytics',
    description: 'View site analytics',
    icon: BarChart3,
    action: () => window.open('/cms/analytics', '_blank'),
    color: 'bg-green-500'
  }
];

export default function EnhancedCMSNavigation({ currentPage, onNavigate }: EnhancedCMSNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(['main']);

  const handleNavigate = (href: string) => {
    if (onNavigate) {
      onNavigate(href);
    } else {
      window.location.href = href;
    }
    setIsOpen(false);
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'coming-soon': return 'bg-yellow-100 text-yellow-700';
      case 'maintenance': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <div className="w-2 h-2 bg-green-500 rounded-full" />;
      case 'coming-soon': return <div className="w-2 h-2 bg-yellow-500 rounded-full" />;
      case 'maintenance': return <div className="w-2 h-2 bg-red-500 rounded-full" />;
      default: return <div className="w-2 h-2 bg-slate-500 rounded-full" />;
    }
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white hover:bg-slate-50 border-slate-300 shadow-sm min-w-[140px]"
      >
        <Menu className="w-4 h-4" />
        <span>Navigate CMS</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>
      
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Enhanced Dropdown */}
          <div className="absolute right-0 mt-2 w-[420px] bg-white rounded-xl shadow-2xl border border-slate-200 z-50 max-h-[80vh] overflow-hidden">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 flex items-center space-x-2">
                    <Database className="w-5 h-5 text-saffron-600" />
                    <span>CMS Navigation</span>
                  </h3>
                  <p className="text-sm text-slate-500">Manage your content efficiently</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 p-0 hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Search Bar */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search pages..."
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-saffron-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              {/* Navigation Sections */}
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {Object.entries(cmsSections).map(([sectionKey, section]) => (
                  <div key={sectionKey} className="border border-slate-200 rounded-lg">
                    <button
                      onClick={() => toggleSection(sectionKey)}
                      className="w-full flex items-center justify-between p-3 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 ${section.color} rounded-lg flex items-center justify-center`}>
                          <section.icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-left">
                          <h4 className="font-medium text-slate-800">{section.title}</h4>
                          <p className="text-xs text-slate-500">{section.items.length} pages</p>
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${
                        expandedSections.includes(sectionKey) ? 'rotate-90' : ''
                      }`} />
                    </button>
                    
                    {expandedSections.includes(sectionKey) && (
                      <div className="border-t border-slate-200 bg-slate-50/50">
                        {section.items.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => handleNavigate(item.href)}
                            className={`w-full flex items-center space-x-4 p-3 hover:bg-white transition-all duration-200 group border-l-4 ${
                              currentPage === item.id 
                                ? 'bg-saffron-50 border-saffron-400 shadow-sm' 
                                : 'border-transparent hover:border-slate-300'
                            }`}
                          >
                            <div className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center shadow-sm`}>
                              <item.icon className="w-5 h-5 text-white" />
                            </div>
                            
                            <div className="flex-1 text-left">
                              <div className="flex items-center space-x-2 mb-1">
                                <h5 className="font-medium text-slate-800 group-hover:text-saffron-600">
                                  {item.title}
                                </h5>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                                  {item.badge}
                                </span>
                                {getStatusIcon(item.status)}
                              </div>
                              <p className="text-sm text-slate-500 group-hover:text-slate-600">
                                {item.description}
                              </p>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              {currentPage === item.id && (
                                <div className="w-2 h-2 bg-saffron-500 rounded-full" />
                              )}
                              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-saffron-600 transition-colors" />
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Quick Actions */}
              <div className="mt-6 pt-4 border-t border-slate-200">
                <h4 className="text-sm font-medium text-slate-700 mb-3">Quick Actions</h4>
                <div className="grid grid-cols-3 gap-2">
                  {quickActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={action.action}
                      className="flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-slate-50 transition-colors group"
                    >
                      <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center`}>
                        <action.icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-medium text-slate-700 group-hover:text-saffron-600">
                          {action.title}
                        </p>
                        <p className="text-xs text-slate-500">
                          {action.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Footer */}
              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>CMS v2.0</span>
                  <div className="flex items-center space-x-4">
                    <button className="hover:text-saffron-600 transition-colors">
                      <Settings className="w-3 h-3" />
                    </button>
                    <button className="hover:text-saffron-600 transition-colors">
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
