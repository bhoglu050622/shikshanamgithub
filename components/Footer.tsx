'use client'

import { BookOpen, Mail, Phone, MapPin, MessageCircle, Instagram, Twitter, Youtube, Facebook, Heart, ArrowRight } from 'lucide-react'
import { ROUTES } from '@/lib/routes'

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
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/shikshanam', color: 'hover:text-blue-600' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/shikshanam', color: 'hover:text-pink-500' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/shikshanam', color: 'hover:text-blue-400' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/shikshanam', color: 'hover:text-red-500' },
  { name: 'Telegram', icon: MessageCircle, href: 'https://t.me/shikshanam', color: 'hover:text-blue-500' }
]

const contactInfo = [
  { icon: Mail, text: 'hello@shikshanam.com', href: 'mailto:hello@shikshanam.com' },
  { icon: Phone, text: '+91-9910032165', href: 'tel:+919910032165' },
  { icon: MapPin, text: 'Monday to Saturday 11AM – 6PM', href: '#hours' }
]


export default function Footer() {
  return (
    <footer className="bg-background border-t border-border mt-auto" role="contentinfo">
      <div className="container-custom py-16 relative z-10 mb-0">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="font-serif text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                Shikshanam
              </span>
            </div>
            <p className="text-white mb-6 leading-relaxed">
              Preserving and sharing ancient Indian wisdom with the modern world. Join us in this noble mission of cultural preservation and spiritual growth.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 p-4 bg-gray-800/50 rounded-2xl border border-orange-400/30 backdrop-blur-sm">
              {contactInfo.map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  className="flex items-center space-x-3 text-white hover:text-orange-400 transition-colors duration-200"
                >
                  <contact.icon className="w-4 h-4 text-orange-400" />
                  <span className="text-sm font-medium">{contact.text}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <div
              key={category}
            >
              <h3 className="font-semibold text-white mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link, linkIndex) => (
                  <div
                    key={link.name}
                  >
                    <a
                      href={link.href}
                      className="text-white hover:text-orange-400 transition-colors duration-200 text-sm hover:translate-x-1 inline-block"
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
          className="bg-gray-800/50 rounded-3xl p-8 mb-12 backdrop-blur-sm border border-orange-400/30"
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
                className="flex-1 px-4 py-3 rounded-2xl border-0 text-gray-800 bg-white placeholder-gray-500 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
              <button
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div
              className="text-white text-sm"
            >
              © 2024 Shikshanam. All rights reserved. Made with{' '}
              <Heart className="w-4 h-4 text-orange-400 inline" /> in India.
            </div>

            {/* Social Links */}
            <div
              className="flex items-center space-x-4"
            >
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`w-10 h-10 bg-gray-800/50 rounded-2xl flex items-center justify-center text-white hover:text-orange-400 transition-all duration-200 hover:bg-gray-700/50 border border-gray-700/50 hover:border-orange-400/50`}
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
              className="hover:text-orange-400 transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a 
              href={ROUTES.TERMS} 
              className="hover:text-orange-400 transition-colors duration-200"
            >
              Terms of Service
            </a>
            <a 
              href="#cookies" 
              className="hover:text-orange-400 transition-colors duration-200"
            >
              Cookie Policy
            </a>
            <a 
              href={ROUTES.ACCESSIBILITY} 
              className="hover:text-orange-400 transition-colors duration-200"
            >
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
