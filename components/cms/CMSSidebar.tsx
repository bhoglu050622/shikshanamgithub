'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Heart, 
  Users, 
  Mail, 
  BookOpen, 
  School, 
  GraduationCap, 
  Brain, 
  Sparkles,
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
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Search,
  Filter,
  Plus,
  Grid,
  List,
  MoreHorizontal,
  ArrowRight,
  Bell,
  User,
  LogOut
} from 'lucide-react';

interface CMSSidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

const navigationSections = [
  {
    id: 'main',
    title: 'Main Pages',
    icon: Globe,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    items: [
      {
        id: 'homepage',
        title: 'Homepage',
        description: 'Main landing page',
        icon: Home,
        href: '/cms',
        badge: 'Primary',
        status: 'active'
      },
      {
        id: 'about',
        title: 'About Us',
        description: 'Company information',
        icon: Users,
        href: '/cms/about',
        badge: 'Company',
        status: 'active'
      },
      {
        id: 'contact',
        title: 'Contact',
        description: 'Contact forms',
        icon: Mail,
        href: '/cms/contact',
        badge: 'Support',
        status: 'active'
      }
    ]
  },
  {
    id: 'fundraising',
    title: 'Fundraising',
    icon: Heart,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    items: [
      {
        id: 'donation',
        title: 'Donation Page',
        description: 'Donation campaigns',
        icon: Heart,
        href: '/cms/donation',
        badge: 'Fundraising',
        status: 'active'
      }
    ]
  },
  {
    id: 'education',
    title: 'Education',
    icon: School,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    items: [
      {
        id: 'schools',
        title: 'Schools Overview',
        description: 'All schools listing',
        icon: School,
        href: '/cms/schools',
        badge: 'Overview',
        status: 'active'
      },
      {
        id: 'sanskrit',
        title: 'Sanskrit School',
        description: 'Ancient language',
        icon: BookOpen,
        href: '/cms/sanskrit-school',
        badge: 'Language',
        status: 'active'
      },
      {
        id: 'darshana',
        title: 'Darshana School',
        description: 'Philosophy & wisdom',
        icon: Brain,
        href: '/cms/darshana-school',
        badge: 'Philosophy',
        status: 'active'
      },
      {
        id: 'self-help',
        title: 'Self-Help School',
        description: 'Life skills',
        icon: GraduationCap,
        href: '/cms/self-help-school',
        badge: 'Life Skills',
        status: 'active'
      }
    ]
  },
  {
    id: 'content',
    title: 'Content',
    icon: FileText,
    color: 'text-slate-600',
    bgColor: 'bg-slate-50',
    items: [
      {
        id: 'blog',
        title: 'Blog Posts',
        description: 'Manage blog content',
        icon: FileText,
        href: '/cms/blog',
        badge: 'Content',
        status: 'coming-soon'
      },
      {
        id: 'events',
        title: 'Events',
        description: 'Events & workshops',
        icon: Settings,
        href: '/cms/events',
        badge: 'Events',
        status: 'coming-soon'
      }
    ]
  },
  {
    id: 'system',
    title: 'System',
    icon: Settings,
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    items: [
      {
        id: 'dashboard',
        title: 'Universal Dashboard',
        description: 'All content types overview',
        icon: BarChart3,
        href: '/cms/dashboard',
        badge: 'Overview',
        status: 'active'
      },
      {
        id: 'analytics',
        title: 'Analytics',
        description: 'Content performance',
        icon: BarChart3,
        href: '/cms/analytics',
        badge: 'Analytics',
        status: 'coming-soon'
      }
    ]
  }
];

const quickActions = [
  {
    id: 'preview',
    title: 'Preview Site',
    icon: Eye,
    href: '/',
    external: true
  },
  {
    id: 'analytics',
    title: 'Analytics',
    icon: BarChart3,
    href: '/cms/analytics'
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: Settings,
    href: '/cms/settings'
  }
];

export default function CMSSidebar({ isCollapsed = false, onToggle }: CMSSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['main']);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

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

  const filteredSections = navigationSections.map(section => ({
    ...section,
    items: section.items.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.items.length > 0);

  return (
    <div className={`bg-white/95 backdrop-blur-sm border-r border-slate-200/60 shadow-xl flex flex-col h-full transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-80'
    }`}>
      {/* Enhanced Header */}
      <div className="p-4 border-b border-slate-200/60 bg-gradient-to-r from-saffron-50 to-orange-50">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-saffron-500 to-saffron-600 rounded-xl flex items-center justify-center shadow-lg">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">Shikshanam CMS</h2>
                <p className="text-xs text-slate-600">Content Management System</p>
              </div>
            </div>
          )}
          <button
            onClick={onToggle}
            className="p-2 hover:bg-white/80 rounded-lg transition-all duration-200 hover:shadow-md"
          >
            {isCollapsed ? <Menu className="w-5 h-5 text-slate-600" /> : <X className="w-5 h-5 text-slate-600" />}
          </button>
        </div>
      </div>

      {/* Enhanced Search */}
      {!isCollapsed && (
        <div className="p-4 border-b border-slate-200/60 bg-gray-50/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search pages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-200/60 rounded-xl focus:ring-2 focus:ring-saffron-500 focus:border-transparent text-sm bg-white/80 backdrop-blur-sm transition-all duration-200 hover:bg-white"
            />
          </div>
        </div>
      )}

      {/* Enhanced Navigation */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
        <div className="p-4 space-y-3">
          {filteredSections.map((section) => (
            <div key={section.id} className="space-y-2">
              {!isCollapsed && (
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between p-3 hover:bg-white/80 rounded-xl transition-all duration-200 hover:shadow-sm group"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${section.bgColor} group-hover:scale-105 transition-transform duration-200`}>
                      <section.icon className={`w-5 h-5 ${section.color}`} />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-semibold text-slate-800">{section.title}</span>
                      <span className="text-xs text-slate-500">{section.items.length} items</span>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    expandedSections.includes(section.id) ? 'rotate-90' : ''
                  }`} />
                </button>
              )}
              
              {isCollapsed && (
                <div className="flex justify-center">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="p-2 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    <section.icon className={`w-5 h-5 ${section.color}`} />
                  </button>
                </div>
              )}
              
              {(!isCollapsed && expandedSections.includes(section.id)) && (
                <div className="ml-6 space-y-2 border-l-2 border-slate-100 pl-4">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group border ${
                          isActive 
                            ? 'bg-saffron-50 border-saffron-200 shadow-md shadow-saffron-100' 
                            : 'hover:bg-white/80 hover:border-slate-200 hover:shadow-sm border-transparent'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                          isActive 
                            ? 'bg-saffron-500 shadow-lg shadow-saffron-200' 
                            : 'bg-slate-100 group-hover:bg-slate-200 group-hover:scale-105'
                        }`}>
                          <item.icon className={`w-5 h-5 ${
                            isActive ? 'text-white' : 'text-slate-600'
                          }`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className={`font-semibold truncate ${
                              isActive ? 'text-saffron-800' : 'text-slate-800'
                            }`}>
                              {item.title}
                            </h4>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                              {item.badge}
                            </span>
                            {getStatusIcon(item.status)}
                          </div>
                          <p className="text-xs text-slate-500 truncate">
                            {item.description}
                          </p>
                        </div>
                        
                        {isActive && (
                          <div className="w-3 h-3 bg-saffron-500 rounded-full shadow-sm" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      {!isCollapsed && (
        <div className="p-4 border-t border-slate-200">
          <h4 className="text-sm font-medium text-slate-700 mb-3">Quick Actions</h4>
          <div className="space-y-2">
            {quickActions.map((action) => (
              <Link
                key={action.id}
                href={action.href}
                target={action.external ? '_blank' : undefined}
                className="flex items-center space-x-3 p-2 hover:bg-slate-50 rounded-lg transition-colors group"
              >
                <div className="w-8 h-8 bg-slate-100 group-hover:bg-slate-200 rounded-lg flex items-center justify-center">
                  <action.icon className="w-4 h-4 text-slate-600" />
                </div>
                <span className="font-medium text-slate-700 group-hover:text-saffron-600">
                  {action.title}
                </span>
                {action.external && (
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                )}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="p-4 border-t border-slate-200">
        {!isCollapsed ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-slate-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700">Admin User</p>
                <p className="text-xs text-slate-500">CMS Manager</p>
              </div>
            </div>
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <LogOut className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <User className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
