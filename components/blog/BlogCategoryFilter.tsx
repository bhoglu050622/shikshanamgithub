'use client';

import { useState } from 'react';
import { BlogCategory } from '@/lib/blog-data';
import { Filter, X } from 'lucide-react';

interface BlogCategoryFilterProps {
  categories: BlogCategory[];
  selectedCategory: string | null;
  onCategoryChange: (categorySlug: string | null) => void;
  className?: string;
}

export default function BlogCategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange,
  className = '' 
}: BlogCategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCategorySelect = (categorySlug: string | null) => {
    onCategoryChange(categorySlug);
    setIsOpen(false);
  };

  const selectedCategoryData = categories.find(cat => cat.slug === selectedCategory);

  return (
    <div className={`relative ${className}`}>
      {/* Filter Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl border border-blog-border-light bg-blog-background-primary hover:bg-blog-primary-50 text-blog-text-primary transition-colors min-w-[160px] sm:min-w-[200px] w-full sm:w-auto"
      >
        <Filter className="w-4 h-4 text-blog-primary-500" />
        <span className="text-sm font-medium truncate">
          {selectedCategoryData ? selectedCategoryData.name : 'All Categories'}
        </span>
        {selectedCategory && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCategorySelect(null);
            }}
            className="ml-1 p-1 hover:bg-blog-secondary-200 rounded-full transition-colors"
          >
            <X className="w-3 h-3 text-blog-text-muted" />
          </button>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full sm:w-64 bg-blog-background-primary border border-blog-border-light rounded-xl shadow-lg z-50">
          <div className="p-2">
            {/* All Categories Option */}
            <button
              onClick={() => handleCategorySelect(null)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                !selectedCategory 
                  ? 'bg-blog-primary-100 text-blog-primary-600' 
                  : 'hover:bg-blog-primary-50 text-blog-text-primary'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">All Categories</span>
                <span className="text-xs text-blog-text-muted">
                  {categories.reduce((sum, cat) => sum + cat.postCount, 0)}
                </span>
              </div>
            </button>

            {/* Category Options */}
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.slug)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  selectedCategory === category.slug
                    ? 'bg-blog-primary-100 text-blog-primary-600'
                    : 'hover:bg-blog-primary-50 text-blog-text-primary'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-sm font-medium">{category.name}</span>
                  </div>
                  <span className="text-xs text-blog-text-muted">
                    {category.postCount}
                  </span>
                </div>
                <p className="text-xs text-blog-text-secondary mt-1">
                  {category.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
