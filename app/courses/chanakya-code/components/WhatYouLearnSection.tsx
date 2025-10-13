'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Target, Brain, Users, Shield, Lightbulb, TrendingUp, Award } from 'lucide-react'
import { ClientMotionDiv } from '@/components/motion/ClientMotion'

const learningOutcomes = [
  {
    icon: Target,
    title: 'Strategic Negotiation',
    description: 'Master the art of win-win negotiations using Chanakya\'s time-tested principles. Learn to read people, identify leverage points, and close deals effectively.'
  },
  {
    icon: Brain,
    title: 'Strategic Thinking',
    description: 'Develop long-term strategic vision and planning abilities. Learn to anticipate moves, plan ahead, and make decisions that compound over time.'
  },
  {
    icon: Users,
    title: 'Leadership Excellence',
    description: 'Build and lead high-performing teams with Chanakya\'s leadership principles. Learn to inspire, motivate, and align people toward common goals.'
  },
  {
    icon: Shield,
    title: 'Risk Management',
    description: 'Identify and mitigate risks before they become problems. Learn Chanakya\'s frameworks for assessing threats and opportunities.'
  },
  {
    icon: Lightbulb,
    title: 'Decision Making',
    description: 'Make better decisions under pressure using ancient wisdom. Learn to balance logic, intuition, and strategic timing in your choices.'
  },
  {
    icon: TrendingUp,
    title: 'Business Growth',
    description: 'Apply proven strategies for sustainable business growth. Learn market positioning, competitive advantage, and scaling principles.'
  },
  {
    icon: Award,
    title: 'Conflict Resolution',
    description: 'Navigate difficult situations and resolve conflicts diplomatically. Learn to turn adversaries into allies using strategic communication.'
  },
  {
    icon: Brain,
    title: 'Mental Models',
    description: 'Develop powerful mental frameworks for analyzing complex situations. Think like a strategist in every business scenario.'
  }
]

export default function WhatYouLearnSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <ClientMotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-900 mb-6">
              What You'll Learn
            </h2>
            <p className="text-xl text-indigo-700 max-w-3xl mx-auto">
              Transform your business acumen with these powerful skills and strategies 
              drawn from Chanakya's Arthashastra and applied to modern contexts.
            </p>
          </ClientMotionDiv>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {learningOutcomes.map((outcome, index) => (
            <div key={outcome.title} className="group">
              <ClientMotionDiv
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="card-premium p-6 h-full hover:shadow-2xl transition-all duration-300">
                  <div className="w-14 h-14 bg-gradient-to-br from-saffron-500 to-saffron-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <outcome.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-indigo-900 mb-3 group-hover:text-saffron-600 transition-colors">
                    {outcome.title}
                  </h3>
                  
                  <p className="text-wisdom-600 leading-relaxed">
                    {outcome.description}
                  </p>
                </div>
              </ClientMotionDiv>
            </div>
          ))}
        </div>

        {/* Key Benefits Summary */}
        <div className="mt-16 bg-gradient-to-br from-saffron-50 to-amber-50 rounded-3xl p-8 lg:p-12">
          <ClientMotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
          <h3 className="text-2xl font-bold text-indigo-900 mb-6 text-center">
            Why This Course is Different
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-saffron-500 to-saffron-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-indigo-900 mb-2">Ancient + Modern</h4>
              <p className="text-wisdom-600 text-sm">
                2000-year-old wisdom adapted for today's business challenges with modern case studies
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-peacock-green-500 to-peacock-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-indigo-900 mb-2">Practical & Actionable</h4>
              <p className="text-wisdom-600 text-sm">
                Every lesson includes real-world applications, templates, and frameworks you can use immediately
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-indigo-900 mb-2">Proven Results</h4>
              <p className="text-wisdom-600 text-sm">
                10,000+ professionals have used these principles to achieve breakthrough results
              </p>
            </div>
          </div>
          </ClientMotionDiv>
        </div>
      </div>
    </section>
  )
}

