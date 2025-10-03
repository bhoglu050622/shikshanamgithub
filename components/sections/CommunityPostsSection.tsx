'use client'

import { motion } from 'framer-motion'
import MotionWrapper, { MotionDiv, MotionButton } from '@/components/motion/MotionWrapper'
import { Heart, MessageCircle, Share, Clock, Users } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ugcData from '@/data/ugc_content.json'
import { useHydrationSafeAnimation } from '@/lib/hooks/useHydrationSafeAnimation'
import { API_CONFIG } from '@/lib/config/api'
import { useState, useEffect } from 'react'
import Timestamp from '@/components/ui/Timestamp'

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

interface CommunityPostsData {
  title: string;
  subtitle: string;
  description: string;
  posts: CommunityPost[];
}

export default function CommunityPostsSection({ 
  maxPosts = 4,
  showHeader = true
}: CommunityPostsSectionProps) {
  const mounted = useHydrationSafeAnimation()
  const [communityPostsData, setCommunityPostsData] = useState<CommunityPostsData | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch CMS data
  useEffect(() => {
    const fetchCommunityPostsData = async () => {
      try {
        const apiUrl = API_CONFIG.getCmsApiUrl('content')
        console.log('Fetching community posts data from:', apiUrl)
        
        const response = await fetch(apiUrl)
        const result = await response.json()
        
        if (result.success && result.data.communityPosts) {
          setCommunityPostsData(result.data.communityPosts)
        }
      } catch (error) {
        console.error('Failed to fetch community posts data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchCommunityPostsData()
  }, [])

  // Use CMS data or fallback to default
  const sectionTitle = communityPostsData?.title || "Community Insights"
  const sectionSubtitle = communityPostsData?.subtitle || "Join the conversation! See what our community is sharing about their learning journey."
  const sectionDescription = communityPostsData?.description || "Connect with fellow learners and share your insights."
  
  const posts = communityPostsData?.posts || ugcData.communityPosts.slice(0, maxPosts)


  return (
  <MotionWrapper>
    <section className="py-16 sm:py-20 bg-gradient-to-br from-wisdom-50/50 to-saffron-50/30">
      <div className="container-custom">
        {/* Header */}
        {showHeader && (
          <div className="text-center mb-12 sm:mb-16">
            <MotionDiv
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 20 }
              }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-light-contrast-primary mb-4 sm:mb-6">
                {sectionTitle}
              </h2>
              <p className="text-lg sm:text-xl text-light-contrast-secondary max-w-3xl mx-auto leading-relaxed">
                {sectionSubtitle}
              </p>
            </MotionDiv>
          </div>
        )}

        {/* Community Stats */}
        <MotionDiv
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 20 }
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-saffron-600 mb-1">
              {ugcData.stats.communityMembers.toLocaleString('en-US')}
            </div>
            <div className="text-sm text-light-contrast-secondary">Community Members</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-saffron-600 mb-1">
              {ugcData.stats.totalHours.toLocaleString('en-US')}+
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
        </MotionDiv>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post, index) => (
            <MotionDiv
              key={post.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 30 }
              }}
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
                          <Timestamp timestamp={post.timestamp} />
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
            </MotionDiv>
          ))}
        </div>

        {/* Join Community CTA */}
        <MotionDiv
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 20 }
          }}
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
            <MotionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-saffron-600 to-golden-olive text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Join Community
            </MotionButton>
          </div>
        </MotionDiv>
      </div>
    </section>
  </MotionWrapper>
  )
}
