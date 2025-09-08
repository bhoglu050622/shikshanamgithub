'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, Star, Zap, Crown } from 'lucide-react'

const pricingPlans = [
  {
    id: 'single',
    name: 'Single Course',
    subtitle: 'सिंगल कोर्स',
    price: 2999,
    originalPrice: 4999,
    period: 'One Time',
    description: 'Complete access to Sanskrit course',
    features: [
      '3-month course',
      'All video lectures',
      'PDF materials',
      'Live doubt sessions',
      'Certificate',
      '3 months support'
    ],
    cta: 'Buy Now',
    ctaLink: 'https://shikshanam.com/checkout?pid=p2',
    popular: false,
    icon: Star,
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'package',
    name: 'Package Deal',
    subtitle: 'पैकेज डील',
    price: 4999,
    originalPrice: 9999,
    period: 'One Time',
    description: 'Sanskrit + Bonus courses',
    features: [
      'Sanskrit course (3 months)',
      'Grammar masterclass',
      'Shloka recordings',
      'Live doubt sessions (lifetime)',
      'Premium certificate',
      '1-1 mentoring (2 sessions)',
      'Exclusive community',
      '6 months support'
    ],
    cta: 'Best Deal',
    ctaLink: 'https://shikshanam.com/checkout?pid=p1',
    popular: true,
    icon: Crown,
    color: 'from-saffron-500 to-saffron-600',
    savings: '₹5,000 Savings'
  }
]

export default function PricingCards() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.h2
          id="pricing-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-display text-indigo-900 dark:text-wisdom-50"
        >
          Course Pricing
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-indigo-700 dark:text-wisdom-200 max-w-2xl mx-auto"
        >
          Choose the plan that suits your needs
        </motion.p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            {/* Popular Badge */}
            {plan.popular && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
              >
                <Badge className="bg-gradient-to-r from-saffron-500 to-saffron-600 text-white px-4 py-2 text-sm font-medium shadow-lg">
                  <Zap className="w-4 h-4 mr-1" />
                  Most Popular
                </Badge>
              </motion.div>
            )}

            <Card className={`h-full border-2 transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
              plan.popular 
                ? 'border-saffron-500 shadow-xl bg-gradient-to-br from-saffron-50 to-white dark:from-saffron-900/20 dark:to-wisdom-800' 
                : 'border-gray-200 dark:border-wisdom-700 shadow-lg'
            }`}>
              <CardHeader className="text-center pb-4">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, type: 'spring', stiffness: 200 }}
                  className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}
                >
                  <plan.icon className="w-8 h-8 text-white" />
                </motion.div>

                <CardTitle className="text-2xl font-bold text-indigo-900 dark:text-wisdom-50">
                  {plan.name}
                </CardTitle>
                <p className="text-indigo-600 dark:text-wisdom-400 text-sm font-devanagari">
                  {plan.subtitle}
                </p>
                <p className="text-indigo-700 dark:text-wisdom-200 text-sm mt-2">
                  {plan.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Pricing */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-4xl font-bold text-indigo-900 dark:text-wisdom-50">
                      ₹{plan.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-indigo-600 dark:text-wisdom-400">
                      /{plan.period}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lg text-gray-500 dark:text-wisdom-500 line-through">
                      ₹{plan.originalPrice.toLocaleString()}
                    </span>
                    <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                      {Math.round(((plan.originalPrice - plan.price) / plan.originalPrice) * 100)}% OFF
                    </Badge>
                  </div>

                  {plan.savings && (
                    <p className="text-sm text-green-600 dark:text-green-400 font-medium mt-2">
                      {plan.savings}
                    </p>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.4 + featureIndex * 0.05 }}
                      className="flex items-center gap-3"
                    >
                      <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                      <span className="text-indigo-700 dark:text-wisdom-200 text-sm">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.6 }}
                >
                  <a 
                    href={plan.ctaLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`w-full inline-flex items-center justify-center px-6 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-saffron-600 to-saffron-700 hover:from-saffron-700 hover:to-saffron-800 text-white transform hover:scale-105 shadow-lg hover:shadow-xl' 
                        : 'border-2 border-saffron-600 text-saffron-700 hover:bg-saffron-600 hover:text-white'
                    }`}
                  >
                    {plan.cta}
                  </a>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Guarantee Line */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="text-center max-w-2xl mx-auto"
      >
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <strong>Guarantee:</strong> No refunds; try free demos first. 
            <br />
            <span className="text-xs">कोई रिफंड नहीं; पहले फ्री डेमो ट्राई करें।</span>
          </p>
        </div>
      </motion.div>

      {/* Payment Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.0 }}
        className="text-center"
      >
        <p className="text-sm text-indigo-600 dark:text-wisdom-400 mb-2">
          Payment Options
        </p>
        <div className="flex items-center justify-center gap-4 text-xs text-indigo-500 dark:text-wisdom-500">
          <span>UPI</span>
          <span>•</span>
          <span>Credit/Debit Card</span>
          <span>•</span>
          <span>Net Banking</span>
          <span>•</span>
          <span>EMI Available</span>
        </div>
      </motion.div>
    </div>
  )
}
