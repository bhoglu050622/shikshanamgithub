'use client'

import { useReducedMotion, useInView, motion } from 'framer-motion'
import { useHydrationSafeAnimation } from '@/lib/hooks/useHydrationSafeAnimation'
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
    name: "आचार्य वि श्रीनिधिः",
    specialty: "पूर्णप्रज्ञविद्यापीठम्, बेङ्गलूरु",
    credibility: "14+ years Gurukul Experience, PhD in Navya Nyaya",
    image: "/images/gurus/acharya-vishrinidhi.jpg",
    profile: "/gurus/acharya-vishrinidhi",
    experience: "14+ years Gurukul Experience",
    education: "PhD in Navya Nyaya, Traditional Sanskrit Scholar",
    teachingStyle: "Traditional Gurukul methodology with modern pedagogy",
    philosophy: "विद्या ददाति विनयं - Knowledge bestows humility",
    courses: [
      "Navya Nyaya Darshana",
      "Sanskrit Grammar & Literature",
      "Traditional Logic & Reasoning"
    ],
    rating: 4.9,
    studentsCount: 2500,
    color: "from-teal-500 to-emerald-600",
    icon: BookOpen
  },
  {
    name: "साधक जामवंत",
    specialty: "युवा गुरुकुलम्, पणजी, गोवा",
    credibility: "10+ Years of आयुर्वेद, सांख्य एवं योग प्रशिक्षक",
    image: "/images/gurus/sadhak-jamavant.jpg",
    profile: "/gurus/sadhak-jamavant",
    experience: "10+ Years of Ayurveda, Samkhya & Yoga Training",
    education: "Traditional Ayurveda Acharya, Samkhya Darshana Scholar",
    teachingStyle: "Holistic approach combining theory with practical application",
    philosophy: "सर्वं खल्विदं ब्रह्म - All this is indeed Brahman",
    courses: [
      "Samkhya Darshana",
      "Ayurveda Fundamentals",
      "Yoga Philosophy & Practice"
    ],
    rating: 4.8,
    studentsCount: 1800,
    color: "from-purple-500 to-violet-600",
    icon: Heart
  },
  {
    name: "आचार्य शेखर चंद्र भट्ट",
    specialty: "श्री शृङ्गेरी शारदा पीठम् पाठशाला, कर्नाटक",
    credibility: "कृष्ण यजुर्वेद मूल, आचार्य - न्याय दर्शन",
    image: "/images/gurus/acharya-shekhar-bhatt.jpg",
    profile: "/gurus/acharya-shekhar-bhatt",
    experience: "Krishna Yajur Veda Mool, Acharya - Nyaya Darshana",
    education: "Traditional Vedic Scholar, Nyaya Darshana Acharya",
    teachingStyle: "Vedic tradition with systematic philosophical analysis",
    philosophy: "सत्यमेव जयते - Truth alone triumphs",
    courses: [
      "Nyaya Darshana",
      "Krishna Yajur Veda",
      "Vedic Philosophy & Rituals"
    ],
    rating: 4.9,
    studentsCount: 2200,
    color: "from-orange-500 to-amber-600",
    icon: Brain
  }
]

// Enhanced Guru Card Component
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
  const mounted = useHydrationSafeAnimation()
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <MotionDiv
      initial={mounted ? { opacity: 0, y: 20 } : false}
      whileInView={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={mounted ? { duration: 0.5, delay: index * 0.1 } : { duration: 0 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
      whileHover={mounted ? { 
        y: -8,
        transition: { duration: 0.3 }
      } : {}}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onGuruClick?.(guru)}
    >
      <div className="relative h-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 via-emerald-500/0 to-green-500/0 group-hover:from-teal-500/10 group-hover:via-emerald-500/10 group-hover:to-green-500/10 transition-all duration-500 rounded-3xl" />
        
        {/* Decorative element */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-teal-400/20 to-emerald-400/20 dark:from-teal-500/10 dark:to-emerald-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />

        <div className="relative z-10">
          {/* Guru Avatar */}
          <div className="relative w-20 h-20 mx-auto mb-6">
            <motion.div
              className="w-20 h-20 bg-gradient-to-br from-teal-600 to-emerald-600 dark:from-teal-500 dark:to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
              whileHover={mounted ? { rotate: 6 } : {}}
            >
              <guru.icon className="w-10 h-10 text-white" />
            </motion.div>
          </div>

          {/* Guru Info */}
          <div className="text-center mb-6">
            <motion.h3
              className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight"
              initial={mounted ? { opacity: 0 } : false}
              whileInView={mounted ? { opacity: 1 } : { opacity: 1 }}
              transition={mounted ? { duration: 0.5, delay: 0.2 } : { duration: 0 }}
            >
              {guru.name}
            </motion.h3>

            <motion.p
              className="text-gray-600 dark:text-gray-400 text-sm mb-2 leading-relaxed"
              initial={mounted ? { opacity: 0 } : false}
              whileInView={mounted ? { opacity: 1 } : { opacity: 1 }}
              transition={mounted ? { duration: 0.5, delay: 0.3 } : { duration: 0 }}
            >
              {guru.specialty}
            </motion.p>

            <motion.p
              className="text-gray-500 dark:text-gray-500 text-xs mb-4 leading-relaxed"
              initial={mounted ? { opacity: 0 } : false}
              whileInView={mounted ? { opacity: 1 } : { opacity: 1 }}
              transition={mounted ? { duration: 0.5, delay: 0.4 } : { duration: 0 }}
            >
              {guru.credibility}
            </motion.p>
          </div>

          {/* Rating and Students */}
          <motion.div 
            className="flex items-center justify-center space-x-6 mb-6"
            initial={mounted ? { opacity: 0 } : false}
            whileInView={mounted ? { opacity: 1 } : { opacity: 1 }}
            transition={mounted ? { duration: 0.5, delay: 0.5 } : { duration: 0 }}
          >
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {guru.rating || 0}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {guru.studentsCount ? guru.studentsCount.toLocaleString() : '0'}+ students
              </span>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={mounted ? { opacity: 0 } : false}
            whileInView={mounted ? { opacity: 1 } : { opacity: 1 }}
            transition={mounted ? { duration: 0.5, delay: 0.6 } : { duration: 0 }}
          >
            <MotionButton
              whileHover={mounted ? { 
                scale: 1.02
              } : {}}
              whileTap={mounted ? { scale: 0.98 } : {}}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation()
                onViewProfile?.(guru)
              }}
              className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span>View Profile</span>
              <ExternalLink className="w-4 h-4" />
            </MotionButton>
          </motion.div>
        </div>

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
            {/* Achievements */}
            <div>
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

export default function MeetGurus({ onGuruClick, onViewProfile }: MeetGurusProps) {
  const [selectedGuru, setSelectedGuru] = useState<Guru | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [gurusData, setGurusData] = useState<MeetGurusData | null>(null)
  const [loading, setLoading] = useState(true)
  const shouldReduceMotion = useReducedMotion()
  const mounted = useHydrationSafeAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  // Use mock data since CMS functionality is removed
  useEffect(() => {
    const fetchGurusData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300))

        // Mock gurus data
        setGurusData({
          title: "Meet Our Gurus",
          subtitle: "Learn from Expert Teachers",
          description: "Our experienced gurus bring decades of wisdom and practical knowledge to guide your spiritual journey.",
          gurus: [
            {
              name: "आचार्य वि श्रीनिधिः",
              specialty: "पूर्णप्रज्ञविद्यापीठम्, बेङ्गलूरु",
              credibility: "14+ years Gurukul Experience, PhD in Navya Nyaya",
              image: "/assets/gurus/acharya-vishrinidhi.jpg",
              profile: "/gurus/acharya-vishrinidhi",
              experience: "14+ years Gurukul Experience",
              education: "PhD in Navya Nyaya, Traditional Sanskrit Scholar",
              achievements: ["Traditional Gurukul methodology with modern pedagogy"],
              teachingStyle: "Traditional Gurukul methodology with modern pedagogy",
              philosophy: "विद्या ददाति विनयं - Knowledge bestows humility",
              courses: ["Navya Nyaya Darshana", "Sanskrit Grammar & Literature", "Traditional Logic & Reasoning"],
              rating: 4.9,
              studentsCount: 2500,
              color: "from-teal-500 to-emerald-600",
              icon: BookOpen
            },
            {
              name: "साधक जामवंत",
              specialty: "युवा गुरुकुलम्, पणजी, गोवा",
              credibility: "10+ Years of आयुर्वेद, सांख्य एवं योग प्रशिक्षक",
              image: "/assets/gurus/sadhak-jamavant.jpg",
              profile: "/gurus/sadhak-jamavant",
              experience: "10+ Years of Ayurveda, Samkhya & Yoga Training",
              education: "Traditional Ayurveda Acharya, Samkhya Darshana Scholar",
              achievements: ["Holistic approach combining theory with practical application"],
              teachingStyle: "Holistic approach combining theory with practical application",
              philosophy: "सर्वं खल्विदं ब्रह्म - All this is indeed Brahman",
              courses: ["Samkhya Darshana", "Ayurveda Fundamentals", "Yoga Philosophy & Practice"],
              rating: 4.8,
              studentsCount: 1800,
              color: "from-purple-500 to-violet-600",
              icon: Heart
            },
            {
              name: "आचार्य शेखर चंद्र भट्ट",
              specialty: "श्री शृङ्गेरी शारदा पीठम् पाठशाला, कर्नाटक",
              credibility: "कृष्ण यजुर्वेद मूल, आचार्य - न्याय दर्शन",
              image: "/assets/gurus/acharya-shekhar-bhatt.jpg",
              profile: "/gurus/acharya-shekhar-bhatt",
              experience: "Krishna Yajur Veda Mool, Acharya - Nyaya Darshana",
              education: "Traditional Vedic Scholar, Nyaya Darshana Acharya",
              achievements: ["Vedic tradition with systematic philosophical analysis"],
              teachingStyle: "Vedic tradition with systematic philosophical analysis",
              philosophy: "सत्यमेव जयते - Truth alone triumphs",
              courses: ["Nyaya Darshana", "Krishna Yajur Veda", "Vedic Philosophy & Rituals"],
              rating: 4.9,
              studentsCount: 2200,
              color: "from-orange-500 to-amber-600",
              icon: Brain
            }
          ]
        })
      } catch (error) {
        console.error('Failed to fetch gurus data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchGurusData()
  }, [])

  // Use CMS data or fallback to default
  const sectionTitle = gurusData?.title || "Meet Our Gurus"
  const sectionSubtitle = gurusData?.subtitle || "Learn from authentic teachers of ancient wisdom"
  const sectionDescription = gurusData?.description || "Our experienced teachers guide you through the ancient wisdom traditions."
  const gurusList = gurusData?.gurus || gurus

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
    <section className="py-20 sm:py-24 md:py-28 relative overflow-hidden bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900" aria-labelledby="gurus-title">
      <div className="absolute inset-0 -z-10">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500/10 dark:bg-teal-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/10 dark:bg-green-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom">
        {/* Enhanced Section Header */}
        <MotionDiv
          ref={ref}
          initial={mounted ? { opacity: 0, y: 40 } : false}
          animate={mounted && isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={mounted ? { duration: 0.6 } : { duration: 0 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={mounted ? { opacity: 0, scale: 0.9 } : false}
            animate={mounted && isInView ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
            transition={mounted ? { duration: 0.5, delay: 0.1 } : { duration: 0 }}
            className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-teal-100 to-emerald-100 dark:from-teal-900/40 dark:to-emerald-900/40 border border-teal-200 dark:border-teal-700/50 mb-6 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span className="text-xs font-semibold text-teal-900 dark:text-teal-200 tracking-widest uppercase">Meet Our Gurus</span>
          </motion.div>
          
          <MotionH2
            id="gurus-title"
            className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold mb-6 bg-gradient-to-r from-teal-900 via-emerald-900 to-green-900 dark:from-teal-100 dark:via-emerald-100 dark:to-green-100 bg-clip-text text-transparent"
          >
            Meet Our Gurus
          </MotionH2>
          
          <MotionP
            className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? {} : { duration: 0.6, delay: 0.2 }}
          >
            Learn from authentic teachers of ancient wisdom traditions
          </MotionP>
        </MotionDiv>

        {/* Enhanced Gurus Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
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

        {/* Enhanced Bottom CTA */}
        <MotionDiv
          initial={mounted ? { opacity: 0, y: 30 } : false}
          whileInView={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={mounted ? { duration: 0.6, delay: 0.3 } : { duration: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <MotionP
            className="text-gray-700 dark:text-gray-300 mb-8 text-xl"
          >
            Ready to learn from these exceptional teachers?
          </MotionP>
          <MotionButton
            whileHover={mounted ? {
              scale: 1.05
            } : {}}
            whileTap={mounted ? { scale: 0.95 } : {}}
            className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white px-8 py-4 text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center space-x-3 mx-auto no-underline"
          >
            <span>View All Gurus</span>
            <ExternalLink className="w-5 h-5" />
          </MotionButton>
        </MotionDiv>
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