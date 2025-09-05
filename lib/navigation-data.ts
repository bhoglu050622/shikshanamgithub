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
  ArrowRight
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
      title: 'Start Sanskrit in 7 Days',
      description: 'Begin your journey with our foundational course',
      href: '/schools/sanskrit',
      thumbnail: '/images/sanskrit-course-thumb.jpg',
      badge: 'Popular'
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
          { name: 'Live Classes', href: '#live-classes', icon: Video, description: 'Interactive sessions with gurus' },
          { name: 'Self-Paced Courses', href: '#courses', icon: BookOpen, description: 'Learn at your own pace' },
          { name: 'Beginner Path', href: '/schools/sanskrit', icon: Play, description: 'Start your Sanskrit journey' },
          { name: 'Advanced Studies', href: '/schools/darshana', icon: GraduationCap, description: 'Deep philosophical exploration' },
        ]
      },
      {
        title: 'Quick Access',
        links: [
          { name: 'All Schools', href: '/schools', icon: GraduationCap, description: 'Browse all learning areas' },
          { name: 'Course Catalog', href: '#catalog', icon: BookMarked, description: 'Complete course listing' },
          { name: 'Learning Resources', href: '#resources', icon: FileText, description: 'Study materials & guides' },
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
          { name: 'Grammar Guide', href: '#grammar', icon: FileText, description: 'Sanskrit grammar reference' },
          { name: 'Pronunciation Guide', href: '#pronunciation', icon: Play, description: 'Audio pronunciation help' },
        ]
      },
      {
        title: 'Tools',
        links: [
          { name: 'All Tools', href: '#tools', icon: Keyboard, description: 'Complete toolkit for Sanskrit' },
          { name: 'Practice Tests', href: '#tests', icon: FileText, description: 'Test your knowledge' },
          { name: 'Progress Tracker', href: '#progress', icon: Star, description: 'Track your learning journey' },
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
          { name: 'All Gurus', href: '#gurus', icon: Users, description: 'Meet all our teachers' },
        ]
      },
      {
        title: 'Knowledge Hub',
        links: [
          { name: 'Sanskrit Blog', href: '/blogs/sanskrit', icon: FileText, description: 'Articles & insights' },
          { name: 'Student Stories', href: '#stories', icon: MessageSquare, description: 'Success stories & testimonials' },
          { name: 'Community Forum', href: '#forum', icon: Users, description: 'Connect with fellow learners' },
        ]
      },
      {
        title: 'Events',
        links: [
          { name: 'Live Sessions', href: '#live-sessions', icon: Video, description: 'Upcoming live classes' },
          { name: 'Workshops', href: '#workshops', icon: Lightbulb, description: 'Special learning events' },
          { name: 'Study Groups', href: '#study-groups', icon: Users, description: 'Join study communities' },
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
      href: '#support',
      thumbnail: '/images/support-thumb.jpg',
      badge: '24/7'
    },
    columns: [
      {
        title: 'Help & Support',
        links: [
          { name: 'Help Center', href: '#help', icon: HelpCircle, description: 'Find answers to common questions' },
          { name: 'Contact Us', href: '#contact', icon: MessageSquare, description: 'Get in touch with our team' },
          { name: 'Technical Support', href: '#tech-support', icon: Info, description: 'Technical assistance' },
        ]
      },
      {
        title: 'About Shikshanam',
        links: [
          { name: 'About Us', href: '#about', icon: Info, description: 'Our mission and vision' },
          { name: 'Our Story', href: '#story', icon: BookOpen, description: 'How we started' },
          { name: 'Team', href: '#team', icon: Users, description: 'Meet our team' },
        ]
      },
      {
        title: 'Resources',
        links: [
          { name: 'FAQs', href: '#faqs', icon: HelpCircle, description: 'Frequently asked questions' },
          { name: 'Learning Guide', href: '#guide', icon: BookOpen, description: 'How to get started' },
          { name: 'Feedback', href: '#feedback', icon: MessageSquare, description: 'Share your thoughts' },
        ]
      }
    ]
  }
]

// Top-level navigation items for header
export const topLevelNavItems = [
  { name: 'Learn', href: '#learn', icon: BookOpen, hasDropdown: true, groupId: 'learn' },
  { name: 'Practice', href: '#practice', icon: Play, hasDropdown: true, groupId: 'practice' },
  { name: 'Community', href: '#community', icon: Users, hasDropdown: true, groupId: 'community' },
  { name: 'Support', href: '#support', icon: HelpCircle, hasDropdown: true, groupId: 'support' },
]
