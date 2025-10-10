'use client';

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface BlogSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export default function BlogSearch({ 
  onSearch, 
  placeholder = "Search blog posts...",
  className = '' 
}: BlogSearchProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className={`relative ${className}`}>
      <div className={`
        relative flex items-center rounded-xl border transition-all duration-200
        ${isFocused 
          ? 'border-blog-primary-500 bg-blog-background-primary' 
          : 'border-blog-border-light bg-blog-background-primary'
        }
      `}>
        {/* Search Icon */}
        <div className="pl-3 sm:pl-4 pr-2">
          <Search className={`w-4 h-4 ${isFocused ? 'text-blog-primary-500' : 'text-blog-text-muted'}`} />
        </div>

        {/* Input */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 py-2.5 sm:py-3 pr-4 bg-transparent text-blog-text-primary placeholder-blog-text-muted focus:outline-none text-sm sm:text-base"
        />

        {/* Clear Button */}
        {query && (
          <button
            onClick={handleClear}
            className="p-1.5 sm:p-2 hover:bg-blog-secondary-200 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-blog-text-muted" />
          </button>
        )}
      </div>

      {/* Search Suggestions (can be enhanced later) */}
      {isFocused && query && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-blog-background-primary border border-blog-border-light rounded-xl shadow-lg z-50">
          <div className="p-3 text-sm text-blog-text-secondary">
            Searching for "{query}"...
          </div>
        </div>
      )}
    </div>
  );
}
