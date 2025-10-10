'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Star, Heart, Shield, Crown, CheckCircle, CreditCard, Smartphone, Banknote } from 'lucide-react'
import { usePopup } from './PopupContext'
// import BasePopup from './BasePopup'

const patronTiers = [
  {
    id: 'supporter',
    name: 'Supporter',
    price: 500,
    period: 'month',
    description: 'Help digitize manuscripts',
    icon: Heart,
    color: 'from-green-500 to-green-600',
    features: [
      'Monthly progress updates',
      'Access to digital library',
      'Community recognition'
    ]
  },
  {
    id: 'guardian',
    name: 'Guardian',
    price: 2000,
    period: 'month',
    description: 'Sponsor a student or teacher',
    icon: Shield,
    color: 'from-blue-500 to-blue-600',
    features: [
      'Quarterly impact reports',
      'Direct student/teacher updates',
      'Exclusive webinars',
      'Priority support'
    ]
  },
  {
    id: 'patron',
    name: 'Patron',
    price: 5000,
    period: 'month',
    description: 'Empower the full ecosystem',
    icon: Crown,
    color: 'from-purple-500 to-purple-600',
    features: [
      'Personal consultation calls',
      'Behind-the-scenes access',
      'Advisory board invitation',
      'Custom recognition'
    ]
  }
]

const paymentMethods = [
  { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
  { id: 'upi', name: 'UPI', icon: Smartphone },
  { id: 'netbanking', name: 'Net Banking', icon: Banknote }
]

export default function PatronPopup() {
  const { closePopup } = usePopup()
  const [selectedTier, setSelectedTier] = useState<string | null>(null)
  const [selectedPayment, setSelectedPayment] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubscribe = async () => {
    if (!selectedTier) return
    if (!selectedPayment) return

    setIsProcessing(true)
    
    // Simulate subscription processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsProcessing(false)
    setIsSuccess(true)
    
    // Close popup after success
    setTimeout(() => {
      closePopup()
    }, 3000)
  }

  const selectedTierData = patronTiers.find(tier => tier.id === selectedTier)

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative bg-white dark:bg-slate-800 rounded-3xl p-8 max-w-md mx-auto text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-4">Welcome, {selectedTierData?.name}!</h3>
          <p className="text-muted-foreground mb-6">
            Thank you for becoming a {selectedTierData?.name.toLowerCase()}. Your monthly support of ₹{selectedTierData?.price.toLocaleString()} will help sustain our mission.
          </p>
          <p className="text-sm text-muted-foreground">
            You'll receive a welcome email with your benefits and next steps.
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closePopup} />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="relative w-full max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-3xl p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Become a Patron</h2>
              <p className="text-muted-foreground">Join our community of wisdom supporters</p>
            </div>
          </div>
          <button
            onClick={closePopup}
            className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Patron Tiers */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">Choose Your Tier</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {patronTiers.map((tier) => (
              <button
                key={tier.id}
                onClick={() => setSelectedTier(tier.id)}
                className={`p-6 rounded-3xl border-2 transition-all duration-200 text-left ${
                  selectedTier === tier.id
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                }`}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${tier.color} rounded-2xl flex items-center justify-center mb-4`}>
                  <tier.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-2">{tier.name}</h4>
                <div className="text-2xl font-bold text-foreground mb-2">
                  ₹{tier.price.toLocaleString()}
                  <span className="text-sm text-muted-foreground">/{tier.period}</span>
                </div>
                <p className="text-muted-foreground mb-4">{tier.description}</p>
                <ul className="space-y-2">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        {selectedTier && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4">Payment Method</h3>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedPayment(method.id)}
                  className={`w-full p-4 rounded-2xl border-2 transition-all duration-200 flex items-center space-x-3 ${
                    selectedPayment === method.id
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                  }`}
                >
                  <method.icon className="w-6 h-6" />
                  <span className="font-medium">{method.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Subscribe Button */}
        {selectedTier && (
          <button
            onClick={handleSubscribe}
            disabled={!selectedPayment || isProcessing}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 px-6 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Star className="w-5 h-5" />
                <span>Become a {selectedTierData?.name} - ₹{selectedTierData?.price.toLocaleString()}/month</span>
              </>
            )}
          </button>
        )}

        <p className="text-xs text-muted-foreground text-center mt-4">
          You can cancel or change your subscription anytime. All payments are secure and encrypted.
        </p>
      </motion.div>
    </div>
  )
}
