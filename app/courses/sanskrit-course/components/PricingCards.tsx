'use client'

import { Check, Crown, Star } from 'lucide-react'
import { ProtectedExternalLink } from '@/components/auth/ProtectedExternalLink'

const pricingPlans = [
  {
    id: 'single',
    name: 'संस्कृत भाषा प्रज्ञा',
    subtitle: 'Online Sanskrit Course in Hindi',
    features: [
      '30 Sessions (Pre-Recorded)',
      '17+ Hrs. of Content',
      'Quizzes and Notes',
      'Community Forum',
      'Live QnA Every Week',
      'Certification',
      '1 yr Access'
    ],
    cta: 'Enroll Now',
    ctaLink: 'https://courses.shikshanam.in/single-checkout/655b340de4b0b31c6db6cb3c?pid=p2',
    popular: false,
    icon: Star
  },
  {
    id: 'package',
    name: 'प्रारंभ से संभाषण तक (Level 1)',
    subtitle: 'Package Deal - Full Mastery + Less Cost',
    features: [
      'संस्कृत भाषा प्रज्ञा (Sanskrit Course)',
      'संस्कृत संभाषण (Speak Sanskrit Without Grammar)',
      '500+ Words and Growing',
      '12+ Practice Sheets',
      '30+ Notes & Quizzes',
      'Live QnA Every Week (Unlimited)',
      'Community Forum',
      'Free Future Updates',
      'Certification',
      '1 yr Access'
    ],
    cta: 'Buy Package & Save More! 👉',
    ctaLink: 'https://courses.shikshanam.in/single-checkout/655b340de4b0b31c6db6cb3c?pid=p2',
    popular: true,
    icon: Crown,
    savings: 'Exclusive benefits valued at ₹10,000'
  }
]

export default function PricingCards() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 id="pricing-heading" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-devanagari">
          Full Mastery + Less Cost
        </h2>
        <p className="text-xl text-saffron-600 font-bold font-devanagari">
          Buy Package & Save More!
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {pricingPlans.map((plan) => (
          <div 
            key={plan.id}
            className={`bg-white dark:bg-wisdom-800 rounded-lg border-2 ${
              plan.popular ? 'border-saffron-500 relative' : 'border-gray-200 dark:border-gray-700'
            } p-8`}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-saffron-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                <Crown className="w-4 h-4" />
                Most Popular
              </div>
            )}

            {/* Header */}
            <div className="text-center mb-6 pt-2">
              <plan.icon className="w-12 h-12 text-saffron-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white font-devanagari mb-1">
                {plan.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {plan.subtitle}
              </p>
            </div>

            {/* Pricing */}
            <div className="text-center mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="text-3xl font-bold text-saffron-600 dark:text-saffron-400">
                  ₹3,999
                </div>
                <div className="text-xl text-gray-400 line-through">
                  ₹5,999
                </div>
              </div>
              <div className="text-sm text-green-600 dark:text-green-400 font-semibold mb-2">
                Save 33%
              </div>
              {plan.savings && (
                <p className="text-sm text-green-600 dark:text-green-400 font-semibold">
                  {plan.savings}
                </p>
              )}
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <ProtectedExternalLink 
              href={plan.ctaLink}
              className={`block text-center px-6 py-3 font-semibold rounded-lg transition-colors ${
                plan.popular
                  ? 'bg-saffron-600 hover:bg-saffron-700 text-white'
                  : 'border-2 border-saffron-600 text-saffron-700 hover:bg-saffron-50'
              }`}
            >
              {plan.cta}
            </ProtectedExternalLink>
          </div>
        ))}
      </div>
    </div>
  )
}
