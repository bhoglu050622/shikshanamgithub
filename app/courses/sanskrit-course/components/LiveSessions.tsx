'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, Users, MessageCircle, ExternalLink } from 'lucide-react'

export default function LiveSessions() {
  const handleAddToCalendar = () => {
    // Create Google Calendar event URL
    const eventDetails = {
      title: 'Sanskrit Live Session - Shikshanam',
      details: 'Live doubt session for learning Sanskrit. Every Sunday at 7:00 PM IST.',
      location: 'Online - Zoom/Google Meet',
      startDate: '20241215T190000', // Next Sunday 7:00 PM IST
      endDate: '20241215T200000'    // 1 hour duration
    }

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&dates=${eventDetails.startDate}/${eventDetails.endDate}&details=${encodeURIComponent(eventDetails.details)}&location=${encodeURIComponent(eventDetails.location)}`
    
    window.open(googleCalendarUrl, '_blank')
  }

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
          Live Doubt Sessions
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-indigo-700 dark:text-wisdom-200 max-w-2xl mx-auto"
        >
          Ask your questions in live sessions every Sunday at 7:00 PM IST
        </motion.p>
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-saffron-50 via-white to-peacock-green-50 dark:from-saffron-900/20 dark:via-wisdom-800 dark:to-peacock-green-900/20">
          <CardContent className="p-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left - Content */}
              <div className="space-y-6">
                {/* Session Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-saffron-500 to-saffron-600 rounded-xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-indigo-900 dark:text-wisdom-50">
                        Every Sunday
                      </h3>
                      <p className="text-indigo-600 dark:text-wisdom-400 font-devanagari">
                        हर रविवार
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-peacock-green-500 to-peacock-green-600 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-indigo-900 dark:text-wisdom-50">
                        07:00 PM IST
                      </h3>
                      <p className="text-indigo-600 dark:text-wisdom-400 font-devanagari">
                        1 घंटे का सेशन
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-lotus-pink-500 to-lotus-pink-600 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-indigo-900 dark:text-wisdom-50">
                        Small Groups
                      </h3>
                      <p className="text-indigo-600 dark:text-wisdom-400 font-devanagari">
                        व्यक्तिगत ध्यान
                      </p>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-saffron-600 dark:text-saffron-400" />
                    <span className="text-indigo-700 dark:text-wisdom-200">
                      Clear all doubts
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-saffron-600 dark:text-saffron-400" />
                    <span className="text-indigo-700 dark:text-wisdom-200">
                      Interact with fellow students
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-saffron-600 dark:text-saffron-400" />
                    <span className="text-indigo-700 dark:text-wisdom-200">
                      Lifetime access
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                <Button 
                  onClick={handleAddToCalendar}
                  className="btn-primary w-full sm:w-auto"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Add to Google Calendar
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* Right - Visual */}
              <div className="relative">
                <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/50 dark:to-indigo-800/50 rounded-2xl p-6 space-y-4">
                  {/* Mock Video Interface */}
                  <div className="bg-white dark:bg-wisdom-800 rounded-xl p-4 shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium text-indigo-900 dark:text-wisdom-50">
                        Live session in progress
                      </span>
                    </div>
                    
                    {/* Mock Chat */}
                    <div className="space-y-2 text-sm">
                      <div className="bg-saffron-100 dark:bg-saffron-900/30 p-2 rounded-lg">
                        <span className="font-medium">Rajesh Guru:</span> What topic should we study today?
                      </div>
                      <div className="bg-white dark:bg-wisdom-700 p-2 rounded-lg">
                        <span className="font-medium">Priya:</span> I have a question about grammar
                      </div>
                      <div className="bg-saffron-100 dark:bg-saffron-900/30 p-2 rounded-lg">
                        <span className="font-medium">Rajesh Guru:</span> Sure, let me explain...
                      </div>
                    </div>
                  </div>

                  {/* Session Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-900 dark:text-wisdom-50">24</div>
                      <div className="text-xs text-indigo-600 dark:text-wisdom-400">Weeks</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-900 dark:text-wisdom-50">96</div>
                      <div className="text-xs text-indigo-600 dark:text-wisdom-400">Hours</div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-saffron-500 rounded-full"
                />
                <motion.div
                  animate={{ y: [5, -5, 5] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="absolute -bottom-2 -left-2 w-4 h-4 bg-peacock-green-500 rounded-full"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tooltip Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="text-center max-w-2xl mx-auto"
      >
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Note:</strong> You can participate in live sessions for lifetime. You can ask doubts even after the course ends.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
