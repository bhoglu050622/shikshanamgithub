'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Phone, Clock, MessageCircle, ArrowRight, Star } from 'lucide-react'

export default function FinalCTA() {
  return (
    <div className="space-y-8">
      {/* Main CTA Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-saffron-50 via-white to-peacock-green-50 dark:from-saffron-900/20 dark:via-wisdom-800 dark:to-peacock-green-900/20">
          <CardContent className="p-8 md:p-12">
            <div className="text-center space-y-8">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-saffron-500 text-saffron-500" />
                  ))}
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 dark:text-wisdom-50">
                  Start Your Sanskrit Learning Journey
                </h2>
                <p className="text-xl text-indigo-700 dark:text-wisdom-200 font-devanagari">
                  संस्कृत सीखने का सफर शुरू करें
                </p>
                <p className="text-lg text-indigo-600 dark:text-wisdom-300 max-w-2xl mx-auto">
                  Enroll today and connect with your culture. 
                  Learn Sanskrit in an easy way in English.
                </p>
              </motion.div>

              {/* Pricing */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white/80 dark:bg-wisdom-800/80 backdrop-blur-sm rounded-2xl p-6 border border-saffron-200 dark:border-saffron-800"
              >
                <div className="flex items-center justify-center gap-4 mb-4">
                  <span className="text-4xl font-bold text-indigo-900 dark:text-wisdom-50">
                    ₹2,999
                  </span>
                  <div className="text-left">
                    <span className="text-lg text-gray-500 dark:text-wisdom-500 line-through">
                      ₹4,999
                    </span>
                    <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 ml-2">
                      40% OFF
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-indigo-600 dark:text-wisdom-400">
                  One-time fee • Lifetime access
                </p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button 
                  size="lg" 
                  className="btn-primary text-xl px-8 py-4 h-auto"
                  asChild
                >
                  <a href="https://shikshanam.com/checkout?pid=p2" target="_blank" rel="noopener noreferrer">
                    Enroll Now
                    <ArrowRight className="w-6 h-6 ml-2" />
                  </a>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="btn-outline text-xl px-8 py-4 h-auto"
                  asChild
                >
                  <a href="#demo">
                    Watch Demo First
                  </a>
                </Button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-saffron-600 dark:text-saffron-400">500+</div>
                  <div className="text-sm text-indigo-600 dark:text-wisdom-400">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-saffron-600 dark:text-saffron-400">4.9/5</div>
                  <div className="text-sm text-indigo-600 dark:text-wisdom-400">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-saffron-600 dark:text-saffron-400">95%</div>
                  <div className="text-sm text-indigo-600 dark:text-wisdom-400">Success</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-saffron-600 dark:text-saffron-400">24/7</div>
                  <div className="text-sm text-indigo-600 dark:text-wisdom-400">Support</div>
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Contact Information */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              {/* Phone */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="space-y-3"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-indigo-900 dark:text-wisdom-50">
                    Call Us
                  </h3>
                  <p className="text-sm text-indigo-600 dark:text-wisdom-400">
                    +91-9876543210
                  </p>
                </div>
              </motion.div>

              {/* Hours */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="space-y-3"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-indigo-900 dark:text-wisdom-50">
                    Hours
                  </h3>
                  <p className="text-sm text-indigo-600 dark:text-wisdom-400">
                    9:00 AM - 6:00 PM
                  </p>
                  <p className="text-xs text-indigo-500 dark:text-wisdom-500">
                    Mon-Sat
                  </p>
                </div>
              </motion.div>

              {/* Chat */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="space-y-3"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-indigo-900 dark:text-wisdom-50">
                    Chat With Us
                  </h3>
                  <p className="text-sm text-indigo-600 dark:text-wisdom-400">
                    On WhatsApp
                  </p>
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Final Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.9 }}
        className="text-center max-w-2xl mx-auto"
      >
        <p className="text-lg text-indigo-700 dark:text-wisdom-200 leading-relaxed">
          "Sanskrit is not just a language, but the soul of our culture. 
          Join this journey today and connect with your roots."
        </p>
        <p className="text-sm text-indigo-600 dark:text-wisdom-400 mt-4 italic">
          - Dr. Rajesh Kumar, Course Instructor
        </p>
      </motion.div>
    </div>
  )
}
