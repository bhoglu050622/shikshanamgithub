import { BlogPost } from '@/lib/blog-data';
import BlogCard from './BlogCard';

interface BlogGridProps {
  posts: BlogPost[];
  featured?: boolean;
  className?: string;
}

export default function BlogGrid({ posts, featured = false, className = '' }: BlogGridProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-xl font-semibold text-sand-beige mb-2">No blog posts found</h3>
        <p className="text-sand-beige/60">Check back later for new content!</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 ${className}`}>
      {posts.map((post) => (
        <BlogCard 
          key={post.id} 
          post={post} 
          featured={featured}
        />
      ))}
    </div>
  );
}
