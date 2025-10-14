import { 
  BookOpen, 
  GraduationCap, 
  Video, 
  Users, 
  Lightbulb, 
  UserCheck, 
  Info, 
  HelpCircle,
  FileText,
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
      href: '/courses/sanskrit-bhasha-pragya',
      thumbnail: '/images/sanskrit-course-thumb.jpg',
      badge: 'Popular'
    },
    columns: [
      {
        title: 'All Courses',
        links: [
          { name: 'All Courses', href: '/courses', icon: BookOpen, description: 'Browse complete course catalog' },
          { name: 'Sanskrit Bhasha Pragya', href: '/courses/sanskrit-bhasha-pragya', icon: BookOpen, description: 'Comprehensive Sanskrit course' },
          { name: 'Yoga Darshan', href: '/courses/yoga-darshan-course', icon: BookOpen, description: 'Philosophy of Yoga' },
          { name: 'Isha Upanishad', href: '/courses/isha-upanishad-course', icon: Lightbulb, description: 'Ancient wisdom teachings' },
          { name: 'Prashna Upanishad', href: '/courses/prashna-upanishad', icon: FileText, description: 'Question-based learning' },
          { name: 'Chanakya Code', href: '/courses/chanakya-code', icon: Star, description: 'Ancient business wisdom' },
        ]
      },
      {
        title: 'Philosophy Courses',
        links: [
          { name: 'Advaita Vedanta', href: '/courses/advaita-vedanta', icon: Lightbulb, description: 'Non-dual philosophy' },
          { name: 'Kashmir Shaivism', href: '/courses/kashmir-shaivism', icon: Sparkles, description: 'Tantric philosophy' },
          { name: 'Durgasaptashi', href: '/courses/durgasaptashi', icon: BookOpen, description: 'Sacred recitation course' },
          { name: 'Emotional Intelligence', href: '/courses/emotional-intelligence-with-samkhya-darshan', icon: UserCheck, description: 'Transform with Samkhya wisdom' },
        ]
      },
      {
        title: 'Learning Paths',
        links: [
          { name: 'View All Courses', href: '/courses', icon: BookOpen, description: 'Explore all learning paths' },
          { name: 'Course Packages', href: '/packages', icon: Package, description: 'Special course bundles' },
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
          { name: 'Sanskrit Blog', href: '/wisdom', icon: BookOpen, description: 'Sanskrit language insights' },
          { name: 'Philosophy Articles', href: '/wisdom', icon: Lightbulb, description: 'Deep philosophical discussions' },
          { name: 'Spiritual Guidance', href: '/wisdom', icon: Star, description: 'Spiritual teachings' },
        ]
      },
      {
        title: 'Learning Resources',
        links: [
          { name: 'Study Materials', href: '/help', icon: FileText, description: 'Educational resources' },
          { name: 'Reference Guides', href: '/glossaries/sanskrit', icon: BookMarked, description: 'Sanskrit glossary' },
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
