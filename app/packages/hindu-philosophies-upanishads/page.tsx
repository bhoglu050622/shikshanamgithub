'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { 
  BookOpen, Users, Clock, Star, ArrowRight, Sparkles, CheckCircle, User, HelpCircle, Book, Plus, Minus,
  Brain, Eye, Infinity, Award, Hexagon, Sun, Layers, Mountain, Circle
} from 'lucide-react'
import { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper'
import HydrationSafeMotion from '@/components/motion/HydrationSafeMotion'
import Button from '@/components/ui/button'
import PhilosophicalTimeline from '@/components/packages/PhilosophicalTimeline'
import VisualMetaphor from '@/components/packages/VisualMetaphor'
import SacredSymbol from '@/components/packages/SacredSymbol'
import ImmersiveStory from '@/components/packages/ImmersiveStory'

const packageData = {
  id: 'hindu-philosophies-upanishads',
  title: 'हिन्दू दर्शन + उपनिषद्',
  englishTitle: 'Complete Wisdom: Six Darshanas & Upanishads',
  subtitle: 'The Ultimate Philosophical & Spiritual Journey',
  description: 'Experience the complete orthodox tradition. Explore all six Darshanas—logic, atomism, consciousness, practice, ritual, and non-duality. Then ascend to the Upanishads—the supreme wisdom that all philosophies ultimately serve. This is total traditional education.',
  originalPrice: '₹7,999',
  currentPrice: '₹4,999',
  savings: '₹3,000',
  savingsPercent: '37%',
  duration: '18-22 weeks',
  level: 'Intermediate to Advanced',
  rating: 4.9,
  students: 1400,
  category: 'Ultimate Wisdom Bundle',
  instructor: 'Council of Philosophical Masters',
  language: 'Hindi & Sanskrit with English',
  
  features: [
    { icon: Hexagon, title: 'Six Darshanas Complete', subtitle: 'All Classical Schools', description: 'Comprehensive study of Nyaya, Vaisheshika, Samkhya, Yoga, Mimamsa, Vedanta' },
    { icon: Sun, title: 'Major Upanishads', subtitle: 'Supreme Teachings', description: 'Deep study of principal Upanishads—Isha, Kena, Katha, Prashna, Mundaka, Mandukya, and more' },
    { icon: Brain, title: 'Integrated Understanding', subtitle: 'Complete Vision', description: 'See how all philosophies converge toward Upanishadic realization' },
    { icon: Infinity, title: 'Total Liberation Path', subtitle: 'Complete Framework', description: 'From logic to atoms to consciousness to ultimate truth—the complete orthodox path' }
  ],
  
  includes: [
    '70+ Philosophy Transmissions (HD)',
    'All Six Darshanas Detailed',
    'Major Upanishads with Commentary',
    'Comparative Philosophy Sessions',
    'Meditation & Practice Guides',
    'PDF Sacred Texts',
    'Live Wisdom Sessions (Weekly)',
    'Traditional Certificate',
    'Lifetime Sacred Access',
    'Complete Wisdom Community',
    'Expert Council Guidance',
    'Integration Workshops',
    'Daily Practice Routines',
    'Synthesis Sessions',
    'Advanced Study Materials'
  ],
  
  curriculum: [
    { week: 'Weeks 1-4', title: 'Nyaya & Vaisheshika', topics: ['Logic & Epistemology', 'Atomic Theory', 'Valid Knowledge', 'Reality Categories'], duration: '12 hours' },
    { week: 'Weeks 5-8', title: 'Samkhya & Yoga', topics: ['Consciousness-Matter', 'Eight Limbs', 'Liberation Theory', 'Practice Methods'], duration: '12 hours' },
    { week: 'Weeks 9-12', title: 'Mimamsa & Vedanta', topics: ['Ritual Philosophy', 'Scriptural Interpretation', 'Non-Dual Reality', 'Brahman-Atman'], duration: '12 hours' },
    { week: 'Weeks 13-18', title: 'Upanishadic Wisdom', topics: ['Major Upanishads Study', 'Supreme Teachings', 'Self-Realization Methods', 'Integration with Darshanas'], duration: '16 hours' },
    { week: 'Weeks 19-22', title: 'Complete Synthesis', topics: ['All Philosophies United', 'Upanishadic Culmination', 'Living Wisdom', 'Final Realization'], duration: '12 hours' }
  ],
  
  testimonials: [
    { name: 'Dr. Rajesh Verma', role: 'Philosophy Professor', rating: 5, text: 'This is the most comprehensive philosophical education available. The integration of six Darshanas with Upanishadic wisdom provides complete traditional understanding.', avatar: '/assets/testimonials/rajesh-verma.jpg' },
    { name: 'Priya Singh', role: 'Advanced Student', rating: 5, text: 'Studying all six philosophies before Upanishads made the supreme teachings come alive. I understand not just what the Upanishads say, but why—having seen the philosophical foundation.', avatar: '/assets/testimonials/priya-singh.jpg' },
    { name: 'Dr. Amit Kumar', role: 'Vedanta Scholar', rating: 5, text: 'The way this course shows how all six Darshanas prepare for and support Upanishadic realization is brilliant. Complete orthodox education as it should be.', avatar: '/assets/testimonials/amit-kumar.jpg' }
  ],
  
  faqs: [
    { question: 'Why study six Darshanas before Upanishads?', answer: 'The Darshanas provide systematic philosophical frameworks—logic, atomism, consciousness theory, practice methods, interpretation, and metaphysics. This foundation makes Upanishadic teachings comprehensible, not just poetic. You understand the philosophy behind the supreme wisdom.' },
    { question: 'Is this too much for one course?', answer: 'This is an intensive, comprehensive journey designed for serious students. While extensive, it\'s systematically structured—each philosophy builds on previous understanding, culminating naturally in Upanishadic realization. The depth is the value.' },
    { question: 'How long should I dedicate weekly?', answer: 'Plan for 5-6 hours of dedicated study weekly. This is serious traditional education requiring contemplation, practice, and integration. The time investment yields complete philosophical and spiritual understanding.' },
    { question: 'What makes this "complete"?', answer: 'You study all six orthodox Darshanas (no perspective missing) and major Upanishads (supreme teachings). Philosophy provides framework, Upanishads provide realization. Together, they form total traditional education—nothing essential is omitted.' },
    { question: 'What transformation can I expect?', answer: 'You\'ll gain comprehensive philosophical understanding rare even among scholars, deep Upanishadic insights, systematic spiritual practice methods, and the capacity to integrate ancient wisdom into modern life. Intellectual and spiritual transformation together—complete education leading to complete understanding.' }
  ],
  
  ctaText: 'Begin Ultimate Journey',
  ctaLink: 'https://courses.shikshanam.in/courses/Hindu-Philosophies-Upanishads-Package-65a12a95e4b05ac7edb48763',
  image: '/assets/hindu-philosophies-upanishads.jpg'
}

const journeySteps = [
  { week: 'Foundation', title: 'The Complete Path Beckons', description: 'Commit to total education—six philosophies, supreme Upanishads. This is the complete orthodox tradition.', milestone: 'Commitment to completeness' },
  { week: 'Weeks 1-8', title: 'Four Darshanas: Foundations', description: 'Master logic (Nyaya), atoms (Vaisheshika), consciousness (Samkhya), practice (Yoga). The philosophical foundation solidifies.', milestone: 'Four systems mastered' },
  { week: 'Weeks 9-12', title: 'Two Darshanas: Completion', description: 'Understand interpretation (Mimamsa) and non-duality (Vedanta). Now all six perspectives are yours.', milestone: 'Complete darshana knowledge' },
  { week: 'Weeks 13-18', title: 'Upanishadic Ascent', description: 'With philosophical foundation complete, ascend to Upanishads. Supreme wisdom now makes complete sense—you have the framework to receive it.', milestone: 'Supreme wisdom accessed' },
  { week: 'Weeks 19-22', title: 'Complete Integration', description: 'See how all philosophies serve Upanishadic realization. Theory and supreme knowledge unite. You are completely educated in the orthodox tradition.', milestone: 'Total integration realized' }
]

const metaphors = [
  { icon: Mountain, title: 'Base Camp to Summit', concept: 'Progressive Ascent', description: 'The six Darshanas are like base camps ascending a mountain. Each provides perspective, tools, understanding. The Upanishads are the summit—supreme view of reality.', symbolism: 'The mountain journey represents systematic spiritual education—each philosophy a station, Upanishads the peak realization' },
  { icon: Layers, title: 'Foundations to Pinnacle', concept: 'Architectural Completeness', description: 'Like building a sacred temple, Darshanas provide foundation, walls, structure. Upanishads are the sanctum—the holy of holies where ultimate truth dwells.', symbolism: 'The complete temple represents total education—philosophy as structure, Upanishads as the sacred center' },
  { icon: Sun, title: 'Candles to Sunlight', concept: 'Illumination Progression', description: 'Each Darshana is a lamp illuminating one aspect of reality. The Upanishads are like stepping into sunlight—where all separate lights merge into one brilliant radiance.', symbolism: 'Progressive illumination—from many lights (philosophies) to the one source light (Upanishadic truth)' }
]

const symbols = [
  { icon: Hexagon, name: 'Shad Darshana', sanskritName: 'षड्दर्शन', meaning: 'Six Viewpoints', significance: 'The complete orthodox philosophical tradition—six angles of vision revealing truth systematically' },
  { icon: Eye, name: 'Upanishad', sanskritName: 'उपनिषद्', meaning: 'Sitting Close', significance: 'Supreme wisdom teachings—revealed in intimacy to prepared disciples, the pinnacle of Vedic knowledge' },
  { icon: Circle, name: 'Brahman', sanskritName: 'ब्रह्मन्', meaning: 'The Absolute', significance: 'Ultimate reality taught in Upanishads—infinite, eternal, the ground and goal of all philosophy' },
  { icon: Infinity, name: 'Moksha', sanskritName: 'मोक्ष', meaning: 'Liberation', significance: 'Final freedom—the goal all six Darshanas and Upanishads ultimately serve and reveal' }
]

const storyPhases = [
  { label: 'Fragmented', title: 'Pieces Without Whole', description: 'You know bits of philosophy, quotes from Upanishads, but it feels fragmented. How do they connect? What\'s the complete picture?' },
  { label: 'Systematic', title: 'Six Perspectives Emerge', description: 'Through the six Darshanas, order appears. Logic, atoms, consciousness, practice, ritual, non-duality—each philosophy reveals one facet systematically. The fragments begin forming a picture.' },
  { label: 'Ascent', title: 'Upanishadic Revelation', description: 'With philosophical foundation complete, Upanishads reveal their depth. Concepts you read before now make profound sense. "Tat Tvam Asi" isn\'t just words—it\'s realization supported by complete understanding.' },
  { label: 'Completion', title: 'Total Philosophical Realization', description: 'You now possess complete orthodox education. Six Darshanas provide systematic understanding, Upanishads provide supreme realization. Philosophy and wisdom are one in you. This is what complete traditional education yields—not just knowledge but transformation, not just learning but becoming.' }
]

export default function HinduPhilosophiesUpanishadsPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const tabs = [{ id: 'overview', label: 'Overview', icon: BookOpen }, { id: 'curriculum', label: 'Curriculum', icon: Book }, { id: 'testimonials', label: 'Wisdom Shared', icon: Star }, { id: 'faq', label: 'Questions', icon: HelpCircle }]

  return (
    <>
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-amber-50 via-indigo-50 to-purple-50 dark:from-amber-950 dark:via-indigo-950 to-purple-950">
        <div className="absolute inset-0 -z-10">
          {[...Array(7)].map((_, i) => (
            <HydrationSafeMotion
              key={i}
              className={`absolute w-64 h-64 rounded-full blur-3xl`}
              style={{
                background: `radial-gradient(circle, ${['rgba(251,191,36,0.15)', 'rgba(99,102,241,0.15)', 'rgba(168,85,247,0.15)'][i % 3]}, transparent)`,
                left: `${(i * 15) % 90}%`,
                top: `${(i * 20) % 80}%`
              }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 5 + i, repeat: 999999, delay: i * 0.5 }}
            >
              <div />
            </HydrationSafeMotion>
          ))}
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <StaggerContainer>
              <StaggerItem>
                <div className="flex items-center space-x-3 mb-6">
                  <HydrationSafeMotion className="w-14 h-14 bg-gradient-to-br from-amber-500 via-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg" animate={{ boxShadow: ['0 0 20px rgba(168,85,247,0.5)', '0 0 60px rgba(168,85,247,0.8)', '0 0 20px rgba(168,85,247,0.5)'] }} transition={{ duration: 3, repeat: Infinity }}>
                    <Mountain className="w-7 h-7 text-white" />
                  </HydrationSafeMotion>
                  <span className="bg-gradient-to-r from-amber-100 via-indigo-100 to-purple-100 dark:from-amber-900/40 dark:via-indigo-900/40 dark:to-purple-900/40 text-indigo-900 dark:text-indigo-200 px-4 py-2 rounded-full text-sm font-medium border border-indigo-200 dark:border-indigo-800">{packageData.category}</span>
                </div>
              </StaggerItem>

              <StaggerItem>
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 leading-tight">
                  <span className="bg-gradient-to-r from-amber-600 via-indigo-600 to-purple-600 dark:from-amber-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">{packageData.title}</span>
                </h1>
                <h2 className="text-3xl sm:text-4xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-6">{packageData.englishTitle}</h2>
              </StaggerItem>

              <StaggerItem>
                <p className="text-xl text-indigo-600 dark:text-indigo-400 mb-4 font-medium italic">{packageData.subtitle}</p>
              </StaggerItem>

              <StaggerItem>
                <p className="text-lg text-gray-700 dark:text-gray-200 mb-8 leading-relaxed">{packageData.description}</p>
              </StaggerItem>

              <StaggerItem>
                <div className="flex flex-wrap gap-6 mb-8">
                  {[{ value: packageData.rating, label: 'Sacred Rating', icon: Star, color: 'from-amber-500 to-amber-600' }, { value: packageData.students.toLocaleString(), label: 'Wisdom Seekers', icon: Users, color: 'from-indigo-500 to-indigo-600' }, { value: packageData.duration, label: 'Journey Time', icon: Clock, color: 'from-purple-500 to-purple-600' }].map((stat, i) => (
                    <HydrationSafeMotion key={i} whileHover={{ scale: 1.05 }} className="flex items-center space-x-3 bg-white dark:bg-slate-800 px-4 py-3 rounded-xl shadow-md border-2 border-indigo-200 dark:border-indigo-800">
                      <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}><stat.icon className="w-6 h-6 text-white" /></div>
                      <div><div className="text-xl font-bold text-gray-800 dark:text-gray-100">{stat.value}</div><div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div></div>
                    </HydrationSafeMotion>
                  ))}
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="bg-gradient-to-br from-white to-indigo-50/50 dark:from-slate-800 dark:to-indigo-900/20 border-2 border-indigo-200 dark:border-indigo-700 rounded-2xl p-6 mb-8 shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 line-through mb-1">{packageData.originalPrice}</div>
                      <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">{packageData.currentPrice}</div>
                      <div className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mt-1">Sacred Offering: Save {packageData.savings} ({packageData.savingsPercent})</div>
                    </div>
                    <div className="text-right"><div className="text-sm text-gray-600 dark:text-gray-300 mb-1">For Dedicated Seekers</div><div className="font-medium text-gray-800 dark:text-gray-100 text-sm">{packageData.level}</div></div>
                  </div>
                  <Button variant="primary" size="lg" href={packageData.ctaLink} icon={<ArrowRight className="w-6 h-6" />} className="w-full bg-gradient-to-r from-amber-500 via-indigo-500 to-purple-500 hover:from-amber-600 hover:via-indigo-600 hover:to-purple-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">{packageData.ctaText}</Button>
                </div>
              </StaggerItem>
            </StaggerContainer>

            <StaggerContainer>
              <StaggerItem>
                <div className="relative aspect-square max-w-md mx-auto">
                  <HydrationSafeMotion className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-amber-400 via-indigo-400 to-purple-400 shadow-2xl flex items-center justify-center z-20 border-4 border-white/50" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 4, repeat: Infinity }}>
                    <Sun className="w-16 h-16 text-white" />
                  </HydrationSafeMotion>
                  {[0, 1, 2, 3, 4, 5].map((i) => {
                    const angle = (i * 60 * Math.PI) / 180; const radius = 150; const x = Math.cos(angle) * radius; const y = Math.sin(angle) * radius
                    return (
                      <HydrationSafeMotion key={i} className="absolute top-1/2 left-1/2 z-30" style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }} animate={{ y: [0, -12, 0] }} transition={{ duration: 3, repeat: 999999, delay: i * 0.4 }}>
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-3 rounded-full shadow-lg w-14 h-14 flex items-center justify-center text-white font-bold">{i + 1}</div>
                      </HydrationSafeMotion>
                    )
                  })}
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </section>

      <PhilosophicalTimeline steps={journeySteps} accentColor="#6366f1" theme="cosmic" />
      <VisualMetaphor title="Complete Philosophical Ascent" subtitle="From systematic philosophies to supreme Upanishadic wisdom" metaphors={metaphors} theme="cosmic" />

      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <HydrationSafeMotion initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">Ultimate Wisdom Bundle</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Everything for complete mastery of orthodox philosophy and supreme Upanishadic wisdom</p>
          </HydrationSafeMotion>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {packageData.includes.map((item, i) => (
              <HydrationSafeMotion key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.05 }} viewport={{ once: true }} whileHover={{ scale: 1.02 }} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md hover:shadow-lg border border-indigo-200 dark:border-indigo-800">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 via-indigo-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1"><CheckCircle className="w-5 h-5 text-white" /></div>
                  <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">{item}</h3>
                </div>
              </HydrationSafeMotion>
            ))}
          </div>
        </div>
      </section>

      <SacredSymbol title="Sacred Wisdom Elements" subtitle="Philosophy and supreme knowledge—the complete orthodox tradition" symbols={symbols} theme="cosmic" />
      <ImmersiveStory title="From Fragments to Complete Wisdom" introduction="Experience total transformation through complete orthodox philosophical and Upanishadic education" phases={storyPhases} conclusion="You are now complete—orthodox education realized" theme="cosmic" />

      <section className="py-24 bg-gradient-to-br from-amber-900 via-indigo-900 to-purple-900 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <HydrationSafeMotion initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-12 shadow-2xl">
                <div className="flex items-center justify-center gap-4 mb-8">
                <HydrationSafeMotion className="w-20 h-20 bg-gradient-to-br from-amber-300 via-indigo-300 to-purple-300 rounded-full flex items-center justify-center shadow-2xl" animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: 999999, ease: 'linear' }}>
                  <Mountain className="w-10 h-10 text-white" />
                </HydrationSafeMotion>
                <h3 className="text-4xl md:text-5xl font-bold text-white">Ready for Complete Wisdom?</h3>
                    </div>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">Begin the ultimate journey. Six Darshanas provide the foundation, Upanishads provide the summit. This is complete orthodox education.</p>
              <HydrationSafeMotion whileHover={{ scale: 1.05 }}>
                <Button variant="primary" size="lg" href={packageData.ctaLink} icon={<ArrowRight className="w-6 h-6" />} className="bg-gradient-to-r from-amber-100 via-indigo-100 to-purple-100 text-indigo-900 font-bold py-5 px-12 rounded-2xl shadow-2xl text-xl">{packageData.ctaText}</Button>
                  </HydrationSafeMotion>
              <div className="flex flex-wrap items-center justify-center gap-4 mt-8 text-white/80">
                <div className="flex items-center gap-2 bg-white/10 px-5 py-3 rounded-full backdrop-blur-sm"><Infinity className="w-5 h-5" /><span className="font-medium">Lifetime Access</span></div>
                <div className="flex items-center gap-2 bg-white/10 px-5 py-3 rounded-full backdrop-blur-sm"><Award className="w-5 h-5" /><span className="font-medium">Traditional Certificate</span></div>
              </div>
            </div>
          </HydrationSafeMotion>
        </div>
      </section>
    </>
  )
}
