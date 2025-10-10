'use client'

import { useState } from 'react'
import { 
  BookOpen, 
  ArrowRight,
  Video,
  FileText,
  CheckCircle,
  Crown,
  Sparkles,
  Brain,
  Languages,
  GraduationCap,
  Star,
  Users,
  Clock,
  IndianRupee,
  TrendingUp,
  Award,
  Zap,
  Heart,
  Shield,
  Globe,
  Target,
  Lightbulb,
  BookMarked,
  Trophy,
  Diamond,
  ChevronDown,
  Package,
  ChevronUp,
  Play,
  Download,
  Headphones,
  MessageCircle,
  Calendar,
  User,
  ExternalLink,
  Plus,
  Minus
} from 'lucide-react'
import HydrationSafeMotion from '@/components/motion/HydrationSafeMotion'
import Button from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import RobustImage from '@/components/optimization/RobustImage'

// Package detail data structure
interface PackageDetail {
  id: string
  title: string
  subtitle: string
  description: string
  longDescription: string
  originalPrice: string
  currentPrice: string
  savings: string
  duration: string
  level: string
  category: 'sanskrit' | 'philosophy' | 'complete' | 'special'
  isPopular: boolean
  isFeatured: boolean
  rating: number
  students: number
  status: 'available' | 'upcoming' | 'limited'
  ctaText: string
  ctaLink: string
  heroImage: string
  instructor: {
    name: string
    title: string
    bio: string
    image: string
    credentials: string[]
  }
  features: string[]
  includes: string[]
  curriculum: {
    module: string
    topics: string[]
    duration: string
  }[]
  benefits: string[]
  testimonials: {
    name: string
    role: string
    content: string
    rating: number
  }[]
  faq: {
    question: string
    answer: string
  }[]
  trustSignals: string[]
}

// Package data with full details
const packageDetails: Record<string, PackageDetail> = {
  'sanskrit-basics-to-conversation': {
    id: 'sanskrit-basics-to-conversation',
    title: 'Sanskrit Package: Learn Sanskrit from Basics to Conversation',
    subtitle: 'Complete Sanskrit Foundation Course',
    description: 'Master Sanskrit from absolute basics to conversational level. This comprehensive package includes grammar, vocabulary, pronunciation, and practical conversation skills.',
    longDescription: 'This comprehensive Sanskrit package takes you from absolute beginner to conversational level. You will learn grammar fundamentals, build vocabulary, practice pronunciation, and develop practical conversation skills. Perfect for those who want to master the ancient language of Sanskrit.',
    originalPrice: '₹4,999',
    currentPrice: '₹2,898',
    savings: '₹2,101 (42% OFF)',
    duration: '12-15 weeks',
    level: 'Beginner',
    category: 'sanskrit',
    isPopular: true,
    isFeatured: true,
    rating: 4.9,
    students: 1250,
    status: 'available',
    ctaText: 'Enroll Now',
    ctaLink: 'https://shikshanam.in/package-of-%e0%a4%b8%e0%a4%82%e0%a4%b8%e0%a5%8d%e0%a4%95%e0%a5%83%e0%a4%a4/',
    heroImage: 'https://d502jbuhuh9wk.cloudfront.net/courses/6759989835c08b56e7365f1d/6759989835c08b56e7365f1d_scaled_cover.jpg?v=1',
    instructor: {
      name: 'Vishal Chaurasia',
      title: 'Sanskrit Scholar & Language Expert',
      bio: 'Vishal Chaurasia is a renowned Sanskrit scholar with deep expertise in classical Sanskrit literature and modern language teaching methods.',
      image: 'https://shikshanam.in/wp-content/uploads/2024/07/Vishal-Chaurasia.jpg',
      credentials: ['IIT Patna Graduate', 'Sanskrit Scholar', 'Language Expert', '10+ Years Teaching Experience']
    },
    features: ['Grammar Fundamentals', 'Vocabulary Building', 'Conversation Practice', 'Cultural Context', 'Audio Lessons', 'Writing Exercises'],
    includes: ['Video Lessons', 'Audio Files', 'PDF Materials', 'Live Q&A Sessions', 'Certificate of Completion', 'Lifetime Access'],
    curriculum: [
      {
        module: 'Sanskrit Basics',
        topics: ['Alphabet & Pronunciation', 'Basic Grammar', 'Simple Sentences', 'Vocabulary Building'],
        duration: '4-5 weeks'
      },
      {
        module: 'Intermediate Sanskrit',
        topics: ['Complex Grammar', 'Reading Practice', 'Writing Skills', 'Cultural Context'],
        duration: '4-5 weeks'
      },
      {
        module: 'Conversational Sanskrit',
        topics: ['Speaking Practice', 'Dialogue Exercises', 'Real-world Usage', 'Advanced Vocabulary'],
        duration: '4-5 weeks'
      }
    ],
    benefits: [
      'Master Sanskrit from absolute basics to conversational level',
      'Develop proper pronunciation and accent',
      'Build strong vocabulary and grammar foundation',
      'Practice speaking and writing in Sanskrit',
      'Understand cultural context and traditions',
      'Get lifetime access to all materials'
    ],
    testimonials: [
      {
        name: 'Priya Sharma',
        role: 'Student',
        content: 'This course transformed my understanding of Sanskrit. The step-by-step approach made learning so much easier.',
        rating: 5
      }
    ],
    faq: [
      {
        question: 'Is this suitable for complete beginners?',
        answer: 'Yes, this course is designed for absolute beginners with no prior Sanskrit knowledge.'
      }
    ],
    trustSignals: ['Lifetime Access', 'Certificate of Completion']
  },
  'sanskrit-philosophies-bundle': {
    id: 'sanskrit-philosophies-bundle',
    title: 'Sanskrit Language + Hindu Philosophies Course Bundle',
    subtitle: 'Language and Wisdom Combined',
    description: 'Master Sanskrit language while exploring Hindu philosophical systems. Perfect combination for those seeking both linguistic and philosophical mastery.',
    longDescription: 'This unique bundle combines Sanskrit language learning with deep exploration of Hindu philosophical systems. You will master the ancient language while understanding the profound wisdom of Indian philosophy.',
    originalPrice: '₹6,499',
    currentPrice: '₹3,999',
    savings: '₹2,500 (38% OFF)',
    duration: '12-15 weeks',
    level: 'Beginner',
    category: 'sanskrit',
    isPopular: false,
    isFeatured: false,
    rating: 4.7,
    students: 920,
    status: 'available',
    ctaText: 'Master Language & Philosophy',
    ctaLink: 'https://courses.shikshanam.in/courses/All-Course-Bundle-65a12c60e4b05ac7edb4876c',
    heroImage: 'https://d502jbuhuh9wk.cloudfront.net/courses/65a12c60e4b05ac7edb4876c/65a12c60e4b05ac7edb4876c_scaled_cover.jpg?v=10',
    instructor: {
      name: 'Vishal Chaurasia',
      title: 'Sanskrit & Philosophy Expert',
      bio: 'Vishal Chaurasia combines deep Sanskrit scholarship with profound understanding of Hindu philosophical systems.',
      image: 'https://shikshanam.in/wp-content/uploads/2024/07/Vishal-Chaurasia.jpg',
      credentials: ['IIT Patna Graduate', 'Sanskrit Scholar', 'Philosophy Expert', '10+ Years Teaching Experience']
    },
    features: ['Sanskrit Grammar', 'Vocabulary Building', 'Philosophical Systems', 'Text Reading', 'Cultural Understanding'],
    includes: ['Language Lessons', 'Philosophy Study', 'Reading Materials', 'Practice Exercises', 'Cultural Context'],
    curriculum: [
      {
        module: 'Sanskrit Language Foundation',
        topics: ['Grammar Basics', 'Vocabulary', 'Reading Skills', 'Writing Practice'],
        duration: '6-8 weeks'
      },
      {
        module: 'Philosophical Systems',
        topics: ['Six Darshanas', 'Vedanta', 'Samkhya', 'Yoga Philosophy'],
        duration: '6-7 weeks'
      }
    ],
    benefits: [
      'Master Sanskrit language fundamentals',
      'Understand Hindu philosophical systems',
      'Read original Sanskrit texts',
      'Develop cultural understanding'
    ],
    testimonials: [
      {
        name: 'Rajesh Kumar',
        role: 'Teacher',
        content: 'Perfect combination of language and philosophy. Highly recommended for serious students.',
        rating: 5
      }
    ],
    faq: [
      {
        question: 'What philosophical systems are covered?',
        answer: 'We cover all six orthodox schools of Hindu philosophy: Samkhya, Yoga, Nyaya, Vaisheshika, Mimamsa, and Vedanta.'
      }
    ],
    trustSignals: ['Lifetime Access', 'Certificate of Completion']
  },
  'sanskrit-darshan-upanishad-special': {
    id: 'sanskrit-darshan-upanishad-special',
    title: 'Sanskrit + Darshan + Upanishad: Hindu New Year Special Course Bundle',
    subtitle: 'Complete Traditional Learning Package',
    description: 'Special New Year bundle combining Sanskrit language, philosophical systems (Darshanas), and Upanishadic wisdom for comprehensive traditional education.',
    longDescription: 'This special New Year bundle offers the complete traditional education package. Learn Sanskrit language, explore philosophical systems, and dive deep into Upanishadic wisdom - all in one comprehensive course.',
    originalPrice: '₹7,999',
    currentPrice: '₹4,999',
    savings: '₹3,000 (37% OFF)',
    duration: '15-18 weeks',
    level: 'All Levels',
    category: 'sanskrit',
    isPopular: true,
    isFeatured: true,
    rating: 4.9,
    students: 1400,
    status: 'available',
    ctaText: 'Start Traditional Journey',
    ctaLink: 'https://courses.shikshanam.in/courses/Hindu-New-Year-Special-Package-All-Course-Bundle-66141e980049fe208aba2125',
    heroImage: 'https://d502jbuhuh9wk.cloudfront.net/courses/66141e980049fe208aba2125/66141e980049fe208aba2125_scaled_cover.jpg?v=5',
    instructor: {
      name: 'Vishal Chaurasia',
      title: 'Traditional Knowledge Expert',
      bio: 'Vishal Chaurasia is a master of traditional Indian knowledge systems, combining Sanskrit, philosophy, and spiritual wisdom.',
      image: 'https://shikshanam.in/wp-content/uploads/2024/07/Vishal-Chaurasia.jpg',
      credentials: ['IIT Patna Graduate', 'Sanskrit Scholar', 'Philosophy Expert', '10+ Years Teaching Experience']
    },
    features: ['Sanskrit Language', 'Philosophical Systems', 'Upanishadic Wisdom', 'Cultural Context', 'Traditional Methods'],
    includes: ['Language Training', 'Philosophy Study', 'Text Analysis', 'Cultural Insights', 'Traditional Practices'],
    curriculum: [
      {
        module: 'Sanskrit Language Mastery',
        topics: ['Advanced Grammar', 'Classical Texts', 'Poetry & Prose', 'Traditional Methods'],
        duration: '6-8 weeks'
      },
      {
        module: 'Philosophical Systems (Darshanas)',
        topics: ['Six Orthodox Schools', 'Comparative Study', 'Text Analysis', 'Practical Application'],
        duration: '6-7 weeks'
      },
      {
        module: 'Upanishadic Wisdom',
        topics: ['Major Upanishads', 'Spiritual Insights', 'Meditation Practices', 'Self-Realization'],
        duration: '3-3 weeks'
      }
    ],
    benefits: [
      'Master Sanskrit language and literature',
      'Understand all philosophical systems',
      'Dive deep into Upanishadic wisdom',
      'Learn traditional teaching methods',
      'Develop spiritual understanding'
    ],
    testimonials: [
      {
        name: 'Anita Patel',
        role: 'Spiritual Seeker',
        content: 'This bundle gave me everything I needed for my spiritual journey. The traditional approach is authentic and profound.',
        rating: 5
      }
    ],
    faq: [
      {
        question: 'What makes this special?',
        answer: 'This is a limited-time New Year special that combines three major areas of traditional Indian education at a discounted price.'
      }
    ],
    trustSignals: ['Lifetime Access', 'Special New Year Pricing']
  },
  'ultimate-sankhya-bundle': {
    id: 'ultimate-sankhya-bundle',
    title: 'Ultimate Bundle of Sāṅkhya Philosophy',
    subtitle: 'Complete Sāṅkhya Darshan Mastery',
    description: 'Deep dive into the ancient wisdom of Sāṅkhya philosophy. Understand the fundamental principles of creation, consciousness, and the path to liberation.',
    longDescription: 'Sāṅkhya is one of the six orthodox schools of Hindu philosophy and provides the theoretical foundation for Yoga. This comprehensive bundle covers all aspects of Sāṅkhya philosophy from basic concepts to advanced applications.',
    originalPrice: '₹3,999',
    currentPrice: '₹2,499',
    savings: '₹1,500 (37% OFF)',
    duration: '8-10 weeks',
    level: 'Advanced',
    category: 'philosophy',
    isPopular: true,
    isFeatured: false,
    rating: 4.8,
    students: 890,
    status: 'available',
    ctaText: 'Start Learning',
    ctaLink: 'https://courses.shikshanam.in/courses/Ultimate-Bundle-of-Sankhya-Philosophy-687b56fc55ab5b6dc3bb51de',
    heroImage: 'https://d502jbuhuh9wk.cloudfront.net/courses/687b56fc55ab5b6dc3bb51de/687b56fc55ab5b6dc3bb51de_scaled_cover.jpg?v=1',
    instructor: {
      name: 'Vishal Chaurasia',
      title: 'Philosophy Expert',
      bio: 'Vishal Chaurasia has deep expertise in Sāṅkhya philosophy and its practical applications in modern life.',
      image: 'https://shikshanam.in/wp-content/uploads/2024/07/Vishal-Chaurasia.jpg',
      credentials: ['IIT Patna Graduate', 'Philosophy Expert', 'Sāṅkhya Scholar', '10+ Years Teaching Experience']
    },
    features: ['Philosophical Foundations', 'Text Study', 'Practical Applications', 'Meditation Techniques', 'Q&A Sessions'],
    includes: ['Video Lectures', 'Reading Materials', 'Practice Exercises', 'Community Access', 'Certificate'],
    curriculum: [
      {
        module: 'Sāṅkhya Fundamentals',
        topics: ['Purusha & Prakriti', 'Gunas', 'Evolution Theory', 'Basic Principles'],
        duration: '3-4 weeks'
      },
      {
        module: 'Advanced Sāṅkhya',
        topics: ['Detailed Analysis', 'Text Study', 'Practical Applications', 'Liberation Path'],
        duration: '3-4 weeks'
      },
      {
        module: 'Sāṅkhya & Yoga',
        topics: ['Philosophical Foundation', 'Practical Yoga', 'Meditation', 'Self-Realization'],
        duration: '2-2 weeks'
      }
    ],
    benefits: [
      'Understand the fundamental principles of Sāṅkhya philosophy',
      'Learn about Purusha and Prakriti',
      'Master the concept of Gunas',
      'Apply Sāṅkhya principles in daily life',
      'Develop philosophical understanding'
    ],
    testimonials: [
      {
        name: 'Dr. Rajesh Singh',
        role: 'Philosophy Professor',
        content: 'Excellent coverage of Sāṅkhya philosophy. The practical applications make it very relevant for modern life.',
        rating: 5
      }
    ],
    faq: [
      {
        question: 'What is Sāṅkhya philosophy?',
        answer: 'Sāṅkhya is one of the six orthodox schools of Hindu philosophy that explains the nature of reality through the concepts of Purusha (consciousness) and Prakriti (matter).'
      }
    ],
    trustSignals: ['Lifetime Access', 'Certificate of Completion']
  },
  'vedanta-shaivism-bundle': {
    id: 'vedanta-shaivism-bundle',
    title: 'Vedanta aur Shaivism: Adhyayan aur Anubhuti',
    subtitle: 'Dual Path of Spiritual Wisdom',
    description: 'Explore the profound teachings of both Vedanta and Shaivism. Understand the non-dual nature of reality through these complementary philosophical traditions.',
    longDescription: 'This unique bundle combines the wisdom of Vedanta (non-dual philosophy) with Shaivism (devotional tradition). Learn how these two paths complement each other in the journey of self-realization.',
    originalPrice: '₹4,499',
    currentPrice: '₹2,999',
    savings: '₹1,500 (33% OFF)',
    duration: '10-12 weeks',
    level: 'Advanced',
    category: 'philosophy',
    isPopular: false,
    isFeatured: true,
    rating: 4.9,
    students: 650,
    status: 'available',
    ctaText: 'Explore Bundle',
    ctaLink: 'https://courses.shikshanam.in/single-checkout/678b5ab8789de93b7ee832bd?pid=p1',
    heroImage: 'https://d502jbuhuh9wk.cloudfront.net/courses/678b5ab8789de93b7ee832bd/678b5ab8789de93b7ee832bd_scaled_cover.jpg?v=2',
    instructor: {
      name: 'Vishal Chaurasia',
      title: 'Vedanta & Shaivism Expert',
      bio: 'Vishal Chaurasia has deep understanding of both Vedantic and Shaivite traditions, helping students see their complementary nature.',
      image: 'https://shikshanam.in/wp-content/uploads/2024/07/Vishal-Chaurasia.jpg',
      credentials: ['IIT Patna Graduate', 'Vedanta Scholar', 'Shaivism Expert', '10+ Years Teaching Experience']
    },
    features: ['Vedantic Philosophy', 'Shaivite Teachings', 'Comparative Study', 'Spiritual Practices', 'Text Analysis'],
    includes: ['Comprehensive Lectures', 'Sacred Texts', 'Meditation Guides', 'Discussion Forums', 'Expert Guidance'],
    curriculum: [
      {
        module: 'Vedantic Foundations',
        topics: ['Advaita Vedanta', 'Non-dual Reality', 'Self-Inquiry', 'Text Study'],
        duration: '5-6 weeks'
      },
      {
        module: 'Shaivite Wisdom',
        topics: ['Shaiva Philosophy', 'Devotional Practices', 'Tantric Elements', 'Spiritual Transformation'],
        duration: '5-6 weeks'
      }
    ],
    benefits: [
      'Understand non-dual philosophy of Vedanta',
      'Learn Shaivite devotional practices',
      'See the complementary nature of both traditions',
      'Develop practical spiritual understanding',
      'Apply wisdom in daily life'
    ],
    testimonials: [
      {
        name: 'Swami Ananda',
        role: 'Spiritual Teacher',
        content: 'This bundle beautifully combines the intellectual depth of Vedanta with the devotional heart of Shaivism.',
        rating: 5
      }
    ],
    faq: [
      {
        question: 'How do Vedanta and Shaivism complement each other?',
        answer: 'Vedanta provides the philosophical foundation of non-duality, while Shaivism offers the devotional and practical methods for realizing this truth.'
      }
    ],
    trustSignals: ['Lifetime Access', 'Certificate of Completion']
  },
  'samkhya-emotional-intelligence': {
    id: 'samkhya-emotional-intelligence',
    title: 'Samkhya Darshan + Emotional Intelligence Combo Course',
    subtitle: 'Ancient Wisdom Meets Modern Psychology',
    description: 'Combine the timeless wisdom of Samkhya philosophy with modern emotional intelligence principles for personal transformation and self-mastery.',
    longDescription: 'This innovative course bridges ancient Indian wisdom with modern psychology. Learn how Samkhya philosophy can enhance your emotional intelligence and lead to personal transformation.',
    originalPrice: '₹3,499',
    currentPrice: '₹2,199',
    savings: '₹1,300 (37% OFF)',
    duration: '8-10 weeks',
    level: 'Intermediate',
    category: 'philosophy',
    isPopular: false,
    isFeatured: false,
    rating: 4.7,
    students: 720,
    status: 'available',
    ctaText: 'Transform Yourself',
    ctaLink: 'https://courses.shikshanam.in/courses/Samkhya-Darshan--Emotional-Intelligence-Combo-Course-6868be22998a012a18cc0360',
    heroImage: 'https://d502jbuhuh9wk.cloudfront.net/courses/6868be22998a012a18cc0360/6868be22998a012a18cc0360_scaled_cover.jpg?v=4',
    instructor: {
      name: 'Vishal Chaurasia',
      title: 'Philosophy & Psychology Expert',
      bio: 'Vishal Chaurasia combines ancient philosophical wisdom with modern psychological insights for practical life transformation.',
      image: 'https://shikshanam.in/wp-content/uploads/2024/07/Vishal-Chaurasia.jpg',
      credentials: ['IIT Patna Graduate', 'Philosophy Expert', 'Psychology Scholar', '10+ Years Teaching Experience']
    },
    features: ['Samkhya Philosophy', 'Emotional Intelligence', 'Practical Applications', 'Self-Assessment Tools', 'Transformation Techniques'],
    includes: ['Video Lessons', 'Workbooks', 'Assessment Tools', 'Group Sessions', 'Personal Guidance'],
    curriculum: [
      {
        module: 'Samkhya Foundations',
        topics: ['Purusha & Prakriti', 'Gunas Theory', 'Mind & Emotions', 'Self-Understanding'],
        duration: '4-5 weeks'
      },
      {
        module: 'Emotional Intelligence',
        topics: ['Self-Awareness', 'Self-Regulation', 'Social Skills', 'Empathy Development'],
        duration: '4-5 weeks'
      }
    ],
    benefits: [
      'Understand the Samkhya view of mind and emotions',
      'Develop emotional intelligence skills',
      'Learn practical transformation techniques',
      'Apply ancient wisdom to modern challenges',
      'Achieve personal growth and self-mastery'
    ],
    testimonials: [
      {
        name: 'Dr. Priya Mehta',
        role: 'Psychologist',
        content: 'This course brilliantly connects ancient wisdom with modern psychology. Highly recommended for personal development.',
        rating: 5
      }
    ],
    faq: [
      {
        question: 'How does Samkhya philosophy relate to emotional intelligence?',
        answer: 'Samkhya provides a deep understanding of the nature of mind and emotions, which enhances our ability to develop emotional intelligence.'
      }
    ],
    trustSignals: ['Lifetime Access', 'Certificate of Completion']
  },
  'eradication-suffering-samkhya-yoga': {
    id: 'eradication-suffering-samkhya-yoga',
    title: 'Eradication of Suffering Package: Samkhya + Yoga',
    subtitle: 'Path to Liberation from Suffering',
    description: 'Learn the ancient techniques for understanding and transcending suffering through the combined wisdom of Samkhya philosophy and Yoga practices.',
    longDescription: 'This transformative package combines the theoretical understanding of Samkhya philosophy with practical Yoga techniques to help you understand, manage, and transcend suffering in your life.',
    originalPrice: '₹4,999',
    currentPrice: '₹2,999',
    savings: '₹2,000 (40% OFF)',
    duration: '10-12 weeks',
    level: 'Advanced',
    category: 'philosophy',
    isPopular: false,
    isFeatured: true,
    rating: 4.8,
    students: 950,
    status: 'available',
    ctaText: 'Begin Liberation Journey',
    ctaLink: 'https://courses.shikshanam.in/courses/Matters-meet-Mind--The-Metaphysics-of-Yoga-1686733423615-6489826fe4b046d958772a4a',
    heroImage: 'https://d502jbuhuh9wk.cloudfront.net/courses/6489826fe4b046d958772a4a/6489826fe4b046d958772a4a_scaled_cover.jpg?v=5',
    instructor: {
      name: 'Vishal Chaurasia',
      title: 'Liberation & Yoga Expert',
      bio: 'Vishal Chaurasia specializes in the practical application of Samkhya philosophy and Yoga for overcoming suffering and achieving liberation.',
      image: 'https://shikshanam.in/wp-content/uploads/2024/07/Vishal-Chaurasia.jpg',
      credentials: ['IIT Patna Graduate', 'Yoga Expert', 'Liberation Scholar', '10+ Years Teaching Experience']
    },
    features: ['Samkhya Philosophy', 'Yoga Practices', 'Suffering Analysis', 'Liberation Techniques', 'Practical Applications'],
    includes: ['Philosophical Study', 'Yoga Sessions', 'Meditation Practices', 'Personal Guidance', 'Transformation Tools'],
    curriculum: [
      {
        module: 'Understanding Suffering',
        topics: ['Nature of Suffering', 'Samkhya Analysis', 'Root Causes', 'Psychological Aspects'],
        duration: '4-5 weeks'
      },
      {
        module: 'Yoga for Liberation',
        topics: ['Asana Practice', 'Pranayama', 'Meditation', 'Self-Realization'],
        duration: '4-5 weeks'
      },
      {
        module: 'Integration & Practice',
        topics: ['Daily Practice', 'Life Application', 'Transformation', 'Liberation'],
        duration: '2-2 weeks'
      }
    ],
    benefits: [
      'Understand the nature and causes of suffering',
      'Learn practical techniques for managing suffering',
      'Develop a regular Yoga and meditation practice',
      'Apply philosophical insights to daily life',
      'Move towards liberation and freedom'
    ],
    testimonials: [
      {
        name: 'Sarah Johnson',
        role: 'Yoga Practitioner',
        content: 'This course changed my life. The combination of philosophy and practice is incredibly powerful for overcoming suffering.',
        rating: 5
      }
    ],
    faq: [
      {
        question: 'Do I need prior experience with Yoga or philosophy?',
        answer: 'No prior experience is necessary. The course is designed for beginners and includes all necessary foundations.'
      }
    ],
    trustSignals: ['Lifetime Access', 'Certificate of Completion']
  },
  'hindu-philosophies-upanishads': {
    id: 'hindu-philosophies-upanishads',
    title: 'Hindu Philosophies + Upanishads: Wisdom Package',
    subtitle: 'Complete Philosophical Foundation',
    description: 'Comprehensive study of Hindu philosophical systems (Darshanas) combined with Upanishadic wisdom for a complete understanding of Indian philosophy.',
    longDescription: 'This comprehensive package covers all six orthodox schools of Hindu philosophy along with the profound wisdom of the Upanishads. Perfect for those seeking a complete understanding of Indian philosophical traditions.',
    originalPrice: '₹5,999',
    currentPrice: '₹3,999',
    savings: '₹2,000 (33% OFF)',
    duration: '12-15 weeks',
    level: 'Advanced',
    category: 'philosophy',
    isPopular: false,
    isFeatured: true,
    rating: 4.8,
    students: 850,
    status: 'available',
    ctaText: 'Master Hindu Philosophy',
    ctaLink: 'https://courses.shikshanam.in/courses/Combo-Package-Hindu-Darshans--Upnishads-6620c94d738059528460072e',
    heroImage: 'https://d502jbuhuh9wk.cloudfront.net/courses/6620c94d738059528460072e/6620c94d738059528460072e_scaled_cover.jpg?v=2',
    instructor: {
      name: 'Vishal Chaurasia',
      title: 'Hindu Philosophy Expert',
      bio: 'Vishal Chaurasia has comprehensive knowledge of all Hindu philosophical systems and Upanishadic wisdom.',
      image: 'https://shikshanam.in/wp-content/uploads/2024/07/Vishal-Chaurasia.jpg',
      credentials: ['IIT Patna Graduate', 'Philosophy Expert', 'Upanishad Scholar', '10+ Years Teaching Experience']
    },
    features: ['Six Darshanas', 'Upanishadic Wisdom', 'Comparative Study', 'Philosophical Analysis', 'Practical Applications'],
    includes: ['Comprehensive Lectures', 'Text Study', 'Discussion Forums', 'Expert Guidance', 'Certificate'],
    curriculum: [
      {
        module: 'Six Orthodox Schools',
        topics: ['Samkhya', 'Yoga', 'Nyaya', 'Vaisheshika', 'Mimamsa', 'Vedanta'],
        duration: '8-10 weeks'
      },
      {
        module: 'Upanishadic Wisdom',
        topics: ['Major Upanishads', 'Spiritual Insights', 'Philosophical Teachings', 'Practical Applications'],
        duration: '4-5 weeks'
      }
    ],
    benefits: [
      'Master all six orthodox schools of Hindu philosophy',
      'Understand Upanishadic wisdom and teachings',
      'Develop comparative philosophical understanding',
      'Apply philosophical insights to daily life',
      'Build a strong foundation in Indian philosophy'
    ],
    testimonials: [
      {
        name: 'Prof. Rajesh Kumar',
        role: 'Philosophy Professor',
        content: 'This is the most comprehensive course on Hindu philosophy I have encountered. Excellent coverage of all major schools.',
        rating: 5
      }
    ],
    faq: [
      {
        question: 'What are the six orthodox schools?',
        answer: 'The six orthodox schools are: Samkhya, Yoga, Nyaya, Vaisheshika, Mimamsa, and Vedanta.'
      }
    ],
    trustSignals: ['Lifetime Access', 'Certificate of Completion']
  },
  'nyaya-vaisheshik-enlightenment': {
    id: 'nyaya-vaisheshik-enlightenment',
    title: 'Dual Path of Enlightenment Package: Nyaya + Vaisheshik',
    subtitle: 'Logic and Atomism for Spiritual Growth',
    description: 'Explore the logical foundations of Hindu philosophy through Nyaya (logic) and Vaisheshik (atomism) systems for enhanced reasoning and spiritual understanding.',
    longDescription: 'This unique package combines the logical rigor of Nyaya philosophy with the atomic theory of Vaisheshika. Learn how logical reasoning and scientific thinking can enhance your spiritual understanding.',
    originalPrice: '₹3,499',
    currentPrice: '₹2,299',
    savings: '₹1,200 (34% OFF)',
    duration: '8-10 weeks',
    level: 'Intermediate',
    category: 'philosophy',
    isPopular: false,
    isFeatured: false,
    rating: 4.6,
    students: 680,
    status: 'available',
    ctaText: 'Develop Logical Wisdom',
    ctaLink: 'https://courses.shikshanam.in/courses/Eradication-of-Suffering-64bfab06e4b06ed046925620',
    heroImage: 'https://d502jbuhuh9wk.cloudfront.net/courses/64bfab06e4b06ed046925620/64bfab06e4b06ed046925620_scaled_cover.jpg?v=4',
    instructor: {
      name: 'Vishal Chaurasia',
      title: 'Logic & Philosophy Expert',
      bio: 'Vishal Chaurasia specializes in the logical and scientific aspects of Hindu philosophy, particularly Nyaya and Vaisheshika systems.',
      image: 'https://shikshanam.in/wp-content/uploads/2024/07/Vishal-Chaurasia.jpg',
      credentials: ['IIT Patna Graduate', 'Logic Expert', 'Philosophy Scholar', '10+ Years Teaching Experience']
    },
    features: ['Nyaya Logic', 'Vaisheshik Atomism', 'Logical Reasoning', 'Debate Techniques', 'Spiritual Applications'],
    includes: ['Logic Training', 'Philosophical Texts', 'Practice Exercises', 'Debate Sessions', 'Reasoning Tools'],
    curriculum: [
      {
        module: 'Nyaya Logic',
        topics: ['Logical Reasoning', 'Debate Techniques', 'Valid Arguments', 'Fallacy Detection'],
        duration: '4-5 weeks'
      },
      {
        module: 'Vaisheshika Atomism',
        topics: ['Atomic Theory', 'Categories', 'Causation', 'Scientific Method'],
        duration: '4-5 weeks'
      }
    ],
    benefits: [
      'Develop logical reasoning skills',
      'Understand atomic theory in ancient India',
      'Learn debate and argumentation techniques',
      'Apply logical thinking to spiritual questions',
      'Enhance critical thinking abilities'
    ],
    testimonials: [
      {
        name: 'Dr. Amit Sharma',
        role: 'Logic Professor',
        content: 'This course beautifully combines ancient logical systems with modern reasoning. Very practical and insightful.',
        rating: 5
      }
    ],
    faq: [
      {
        question: 'How do Nyaya and Vaisheshika relate to modern logic and science?',
        answer: 'These ancient systems provide foundational concepts that are surprisingly relevant to modern logic and scientific thinking.'
      }
    ],
    trustSignals: ['Lifetime Access', 'Certificate of Completion']
  },
  'sanatan-chatushtay': {
    id: 'sanatan-chatushtay',
    title: 'सनातन चतुष्टय: Exploring Eternal Philosophies of Hinduism',
    subtitle: 'Four Pillars of Eternal Wisdom',
    description: 'Explore the four fundamental pillars of Sanatana Dharma through comprehensive study of Vedanta, Yoga, Samkhya, and other eternal philosophical traditions.',
    longDescription: 'This comprehensive course explores the four fundamental pillars of Sanatana Dharma: Vedanta, Yoga, Samkhya, and other eternal philosophical traditions. Perfect for understanding the core of Hindu philosophy.',
    originalPrice: '₹4,999',
    currentPrice: '₹2,999',
    savings: '₹2,000 (40% OFF)',
    duration: '10-12 weeks',
    level: 'Advanced',
    category: 'philosophy',
    isPopular: true,
    isFeatured: false,
    rating: 4.8,
    students: 780,
    status: 'available',
    ctaText: 'Explore Eternal Wisdom',
    ctaLink: 'https://courses.shikshanam.in/courses/--Exploring-Eternal-Philosophies-of-Hinduism-650a824be4b03b5745557827',
    heroImage: 'https://d502jbuhuh9wk.cloudfront.net/courses/650a824be4b03b5745557827/650a824be4b03b5745557827_scaled_cover.jpg?v=4',
    instructor: {
      name: 'Vishal Chaurasia',
      title: 'Sanatana Dharma Expert',
      bio: 'Vishal Chaurasia has deep expertise in the eternal philosophies of Sanatana Dharma and their practical applications.',
      image: 'https://shikshanam.in/wp-content/uploads/2024/07/Vishal-Chaurasia.jpg',
      credentials: ['IIT Patna Graduate', 'Sanatana Dharma Scholar', 'Philosophy Expert', '10+ Years Teaching Experience']
    },
    features: ['Vedantic Philosophy', 'Yoga Systems', 'Samkhya Wisdom', 'Eternal Principles', 'Practical Applications'],
    includes: ['Comprehensive Study', 'Sacred Texts', 'Philosophical Analysis', 'Spiritual Practices', 'Traditional Wisdom'],
    curriculum: [
      {
        module: 'Vedantic Foundations',
        topics: ['Advaita Vedanta', 'Non-dual Reality', 'Self-Inquiry', 'Liberation'],
        duration: '3-4 weeks'
      },
      {
        module: 'Yoga Philosophy',
        topics: ['Eight Limbs', 'Patanjali Yoga', 'Practical Application', 'Spiritual Growth'],
        duration: '3-4 weeks'
      },
      {
        module: 'Samkhya Wisdom',
        topics: ['Purusha & Prakriti', 'Gunas Theory', 'Evolution', 'Liberation'],
        duration: '2-2 weeks'
      },
      {
        module: 'Integration',
        topics: ['Comparative Study', 'Practical Application', 'Spiritual Practice', 'Life Transformation'],
        duration: '2-2 weeks'
      }
    ],
    benefits: [
      'Understand the four pillars of Sanatana Dharma',
      'Master Vedantic non-dual philosophy',
      'Learn practical Yoga systems',
      'Understand Samkhya wisdom',
      'Apply eternal principles to modern life'
    ],
    testimonials: [
      {
        name: 'Swami Gyanananda',
        role: 'Spiritual Teacher',
        content: 'This course provides a perfect foundation in the eternal philosophies of Hinduism. Highly recommended for serious seekers.',
        rating: 5
      }
    ],
    faq: [
      {
        question: 'What are the four pillars of Sanatana Dharma?',
        answer: 'The four pillars typically refer to the major philosophical systems: Vedanta, Yoga, Samkhya, and other eternal traditions of Hinduism.'
      }
    ],
    trustSignals: ['Lifetime Access', 'Certificate of Completion']
  },
  'para-apara-all-courses': {
    id: 'para-apara-all-courses',
    title: 'Parā + Aparā (All Shikshanam Courses)',
    subtitle: 'Complete Learning Ecosystem',
    description: 'Access to all Shikshanam courses covering Sanskrit, philosophy, Upanishads, and practical wisdom. The ultimate learning package for serious students.',
    longDescription: 'This comprehensive package gives you lifetime access to our entire course library, including all current and future courses. Master Sanskrit language, explore ancient philosophical systems, dive deep into Upanishadic wisdom, and transform your life with practical spiritual practices. Perfect for serious students who want complete mastery of Indian knowledge systems.',
    originalPrice: '₹19,999',
    currentPrice: '₹9,999',
    savings: '₹10,000 (50% OFF)',
    duration: 'Lifetime Access',
    level: 'All Levels',
    category: 'complete',
    isPopular: true,
    isFeatured: true,
    rating: 5.0,
    students: 2100,
    status: 'available',
    ctaText: 'Get Complete Access',
    ctaLink: 'https://courses.shikshanam.in/single-checkout/678e46e9ec4fa55804909de1?pid=p1',
    heroImage: 'https://d502jbuhuh9wk.cloudfront.net/courses/678e46e9ec4fa55804909de1/678e46e9ec4fa55804909de1_scaled_cover.jpg?v=2',
    instructor: {
      name: 'Vishal Chaurasia',
      title: 'Founder & Lead Instructor',
      bio: 'Vishal Chaurasia is a Sanskrit scholar and philosopher with deep expertise in Indian knowledge systems. He has taught thousands of students and is passionate about making ancient wisdom accessible to modern learners.',
      image: 'https://shikshanam.in/wp-content/uploads/2024/07/Vishal-Chaurasia.jpg',
      credentials: ['IIT Patna Graduate', 'Sanskrit Scholar', 'Philosophy Expert', '10+ Years Teaching Experience']
    },
    features: [
      'All Sanskrit Courses',
      'All Philosophy Courses', 
      'All Upanishad Courses',
      'Tools & Resources',
      'Community Access',
      'Lifetime Updates',
      'Priority Support',
      'Master Certificate'
    ],
    includes: [
      'Unlimited Access to All Courses',
      'New Course Updates Automatically',
      'Priority Support & Guidance',
      'Exclusive Content & Materials',
      'Master Certificate of Completion',
      'Community Forum Access',
      'Live Q&A Sessions',
      'Mobile & Desktop Access'
    ],
    curriculum: [
      {
        module: 'Sanskrit Language Foundation',
        topics: ['Basic Grammar', 'Vocabulary Building', 'Reading Practice', 'Writing Skills'],
        duration: '12-15 weeks'
      },
      {
        module: 'Philosophical Systems (Darshanas)',
        topics: ['Samkhya Philosophy', 'Yoga Darshan', 'Nyaya Logic', 'Vaisheshika Atomism', 'Mimamsa Rituals', 'Vedanta Non-dualism'],
        duration: '20-25 weeks'
      },
      {
        module: 'Upanishadic Wisdom',
        topics: ['Isha Upanishad', 'Prashna Upanishad', 'Katha Upanishad', 'Mundaka Upanishad', 'Chandogya Upanishad'],
        duration: '15-18 weeks'
      },
      {
        module: 'Practical Applications',
        topics: ['Meditation Techniques', 'Yoga Practices', 'Spiritual Development', 'Life Transformation'],
        duration: '10-12 weeks'
      }
    ],
    benefits: [
      'Master Sanskrit language from basics to advanced level',
      'Understand all six orthodox schools of Hindu philosophy',
      'Dive deep into Upanishadic wisdom and spiritual insights',
      'Develop practical skills for spiritual growth and self-realization',
      'Join a community of serious learners and practitioners',
      'Get lifetime access to all current and future courses',
      'Receive personalized guidance and support',
      'Transform your life with ancient wisdom for modern living'
    ],
    testimonials: [
      {
        name: 'Priya Sharma',
        role: 'Software Engineer',
        content: 'This package has completely transformed my understanding of Indian philosophy. The comprehensive approach and quality of content is exceptional.',
        rating: 5
      },
      {
        name: 'Rajesh Kumar',
        role: 'Teacher',
        content: 'As a teacher, I was looking for authentic sources to learn Sanskrit and philosophy. This package exceeded my expectations in every way.',
        rating: 5
      },
      {
        name: 'Anita Patel',
        role: 'Student',
        content: 'The lifetime access and continuous updates make this package incredible value. I can learn at my own pace and revisit content anytime.',
        rating: 5
      }
    ],
    faq: [
      {
        question: 'What is included in this package?',
        answer: 'This package includes lifetime access to all current and future Shikshanam courses, including Sanskrit language courses, philosophy courses, Upanishad studies, and practical spiritual practices. You also get exclusive materials, community access, and priority support.'
      },
      {
        question: 'How long do I have access?',
        answer: 'You have lifetime access to all content. This includes all current courses and any new courses we add in the future at no additional cost.'
      },
      {
        question: 'Is this suitable for beginners?',
        answer: 'Yes! The package includes courses for all levels, from complete beginners to advanced students. You can start with basic Sanskrit and gradually progress to advanced philosophical studies.'
      },
      {
        question: 'What if I am not satisfied?',
        answer: 'We offer a 30-day money-back guarantee. If you are not completely satisfied with the package, you can request a full refund within 30 days of purchase.'
      },
      {
        question: 'How do I access the courses?',
        answer: 'After enrollment, you will receive login credentials for our learning platform. You can access all courses on any device - desktop, tablet, or mobile.'
      }
    ],
    trustSignals: [
      'Lifetime Access',
      '10,000+ Happy Students',
      '5.0 Star Rating',
      'Secure Payment',
      'Mobile & Desktop Access'
    ]
  },
  'all-para-courses': {
    id: 'all-para-courses',
    title: 'All Parā Courses Combo Package',
    subtitle: 'Complete Parā Knowledge System',
    description: 'Access to all Parā (transcendental) courses covering advanced philosophical systems, Upanishads, and spiritual practices for serious seekers.',
    longDescription: 'This comprehensive package provides access to all our Parā (transcendental) courses, covering advanced philosophical systems, Upanishadic wisdom, and spiritual practices. Perfect for serious seekers who want to master the highest levels of Indian knowledge systems.',
    originalPrice: '₹8,999',
    currentPrice: '₹5,999',
    savings: '₹3,000 (33% OFF)',
    duration: '15-20 weeks',
    level: 'Advanced',
    category: 'complete',
    isPopular: false,
    isFeatured: true,
    rating: 4.9,
    students: 450,
    status: 'available',
    ctaText: 'Access Parā Knowledge',
    ctaLink: 'https://courses.shikshanam.in/single-checkout/678e3649f4f9ad20d3001578?pid=p1',
    heroImage: 'https://d502jbuhuh9wk.cloudfront.net/courses/678e3649f4f9ad20d3001578/678e3649f4f9ad20d3001578_scaled_cover.jpg?v=2',
    instructor: {
      name: 'Vishal Chaurasia',
      title: 'Parā Knowledge Expert',
      bio: 'Vishal Chaurasia has deep expertise in Parā (transcendental) knowledge systems and their practical applications for spiritual growth.',
      image: 'https://shikshanam.in/wp-content/uploads/2024/07/Vishal-Chaurasia.jpg',
      credentials: ['IIT Patna Graduate', 'Parā Knowledge Expert', 'Spiritual Teacher', '10+ Years Teaching Experience']
    },
    features: ['Advanced Philosophy', 'Upanishadic Wisdom', 'Spiritual Practices', 'Transcendental Knowledge', 'Self-Realization'],
    includes: ['All Parā Courses', 'Advanced Materials', 'Spiritual Practices', 'Personal Guidance', 'Lifetime Access'],
    curriculum: [
      {
        module: 'Advanced Philosophical Systems',
        topics: ['Vedanta', 'Samkhya', 'Yoga Philosophy', 'Comparative Study'],
        duration: '8-10 weeks'
      },
      {
        module: 'Upanishadic Wisdom',
        topics: ['Major Upanishads', 'Spiritual Insights', 'Meditation Practices', 'Self-Realization'],
        duration: '4-5 weeks'
      },
      {
        module: 'Spiritual Practices',
        topics: ['Meditation', 'Contemplation', 'Self-Inquiry', 'Liberation'],
        duration: '3-5 weeks'
      }
    ],
    benefits: [
      'Master advanced philosophical systems',
      'Understand Upanishadic wisdom',
      'Develop spiritual practices',
      'Achieve self-realization',
      'Access transcendental knowledge'
    ],
    testimonials: [
      {
        name: 'Swami Paramartha',
        role: 'Spiritual Teacher',
        content: 'This package provides access to the highest levels of spiritual knowledge. Truly transformative for serious seekers.',
        rating: 5
      }
    ],
    faq: [
      {
        question: 'What is Parā knowledge?',
        answer: 'Parā knowledge refers to transcendental or higher knowledge that leads to self-realization and spiritual liberation.'
      }
    ],
    trustSignals: ['Lifetime Access', 'Certificate of Completion']
  },
  'isha-prashna-upanishad-bundle': {
    id: 'isha-prashna-upanishad-bundle',
    title: 'The Essence of Enlightenment: Isha and Prashna Upanishad Package',
    subtitle: 'Two Pillars of Upanishadic Wisdom',
    description: 'Deep dive into two of the most important Upanishads - Isha and Prashna - for understanding the essence of enlightenment and self-realization.',
    longDescription: 'This special package focuses on two of the most profound Upanishads - Isha and Prashna. Learn about the essence of enlightenment, self-realization, and the path to ultimate truth through these timeless texts.',
    originalPrice: '₹2,999',
    currentPrice: '₹1,999',
    savings: '₹1,000 (33% OFF)',
    duration: '6-8 weeks',
    level: 'Advanced',
    category: 'special',
    isPopular: true,
    isFeatured: false,
    rating: 4.8,
    students: 650,
    status: 'available',
    ctaText: 'Discover Enlightenment',
    ctaLink: 'https://courses.shikshanam.in/courses/The-Essence-of-Enlightenment-Isha-and-Prashna-Upanishad-Package-66142b3d16c5b80f956291ea',
    heroImage: 'https://d502jbuhuh9wk.cloudfront.net/courses/66142b3d16c5b80f956291ea/66142b3d16c5b80f956291ea_scaled_cover.jpg?v=3',
    instructor: {
      name: 'Vishal Chaurasia',
      title: 'Upanishad Expert',
      bio: 'Vishal Chaurasia has deep expertise in Upanishadic wisdom and their practical applications for spiritual enlightenment.',
      image: 'https://shikshanam.in/wp-content/uploads/2024/07/Vishal-Chaurasia.jpg',
      credentials: ['IIT Patna Graduate', 'Upanishad Scholar', 'Spiritual Teacher', '10+ Years Teaching Experience']
    },
    features: ['Isha Upanishad', 'Prashna Upanishad', 'Enlightenment Teachings', 'Self-Realization', 'Spiritual Practices'],
    includes: ['Text Study', 'Commentary', 'Meditation Practices', 'Discussion Forums', 'Personal Guidance'],
    curriculum: [
      {
        module: 'Isha Upanishad',
        topics: ['Text Analysis', 'Key Teachings', 'Practical Application', 'Spiritual Insights'],
        duration: '3-4 weeks'
      },
      {
        module: 'Prashna Upanishad',
        topics: ['Question-Answer Format', 'Deep Teachings', 'Meditation Practices', 'Self-Realization'],
        duration: '3-4 weeks'
      }
    ],
    benefits: [
      'Understand the essence of enlightenment',
      'Learn from two of the most important Upanishads',
      'Develop spiritual practices',
      'Achieve self-realization',
      'Apply wisdom to daily life'
    ],
    testimonials: [
      {
        name: 'Dr. Ananda Kumar',
        role: 'Spiritual Seeker',
        content: 'This package opened my eyes to the profound wisdom of the Upanishads. The teachings are life-transforming.',
        rating: 5
      }
    ],
    faq: [
      {
        question: 'Why focus on Isha and Prashna Upanishads?',
        answer: 'These two Upanishads are considered among the most important for understanding the essence of enlightenment and self-realization.'
      }
    ],
    trustSignals: ['Lifetime Access', 'Certificate of Completion']
  }
}

export default function PackagePage({ params }: { params: { packageId: string } }) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [showStickyPrice, setShowStickyPrice] = useState(false)

  const packageData = packageDetails[params.packageId]

  if (!packageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Package Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">The package you're looking for doesn't exist.</p>
          <Link href="/packages" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Browse All Packages
          </Link>
        </div>
      </div>
    )
  }

  const categoryColors = {
    sanskrit: 'from-blue-500 to-cyan-500',
    philosophy: 'from-purple-500 to-violet-500',
    complete: 'from-orange-500 to-amber-500',
    special: 'from-pink-500 to-rose-500'
  }

  const categoryBgColors = {
    sanskrit: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
    philosophy: 'from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20',
    complete: 'from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20',
    special: 'from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <section className={`relative py-20 overflow-hidden bg-gradient-to-r ${categoryColors[packageData.category]}`}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('/assets/pattern.svg')] opacity-10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full opacity-20 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full opacity-20 blur-3xl translate-x-1/2 translate-y-1/2"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <HydrationSafeMotion
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-white"
            >
              <div className="flex items-center gap-2 mb-6">
                {packageData.isFeatured && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                    FEATURED
                  </span>
                )}
                {packageData.isPopular && (
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    POPULAR
                  </span>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg">
                {packageData.title}
              </h1>

              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                {packageData.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-8 text-white mb-8">
                <div className="flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  <span className="text-lg font-semibold">{packageData.students.toLocaleString()} Students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6 text-yellow-400" fill="currentColor" />
                  <span className="text-lg font-semibold">{packageData.rating} Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-6 h-6" />
                  <span className="text-lg font-semibold">{packageData.duration}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={packageData.ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl"
                >
                  {packageData.ctaText}
                  <ArrowRight className="w-5 h-5" />
                </a>
                <button className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-xl">
                  <Play className="w-5 h-5" />
                  Watch Preview
                </button>
              </div>
            </HydrationSafeMotion>

            <HydrationSafeMotion
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative">
                <RobustImage
                  src={packageData.heroImage}
                  alt={packageData.title}
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl"
                  fallbackSrc="https://shikshanam.in/wp-content/uploads/2024/03/Nyaya-Darshan.png"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>
            </HydrationSafeMotion>
          </div>
        </div>
      </section>

      {/* Sticky Price Card */}
      <div className="sticky top-0 z-50 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 shadow-lg lg:hidden">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400 line-through">
                {packageData.originalPrice}
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {packageData.currentPrice}
              </div>
              <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                {packageData.savings}
              </div>
            </div>
            <a
              href={packageData.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg"
            >
              {packageData.ctaText}
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">
            {/* Description */}
            <section>
              <HydrationSafeMotion
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">About This Package</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {packageData.longDescription}
                </p>
              </HydrationSafeMotion>
            </section>

            {/* What's Included */}
            <section>
              <HydrationSafeMotion
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">What's Included</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {packageData.includes.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </HydrationSafeMotion>
            </section>

            {/* Curriculum */}
            <section>
              <HydrationSafeMotion
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Curriculum</h2>
                <div className="space-y-6">
                  {packageData.curriculum.map((module, index) => (
                    <div key={index} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{module.module}</h3>
                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                          {module.duration}
                        </span>
                      </div>
                      <div className="grid md:grid-cols-2 gap-2">
                        {module.topics.map((topic, topicIndex) => (
                          <div key={topicIndex} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-gray-700 dark:text-gray-300">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </HydrationSafeMotion>
            </section>

            {/* Benefits */}
            <section>
              <HydrationSafeMotion
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">What You'll Learn</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {packageData.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
              </HydrationSafeMotion>
            </section>

            {/* Instructor */}
            <section>
              <HydrationSafeMotion
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Meet Your Instructor</h2>
                <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-slate-700">
                  <div className="flex flex-col md:flex-row gap-6">
                    <Image
                      src={packageData.instructor.image}
                      alt={packageData.instructor.name}
                      width={200}
                      height={200}
                      className="rounded-xl object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://placehold.co/200x200/9333ea/white?text=Instructor'
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        {packageData.instructor.name}
                      </h3>
                      <p className="text-lg text-blue-600 dark:text-blue-400 font-medium mb-4">
                        {packageData.instructor.title}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                        {packageData.instructor.bio}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {packageData.instructor.credentials.map((credential, index) => (
                          <span key={index} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                            {credential}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </HydrationSafeMotion>
            </section>

            {/* Testimonials */}
            <section>
              <HydrationSafeMotion
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">What Students Say</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {packageData.testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                        "{testimonial.content}"
                      </p>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-gray-100">{testimonial.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </HydrationSafeMotion>
            </section>

            {/* FAQ */}
            <section>
              <HydrationSafeMotion
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {packageData.faq.map((item, index) => (
                    <div key={index} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700">
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                        className="w-full flex items-center justify-between p-6 text-left"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {item.question}
                        </h3>
                        {expandedFaq === index ? (
                          <Minus className="w-5 h-5 text-gray-500" />
                        ) : (
                          <Plus className="w-5 h-5 text-gray-500" />
                        )}
                      </button>
                      {expandedFaq === index && (
                        <div className="px-6 pb-6">
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </HydrationSafeMotion>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Price Card */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-slate-700 mb-8">
                <div className="text-center mb-6">
                  <div className="text-sm text-gray-500 dark:text-gray-400 line-through mb-2">
                    {packageData.originalPrice}
                  </div>
                  <div className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {packageData.currentPrice}
                  </div>
                  <div className="text-lg text-green-600 dark:text-green-400 font-bold">
                    {packageData.savings}
                  </div>
                </div>

                <a
                  href={packageData.ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl text-center block mb-4"
                >
                  {packageData.ctaText}
                </a>

                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                  {packageData.trustSignals.map((signal, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{signal}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Info */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Course Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Duration:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{packageData.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Level:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{packageData.level}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Students:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{packageData.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Rating:</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-medium text-gray-900 dark:text-gray-100">{packageData.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
        <div className="container mx-auto px-4">
          <HydrationSafeMotion
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Life?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of students who have already started their journey with ancient wisdom.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={packageData.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl"
              >
                {packageData.ctaText}
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link 
                href="/packages"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-xl"
              >
                Browse Other Packages
                <Package className="w-5 h-5" />
              </Link>
            </div>
          </HydrationSafeMotion>
        </div>
      </section>
    </div>
  )
}
