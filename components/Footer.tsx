'use client'

import { BookOpen, Mail, Phone, MapPin, MessageCircle, Instagram, Twitter, Youtube, Heart, ArrowRight } from 'lucide-react'
import { ROUTES, NAVIGATION_GROUPS } from '@/lib/routes'

const footerLinks = {
  'Learning': [
    { name: 'Sanskrit School', href: ROUTES.SCHOOL_SANSKRIT },
    { name: 'Darshan School', href: ROUTES.SCHOOL_DARSHANA },
    { name: 'Self-help School', href: ROUTES.SCHOOL_SELF_HELP },
    { name: 'All Schools', href: ROUTES.SCHOOLS },
    { name: 'Courses', href: ROUTES.COURSES }
  ],
  'Practice': [
    { name: 'Sanskrit Practice', href: ROUTES.PRACTICE_SANSKRIT },
    { name: 'Sandhi Tool', href: ROUTES.TOOLS_SANDHI },
    { name: 'Keyboard Helper', href: ROUTES.TOOLS_KEYBOARD },
    { name: 'Sanskrit Glossary', href: ROUTES.GLOSSARIES_SANSKRIT },
    { name: 'Learning Packages', href: ROUTES.PACKAGES }
  ],
  'Community': [
    { name: 'Meet Gurus', href: ROUTES.GURUS },
    { name: 'Sanskrit Blog', href: ROUTES.BLOGS_SANSKRIT },
    { name: 'Student Stories', href: '/about' },
    { name: 'Events & Workshops', href: '/courses' },
    { name: 'Success Stories', href: '/about' }
  ],
  'Support': [
    { name: 'Help Center', href: ROUTES.HELP },
    { name: 'Contact Us', href: ROUTES.CONTACT },
    { name: 'About Us', href: ROUTES.ABOUT },
    { name: 'Technical Support', href: '/help' },
    { name: 'Feedback', href: '/contact' }
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
  { icon: Phone, text: '+91-9910032165', href: 'tel:+919910032165' },
  { icon: MapPin, text: 'Monday to Saturday 11AM – 6PM', href: '#hours' }
]


export default function Footer() {
  return (
    <footer id="footer" className="bg-deep-maroon text-white transition-colors duration-300 relative overflow-hidden">
      {/* Animated Mandala Border Pattern - Contained within viewport */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Top Mandala Border */}
        <div className="absolute top-0 left-0 right-0 h-20 overflow-hidden">
          <div
            className="flex space-x-8"
          >
            {[...Array(10)].map((_, i) => (
              <div key={i} className="w-16 h-16 border-2 border-temple-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                <div className="w-8 h-8 border border-temple-gold/30 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom Mandala Border */}
        <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
          <div
            className="flex space-x-8"
          >
            {[...Array(10)].map((_, i) => (
              <div key={i} className="w-16 h-16 border-2 border-copper-orange/20 rounded-full flex items-center justify-center flex-shrink-0">
                <div className="w-8 h-8 border border-copper-orange/30 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Side Mandala Patterns - Hidden on mobile to prevent overflow */}
        <div className="hidden lg:block absolute top-1/2 left-0 w-20 h-full overflow-hidden">
          <div
            className="flex flex-col space-y-8"
          >
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-12 h-12 border-2 border-temple-gold/15 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 border border-temple-gold/25 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="hidden lg:block absolute top-1/2 right-0 w-20 h-full overflow-hidden">
          <div
            className="flex flex-col space-y-8"
          >
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-12 h-12 border-2 border-copper-orange/15 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 border border-copper-orange/25 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Floating Mandala Elements - Contained within safe areas */}
        <div className="absolute top-20 left-1/4 opacity-10 max-w-24 max-h-24">
          <div
            className="w-24 h-24 border-2 border-temple-gold/20 rounded-full flex items-center justify-center"
          >
            <div className="w-16 h-16 border border-temple-gold/30 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 border border-temple-gold/40 rounded-full"></div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-20 right-1/4 opacity-10 max-w-20 max-h-20">
          <div
            className="w-20 h-20 border-2 border-copper-orange/20 rounded-full flex items-center justify-center"
          >
            <div className="w-12 h-12 border border-copper-orange/30 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 border border-copper-orange/40 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container-custom py-16 relative z-10 mb-0">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-golden-olive to-copper-orange rounded-2xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="font-serif text-2xl font-bold bg-gradient-to-r from-temple-gold to-copper-orange bg-clip-text text-transparent">
                Shikshanam
              </span>
            </div>
            <p className="text-white mb-6 leading-relaxed">
              Preserving and sharing ancient Indian wisdom with the modern world. Join us in this noble mission of cultural preservation and spiritual growth.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 p-4 bg-sand-beige/10 rounded-2xl border border-temple-gold/20">
              {contactInfo.map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  className="flex items-center space-x-3 text-white hover:text-temple-gold transition-colors duration-200"
                  style={{ color: '#ffffff' }}
                >
                  <contact.icon className="w-4 h-4 text-temple-gold" />
                  <span className="text-sm font-medium" style={{ color: '#ffffff' }}>{contact.text}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <div
              key={category}
            >
              <h3 className="font-semibold text-white mb-4" style={{ color: '#ffffff' }}>{category}</h3>
              <ul className="space-y-2">
                {links.map((link, linkIndex) => (
                  <div
                    key={link.name}
                  >
                    <a
                      href={link.href}
                      className="text-white hover:text-temple-gold transition-colors duration-200 text-sm hover:translate-x-1 inline-block"
                      style={{ color: '#ffffff' }}
                    >
                      {link.name}
                    </a>
                  </div>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div
          className="bg-sand-beige/10 rounded-3xl p-8 mb-12 backdrop-blur-sm border border-temple-gold/20"
        >
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="font-serif text-2xl font-bold text-white mb-4">
              Stay Updated with Ancient Wisdom
            </h3>
            <p className="text-white mb-6">
              Get weekly insights, course updates, and spiritual wisdom delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-2xl border-0 text-dark-olive bg-white placeholder-dark-olive/60 focus:ring-2 focus:ring-temple-gold focus:outline-none"
              />
              <button
                className="btn-shikshanam-primary px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-temple-gold/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div
              className="text-white text-sm"
            >
              © 2024 Shikshanam. All rights reserved. Made with{' '}
              <Heart className="w-4 h-4 text-temple-gold inline" /> in India.
            </div>

            {/* Social Links */}
            <div
              className="flex items-center space-x-4"
            >
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`w-10 h-10 bg-sand-beige/10 rounded-2xl flex items-center justify-center text-white hover:text-temple-gold transition-all duration-200 hover:bg-sand-beige/20`}
                  title={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Additional Links */}
          <div
            className="flex flex-wrap justify-center gap-6 mt-6 text-white text-sm"
          >
            <a 
              href={ROUTES.PRIVACY} 
              className="hover:text-temple-gold transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a 
              href={ROUTES.TERMS} 
              className="hover:text-temple-gold transition-colors duration-200"
            >
              Terms of Service
            </a>
            <a 
              href="#cookies" 
              className="hover:text-temple-gold transition-colors duration-200"
            >
              Cookie Policy
            </a>
            <a 
              href={ROUTES.ACCESSIBILITY} 
              className="hover:text-temple-gold transition-colors duration-200"
            >
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
