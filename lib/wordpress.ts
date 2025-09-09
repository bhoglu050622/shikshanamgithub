export interface WordPressRenderedString {
  rendered: string
}

export interface WordPressMediaDetails {
  source_url?: string
}

export interface WordPressFeaturedMediaItem {
  source_url?: string
  media_details?: WordPressMediaDetails
}

export interface WordPressPost {
  id: number
  date: string
  slug: string
  link: string
  title: WordPressRenderedString
  excerpt: WordPressRenderedString
  content: WordPressRenderedString
  _embedded?: {
    'wp:featuredmedia'?: WordPressFeaturedMediaItem[]
  }
}

const WP_BASE = 'https://shikshanam.in/wp-json/wp/v2'

async function fetchJson<T>(url: string): Promise<T> {
  try {
    const res = await fetch(url, { 
      next: { revalidate: 3600 },
      headers: {
        'User-Agent': 'Shikshanam/1.0 (Next.js)',
      }
    })
    
    if (!res.ok) {
      if (res.status === 404) {
        throw new Error(`WordPress content not found: ${url}`)
      }
      if (res.status >= 500) {
        throw new Error(`WordPress server error: ${res.status} ${res.statusText}`)
      }
      throw new Error(`WordPress fetch failed: ${res.status} ${res.statusText}`)
    }
    
    return res.json()
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Unable to connect to WordPress. Please check your internet connection.')
    }
    throw error
  }
}

export async function getCategoryIdBySlug(slug: string): Promise<number | null> {
  const categories = await fetchJson<Array<{ id: number; slug: string }>>(
    `${WP_BASE}/categories?slug=${encodeURIComponent(slug)}`
  )
  return categories.length ? categories[0].id : null
}

export interface BlogPostsResult {
  posts: WordPressPost[]
  totalPages: number
}

export async function getBlogPosts(page = 1, perPage = 12): Promise<BlogPostsResult> {
  try {
    // Resolve category id for 'blog' once per call
    const categoryId = await getCategoryIdBySlug('blog')
    const params = new URLSearchParams()
    if (categoryId) params.set('categories', String(categoryId))
    params.set('per_page', String(perPage))
    params.set('page', String(page))
    params.set('_embed', '1')

    const url = `${WP_BASE}/posts?${params.toString()}`
    const res = await fetch(url, { 
      next: { revalidate: 3600 },
      headers: {
        'User-Agent': 'Shikshanam/1.0 (Next.js)',
      }
    })
    
    if (!res.ok) {
      if (res.status === 404) {
        return { posts: [], totalPages: 0 }
      }
      throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`)
    }
    
    const totalPages = Number(res.headers.get('X-WP-TotalPages') || 1)
    const posts: WordPressPost[] = await res.json()
    return { posts, totalPages }
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    // Return empty result instead of throwing to prevent page crashes
    return { posts: [], totalPages: 0 }
  }
}

export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  const params = new URLSearchParams({ slug, _embed: '1' })
  const url = `${WP_BASE}/posts?${params.toString()}`
  const posts = await fetchJson<WordPressPost[]>(url)
  return posts.length ? posts[0] : null
}

export function getFeaturedImageUrl(post: WordPressPost): string | null {
  const media = post._embedded?.['wp:featuredmedia']?.[0]
  return media?.source_url || media?.media_details?.source_url || null
}

export function stripHtml(html: string): string {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '').trim()
}


