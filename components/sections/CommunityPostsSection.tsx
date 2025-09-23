'use client'

import { motion } from 'framer-motion'
import { Heart, MessageCircle, Share, Clock, Users } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ugcData from '@/data/ugc_content.json'
import { useHydrationSafeAnimation } from '@/lib/hooks/useHydrationSafeAnimation'

interface CommunityPost {
  id: number
  author: string
  content: string
  likes: number
  comments: number
  timestamp: string
  course: string
}

interface CommunityPostsSectionProps {
  maxPosts?: number
  showHeader?: boolean
}

export default function CommunityPostsSection({ 
  maxPosts = 4,
  showHeader = true
}: CommunityPostsSectionProps) {
  const mounted = useHydrationSafeAnimation()
  const posts = ugcData.communityPosts.slice(0, maxPosts)

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    return date.toLocaleDateString()
  }

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-wisdom-50/50 to-saffron-50/30">
      <div className="container-custom">
        {/* Header */}
        {showHeader && (
          <div className="text-center mb-12 sm:mb-16">
            <motion.div
              initial={mounted ? { opacity: 0, y: 20 } : false}
              whileInView={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={mounted ? { duration: 0.6 } : { duration: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-light-contrast-primary mb-4 sm:mb-6">
                Community Insights
              </h2>
              <p className="text-lg sm:text-xl text-light-contrast-secondary max-w-3xl mx-auto leading-relaxed">
                Join the conversation! See what our community is sharing about their learning journey.
              </p>
            </motion.div>
          </div>
        )}

        {/* Community Stats */}
        <motion.div
          initial={mounted ? { opacity: 0, y: 20 } : false}
          whileInView={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={mounted ? { duration: 0.6, delay: 0.1 } : { duration: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-saffron-600 mb-1">
              {ugcData.stats.communityMembers.toLocaleString()}
            </div>
            <div className="text-sm text-light-contrast-secondary">Community Members</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-saffron-600 mb-1">
              {ugcData.stats.totalHours.toLocaleString()}+
            </div>
            <div className="text-sm text-light-contrast-secondary">Learning Hours</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-saffron-600 mb-1">
              {ugcData.stats.countries}
            </div>
            <div className="text-sm text-light-contrast-secondary">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-saffron-600 mb-1">
              {ugcData.stats.completionRate}%
            </div>
            <div className="text-sm text-light-contrast-secondary">Completion Rate</div>
          </div>
        </motion.div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={mounted ? { opacity: 0, y: 30 } : false}
              whileInView={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={mounted ? { duration: 0.6, delay: index * 0.1 } : { duration: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  {/* Post Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-saffron-400 to-golden-olive flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {post.author.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-light-contrast-primary">
                          {post.author}
                        </span>
                        <span className="text-xs text-light-contrast-tertiary">•</span>
                        <div className="flex items-center gap-1 text-xs text-light-contrast-tertiary">
                          <Clock className="w-3 h-3" />
                          <span>{formatTimestamp(post.timestamp)}</span>
                        </div>
                      </div>
                      <div className="text-xs text-saffron-600 font-medium">
                        {post.course}
                      </div>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="mb-4">
                    <p className="text-light-contrast-secondary leading-relaxed">
                      {post.content}
                    </p>
                  </div>

                  {/* Post Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-wisdom-200">
                    <div className="flex items-center gap-6">
                      <button className="flex items-center gap-2 text-light-contrast-tertiary hover:text-saffron-600 transition-colors">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-light-contrast-tertiary hover:text-saffron-600 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm">{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-2 text-light-contrast-tertiary hover:text-saffron-600 transition-colors">
                        <Share className="w-4 h-4" />
                        <span className="text-sm">Share</span>
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Join Community CTA */}
        <motion.div
          initial={mounted ? { opacity: 0, y: 20 } : false}
          whileInView={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={mounted ? { duration: 0.6, delay: 0.4 } : { duration: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-saffron-50 to-golden-olive/20 rounded-2xl p-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Users className="w-8 h-8 text-saffron-600" />
              <h3 className="text-2xl font-bold text-light-contrast-primary">
                Join Our Community
              </h3>
            </div>
            <p className="text-light-contrast-secondary mb-6 max-w-2xl mx-auto">
              Connect with fellow learners, share your insights, and get support on your journey through ancient wisdom.
            </p>
            <motion.button
              whileHover={mounted ? { scale: 1.05 } : {}}
              whileTap={mounted ? { scale: 0.95 } : {}}
              className="bg-gradient-to-r from-saffron-600 to-golden-olive text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Join Community
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
