'use client'

import { useReducedMotion, useInView } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { MotionDiv, MotionH2, MotionP, MotionSpan, MotionButton } from '@/components/motion/MotionWrapper'
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
  achievements?: string[]
  teachingStyle: string
  philosophy: string
  courses: string[]
  rating: number
  studentsCount?: number
  color: string
  icon?: any
}

interface MeetGurusProps {
  onGuruClick?: (guru: Guru) => void
  onViewProfile?: (guru: Guru) => void
}

interface MeetGurusData {
  title: string;
  subtitle: string;
  description: string;
  gurus: Guru[];
}

const gurus: Guru[] = [
  {
    name: "आचार्य विश्रीनिधिः",
    specialty: "Navya Nyaya Scholar",
    credibility: "पूर्णप्रज्ञविद्यापीठम्, बेङ्गलूरु",
    image: "/images/gurus/vishrinidhi.jpg",
    profile: "/gurus/vishrinidhi",
    experience: "14+ years Gurukul Experience",
    education: "PhD in Navya Nyaya",
    teachingStyle: "Traditional Gurukul method with deep logical analysis",
    philosophy: "Logic and reasoning are the foundation of true knowledge",
    courses: ["Advanced Nyaya", "Navya Nyaya Fundamentals", "Sanskrit Logic"],
    rating: 4.9,
    studentsCount: 850,
    color: "from-primary to-primary/90",
    icon: Brain
  },
  {
    name: "साधक जामवंत",
    specialty: "Ayurveda, Samkhya & Yoga",
    credibility: "युवा गुरुकुलम्, पणजी, गोवा",
    image: "/images/gurus/jamavant.jpg",
    profile: "/gurus/jamavant",
    experience: "10+ Years",
    education: "आयुर्वेद, सांख्य एवं योग प्रशिक्षक",
    teachingStyle: "Holistic approach integrating body, mind, and philosophy",
    philosophy: "True wellness comes from understanding the harmony of consciousness and matter",
    courses: ["Samkhya Philosophy", "Yoga Fundamentals", "Ayurvedic Lifestyle"],
    rating: 4.8,
    studentsCount: 1200,
    color: "from-accent to-accent/90",
    icon: Heart
  },
  {
    name: "आचार्य शेखर चंद्र भट्ट",
    specialty: "Nyaya Darshana",
    credibility: "श्री शृङ्गेरी शारदा पीठम् पाठशाला, कर्नाटक",
    image: "/images/gurus/shekhar-bhatt.jpg",
    profile: "/gurus/shekhar-bhatt",
    experience: "20+ years",
    education: "कृष्ण यजुर्वेद मूल, आचार्य - न्याय दर्शन",
    teachingStyle: "Deep scriptural study with practical philosophical applications",
    philosophy: "The path to truth lies in systematic inquiry and valid reasoning",
    courses: ["Nyaya Darshana", "Krishna Yajurveda", "Vedic Philosophy"],
    rating: 4.9,
    studentsCount: 950,
    color: "from-secondary to-secondary/90",
    icon: BookOpen
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
    <MotionDiv
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
          <MotionDiv 
            className="w-32 h-32 bg-gradient-to-br from-primary/80 to-primary rounded-full flex items-center justify-center relative overflow-hidden"
            animate={shouldReduceMotion ? {} : {
              rotate: isHovered ? 5 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <User className="w-16 h-16 text-primary-foreground" />
            
            {/* Halo glow effect */}
            <MotionDiv 
              className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-primary/50 blur-sm"
              animate={shouldReduceMotion ? {} : {
                scale: isHovered ? 1.2 : 1,
                opacity: isHovered ? 0.8 : 0.4,
              }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Specialty icon */}
            <div className={`absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r ${guru.color} rounded-full flex items-center justify-center shadow-lg`}>
              {guru.icon && typeof guru.icon === 'function' ? (
                <guru.icon className="w-5 h-5 text-primary-foreground" />
              ) : (
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              )}
            </div>
          </MotionDiv>
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
              {guru.rating || 0}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4 text-secondary" />
            <span className="text-sm text-muted-foreground">
              {guru.studentsCount ? guru.studentsCount.toLocaleString() : '0'}+ students
            </span>
          </div>
        </div>
        
        {/* CTA Button */}
        <MotionButton
          whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation()
            onViewProfile?.(guru)
          }}
          className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300"
        >
          <span>View Profile</span>
          <ExternalLink className="w-4 h-4" />
        </MotionButton>
      </div>
    </MotionDiv>
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
    <MotionDiv
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
      animate={shouldReduceMotion ? {} : { opacity: 1 }}
      exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
      onClick={onClose}
    >
      <MotionDiv
        className="bg-card rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={shouldReduceMotion ? { scale: 1 } : { scale: 0.9, opacity: 0 }}
        animate={shouldReduceMotion ? {} : { scale: 1, opacity: 1 }}
        exit={shouldReduceMotion ? { scale: 1 } : { scale: 0.9, opacity: 0 }}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-primary/80 to-primary rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-primary-foreground" />
              </div>
              <div className={`absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r ${guru.color} rounded-full flex items-center justify-center`}>
                {guru.icon && typeof guru.icon === 'function' ? (
                  <guru.icon className="w-4 h-4 text-primary-foreground" />
                ) : (
                  <BookOpen className="w-4 h-4 text-primary-foreground" />
                )}
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
                  <span>{guru.rating || 0}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4 text-secondary" />
                  <span>{guru.studentsCount ? guru.studentsCount.toLocaleString() : '0'}+ students</span>
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
          <MotionButton
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            className="btn-primary flex items-center space-x-2"
            onClick={onClose}
          >
            <span>Close</span>
            <ExternalLink className="w-4 h-4 text-primary-foreground" />
          </MotionButton>
        </div>
      </MotionDiv>
    </MotionDiv>
  )
}

// Hardcoded gurus data
const gurusData = {
  title: "Meet Our Gurus",
  subtitle: "Learn from renowned spiritual teachers and scholars",
  description: "Our gurus bring decades of experience in ancient Indian wisdom.",
  gurus: gurus
}

export default function MeetGurus({ onGuruClick, onViewProfile }: MeetGurusProps) {
  const [selectedGuru, setSelectedGuru] = useState<Guru | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    setMounted(true)
  }, [])

  const sectionTitle = gurusData.title
  const sectionSubtitle = gurusData.subtitle
  const sectionDescription = gurusData.description
  const gurusList = gurusData.gurus

  const handleGuruClick = (guru: Guru) => {
    setSelectedGuru(guru)
    setIsModalOpen(true)
    onGuruClick?.(guru)
  }

  const handleViewProfile = (guru: Guru) => {
    onViewProfile?.(guru)
    // In a real app, this would navigate to the guru's profile page
  }

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-[hsl(45,40%,98%)] to-[hsl(45,30%,97%)] dark:from-[hsl(240,8%,9%)] dark:to-[hsl(240,6%,11%)] relative overflow-hidden" aria-labelledby="gurus-title">
      {/* Background Animation */}
      <div className="absolute inset-0 -z-10">
        <MotionDiv
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
        <MotionDiv
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
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Meet Your Gurus
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Learn from renowned spiritual teachers and scholars with decades of experience in ancient Indian wisdom.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {gurusList.map((guru: Guru, index: number) => (
            <GuruCard
              key={index}
              guru={guru}
              index={index}
              onGuruClick={handleGuruClick}
              onViewProfile={handleViewProfile}
            />
          ))}
        </div>
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