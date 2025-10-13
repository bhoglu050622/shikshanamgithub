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
    { name: 'Learning Packages', href: ROUTES.PACKAGES },
    { name: 'Study Materials', href: '/help' },
    { name: 'Support Center', href: '/help' }
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
    <footer id="footer" className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-white transition-colors duration-300 relative overflow-hidden border-t border-slate-700 dark:border-slate-700">
      {/* Animated Mandala Border Pattern - Contained within viewport */}
      <div className="absolute inset-0 -z-10 overflow-hidden opacity-20 dark:opacity-30">
        {/* Top Mandala Border */}
        <div className="absolute top-0 left-0 right-0 h-20 overflow-hidden">
          <div
            className="flex space-x-8"
          >
            {[...Array(10)].map((_, i) => (
              <div key={i} className="w-16 h-16 border-2 border-primary/30 dark:border-primary/40 rounded-full flex items-center justify-center flex-shrink-0">
                <div className="w-8 h-8 border border-primary/40 dark:border-primary/50 rounded-full"></div>
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
              <div key={i} className="w-16 h-16 border-2 border-accent/30 dark:border-accent/40 rounded-full flex items-center justify-center flex-shrink-0">
                <div className="w-8 h-8 border border-accent/40 dark:border-accent/50 rounded-full"></div>
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
              <div key={i} className="w-12 h-12 border-2 border-primary/25 dark:border-primary/30 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 border border-primary/35 dark:border-primary/40 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="hidden lg:block absolute top-1/2 right-0 w-20 h-full overflow-hidden">
          <div
            className="flex flex-col space-y-8"
          >
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-12 h-12 border-2 border-accent/25 dark:border-accent/30 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 border border-accent/35 dark:border-accent/40 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Floating Mandala Elements - Contained within safe areas */}
        <div className="absolute top-20 left-1/4 opacity-10 max-w-24 max-h-24">
          <div
            className="w-24 h-24 border-2 border-primary/30 rounded-full flex items-center justify-center"
          >
            <div className="w-16 h-16 border border-primary/40 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 border border-primary/50 rounded-full"></div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-20 right-1/4 opacity-10 max-w-20 max-h-20">
          <div
            className="w-20 h-20 border-2 border-accent/30 rounded-full flex items-center justify-center"
          >
            <div className="w-12 h-12 border border-accent/40 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 border border-accent/50 rounded-full"></div>
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
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-serif text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Shikshanam
              </span>
            </div>
            <p className="text-white mb-6 leading-relaxed">
              Preserving and sharing ancient Indian wisdom with the modern world. Join us in this noble mission of cultural preservation and spiritual growth.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 p-4 bg-slate-800/50 dark:bg-slate-800/50 rounded-2xl border border-slate-600 dark:border-slate-600 backdrop-blur-sm">
              {contactInfo.map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  className="flex items-center space-x-3 text-white hover:text-amber-400 transition-colors duration-200"
                >
                  <contact.icon className="w-4 h-4 text-amber-500" />
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
              <h3 className="font-semibold text-amber-500 mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link, linkIndex) => (
                  <li
                    key={link.name}
                  >
                    <a
                      href={link.href}
                      className="text-white hover:text-amber-400 transition-all duration-200 text-sm hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div
          className="bg-slate-800/70 dark:bg-slate-800/70 rounded-3xl p-8 mb-12 backdrop-blur-sm border border-slate-600 dark:border-slate-600 shadow-lg"
        >
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="font-serif text-2xl font-bold text-amber-500 mb-4">
              Stay Updated with Ancient Wisdom
            </h3>
            <p className="text-white mb-6">
              Get weekly insights, course updates, and spiritual wisdom delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-2xl border border-slate-600 dark:border-slate-600 bg-slate-700 dark:bg-slate-700 text-white dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all duration-200"
              />
              <button
                className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-6 py-3 rounded-2xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700 dark:border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div
              className="text-white text-sm flex items-center gap-1"
            >
              © 2024 Shikshanam. All rights reserved. Made with{' '}
              <Heart className="w-4 h-4 text-amber-500 inline fill-amber-500" /> in India.
            </div>

            {/* Social Links */}
            <div
              className="flex items-center space-x-4"
            >
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`w-10 h-10 bg-slate-700 dark:bg-slate-700 rounded-2xl flex items-center justify-center text-white hover:text-amber-400 hover:bg-slate-600 dark:hover:bg-slate-600 transition-all duration-200 hover:scale-110 border border-slate-600 dark:border-slate-600`}
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
              className="hover:text-amber-400 transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a 
              href={ROUTES.TERMS} 
              className="hover:text-amber-400 transition-colors duration-200"
            >
              Terms of Service
            </a>
            <a 
              href="#cookies" 
              className="hover:text-amber-400 transition-colors duration-200"
            >
              Cookie Policy
            </a>
            <a 
              href={ROUTES.ACCESSIBILITY} 
              className="hover:text-amber-400 transition-colors duration-200"
            >
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
