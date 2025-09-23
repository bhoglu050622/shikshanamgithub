import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react'
import { getBlogPostBySlug, getRelatedPosts, getAllBlogPosts } from '@/lib/blog-data'
import { BlogCard, BlogImage } from '@/components/blog'

async function getPost(slug: string) {
  const post = getBlogPostBySlug(slug)
  return post
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts()
  return posts.map((post) => ({
    slug: post.slug || post.id.toString()
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found'
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
    }
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post, 3)
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-blog-background-secondary">
      {/* Navigation */}
      <div className="bg-blog-background-primary/80 backdrop-blur-sm border-b border-blog-border-light sticky top-0 z-50">
        <div className="container-custom py-4">
          <Link href="/wisdom">
            <Button variant="ghost" className="text-blog-text-primary hover:text-blog-primary-600 hover:bg-blog-primary-50 transition-all duration-200">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Wisdom
            </Button>
          </Link>
        </div>
      </div>

      {/* Post Content */}
      <div className="container-custom py-8 sm:py-12">
        <article className="max-w-4xl mx-auto px-4 sm:px-0">
          {/* Featured Image */}
          {post.featuredImage && (
            <div className="relative aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden mb-8 sm:mb-10 shadow-2xl shadow-blog-primary-500/10">
              <BlogImage
                src={post.featuredImage}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blog-secondary-900/20 to-transparent"></div>
            </div>
          )}
          
          {/* Header */}
          <header className="mb-8 sm:mb-10">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <span className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold border ${
                post.category === 'English' 
                  ? 'bg-blog-accent-indigo/10 text-blog-accent-indigo border-blog-accent-indigo/20'
                  : post.category === 'Hindi'
                  ? 'bg-blog-accent-saffron/10 text-blog-accent-saffron border-blog-accent-saffron/20'
                  : 'bg-blog-accent-emerald/10 text-blog-accent-emerald border-blog-accent-emerald/20'
              }`}>
                {post.category}
              </span>
              {post.featured && (
                <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold bg-blog-accent-amber text-white shadow-lg">
                  ⭐ Featured
                </span>
              )}
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 text-blog-text-primary leading-tight">
              {post.title}
            </h1>
            
            {post.excerpt && (
              <p className="text-lg sm:text-xl text-blog-text-secondary font-medium mb-6 sm:mb-8 leading-relaxed max-w-3xl">
                {post.excerpt}
              </p>
            )}
            
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-8 text-sm text-blog-text-muted border-b border-blog-border-light pb-6 sm:pb-8">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-blog-primary-500" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blog-primary-500" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blog-primary-500" />
                <span className="font-medium">{post.readTime}</span>
              </div>
            </div>
          </header>
          
          {/* Content */}
          <div className="prose prose-lg max-w-none mb-8 sm:mb-12">
            <div className="text-blog-text-primary leading-relaxed whitespace-pre-wrap text-base sm:text-lg">
              {post.content}
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-8 sm:mb-12 p-4 sm:p-6 bg-blog-background-primary rounded-2xl border border-blog-border-light">
              <h3 className="text-base sm:text-lg font-semibold text-blog-text-primary mb-3 sm:mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blog-secondary-100 text-xs sm:text-sm rounded-full text-blog-text-tertiary border border-blog-border-light hover:bg-blog-primary-50 transition-colors"
                  >
                    <Tag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mb-8 sm:mb-12 p-4 sm:p-6 lg:p-8 bg-blog-background-primary rounded-2xl sm:rounded-3xl border border-blog-border-light">
              <h3 className="text-xl sm:text-2xl font-bold text-blog-text-primary mb-6 sm:mb-8">Related Articles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </div>
          )}

          {/* Back to Wisdom */}
          <div className="text-center p-6 sm:p-8 bg-gradient-to-r from-blog-primary-50 to-blog-secondary-50 rounded-2xl sm:rounded-3xl border border-blog-border-light">
            <Link href="/wisdom">
              <Button className="bg-blog-primary-600 hover:bg-blog-primary-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200">
                Explore More Wisdom
              </Button>
            </Link>
          </div>
        </article>
      </div>
    </div>
  )
}

export const revalidate = 3600 // Revalidate every hour