// WordPress integration functions - now using our extracted blog data

import { 
  getAllBlogPosts, 
  getPaginatedBlogPosts, 
  getBlogPostBySlug,
  getFeaturedBlogPosts,
  getBlogPostsByCategory,
  searchBlogPosts,
  getBlogStats
} from './blog-data';

export const getBlogPosts = async (page = 1, limit = 10) => {
  const result = getPaginatedBlogPosts(page, limit);
  
  return {
    posts: result.posts,
    totalPages: result.totalPages
  };
};

export const getFeaturedPosts = async () => {
  return getFeaturedBlogPosts();
};

export const getPostsByCategory = async (categorySlug: string) => {
  return getBlogPostsByCategory(categorySlug);
};

export const searchPosts = async (query: string) => {
  return searchBlogPosts(query);
};

export const getBlogStatistics = async () => {
  return getBlogStats();
};

export const getFeaturedImageUrl = (post: any) => {
  return post.featuredImage || '/assets/default-blog.jpg';
};

export const stripHtml = (html: string) => {
  return html.replace(/<[^>]*>/g, '');
};
