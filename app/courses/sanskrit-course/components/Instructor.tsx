'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { GraduationCap, Award, Users, BookOpen, Quote } from 'lucide-react'
import Image from 'next/image'

const instructorData = {
  name: 'Dr. Rajesh Kumar',
  englishName: 'डॉ. राजेश कुमार',
  title: 'Sanskrit Scholar & Course Instructor',
  englishTitle: 'संस्कृत विद्वान और कोर्स इंस्ट्रक्टर',
  image: '/api/placeholder/300/400',
  experience: '12+ Years in Gurukul Tradition',
  fluency: 'Fluent in Sanskrit',
  qualifications: [
    'PhD in Sanskrit Literature',
    'MA Sanskrit (Gold Medalist)',
    'BA Sanskrit (First Class)',
    'Gurukul Traditional Training'
  ],
  achievements: [
    'Taught 500+ Students',
    'Published 15+ Research Papers',
    'Authored 3 Books',
    'Nationally Awarded'
  ],
  quote: {
    text: 'Sanskrit is not just a language, but the soul of our culture. Learning it is every Indian\'s duty.',
    english: 'संस्कृत सिर्फ एक भाषा नहीं, बल्कि हमारी संस्कृति की आत्मा है। इसे सीखना हर भारतीय का कर्तव्य है।'
  }
}

export default function Instructor() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-display text-indigo-900 dark:text-wisdom-50"
        >
          Meet Your Guru
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-indigo-700 dark:text-wisdom-200 max-w-2xl mx-auto"
        >
          Learn Sanskrit from an experienced and qualified teacher
        </motion.p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Instructor Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Main Card */}
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-saffron-50 via-white to-peacock-green-50 dark:from-saffron-900/20 dark:via-wisdom-800 dark:to-peacock-green-900/20">
              <CardContent className="p-8">
                {/* Portrait and Basic Info */}
                <div className="flex items-start gap-6 mb-6">
                  <div className="relative">
                    <div className="w-32 h-32 bg-gradient-to-br from-saffron-200 to-saffron-300 dark:from-saffron-800 dark:to-saffron-700 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-4xl font-devanagari text-saffron-800 dark:text-saffron-200">
                        र
                      </span>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-indigo-900 dark:text-wisdom-50">
                      {instructorData.name}
                    </h3>
                    <p className="text-indigo-600 dark:text-wisdom-400 text-sm mb-2 font-devanagari">
                      {instructorData.englishName}
                    </p>
                    <p className="text-indigo-700 dark:text-wisdom-200 font-medium">
                      {instructorData.title}
                    </p>
                    <p className="text-indigo-600 dark:text-wisdom-400 text-sm font-devanagari">
                      {instructorData.englishTitle}
                    </p>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge className="bg-saffron-100 dark:bg-saffron-900/30 text-saffron-700 dark:text-saffron-300">
                    {instructorData.experience}
                  </Badge>
                  <Badge className="bg-peacock-green-100 dark:bg-peacock-green-900/30 text-peacock-green-700 dark:text-peacock-green-300">
                    {instructorData.fluency}
                  </Badge>
                </div>

                {/* Qualifications */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-indigo-900 dark:text-wisdom-50 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-saffron-600 dark:text-saffron-400" />
                    Qualifications
                  </h4>
                  <div className="space-y-2">
                    {instructorData.qualifications.map((qual, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-center gap-2"
                      >
                        <div className="w-2 h-2 bg-saffron-500 rounded-full" />
                        <span className="text-indigo-700 dark:text-wisdom-200 text-sm">
                          {qual}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-indigo-900 dark:text-wisdom-50 flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-saffron-600 dark:text-saffron-400" />
                  Achievements
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {instructorData.achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="text-center p-3 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/30 rounded-lg"
                    >
                      <p className="text-sm font-medium text-indigo-800 dark:text-wisdom-100">
                        {achievement}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right - Quote and Additional Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Quote Card */}
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-peacock-green-50 via-white to-lotus-pink-50 dark:from-peacock-green-900/20 dark:via-wisdom-800 dark:to-lotus-pink-900/20">
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  <Quote className="w-12 h-12 text-saffron-500 dark:text-saffron-400 mx-auto" />
                  
                  <blockquote className="text-lg text-indigo-800 dark:text-wisdom-100 italic leading-relaxed">
                    "{instructorData.quote.text}"
                  </blockquote>
                  
                  <p className="text-sm text-indigo-600 dark:text-wisdom-400 italic font-devanagari">
                    "{instructorData.quote.english}"
                  </p>
                  
                  <div className="pt-4 border-t border-saffron-200 dark:border-saffron-800">
                    <p className="font-semibold text-indigo-900 dark:text-wisdom-50">
                      {instructorData.name}
                    </p>
                    <p className="text-sm text-indigo-600 dark:text-wisdom-400">
                      Sanskrit Scholar
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Teaching Philosophy */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-indigo-900 dark:text-wisdom-50 flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-saffron-600 dark:text-saffron-400" />
                  Teaching Philosophy
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-saffron-500 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-indigo-700 dark:text-wisdom-200 text-sm">
                      Teaching in English for easy understanding
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-saffron-500 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-indigo-700 dark:text-wisdom-200 text-sm">
                      Learning with practical examples
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-saffron-500 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-indigo-700 dark:text-wisdom-200 text-sm">
                      Attention to each student's individual needs
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-saffron-500 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-indigo-700 dark:text-wisdom-200 text-sm">
                      Teaching connected with culture and tradition
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <a 
                href="#pricing"
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-saffron-600 to-saffron-700 hover:from-saffron-700 hover:to-saffron-800 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Learn from Dr. Rajesh Kumar
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
