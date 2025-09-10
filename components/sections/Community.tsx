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
    color: 'from-primary to-primary/90',
    members: '15,000+',
    features: ['Daily wisdom quotes', 'Live session reminders', 'Study groups', 'Q&A support'],
    cta: 'Join Telegram Group',
    link: '#telegram'
  },
  {
    name: 'Instagram',
    description: 'Follow us for visual content, daily inspiration, and behind-the-scenes glimpses',
    icon: Instagram,
    color: 'from-accent to-accent/90',
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
    <section id="community" className="section-padding bg-background relative overflow-hidden">
      {/* Background Animation - Pulsing Ripple Effects & Glowing Diya Connections */}
      <div className="absolute inset-0 -z-10">
        {/* Glowing Diya Flames Connecting Dots */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-gradient-to-br from-primary/80 to-primary rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-gradient-to-br from-secondary/80 to-secondary rounded-full animate-pulse opacity-50 animation-delay-1000"></div>
        <div className="absolute top-60 left-1/3 w-5 h-5 bg-gradient-to-br from-accent/80 to-accent rounded-full animate-pulse opacity-55 animation-delay-2000"></div>
        <div className="absolute top-80 right-20 w-3 h-3 bg-gradient-to-br from-primary/80 to-primary rounded-full animate-pulse opacity-40 animation-delay-3000"></div>
        <div className="absolute bottom-40 left-32 w-4 h-4 bg-gradient-to-br from-secondary/80 to-secondary rounded-full animate-pulse opacity-45 animation-delay-4000"></div>
        <div className="absolute bottom-20 right-1/3 w-3 h-3 bg-gradient-to-br from-muted/80 to-muted rounded-full animate-pulse opacity-35 animation-delay-5000"></div>
        
        {/* Connecting Lines Between Diya Flames */}
        <div className="absolute top-20 left-20 w-32 h-0.5 bg-gradient-to-r from-primary/30 to-transparent transform rotate-12 animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-0.5 bg-gradient-to-r from-secondary/30 to-transparent transform -rotate-12 animate-pulse animation-delay-1000"></div>
        <div className="absolute top-60 left-1/3 w-28 h-0.5 bg-gradient-to-r from-accent/30 to-transparent transform rotate-6 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-40 left-32 w-20 h-0.5 bg-gradient-to-r from-secondary/30 to-transparent transform -rotate-6 animate-pulse animation-delay-4000"></div>
        
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
            className="w-32 h-32 border-2 border-primary/30 rounded-full"
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
            className="w-24 h-24 border-2 border-secondary/30 rounded-full"
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
            className="w-28 h-28 border-2 border-accent/30 rounded-full"
          ></motion.div>
        </div>
        
        {/* Subtle gradient overlays */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-primary/5 to-secondary/4 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-secondary/5 to-accent/4 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
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
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Connect With{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Our Community
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
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
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl">
                <feature.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
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
                className="bg-card rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-border"
              >
                {/* Header */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${platform.color} rounded-2xl flex items-center justify-center`}>
                    <platform.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-foreground">{platform.name}</h4>
                    <p className="text-muted-foreground">{platform.description}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="mb-6">
                  <div className="text-3xl font-bold text-foreground mb-1">
                    {platform.name === 'Telegram' ? platform.members : platform.followers}
                  </div>
                  <div className="text-muted-foreground">
                    {platform.name === 'Telegram' ? 'Active Members' : 'Followers'}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h5 className="font-semibold text-foreground mb-3">What you'll find:</h5>
                  <ul className="space-y-2">
                    {platform.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 + featureIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-2 text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        <span className="text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button with Pulsing Ripple Effect */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full bg-gradient-to-r ${platform.color} text-primary-foreground py-4 px-6 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 relative overflow-hidden group`}
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
                    className="absolute inset-0 bg-primary-foreground/20 rounded-2xl"
                  ></motion.div>
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>


      </div>
    </section>
  )
}
