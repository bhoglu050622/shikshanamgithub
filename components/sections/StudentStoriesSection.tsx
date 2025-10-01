'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Star, MapPin, Calendar, Award } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ugcData from '@/data/ugc_content.json'
import { useHydrationSafeAnimation } from '@/lib/hooks/useHydrationSafeAnimation'

interface StudentStory {
  id: number
  name: string
  age: number
  profession: string
  location: string
  story: string
  transformation: string
  course: string
  image: string
  featured: boolean
}

interface StudentStoriesSectionProps {
  maxStories?: number
  showFeatured?: boolean
}

export default function StudentStoriesSection({ 
  maxStories = 3,
  showFeatured = true
}: StudentStoriesSectionProps) {
  const mounted = useHydrationSafeAnimation()
  const stories = showFeatured 
    ? ugcData.studentStories.filter(story => story.featured).slice(0, maxStories)
    : ugcData.studentStories.slice(0, maxStories)

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-saffron-50/30 to-golden-olive/30">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={mounted ? { opacity: 0, y: 20 } : false}
            whileInView={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={mounted ? { duration: 0.6 } : { duration: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-light-contrast-primary mb-4 sm:mb-6">
              Student Success Stories
            </h2>
            <p className="text-lg sm:text-xl text-light-contrast-secondary max-w-3xl mx-auto leading-relaxed">
              Real transformations from our students who have embraced ancient wisdom. See how their lives have changed through our courses.
            </p>
          </motion.div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={mounted ? { opacity: 0, y: 30 } : false}
              whileInView={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={mounted ? { duration: 0.6, delay: index * 0.1 } : { duration: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6">
                  {/* Student Image */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-saffron-400 to-golden-olive overflow-hidden shadow-lg">
                      <Image
                        src={story.image}
                        alt={story.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/api/placeholder/150/150';
                        }}
                      />
                    </div>
                    {story.featured && (
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-saffron-500 rounded-full flex items-center justify-center">
                        <Star className="w-4 h-4 text-white fill-white" />
                      </div>
                    )}
                  </div>

                  {/* Student Info */}
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-light-contrast-primary mb-1">
                      {story.name}
                    </h3>
                    <div className="flex items-center justify-center gap-2 text-sm text-light-contrast-secondary mb-2">
                      <span>{story.age} years</span>
                      <span>•</span>
                      <span>{story.profession}</span>
                    </div>
                    <div className="flex items-center justify-center gap-1 text-sm text-light-contrast-tertiary">
                      <MapPin className="w-3 h-3" />
                      <span>{story.location}</span>
                    </div>
                  </div>

                  {/* Story */}
                  <div className="mb-4">
                    <p className="text-sm text-light-contrast-secondary leading-relaxed mb-3">
                      "{story.story}"
                    </p>
                    <div className="bg-gradient-to-r from-saffron-50 to-golden-olive/20 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Award className="w-4 h-4 text-saffron-600" />
                        <span className="text-sm font-semibold text-saffron-700">Transformation:</span>
                      </div>
                      <p className="text-sm text-light-contrast-primary font-medium">
                        {story.transformation}
                      </p>
                    </div>
                  </div>

                  {/* Course Badge */}
                  <div className="text-center">
                    <span className="inline-block bg-gradient-to-r from-saffron-100 to-golden-olive/30 text-saffron-700 px-3 py-1 rounded-full text-xs font-medium">
                      {story.course}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={mounted ? { opacity: 0, y: 20 } : false}
          whileInView={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={mounted ? { duration: 0.6, delay: 0.3 } : { duration: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-lg text-light-contrast-secondary mb-6">
            Ready to start your own transformation journey?
          </p>
          <motion.button
            whileHover={mounted ? { scale: 1.05 } : {}}
            whileTap={mounted ? { scale: 0.95 } : {}}
            className="bg-gradient-to-r from-saffron-600 to-golden-olive text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Explore Our Courses
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
