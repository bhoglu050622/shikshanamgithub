import type { Metadata } from 'next'
import { Suspense } from 'react'
import { 
  getAllBlogPosts, 
  getAllCategories, 
  getBlogStats,
  getFeaturedBlogPosts 
} from '@/lib/blog-data'
import { 
  BlogGrid, 
  BlogPagination, 
  BlogStats 
} from '@/components/blog'
import WisdomPageClient from '@/components/blog/WisdomPageClient'
import { BookOpen, Sparkles, TrendingUp } from 'lucide-react'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Wisdom | Ancient Indian Philosophy & Sanskrit Articles',
  description: 'Explore curated articles on Sanskrit, Darshana, and timeless Indian wisdom. Learn from ancient texts and modern interpretations.',
  keywords: ['Sanskrit', 'Darshana', 'Indian philosophy', 'Vedic wisdom', 'ancient wisdom', 'spiritual articles'],
  openGraph: {
    title: 'Wisdom | Shikshanam',
    description: 'Curated articles on Sanskrit, Darshana, and timeless Indian wisdom',
    type: 'website',
    url: 'https://shikshanam.in/wisdom',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wisdom | Shikshanam',
    description: 'Curated articles on Sanskrit, Darshana, and timeless Indian wisdom',
  },
}

function LoadingSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="text-center space-y-4">
        <div className="h-12 bg-sand-beige/20 rounded-lg w-64 mx-auto animate-pulse" />
        <div className="h-6 bg-sand-beige/20 rounded-lg w-96 mx-auto animate-pulse" />
      </div>
      
      {/* Filters Skeleton */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <div className="h-12 bg-sand-beige/20 rounded-xl w-64 animate-pulse" />
        <div className="h-12 bg-sand-beige/20 rounded-xl w-80 animate-pulse" />
      </div>
      
      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl overflow-hidden border border-premium-border bg-white/70 dark:bg-black/20 animate-pulse">
            <div className="aspect-[16/9] bg-sand-beige/40" />
            <div className="p-6 space-y-3">
              <div className="h-5 bg-sand-beige/40 rounded" />
              <div className="h-4 bg-sand-beige/30 rounded w-3/4" />
              <div className="h-4 bg-sand-beige/30 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

async function WisdomContent({ searchParams }: { searchParams: Promise<{ page?: string; category?: string; search?: string }> }) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams?.page || 1);
  const category = resolvedSearchParams?.category || null;
  const search = resolvedSearchParams?.search || '';

  // Get data
  const allPosts = getAllBlogPosts();
  const categories = getAllCategories();
  const stats = getBlogStats();
  const featuredPosts = getFeaturedBlogPosts();

  // Filter posts based on search and category
  let filteredPosts = allPosts;
  
  if (search) {
    filteredPosts = filteredPosts.filter(post => 
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
    );
  }
  
  if (category) {
    const categoryData = categories.find(cat => cat.slug === category);
    if (categoryData) {
      filteredPosts = filteredPosts.filter(post => 
        post.category.toLowerCase() === categoryData.name.toLowerCase()
      );
    }
  }

  // Paginate results
  const postsPerPage = 12;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (page - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  return (
    <div className="space-y-8">
      {/* Featured Posts Section */}
      {!search && !category && featuredPosts.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-golden-olive" />
            <h2 className="text-2xl font-semibold text-premium-text">Featured Articles</h2>
          </div>
          <BlogGrid posts={featuredPosts.slice(0, 3)} featured={true} />
        </section>
      )}

      {/* Main Content */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="w-5 h-5 text-golden-olive" />
          <h2 className="text-2xl font-semibold text-premium-text">
            {search ? `Search Results for "${search}"` : 
             category ? `${categories.find(cat => cat.slug === category)?.name || 'Category'} Articles` :
             'All Articles'}
          </h2>
          <span className="text-sm text-sand-beige">
            ({filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'})
          </span>
        </div>
        
        <BlogGrid posts={paginatedPosts} />
        
        {totalPages > 1 && (
          <div className="mt-10">
            <BlogPagination 
              currentPage={page}
              totalPages={totalPages}
              baseUrl="/wisdom"
            />
          </div>
        )}
      </section>
    </div>
  );
}

export default async function WisdomPage({ searchParams }: { searchParams: Promise<{ page?: string; category?: string; search?: string }> }) {
  const categories = getAllCategories();
  const stats = getBlogStats();

         return (
           <div className="container-custom py-8 sm:py-12">
             {/* Header */}
             <header className="mb-12 sm:mb-16 text-center px-4 sm:px-0">
               <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-blog-text-primary mb-4 sm:mb-6">
                 Wisdom
               </h1>
               <p className="text-lg sm:text-xl text-blog-text-secondary max-w-4xl mx-auto leading-relaxed">
                 Explore curated articles on Sanskrit, Darshana, and timeless Indian wisdom.
                 Learn from ancient texts and modern interpretations by our expert teachers.
               </p>
             </header>

      {/* Stats Section */}
      <div className="mb-6 sm:mb-8 px-4 sm:px-0">
        <BlogStats stats={stats} />
      </div>

      {/* Filters */}
      <Suspense fallback={<div className="h-12 bg-sand-beige/20 rounded-xl w-64 mx-auto animate-pulse" />}>
        <WisdomPageClient categories={categories} />
      </Suspense>

      {/* Content */}
      <Suspense fallback={<LoadingSkeleton />}>
        <WisdomContent searchParams={searchParams} />
      </Suspense>
    </div>
  )
}


