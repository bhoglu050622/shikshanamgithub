'use client'

import { BookOpen, Users, Tag, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';

interface BlogStatsProps {
  stats: {
    totalPosts: number;
    totalCategories: number;
    totalAuthors: number;
    featuredPosts: number;
    englishPosts: number;
    hindiPosts: number;
    lastUpdated: string;
  };
  className?: string;
}

export default function BlogStats({ stats, className = '' }: BlogStatsProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatDate = (dateString: string) => {
    if (!mounted) return 'Loading...';
    
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const statItems = [
    {
      icon: BookOpen,
      label: 'Total Posts',
      value: stats.totalPosts,
      color: 'text-blog-accent-indigo',
      bgColor: 'bg-blog-accent-indigo/10'
    },
    {
      icon: Tag,
      label: 'Categories',
      value: stats.totalCategories,
      color: 'text-blog-accent-emerald',
      bgColor: 'bg-blog-accent-emerald/10'
    },
    {
      icon: Users,
      label: 'Authors',
      value: stats.totalAuthors,
      color: 'text-blog-accent-rose',
      bgColor: 'bg-blog-accent-rose/10'
    },
    {
      icon: Calendar,
      label: 'Featured',
      value: stats.featuredPosts,
      color: 'text-blog-accent-amber',
      bgColor: 'bg-blog-accent-amber/10'
    }
  ];

  return (
    <div className={`bg-blog-background-primary rounded-2xl sm:rounded-3xl border border-blog-border-light p-4 sm:p-6 lg:p-8 shadow-lg ${className}`}>
      <h3 className="text-xl sm:text-2xl font-bold text-blog-text-primary mb-6 sm:mb-8">Blog Statistics</h3>
      
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
        {statItems.map((item, index) => (
          <div key={index} className="text-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-blog-secondary-50 hover:bg-blog-primary-50 transition-colors">
            <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl ${item.bgColor} mb-2 sm:mb-3 ${item.color}`}>
              <item.icon className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-blog-text-primary mb-1">{item.value}</div>
            <div className="text-xs sm:text-sm text-blog-text-secondary font-medium">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Language Breakdown */}
      <div className="border-t border-blog-border-light pt-4 sm:pt-6">
        <h4 className="text-base sm:text-lg font-semibold text-blog-text-primary mb-3 sm:mb-4">Content by Language</h4>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-blog-text-secondary font-medium">English</span>
              <span className="text-sm font-bold text-blog-text-primary">{stats.englishPosts}</span>
            </div>
            <div className="w-full bg-blog-secondary-200 rounded-full h-2 sm:h-3">
              <div 
                className="bg-blog-accent-indigo h-2 sm:h-3 rounded-full transition-all duration-500"
                style={{ width: `${(stats.englishPosts / stats.totalPosts) * 100}%` }}
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-blog-text-secondary font-medium">Hindi</span>
              <span className="text-sm font-bold text-blog-text-primary">{stats.hindiPosts}</span>
            </div>
            <div className="w-full bg-blog-secondary-200 rounded-full h-2 sm:h-3">
              <div 
                className="bg-blog-accent-saffron h-2 sm:h-3 rounded-full transition-all duration-500"
                style={{ width: `${(stats.hindiPosts / stats.totalPosts) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Last Updated */}
      <div className="border-t border-blog-border-light pt-4 mt-6">
        <p className="text-sm text-blog-text-muted">
          Last updated: {formatDate(stats.lastUpdated)}
        </p>
      </div>
    </div>
  );
}
