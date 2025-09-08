'use client'

import { motion } from 'framer-motion'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MessageCircle, HelpCircle } from 'lucide-react'

interface FAQProps {
  faqs: Array<{
    question: string
    answer: string
  }>
}

export default function FAQ({ faqs }: FAQProps) {
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
          Frequently Asked Questions
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-indigo-700 dark:text-wisdom-200 max-w-2xl mx-auto"
        >
          Find answers to all your questions here
        </motion.p>
      </div>

      {/* FAQ Accordion */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="max-w-4xl mx-auto"
      >
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border-0"
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <AccordionTrigger className="p-6 hover:no-underline">
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-10 h-10 bg-gradient-to-br from-saffron-500 to-saffron-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <HelpCircle className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-indigo-900 dark:text-wisdom-50">
                        {faq.question}
                      </h3>
                    </div>
                  </div>
                </AccordionTrigger>
                
                <AccordionContent className="px-6 pb-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pl-14"
                  >
                    <p className="text-indigo-700 dark:text-wisdom-200 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                </AccordionContent>
              </Card>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="max-w-2xl mx-auto"
      >
        <Card className="border-0 shadow-lg bg-gradient-to-br from-saffron-50 to-saffron-100 dark:from-saffron-900/20 dark:to-saffron-800/20">
          <CardContent className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-gradient-to-br from-saffron-500 to-saffron-600 rounded-2xl flex items-center justify-center mx-auto">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-indigo-900 dark:text-wisdom-50">
                Still have questions?
              </h3>
              <p className="text-indigo-700 dark:text-wisdom-200">
                Our team is always ready to help you
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a 
                href="https://wa.me/919876543210" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-saffron-600 text-saffron-700 hover:bg-saffron-600 hover:text-white font-semibold rounded-2xl transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Ask on WhatsApp
              </a>
              
              <a 
                href="mailto:support@shikshanam.com"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-saffron-600 to-saffron-700 hover:from-saffron-700 hover:to-saffron-800 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Send Email
              </a>
            </div>

            <div className="pt-4 border-t border-saffron-200 dark:border-saffron-800">
              <p className="text-sm text-indigo-600 dark:text-wisdom-400">
                <strong>Time:</strong> 9:00 AM to 6:00 PM
              </p>
              <p className="text-sm text-indigo-600 dark:text-wisdom-400">
                <strong>Days:</strong> Monday to Saturday
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
            Course Duration: 3 Months
          </Badge>
          <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
            Live Sessions: Sunday 7 PM
          </Badge>
          <Badge variant="secondary" className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
            Language: English
          </Badge>
          <Badge variant="secondary" className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300">
            Level: Beginner
          </Badge>
        </div>
      </motion.div>
    </div>
  )
}
