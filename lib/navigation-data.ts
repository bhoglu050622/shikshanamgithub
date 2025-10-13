/**
 * Navigation Data for Shikshanam
 * 
 * Note: Course links in this file are manually curated for the navigation menu.
 * All courses are dynamically discovered from /app/courses/ - see lib/courses
 * To add a new course to navigation, add it here after creating the course directory.
 * The /courses page will automatically show all courses.
 */

import { 
  BookOpen, 
  GraduationCap, 
  Video, 
  Users, 
  Lightbulb, 
  UserCheck, 
  Info, 
  HelpCircle,
  Play,
  FileText,
  Keyboard,
  BookMarked,
  MessageSquare,
  Star,
  ArrowRight,
  Package,
  Sparkles
} from 'lucide-react'

export interface NavigationLink {
  name: string
  href: string
  icon: any
  description: string
}

export interface NavigationColumn {
  title: string
  links: NavigationLink[]
}

export interface NavigationGroup {
  id: string
  title: string
  icon: any
  featured: {
    title: string
    description: string
    href: string
    thumbnail: string
    badge: string
  }
  columns: NavigationColumn[]
}

export const navigationGroups: NavigationGroup[] = [
  {
    id: 'courses',
    title: 'Courses',
    icon: GraduationCap,
    featured: {
      title: 'Sanskrit Bhasha Pragya',
      description: 'Master the ancient language of Sanskrit',
      href: '/courses/sanskrit-course',
      thumbnail: '/images/sanskrit-course-thumb.jpg',
      badge: 'Popular'
    },
    columns: [
      {
        title: 'All Courses',
        links: [
          { name: 'All Courses', href: '/courses', icon: BookOpen, description: 'Browse complete course catalog' },
          { name: 'Free Courses', href: '/courses', icon: Star, description: 'Access free learning content' },
          { name: 'Sanskrit Bhasha Pragya', href: '/courses/sanskrit-course', icon: BookOpen, description: 'Comprehensive Sanskrit course' },
          { name: 'Yoga Darshan', href: '/courses/yoga-darshan', icon: Play, description: 'Philosophy of Yoga' },
          { name: 'Isha Upanishad', href: '/courses/isha-upanishad', icon: Lightbulb, description: 'Ancient wisdom teachings' },
          { name: 'Prashna Upanishad', href: '/courses/prashna-upanishad', icon: FileText, description: 'Question-based learning' },
        ]
      },
      {
        title: 'Philosophy Courses',
        links: [
          { name: 'Advaita Vedanta', href: '/courses/advaita-vedanta-darshan-a-journey-through-drig-drishya-viveka', icon: Lightbulb, description: 'Non-dual philosophy' },
          { name: 'Nyaya Darshan', href: '/courses/nyaya-darshan', icon: FileText, description: 'Logic and reasoning' },
          { name: 'Vaisheshik Darshan', href: '/courses/vaisheshik-darshan', icon: Star, description: 'Atomistic philosophy' },
          { name: 'Kashmir Shaivism', href: '/courses/kashmir-shaivism', icon: Sparkles, description: 'Tantric philosophy' },
          { name: 'Tantra Darshan', href: '/courses/tantra-darshan', icon: Play, description: 'Esoteric teachings' },
        ]
      },
      {
        title: 'Specialized Learning',
        links: [
          { name: 'Sanskrit Live Class', href: '/courses/sanskrit-live-class', icon: Video, description: 'Interactive live sessions' },
          { name: 'Emotional Intelligence', href: '/courses/emotional-intelligence-with-samkhya-darshan', icon: UserCheck, description: 'Wisdom for modern life' },
          { name: 'Yoga Advanced', href: '/courses/yoga-advanced', icon: GraduationCap, description: 'Advanced yoga studies' },
          { name: 'Learning Packages', href: '/packages', icon: Package, description: 'Comprehensive bundles' },
        ]
      }
    ]
  },
  {
    id: 'practice',
    title: 'Practice',
    icon: Play,
    featured: {
      title: 'Learning Resources',
      description: 'Educational materials and study guides',
      href: '/help',
      thumbnail: '/images/learning-hub-thumb.jpg',
      badge: 'New'
    },
    columns: [
      {
        title: 'Study Resources',
        links: [
          { name: 'Study Materials', href: '/help', icon: BookOpen, description: 'Educational resources and guides' },
          { name: 'Learning Support', href: '/help', icon: FileText, description: 'Get help with your studies' },
        ]
      },
      {
        title: 'Reference',
        links: [
          { name: 'Grammar Guide', href: '/help', icon: FileText, description: 'Sanskrit grammar reference' },
          { name: 'Pronunciation Guide', href: '/help', icon: Play, description: 'Audio pronunciation help' },
        ]
      },
      {
        title: 'Tools',
        links: [
          { name: 'All Tools', href: '/tools', icon: Keyboard, description: 'Complete toolkit for Sanskrit' },
          { name: 'Practice Tests', href: '/practice/sanskrit', icon: FileText, description: 'Test your knowledge' },
        ]
      }
    ]
  },
  {
    id: 'wisdom',
    title: 'Wisdom',
    icon: Lightbulb,
    featured: {
      title: 'Ancient Wisdom for Modern Life',
      description: 'Explore timeless teachings and insights',
      href: '/wisdom',
      thumbnail: '/images/wisdom-thumb.jpg',
      badge: 'Featured'
    },
    columns: [
      {
        title: 'Wisdom Content',
        links: [
          { name: 'Wisdom', href: '/wisdom', icon: Lightbulb, description: 'Articles & insights' },
          { name: 'English Articles', href: '/wisdom', icon: FileText, description: 'Wisdom in English' },
          { name: 'Hindi Articles', href: '/wisdom', icon: BookOpen, description: 'Wisdom in Hindi' },
          { name: 'Blog', href: '/blog', icon: MessageSquare, description: 'Latest blog posts' },
        ]
      },
      {
        title: 'Knowledge Sources',
        links: [
          { name: 'Sanskrit Blog', href: '/blogs/sanskrit', icon: BookOpen, description: 'Sanskrit language insights' },
          { name: 'Philosophy Articles', href: '/wisdom', icon: Lightbulb, description: 'Deep philosophical discussions' },
          { name: 'Spiritual Guidance', href: '/wisdom', icon: Star, description: 'Spiritual teachings' },
        ]
      },
      {
        title: 'Learning Resources',
        links: [
          { name: 'Study Materials', href: '/help', icon: FileText, description: 'Educational resources' },
          { name: 'Support Center', href: '/help', icon: BookMarked, description: 'Get help and support' },
        ]
      }
    ]
  },
  {
    id: 'support',
    title: 'Support',
    icon: HelpCircle,
    featured: {
      title: 'Get Help & Support',
      description: 'We\'re here to help you succeed',
      href: '/help',
      thumbnail: '/images/support-thumb.jpg',
      badge: '24/7'
    },
    columns: [
      {
        title: 'Help & Support',
        links: [
          { name: 'Help Center', href: '/help', icon: HelpCircle, description: 'Find answers to common questions' },
          { name: 'Contact Us', href: '/contact', icon: MessageSquare, description: 'Get in touch with our team' },
          { name: 'Technical Support', href: '/help', icon: Info, description: 'Technical assistance' },
        ]
      },
      {
        title: 'About Shikshanam',
        links: [
          { name: 'About Us', href: '/about', icon: Info, description: 'Our mission and vision' },
          { name: 'Career', href: '/career', icon: Users, description: 'Join our team' },
          { name: 'Our Story', href: '/about', icon: BookOpen, description: 'How we started' },
          { name: 'Team', href: '/gurus', icon: Users, description: 'Meet our team' },
        ]
      },
      {
        title: 'Resources',
        links: [
          { name: 'FAQs', href: '/help', icon: HelpCircle, description: 'Frequently asked questions' },
          { name: 'Learning Guide', href: '/help', icon: BookOpen, description: 'How to get started' },
          { name: 'Feedback', href: '/contact', icon: MessageSquare, description: 'Share your thoughts' },
          { name: 'Accessibility', href: '/accessibility', icon: Info, description: 'Accessibility information' },
        ]
      }
    ]
  }
]

// Top-level navigation items for header - Based on crawled website navigation
export const topLevelNavItems = [
  { name: 'Home', href: '/', icon: BookOpen, hasDropdown: false },
  { name: 'Personality Test', href: '/personality-test', icon: UserCheck, hasDropdown: false },
  { name: 'Courses', href: '/courses', icon: GraduationCap, hasDropdown: true, groupId: 'courses' },
  { name: 'Packages', href: '/packages', icon: Package, hasDropdown: false },
  { name: 'Wisdom', href: '/wisdom', icon: Lightbulb, hasDropdown: true, groupId: 'wisdom' },
  { name: 'About Us', href: '/about', icon: Info, hasDropdown: false },
  { name: 'Contact', href: '/contact', icon: MessageSquare, hasDropdown: false },
]
