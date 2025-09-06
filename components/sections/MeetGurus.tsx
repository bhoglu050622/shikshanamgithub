'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { 
  User, 
  ExternalLink, 
  Award, 
  BookOpen, 
  Users, 
  Star,
  Calendar,
  MapPin,
  GraduationCap,
  Briefcase,
  Heart,
  Brain,
  TrendingUp,
  Sparkles
} from 'lucide-react'

interface Guru {
  name: string
  specialty: string
  credibility: string
  image: string
  profile: string
  experience: string
  education: string
  achievements: string[]
  teachingStyle: string
  philosophy: string
  courses: string[]
  rating: number
  studentsCount: number
  color: string
  icon: any
}

interface MeetGurusProps {
  onGuruClick?: (guru: Guru) => void
  onViewProfile?: (guru: Guru) => void
}

const gurus: Guru[] = [
  {
    name: "Dr. Priya Sharma",
    specialty: "Chanakya Leadership & Business Strategy",
    credibility: "15+ years in corporate leadership, PhD in Indian Philosophy",
    image: "/images/gurus/priya-sharma.jpg",
    profile: "/gurus/priya-sharma",
    experience: "15+ years",
    education: "PhD in Indian Philosophy, MBA from IIM",
    achievements: [
      "Former VP at Fortune 500 company",
      "Published 3 books on leadership",
      "Trained 5000+ executives",
      "Awarded 'Best Leadership Coach 2023'"
    ],
    teachingStyle: "Practical, case-study driven approach with real-world applications",
    philosophy: "Leadership is not about power, but about serving others and creating lasting impact",
    courses: [
      "Entrepreneurship & Leadership through Chanakya's Principles",
      "Strategic Decision Making in Business",
      "Building High-Performance Teams"
    ],
    rating: 4.9,
    studentsCount: 2500,
    color: "from-saffron-500 to-saffron-600",
    icon: TrendingUp
  },
  {
    name: "Meera Patel",
    specialty: "Emotional Intelligence & Samkhya Philosophy",
    credibility: "Certified therapist, 12+ years in emotional wellness",
    image: "/images/gurus/meera-patel.jpg",
    profile: "/gurus/meera-patel",
    experience: "12+ years",
    education: "Masters in Psychology, Certified in Samkhya Philosophy",
    achievements: [
      "Licensed Clinical Psychologist",
      "Certified Samkhya Philosophy Practitioner",
      "Helped 3000+ individuals with emotional wellness",
      "Featured in 'Psychology Today'"
    ],
    teachingStyle: "Compassionate, mindfulness-based approach with scientific backing",
    philosophy: "True emotional intelligence comes from understanding the nature of consciousness itself",
    courses: [
      "Emotional Intelligence through Sāṅkhya Darśana",
      "Mindfulness and Self-Awareness",
      "Building Healthy Relationships"
    ],
    rating: 4.8,
    studentsCount: 1800,
    color: "from-lotus-pink-500 to-lotus-pink-600",
    icon: Heart
  },
  {
    name: "Rajesh Kumar",
    specialty: "Kashmir Shaiva & Advanced Consciousness",
    credibility: "Spiritual teacher, 20+ years in Shaiva traditions",
    image: "/images/gurus/rajesh-kumar.jpg",
    profile: "/gurus/rajesh-kumar",
    experience: "20+ years",
    education: "Traditional Shaiva Studies, Advanced Sanskrit Scholar",
    achievements: [
      "Initiated into Kashmir Shaiva tradition",
      "Translated 5 ancient texts",
      "Conducted 100+ meditation retreats",
      "Recognized by Indian Council for Cultural Relations"
    ],
    teachingStyle: "Deep, contemplative approach with traditional wisdom and modern applications",
    philosophy: "Consciousness is the fundamental reality, and self-realization is the highest goal",
    courses: [
      "Emotional Intelligence through Kashmir Shaiva Darśana",
      "Advanced Consciousness Practices",
      "Meditation and Spiritual Growth"
    ],
    rating: 4.9,
    studentsCount: 1200,
    color: "from-deep-teal-500 to-deep-teal-600",
    icon: Brain
  }
]

// Guru Card Component
const GuruCard = ({ 
  guru, 
  index, 
  onGuruClick, 
  onViewProfile 
}: { 
  guru: Guru
  index: number
  onGuruClick?: (guru: Guru) => void
  onViewProfile?: (guru: Guru) => void 
}) => {
  const shouldReduceMotion = useReducedMotion()
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
      whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
      whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onGuruClick?.(guru)}
    >
      <div className="card-premium p-6 text-center group-hover:shadow-2xl transition-all duration-300 h-full">
        {/* Guru Avatar */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          <motion.div 
            className="w-32 h-32 bg-gradient-to-br from-saffron-400 to-saffron-600 rounded-full flex items-center justify-center relative overflow-hidden"
            animate={shouldReduceMotion ? {} : {
              rotate: isHovered ? 5 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <User className="w-16 h-16 text-white" />
            
            {/* Halo glow effect */}
            <motion.div 
              className="absolute inset-0 rounded-full bg-gradient-to-br from-soft-gold-400/30 to-saffron-400/30 blur-sm"
              animate={shouldReduceMotion ? {} : {
                scale: isHovered ? 1.2 : 1,
                opacity: isHovered ? 0.8 : 0.4,
              }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Specialty icon */}
            <div className={`absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r ${guru.color} rounded-full flex items-center justify-center shadow-lg`}>
              <guru.icon className="w-5 h-5 text-white" />
            </div>
          </motion.div>
        </div>
        
        {/* Guru Info */}
        <h3 className="text-xl font-display text-indigo-700 dark:text-soft-gold-500 mb-2">
          {guru.name}
        </h3>
        
        <p className="text-saffron-600 dark:text-saffron-400 text-sm mb-3 font-medium">
          {guru.specialty}
        </p>
        
        <p className="text-wisdom-600 dark:text-wisdom-400 text-sm leading-relaxed mb-4">
          {guru.credibility}
        </p>
        
        {/* Rating and Students */}
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-soft-gold-500 fill-current" />
            <span className="text-sm font-medium text-wisdom-700 dark:text-wisdom-300">
              {guru.rating}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4 text-peacock-green-500" />
            <span className="text-sm text-wisdom-600 dark:text-wisdom-400">
              {guru.studentsCount.toLocaleString()}+ students
            </span>
          </div>
        </div>
        
        {/* Key Achievements */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-indigo-700 dark:text-soft-gold-500 mb-2">
            Key Achievements
          </h4>
          <ul className="space-y-1">
            {guru.achievements.slice(0, 2).map((achievement, idx) => (
              <li key={idx} className="flex items-start space-x-2 text-xs text-wisdom-600 dark:text-wisdom-400">
                <Award className="w-3 h-3 text-saffron-500 dark:text-saffron-400 mt-0.5 flex-shrink-0" />
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* CTA Button */}
        <motion.button
          whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation()
            onViewProfile?.(guru)
          }}
          className="w-full bg-gradient-to-r from-saffron-500 to-deep-teal-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300"
        >
          <span>View Profile</span>
          <ExternalLink className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}

// Detailed Guru Modal Component
const GuruModal = ({ 
  guru, 
  isOpen, 
  onClose 
}: { 
  guru: Guru | null
  isOpen: boolean
  onClose: () => void 
}) => {
  const shouldReduceMotion = useReducedMotion()
  
  if (!guru || !isOpen) return null
  
  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
      animate={shouldReduceMotion ? {} : { opacity: 1 }}
      exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white dark:bg-wisdom-800 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={shouldReduceMotion ? { scale: 1 } : { scale: 0.9, opacity: 0 }}
        animate={shouldReduceMotion ? {} : { scale: 1, opacity: 1 }}
        exit={shouldReduceMotion ? { scale: 1 } : { scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-saffron-400 to-saffron-600 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <div className={`absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r ${guru.color} rounded-full flex items-center justify-center`}>
                <guru.icon className="w-4 h-4 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-display text-indigo-700 dark:text-soft-gold-500 mb-1">
                {guru.name}
              </h2>
              <p className="text-saffron-600 dark:text-saffron-400 font-medium mb-2">
                {guru.specialty}
              </p>
              <div className="flex items-center space-x-4 text-sm text-wisdom-600 dark:text-wisdom-400">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-soft-gold-500 fill-current" />
                  <span>{guru.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4 text-peacock-green-500" />
                  <span>{guru.studentsCount.toLocaleString()}+ students</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4 text-deep-teal-500" />
                  <span>{guru.experience}</span>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-wisdom-400 hover:text-wisdom-600 dark:hover:text-wisdom-300 transition-colors"
            aria-label="Close guru profile"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Education */}
            <div>
              <h3 className="text-lg font-display text-indigo-700 dark:text-soft-gold-500 mb-3 flex items-center">
                <GraduationCap className="w-5 h-5 mr-2" />
                Education & Credentials
              </h3>
              <p className="text-wisdom-600 dark:text-wisdom-400 text-sm leading-relaxed">
                {guru.education}
              </p>
            </div>
            
            {/* Teaching Style */}
            <div>
              <h3 className="text-lg font-display text-indigo-700 dark:text-soft-gold-500 mb-3 flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Teaching Style
              </h3>
              <p className="text-wisdom-600 dark:text-wisdom-400 text-sm leading-relaxed">
                {guru.teachingStyle}
              </p>
            </div>
            
            {/* Philosophy */}
            <div>
              <h3 className="text-lg font-display text-indigo-700 dark:text-soft-gold-500 mb-3 flex items-center">
                <Sparkles className="w-5 h-5 mr-2" />
                Philosophy
              </h3>
              <p className="text-wisdom-600 dark:text-wisdom-400 text-sm leading-relaxed italic">
                "{guru.philosophy}"
              </p>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            {/* Achievements */}
            <div>
              <h3 className="text-lg font-display text-indigo-700 dark:text-soft-gold-500 mb-3 flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Key Achievements
              </h3>
              <ul className="space-y-2">
                {guru.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Award className="w-4 h-4 text-saffron-500 dark:text-saffron-400 mt-1 flex-shrink-0" />
                    <span className="text-wisdom-600 dark:text-wisdom-400 text-sm">
                      {achievement}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Courses */}
            <div>
              <h3 className="text-lg font-display text-indigo-700 dark:text-soft-gold-500 mb-3 flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Courses by {guru.name.split(' ')[0]}
              </h3>
              <ul className="space-y-2">
                {guru.courses.map((course, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <BookOpen className="w-4 h-4 text-peacock-green-500 dark:text-peacock-green-400 mt-1 flex-shrink-0" />
                    <span className="text-wisdom-600 dark:text-wisdom-400 text-sm">
                      {course}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="flex justify-end mt-8">
          <motion.button
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            className="btn-primary flex items-center space-x-2"
            onClick={onClose}
          >
            <span>Close</span>
            <ExternalLink className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function MeetGurus({ onGuruClick, onViewProfile }: MeetGurusProps) {
  const [selectedGuru, setSelectedGuru] = useState<Guru | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const handleGuruClick = (guru: Guru) => {
    setSelectedGuru(guru)
    setIsModalOpen(true)
    onGuruClick?.(guru)
  }

  const handleViewProfile = (guru: Guru) => {
    onViewProfile?.(guru)
    // In a real app, this would navigate to the guru's profile page
    console.log('Navigate to profile:', guru.profile)
  }

  return (
    <section className="section-padding" aria-labelledby="gurus-title">
      <div className="container-custom">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 id="gurus-title" className="text-display text-indigo-700 dark:text-soft-gold-500 mb-4">
            Meet Your Gurus
          </h2>
          <p className="text-body text-wisdom-600 dark:text-wisdom-400 max-w-2xl mx-auto mb-8">
            Learn from scholars, practitioners, and mentors who have dedicated their lives to 
            understanding and teaching ancient Indian wisdom for modern application.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-saffron-600 dark:text-saffron-400">
                {gurus.reduce((sum, guru) => sum + guru.studentsCount, 0).toLocaleString()}+
              </div>
              <div className="text-sm text-wisdom-600 dark:text-wisdom-400">Students Taught</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-peacock-green-600 dark:text-peacock-green-400">
                {gurus.reduce((sum, guru) => sum + guru.achievements.length, 0)}+
              </div>
              <div className="text-sm text-wisdom-600 dark:text-wisdom-400">Achievements</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-deep-teal-600 dark:text-deep-teal-400">
                {gurus.reduce((sum, guru) => sum + parseInt(guru.experience), 0)}+
              </div>
              <div className="text-sm text-wisdom-600 dark:text-wisdom-400">Years Experience</div>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {gurus.map((guru, index) => (
            <GuruCard
              key={index}
              guru={guru}
              index={index}
              onGuruClick={handleGuruClick}
              onViewProfile={handleViewProfile}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-wisdom-600 dark:text-wisdom-400 mb-6">
            Ready to learn from these exceptional teachers?
          </p>
          <motion.button
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            className="btn-outline flex items-center space-x-3 px-8 py-4 text-lg mx-auto"
          >
            <span>View All Gurus</span>
            <ExternalLink className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>

      {/* Guru Modal */}
      <GuruModal
        guru={selectedGuru}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedGuru(null)
        }}
      />
    </section>
  )
}