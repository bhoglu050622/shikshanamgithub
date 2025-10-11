'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { 
  BookOpen, 
  Users, 
  Clock, 
  Star, 
  ArrowRight,
  Sparkles,
  CheckCircle,
  User,
  HelpCircle,
  Book,
  Plus,
  Minus,
  Languages,
  Brain,
  Layers,
  Infinity,
  Award,
  Hexagon,
  Triangle,
  Circle
} from 'lucide-react'
import { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper'
import HydrationSafeMotion from '@/components/motion/HydrationSafeMotion'
import Button from '@/components/ui/button'
import PhilosophicalTimeline from '@/components/packages/PhilosophicalTimeline'
import VisualMetaphor from '@/components/packages/VisualMetaphor'
import SacredSymbol from '@/components/packages/SacredSymbol'
import ImmersiveStory from '@/components/packages/ImmersiveStory'

const packageData = {
  id: 'sanskrit-philosophies-bundle',
  title: 'संस्कृत + षड्दर्शन',
  englishTitle: 'Sanskrit & Six Philosophies: Complete Wisdom Path',
  subtitle: 'Language and Complete Philosophical Framework',
  description: 'Unite the sacred language with complete philosophical understanding. Master Sanskrit to access original texts, then explore all six classical Darshanas—Nyaya, Vaisheshika, Samkhya, Yoga, Mimamsa, Vedanta. From language to liberation, this is the complete traditional education.',
  originalPrice: '₹6,999',
  currentPrice: '₹4,299',
  savings: '₹2,700',
  savingsPercent: '39%',
  duration: '14-16 weeks',
  level: 'Beginner to Advanced',
  rating: 4.9,
  students: 1340,
  category: 'Complete Philosophy',
  instructor: 'Sanskrit & Darshana Masters',
  language: 'Hindi, Sanskrit & English',
  
  features: [
    { icon: Languages, title: 'Sanskrit Foundation', subtitle: 'Divine Language', description: 'Complete Sanskrit from alphabet to text reading—gateway to all philosophy' },
    { icon: Hexagon, title: 'Six Darshanas', subtitle: 'Complete Vision', description: 'All six classical philosophies—six perspectives revealing complete truth' },
    { icon: Brain, title: 'Integrated Understanding', subtitle: 'Systematic Wisdom', description: 'See how all philosophies complement each other in revealing reality' },
    { icon: Infinity, title: 'Direct Access', subtitle: 'Original Texts', description: 'Read philosophical texts in original Sanskrit—no dependence on translation' }
  ],
  
  includes: [
    '50+ Wisdom Transmissions (HD)',
    'Complete Sanskrit Course',
    'Six Darshanas Full Study',
    'Original Text Access',
    'PDF Sacred Materials',
    'Live Sessions (Weekly)',
    'Traditional Certificate',
    'Lifetime Access',
    'Complete Community',
    'Expert Panel Guidance',
    'Practice Workbooks',
    'Integration Workshops'
  ],
  
  curriculum: [
    { week: 'Weeks 1-4', title: 'Sanskrit Mastery', topics: ['Script & Grammar', 'Vocabulary Building', 'Text Reading', 'Philosophical Terms'], duration: '12 hours' },
    { week: 'Weeks 5-6', title: 'Nyaya & Vaisheshika', topics: ['Logic System', 'Atomic Theory', 'Valid Knowledge', 'Categories'], duration: '6 hours' },
    { week: 'Weeks 7-9', title: 'Samkhya & Yoga', topics: ['Consciousness-Matter', 'Eight Limbs', 'Liberation Path', 'Integration'], duration: '8 hours' },
    { week: 'Weeks 10-12', title: 'Mimamsa & Vedanta', topics: ['Ritual Philosophy', 'Non-Dual Reality', 'Brahman-Atman', 'Final Truth'], duration: '8 hours' },
    { week: 'Weeks 13-16', title: 'Complete Integration', topics: ['Six Views United', 'Comparative Study', 'Practical Wisdom', 'Living Philosophy'], duration: '10 hours' }
  ],
  
  testimonials: [
    { name: 'Dr. Priya Sharma', role: 'Sanskrit Scholar', rating: 5, text: 'Learning Sanskrit alongside the six Darshanas is brilliant. The language comes alive when used to study philosophy, and philosophy deepens when read in the original.', avatar: '/assets/testimonials/priya-sharma.jpg' },
    { name: 'Rajesh Kumar', role: 'Philosophy Student', rating: 5, text: 'This complete bundle transformed my understanding. Now I read philosophical texts directly in Sanskrit and comprehend all six viewpoints. Total education.', avatar: '/assets/testimonials/rajesh-kumar.jpg' },
    { name: 'Anjali Mehta', role: 'Educator', rating: 5, text: 'The integration of language and philosophy is exceptional. Six Darshanas provide complete understanding, Sanskrit provides direct access. Perfect combination.', avatar: '/assets/testimonials/anjali-mehta.jpg' }
  ],
  
  faqs: [
    { question: 'Why learn all six Darshanas?', answer: 'Each Darshana offers unique perspective on reality. Nyaya teaches logic, Vaisheshika reveals atomic structure, Samkhya explains consciousness-matter duality, Yoga provides practice methods, Mimamsa interprets scriptures, Vedanta reveals ultimate non-duality. Together, they provide complete philosophical understanding.' },
    { question: 'How does Sanskrit enhance philosophy study?', answer: 'Philosophical concepts often lose nuance in translation. Technical terms like "viveka," "vairagya," "kaivalya" carry precise meanings in Sanskrit. Learning the language allows direct access to original texts and deeper comprehension of subtle philosophical points.' },
    { question: 'Is this suitable for complete beginners?', answer: 'Yes! We start from Sanskrit basics and build systematically. The philosophies are introduced progressively. Whether you\'re new to Sanskrit or philosophy, the structured approach makes complete education accessible.' },
    { question: 'How are these integrated?', answer: 'Sanskrit provides the foundation—you learn language naturally through philosophical texts. As you study each Darshana, your Sanskrit improves. By the end, you read philosophy in original language and understand six complete systems. Language and wisdom unite.' },
    { question: 'What transformation can I expect?', answer: 'You\'ll gain the rare ability to read Sanskrit philosophical texts directly and comprehensive understanding of classical Indian philosophy. This complete education transforms how you think, reason, and understand reality itself—intellectual and spiritual transformation together.' }
  ],
  
  ctaText: 'Begin Complete Education',
  ctaLink: 'https://courses.shikshanam.in/courses/Sanskrit-and-Philosophy-Bundle-65a12b48e4b05ac7edb48765',
  image: '/assets/sanskrit-philosophies.jpg'
}

const journeySteps = [
  { week: 'Foundation', title: 'The Sacred Language Awakens', description: 'Begin with Sanskrit—the key that unlocks all philosophical texts. From alphabet to grammar, build your foundation.', milestone: 'Language foundation established' },
  { week: 'Weeks 1-4', title: 'Sanskrit Becomes Yours', description: 'Progress from letters to words to sentences. Sanskrit shifts from foreign to familiar—you\'re reading, understanding, accessing wisdom directly.', milestone: 'Reading proficiency achieved' },
  { week: 'Weeks 5-9', title: 'Four Darshanas Reveal Reality', description: 'Explore Nyaya (logic), Vaisheshika (atoms), Samkhya (duality), Yoga (practice)—reading terms in Sanskrit, understanding systematically.', milestone: 'Four systems mastered' },
  { week: 'Weeks 10-12', title: 'Final Darshanas Complete the Vision', description: 'Study Mimamsa (interpretation) and Vedanta (ultimate truth). The six perspectives unite into complete philosophical understanding.', milestone: 'Complete darshana knowledge' },
  { week: 'Weeks 13-16', title: 'Integration: Complete Education', description: 'You now read Sanskrit philosophical texts directly and understand six complete systems. Language and philosophy united—total traditional education achieved.', milestone: 'Complete mastery realized' }
]

const metaphors = [
  { icon: Languages, title: 'Key and Treasury', concept: 'Sanskrit as Gateway', description: 'Sanskrit is the key, philosophy is the treasury. Without the key, the treasure remains locked. With the key, infinite wisdom opens.', symbolism: 'The key represents language unlocking the vast treasury of philosophical wisdom accumulated over millennia' },
  { icon: Hexagon, title: 'Six Facets, One Gem', concept: 'Darshana Unity', description: 'Like a perfect gem with six facets, each Darshana reveals one angle of truth. Together, they show reality completely.', symbolism: 'The six-sided gem represents how different philosophical perspectives together reveal the complete nature of reality' },
  { icon: Brain, title: 'Roots and Branches', concept: 'Language-Philosophy Growth', description: 'Sanskrit is the root from which philosophical understanding branches. Strong roots allow extensive growth in all directions.', symbolism: 'The tree represents integrated learning—language roots nourishing philosophical branches bearing fruits of wisdom' }
]

const symbols = [
  { icon: Languages, name: 'Sanskrit', sanskritName: 'संस्कृत', meaning: 'Perfectly Constructed', significance: 'The divine language—precise, complete, capable of expressing the subtlest philosophical concepts' },
  { icon: Hexagon, name: 'Shad Darshana', sanskritName: 'षड्दर्शन', meaning: 'Six Viewpoints', significance: 'The six classical philosophies forming complete orthodox Indian philosophical tradition' },
  { icon: Book, name: 'Shastra', sanskritName: 'शास्त्र', meaning: 'Sacred Text', significance: 'Authoritative texts containing the philosophical systems—accessed directly through Sanskrit' },
  { icon: Infinity, name: 'Moksha', sanskritName: 'मोक्ष', meaning: 'Liberation', significance: 'The ultimate goal all six Darshanas point toward—freedom achieved through knowledge and practice' }
]

const storyPhases = [
  { label: 'Separation', title: 'Lost in Translation', description: 'You study philosophy through translations—always wondering what the original says, what nuances are lost. The six Darshanas remain separate, disconnected. Understanding feels incomplete.' },
  { label: 'Foundation', title: 'Sanskrit Unlocks', description: 'As Sanskrit becomes familiar, philosophical texts open. You read "viveka" and understand discrimination directly, "kaivalya" and grasp liberation\'s meaning. The language barrier dissolves.' },
  { label: 'Expansion', title: 'Six Perspectives Unfold', description: 'One by one, the Darshanas reveal themselves—each in original Sanskrit, each building on previous understanding. Logic, atoms, consciousness, practice, interpretation, ultimate truth—six complete systems.' },
  { label: 'Integration', title: 'Complete Philosophical Understanding', description: 'You see how all six Darshanas complement each other—not contradictory but comprehensive. You read any philosophical text in Sanskrit and understand it contextually. Language and wisdom are one in you. This is complete traditional education realized.' }
]

export default function SanskritPhilosophiesBundlePage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'curriculum', label: 'Curriculum', icon: Book },
    { id: 'testimonials', label: 'Transformations', icon: Star },
    { id: 'faq', label: 'Questions', icon: HelpCircle }
  ]

  return (
    <>
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-indigo-50 via-violet-50 to-purple-50 dark:from-indigo-950 dark:via-violet-950 to-purple-950">
        <div className="absolute inset-0 -z-10">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <HydrationSafeMotion
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              animate={{
                rotate: i * 60,
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotate: { duration: 0 },
                scale: { duration: 3, repeat: 999999, delay: i * 0.5 }
              }}
            >
              <div className={`w-${40 + i * 30} h-2 bg-gradient-to-r from-indigo-300/20 to-purple-300/20 dark:from-indigo-600/10 dark:to-purple-600/10 blur-sm`} />
            </HydrationSafeMotion>
          ))}
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <StaggerContainer>
              <StaggerItem>
                <div className="flex items-center space-x-3 mb-6">
                  <HydrationSafeMotion
                    className="w-14 h-14 bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: 999999, ease: 'linear' }}
                  >
                    <Hexagon className="w-7 h-7 text-white" />
                  </HydrationSafeMotion>
                  <span className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 text-indigo-900 dark:text-indigo-200 px-4 py-2 rounded-full text-sm font-medium border border-indigo-200 dark:border-indigo-800">
                    {packageData.category}
                  </span>
                </div>
              </StaggerItem>

              <StaggerItem>
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 leading-tight">
                  <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 dark:from-indigo-400 dark:via-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
                  {packageData.title}
                  </span>
                </h1>
                <h2 className="text-3xl sm:text-4xl font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent mb-6">
                  {packageData.englishTitle}
                </h2>
              </StaggerItem>

              <StaggerItem>
                <p className="text-xl text-violet-600 dark:text-violet-400 mb-4 font-medium italic">
                  {packageData.subtitle}
                </p>
              </StaggerItem>

              <StaggerItem>
                <p className="text-lg text-gray-700 dark:text-gray-200 mb-8 leading-relaxed">
                  {packageData.description}
                </p>
              </StaggerItem>

              <StaggerItem>
                <div className="flex flex-wrap gap-6 mb-8">
                  {[
                    { value: packageData.rating, label: 'Sacred Rating', icon: Star, color: 'from-indigo-500 to-indigo-600' },
                    { value: packageData.students.toLocaleString(), label: 'Fellow Scholars', icon: Users, color: 'from-violet-500 to-violet-600' },
                    { value: packageData.duration, label: 'Journey Time', icon: Clock, color: 'from-purple-500 to-purple-600' }
                  ].map((stat, i) => (
                    <HydrationSafeMotion key={i} whileHover={{ scale: 1.05 }} className="flex items-center space-x-3 bg-white dark:bg-slate-800 px-4 py-3 rounded-xl shadow-md border-2 border-indigo-200 dark:border-indigo-800">
                      <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                        <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <div className="text-xl font-bold text-gray-800 dark:text-gray-100">{stat.value}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                    </div>
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
                    <div className="text-right">
                      <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">For All Levels</div>
                      <div className="font-medium text-gray-800 dark:text-gray-100 text-sm">{packageData.level}</div>
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    size="lg"
                    href={packageData.ctaLink}
                    icon={<ArrowRight className="w-6 h-6" />}
                    className="w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 hover:from-indigo-600 hover:via-violet-600 hover:to-purple-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                  >
                    {packageData.ctaText}
                  </Button>
                </div>
              </StaggerItem>
            </StaggerContainer>

            <StaggerContainer>
              <StaggerItem>
                <div className="relative aspect-square max-w-md mx-auto">
                  <HydrationSafeMotion
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-indigo-400 via-violet-400 to-purple-400 shadow-2xl flex items-center justify-center z-20"
                    animate={{ scale: [1, 1.1, 1], boxShadow: ['0 0 40px rgba(99,102,241,0.6)', '0 0 80px rgba(139,92,246,0.8)', '0 0 40px rgba(99,102,241,0.6)'] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Hexagon className="w-16 h-16 text-white" />
                  </HydrationSafeMotion>

                  {/* Six Darshanas positioned hexagonally */}
                  {['न्याय', 'वैशेषिक', 'सांख्य', 'योग', 'मीमांसा', 'वेदान्त'].map((name, i) => {
                    const angle = (i * 60 * Math.PI) / 180
                    const radius = 160
                    const x = Math.cos(angle) * radius
                    const y = Math.sin(angle) * radius
                    
                    return (
                      <HydrationSafeMotion
                        key={i}
                        className="absolute top-1/2 left-1/2 z-30"
                        style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 3, repeat: 999999, delay: i * 0.5 }}
                        whileHover={{ scale: 1.2 }}
                      >
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-3 rounded-xl shadow-lg text-center w-20">
                          <span className="text-sm text-white font-bold" style={{ fontFamily: 'serif' }}>{name}</span>
                        </div>
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
      <VisualMetaphor title="Language and Philosophy United" subtitle="Understanding how Sanskrit and six Darshanas form complete traditional education" metaphors={metaphors} theme="cosmic" />

      {/* Features Grid */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <HydrationSafeMotion initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">Complete Traditional Education</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Sanskrit to access, six Darshanas to understand—the complete orthodox philosophical tradition</p>
          </HydrationSafeMotion>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {packageData.features.map((feature, i) => {
              const Icon = feature.icon
              const gradients = ['from-indigo-500 to-indigo-600', 'from-violet-500 to-violet-600', 'from-purple-500 to-purple-600', 'from-indigo-500 via-violet-500 to-purple-500']
              return (
                <HydrationSafeMotion key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }} viewport={{ once: true }} whileHover={{ y: -8 }} className="group">
                  <div className="bg-gradient-to-br from-white to-indigo-50/30 dark:from-slate-800 dark:to-indigo-900/10 rounded-2xl p-6 h-full shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-indigo-200 dark:border-indigo-800">
                    <HydrationSafeMotion className={`w-16 h-16 bg-gradient-to-br ${gradients[i]} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300 mx-auto`} whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                      <Icon className="w-8 h-8 text-white" />
                    </HydrationSafeMotion>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 text-center">{feature.title}</h3>
                    <div className={`text-base font-semibold bg-gradient-to-r ${gradients[i]} bg-clip-text text-transparent mb-3 text-center`}>{feature.subtitle}</div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm text-center">{feature.description}</p>
                </div>
              </HydrationSafeMotion>
              )
            })}
          </div>
        </div>
      </section>

      <SacredSymbol title="Sacred Elements of Complete Education" subtitle="Language and philosophy united in the traditional path of learning" symbols={symbols} theme="cosmic" />

      {/* What's Included */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50/20 dark:from-slate-900 dark:to-indigo-900/10">
        <div className="container mx-auto px-4">
          <HydrationSafeMotion initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">Your Complete Education Bundle</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Everything for complete mastery of Sanskrit and six classical philosophies</p>
          </HydrationSafeMotion>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {packageData.includes.map((item, i) => (
              <HydrationSafeMotion key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.05 }} viewport={{ once: true }} whileHover={{ scale: 1.02 }} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-indigo-200 dark:border-indigo-800">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">{item}</h3>
                </div>
              </HydrationSafeMotion>
            ))}
          </div>
        </div>
      </section>

      <ImmersiveStory title="From Fragmented to Complete" introduction="Experience the journey from scattered knowledge to complete traditional education" phases={storyPhases} conclusion="You are now a complete scholar—Sanskrit and six Darshanas united in you" theme="cosmic" />

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-indigo-900 via-violet-900 to-purple-900 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <HydrationSafeMotion initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-12 shadow-2xl">
                <div className="flex items-center justify-center gap-4 mb-8">
                <HydrationSafeMotion className="w-20 h-20 bg-gradient-to-br from-indigo-300 to-purple-300 rounded-xl flex items-center justify-center shadow-2xl" animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: 999999, ease: 'linear' }}>
                  <Hexagon className="w-10 h-10 text-white" />
                  </HydrationSafeMotion>
                <h3 className="text-4xl md:text-5xl font-bold text-white">Begin Complete Education</h3>
                </div>
                
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                Start the complete traditional path. Master Sanskrit, explore six Darshanas, and achieve the rare accomplishment of complete orthodox philosophical education.
              </p>
              
              <HydrationSafeMotion whileHover={{ scale: 1.05 }}>
                    <Button
                      variant="primary"
                      size="lg"
                      href={packageData.ctaLink}
                      icon={<ArrowRight className="w-6 h-6" />}
                  className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-900 font-bold py-5 px-12 rounded-2xl shadow-2xl text-xl"
                    >
                      {packageData.ctaText}
                    </Button>
                  </HydrationSafeMotion>
                  
              <div className="flex flex-wrap items-center justify-center gap-4 mt-8 text-white/80">
                <div className="flex items-center gap-2 bg-white/10 px-5 py-3 rounded-full backdrop-blur-sm">
                  <Infinity className="w-5 h-5" />
                      <span className="font-medium">Lifetime Access</span>
                    </div>
                <div className="flex items-center gap-2 bg-white/10 px-5 py-3 rounded-full backdrop-blur-sm">
                  <Award className="w-5 h-5" />
                  <span className="font-medium">Traditional Certificate</span>
                </div>
              </div>
            </div>
          </HydrationSafeMotion>
        </div>
      </section>
    </>
  )
}
