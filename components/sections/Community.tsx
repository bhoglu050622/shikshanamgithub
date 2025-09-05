'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Instagram, Users, Globe, Heart, Star, ArrowRight, ExternalLink, Calendar, Award } from 'lucide-react'

const communityFeatures = [
  {
    icon: Users,
    title: 'Global Network',
    description: 'Connect with learners and teachers from 25+ countries'
  },
  {
    icon: MessageCircle,
    title: 'Active Discussions',
    description: 'Join daily conversations about ancient wisdom and philosophy'
  },
  {
    icon: Calendar,
    title: 'Events & Meetups',
    description: 'Participate in virtual and in-person community events'
  },
  {
    icon: Award,
    title: 'Recognition',
    description: 'Get recognized for your contributions and achievements'
  }
]

const socialPlatforms = [
  {
    name: 'Telegram',
    description: 'Join our main community for daily discussions, announcements, and learning support',
    icon: MessageCircle,
    color: 'from-blue-500 to-blue-600',
    members: '15,000+',
    features: ['Daily wisdom quotes', 'Live session reminders', 'Study groups', 'Q&A support'],
    cta: 'Join Telegram Group',
    link: '#telegram'
  },
  {
    name: 'Instagram',
    description: 'Follow us for visual content, daily inspiration, and behind-the-scenes glimpses',
    icon: Instagram,
    color: 'from-pink-500 to-purple-600',
    followers: '25,000+',
    features: ['Daily wisdom posts', 'Live session stories', 'Student spotlights', 'Cultural content'],
    cta: 'Follow on Instagram',
    link: '#instagram'
  }
]

const upcomingEvents = [
  {
    title: 'Sanskrit Poetry Workshop',
    date: 'Dec 15, 2024',
    time: '7:00 PM IST',
    participants: '150+',
    type: 'Workshop'
  },
  {
    title: 'Philosophy Discussion Circle',
    date: 'Dec 18, 2024',
    time: '6:00 PM IST',
    participants: '200+',
    type: 'Discussion'
  },
  {
    title: 'Meditation & Mindfulness Session',
    date: 'Dec 20, 2024',
    time: '8:00 AM IST',
    participants: '300+',
    type: 'Practice'
  }
]

export default function Community() {
  return (
    <section id="community" className="section-padding bg-parchment-ivory relative overflow-hidden">
      {/* Background Animation - Pulsing Ripple Effects & Glowing Diya Connections */}
      <div className="absolute inset-0 -z-10">
        {/* Glowing Diya Flames Connecting Dots */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-gradient-to-br from-golden-olive/80 to-golden-olive rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-gradient-to-br from-deep-maroon/80 to-deep-maroon rounded-full animate-pulse opacity-50 animation-delay-1000"></div>
        <div className="absolute top-60 left-1/3 w-5 h-5 bg-gradient-to-br from-copper-orange/80 to-copper-orange rounded-full animate-pulse opacity-55 animation-delay-2000"></div>
        <div className="absolute top-80 right-20 w-3 h-3 bg-gradient-to-br from-temple-gold/80 to-temple-gold rounded-full animate-pulse opacity-40 animation-delay-3000"></div>
        <div className="absolute bottom-40 left-32 w-4 h-4 bg-gradient-to-br from-deep-indigo/80 to-deep-indigo rounded-full animate-pulse opacity-45 animation-delay-4000"></div>
        <div className="absolute bottom-20 right-1/3 w-3 h-3 bg-gradient-to-br from-sand-beige/80 to-sand-beige rounded-full animate-pulse opacity-35 animation-delay-5000"></div>
        
        {/* Connecting Lines Between Diya Flames */}
        <div className="absolute top-20 left-20 w-32 h-0.5 bg-gradient-to-r from-golden-olive/30 to-transparent transform rotate-12 animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-0.5 bg-gradient-to-r from-deep-maroon/30 to-transparent transform -rotate-12 animate-pulse animation-delay-1000"></div>
        <div className="absolute top-60 left-1/3 w-28 h-0.5 bg-gradient-to-r from-copper-orange/30 to-transparent transform rotate-6 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-40 left-32 w-20 h-0.5 bg-gradient-to-r from-deep-indigo/30 to-transparent transform -rotate-6 animate-pulse animation-delay-4000"></div>
        
        {/* Pulsing Ripple Effects */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.1, 0.3]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-32 h-32 border-2 border-golden-olive/30 rounded-full"
          ></motion.div>
        </div>
        
        <div className="absolute top-1/3 right-1/4 transform -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.05, 0.2]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="w-24 h-24 border-2 border-deep-maroon/30 rounded-full"
          ></motion.div>
        </div>
        
        <div className="absolute bottom-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={{ 
              scale: [1, 1.4, 1],
              opacity: [0.25, 0.08, 0.25]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="w-28 h-28 border-2 border-copper-orange/30 rounded-full"
          ></motion.div>
        </div>
        
        {/* Subtle gradient overlays */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-golden-olive/5 to-deep-maroon/4 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-deep-maroon/5 to-copper-orange/4 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
      </div>
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-dark-olive mb-6">
            Join Our{' '}
            <span className="bg-gradient-to-r from-golden-olive to-deep-maroon bg-clip-text text-transparent">
              Global Family
            </span>
          </h2>
          <p className="text-xl text-deep-maroon max-w-3xl mx-auto">
            Connect with thousands of learners, teachers, and wisdom seekers from around the world. Share experiences, ask questions, and grow together.
          </p>
        </motion.div>

        {/* Community Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {communityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center group cursor-pointer"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-golden-olive to-deep-maroon rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-dark-olive mb-2">{feature.title}</h3>
              <p className="text-sand-beige text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Social Platforms */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="font-serif text-2xl font-bold text-dark-olive text-center mb-8">
            Connect With Us
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {socialPlatforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -3 }}
                className="bg-parchment-ivory rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-golden-olive/20"
              >
                {/* Header */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${platform.color} rounded-2xl flex items-center justify-center`}>
                    <platform.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-dark-olive">{platform.name}</h4>
                    <p className="text-deep-maroon">{platform.description}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="mb-6">
                  <div className="text-3xl font-bold text-dark-olive mb-1">
                    {platform.name === 'Telegram' ? platform.members : platform.followers}
                  </div>
                  <div className="text-sand-beige">
                    {platform.name === 'Telegram' ? 'Active Members' : 'Followers'}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h5 className="font-semibold text-dark-olive mb-3">What you'll find:</h5>
                  <ul className="space-y-2">
                    {platform.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 + featureIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-2 text-deep-maroon"
                      >
                        <div className="w-1.5 h-1.5 bg-golden-olive rounded-full"></div>
                        <span className="text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button with Pulsing Ripple Effect */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full bg-gradient-to-r ${platform.color} text-white py-4 px-6 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 relative overflow-hidden group`}
                >
                  <span className="relative z-10">{platform.cta}</span>
                  <ExternalLink className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                  
                  {/* Pulsing Ripple Effect */}
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.1, 0.3]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-white/20 rounded-2xl"
                  ></motion.div>
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="font-serif text-2xl font-bold text-dark-olive text-center mb-8">
            Upcoming Community Events
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -3 }}
                className="bg-gradient-to-br from-sand-beige/30 to-parchment-ivory/50 rounded-2xl p-6 border border-temple-gold/20"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium text-golden-olive bg-parchment-ivory px-3 py-1 rounded-full">
                    {event.type}
                  </span>
                  <span className="text-xs text-sand-beige">{event.participants}</span>
                </div>
                
                <h4 className="font-bold text-dark-olive mb-2 text-lg">{event.title}</h4>
                
                <div className="space-y-2 text-sm text-deep-maroon">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-golden-olive" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-deep-maroon" />
                    <span>{event.time}</span>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-4 btn-shikshanam-primary py-3 px-6 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Join Event
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-deep-maroon to-copper-orange rounded-3xl p-8 text-white max-w-3xl mx-auto">
            <h3 className="font-serif text-2xl font-bold mb-4">
              Ready to Join Our Community?
            </h3>
            <p className="text-white/90 mb-6 text-lg">
              Connect with fellow learners, share your journey, and be part of a global movement to preserve ancient wisdom.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-parchment-ivory text-deep-maroon px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Join Telegram</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-parchment-ivory text-parchment-ivory px-8 py-3 rounded-2xl font-semibold hover:bg-parchment-ivory hover:text-deep-maroon transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Instagram className="w-5 h-5" />
                <span>Follow Instagram</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
