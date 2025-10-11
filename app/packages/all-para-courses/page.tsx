'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { 
  BookOpen, Users, Clock, Star, ArrowRight, CheckCircle, User, HelpCircle, Book, Plus, Minus,
  Sparkles, Crown, Infinity, Award, Gem, Zap, Brain, Heart, Eye, Mountain
} from 'lucide-react'
import { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper'
import HydrationSafeMotion from '@/components/motion/HydrationSafeMotion'
import Button from '@/components/ui/button'
import PhilosophicalTimeline from '@/components/packages/PhilosophicalTimeline'
import VisualMetaphor from '@/components/packages/VisualMetaphor'
import SacredSymbol from '@/components/packages/SacredSymbol'
import ImmersiveStory from '@/components/packages/ImmersiveStory'

const packageData = {
  id: 'all-para-courses',
  title: 'परा विद्या संपूर्ण',
  englishTitle: 'Complete Parā Vidya Collection',
  subtitle: 'The Supreme Knowledge - Complete Access',
  description: 'Access the entirety of Parā Vidya—supreme knowledge that liberates. This complete collection includes all advanced philosophical, spiritual, and practical wisdom courses. From Darshanas to Upanishads, Sanskrit to meditation—everything needed for complete spiritual realization.',
  originalPrice: '₹19,999',
  currentPrice: '₹11,999',
  savings: '₹8,000',
  savingsPercent: '40%',
  duration: '20-24 weeks',
  level: 'Advanced',
  rating: 4.9,
  students: 890,
  category: 'Supreme Knowledge Collection',
  instructor: 'Council of Masters',
  language: 'Hindi, Sanskrit & English',
  
  features: [
    { icon: Gem, title: 'Parā Vidya', subtitle: 'Supreme Knowledge', description: 'Access the highest wisdom—knowledge that directly liberates the seeker' },
    { icon: Crown, title: 'Complete Collection', subtitle: 'Nothing Omitted', description: 'Every advanced course, every teaching, every practice—total access to supreme knowledge' },
    { icon: Infinity, title: 'Lifetime Journey', subtitle: 'Eternal Access', description: 'Lifetime access to continuously expanding library of supreme wisdom' },
    { icon: Award, title: 'Traditional Mastery', subtitle: 'Complete Certification', description: 'Comprehensive certification in the complete orthodox spiritual tradition' }
  ],
  
  includes: [
    'Complete Parā Vidya Library',
    '100+ Wisdom Transmissions',
    'All Advanced Philosophy Courses',
    'Complete Upanishad Collection',
    'Advanced Meditation Practices',
    'Sanskrit Mastery Program',
    'Six Darshanas Complete',
    'Live Master Sessions (Weekly)',
    'Traditional Certification',
    'Lifetime Sacred Access',
    'Elite Wisdom Community',
    'Expert Panel Guidance',
    'Continuous Updates',
    'Priority Support',
    'Advanced Practice Tools'
  ],
  
  ctaText: 'Begin Supreme Journey',
  ctaLink: 'https://courses.shikshanam.in/courses/All-Para-Courses-Bundle-65a12d4ce4b05ac7edb4876a',
  image: '/assets/para-vidya-complete.jpg'
}

const journeySteps = [
  { week: 'Beginning', title: 'The Supreme Commitment', description: 'Commit to complete education in Parā Vidya—supreme knowledge that transforms and liberates.', milestone: 'Total dedication established' },
  { week: 'Weeks 1-6', title: 'Philosophical Foundations', description: 'Master all six Darshanas systematically. Build complete understanding of orthodox philosophy.', milestone: 'Complete darshana mastery' },
  { week: 'Weeks 7-12', title: 'Upanishadic Wisdom', description: 'Ascend to supreme teachings. With philosophical foundation, Upanishadic wisdom reveals its depths.', milestone: 'Supreme wisdom accessed' },
  { week: 'Weeks 13-18', title: 'Sanskrit & Sacred Texts', description: 'Master the divine language, read original texts, access wisdom directly without intermediaries.', milestone: 'Direct text access achieved' },
  { week: 'Weeks 19-24', title: 'Complete Realization', description: 'Integrate all knowledge streams. You possess complete Parā Vidya—supreme knowledge embodied.', milestone: 'Total mastery realized' }
]

const metaphors = [
  { icon: Crown, title: 'The Complete Crown', concept: 'Parā Vidya Totality', description: 'Like a crown with all jewels intact, this collection provides complete knowledge—no gem missing, no wisdom omitted.', symbolism: 'The crown represents the completeness of supreme knowledge—total, comprehensive, lacking nothing' },
  { icon: Gem, title: 'Treasury of Wisdom', concept: 'Infinite Value', description: 'Like a treasury containing every precious gem, this collection holds every teaching of supreme value.', symbolism: 'The treasury represents the vast wealth of spiritual knowledge—accessible for lifetime, growing continuously' },
  { icon: Mountain, title: 'Summit Access', concept: 'Direct to Peak', description: 'Rather than climbing separately, you gain access to all paths to the summit—choose your journey, reach the peak.', symbolism: 'Multiple paths to the same supreme realization—freedom to explore completely' }
]

const symbols = [
  { icon: Gem, name: 'Parā Vidya', sanskritName: 'परा विद्या', meaning: 'Supreme Knowledge', significance: 'The highest knowledge that directly liberates—beyond worldly learning to spiritual realization' },
  { icon: Crown, name: 'Sampoorna', sanskritName: 'संपूर्ण', meaning: 'Complete', significance: 'Total, whole, lacking nothing—the state of having complete access to all supreme knowledge' },
  { icon: Infinity, name: 'Nitya', sanskritName: 'नित्य', meaning: 'Eternal', significance: 'Timeless wisdom and eternal access—knowledge that remains relevant across all time' },
  { icon: Award, name: 'Siddhi', sanskritName: 'सिद्धि', meaning: 'Accomplishment', significance: 'Mastery and realization—the fruits of complete study and dedicated practice' }
]

const storyPhases = [
  { label: 'Seeking', title: 'The Search for Complete Knowledge', description: 'You\'ve studied pieces—a course here, a teaching there. But you sense something is missing. What about complete education in the orthodox tradition?' },
  { label: 'Discovery', title: 'The Complete Collection', description: 'You discover Parā Vidya complete—every advanced teaching, every philosophical system, every Upanishadic text. Not fragments but totality.' },
  { label: 'Immersion', title: 'Deep into Supreme Knowledge', description: 'You immerse completely. Philosophy deepens into wisdom, study transforms into practice, knowledge ripens into realization. Everything connects.' },
  { label: 'Mastery', title: 'Complete Orthodox Education', description: 'You emerge transformed—having studied the complete orthodox tradition. You possess Parā Vidya, supreme knowledge. Not just learned but realized. This is what complete education yields.' }
]

export default function AllParaCoursesPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  return (
    <>
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-violet-50 via-fuchsia-50 to-purple-50 dark:from-violet-950 dark:via-fuchsia-950 to-purple-950">
        <div className="absolute inset-0 -z-10">
          <HydrationSafeMotion className="absolute inset-0" animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} transition={{ duration: 20, repeat: 999999, repeatType: 'reverse' }} style={{ backgroundImage: 'radial-gradient(circle, rgba(139,92,246,0.15) 2px, transparent 2px)', backgroundSize: '40px 40px' }}>
            <div />
          </HydrationSafeMotion>
          {[...Array(7)].map((_, i) => (
            <HydrationSafeMotion key={i} className="absolute w-96 h-96 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.2), transparent)', left: `${(i * 15) % 90}%`, top: `${(i * 20) % 80}%` }} animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 8 + i, repeat: 999999, delay: i }}>
              <div />
            </HydrationSafeMotion>
          ))}
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <StaggerContainer>
              <StaggerItem>
                <div className="flex items-center space-x-3 mb-6">
                  <HydrationSafeMotion className="w-14 h-14 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg" animate={{ boxShadow: ['0 0 20px rgba(168,85,247,0.5)', '0 0 80px rgba(168,85,247,1)', '0 0 20px rgba(168,85,247,0.5)'] }} transition={{ duration: 3, repeat: Infinity }}>
                    <Crown className="w-7 h-7 text-white" />
                  </HydrationSafeMotion>
                  <span className="bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/40 dark:to-purple-900/40 text-violet-900 dark:text-violet-200 px-4 py-2 rounded-full text-sm font-medium border border-violet-200 dark:border-violet-800">{packageData.category}</span>
                </div>
              </StaggerItem>

              <StaggerItem>
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 leading-tight">
                  <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-purple-600 dark:from-violet-400 dark:via-fuchsia-400 dark:to-purple-400 bg-clip-text text-transparent">{packageData.title}</span>
                </h1>
                <h2 className="text-3xl sm:text-4xl font-semibold bg-gradient-to-r from-fuchsia-600 to-violet-600 dark:from-fuchsia-400 dark:to-violet-400 bg-clip-text text-transparent mb-6">{packageData.englishTitle}</h2>
              </StaggerItem>

              <StaggerItem><p className="text-xl text-violet-600 dark:text-violet-400 mb-4 font-medium italic">{packageData.subtitle}</p></StaggerItem>
              <StaggerItem><p className="text-lg text-gray-700 dark:text-gray-200 mb-8 leading-relaxed">{packageData.description}</p></StaggerItem>

              <StaggerItem>
                <div className="flex flex-wrap gap-6 mb-8">
                  {[{ value: packageData.rating, label: 'Sacred Rating', icon: Star }, { value: packageData.students.toLocaleString(), label: 'Elite Scholars', icon: Users }, { value: packageData.duration, label: 'Journey Time', icon: Clock }].map((stat, i) => (
                    <HydrationSafeMotion key={i} whileHover={{ scale: 1.05 }} className="flex items-center space-x-3 bg-white dark:bg-slate-800 px-4 py-3 rounded-xl shadow-md border-2 border-violet-200 dark:border-violet-800">
                      <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-500 rounded-lg flex items-center justify-center"><stat.icon className="w-6 h-6 text-white" /></div>
                      <div><div className="text-xl font-bold text-gray-800 dark:text-gray-100">{stat.value}</div><div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div></div>
                    </HydrationSafeMotion>
                  ))}
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="bg-gradient-to-br from-white to-violet-50/50 dark:from-slate-800 dark:to-violet-900/20 border-2 border-violet-200 dark:border-violet-700 rounded-2xl p-6 mb-8 shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 line-through mb-1">{packageData.originalPrice}</div>
                      <div className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">{packageData.currentPrice}</div>
                      <div className="text-sm text-violet-600 dark:text-violet-400 font-medium mt-1">Supreme Offering: Save {packageData.savings} ({packageData.savingsPercent})</div>
                    </div>
                    <div className="text-right"><div className="text-sm text-gray-600 dark:text-gray-300 mb-1">For Dedicated Masters</div><div className="font-medium text-gray-800 dark:text-gray-100 text-sm">{packageData.level}</div></div>
                  </div>
                  <Button variant="primary" size="lg" href={packageData.ctaLink} icon={<ArrowRight className="w-6 h-6" />} className="w-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-purple-500 hover:from-violet-600 hover:via-fuchsia-600 hover:to-purple-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">{packageData.ctaText}</Button>
                </div>
              </StaggerItem>
            </StaggerContainer>

            <StaggerContainer>
              <StaggerItem>
                <div className="relative aspect-square max-w-md mx-auto">
                  <HydrationSafeMotion className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-gradient-to-br from-violet-300 via-fuchsia-300 to-purple-300 shadow-2xl flex items-center justify-center z-20" animate={{ scale: [1, 1.2, 1], boxShadow: ['0 0 60px rgba(168,85,247,0.8)', '0 0 120px rgba(168,85,247,1)', '0 0 60px rgba(168,85,247,0.8)'] }} transition={{ duration: 4, repeat: Infinity }}>
                    <Crown className="w-20 h-20 text-white" />
                  </HydrationSafeMotion>
                  {[...Array(8)].map((_, i) => {
                    const angle = (i * 45 * Math.PI) / 180; const radius = 170; const x = Math.cos(angle) * radius; const y = Math.sin(angle) * radius
                    return (
                      <HydrationSafeMotion key={i} className="absolute top-1/2 left-1/2" style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }} animate={{ y: [0, -15, 0], scale: [1, 1.2, 1] }} transition={{ duration: 3, repeat: 999999, delay: i * 0.3 }}>
                        <div className="w-12 h-12 bg-gradient-to-br from-violet-400 to-purple-400 rounded-full shadow-lg flex items-center justify-center"><Gem className="w-6 h-6 text-white" /></div>
                      </HydrationSafeMotion>
                    )
                  })}
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </section>

      <PhilosophicalTimeline steps={journeySteps} accentColor="#8b5cf6" theme="cosmic" />
      <VisualMetaphor title="The Complete Supreme Knowledge" subtitle="Understanding Parā Vidya as the totality of liberating wisdom" metaphors={metaphors} theme="cosmic" />

      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <HydrationSafeMotion initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">Supreme Knowledge Collection</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Complete access to all Parā Vidya—supreme knowledge for total liberation</p>
          </HydrationSafeMotion>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {packageData.includes.map((item, i) => (
              <HydrationSafeMotion key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.05 }} viewport={{ once: true }} whileHover={{ scale: 1.02 }} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md hover:shadow-lg border border-violet-200 dark:border-violet-800">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1"><CheckCircle className="w-5 h-5 text-white" /></div>
                  <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">{item}</h3>
                </div>
              </HydrationSafeMotion>
            ))}
          </div>
        </div>
      </section>

      <SacredSymbol title="Elements of Supreme Knowledge" subtitle="Each symbol represents the complete, eternal nature of Parā Vidya" symbols={symbols} theme="cosmic" />
      <ImmersiveStory title="The Path to Complete Mastery" introduction="Experience total transformation through complete access to supreme liberating knowledge" phases={storyPhases} conclusion="You are now a master of Parā Vidya—supreme knowledge embodied" theme="cosmic" />

      <section className="py-24 bg-gradient-to-br from-violet-900 via-fuchsia-900 to-purple-900 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <HydrationSafeMotion initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-12 shadow-2xl">
              <div className="flex items-center justify-center gap-4 mb-8">
                <HydrationSafeMotion className="w-20 h-20 bg-gradient-to-br from-violet-300 to-purple-300 rounded-full flex items-center justify-center shadow-2xl" animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: 999999, ease: 'linear' }}>
                  <Crown className="w-10 h-10 text-white" />
                </HydrationSafeMotion>
                <h3 className="text-4xl md:text-5xl font-bold text-white">Access Complete Parā Vidya</h3>
              </div>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">Begin the ultimate journey. Complete access to all supreme knowledge. Total education in the orthodox tradition.</p>
              <HydrationSafeMotion whileHover={{ scale: 1.05 }}>
                <Button variant="primary" size="lg" href={packageData.ctaLink} icon={<ArrowRight className="w-6 h-6" />} className="bg-gradient-to-r from-violet-100 to-purple-100 text-violet-900 font-bold py-5 px-12 rounded-2xl shadow-2xl text-xl">{packageData.ctaText}</Button>
              </HydrationSafeMotion>
              <div className="flex flex-wrap items-center justify-center gap-4 mt-8 text-white/80">
                {[{ icon: Infinity, label: 'Lifetime Access' }, { icon: Award, label: 'Complete Mastery' }, { icon: Crown, label: 'Supreme Knowledge' }].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white/10 px-5 py-3 rounded-full backdrop-blur-sm"><item.icon className="w-5 h-5" /><span className="font-medium">{item.label}</span></div>
                ))}
              </div>
            </div>
          </HydrationSafeMotion>
        </div>
      </section>
    </>
  )
}
