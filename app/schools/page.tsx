'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { BookOpen, Users, Lightbulb, ArrowRight } from 'lucide-react'

const schools = [
  {
    title: 'School of Sanskrit',
    description: 'Master the ancient language of wisdom through grammar, conversation, and spiritual discourse.',
    icon: BookOpen,
    href: '/schools/sanskrit',
    color: 'from-saffron-500 to-saffron-600',
    features: ['Grammar Foundation', 'Conversation Practice', 'Living Sanskrit']
  },
  {
    title: 'School of Darshanas',
    description: 'Explore the six classical schools of Indian philosophy and their profound insights.',
    icon: Lightbulb,
    href: '/schools/darshana',
    color: 'from-deep-teal-500 to-deep-teal-600',
    features: ['Vedanta', 'Samkhya', 'Yoga Philosophy']
  },
  {
    title: 'School of Self-help',
    description: 'Discover ancient wisdom for modern living through practical spiritual guidance.',
    icon: Users,
    href: '/schools/self-help',
    color: 'from-indigo-500 to-indigo-600',
    features: ['Mindfulness', 'Life Skills', 'Spiritual Growth']
  }
]

export default function SchoolsPage() {
  return (
    <div className="min-h-screen bg-off-white-500 dark:bg-wisdom-900 transition-colors duration-300">
      <div className="container-custom py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-hero bg-gradient-to-r from-saffron-600 via-deep-teal-600 to-indigo-600 bg-clip-text text-transparent mb-6 text-center mx-auto">
            Our Schools
          </h1>
          <p className="font-sans text-subheading text-indigo-700 dark:text-wisdom-200 max-w-3xl mx-auto text-center">
            Choose your path of learning. Each school offers structured courses, 
            expert guidance, and a community of fellow seekers.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {schools.map((school, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <Link href={school.href}>
                <div className="card-premium p-8 h-full group-hover:scale-105 transition-transform duration-300 cursor-pointer">
                  <div className={`w-16 h-16 bg-gradient-to-r ${school.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <school.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h2 className="font-serif text-xl text-indigo-700 dark:text-wisdom-100 mb-4 text-center">
                    {school.title}
                  </h2>
                  
                  <p className="font-sans text-wisdom-600 dark:text-wisdom-400 mb-6 text-justify leading-relaxed">
                    {school.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    {school.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-saffron-500 rounded-full"></div>
                        <span className="text-sm text-wisdom-600 dark:text-wisdom-400">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-center space-x-2 text-saffron-600 dark:text-saffron-400 font-medium group-hover:text-saffron-700 dark:group-hover:text-saffron-300 transition-colors">
                    <span>Explore School</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
