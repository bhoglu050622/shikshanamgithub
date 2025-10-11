'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Users, 
  Clock, 
  Star, 
  ArrowRight,
  Play,
  Download,
  Sparkles,
  CheckCircle,
  IndianRupee,
  Calendar,
  Video,
  Headphones,
  FileText,
  ChevronDown,
  ChevronUp,
  Quote,
  UserCheck,
  Languages,
  Book,
  Award,
  Target,
  Brain,
  Heart,
  Crown,
  Globe,
  User,
  Lightbulb,
  Shield,
  PlayCircle,
  Timer,
  GraduationCap,
  Zap,
  TrendingUp
} from '@/lib/icons'
import { EnhancedCourseHero, EnhancedCourseContent, EnhancedCoursePricing } from '@/components/course'
import { notFound } from 'next/navigation'

// Course data - this would typically come from a CMS or database
const courseData: Record<string, any> = {
  'chanakya-code': {
    id: 'chanakya-code',
    title: 'Chanakya\'s Code: Dominate Negotiation & Business Tactics!',
    subtitle: 'Master Ancient Business Wisdom',
    description: 'Master ancient business wisdom and negotiation strategies from Chanakya\'s teachings. Learn the timeless principles that shaped empires and apply them to modern business challenges.',
    longDescription: 'This comprehensive course delves deep into the strategic wisdom of Chanakya, the ancient Indian philosopher and royal advisor. You\'ll learn negotiation tactics, leadership principles, and business strategies that have stood the test of time for over 2000 years.',
    type: 'Premium Course',
    status: 'available',
    price: '₹3,999',
    originalPrice: '₹5,999',
    savings: '₹2,000',
    duration: '8-10 weeks',
    level: 'Professional',
    language: 'English',
    instructor: 'Dr. Rajesh Kumar',
    rating: 4.9,
    studentsCount: 1250,
    lastUpdated: '2024-01-15',
    features: ['Business Strategy', 'Negotiation Skills', 'Leadership Principles', 'Case Studies'],
    curriculum: [
      { week: 1, title: 'Introduction to Chanakya\'s Philosophy', lessons: 5, duration: '2 hours' },
      { week: 2, title: 'The Art of Negotiation', lessons: 6, duration: '2.5 hours' },
      { week: 3, title: 'Strategic Thinking & Planning', lessons: 4, duration: '2 hours' },
      { week: 4, title: 'Leadership & Team Management', lessons: 5, duration: '2.5 hours' },
      { week: 5, title: 'Business Ethics & Values', lessons: 4, duration: '2 hours' },
      { week: 6, title: 'Crisis Management', lessons: 5, duration: '2.5 hours' },
      { week: 7, title: 'Modern Applications', lessons: 6, duration: '3 hours' },
      { week: 8, title: 'Final Project & Certification', lessons: 3, duration: '1.5 hours' }
    ],
    requirements: [
      'Basic understanding of business concepts',
      'Willingness to learn and apply ancient wisdom',
      'Open mind towards philosophical approaches',
      'Commitment to complete the course'
    ],
    whatYouWillLearn: [
      'Master negotiation tactics from ancient wisdom',
      'Develop strategic thinking abilities',
      'Learn leadership principles that last',
      'Apply business ethics in modern context',
      'Handle crisis situations effectively',
      'Build lasting business relationships'
    ],
    instructorBio: 'Dr. Rajesh Kumar is a renowned expert in ancient Indian philosophy and modern business strategy with over 15 years of experience.',
    image: '/images/courses/chanakya-code.jpg',
    videoPreview: '/videos/courses/chanakya-code-preview.mp4'
  },
  'nyaya-darshan': {
    id: 'nyaya-darshan',
    title: 'न्याय दर्शन: The Art of Perception: Nyaya Darshan',
    subtitle: 'Master Logical Reasoning and Critical Thinking',
    description: 'Develop sharp logical reasoning skills through the ancient Indian system of Nyaya philosophy. Learn to construct valid arguments and identify logical fallacies.',
    longDescription: 'Nyaya Darshan is one of the six orthodox schools of Hindu philosophy, focusing on logic, epistemology, and the means of acquiring knowledge. This course will teach you systematic thinking and reasoning.',
    type: 'Philosophy Course',
    status: 'available',
    price: '₹999',
    originalPrice: '₹1,499',
    savings: '₹500',
    duration: '6-8 weeks',
    level: 'Intermediate',
    language: 'Hindi & English',
    instructor: 'Dr. Vikram Singh',
    rating: 4.8,
    studentsCount: 890,
    lastUpdated: '2024-01-10',
    features: ['Logical Reasoning', 'Debate Techniques', 'Fallacy Recognition', 'Valid Inference'],
    curriculum: [
      { week: 1, title: 'Introduction to Nyaya Philosophy', lessons: 4, duration: '1.5 hours' },
      { week: 2, title: 'Pramanas - Sources of Knowledge', lessons: 5, duration: '2 hours' },
      { week: 3, title: 'Logical Inference (Anumana)', lessons: 6, duration: '2.5 hours' },
      { week: 4, title: 'Debate and Discussion', lessons: 4, duration: '2 hours' },
      { week: 5, title: 'Fallacies and Errors', lessons: 5, duration: '2.5 hours' },
      { week: 6, title: 'Practical Applications', lessons: 4, duration: '2 hours' }
    ],
    requirements: [
      'Interest in philosophy and logic',
      'Basic understanding of Sanskrit terms (helpful but not required)',
      'Analytical mindset',
      'Regular practice and participation'
    ],
    whatYouWillLearn: [
      'Master logical reasoning',
      'Develop debate skills',
      'Recognize logical fallacies',
      'Build valid arguments',
      'Apply to real-world problems'
    ],
    instructorBio: 'Dr. Vikram Singh is a professor of Indian philosophy with expertise in Nyaya and logical reasoning.',
    image: '/images/courses/nyaya-darshan.jpg',
    videoPreview: '/videos/courses/nyaya-darshan-preview.mp4'
  }
}

export default function CoursePage() {
  const params = useParams()
  const slug = params?.slug as string
  const [course, setCourse] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (slug && courseData[slug]) {
      setCourse(courseData[slug])
      setLoading(false)
    } else if (slug) {
      setLoading(false)
    }
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600 dark:text-gray-400 font-medium">Loading course...</p>
        </div>
      </div>
    )
  }

  if (!course) {
    notFound()
  }

  const handleEnroll = () => {
    // Handle enrollment logic here
    console.log('Enrolling in course:', course.id)
    // You can integrate with payment gateway or enrollment system here
  }

  const handlePreview = () => {
    // Handle video preview logic here
    console.log('Playing preview for course:', course.id)
    // You can open a video modal or redirect to preview page
  }

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <EnhancedCourseHero
        title={course.title}
        subtitle={course.subtitle}
        description={course.description}
        type={course.type}
        price={course.price}
        originalPrice={course.originalPrice}
        duration={course.duration}
        level={course.level}
        language={course.language}
        rating={course.rating}
        studentsCount={course.studentsCount}
        features={course.features}
        image={course.image}
        videoPreview={course.videoPreview}
        onEnroll={handleEnroll}
        onPreview={handlePreview}
      />

      {/* Enhanced Course Content */}
      <EnhancedCourseContent
        whatYouWillLearn={course.whatYouWillLearn}
        features={course.features}
        requirements={course.requirements}
        curriculum={course.curriculum}
        instructor={course.instructor}
        instructorBio={course.instructorBio}
        rating={course.rating}
        studentsCount={course.studentsCount}
        longDescription={course.longDescription}
      />

      {/* Enhanced Course Pricing */}
      <EnhancedCoursePricing
        price={course.price}
        originalPrice={course.originalPrice}
        savings={course.savings}
        features={course.features}
        duration={course.duration}
        level={course.level}
        studentsCount={course.studentsCount}
        rating={course.rating}
        onEnroll={handleEnroll}
        urgencyMessage="Limited Time Offer"
        guaranteeText="30-Day Money Back Guarantee"
        bonusItems={[
          "Exclusive Q&A Sessions",
          "Downloadable Resources",
          "Community Access",
          "Lifetime Updates"
        ]}
      />
    </div>
  )
}