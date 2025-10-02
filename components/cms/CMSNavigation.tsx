'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home,
  Users,
  Mail,
  Heart,
  School,
  BookOpen,
  Brain,
  GraduationCap,
  FileText,
  Settings,
  BarChart3,
  Eye,
  Edit3,
  Plus,
  Search,
  Filter,
  Grid,
  List,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Globe,
  MessageSquare,
  Shield,
  Target,
  Lightbulb,
  Zap,
  Sparkles,
  Package,
  Layers,
  BookMarked,
  User,
  LogOut,
  Bell,
  Database,
  Cog,
  ExternalLink,
  TrendingUp,
  Star,
  Clock,
  DollarSign,
  Video,
  Image,
  Code,
  Palette,
  Layout,
  Type,
  Link as LinkIcon,
  FolderOpen,
  MoreHorizontal,
  ArrowRight,
  RefreshCw,
  Copy,
  Trash2,
  Edit,
  Eye as EyeIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

interface NavigationItem {
  id: string;
  title: string;
  description?: string;
  icon: any;
  href?: string;
  badge?: string;
  status?: 'active' | 'inactive' | 'draft' | 'coming-soon';
  children?: NavigationItem[];
  external?: boolean;
  color?: string;
  bgColor?: string;
}

interface CMSNavigationProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
  className?: string;
}

const navigationSections: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    description: 'Overview & Analytics',
    icon: BarChart3,
    href: '/cms',
    badge: 'Main',
    status: 'active',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    id: 'main-pages',
    title: 'Main Pages',
    description: 'Core website pages',
    icon: Globe,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    children: [
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
        description: 'Contact forms & info',
        icon: Mail,
        href: '/cms/contact',
        badge: 'Support',
        status: 'active'
      },
      {
        id: 'donation',
        title: 'Donation',
        description: 'Fundraising page',
        icon: Heart,
        href: '/cms/donation',
        badge: 'Fundraising',
        status: 'active'
      },
      {
        id: 'career',
        title: 'Career',
        description: 'Job listings',
        icon: Target,
        href: '/cms/career',
        badge: 'Jobs',
        status: 'active'
      },
      {
        id: 'accessibility',
        title: 'Accessibility',
        description: 'Accessibility statement',
        icon: Shield,
        href: '/cms/accessibility',
        badge: 'Compliance',
        status: 'active'
      },
      {
        id: 'privacy',
        title: 'Privacy Policy',
        description: 'Privacy & data protection',
        icon: Shield,
        href: '/cms/privacy',
        badge: 'Legal',
        status: 'active'
      },
      {
        id: 'terms',
        title: 'Terms of Service',
        description: 'Terms & conditions',
        icon: FileText,
        href: '/cms/terms',
        badge: 'Legal',
        status: 'active'
      },
      {
        id: 'help',
        title: 'Help Center',
        description: 'FAQ & support',
        icon: Lightbulb,
        href: '/cms/help',
        badge: 'Support',
        status: 'active'
      }
    ]
  },
  {
    id: 'education',
    title: 'Education',
    description: 'Schools & Learning',
    icon: School,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    children: [
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
        id: 'sanskrit-school',
        title: 'Sanskrit School',
        description: 'Ancient language learning',
        icon: BookOpen,
        href: '/cms/sanskrit-school',
        badge: 'Language',
        status: 'active'
      },
      {
        id: 'darshana-school',
        title: 'Darshana School',
        description: 'Philosophy & wisdom',
        icon: Brain,
        href: '/cms/darshana-school',
        badge: 'Philosophy',
        status: 'active'
      },
      {
        id: 'self-help-school',
        title: 'Self-Help School',
        description: 'Life skills & development',
        icon: GraduationCap,
        href: '/cms/self-help-school',
        badge: 'Life Skills',
        status: 'active'
      },
      {
        id: 'courses',
        title: 'Individual Courses',
        description: 'Course management',
        icon: BookOpen,
        href: '/cms/courses',
        badge: 'Courses',
        status: 'active'
      },
      {
        id: 'packages',
        title: 'Course Packages',
        description: 'Course bundles',
        icon: Package,
        href: '/cms/packages',
        badge: 'Bundles',
        status: 'active'
      }
    ]
  },
  {
    id: 'content',
    title: 'Content',
    description: 'Blogs & Articles',
    icon: FileText,
    color: 'text-slate-600',
    bgColor: 'bg-slate-50',
    children: [
      {
        id: 'blog',
        title: 'Blog Posts',
        description: 'Manage blog content',
        icon: FileText,
        href: '/cms/blog',
        badge: 'Content',
        status: 'active'
      },
      {
        id: 'wisdom',
        title: 'Wisdom',
        description: 'Spiritual teachings',
        icon: Sparkles,
        href: '/cms/wisdom',
        badge: 'Wisdom',
        status: 'active'
      },
      {
        id: 'gurus',
        title: 'Gurus',
        description: 'Spiritual teachers',
        icon: Users,
        href: '/cms/gurus',
        badge: 'Teachers',
        status: 'active'
      },
      {
        id: 'tools',
        title: 'Tools',
        description: 'Spiritual tools',
        icon: Zap,
        href: '/cms/tools',
        badge: 'Tools',
        status: 'active'
      }
    ]
  },
  {
    id: 'special-features',
    title: 'Special Features',
    description: 'Advanced tools',
    icon: Layers,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    children: [
      {
        id: 'guna-profiler',
        title: 'Guna Profiler',
        description: 'Personality assessment',
        icon: Brain,
        href: '/cms/guna-profiler',
        badge: 'Assessment',
        status: 'active'
      },
      {
        id: 'dharma-path',
        title: 'Dharma Path',
        description: 'Spiritual journey',
        icon: Target,
        href: '/cms/dharma-path',
        badge: 'Journey',
        status: 'active'
      },
      {
        id: 'how-aligned',
        title: 'How Aligned Are You',
        description: 'Alignment assessment',
        icon: TrendingUp,
        href: '/cms/how-aligned-are-you',
        badge: 'Assessment',
        status: 'active'
      }
    ]
  },
  {
    id: 'system',
    title: 'System',
    description: 'Admin & Settings',
    icon: Settings,
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    children: [
      {
        id: 'analytics',
        title: 'Analytics',
        description: 'Content performance',
        icon: BarChart3,
        href: '/cms/analytics',
        badge: 'Analytics',
        status: 'active'
      },
      {
        id: 'imported-data',
        title: 'Imported Data',
        description: 'Data management',
        icon: Database,
        href: '/cms/imported-data',
        badge: 'Data',
        status: 'active'
      },
      {
        id: 'settings',
        title: 'Settings',
        description: 'System configuration',
        icon: Cog,
        href: '/cms/settings',
        badge: 'Config',
        status: 'active'
      }
    ]
  }
];

const quickActions = [
  {
    id: 'preview',
    title: 'Preview Site',
    description: 'View live website',
    icon: Eye,
    href: '/',
    external: true,
    badge: 'Live'
  },
  {
    id: 'add-content',
    title: 'Add Content',
    description: 'Create new content',
    icon: Plus,
    href: '/cms/edit/new',
    badge: 'New'
  },
  {
    id: 'refresh',
    title: 'Refresh Data',
    description: 'Reload all data',
    icon: RefreshCw,
    href: '#',
    badge: 'Sync'
  }
];

export default function CMSNavigation({ 
  isCollapsed = false, 
  onToggle,
  className = ''
}: CMSNavigationProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['dashboard', 'main-pages']);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'coming-soon': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isActive = (href?: string) => {
    if (!href) return false;
    return pathname === href || pathname.startsWith(href + '/');
  };

  const filteredSections = navigationSections.map(section => ({
    ...section,
    children: section.children?.filter(child => 
      child.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      child.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => 
    section.children?.length || 
    section.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`h-full bg-white border-r border-gray-200 flex flex-col ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900">CMS Hub</h2>
              <p className="text-xs text-gray-500">Content Management</p>
            </div>
          </div>
          {onToggle && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="p-2"
            >
              {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
            </Button>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 text-sm"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-1">
          {filteredSections.map((section) => {
            const isExpanded = expandedSections.includes(section.id);
            const hasChildren = section.children && section.children.length > 0;
            const SectionIcon = section.icon;

            return (
              <div key={section.id} className="space-y-1">
                {/* Section Header */}
                <div
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                    isActive(section.href) ? 'bg-blue-50 border border-blue-200' : ''
                  }`}
                  onClick={() => {
                    if (hasChildren) {
                      toggleSection(section.id);
                    } else if (section.href) {
                      window.location.href = section.href;
                    }
                  }}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`p-2 rounded-lg ${section.bgColor || 'bg-gray-100'}`}>
                      <SectionIcon className={`h-4 w-4 ${section.color || 'text-gray-600'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-gray-900 truncate">
                        {section.title}
                      </div>
                      {!isCollapsed && section.description && (
                        <div className="text-xs text-gray-500 truncate">
                          {section.description}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {section.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {section.badge}
                      </Badge>
                    )}
                    {hasChildren && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSection(section.id);
                        }}
                      >
                        {isExpanded ? (
                          <ChevronDown className="h-3 w-3" />
                        ) : (
                          <ChevronRight className="h-3 w-3" />
                        )}
                      </Button>
                    )}
                  </div>
                </div>

                {/* Section Children */}
                {isExpanded && hasChildren && (
                  <div className="ml-6 space-y-1 border-l border-gray-200 pl-4">
                    {section.children?.map((child) => {
                      const ChildIcon = child.icon;
                      const isChildActive = isActive(child.href);

                      return (
                        <Link
                          key={child.id}
                          href={child.href || '#'}
                          className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-200 hover:bg-gray-50 ${
                            isChildActive ? 'bg-blue-50 border border-blue-200' : ''
                          }`}
                          target={child.external ? '_blank' : undefined}
                        >
                          <div className={`p-1.5 rounded ${child.bgColor || 'bg-gray-100'}`}>
                            <ChildIcon className={`h-3 w-3 ${child.color || 'text-gray-600'}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm text-gray-900 truncate">
                              {child.title}
                            </div>
                            {!isCollapsed && child.description && (
                              <div className="text-xs text-gray-500 truncate">
                                {child.description}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            {child.badge && (
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${getStatusColor(child.status)}`}
                              >
                                {child.badge}
                              </Badge>
                            )}
                            {child.external && (
                              <ExternalLink className="h-3 w-3 text-gray-400" />
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-gray-200">
        <div className="space-y-2">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Quick Actions
          </div>
          {quickActions.map((action) => {
            const ActionIcon = action.icon;
            return (
              <Link
                key={action.id}
                href={action.href}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                target={action.external ? '_blank' : undefined}
              >
                <div className="p-1.5 bg-gray-100 rounded">
                  <ActionIcon className="h-3 w-3 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-gray-900 truncate">
                    {action.title}
                  </div>
                  {!isCollapsed && action.description && (
                    <div className="text-xs text-gray-500 truncate">
                      {action.description}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {action.badge && (
                    <Badge variant="outline" className="text-xs">
                      {action.badge}
                    </Badge>
                  )}
                  {action.external && (
                    <ExternalLink className="h-3 w-3 text-gray-400" />
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-900">System Status</div>
            <div className="text-xs text-gray-500">All systems operational</div>
          </div>
        </div>
      </div>
    </div>
  );
}
