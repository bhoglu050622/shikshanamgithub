'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { 
  MessageCircle, 
  Instagram, 
  Mail, 
  Users, 
  Calendar,
  MapPin,
  Clock,
  Star,
  Heart,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Bell,
  Gift,
  BookOpen,
  TrendingUp
} from 'lucide-react'

interface CommunityCTAProps {
  onJoinCommunity?: (platform: string) => void
  onSubscribeNewsletter?: () => void
  onViewEvents?: () => void
}

const communityStats = [
  {
    icon: Users,
    value: '15,000+',
    label: 'Community Members',
    color: 'text-saffron-600 dark:text-saffron-400'
  },
  {
    icon: MessageCircle,
    value: '500+',
    label: 'Daily Discussions',
    color: 'text-peacock-green-600 dark:text-peacock-green-400'
  },
  {
    icon: Calendar,
    value: '50+',
    label: 'Monthly Events',
    color: 'text-lotus-pink-600 dark:text-lotus-pink-400'
  },
  {
    icon: Star,
    value: '4.9/5',
    label: 'Community Rating',
    color: 'text-deep-teal-600 dark:text-deep-teal-400'
  }
]

const upcomingEvents = [
  {
    title: 'Weekly Wisdom Circle',
    date: 'Every Sunday',
    time: '7:00 PM IST',
    type: 'Live Discussion',
    description: 'Join our weekly discussion on applying ancient wisdom to modern challenges'
  },
  {
    title: 'Meditation Masterclass',
    date: 'March 15, 2024',
    time: '6:00 PM IST',
    type: 'Workshop',
    description: 'Learn advanced meditation techniques from Kashmir Shaiva tradition'
  },
  {
    title: 'Leadership Q&A',
    date: 'March 20, 2024',
    time: '8:00 PM IST',
    type: 'Q&A Session',
    description: 'Ask Dr. Priya Sharma about applying Chanakya principles in business'
  }
]

const communityBenefits = [
  {
    icon: Heart,
    title: 'Supportive Community',
    description: 'Connect with like-minded individuals on similar growth journeys'
  },
  {
    icon: BookOpen,
    title: 'Exclusive Content',
    description: 'Access to member-only resources, guides, and practice materials'
  },
  {
    icon: Calendar,
    title: 'Regular Events',
    description: 'Weekly discussions, workshops, and Q&A sessions with experts'
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description: 'Track your growth journey with community challenges and milestones'
  }
]

export default function CommunityCTA({ onJoinCommunity, onSubscribeNewsletter, onViewEvents }: CommunityCTAProps) {
  const shouldReduceMotion = useReducedMotion()
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      onSubscribeNewsletter?.()
      // In a real app, this would make an API call
      console.log('Newsletter subscription:', email)
    }
  }

  return (
    <section className="section-padding" aria-labelledby="community-title">
      <div className="container-custom">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 id="community-title" className="text-display text-indigo-700 dark:text-soft-gold-500 mb-4">
            Join Our Community
          </h2>
          <p className="text-body text-wisdom-600 dark:text-wisdom-400 max-w-2xl mx-auto mb-8">
            Connect with thousands of learners on similar journeys. Share experiences, 
            get support, and grow together in our vibrant community.
          </p>
          
          {/* Community Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            {communityStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className={`w-12 h-12 ${stat.color} mx-auto mb-3`}>
                  <stat.icon className="w-12 h-12" />
                </div>
                <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                  {stat.value}
                </div>
                <div className="text-sm text-wisdom-600 dark:text-wisdom-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Community Platforms */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-display text-indigo-700 dark:text-soft-gold-500 mb-8 text-center">
            Connect With Us
          </h3>
          
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              onClick={() => onJoinCommunity?.('telegram')}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 focus-ring"
              aria-label="Join our Telegram community for daily discussions and Q&A"
            >
              <MessageCircle className="w-6 h-6" />
              <span>Telegram Community</span>
              <ExternalLink className="w-4 h-4" />
            </motion.button>
            
            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              onClick={() => onJoinCommunity?.('instagram')}
              className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 focus-ring"
              aria-label="Follow us on Instagram for visual wisdom and stories"
            >
              <Instagram className="w-6 h-6" />
              <span>Instagram</span>
              <ExternalLink className="w-4 h-4" />
            </motion.button>
          </div>
          
          <p className="text-wisdom-600 dark:text-wisdom-400 text-center">
            Events, tips, and practice prompts—free.
          </p>
        </motion.div>

        {/* Newsletter Subscription */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-saffron-100 to-deep-teal-100 dark:from-saffron-900/30 dark:to-deep-teal-900/30 rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <Bell className="w-12 h-12 text-saffron-600 dark:text-saffron-400 mx-auto mb-4" />
              <h3 className="text-xl font-display text-indigo-700 dark:text-soft-gold-500 mb-2">
                Stay Updated
              </h3>
              <p className="text-wisdom-600 dark:text-wisdom-400">
                Get weekly wisdom, course updates, and exclusive content delivered to your inbox.
              </p>
            </div>
            
            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-lg border border-wisdom-200 dark:border-wisdom-700 bg-white dark:bg-wisdom-800 text-wisdom-900 dark:text-wisdom-100 placeholder-wisdom-500 dark:placeholder-wisdom-400 focus:outline-none focus:ring-2 focus:ring-saffron-500 dark:focus:ring-saffron-400"
                  required
                />
                <motion.button
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                  type="submit"
                  className="bg-gradient-to-r from-saffron-500 to-deep-teal-500 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </form>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-peacock-green-100 dark:bg-peacock-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-peacock-green-600 dark:text-peacock-green-400" />
                </div>
                <h4 className="text-lg font-medium text-indigo-700 dark:text-soft-gold-500 mb-2">
                  Thank you for subscribing!
                </h4>
                <p className="text-wisdom-600 dark:text-wisdom-400">
                  You'll receive our weekly wisdom newsletter starting next week.
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-display text-indigo-700 dark:text-soft-gold-500">
              Upcoming Events
            </h3>
            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              onClick={onViewEvents}
              className="text-saffron-600 dark:text-saffron-400 hover:text-saffron-700 dark:hover:text-saffron-300 text-sm font-medium flex items-center space-x-1"
            >
              <span>View All Events</span>
              <ExternalLink className="w-4 h-4" />
            </motion.button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.title}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-premium p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-display text-indigo-700 dark:text-soft-gold-500 mb-2">
                      {event.title}
                    </h4>
                    <div className="flex items-center space-x-4 text-sm text-wisdom-500 dark:text-wisdom-400 mb-2">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                    </div>
                    <span className="inline-block bg-saffron-100 dark:bg-saffron-900/30 text-saffron-700 dark:text-saffron-300 px-2 py-1 rounded-full text-xs font-medium mb-3">
                      {event.type}
                    </span>
                  </div>
                </div>
                <p className="text-wisdom-600 dark:text-wisdom-400 text-sm leading-relaxed">
                  {event.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Community Benefits */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-display text-indigo-700 dark:text-soft-gold-500 mb-8 text-center">
            Why Join Our Community?
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {communityBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-saffron-500 to-deep-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-display text-indigo-700 dark:text-soft-gold-500 mb-2">
                  {benefit.title}
                </h4>
                <p className="text-wisdom-600 dark:text-wisdom-400 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
