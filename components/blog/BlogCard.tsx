import Link from 'next/link';
import { BlogPost } from '@/lib/blog-data';
import { Calendar, Clock, User, Tag } from 'lucide-react';
import BlogImage from './BlogImage';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
  className?: string;
}

export default function BlogCard({ post, featured = false, className = '' }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'English': 'bg-blog-accent-indigo/10 text-blog-accent-indigo border-blog-accent-indigo/20',
      'Hindi': 'bg-blog-accent-saffron/10 text-blog-accent-saffron border-blog-accent-saffron/20',
      'Philosophy': 'bg-blog-accent-emerald/10 text-blog-accent-emerald border-blog-accent-emerald/20'
    };
    return colors[category as keyof typeof colors] || 'bg-blog-secondary-100 text-blog-secondary-700 border-blog-secondary-200';
  };

  return (
    <Link 
      href={`/blog/${post.slug || post.id}`}
      className={`group block ${className}`}
    >
      <article className={`
        rounded-3xl overflow-hidden border border-blog-border-light
        bg-blog-background-primary hover:shadow-2xl hover:shadow-blog-primary-500/10
        transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2
        backdrop-blur-sm
        ${featured ? 'ring-2 ring-blog-primary-400/30 shadow-lg shadow-blog-primary-500/20' : ''}
      `}>
        {/* Featured Image */}
        <div className="relative aspect-[16/9] bg-gradient-to-br from-blog-primary-50 to-blog-secondary-100 overflow-hidden">
          {post.featuredImage ? (
            <BlogImage
              src={post.featuredImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blog-primary-100 to-blog-accent-saffron/20 flex items-center justify-center">
              <div className="text-6xl opacity-60 text-blog-primary-400">📚</div>
            </div>
          )}
          
          {/* Featured Badge */}
          {post.featured && (
            <div className="absolute top-4 left-4">
              <span className="bg-blog-accent-amber text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm">
                ⭐ Featured
              </span>
            </div>
          )}
          
          {/* Category Badge */}
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${getCategoryColor(post.category)} backdrop-blur-sm shadow-sm`}>
              {post.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {/* Title */}
          <h3 className="font-bold text-lg sm:text-xl leading-tight group-hover:text-blog-primary-600 transition-colors mb-3 sm:mb-4 text-blog-text-primary">
            {post.title}
          </h3>
          
          {/* Excerpt */}
          <p className="text-sm text-blog-text-secondary mb-4 sm:mb-5 line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
          
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {post.tags.slice(0, 3).map((tag, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blog-secondary-100 text-xs rounded-full text-blog-text-tertiary border border-blog-border-light hover:bg-blog-primary-50 transition-colors"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="text-xs text-blog-text-muted px-2 py-1.5">
                  +{post.tags.length - 3} more
                </span>
              )}
            </div>
          )}
          
          {/* Meta Information */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-blog-text-muted mb-4 gap-2 sm:gap-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blog-primary-500" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-blog-primary-500" />
                <span>{formatDate(post.date)}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blog-primary-500" />
              <span className="font-medium">{post.readTime}</span>
            </div>
          </div>
          
          {/* Read More */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-blog-primary-600 font-semibold group-hover:text-blog-accent-saffron transition-colors">
              Read more →
            </div>
            <div className="w-8 h-8 rounded-full bg-blog-primary-100 flex items-center justify-center group-hover:bg-blog-primary-200 transition-colors">
              <div className="w-2 h-2 rounded-full bg-blog-primary-500 group-hover:scale-110 transition-transform"></div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
