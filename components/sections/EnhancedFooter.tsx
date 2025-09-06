'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { 
  Heart, 
  Mail, 
  MessageCircle, 
  Instagram, 
  Twitter,
  Youtube,
  ExternalLink,
  ArrowRight,
  Sparkles,
  BookOpen,
  Users,
  Award,
  Globe,
  Phone,
  MapPin,
  Calendar,
  Star,
  TrendingUp,
  Brain,
  Target
} from 'lucide-react'

interface EnhancedFooterProps {
  onNewsletterSubscribe?: (email: string) => void
  onSocialClick?: (platform: string) => void
}

const sanskritQuotes = [
  {
    text: "विद्या ददाति विनयं विनयाद् याति पात्रताम्",
    translation: "Knowledge gives humility; humility, worthiness; worthiness, wealth; wealth, virtue; virtue, happiness.",
    transliteration: "Vidyā dadāti vinayaṁ vinayād yāti pātratām",
    source: "Taittiriya Upanishad"
  },
  {
    text: "सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः",
    translation: "May all beings be happy and free from illness. May all see what is auspicious.",
    transliteration: "Sarve bhavantu sukhinaḥ sarve santu nirāmayāḥ",
    source: "Brihadaranyaka Upanishad"
  },
  {
    text: "अहं ब्रह्मास्मि",
    translation: "I am Brahman. I am the ultimate reality.",
    transliteration: "Ahaṁ brahmāsmi",
    source: "Brihadaranyaka Upanishad"
  },
  {
    text: "सत्यमेव जयते",
    translation: "Truth alone triumphs.",
    transliteration: "Satyameva jayate",
    source: "Mundaka Upanishad"
  },
  {
    text: "वसुधैव कुटुम्बकम्",
    translation: "The world is one family.",
    transliteration: "Vasudhaiva kuṭumbakam",
    source: "Maha Upanishad"
  }
]

const footerLinks = {
  courses: [
    { name: 'Leadership & Business', href: '/courses/leadership' },
    { name: 'Emotional Intelligence', href: '/courses/emotional-intelligence' },
    { name: 'Spiritual Growth', href: '/courses/spiritual-growth' },
    { name: 'All Courses', href: '/courses' }
  ],
  resources: [
    { name: 'Blog', href: '/blog' },
    { name: 'Podcast', href: '/podcast' },
    { name: 'Free Resources', href: '/resources' },
    { name: 'Glossary', href: '/glossary' }
  ],
  community: [
    { name: 'Telegram Community', href: '/community/telegram' },
    { name: 'Events', href: '/events' },
    { name: 'Success Stories', href: '/stories' },
    { name: 'Mentorship', href: '/mentorship' }
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Mission', href: '/mission' },
    { name: 'Meet the Team', href: '/team' },
    { name: 'Careers', href: '/careers' }
  ],
  support: [
    { name: 'Help Center', href: '/help' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' }
  ]
}

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/shikshanam', color: 'hover:text-pink-500' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/shikshanam', color: 'hover:text-blue-400' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/shikshanam', color: 'hover:text-red-500' },
  { name: 'Telegram', icon: MessageCircle, href: 'https://t.me/shikshanam', color: 'hover:text-blue-500' }
]

// Sanskrit Quote Strip Component
const SanskritQuoteStrip = () => {
  const [currentQuote, setCurrentQuote] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % sanskritQuotes.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gradient-to-r from-saffron-500 to-deep-teal-500 text-white py-8">
      <div className="container-custom">
        <motion.div
          key={currentQuote}
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="text-2xl md:text-3xl font-devanagari mb-2">
            {sanskritQuotes[currentQuote].text}
          </div>
          <div className="text-lg text-soft-gold-200 mb-1">
            {sanskritQuotes[currentQuote].transliteration}
          </div>
          <div className="text-sm text-white/90 max-w-2xl mx-auto">
            {sanskritQuotes[currentQuote].translation}
          </div>
          <div className="text-xs text-white/70 mt-2">
            — {sanskritQuotes[currentQuote].source}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Newsletter Subscription Component
const NewsletterSubscription = ({ onSubscribe }: { onSubscribe?: (email: string) => void }) => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      onSubscribe?.(email)
      setEmail('')
    }
  }

  return (
    <div className="bg-gradient-to-r from-saffron-100 to-deep-teal-100 dark:from-saffron-900/30 dark:to-deep-teal-900/30 rounded-2xl p-6">
      <div className="flex items-center space-x-3 mb-4">
        <Mail className="w-6 h-6 text-saffron-600 dark:text-saffron-400" />
        <h3 className="text-lg font-display text-indigo-700 dark:text-soft-gold-500">
          Stay Connected
        </h3>
      </div>
      
      {!isSubscribed ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-lg border border-wisdom-200 dark:border-wisdom-700 bg-white dark:bg-wisdom-800 text-wisdom-900 dark:text-wisdom-100 placeholder-wisdom-500 dark:placeholder-wisdom-400 focus:outline-none focus:ring-2 focus:ring-saffron-500 dark:focus:ring-saffron-400"
            required
          />
          <motion.button
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-saffron-500 to-deep-teal-500 text-white py-2 rounded-lg font-medium flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300"
          >
            <span>Subscribe</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </form>
      ) : (
        <div className="text-center">
          <Heart className="w-8 h-8 text-peacock-green-500 dark:text-peacock-green-400 mx-auto mb-2" />
          <p className="text-sm text-wisdom-600 dark:text-wisdom-400">
            Thank you for subscribing!
          </p>
        </div>
      )}
    </div>
  )
}

export default function EnhancedFooter({ onNewsletterSubscribe, onSocialClick }: EnhancedFooterProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <footer className="bg-wisdom-50 dark:bg-wisdom-900 border-t border-wisdom-200 dark:border-wisdom-700">
      {/* Sanskrit Quote Strip */}
      <SanskritQuoteStrip />
      
      <div className="container-custom py-16">
        <div className="grid lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-saffron-500 to-deep-teal-500 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-display text-indigo-700 dark:text-soft-gold-500">
                  Shikshanam
                </span>
              </div>
              
              <p className="text-wisdom-600 dark:text-wisdom-400 mb-6 leading-relaxed">
                Transforming lives through ancient Indian wisdom. Learn practical skills for modern success 
                with courses in leadership, emotional intelligence, and spiritual growth.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4 mb-6">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => onSocialClick?.(social.name)}
                    whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                    className={`w-10 h-10 bg-white dark:bg-wisdom-800 rounded-lg flex items-center justify-center text-wisdom-600 dark:text-wisdom-400 hover:shadow-lg transition-all duration-300 ${social.color}`}
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
              
              {/* Newsletter Subscription */}
              <NewsletterSubscription onSubscribe={onNewsletterSubscribe} />
            </motion.div>
          </div>
          
          {/* Links Sections */}
          <div className="lg:col-span-4 grid md:grid-cols-4 gap-8">
            {/* Courses */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-display text-indigo-700 dark:text-soft-gold-500 mb-4">
                Courses
              </h3>
              <ul className="space-y-3">
                {footerLinks.courses.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-wisdom-600 dark:text-wisdom-400 hover:text-saffron-600 dark:hover:text-saffron-400 transition-colors duration-300 flex items-center space-x-2"
                    >
                      <span>{link.name}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            {/* Resources */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-display text-indigo-700 dark:text-soft-gold-500 mb-4">
                Resources
              </h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-wisdom-600 dark:text-wisdom-400 hover:text-saffron-600 dark:hover:text-saffron-400 transition-colors duration-300 flex items-center space-x-2"
                    >
                      <span>{link.name}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            {/* Community */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-display text-indigo-700 dark:text-soft-gold-500 mb-4">
                Community
              </h3>
              <ul className="space-y-3">
                {footerLinks.community.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-wisdom-600 dark:text-wisdom-400 hover:text-saffron-600 dark:hover:text-saffron-400 transition-colors duration-300 flex items-center space-x-2"
                    >
                      <span>{link.name}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            {/* Support */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-display text-indigo-700 dark:text-soft-gold-500 mb-4">
                Support
              </h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-wisdom-600 dark:text-wisdom-400 hover:text-saffron-600 dark:hover:text-saffron-400 transition-colors duration-300 flex items-center space-x-2"
                    >
                      <span>{link.name}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-wisdom-200 dark:border-wisdom-700 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-wisdom-600 dark:text-wisdom-400 text-sm">
              © 2024 Shikshanam. All rights reserved. Made with{' '}
              <Heart className="w-4 h-4 inline text-saffron-500" /> in India.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-wisdom-600 dark:text-wisdom-400">
              <a href="/privacy" className="hover:text-saffron-600 dark:hover:text-saffron-400 transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-saffron-600 dark:hover:text-saffron-400 transition-colors">
                Terms of Service
              </a>
              <a href="/cookies" className="hover:text-saffron-600 dark:hover:text-saffron-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
