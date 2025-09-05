'use client'

import { motion } from 'framer-motion'
import { BookOpen, Mail, Phone, MapPin, MessageCircle, Instagram, Twitter, Youtube, Heart, ArrowRight } from 'lucide-react'

const footerLinks = {
  'Learning': [
    { name: 'Sanskrit School', href: '#sanskrit' },
    { name: 'Darshan School', href: '#darshan' },
    { name: 'Self-help School', href: '#self-help' },
    { name: 'Live Classes', href: '#live-classes' },
    { name: 'Self-Paced Courses', href: '#courses' }
  ],
  'Resources': [
    { name: 'Study Materials', href: '#materials' },
    { name: 'Practice Tests', href: '#tests' },
    { name: 'Video Library', href: '#videos' },
    { name: 'E-books', href: '#ebooks' },
    { name: 'Research Papers', href: '#papers' }
  ],
  'Community': [
    { name: 'Student Forum', href: '#forum' },
    { name: 'Teacher Network', href: '#teachers' },
    { name: 'Events & Workshops', href: '#events' },
    { name: 'Success Stories', href: '#stories' },
    { name: 'Volunteer Program', href: '#volunteer' }
  ],
  'Support': [
    { name: 'Help Center', href: '#help' },
    { name: 'Contact Us', href: '#contact' },
    { name: 'FAQs', href: '#faqs' },
    { name: 'Technical Support', href: '#tech-support' },
    { name: 'Feedback', href: '#feedback' }
  ]
}

const socialLinks = [
  { name: 'Telegram', icon: MessageCircle, href: '#telegram', color: 'hover:text-blue-500' },
  { name: 'Instagram', icon: Instagram, href: '#instagram', color: 'hover:text-pink-500' },
  { name: 'Twitter', icon: Twitter, href: '#twitter', color: 'hover:text-blue-400' },
  { name: 'YouTube', icon: Youtube, href: '#youtube', color: 'hover:text-red-500' }
]

const contactInfo = [
  { icon: Mail, text: 'hello@shikshanam.com', href: 'mailto:hello@shikshanam.com' },
  { icon: Phone, text: '+91 98765 43210', href: 'tel:+919876543210' },
  { icon: MapPin, text: 'Mumbai, Maharashtra, India', href: '#location' }
]

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-wisdom-900 to-wisdom-800 dark:from-wisdom-950 dark:to-wisdom-900 text-white transition-colors duration-300 relative">
      {/* Animated Mandala Border Pattern */}
      <div className="absolute inset-0 -z-10">
        {/* Top Mandala Border */}
        <div className="absolute top-0 left-0 right-0 h-20 overflow-hidden">
          <motion.div
            animate={{ 
              x: [0, -100, 0],
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="flex space-x-8"
          >
            {[...Array(10)].map((_, i) => (
              <div key={i} className="w-16 h-16 border-2 border-saffron-400/20 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 border border-saffron-300/30 rounded-full"></div>
              </div>
            ))}
          </motion.div>
        </div>
        
        {/* Bottom Mandala Border */}
        <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
          <motion.div
            animate={{ 
              x: [0, 100, 0],
              rotate: [0, -360]
            }}
            transition={{ 
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="flex space-x-8"
          >
            {[...Array(10)].map((_, i) => (
              <div key={i} className="w-16 h-16 border-2 border-turquoise-400/20 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 border border-turquoise-300/30 rounded-full"></div>
              </div>
            ))}
          </motion.div>
        </div>
        
        {/* Side Mandala Patterns */}
        <div className="absolute top-1/2 left-0 w-20 h-full overflow-hidden">
          <motion.div
            animate={{ 
              y: [0, -50, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="flex flex-col space-y-8"
          >
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-12 h-12 border-2 border-saffron-400/15 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 border border-saffron-300/25 rounded-full"></div>
              </div>
            ))}
          </motion.div>
        </div>
        
        <div className="absolute top-1/2 right-0 w-20 h-full overflow-hidden">
          <motion.div
            animate={{ 
              y: [0, 50, 0],
              rotate: [0, -180, -360]
            }}
            transition={{ 
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="flex flex-col space-y-8"
          >
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-12 h-12 border-2 border-turquoise-400/15 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 border border-turquoise-300/25 rounded-full"></div>
              </div>
            ))}
          </motion.div>
        </div>
        
        {/* Floating Mandala Elements */}
        <div className="absolute top-20 left-1/4 opacity-10">
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            className="w-24 h-24 border-2 border-saffron-400/20 rounded-full flex items-center justify-center"
          >
            <div className="w-16 h-16 border border-saffron-300/30 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 border border-saffron-200/40 rounded-full"></div>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-20 right-1/4 opacity-10">
          <motion.div
            animate={{ 
              rotate: [0, -360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 35,
              repeat: Infinity,
              ease: "linear"
            }}
            className="w-20 h-20 border-2 border-turquoise-400/20 rounded-full flex items-center justify-center"
          >
            <div className="w-12 h-12 border border-turquoise-300/30 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 border border-turquoise-200/40 rounded-full"></div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="container-custom py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-saffron-500 to-turquoise-500 rounded-2xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="font-serif text-2xl font-bold bg-gradient-to-r from-saffron-400 to-turquoise-400 bg-clip-text text-transparent">
                Shikshanam
              </span>
            </div>
            <p className="text-wisdom-300 mb-6 leading-relaxed">
              Preserving and sharing ancient Indian wisdom with the modern world. Join us in this noble mission of cultural preservation and spiritual growth.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((contact, index) => (
                <motion.a
                  key={index}
                  href={contact.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3 text-wisdom-300 hover:text-white transition-colors duration-200"
                >
                  <contact.icon className="w-4 h-4 text-saffron-400" />
                  <span className="text-sm">{contact.text}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-white mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + linkIndex * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <a
                      href={link.href}
                      className="text-wisdom-300 hover:text-white transition-colors duration-200 text-sm hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-white/10 dark:bg-wisdom-800/20 rounded-3xl p-8 mb-12 backdrop-blur-sm border border-white/10 dark:border-wisdom-700/30"
        >
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="font-serif text-2xl font-bold text-white mb-4">
              Stay Updated with Ancient Wisdom
            </h3>
            <p className="text-wisdom-300 dark:text-wisdom-200 mb-6">
              Get weekly insights, course updates, and spiritual wisdom delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-2xl border-0 text-wisdom-900 dark:text-wisdom-100 bg-white/90 dark:bg-wisdom-800/90 placeholder-wisdom-500 dark:placeholder-wisdom-400 focus:ring-2 focus:ring-saffron-500 focus:outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-saffron-500 to-saffron-600 dark:from-saffron-400 dark:to-saffron-500 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <div className="border-t border-wisdom-700 dark:border-wisdom-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-wisdom-400 dark:text-wisdom-300 text-sm"
            >
              © 2024 Shikshanam. All rights reserved. Made with{' '}
              <Heart className="w-4 h-4 text-saffron-400 inline" /> in India.
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className={`w-10 h-10 bg-white/10 dark:bg-wisdom-800/20 rounded-2xl flex items-center justify-center text-wisdom-300 dark:text-wisdom-200 ${social.color} transition-all duration-200 hover:bg-white/20 dark:hover:bg-wisdom-700/30`}
                  title={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Additional Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6 mt-6 text-wisdom-400 dark:text-wisdom-300 text-sm"
          >
            <a href="#privacy" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors duration-200">Terms of Service</a>
            <a href="#cookies" className="hover:text-white transition-colors duration-200">Cookie Policy</a>
            <a href="#accessibility" className="hover:text-white transition-colors duration-200">Accessibility</a>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
