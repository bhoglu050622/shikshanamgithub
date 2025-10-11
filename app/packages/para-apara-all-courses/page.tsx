'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { 
  BookOpen, Users, Clock, Star, ArrowRight, CheckCircle, User, HelpCircle, Book, Plus, Minus,
  Sparkles, Crown, Infinity, Award, Zap, Layers, Globe, Mountain
} from 'lucide-react'
import { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper'
import HydrationSafeMotion from '@/components/motion/HydrationSafeMotion'
import Button from '@/components/ui/button'
import PhilosophicalTimeline from '@/components/packages/PhilosophicalTimeline'
import VisualMetaphor from '@/components/packages/VisualMetaphor'
import SacredSymbol from '@/components/packages/SacredSymbol'
import ImmersiveStory from '@/components/packages/ImmersiveStory'

const packageData = {
  id: 'para-apara-all-courses',
  title: 'परा-अपरा संपूर्ण पाठ्यक्रम',
  englishTitle: 'Complete Knowledge: Parā & Aparā United',
  subtitle: 'Total Education - Supreme and Worldly Wisdom',
  description: 'Access everything—both Parā Vidya (supreme liberating knowledge) and Aparā Vidya (worldly skillful knowledge). From Sanskrit to philosophy, Upanishads to practical life skills, meditation to communication—this is total, complete education as envisioned in tradition.',
  originalPrice: '₹24,999',
  currentPrice: '₹14,999',
  savings: '₹10,000',
  savingsPercent: '40%',
  duration: '24+ weeks',
  level: 'All Levels',
  rating: 5.0,
  students: 670,
  category: 'Total Knowledge Collection',
  instructor: 'Complete Teaching Council',
  language: 'Hindi, Sanskrit & English',
  
  features: [
    { icon: Crown, title: 'Parā Vidya Complete', subtitle: 'Supreme Knowledge', description: 'All advanced philosophy, Upanishads, meditation—knowledge that liberates' },
    { icon: Globe, title: 'Aparā Vidya Complete', subtitle: 'Skillful Knowledge', description: 'Practical wisdom, life skills, communication—knowledge for successful living' },
    { icon: Layers, title: 'Total Integration', subtitle: 'Heaven and Earth United', description: 'Both worldly success and spiritual liberation—complete human development' },
    { icon: Infinity, title: 'Lifetime Learning', subtitle: 'Eternal Growth', description: 'Continuous access, regular updates—grow spiritually and practically forever' }
  ],
  
  includes: [
    'Complete Parā Vidya Library',
    'Complete Aparā Vidya Library',
    '150+ Total Courses',
    'All Philosophy Systems',
    'All Upanishadic Texts',
    'Complete Sanskrit Program',
    'Life Skills & Practical Wisdom',
    'Advanced Meditation Practices',
    'Live Master Sessions (Weekly)',
    'Dual Certification',
    'Lifetime Sacred Access',
    'Elite Complete Community',
    'Full Expert Panel Access',
    'Priority Support',
    'Continuous Updates Forever'
  ],
  
  ctaText: 'Access Total Knowledge',
  ctaLink: 'https://courses.shikshanam.in/courses/Para-Apara-All-Courses-65a12dcde4b05ac7edb4876b',
  image: '/assets/para-apara-complete.jpg'
}

const journeySteps = [
  { week: 'Commitment', title: 'Total Education Begins', description: 'Commit to complete human development—both spiritual liberation and worldly excellence. Total knowledge journey starts.', milestone: 'Complete commitment made' },
  { week: 'Foundation', title: 'Building Both Foundations', description: 'Establish foundations in both domains—philosophical understanding and practical skills growing together.', milestone: 'Dual foundations established' },
  { week: 'Development', title: 'Supreme and Skillful United', description: 'Experience how Parā and Aparā support each other. Spiritual depth enhances worldly action, practical wisdom grounds spiritual practice.', milestone: 'Integration recognized' },
  { week: 'Mastery', title: 'Complete Human Flourishing', description: 'You embody total education—spiritually liberated yet skillfully engaged. Heaven and earth united in one complete being.', milestone: 'Total mastery achieved' }
]

const metaphors = [
  { icon: Layers, title: 'Two Wings, One Flight', concept: 'Parā & Aparā Unity', description: 'Like a bird needs both wings to fly, complete human flourishing requires both supreme knowledge (Parā) and skillful knowledge (Aparā).', symbolism: 'The two wings represent the necessity of both spiritual and practical knowledge for complete life' },
  { icon: Mountain, title: 'Earth and Summit', concept: 'Grounded Yet Elevated', description: 'Firm roots in worldly competence (Aparā) allow safe ascent to spiritual heights (Parā). Both earth and summit are necessary.', symbolism: 'Complete education means being grounded in practical wisdom while reaching for supreme realization' },
  { icon: Globe, title: 'Inner and Outer Mastery', concept: 'Complete Development', description: 'Outer success through Aparā Vidya, inner liberation through Parā Vidya—together creating the complete, fulfilled human being.', symbolism: 'The sphere represents wholeness—inner and outer, spiritual and material, supreme and practical united' }
]

const symbols = [
  { icon: Crown, name: 'Parā Vidya', sanskritName: 'परा विद्या', meaning: 'Supreme Knowledge', significance: 'Knowledge of the eternal—that which leads directly to liberation and self-realization' },
  { icon: Globe, name: 'Aparā Vidya', sanskritName: 'अपरा विद्या', meaning: 'Worldly Knowledge', significance: 'Skillful knowledge for successful living—arts, sciences, practical wisdom for worldly excellence' },
  { icon: Layers, name: 'Sampoorna Vidya', sanskritName: 'संपूर्ण विद्या', meaning: 'Complete Knowledge', significance: 'Total education—both supreme and practical, spiritual and worldly, united for complete human flourishing' },
  { icon: Infinity, name: 'Nitya Adhyayana', sanskritName: 'नित्य अध्ययन', meaning: 'Eternal Study', significance: 'Lifelong learning—continuous access to growing wisdom, eternal student of life\'s complete curriculum' }
]

const storyPhases = [
  { label: 'Division', title: 'False Dichotomy', description: 'You believed you must choose—either spiritual renunciate or worldly achiever. Either Parā Vidya or Aparā Vidya. The split created incompleteness.' },
  { label: 'Revelation', title: 'Both Wings Needed', description: 'You discover the tradition never demanded such choice. The rishis were both spiritually realized and practically wise. Parā and Aparā are meant to unite, not oppose.' },
  { label: 'Integration', title: 'Complete Education Unfolds', description: 'You study philosophy and communication, meditation and life skills, Upanishads and practical wisdom. Each enhances the other. Your development becomes total.' },
  { label: 'Wholeness', title: 'The Complete Human', description: 'You emerge whole—spiritually liberated yet practically effective, deeply meditative yet skillfully engaged, understanding supreme reality while navigating worldly life masterfully. This is complete education creating complete beings. This is what tradition always envisioned—not fragments but totality.' }
]

export default function ParaAparaAllCoursesPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  return (
    <>
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-sky-50 via-emerald-50 to-violet-50 dark:from-sky-950 dark:via-emerald-950 to-violet-950">
        <div className="absolute inset-0 -z-10">
          <HydrationSafeMotion className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-emerald-200/20 to-transparent dark:from-emerald-800/20" animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity }}>
            <div />
          </HydrationSafeMotion>
          <HydrationSafeMotion className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-violet-200/20 to-transparent dark:from-violet-800/20" animate={{ opacity: [0.6, 0.3, 0.6] }} transition={{ duration: 4, repeat: 999999, delay: 2 }}>
            <div />
          </HydrationSafeMotion>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <StaggerContainer>
              <StaggerItem>
                <div className="flex items-center space-x-3 mb-6">
                  <HydrationSafeMotion className="w-14 h-14 bg-gradient-to-br from-emerald-500 via-sky-500 to-violet-500 rounded-xl flex items-center justify-center shadow-lg" animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: 999999, ease: 'linear' }}>
                    <Layers className="w-7 h-7 text-white" />
                  </HydrationSafeMotion>
                  <span className="bg-gradient-to-r from-emerald-100 via-sky-100 to-violet-100 dark:from-emerald-900/40 dark:via-sky-900/40 dark:to-violet-900/40 text-sky-900 dark:text-sky-200 px-4 py-2 rounded-full text-sm font-medium border border-sky-200 dark:border-sky-800">{packageData.category}</span>
                </div>
              </StaggerItem>

              <StaggerItem>
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 leading-tight">
                  <span className="bg-gradient-to-r from-emerald-600 via-sky-600 to-violet-600 dark:from-emerald-400 dark:via-sky-400 dark:to-violet-400 bg-clip-text text-transparent">{packageData.title}</span>
                </h1>
                <h2 className="text-3xl sm:text-4xl font-semibold bg-gradient-to-r from-sky-600 to-emerald-600 dark:from-sky-400 dark:to-emerald-400 bg-clip-text text-transparent mb-6">{packageData.englishTitle}</h2>
              </StaggerItem>

              <StaggerItem><p className="text-xl text-sky-600 dark:text-sky-400 mb-4 font-medium italic">{packageData.subtitle}</p></StaggerItem>
              <StaggerItem><p className="text-lg text-gray-700 dark:text-gray-200 mb-8 leading-relaxed">{packageData.description}</p></StaggerItem>

              <StaggerItem>
                <div className="flex flex-wrap gap-6 mb-8">
                  {[{ value: packageData.rating, label: 'Perfect Rating', icon: Star }, { value: packageData.students.toLocaleString(), label: 'Complete Scholars', icon: Users }, { value: packageData.duration, label: 'Journey Time', icon: Clock }].map((stat, i) => (
                    <HydrationSafeMotion key={i} whileHover={{ scale: 1.05 }} className="flex items-center space-x-3 bg-white dark:bg-slate-800 px-4 py-3 rounded-xl shadow-md border-2 border-sky-200 dark:border-sky-800">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-sky-500 to-violet-500 rounded-lg flex items-center justify-center"><stat.icon className="w-6 h-6 text-white" /></div>
                      <div><div className="text-xl font-bold text-gray-800 dark:text-gray-100">{stat.value}</div><div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div></div>
                    </HydrationSafeMotion>
                  ))}
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="bg-gradient-to-br from-white to-sky-50/50 dark:from-slate-800 dark:to-sky-900/20 border-2 border-sky-200 dark:border-sky-700 rounded-2xl p-6 mb-8 shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 line-through mb-1">{packageData.originalPrice}</div>
                      <div className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-sky-600 to-violet-600 dark:from-emerald-400 dark:via-sky-400 dark:to-violet-400 bg-clip-text text-transparent">{packageData.currentPrice}</div>
                      <div className="text-sm text-sky-600 dark:text-sky-400 font-medium mt-1">Ultimate Offering: Save {packageData.savings} ({packageData.savingsPercent})</div>
                    </div>
                    <div className="text-right"><div className="text-sm text-gray-600 dark:text-gray-300 mb-1">For All Seekers</div><div className="font-medium text-gray-800 dark:text-gray-100 text-sm">{packageData.level}</div></div>
                  </div>
                  <Button variant="primary" size="lg" href={packageData.ctaLink} icon={<ArrowRight className="w-6 h-6" />} className="w-full bg-gradient-to-r from-emerald-500 via-sky-500 to-violet-500 hover:from-emerald-600 hover:via-sky-600 hover:to-violet-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">{packageData.ctaText}</Button>
                </div>
              </StaggerItem>
            </StaggerContainer>

            <StaggerContainer>
              <StaggerItem>
                <div className="relative aspect-square max-w-md mx-auto">
                  <HydrationSafeMotion className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-gradient-to-br from-emerald-300 via-sky-300 to-violet-300 shadow-2xl flex items-center justify-center z-20" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 4, repeat: Infinity }}>
                    <Layers className="w-20 h-20 text-white" />
                  </HydrationSafeMotion>
                  {/* Two halves representing Parā and Aparā */}
                  <HydrationSafeMotion className="absolute top-0 left-0 w-full h-1/2 rounded-t-full border-4 border-violet-400/30" animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 3, repeat: Infinity }}>
                    <div />
                  </HydrationSafeMotion>
                  <HydrationSafeMotion className="absolute bottom-0 left-0 w-full h-1/2 rounded-b-full border-4 border-emerald-400/30" animate={{ opacity: [0.7, 0.3, 0.7] }} transition={{ duration: 3, repeat: Infinity }}>
                    <div />
                  </HydrationSafeMotion>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </section>

      <PhilosophicalTimeline steps={journeySteps} accentColor="#0ea5e9" theme="balanced" />
      <VisualMetaphor title="Heaven and Earth United" subtitle="Understanding total education as union of supreme and skillful knowledge" metaphors={metaphors} theme="balanced" />

      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <HydrationSafeMotion initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">Total Knowledge Access</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Everything for complete human development—spiritual and practical united</p>
          </HydrationSafeMotion>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {packageData.includes.map((item, i) => (
              <HydrationSafeMotion key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.05 }} viewport={{ once: true }} whileHover={{ scale: 1.02 }} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md hover:shadow-lg border border-sky-200 dark:border-sky-800">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 via-sky-500 to-violet-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1"><CheckCircle className="w-5 h-5 text-white" /></div>
                  <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">{item}</h3>
                </div>
              </HydrationSafeMotion>
            ))}
          </div>
        </div>
      </section>

      <SacredSymbol title="Elements of Total Knowledge" subtitle="Parā and Aparā—supreme and skillful wisdom united for complete human flourishing" symbols={symbols} theme="balanced" />
      <ImmersiveStory title="The Complete Human Journey" introduction="Experience total transformation—spiritually liberated and practically masterful" phases={storyPhases} conclusion="You are complete—Parā and Aparā united in living wisdom" theme="balanced" />

      <section className="py-24 bg-gradient-to-br from-emerald-900 via-sky-900 to-violet-900 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <HydrationSafeMotion initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-12 shadow-2xl">
                <div className="flex items-center justify-center gap-4 mb-8">
                <HydrationSafeMotion className="w-20 h-20 bg-gradient-to-br from-emerald-300 via-sky-300 to-violet-300 rounded-xl flex items-center justify-center shadow-2xl" animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: 999999, ease: 'linear' }}>
                  <Layers className="w-10 h-10 text-white" />
                </HydrationSafeMotion>
                <h3 className="text-4xl md:text-5xl font-bold text-white">Access Total Knowledge</h3>
                    </div>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">Begin complete human development. Parā and Aparā united. Total education for total transformation.</p>
              <HydrationSafeMotion whileHover={{ scale: 1.05 }}>
                <Button variant="primary" size="lg" href={packageData.ctaLink} icon={<ArrowRight className="w-6 h-6" />} className="bg-gradient-to-r from-emerald-100 via-sky-100 to-violet-100 text-sky-900 font-bold py-5 px-12 rounded-2xl shadow-2xl text-xl">{packageData.ctaText}</Button>
                  </HydrationSafeMotion>
              <div className="flex flex-wrap items-center justify-center gap-4 mt-8 text-white/80">
                {[{ icon: Infinity, label: 'Lifetime Access' }, { icon: Award, label: 'Dual Mastery' }, { icon: Layers, label: 'Total Knowledge' }].map((item, i) => (
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
