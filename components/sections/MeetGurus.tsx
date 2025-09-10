'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useState, useRef } from 'react'
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
    color: "from-primary to-primary/90",
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
    color: "from-accent to-accent/90",
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
    color: "from-secondary to-secondary/90",
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
      <div className="bg-card p-6 text-center group-hover:shadow-2xl transition-all duration-300 h-full">
        {/* Guru Avatar */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          <motion.div 
            className="w-32 h-32 bg-gradient-to-br from-primary/80 to-primary rounded-full flex items-center justify-center relative overflow-hidden"
            animate={shouldReduceMotion ? {} : {
              rotate: isHovered ? 5 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <User className="w-16 h-16 text-primary-foreground" />
            
            {/* Halo glow effect */}
            <motion.div 
              className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-primary/50 blur-sm"
              animate={shouldReduceMotion ? {} : {
                scale: isHovered ? 1.2 : 1,
                opacity: isHovered ? 0.8 : 0.4,
              }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Specialty icon */}
            <div className={`absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r ${guru.color} rounded-full flex items-center justify-center shadow-lg`}>
              <guru.icon className="w-5 h-5 text-primary-foreground" />
            </div>
          </motion.div>
        </div>
        
        {/* Guru Info */}
        <h3 className="text-xl font-display text-foreground mb-2">
          {guru.name}
        </h3>
        
        <p className="text-primary text-sm mb-3 font-medium">
          {guru.specialty}
        </p>
        
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {guru.credibility}
        </p>
        
        {/* Rating and Students */}
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-primary fill-current" />
            <span className="text-sm font-medium text-foreground">
              {guru.rating}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4 text-secondary" />
            <span className="text-sm text-muted-foreground">
              {guru.studentsCount.toLocaleString()}+ students
            </span>
          </div>
        </div>
        
        {/* Key Achievements */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-foreground mb-2">
            Key Achievements
          </h4>
          <ul className="space-y-1">
            {guru.achievements.slice(0, 2).map((achievement, idx) => (
              <li key={idx} className="flex items-start space-x-2 text-xs text-muted-foreground">
                <Award className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
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
          className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300"
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
        className="bg-card rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={shouldReduceMotion ? { scale: 1 } : { scale: 0.9, opacity: 0 }}
        animate={shouldReduceMotion ? {} : { scale: 1, opacity: 1 }}
        exit={shouldReduceMotion ? { scale: 1 } : { scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-primary/80 to-primary rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-primary-foreground" />
              </div>
              <div className={`absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r ${guru.color} rounded-full flex items-center justify-center`}>
                <guru.icon className="w-4 h-4 text-primary-foreground" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-display text-foreground mb-1">
                {guru.name}
              </h2>
              <p className="text-primary font-medium mb-2">
                {guru.specialty}
              </p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-primary fill-current" />
                  <span>{guru.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4 text-secondary" />
                  <span>{guru.studentsCount.toLocaleString()}+ students</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4 text-accent" />
                  <span>{guru.experience}</span>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground/80 transition-colors"
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
              <h3 className="text-lg font-display text-foreground mb-3 flex items-center">
                <GraduationCap className="w-5 h-5 mr-2 text-primary" />
                Education & Credentials
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {guru.education}
              </p>
            </div>
            
            {/* Teaching Style */}
            <div>
              <h3 className="text-lg font-display text-foreground mb-3 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-primary" />
                Teaching Style
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {guru.teachingStyle}
              </p>
            </div>
            
            {/* Philosophy */}
            <div>
              <h3 className="text-lg font-display text-foreground mb-3 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-primary" />
                Philosophy
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed italic">
                "{guru.philosophy}"
              </p>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            {/* Achievements */}
            <div>
              <h3 className="text-lg font-display text-foreground mb-3 flex items-center">
                <Award className="w-5 h-5 mr-2 text-primary" />
                Key Achievements
              </h3>
              <ul className="space-y-1">
                {guru.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start space-x-2 text-xs text-muted-foreground">
                    <Award className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Courses */}
            <div>
              <h3 className="text-lg font-display text-foreground mb-3 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-primary" />
                Courses by {guru.name.split(' ')[0]}
              </h3>
              <ul className="space-y-2">
                {guru.courses.map((course, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <BookOpen className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">
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
            <ExternalLink className="w-4 h-4 text-primary-foreground" />
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
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

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
    <section className="section-padding relative overflow-hidden" aria-labelledby="gurus-title">
      {/* Background Animation */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full mix-blend-multiply filter blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 35,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-br from-secondary/5 to-primary/5 rounded-full mix-blend-multiply filter blur-3xl"
        />
      </div>

      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <motion.h2 
            id="gurus-title" 
            className="text-display text-foreground mb-4"
            animate={isInView ? {
              textShadow: [
                '0 0 0px rgba(218, 165, 32, 0)',
                '0 0 20px rgba(218, 165, 32, 0.3)',
                '0 0 0px rgba(218, 165, 32, 0)'
              ]
            } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            Meet Your{' '}
            <motion.span
              className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              animate={isInView ? {
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              } : {}}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ backgroundSize: '200% 200%' }}
            >
              Gurus
            </motion.span>
          </motion.h2>
          <motion.p 
            className="text-body text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.span
              animate={isInView ? { opacity: [0.7, 1, 0.7] } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Learn from scholars, practitioners, and mentors who have dedicated their lives to 
              understanding and teaching ancient Indian wisdom for modern application.
            </motion.span>
          </motion.p>
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
          <motion.p 
            className="text-muted-foreground mb-6"
            animate={isInView ? { opacity: [0.7, 1, 0.7] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Ready to learn from these exceptional teachers?
          </motion.p>
          <motion.button
            whileHover={shouldReduceMotion ? {} : { 
              scale: 1.05, 
              y: -2,
              boxShadow: "0 10px 30px rgba(218, 165, 32, 0.3)"
            }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            className="btn-outline flex items-center space-x-3 px-8 py-4 text-lg mx-auto no-underline"
          >
            <motion.span
              animate={{ textShadow: ['0 0 0px rgba(218, 165, 32, 0)', '0 0 10px rgba(218, 165, 32, 0.5)', '0 0 0px rgba(218, 165, 32, 0)'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              View All Gurus
            </motion.span>
            <motion.div
              whileHover={{ rotate: 45, scale: 1.2 }}
              transition={{ duration: 0.2 }}
            >
              <ExternalLink className="w-5 h-5" />
            </motion.div>
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