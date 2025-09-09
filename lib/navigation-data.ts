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
    id: 'learn',
    title: 'Learn',
    icon: BookOpen,
    featured: {
      title: 'Dharma Path',
      description: 'Begin your sacred journey of self-discovery',
      href: '/dharma-path',
      thumbnail: '/images/dharma-path-thumb.jpg',
      badge: 'New'
    },
    columns: [
      {
        title: 'Schools',
        links: [
          { name: 'School of Sanskrit', href: '/schools/sanskrit', icon: BookOpen, description: 'Master the ancient language' },
          { name: 'School of Darshanas', href: '/schools/darshana', icon: Lightbulb, description: 'Explore Indian philosophy' },
          { name: 'School of Self-help', href: '/schools/self-help', icon: Users, description: 'Ancient wisdom for modern living' },
        ]
      },
      {
        title: 'Learning Paths',
        links: [
          { name: 'Dharma Path', href: '/dharma-path', icon: Sparkles, description: 'Sacred journey of self-discovery' },
          { name: 'Guṇa Profiler', href: '/guna-profiler', icon: Star, description: 'Discover your Vedic personality type' },
          { name: 'Learning Packages', href: '/packages', icon: Package, description: 'Comprehensive course bundles' },
          { name: 'Live Classes', href: '/courses/sanskrit-live-class', icon: Video, description: 'Interactive sessions with gurus' },
          { name: 'Self-Paced Courses', href: '/courses', icon: BookOpen, description: 'Learn at your own pace' },
          { name: 'Beginner Path', href: '/schools/sanskrit', icon: Play, description: 'Start your Sanskrit journey' },
          { name: 'Advanced Studies', href: '/schools/darshana', icon: GraduationCap, description: 'Deep philosophical exploration' },
        ]
      },
      {
        title: 'Quick Access',
        links: [
          { name: 'All Schools', href: '/schools', icon: GraduationCap, description: 'Browse all learning areas' },
          { name: 'Learning Packages', href: '/packages', icon: Package, description: 'Comprehensive course bundles' },
          { name: 'Course Catalog', href: '/courses', icon: BookMarked, description: 'Complete course listing' },
          { name: 'Learning Resources', href: '/help', icon: FileText, description: 'Study materials & guides' },
        ]
      }
    ]
  },
  {
    id: 'practice',
    title: 'Practice',
    icon: Play,
    featured: {
      title: 'Sanskrit Practice Hub',
      description: 'Interactive exercises and tools for mastery',
      href: '/practice/sanskrit',
      thumbnail: '/images/practice-hub-thumb.jpg',
      badge: 'New'
    },
    columns: [
      {
        title: 'Practice Areas',
        links: [
          { name: 'Sanskrit Practice', href: '/practice/sanskrit', icon: BookOpen, description: 'Grammar & conversation exercises' },
          { name: 'Sandhi Tool', href: '/tools/sandhi', icon: FileText, description: 'Master Sanskrit sound combinations' },
          { name: 'Keyboard Helper', href: '/tools/keyboard', icon: Keyboard, description: 'Type in Devanagari script' },
        ]
      },
      {
        title: 'Reference',
        links: [
          { name: 'Sanskrit Glossary', href: '/glossaries/sanskrit', icon: BookMarked, description: 'Comprehensive word dictionary' },
          { name: 'Grammar Guide', href: '/help', icon: FileText, description: 'Sanskrit grammar reference' },
          { name: 'Pronunciation Guide', href: '/help', icon: Play, description: 'Audio pronunciation help' },
        ]
      },
      {
        title: 'Tools',
        links: [
          { name: 'All Tools', href: '/tools', icon: Keyboard, description: 'Complete toolkit for Sanskrit' },
          { name: 'Practice Tests', href: '/practice/sanskrit', icon: FileText, description: 'Test your knowledge' },
          { name: 'Progress Tracker', href: '/dashboard', icon: Star, description: 'Track your learning journey' },
        ]
      }
    ]
  },
  {
    id: 'community',
    title: 'Community',
    icon: Users,
    featured: {
      title: 'Meet Our Gurus',
      description: 'Learn from experienced Sanskrit scholars',
      href: '/gurus',
      thumbnail: '/images/gurus-thumb.jpg',
      badge: 'Featured'
    },
    columns: [
      {
        title: 'Gurus & Teachers',
        links: [
          { name: 'Meera Patel', href: '/gurus/meera-patel', icon: UserCheck, description: 'Sanskrit Grammar Expert' },
          { name: 'Priya Sharma', href: '/gurus/priya-sharma', icon: UserCheck, description: 'Vedanta Philosophy' },
          { name: 'Rajesh Kumar', href: '/gurus/rajesh-kumar', icon: UserCheck, description: 'Classical Literature' },
          { name: 'All Gurus', href: '/gurus', icon: Users, description: 'Meet all our teachers' },
        ]
      },
      {
        title: 'Knowledge Hub',
        links: [
          { name: 'Wisdom', href: '/wisdom', icon: Lightbulb, description: 'Articles & insights' },
          { name: 'Student Stories', href: '/about', icon: MessageSquare, description: 'Success stories & testimonials' },
          { name: 'Community Forum', href: '/contact', icon: Users, description: 'Connect with fellow learners' },
        ]
      },
      {
        title: 'Events',
        links: [
          { name: 'Live Sessions', href: '/courses/sanskrit-live-class', icon: Video, description: 'Upcoming live classes' },
          { name: 'Workshops', href: '/courses', icon: Lightbulb, description: 'Special learning events' },
          { name: 'Study Groups', href: '/contact', icon: Users, description: 'Join study communities' },
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
        ]
      }
    ]
  }
]

// Top-level navigation items for header
export const topLevelNavItems = [
  { name: 'Learn', href: '/courses', icon: BookOpen, hasDropdown: true, groupId: 'learn' },
  { name: 'Packages', href: '/packages', icon: Package, hasDropdown: false },
  { name: 'Practice', href: '/practice/sanskrit', icon: Play, hasDropdown: true, groupId: 'practice' },
  { name: 'Community', href: '/gurus', icon: Users, hasDropdown: true, groupId: 'community' },
  { name: 'Support', href: '/help', icon: HelpCircle, hasDropdown: true, groupId: 'support' },
]
