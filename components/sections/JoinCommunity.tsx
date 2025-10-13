'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Instagram } from 'lucide-react'
import { useHydrationSafeAnimation } from '@/lib/hooks/useHydrationSafeAnimation'

export default function JoinCommunity() {
  const mounted = useHydrationSafeAnimation()

  const socialLinks = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: 'https://wa.me/PLACEHOLDER',
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:from-green-600 hover:to-green-700',
      description: 'Join our WhatsApp community',
      members: '15,000+',
      activity: 'Daily Wisdom'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/shikshanam',
      color: 'from-pink-500 to-purple-600',
      hoverColor: 'hover:from-pink-600 hover:to-purple-700',
      description: 'Follow us on Instagram',
      members: '25,000+',
      activity: 'Visual Content'
    }
  ]

  const communityStats = [
    { number: '40,000+', label: 'Total Members' },
    { number: '500+', label: 'Daily Active' },
    { number: '10+', label: 'Live Sessions' }
  ]

  return (
    <section id="join-community" className="py-12 md:py-16 bg-gradient-to-b from-[hsl(45,40%,98%)] to-[hsl(45,30%,97%)] dark:from-[hsl(240,8%,9%)] dark:to-[hsl(240,6%,11%)] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={mounted ? { 
            rotate: 360,
            scale: [1, 1.2, 1]
          } : {}}
          transition={mounted ? { 
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          } : { duration: 0 }}
          className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full mix-blend-multiply filter blur-3xl"
        />
        <motion.div
          animate={mounted ? { 
            rotate: -360,
            scale: [1, 1.3, 1]
          } : {}}
          transition={mounted ? { 
            duration: 35,
            repeat: Infinity,
            ease: "linear"
          } : { duration: 0 }}
          className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-secondary/5 to-primary/5 rounded-full mix-blend-multiply filter blur-3xl"
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Enhanced Section Header */}
        <motion.div
          initial={mounted ? { opacity: 0, y: 30 } : false}
          whileInView={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={mounted ? { duration: 0.8 } : { duration: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            animate={mounted ? {
              textShadow: [
                '0 0 0px rgba(218, 165, 32, 0)',
                '0 0 20px rgba(218, 165, 32, 0.3)',
                '0 0 0px rgba(218, 165, 32, 0)'
              ]
            } : {}}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Join Our Community
            </h2>
          </motion.div>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
            Connect with fellow learners, share your journey, and stay updated with the latest from Shikshanam
          </p>
          
          {/* Community Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {communityStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={mounted ? { opacity: 0, scale: 0.8 } : false}
                whileInView={mounted ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
                transition={mounted ? { duration: 0.6, delay: 0.2 + index * 0.1 } : { duration: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Social Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={mounted ? { opacity: 0, y: 30 } : false}
              whileInView={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={mounted ? { duration: 0.6, delay: index * 0.2 } : { duration: 0 }}
              viewport={{ once: true }}
              whileHover={mounted ? { scale: 1.02, y: -8 } : {}}
              whileTap={mounted ? { scale: 0.98 } : {}}
              className="group"
            >
              <div className="bg-white dark:bg-card border border-border rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 h-full relative overflow-hidden">
                {/* Background gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${
                  social.name === 'WhatsApp' ? 'from-green-500/5 to-green-600/10' : 'from-pink-500/5 to-purple-600/10'
                } opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10 flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <motion.div 
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                        social.name === 'WhatsApp' ? 'bg-green-500/10 text-green-600' : 'bg-pink-500/10 text-pink-600'
                      }`}
                      whileHover={mounted ? { 
                        rotate: 360,
                        scale: 1.1
                      } : {}}
                      transition={mounted ? { duration: 0.6 } : { duration: 0 }}
                    >
                      <social.icon className="w-8 h-8" />
                    </motion.div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-foreground">{social.members}</div>
                      <div className="text-sm text-muted-foreground">Members</div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {social.name}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {social.description}
                    </p>
                    <div className="flex items-center gap-2 mb-6">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        social.name === 'WhatsApp' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400'
                      }`}>
                        {social.activity}
                      </span>
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <motion.div
                    className={`w-full px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 group/btn ${
                      social.name === 'WhatsApp' ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-pink-500 text-white hover:bg-pink-600'
                    }`}
                    whileHover={mounted ? { scale: 1.05 } : {}}
                    whileTap={mounted ? { scale: 0.95 } : {}}
                  >
                    <span>Join Now</span>
                    <motion.svg 
                      className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </motion.svg>
                  </motion.div>
                </div>
                
                {/* Shimmer effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12"
                  initial={{ x: '-100%' }}
                  whileHover={mounted ? { x: '200%' } : {}}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Additional info */}
        <motion.div
          initial={mounted ? { opacity: 0 } : false}
          whileInView={mounted ? { opacity: 1 } : { opacity: 1 }}
          transition={mounted ? { duration: 0.8, delay: 0.6 } : { duration: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground">
            Be part of a growing community of learners passionate about ancient Indian wisdom
          </p>
        </motion.div>
      </div>
    </section>
  )
}

