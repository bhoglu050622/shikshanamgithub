'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, MessageCircle, Users, ChevronDown, ChevronUp, ArrowRight, CheckCircle, Lock, Unlock, Star, Trophy, Sparkles, Zap } from 'lucide-react'

const learningStages = [
  {
    id: 1,
    title: "Basic Sanskrit Grammar",
    titleDevanagari: "संस्कृत भाषा प्रज्ञा",
    subtitle: "Build a rock-solid foundation",
    description: "Master the fundamentals of Sanskrit grammar with structured lessons",
    badges: ["📚 PDFs", "🎧 Audio drills", "🧩 Quizzes"],
    cta: "Start Module (Free Preview)",
    icon: BookOpen,
    gradient: "from-teal-primary via-teal-primary/90 to-teal-primary/70",
    accent: "teal-primary",
    lessons: [
      "Introduction to Devanagari script",
      "Basic vowels and consonants", 
      "Sandhi rules and combinations",
      "Noun declensions (vibhakti)",
      "Verb conjugations",
      "Sentence structure basics"
    ],
    backgroundBand: "bg-light-cyan",
    progress: 0,
    isUnlocked: true,
    isCompleted: false,
    xpReward: 150,
    achievements: ["First Steps", "Script Master", "Grammar Guru"],
    estimatedTime: "4-6 weeks"
  },
  {
    id: 2,
    title: "Basic Sanskrit Sambhāṣaṇam",
    titleDevanagari: "संस्कृत संभाषणम्",
    subtitle: "Daily phrases, greetings, introductions",
    description: "Develop conversational skills with live practice sessions",
    badges: ["Live Sessions", "Practice Pods", "Mentor Feedback"],
    cta: "Join Practice Cohort",
    icon: MessageCircle,
    gradient: "from-purple-primary via-purple-primary/90 to-purple-primary/70",
    accent: "purple-primary",
    lessons: [
      "Greetings and introductions",
      "Common daily phrases",
      "Asking questions",
      "Expressing needs and wants",
      "Numbers and time",
      "Family and relationships"
    ],
    backgroundBand: "bg-lavender-primary",
    progress: 0,
    isUnlocked: false,
    isCompleted: false,
    xpReward: 200,
    achievements: ["Conversation Starter", "Daily Speaker", "Social Sanskrit"],
    estimatedTime: "6-8 weeks"
  },
  {
    id: 3,
    title: "Live Speaking Practice",
    titleDevanagari: "जीवन्त संस्कृतम्",
    subtitle: "Small groups + mentor feedback + recordings",
    description: "Advanced conversations and spiritual discourse",
    badges: ["Small Groups", "Recordings", "Advanced"],
    cta: "Book Your Slot",
    icon: Users,
    gradient: "from-coral-primary via-coral-primary/90 to-coral-primary/70",
    accent: "coral-primary",
    lessons: [
      "Advanced conversation topics",
      "Spiritual and philosophical discussions",
      "Classical text recitation",
      "Debate and argumentation",
      "Poetry and literature",
      "Teaching others Sanskrit"
    ],
    backgroundBand: "bg-light-cyan",
    progress: 0,
    isUnlocked: false,
    isCompleted: false,
    xpReward: 300,
    achievements: ["Master Speaker", "Spiritual Scholar", "Sanskrit Teacher"],
    estimatedTime: "8-12 weeks"
  }
]

// Arrow Component for connecting cards
function ArrowConnector({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className="hidden lg:flex items-center justify-center mx-4"
    >
      <div className="relative">
        {/* Arrow line */}
        <div className="w-16 h-0.5 bg-gradient-to-r from-teal-primary to-purple-primary"></div>
        {/* Arrow head */}
        <motion.div
          initial={{ x: -8, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.3 }}
          className="absolute right-0 top-1/2 transform -translate-y-1/2"
        >
          <ArrowRight className="w-4 h-4 text-purple-primary" />
        </motion.div>
        {/* Animated dots */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            delay: delay + 0.5
          }}
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-teal-primary rounded-full"
        />
      </div>
    </motion.div>
  )
}

interface StageCardProps {
  stage: typeof learningStages[0]
  index: number
  isExpanded: boolean
  onToggle: () => void
  isActive?: boolean
  onUnlock?: () => void
}

function StageCard({ stage, index, isExpanded, onToggle, isActive = false, onUnlock }: StageCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        type: "spring",
        stiffness: 100
      }}
      viewport={{ once: true }}
      whileHover={{ 
        y: stage.isUnlocked ? -8 : 0,
        transition: { duration: 0.3 }
      }}
      className={`relative group ${!stage.isUnlocked ? 'opacity-60' : ''}`}
    >
      {/* Enhanced Card Design */}
      <div className={`relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 transition-all duration-500 overflow-hidden ${
        stage.isUnlocked ? 'hover:shadow-2xl' : 'cursor-not-allowed'
      } ${stage.isCompleted ? 'ring-4 ring-green-400/30' : ''}`}>
        
        {/* Lock Overlay for locked stages */}
        {!stage.isUnlocked && (
          <div className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm rounded-3xl flex items-center justify-center z-20">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-white/90 backdrop-blur-md rounded-2xl p-6 text-center shadow-xl"
            >
              <Lock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="font-bold text-gray-700 mb-2">Locked</h3>
              <p className="text-sm text-gray-600 mb-4">Complete previous stage to unlock</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onUnlock}
                className="bg-gradient-to-r from-golden-olive to-deep-maroon text-white px-4 py-2 rounded-xl text-sm font-semibold"
              >
                Unlock Now
              </motion.button>
            </motion.div>
          </div>
        )}

        {/* Completion Badge */}
        {stage.isCompleted && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-3 -left-3 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg z-10"
          >
            <CheckCircle className="w-6 h-6 text-white" />
          </motion.div>
        )}

        {/* Gradient Background Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${stage.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
        
        {/* Progress Indicator */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100 rounded-t-3xl overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${stage.gradient}`}
            initial={{ width: 0 }}
            whileInView={{ width: `${stage.progress}%` }}
            transition={{ duration: 1, delay: index * 0.3 + 0.5 }}
            viewport={{ once: true }}
          />
        </div>

        {/* Enhanced Stage Number Badge */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
          viewport={{ once: true }}
          className={`absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br ${stage.gradient} rounded-full flex items-center justify-center shadow-lg ${
            stage.isCompleted ? 'ring-4 ring-green-400/30' : ''
          }`}
        >
          {stage.isCompleted ? (
            <CheckCircle className="w-6 h-6 text-white" />
          ) : (
            <span className="text-white font-bold text-lg">{index + 1}</span>
          )}
        </motion.div>

        {/* Icon with Enhanced Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          whileInView={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          viewport={{ once: true }}
          whileHover={{ 
            scale: 1.1, 
            rotate: 5,
            transition: { duration: 0.3 }
          }}
          className={`w-16 h-16 bg-gradient-to-br ${stage.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
        >
          <stage.icon className="w-8 h-8 text-white" />
        </motion.div>
        
        {/* Content */}
        <div className="relative z-10">
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-dark-text mb-2"
          >
            {stage.title}
          </motion.h3>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }}
            viewport={{ once: true }}
            className="text-sm text-purple-primary mb-4 font-devanagari"
          >
            {stage.titleDevanagari}
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
            viewport={{ once: true }}
            className="text-dark-text mb-2 text-sm font-semibold"
          >
            {stage.subtitle}
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
            viewport={{ once: true }}
            className="text-muted-gray mb-6 text-sm leading-relaxed"
          >
            {stage.description}
          </motion.p>
          
          {/* Enhanced Badges */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2 mb-4"
          >
            {stage.badges.map((badge, badgeIndex) => (
              <motion.span 
                key={badgeIndex}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.2 + 0.5 + badgeIndex * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className={`bg-gradient-to-r ${stage.gradient} bg-opacity-10 text-${stage.accent} px-4 py-2 rounded-full text-xs font-medium border border-current border-opacity-20`}
              >
                {badge}
              </motion.span>
            ))}
          </motion.div>

          {/* XP and Time Information */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-4 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl"
          >
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-semibold text-gray-700">{stage.xpReward} XP</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-gray-600">{stage.estimatedTime}</span>
            </div>
          </motion.div>

          {/* Achievements Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.7 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <Trophy className="w-4 h-4 text-yellow-500 mr-2" />
              Achievements
            </h4>
            <div className="flex flex-wrap gap-1">
              {stage.achievements.slice(0, 2).map((achievement, achievementIndex) => (
                <motion.span 
                  key={achievementIndex}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.2 + 0.7 + achievementIndex * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium"
                >
                  {achievement}
                </motion.span>
              ))}
              {stage.achievements.length > 2 && (
                <span className="text-xs text-gray-500 px-2 py-1">
                  +{stage.achievements.length - 2} more
                </span>
              )}
            </div>
          </motion.div>
          
          {/* Enhanced Toggle Button */}
          <motion.button 
            onClick={onToggle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 text-teal-primary hover:text-teal-primary/80 text-sm font-medium mb-6 group/btn"
          >
            <span>View Lessons</span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </motion.button>
          
          {/* Enhanced Lessons Panel */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="mb-6 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-light-cyan to-lavender-primary rounded-2xl p-6 border border-gray-100">
                  <h4 className="font-bold text-dark-text mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 text-teal-primary mr-2" />
                    Lessons in this stage:
                  </h4>
                  <div className="grid gap-3">
                    {stage.lessons.map((lesson, lessonIndex) => (
                      <motion.div
                        key={lessonIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: lessonIndex * 0.1 }}
                        className="flex items-center space-x-3 p-3 bg-white/50 rounded-xl hover:bg-white/80 transition-colors"
                      >
                        <div className={`w-2 h-2 bg-gradient-to-r ${stage.gradient} rounded-full`}></div>
                        <span className="text-sm text-dark-text font-medium">{lesson}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Enhanced CTA Button */}
          <motion.button 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full bg-gradient-to-r ${stage.gradient} text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2`}
          >
            <span>{stage.cta}</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default function SequentialPath() {
  const [expandedStage, setExpandedStage] = useState<number | null>(null)
  const [stages, setStages] = useState(learningStages)
  const [showUnlockAnimation, setShowUnlockAnimation] = useState<number | null>(null)

  const handleToggle = (stageId: number) => {
    setExpandedStage(expandedStage === stageId ? null : stageId)
  }

  const handleUnlock = (stageId: number) => {
    setStages(prev => prev.map(stage => 
      stage.id === stageId ? { ...stage, isUnlocked: true } : stage
    ))
    setShowUnlockAnimation(stageId)
    setTimeout(() => setShowUnlockAnimation(null), 2000)
  }

  return (
    <section className="section-padding bg-parchment-ivory relative overflow-hidden">
      {/* Unlock Animation */}
      <AnimatePresence>
        {showUnlockAnimation && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-12 py-8 rounded-3xl shadow-2xl"
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 mx-auto mb-4"
                >
                  <Unlock className="w-full h-full" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-2">Stage Unlocked!</h3>
                <p className="text-lg">You can now access this learning path</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-display text-dark-text mb-4"
          >
            Your Sequential Path
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-body text-muted-gray max-w-2xl mx-auto"
          >
            Guided curriculum with structured learning journey from grammar fundamentals 
            to living Sanskrit conversations with expert guidance.
          </motion.p>
        </motion.div>

        {/* Desktop: 3 Cards with Arrows */}
        <div className="hidden lg:block">
          <div className="flex items-center justify-center space-x-8">
            {stages.map((stage, index) => (
              <div key={stage.id} className="flex items-center">
                <StageCard
                  stage={stage}
                  index={index}
                  isExpanded={expandedStage === stage.id}
                  onToggle={() => handleToggle(stage.id)}
                  onUnlock={() => handleUnlock(stage.id)}
                />
                {/* Arrow between cards (except after last card) */}
                {index < stages.length - 1 && (
                  <ArrowConnector delay={index * 0.3 + 0.5} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: Vertical Stack */}
        <div className="lg:hidden space-y-8">
          {stages.map((stage, index) => (
            <div key={stage.id} className="relative">
              <StageCard
                stage={stage}
                index={index}
                isExpanded={expandedStage === stage.id}
                onToggle={() => handleToggle(stage.id)}
                onUnlock={() => handleUnlock(stage.id)}
              />
              {/* Vertical Arrow for mobile */}
              {index < stages.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.3 + 0.5 }}
                  className="flex justify-center mt-8 mb-8"
                >
                  <div className="relative">
                    <div className="w-0.5 h-16 bg-gradient-to-b from-teal-primary to-purple-primary"></div>
                    <motion.div
                      initial={{ y: -8, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.3 + 0.8 }}
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                    >
                      <ArrowRight className="w-4 h-4 text-purple-primary rotate-90" />
                    </motion.div>
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3 + 1
                      }}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-teal-primary rounded-full"
                    />
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Enhanced Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center space-x-6 bg-white/90 backdrop-blur-md rounded-2xl px-8 py-6 shadow-xl border border-golden-olive/20">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-semibold text-gray-700">Learning Progress</span>
            </div>
            <div className="flex space-x-3">
              {stages.map((stage, index) => (
                <motion.div
                  key={stage.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 1 }}
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    stage.isCompleted 
                      ? 'bg-green-500' 
                      : stage.isUnlocked 
                        ? `bg-gradient-to-r ${stage.gradient}` 
                        : 'bg-gray-200'
                  }`}
                >
                  {stage.isCompleted && <CheckCircle className="w-3 h-3 text-white" />}
                  {!stage.isUnlocked && <Lock className="w-3 h-3 text-gray-400" />}
                </motion.div>
              ))}
            </div>
            <div className="text-sm text-gray-600">
              {stages.filter(s => s.isCompleted).length}/{stages.length} completed
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
