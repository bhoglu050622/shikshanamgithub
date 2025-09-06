'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { 
  Heart, 
  Target, 
  Users, 
  Globe, 
  BookOpen, 
  Sparkles,
  Quote,
  Award,
  Lightbulb,
  ArrowRight,
  ExternalLink,
  Calendar,
  MapPin,
  GraduationCap,
  Briefcase,
  Star,
  TrendingUp
} from 'lucide-react'

interface Founder {
  name: string
  role: string
  bio: string
  image: string
  credentials: string[]
  philosophy: string
  achievements: string[]
  socialLinks: {
    linkedin?: string
    twitter?: string
    website?: string
  }
}

interface FoundersMissionProps {
  onFounderClick?: (founder: Founder) => void
  onMissionLearnMore?: () => void
}

const founders: Founder[] = [
  {
    name: 'Dr. Ananya Sharma',
    role: 'Co-Founder & Chief Wisdom Officer',
    bio: 'Dr. Ananya Sharma is a renowned scholar of Indian philosophy with over 15 years of experience in translating ancient wisdom for modern application. She holds a PhD in Sanskrit Literature and has taught at prestigious universities worldwide.',
    image: '/images/founders/ananya-sharma.jpg',
    credentials: [
      'PhD in Sanskrit Literature, Oxford University',
      'Former Professor at Harvard Divinity School',
      'Author of 8 books on Indian philosophy',
      'TEDx speaker on ancient wisdom for modern life'
    ],
    philosophy: 'Wisdom is not just knowledge—it\'s the ability to apply timeless principles to create meaningful change in our lives and the world around us.',
    achievements: [
      'Translated 12 ancient Sanskrit texts',
      'Mentored 500+ students in philosophy',
      'Founded 3 successful educational initiatives',
      'Recognized by UNESCO for cultural preservation'
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/ananya-sharma',
      twitter: 'https://twitter.com/ananya_sharma',
      website: 'https://ananyasharma.com'
    }
  },
  {
    name: 'Rajesh Kumar',
    role: 'Co-Founder & Chief Technology Officer',
    bio: 'Rajesh Kumar is a technology entrepreneur and meditation practitioner who bridges the gap between ancient wisdom and modern innovation. He has built several successful tech companies while maintaining a deep practice in Kashmir Shaiva traditions.',
    image: '/images/founders/rajesh-kumar.jpg',
    credentials: [
      'MS in Computer Science, Stanford University',
      'Former VP Engineering at Google',
      'Certified Kashmir Shaiva practitioner',
      'Serial entrepreneur with 3 successful exits'
    ],
    philosophy: 'Technology should serve humanity\'s highest potential. By combining ancient wisdom with modern tools, we can create solutions that truly transform lives.',
    achievements: [
      'Built 3 successful tech companies',
      'Led engineering teams of 200+ people',
      '20+ years of meditation practice',
      'Mentored 100+ entrepreneurs'
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/rajesh-kumar',
      twitter: 'https://twitter.com/rajesh_kumar',
      website: 'https://rajeshkumar.com'
    }
  }
]

const missionValues = [
  {
    title: 'Authenticity',
    description: 'We stay true to the original teachings while making them accessible and relevant for modern life.',
    icon: Heart,
    color: 'from-saffron-500 to-saffron-600'
  },
  {
    title: 'Practicality',
    description: 'Every teaching must have real-world application. We focus on what works, not just what sounds profound.',
    icon: Target,
    color: 'from-peacock-green-500 to-peacock-green-600'
  },
  {
    title: 'Community',
    description: 'Learning happens best in community. We foster connections between students and create supportive learning environments.',
    icon: Users,
    color: 'from-lotus-pink-500 to-lotus-pink-600'
  },
  {
    title: 'Global Impact',
    description: 'We believe ancient wisdom can solve modern global challenges. Our mission extends beyond individual transformation.',
    icon: Globe,
    color: 'from-deep-teal-500 to-deep-teal-600'
  }
]

// Founder Card Component
const FounderCard = ({ 
  founder, 
  index, 
  onFounderClick 
}: {
  founder: Founder
  index: number
  onFounderClick?: (founder: Founder) => void
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
      whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onFounderClick?.(founder)}
    >
      <div className="card-premium p-8 h-full group-hover:shadow-2xl transition-all duration-300">
        {/* Founder Photo */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          <motion.div 
            className="w-32 h-32 bg-gradient-to-br from-saffron-400 to-saffron-600 rounded-full flex items-center justify-center relative overflow-hidden"
            animate={shouldReduceMotion ? {} : {
              rotate: isHovered ? 5 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <Users className="w-16 h-16 text-white" />
            
            {/* Halo glow effect */}
            <motion.div 
              className="absolute inset-0 rounded-full bg-gradient-to-br from-soft-gold-400/30 to-saffron-400/30 blur-sm"
              animate={shouldReduceMotion ? {} : {
                scale: isHovered ? 1.2 : 1,
                opacity: isHovered ? 0.8 : 0.4,
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </div>
        
        {/* Founder Info */}
        <div className="text-center">
          <h3 className="text-xl font-display text-indigo-700 dark:text-soft-gold-500 mb-2">
            {founder.name}
          </h3>
          <p className="text-saffron-600 dark:text-saffron-400 text-sm mb-4 font-medium">
            {founder.role}
          </p>
          <p className="text-wisdom-600 dark:text-wisdom-400 text-sm leading-relaxed mb-4">
            {founder.bio}
          </p>
          
          {/* Key Credentials */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-indigo-700 dark:text-soft-gold-500 mb-2">
              Key Credentials
            </h4>
            <ul className="space-y-1">
              {founder.credentials.slice(0, 2).map((credential, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-xs text-wisdom-600 dark:text-wisdom-400">
                  <Award className="w-3 h-3 text-saffron-500 dark:text-saffron-400 mt-0.5 flex-shrink-0" />
                  <span>{credential}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Philosophy Quote */}
          <div className="bg-gradient-to-r from-saffron-100 to-deep-teal-100 dark:from-saffron-900/30 dark:to-deep-teal-900/30 rounded-lg p-4 mb-4">
            <Quote className="w-4 h-4 text-saffron-500 dark:text-saffron-400 mb-2 mx-auto" />
            <p className="text-xs text-wisdom-700 dark:text-wisdom-300 italic leading-relaxed">
              "{founder.philosophy}"
            </p>
          </div>
          
          {/* CTA Button */}
          <motion.button
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            className="w-full bg-gradient-to-r from-saffron-500 to-deep-teal-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300"
          >
            <span>Learn More</span>
            <ExternalLink className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

// Mission Value Card Component
const MissionValueCard = ({ 
  value, 
  index 
}: {
  value: typeof missionValues[0]
  index: number
}) => {
  const shouldReduceMotion = useReducedMotion()
  
  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
      whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
      whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
    >
      <div className="card-premium p-6 h-full text-center group-hover:shadow-xl transition-all duration-300">
        <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
          <value.icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-lg font-display text-indigo-700 dark:text-soft-gold-500 mb-3">
          {value.title}
        </h3>
        <p className="text-wisdom-600 dark:text-wisdom-400 text-sm leading-relaxed">
          {value.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function FoundersMission({ onFounderClick, onMissionLearnMore }: FoundersMissionProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="section-padding bg-white/50 dark:bg-deep-indigo-500/50" aria-labelledby="mission-title">
      <div className="container-custom">
        {/* Mission Statement */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 id="mission-title" className="text-display text-indigo-700 dark:text-soft-gold-500 mb-6">
            Why We Built This
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <blockquote className="text-xl md:text-2xl text-wisdom-600 dark:text-wisdom-400 mb-8 leading-relaxed italic">
              "Self-help shouldn't be pop-advice. It should be practice-ready, principle-driven, and compassionate. 
              We're building a place where Indian wisdom meets everyday life."
            </blockquote>
            
            <p className="text-body text-wisdom-600 dark:text-wisdom-400 leading-relaxed mb-8">
              In a world filled with quick fixes and surface-level solutions, we believe in the power of 
              ancient wisdom to create lasting transformation. Our mission is to make the profound teachings 
              of Indian philosophy accessible, practical, and relevant for modern life.
            </p>
            
            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              onClick={onMissionLearnMore}
              className="btn-outline flex items-center space-x-3 px-8 py-4 text-lg mx-auto"
            >
              <span>Learn More About Our Mission</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Mission Values */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-display text-indigo-700 dark:text-soft-gold-500 mb-8 text-center">
            Our Core Values
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {missionValues.map((value, index) => (
              <MissionValueCard
                key={value.title}
                value={value}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* Founders Section */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-display text-indigo-700 dark:text-soft-gold-500 mb-8 text-center">
            Meet the Founders
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {founders.map((founder, index) => (
              <FounderCard
                key={founder.name}
                founder={founder}
                index={index}
                onFounderClick={onFounderClick}
              />
            ))}
          </div>
        </motion.div>

        {/* Impact Stats */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-saffron-100 to-deep-teal-100 dark:from-saffron-900/30 dark:to-deep-teal-900/30 rounded-2xl p-8">
            <h3 className="text-xl font-display text-indigo-700 dark:text-soft-gold-500 mb-6 text-center">
              Our Impact So Far
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-saffron-600 dark:text-saffron-400 mb-2">
                  5,000+
                </div>
                <div className="text-sm text-wisdom-600 dark:text-wisdom-400">Students Transformed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-peacock-green-600 dark:text-peacock-green-400 mb-2">
                  15+
                </div>
                <div className="text-sm text-wisdom-600 dark:text-wisdom-400">Countries Reached</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-lotus-pink-600 dark:text-lotus-pink-400 mb-2">
                  95%
                </div>
                <div className="text-sm text-wisdom-600 dark:text-wisdom-400">Report Positive Change</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-deep-teal-600 dark:text-deep-teal-400 mb-2">
                  4.9/5
                </div>
                <div className="text-sm text-wisdom-600 dark:text-wisdom-400">Average Rating</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}