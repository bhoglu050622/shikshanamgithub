'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Award, CheckCircle, ExternalLink, Download, Linkedin } from 'lucide-react'
import Image from 'next/image'

const certificationFeatures = [
  {
    icon: Award,
    title: 'वेरिफाइड सर्टिफिकेट',
    description: 'Shikshanam द्वारा प्रमाणित'
  },
  {
    icon: CheckCircle,
    title: 'क्रेडेंशियल',
    description: 'पेशेवर मान्यता'
  },
  {
    icon: ExternalLink,
    title: 'LinkedIn पर जोड़ें',
    description: 'प्रोफाइल में शेयर करें'
  }
]

export default function Certification() {
  const handleDownloadCertificate = () => {
    // Placeholder for certificate download
    console.log('Download certificate')
  }

  const handleAddToLinkedIn = () => {
    // Placeholder for LinkedIn integration
    window.open('https://linkedin.com/in/me', '_blank')
  }

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
          प्रमाणपत्र
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-indigo-700 dark:text-wisdom-200 max-w-2xl mx-auto"
        >
          कोर्स पूरा करने पर मिलता है वेरिफाइड सर्टिफिकेट
        </motion.p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Certificate Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-saffron-50 via-white to-peacock-green-50 dark:from-saffron-900/20 dark:via-wisdom-800 dark:to-peacock-green-900/20">
              <CardContent className="p-8">
                {/* Certificate Mockup */}
                <div className="relative bg-white dark:bg-wisdom-100 rounded-2xl p-8 shadow-lg border-4 border-saffron-200 dark:border-saffron-400">
                  {/* Certificate Header */}
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-saffron-500 to-saffron-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-indigo-900 dark:text-wisdom-900 font-devanagari">
                      प्रमाणपत्र
                    </h3>
                    <p className="text-indigo-600 dark:text-wisdom-600 text-sm">
                      Certificate of Completion
                    </p>
                  </div>

                  {/* Certificate Content */}
                  <div className="text-center space-y-4 mb-8">
                    <p className="text-indigo-800 dark:text-wisdom-800 text-sm">
                      यह प्रमाणित किया जाता है कि
                    </p>
                    <div className="border-2 border-dashed border-saffron-300 dark:border-saffron-500 rounded-lg p-4">
                      <p className="text-lg font-semibold text-indigo-900 dark:text-wisdom-900">
                        [आपका नाम]
                      </p>
                    </div>
                    <p className="text-indigo-800 dark:text-wisdom-800 text-sm">
                      ने "संस्कृत कोर्स - हिंदी में शुरुआत से" सफलतापूर्वक पूरा किया है।
                    </p>
                  </div>

                  {/* Certificate Footer */}
                  <div className="flex justify-between items-end">
                    <div className="text-center">
                      <div className="w-20 h-1 bg-saffron-500 mx-auto mb-2"></div>
                      <p className="text-xs text-indigo-600 dark:text-wisdom-600">
                        डॉ. राजेश कुमार
                      </p>
                      <p className="text-xs text-indigo-500 dark:text-wisdom-500">
                        कोर्स इंस्ट्रक्टर
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-20 h-1 bg-saffron-500 mx-auto mb-2"></div>
                      <p className="text-xs text-indigo-600 dark:text-wisdom-600">
                        शिक्षणम
                      </p>
                      <p className="text-xs text-indigo-500 dark:text-wisdom-500">
                        दिनांक: [तारीख]
                      </p>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-4 -right-4 w-8 h-8 bg-saffron-500 rounded-full opacity-60"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-4 -left-4 w-6 h-6 bg-peacock-green-500 rounded-full opacity-60"
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Right - Features and CTA */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Features */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-indigo-900 dark:text-wisdom-50">
                सर्टिफिकेट की विशेषताएं:
              </h3>
              
              {certificationFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/30 rounded-xl"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-saffron-500 to-saffron-600 rounded-xl flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-indigo-900 dark:text-wisdom-50">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-indigo-600 dark:text-wisdom-400">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6"
            >
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">
                सर्टिफिकेट के लाभ:
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-green-700 dark:text-green-300">पेशेवर प्रोफाइल में जोड़ें</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-green-700 dark:text-green-300">रिज्यूमे में शामिल करें</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-green-700 dark:text-green-300">सोशल मीडिया पर शेयर करें</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-green-700 dark:text-green-300">भविष्य के कोर्सेज के लिए प्रूफ</span>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="space-y-3"
            >
              <Button 
                size="lg" 
                className="btn-primary w-full"
                onClick={handleDownloadCertificate}
              >
                <Download className="w-5 h-5 mr-2" />
                सर्टिफिकेट डाउनलोड करें
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="btn-outline w-full"
                onClick={handleAddToLinkedIn}
              >
                <Linkedin className="w-5 h-5 mr-2" />
                LinkedIn पर जोड़ें
              </Button>
            </motion.div>

            {/* Note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 }}
              className="text-center"
            >
              <p className="text-sm text-indigo-600 dark:text-wisdom-400">
                <strong>नोट:</strong> सर्टिफिकेट तभी मिलेगा जब आप कोर्स पूरा करेंगे और अंतिम परीक्षा पास करेंगे।
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
