import blogData from '@/data/blog_data.json';

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  language: 'en' | 'hi';
  featuredImage: string;
  originalUrl: string;
  tags: string[];
  readTime: string;
  published: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  postCount: number;
  color: string;
}

export interface BlogAuthor {
  id: number;
  name: string;
  bio: string;
  avatar: string;
  social: {
    website: string;
    email: string;
  };
}

export interface BlogTag {
  name: string;
  count: number;
}

export interface BlogData {
  posts: BlogPost[];
  categories: BlogCategory[];
  authors: BlogAuthor[];
  tags: BlogTag[];
  metadata: {
    totalPosts: number;
    totalCategories: number;
    totalAuthors: number;
    lastUpdated: string;
  };
}

// Get all blog posts
export function getAllBlogPosts(): BlogPost[] {
  return blogData.posts.filter(post => post.published);
}

// Get featured blog posts
export function getFeaturedBlogPosts(): BlogPost[] {
  return blogData.posts.filter(post => post.published && post.featured);
}

// Get blog posts by category
export function getBlogPostsByCategory(categorySlug: string): BlogPost[] {
  const category = blogData.categories.find(cat => cat.slug === categorySlug);
  if (!category) return [];
  
  return blogData.posts.filter(post => 
    post.published && post.category.toLowerCase() === category.name.toLowerCase()
  );
}

// Get blog posts by language
export function getBlogPostsByLanguage(language: 'en' | 'hi'): BlogPost[] {
  return blogData.posts.filter(post => post.published && post.language === language);
}

// Get blog post by slug
export function getBlogPostBySlug(slug: string): BlogPost | null {
  return blogData.posts.find(post => post.slug === slug) || null;
}

// Get blog post by ID
export function getBlogPostById(id: number): BlogPost | null {
  return blogData.posts.find(post => post.id === id) || null;
}

// Get all categories
export function getAllCategories(): BlogCategory[] {
  return blogData.categories;
}

// Get category by slug
export function getCategoryBySlug(slug: string): BlogCategory | null {
  return blogData.categories.find(cat => cat.slug === slug) || null;
}

// Get all authors
export function getAllAuthors(): BlogAuthor[] {
  return blogData.authors;
}

// Get author by ID
export function getAuthorById(id: number): BlogAuthor | null {
  return blogData.authors.find(author => author.id === id) || null;
}

// Get all tags
export function getAllTags(): BlogTag[] {
  return blogData.tags;
}

// Get related posts (by tags or category)
export function getRelatedPosts(currentPost: BlogPost, limit: number = 3): BlogPost[] {
  const related = blogData.posts.filter(post => 
    post.published && 
    post.id !== currentPost.id &&
    (post.category === currentPost.category || 
     post.tags.some(tag => currentPost.tags.includes(tag)))
  );
  
  return related.slice(0, limit);
}

// Search blog posts
export function searchBlogPosts(query: string): BlogPost[] {
  const lowercaseQuery = query.toLowerCase();
  
  return blogData.posts.filter(post => 
    post.published &&
    (post.title.toLowerCase().includes(lowercaseQuery) ||
     post.excerpt.toLowerCase().includes(lowercaseQuery) ||
     post.content.toLowerCase().includes(lowercaseQuery) ||
     post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)))
  );
}

// Get paginated blog posts
export function getPaginatedBlogPosts(page: number = 1, limit: number = 12): {
  posts: BlogPost[];
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
} {
  const allPosts = getAllBlogPosts();
  const totalPages = Math.ceil(allPosts.length / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  return {
    posts: allPosts.slice(startIndex, endIndex),
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1
  };
}

// Get blog statistics
export function getBlogStats() {
  const posts = getAllBlogPosts();
  const categories = getAllCategories();
  const authors = getAllAuthors();
  
  return {
    totalPosts: posts.length,
    totalCategories: categories.length,
    totalAuthors: authors.length,
    featuredPosts: posts.filter(post => post.featured).length,
    englishPosts: posts.filter(post => post.language === 'en').length,
    hindiPosts: posts.filter(post => post.language === 'hi').length,
    lastUpdated: blogData.metadata.lastUpdated
  };
}

export default blogData;
