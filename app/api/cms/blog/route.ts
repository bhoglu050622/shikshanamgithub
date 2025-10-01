import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const BLOG_CONTENT_FILE = path.join(process.cwd(), 'data', 'blog-content.json');

// Default blog content structure
const defaultBlogContent = {
  hero: {
    title: 'Blog Posts',
    subtitle: 'Insights, Wisdom, and Learning',
    description: 'Explore our collection of articles, insights, and educational content.'
  },
  posts: [],
  categories: [
    { id: 'philosophy', name: 'Philosophy', description: 'Ancient wisdom and philosophical insights' },
    { id: 'sanskrit', name: 'Sanskrit', description: 'Sanskrit language and literature' },
    { id: 'courses', name: 'Courses', description: 'Course updates and information' },
    { id: 'events', name: 'Events', description: 'Workshops and events' }
  ],
  tags: [
    { id: 'vedanta', name: 'Vedanta', color: '#3B82F6' },
    { id: 'yoga', name: 'Yoga', color: '#10B981' },
    { id: 'sanskrit', name: 'Sanskrit', color: '#F59E0B' },
    { id: 'philosophy', name: 'Philosophy', color: '#8B5CF6' }
  ],
  authors: [
    {
      id: 'swami-ananda',
      name: 'Swami Ananda',
      bio: 'Spiritual teacher and Sanskrit scholar',
      avatar: '/assets/swami-ananda.jpg'
    }
  ]
};

export async function GET() {
  try {
    if (fs.existsSync(BLOG_CONTENT_FILE)) {
      const content = JSON.parse(fs.readFileSync(BLOG_CONTENT_FILE, 'utf8'));
      return NextResponse.json({ success: true, data: content });
    } else {
      // Create default content file
      fs.writeFileSync(BLOG_CONTENT_FILE, JSON.stringify(defaultBlogContent, null, 2));
      return NextResponse.json({ success: true, data: defaultBlogContent });
    }
  } catch (error) {
    console.error('Error loading blog content:', error);
    return NextResponse.json({ success: false, error: 'Failed to load blog content' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const content = await request.json();
    
    // Validate content structure
    if (!content || typeof content !== 'object') {
      return NextResponse.json({ success: false, error: 'Invalid content format' }, { status: 400 });
    }

    // Ensure required sections exist
    const updatedContent = {
      hero: content.hero || defaultBlogContent.hero,
      posts: content.posts || [],
      categories: content.categories || defaultBlogContent.categories,
      tags: content.tags || defaultBlogContent.tags,
      authors: content.authors || defaultBlogContent.authors
    };

    fs.writeFileSync(BLOG_CONTENT_FILE, JSON.stringify(updatedContent, null, 2));
    
    return NextResponse.json({ success: true, data: updatedContent });
  } catch (error) {
    console.error('Error saving blog content:', error);
    return NextResponse.json({ success: false, error: 'Failed to save blog content' }, { status: 500 });
  }
}
