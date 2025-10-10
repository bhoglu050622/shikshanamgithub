'use client';

import { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BlogCategory } from '@/lib/blog-data';
import { BlogCategoryFilter, BlogSearch } from './index';

interface WisdomPageClientProps {
  categories: BlogCategory[];
}

export default function WisdomPageClient({ categories }: WisdomPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get('category')
  );
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || ''
  );

  const updateUrl = useCallback((params: Record<string, string | null>) => {
    const newSearchParams = new URLSearchParams(searchParams);
    
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newSearchParams.set(key, value);
      } else {
        newSearchParams.delete(key);
      }
    });
    
    // Reset to page 1 when filters change
    newSearchParams.delete('page');
    
    const newUrl = `/wisdom?${newSearchParams.toString()}`;
    router.push(newUrl);
  }, [router, searchParams]);

  const handleCategoryChange = useCallback((categorySlug: string | null) => {
    setSelectedCategory(categorySlug);
    updateUrl({ category: categorySlug });
  }, [updateUrl]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    updateUrl({ search: query || null });
  }, [updateUrl]);

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-6 sm:mb-8 px-4 sm:px-0">
      <div className="w-full sm:w-auto">
        <BlogCategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>
      <div className="w-full sm:w-80">
        <BlogSearch 
          onSearch={handleSearch}
          placeholder="Search articles, topics, or authors..."
          className="w-full"
        />
      </div>
    </div>
  );
}
