'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { X, AlertCircle, BookOpen, Users } from 'lucide-react'

const notIncluded = [
  {
    icon: BookOpen,
    title: 'वैदिक संस्कृत',
    description: 'यह कोर्स वैदिक संस्कृत पर फोकस नहीं करता',
    reason: 'पोस्ट-वैदिक काल की संस्कृत सिखाते हैं'
  },
  {
    icon: Users,
    title: 'एडवांस्ड साहित्य',
    description: 'क्लासिकल साहित्य की गहरी पढ़ाई नहीं',
    reason: 'शुरुआती लोगों के लिए बेसिक फोकस'
  }
]

export default function NotSection() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-display text-indigo-900 dark:text-wisdom-50 font-devanagari"
        >
          यह कोर्स क्या नहीं है
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-indigo-700 dark:text-wisdom-200 max-w-2xl mx-auto"
        >
          स्पष्टता के लिए - यह कोर्स क्या कवर नहीं करता
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
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-amber-900/20 dark:via-orange-900/20 dark:to-red-900/20">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                className="w-20 h-20 mx-auto bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg"
              >
                <AlertCircle className="w-10 h-10 text-white" />
              </motion.div>

              {/* Main Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <h3 className="text-2xl font-bold text-indigo-900 dark:text-wisdom-50 font-devanagari">
                  स्पष्टता के लिए
                </h3>
                <p className="text-lg text-indigo-700 dark:text-wisdom-200 leading-relaxed">
                  यह कोर्स <strong>पोस्ट-वैदिक संस्कृत</strong> पर फोकस करता है, 
                  जो आधुनिक समय में अधिक उपयोगी है। 
                  हम वैदिक संस्कृत या एडवांस्ड साहित्यिक अध्ययन नहीं करते।
                </p>
              </motion.div>

              {/* What's Not Included */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                <h4 className="text-lg font-semibold text-indigo-900 dark:text-wisdom-50">
                  इस कोर्स में शामिल नहीं:
                </h4>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {notIncluded.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-start gap-3 p-4 bg-white/80 dark:bg-wisdom-800/80 rounded-xl border border-amber-200 dark:border-amber-800"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <X className="w-5 h-5 text-white" />
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-semibold text-indigo-900 dark:text-wisdom-50">
                          {item.title}
                        </h5>
                        <p className="text-sm text-indigo-700 dark:text-wisdom-200">
                          {item.description}
                        </p>
                        <p className="text-xs text-amber-700 dark:text-amber-300 italic">
                          {item.reason}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Positive Note */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">✓</span>
                  </div>
                  <h4 className="font-semibold text-green-800 dark:text-green-200">
                    लेकिन यह सब मिलता है:
                  </h4>
                </div>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-green-700 dark:text-green-300">पोस्ट-वैदिक संस्कृत</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-green-700 dark:text-green-300">व्यावहारिक व्याकरण</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-green-700 dark:text-green-300">श्लोक और साहित्य</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-green-700 dark:text-green-300">रोजमर्रा के वाक्य</span>
                  </div>
                </div>
              </motion.div>

              {/* Friendly Note */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.0 }}
                className="text-center"
              >
                <p className="text-sm text-indigo-600 dark:text-wisdom-400 italic">
                  हमारा लक्ष्य आपको संस्कृत की मजबूत नींव देना है, 
                  जिससे आप आगे चलकर किसी भी दिशा में जा सकें।
                </p>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
