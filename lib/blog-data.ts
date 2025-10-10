import blogDataRaw from '../data/blog_data.json';

interface BlogDataType {
  posts: any[];
  categories: any[];
}

const blogData = (blogDataRaw as BlogDataType) || { posts: [], categories: [] };

// Blog post type
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  language: string;
  featuredImage: string;
  originalUrl: string;
  tags: string[];
  featured: boolean;
  readTime: string | number;
  views?: number;
  likes?: number;
  updatedAt: string;
  published?: boolean;
  createdAt?: string;
}

// Blog category type
export interface BlogCategory {
  id: string | number;
  name: string;
  slug: string;
  description: string;
  postCount: number;
  color: string;
}

// Get all blog posts
export function getAllBlogPosts(): BlogPost[] {
  return blogData?.posts || [];
}

// Get blog post by slug
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return (blogData?.posts || []).find((post: any) => post.slug === slug);
}

// Get all categories
export function getAllCategories(): BlogCategory[] {
  return blogData?.categories || [];
}

// Get featured blog posts
export function getFeaturedBlogPosts(): BlogPost[] {
  return (blogData?.posts || []).filter((post: any) => post.featured);
}

// Get paginated blog posts
export function getPaginatedBlogPosts(page: number = 1, limit: number = 10): { posts: BlogPost[], totalPages: number } {
  const posts = blogData?.posts || [];
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedPosts = posts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(posts.length / limit);

  return { posts: paginatedPosts, totalPages };
}

// Get related posts
export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  const currentPost = getBlogPostBySlug(currentSlug);
  if (!currentPost) return [];

  return (blogData?.posts || [])
    .filter((post: any) => post.slug !== currentSlug)
    .filter((post: any) => post.category === currentPost.category)
    .slice(0, limit);
}

// Get blog posts by category
export function getBlogPostsByCategory(category: string): BlogPost[] {
  return (blogData?.posts || []).filter((post: any) => post.category === category);
}

// Search blog posts
export function searchBlogPosts(query: string): BlogPost[] {
  const lowercaseQuery = query.toLowerCase();
  return (blogData?.posts || []).filter((post: any) =>
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.content.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some((tag: string) => tag.toLowerCase().includes(lowercaseQuery))
  );
}

// Get blog stats
export function getBlogStats(): {
  totalPosts: number,
  totalCategories: number,
  totalAuthors: number,
  featuredPosts: number,
  englishPosts: number,
  hindiPosts: number,
  lastUpdated: string
} {
  const posts = blogData?.posts || [];
  const categories = blogData?.categories || [];
  const uniqueAuthors = new Set(posts.map((post: any) => post.author)).size;
  const englishPosts = posts.filter((post: any) => post.language === 'English').length;
  const hindiPosts = posts.filter((post: any) => post.language === 'Hindi').length;

  return {
    totalPosts: posts.length,
    totalCategories: categories.length,
    totalAuthors: uniqueAuthors,
    featuredPosts: posts.filter((post: any) => post.featured).length,
    englishPosts,
    hindiPosts,
    lastUpdated: new Date().toISOString()
  };
}


// Export the original blog data
export { blogData };