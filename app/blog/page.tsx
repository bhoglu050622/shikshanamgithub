import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Mock data for blog posts - replace with your content management system
const mockPosts = [
  {
    id: '1',
    title: 'The Essence of Sanskrit: A Journey Through Ancient Wisdom',
    slug: 'essence-of-sanskrit-ancient-wisdom',
    excerpt: 'Discover the profound beauty and spiritual depth of Sanskrit, the language of the gods and the foundation of Indian philosophy.',
    featuredImage: '/assets/sanskrit-wisdom.jpg',
    publishedAt: '2024-01-15',
    author: {
      username: 'Dr. Priya Sharma'
    }
  },
  {
    id: '2',
    title: 'Understanding the Six Darshanas: Pathways to Truth',
    slug: 'six-darshanas-pathways-to-truth',
    excerpt: 'Explore the six classical schools of Indian philosophy and their unique approaches to understanding reality and consciousness.',
    featuredImage: '/assets/darshanas-philosophy.jpg',
    publishedAt: '2024-01-10',
    author: {
      username: 'Prof. Rajesh Kumar'
    }
  },
  {
    id: '3',
    title: 'Self-Help Through Ancient Indian Wisdom',
    slug: 'self-help-ancient-indian-wisdom',
    excerpt: 'Learn how timeless Indian teachings can guide modern self-improvement and personal growth.',
    featuredImage: '/assets/self-help-wisdom.jpg',
    publishedAt: '2024-01-05',
    author: {
      username: 'Swami Ananda'
    }
  }
]

export default async function BlogPage() {
  return (
    <div className="min-h-screen bg-premium-bg-secondary">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-premium-text-primary mb-4">
              Blog
            </h1>
            <p className="text-xl text-premium-text-secondary max-w-2xl mx-auto">
              Insights, teachings, and wisdom from our spiritual journey
            </p>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {mockPosts.length > 0 ? (
          <div className="space-y-8">
            {mockPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <Link href={`/blog/${post.slug}`}>
                  <div className="flex flex-col md:flex-row">
                    {post.featuredImage && (
                      <div className="md:w-1/3">
                        <Image
                          src={post.featuredImage}
                          alt={post.title}
                          width={400}
                          height={300}
                          className="w-full h-48 md:h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                        />
                      </div>
                    )}
                    <div className={`${post.featuredImage ? 'md:w-2/3' : 'w-full'} p-6`}>
                      <CardHeader className="p-0">
                        <CardTitle className="text-2xl font-bold mb-2 hover:text-premium-accent-primary transition-colors">
                          {post.title}
                        </CardTitle>
                        {post.excerpt && (
                          <CardDescription className="text-lg">
                            {post.excerpt}
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent className="p-0 mt-4">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>By {post.author.username}</span>
                          {post.publishedAt && (
                            <span>
                              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-premium-text-primary mb-2">
              No posts yet
            </h3>
            <p className="text-premium-text-secondary">
              Check back soon for new content!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export const revalidate = 3600 // Revalidate every hour