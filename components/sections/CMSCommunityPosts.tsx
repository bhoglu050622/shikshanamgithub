'use client'

import { useCMSContent } from '@/lib/cms/hooks'

export default function CMSCommunityPosts() {
  const { content, loading, error } = useCMSContent('communityPosts')

  if (loading) {
    return (
      <section className="py-8 sm:py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error || !content) {
    return (
      <section className="py-8 sm:py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Community Insights</h2>
            <p className="text-gray-600">Join the conversation! See what our community is sharing</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {content.title || 'Community Insights'}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {content.subtitle || 'Join the conversation! See what our community is sharing'}
          </p>
        </div>

        {/* Stats */}
        {content.stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {content.stats.members}
              </div>
              <div className="text-gray-600">Community Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {content.stats.learningHours}
              </div>
              <div className="text-gray-600">Learning Hours</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {content.stats.countries}
              </div>
              <div className="text-gray-600">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {content.stats.completionRate}
              </div>
              <div className="text-gray-600">Completion Rate</div>
            </div>
          </div>
        )}

        {/* Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {content.posts?.map((post: any) => (
            <div key={post.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {post.avatar}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {post.author}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {post.course}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                {post.content}
              </p>
              <div className="flex items-center justify-between border-t pt-4">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center text-gray-600 hover:text-primary">
                    <span className="mr-1">👍</span>
                    {post.likes}
                  </button>
                  <button className="flex items-center text-gray-600 hover:text-primary">
                    <span className="mr-1">💬</span>
                    {post.comments}
                  </button>
                  <button className="flex items-center text-gray-600 hover:text-primary">
                    <span className="mr-1">📤</span>
                    Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
