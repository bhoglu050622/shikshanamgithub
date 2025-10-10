'use client'

import { motion } from 'framer-motion'
import MotionWrapper, { MotionDiv } from '@/components/motion/MotionWrapper'
import { useHydrationSafeAnimation } from '@/lib/hooks/useHydrationSafeAnimation'
import { 
  BookOpen, 
  Heart, 
  Users, 
  Globe, 
  ArrowRight, 
  Star, 
  Target, 
  Award, 
  Lightbulb, 
  Shield,
  ChevronDown,
  CheckCircle,
  TrendingUp,
  GraduationCap,
  Smartphone,
  FileText,
  UserCheck,
  DollarSign,
  Gift,
  Quote
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { usePopup } from '@/components/popups'
import Link from 'next/link'

// Project data
const projects = [
  {
    id: 1,
    title: 'Sanskrit Manuscript Preservation',
    description: 'Digitize and preserve ancient Sanskrit manuscripts for future generations.',
    image: '/assets/manuscript.jpg',
    progress: 75,
    goal: '₹5,00,000',
    raised: '₹3,75,000',
    features: ['High-resolution scanning', 'Digital archiving', 'Public access portal']
  },
  {
    id: 2,
    title: 'Teacher Training Programs',
    description: 'Train qualified teachers to spread authentic knowledge of Indian philosophy.',
    image: '/assets/teacher-training.jpg',
    progress: 60,
    goal: '₹8,00,000',
    raised: '₹4,80,000',
    features: ['Certified programs', 'Mentorship system', 'Global outreach']
  },
  {
    id: 3,
    title: 'Mobile Learning Apps',
    description: 'Develop accessible mobile applications for Sanskrit and philosophy learning.',
    image: '/assets/mobile-app.jpg',
    progress: 45,
    goal: '₹6,00,000',
    raised: '₹2,70,000',
    features: ['Interactive lessons', 'Offline access', 'Progress tracking']
  },
  {
    id: 4,
    title: 'Scholarship Programs',
    description: 'Provide financial support to deserving students pursuing traditional studies.',
    image: '/assets/scholarship.jpg',
    progress: 80,
    goal: '₹10,00,000',
    raised: '₹8,00,000',
    features: ['Merit-based selection', 'Full tuition coverage', 'Living stipends']
  }
]

// Patron tiers
const patronTiers = [
  {
    name: 'Supporter',
    price: '₹500',
    period: '/month',
    description: 'Help digitize manuscripts',
    icon: Heart,
    color: 'from-green-500 to-green-600',
    features: [
      'Monthly progress updates',
      'Access to digital library',
      'Community recognition'
    ]
  },
  {
    name: 'Guardian',
    price: '₹2,000',
    period: '/month',
    description: 'Sponsor a student or teacher',
    icon: Shield,
    color: 'from-blue-500 to-blue-600',
    features: [
      'Quarterly impact reports',
      'Direct student/teacher updates',
      'Exclusive webinars',
      'Priority support'
    ]
  },
  {
    name: 'Patron',
    price: '₹5,000+',
    period: '/month',
    description: 'Empower the full ecosystem',
    icon: Star,
    color: 'from-purple-500 to-purple-600',
    features: [
      'Personal consultation calls',
      'Behind-the-scenes access',
      'Advisory board invitation',
      'Custom recognition'
    ]
  }
]

// Impact stats
const impactStats = [
  { icon: FileText, value: '120+', label: 'Manuscripts Digitized' },
  { icon: UserCheck, value: '45', label: 'Teachers Trained' },
  { icon: GraduationCap, value: '300', label: 'Scholarships Granted' },
  { icon: Smartphone, value: '2', label: 'Mobile Learning Platforms' }
]

// How support helps
const supportBenefits = [
  {
    icon: FileText,
    title: 'Preserve Manuscripts',
    description: 'Digitize ancient texts for global access'
  },
  {
    icon: UserCheck,
    title: 'Train Teachers',
    description: 'Develop qualified educators worldwide'
  },
  {
    icon: Smartphone,
    title: 'Build Digital Tools',
    description: 'Create accessible learning platforms'
  },
  {
    icon: GraduationCap,
    title: 'Empower Students',
    description: 'Support deserving scholars financially'
  }
]

// Testimonials
const testimonials = [
  {
    quote: "The scholarship program enabled me to pursue my dream of studying Sanskrit philosophy. I'm now teaching others and preserving this ancient wisdom.",
    author: "Priya Sharma",
    role: "Sanskrit Scholar & Teacher",
    image: "/assets/testimonial-1.jpg"
  },
  {
    quote: "Through the teacher training program, I learned to share authentic knowledge with students worldwide. The impact is truly transformative.",
    author: "Dr. Rajesh Kumar",
    role: "Philosophy Professor",
    image: "/assets/testimonial-2.jpg"
  },
  {
    quote: "The mobile app made Sanskrit learning accessible to me despite living in a remote area. Technology is bridging ancient wisdom with modern accessibility.",
    author: "Anita Patel",
    role: "Student & App User",
    image: "/assets/testimonial-3.jpg"
  }
]

export default function SupportUs() {
  const mounted = useHydrationSafeAnimation()
  const { openPopup } = usePopup()

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-slate-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/assets/temple-manuscripts.jpg')",
              filter: 'brightness(0.4)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/60 via-amber-800/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="container-custom relative z-10 text-center">
          <MotionDiv
            initial={mounted ? { opacity: 0, y: 30 } : false}
            animate={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={mounted ? { duration: 0.8 } : { duration: 0 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Through Support
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Help us preserve and share ancient wisdom by supporting our initiatives and projects.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <motion.button
                whileHover={mounted ? { scale: 1.05 } : {}}
                whileTap={mounted ? { scale: 0.95 } : {}}
                onClick={() => document.getElementById('choose-project')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-2 shadow-xl hover:shadow-2xl"
              >
                <Target className="w-5 h-5" />
                <span>Choose a Project</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                whileHover={mounted ? { scale: 1.05 } : {}}
                whileTap={mounted ? { scale: 0.95 } : {}}
                onClick={() => document.getElementById('become-patron')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-2 shadow-xl hover:shadow-2xl"
              >
                <Star className="w-5 h-5" />
                <span>Become a Patron</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Scroll Down Indicator */}
            <motion.div
              initial={mounted ? { opacity: 0, y: 20 } : false}
              animate={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={mounted ? { duration: 0.8, delay: 0.5 } : { duration: 0 }}
              className="flex flex-col items-center"
            >
              <p className="text-white/70 text-sm mb-2">Discover how you can help</p>
              <motion.div
                animate={mounted ? { y: [0, 10, 0] } : {}}
                transition={mounted ? { duration: 2, repeat: Infinity } : {}}
              >
                <ChevronDown className="w-6 h-6 text-white/70" />
              </motion.div>
            </motion.div>
          </MotionDiv>
        </div>
      </section>

      {/* Impact Section */}
      <section className="section-padding bg-white dark:bg-slate-800">
        <div className="container-custom">
          <MotionDiv
            initial={mounted ? { opacity: 0, y: 30 } : false}
            whileInView={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={mounted ? { duration: 0.8 } : { duration: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Your Support Creates{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Impact
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Your contribution helps us safeguard timeless traditions, train future teachers, and make ancient knowledge accessible worldwide.
            </p>
          </MotionDiv>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {impactStats.map((stat, index) => (
              <MotionDiv
                key={stat.label}
                initial={mounted ? { opacity: 0, y: 30 } : false}
                whileInView={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={mounted ? { duration: 0.8, delay: index * 0.1 } : { duration: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Choose a Project Section */}
      <section id="choose-project" className="section-padding bg-sand-50 dark:bg-slate-900">
        <div className="container-custom">
          <MotionDiv
            initial={mounted ? { opacity: 0, y: 30 } : false}
            whileInView={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={mounted ? { duration: 0.8 } : { duration: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Choose a{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Project
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Support specific initiatives that align with your passion for preserving ancient wisdom.
            </p>
          </MotionDiv>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <MotionDiv
                key={project.id}
                initial={mounted ? { opacity: 0, y: 30 } : false}
                whileInView={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={mounted ? { duration: 0.8, delay: index * 0.1 } : { duration: 0 }}
                viewport={{ once: true }}
                whileHover={mounted ? { scale: 1.02, y: -5 } : {}}
                className="group"
              >
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                  {/* Project Image */}
                  <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl mb-6 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-primary" />
                  </div>

                  {/* Project Info */}
                  <h3 className="text-xl font-bold text-foreground mb-3">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground mt-2">
                      <span>Raised: {project.raised}</span>
                      <span>Goal: {project.goal}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-foreground">What this includes:</h4>
                    <ul className="space-y-2">
                      {project.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={mounted ? { scale: 1.05 } : {}}
                    whileTap={mounted ? { scale: 0.95 } : {}}
                    onClick={() => openPopup('donate')}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white py-3 px-6 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-lg"
                  >
                    <Heart className="w-5 h-5" />
                    <span>Support This Project</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Patron Section */}
      <section id="become-patron" className="section-padding bg-white dark:bg-slate-800">
        <div className="container-custom">
          <MotionDiv
            initial={mounted ? { opacity: 0, y: 30 } : false}
            whileInView={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={mounted ? { duration: 0.8 } : { duration: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Become a{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Patron of Wisdom
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join a growing community of supporters who believe in preserving and sharing India's timeless knowledge traditions. Your regular support sustains our teachers, students, and digital preservation efforts.
            </p>
          </MotionDiv>

          {/* Patron Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {patronTiers.map((tier, index) => (
              <MotionDiv
                key={tier.name}
                initial={mounted ? { opacity: 0, y: 30 } : false}
                whileInView={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={mounted ? { duration: 0.8, delay: index * 0.1 } : { duration: 0 }}
                viewport={{ once: true }}
                whileHover={mounted ? { scale: 1.05, y: -10 } : {}}
                className="group"
              >
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 h-full border-2 border-transparent hover:border-primary/20">
                  {/* Tier Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${tier.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <tier.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Tier Info */}
                  <h3 className="text-2xl font-bold text-foreground mb-2 text-center">{tier.name}</h3>
                  <div className="text-center mb-4">
                    <span className="text-4xl font-bold text-foreground">{tier.price}</span>
                    <span className="text-muted-foreground">{tier.period}</span>
                  </div>
                  <p className="text-muted-foreground text-center mb-6">{tier.description}</p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={mounted ? { scale: 1.05 } : {}}
                    whileTap={mounted ? { scale: 0.95 } : {}}
                    onClick={() => openPopup('patron')}
                    className={`w-full bg-gradient-to-r ${tier.color} hover:opacity-90 text-white py-3 px-6 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-lg`}
                  >
                    <Star className="w-5 h-5" />
                    <span>Become a Patron</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Stories of Impact Section */}
      <section className="section-padding bg-sand-50 dark:bg-slate-900">
        <div className="container-custom">
          <MotionDiv
            initial={mounted ? { opacity: 0, y: 30 } : false}
            whileInView={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={mounted ? { duration: 0.8 } : { duration: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Stories of{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Impact
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real stories from our community showing how your support transforms lives and preserves wisdom.
            </p>
          </MotionDiv>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <MotionDiv
                key={index}
                initial={mounted ? { opacity: 0, y: 30 } : false}
                whileInView={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={mounted ? { duration: 0.8, delay: index * 0.1 } : { duration: 0 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                  {/* Quote Icon */}
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center mb-4">
                    <Quote className="w-6 h-6 text-primary" />
                  </div>

                  {/* Quote */}
                  <blockquote className="text-muted-foreground mb-6 italic leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* How Your Support Helps Section */}
      <section className="section-padding bg-white dark:bg-slate-800">
        <div className="container-custom">
          <MotionDiv
            initial={mounted ? { opacity: 0, y: 30 } : false}
            whileInView={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={mounted ? { duration: 0.8 } : { duration: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              How Your Support{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Helps
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every contribution creates a ripple effect that preserves ancient wisdom for future generations.
            </p>
          </MotionDiv>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {supportBenefits.map((benefit, index) => (
              <MotionDiv
                key={benefit.title}
                initial={mounted ? { opacity: 0, y: 30 } : false}
                whileInView={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={mounted ? { duration: 0.8, delay: index * 0.1 } : { duration: 0 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/10 dark:from-primary/20 dark:via-secondary/10 dark:to-primary/20">
        <div className="container-custom text-center">
          <MotionDiv
            initial={mounted ? { opacity: 0, y: 30 } : false}
            whileInView={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={mounted ? { duration: 0.8 } : { duration: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Ready to{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Contribute?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Every contribution, big or small, brings us closer to preserving timeless wisdom for future generations.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={mounted ? { scale: 1.05 } : {}}
                whileTap={mounted ? { scale: 0.95 } : {}}
                onClick={() => document.getElementById('choose-project')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-2 shadow-xl hover:shadow-2xl"
              >
                <Target className="w-5 h-5" />
                <span>Choose a Project</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                whileHover={mounted ? { scale: 1.05 } : {}}
                whileTap={mounted ? { scale: 0.95 } : {}}
                onClick={() => document.getElementById('become-patron')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-2 shadow-xl hover:shadow-2xl"
              >
                <Star className="w-5 h-5" />
                <span>Become a Patron</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  )
}
