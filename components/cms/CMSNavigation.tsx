'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ChevronDown, 
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
  Settings
} from 'lucide-react';

interface CMSNavigationProps {
  currentPage?: string;
  onNavigate?: (href: string) => void;
}

const cmsNavigation = [
  {
    id: 'homepage',
    title: 'Homepage',
    description: 'Main homepage content and sections',
    icon: Home,
    href: '/cms',
    color: 'bg-blue-500',
    badge: 'Main'
  },
  {
    id: 'donation',
    title: 'Donation',
    description: 'Donation page content and settings',
    icon: Heart,
    href: '/cms/donation',
    color: 'bg-red-500',
    badge: 'Fundraising'
  },
  {
    id: 'about',
    title: 'About',
    description: 'About page content and team info',
    icon: Users,
    href: '/cms/about',
    color: 'bg-green-500',
    badge: 'Company'
  },
  {
    id: 'contact',
    title: 'Contact',
    description: 'Contact page and form settings',
    icon: Mail,
    href: '/cms/contact',
    color: 'bg-purple-500',
    badge: 'Support'
  },
  {
    id: 'schools',
    title: 'Schools',
    description: 'Schools listing and overview',
    icon: School,
    href: '/cms/schools',
    color: 'bg-orange-500',
    badge: 'Education'
  },
  {
    id: 'sanskrit',
    title: 'Sanskrit School',
    description: 'Sanskrit school page content',
    icon: BookOpen,
    href: '/cms/sanskrit-school',
    color: 'bg-yellow-500',
    badge: 'Language'
  },
  {
    id: 'darshana',
    title: 'Darshana School',
    description: 'Darshana philosophy school page',
    icon: Brain,
    href: '/cms/darshana-school',
    color: 'bg-indigo-500',
    badge: 'Philosophy'
  },
  {
    id: 'self-help',
    title: 'Self-Help School',
    description: 'Self-help and life skills content',
    icon: GraduationCap,
    href: '/cms/self-help-school',
    color: 'bg-pink-500',
    badge: 'Life Skills'
  }
];

export default function CMSNavigation({ currentPage, onNavigate }: CMSNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (href: string) => {
    if (onNavigate) {
      onNavigate(href);
    } else {
      window.location.href = href;
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white hover:bg-slate-50 border-slate-300 shadow-sm"
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
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-slate-200 z-50">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">CMS Navigation</h3>
                  <p className="text-sm text-slate-500">Choose a page to edit</p>
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
              
              <div className="grid grid-cols-1 gap-3">
                {cmsNavigation.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.href)}
                    className={`flex items-center space-x-4 p-4 rounded-lg hover:bg-slate-50 transition-all duration-200 group border ${
                      currentPage === item.id 
                        ? 'bg-saffron-50 border-saffron-200 shadow-sm' 
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center shadow-sm`}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="flex-1 text-left">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-slate-800 group-hover:text-saffron-600">
                          {item.title}
                        </h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          item.badge === 'Main' ? 'bg-blue-100 text-blue-700' :
                          item.badge === 'Fundraising' ? 'bg-red-100 text-red-700' :
                          item.badge === 'Company' ? 'bg-green-100 text-green-700' :
                          item.badge === 'Support' ? 'bg-purple-100 text-purple-700' :
                          item.badge === 'Education' ? 'bg-orange-100 text-orange-700' :
                          item.badge === 'Language' ? 'bg-yellow-100 text-yellow-700' :
                          item.badge === 'Philosophy' ? 'bg-indigo-100 text-indigo-700' :
                          'bg-pink-100 text-pink-700'
                        }`}>
                          {item.badge}
                        </span>
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
              
              <div className="mt-6 pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>Quick Actions</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => window.open('/', '_blank')}
                      className="flex items-center space-x-1 text-slate-600 hover:text-saffron-600 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Preview Site</span>
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
