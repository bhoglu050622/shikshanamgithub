'use client'

import { motion } from 'framer-motion'
import { Heart, Target, Users, Globe, ArrowRight, Play, Award, BookOpen } from 'lucide-react'

const missionValues = [
  {
    icon: Heart,
    title: 'Authenticity',
    description: 'We preserve the true essence of ancient Indian wisdom without dilution or commercialization.'
  },
  {
    icon: Target,
    title: 'Accessibility',
    description: 'Making profound knowledge accessible to everyone, regardless of background or location.'
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Building a global community of learners, teachers, and wisdom seekers.'
  },
  {
    icon: Globe,
    title: 'Global Impact',
    description: 'Sharing India\'s spiritual heritage with the world for universal benefit.'
  }
]

const achievements = [
  '15+ years of combined experience in education and spirituality',
  'Published 50+ research papers on ancient Indian knowledge',
  'Trained 1000+ teachers in traditional teaching methods',
  'Awarded by Ministry of Culture for cultural preservation',
  'Featured in leading international education publications'
]

export default function FoundersMission() {
  return (
    <section id="founders-mission" className="section-padding bg-parchment-ivory relative overflow-hidden">
      {/* Background Animation - Golden Gradient & Sanskrit Shloka */}
      <div className="absolute inset-0 -z-10">
        {/* Animated Sanskrit Shloka Text */}
        <div className="absolute top-20 left-10 opacity-10 dark:opacity-5">
          <motion.div
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-6xl font-display text-temple-gold"
          >
            सत्यमेव जयते
          </motion.div>
        </div>
        
        <div className="absolute top-40 right-20 opacity-8 dark:opacity-4">
          <motion.div
            animate={{ 
              opacity: [0.08, 0.25, 0.08],
              scale: [1, 1.03, 1]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="text-4xl font-display text-temple-gold/80"
          >
            वसुधैव कुटुम्बकम
          </motion.div>
        </div>
        
        <div className="absolute bottom-40 left-20 opacity-6 dark:opacity-3">
          <motion.div
            animate={{ 
              opacity: [0.06, 0.2, 0.06],
              scale: [1, 1.04, 1]
            }}
            transition={{ 
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
            className="text-5xl font-display text-temple-gold/60"
          >
            सर्वे भवन्तु सुखिनः
          </motion.div>
        </div>
        
        {/* Golden gradient overlays */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-temple-gold/10 to-golden-olive/8 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-golden-olive/10 to-temple-gold/8 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-dark-olive mb-6">
              A Vision Rooted in{' '}
              <span className="bg-gradient-to-r from-temple-gold to-golden-olive bg-clip-text text-transparent">
                Tradition
              </span>
              , Blossoming in the{' '}
              <span className="bg-gradient-to-r from-golden-olive to-temple-gold bg-clip-text text-transparent">
                Future
              </span>
            </h2>
            
            <p className="text-lg text-deep-maroon mb-6 leading-relaxed">
              At Shikshanam, we believe learning is not just about knowledge — it is a spiritual journey of self-discovery. Our mission is to bridge eternal Indian wisdom with the modern world.
            </p>
            
            <p className="text-lg text-deep-maroon mb-8 leading-relaxed">
              We envision a world where ancient wisdom guides modern living, where spiritual growth complements material progress, and where every individual can access the transformative power of India's spiritual heritage.
            </p>

            {/* Mission Values */}
            <div className="space-y-4 mb-8">
              {missionValues.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-golden-olive to-golden-olive/90 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark-olive mb-1">{value.title}</h4>
                    <p className="text-sand-beige text-sm leading-relaxed">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-shikshanam-primary px-8 py-4 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
            >
              <span>Learn More About Us</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Right Content - Video/Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Main Video/Image Container */}
            <div className="relative bg-gradient-to-br from-sand-beige/30 to-parchment-ivory/50 rounded-3xl p-8 shadow-2xl border border-temple-gold/20">
              <div className="aspect-video bg-gradient-to-br from-golden-olive/20 to-deep-maroon/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
                {/* Placeholder for video/image */}
                <div className="absolute inset-0 bg-gradient-to-br from-golden-olive/30 to-deep-maroon/30 opacity-20"></div>
                
                {/* Play Button */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative z-10 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer"
                >
                  <Play className="w-8 h-8 text-golden-olive ml-1" />
                </motion.div>

                {/* Floating Elements */}
                <div className="absolute top-4 left-4 w-16 h-16 bg-white/80 rounded-2xl flex items-center justify-center shadow-lg">
                  <BookOpen className="w-8 h-8 text-golden-olive" />
                </div>
                <div className="absolute top-4 right-4 w-16 h-16 bg-white/80 rounded-2xl flex items-center justify-center shadow-lg">
                  <Award className="w-8 h-8 text-deep-maroon" />
                </div>
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/80 rounded-2xl flex items-center justify-center shadow-lg">
                  <Users className="w-8 h-8 text-copper-orange" />
                </div>
                <div className="absolute bottom-4 right-4 w-16 h-16 bg-white/80 rounded-2xl flex items-center justify-center shadow-lg">
                  <Globe className="w-8 h-8 text-golden-olive" />
                </div>
              </div>

              {/* Video Description */}
              <div className="mt-6 text-center">
                <h3 className="font-semibold text-dark-olive mb-2">Our Story</h3>
                <p className="text-deep-maroon text-sm">
                  Watch how Shikshanam began and learn about our journey in preserving ancient wisdom.
                </p>
              </div>
            </div>

            {/* Achievement Badges */}
            <div className="absolute -top-4 -left-4 bg-white rounded-2xl p-4 shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-golden-olive">15+</div>
                <div className="text-xs text-sand-beige">Years</div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-deep-maroon">50+</div>
                <div className="text-xs text-sand-beige">Papers</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="bg-gradient-to-r from-sand-beige/30 to-parchment-ivory/50 rounded-3xl p-8 border border-temple-gold/20">
            <h3 className="font-serif text-2xl font-bold text-dark-olive text-center mb-8">
              Our Achievements & Recognition
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-3"
                >
                  <div className="w-2 h-2 bg-golden-olive rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-deep-maroon leading-relaxed">{achievement}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-deep-maroon to-copper-orange rounded-3xl p-8 text-white max-w-3xl mx-auto">
            <h3 className="font-serif text-2xl font-bold mb-4">
              Join Us in This Noble Mission
            </h3>
            <p className="text-white/90 mb-6 text-lg">
              Whether you're a student, teacher, or supporter, you can be part of preserving and sharing India's spiritual heritage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-parchment-ivory text-deep-maroon px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                Become a Student
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-parchment-ivory text-parchment-ivory px-8 py-3 rounded-2xl font-semibold hover:bg-parchment-ivory hover:text-deep-maroon transition-all duration-300"
              >
                Support Our Mission
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
