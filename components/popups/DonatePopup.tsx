'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, CreditCard, Smartphone, Banknote, CheckCircle } from 'lucide-react'
import { usePopup } from './PopupContext'
// import BasePopup from './BasePopup'

const donationAmounts = [
  { amount: 500, label: '₹500', description: 'Help digitize 1 manuscript page' },
  { amount: 1000, label: '₹1,000', description: 'Support a student for 1 week' },
  { amount: 2500, label: '₹2,500', description: 'Fund teacher training materials' },
  { amount: 5000, label: '₹5,000', description: 'Sponsor a scholarship' },
  { amount: 10000, label: '₹10,000', description: 'Major project contribution' }
]

const paymentMethods = [
  { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
  { id: 'upi', name: 'UPI', icon: Smartphone },
  { id: 'netbanking', name: 'Net Banking', icon: Banknote }
]

export default function DonatePopup() {
  const { closePopup } = usePopup()
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [selectedPayment, setSelectedPayment] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleDonate = async () => {
    if (!selectedAmount && !customAmount) return
    if (!selectedPayment) return

    setIsProcessing(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsProcessing(false)
    setIsSuccess(true)
    
    // Close popup after success
    setTimeout(() => {
      closePopup()
    }, 3000)
  }

  const getFinalAmount = () => {
    return selectedAmount || parseInt(customAmount) || 0
  }

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
          <h3 className="text-2xl font-bold text-foreground mb-4">Thank You!</h3>
          <p className="text-muted-foreground mb-6">
            Your contribution of ₹{getFinalAmount().toLocaleString()} will help preserve ancient wisdom for future generations.
          </p>
          <p className="text-sm text-muted-foreground">
            You'll receive a confirmation email shortly.
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
        className="relative w-full max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-3xl p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Support Our Mission</h2>
              <p className="text-muted-foreground">Help preserve ancient wisdom</p>
            </div>
          </div>
          <button
            onClick={closePopup}
            className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Donation Amount */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">Choose Amount</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
            {donationAmounts.map((option) => (
              <button
                key={option.amount}
                onClick={() => {
                  setSelectedAmount(option.amount)
                  setCustomAmount('')
                }}
                className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                  selectedAmount === option.amount
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                }`}
              >
                <div className="font-bold text-lg">{option.label}</div>
                <div className="text-sm text-muted-foreground">{option.description}</div>
              </button>
            ))}
          </div>
          
          {/* Custom Amount */}
          <div className="relative">
            <input
              type="number"
              placeholder="Enter custom amount"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value)
                setSelectedAmount(null)
              }}
              className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:border-primary focus:outline-none"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground">₹</span>
          </div>
        </div>

        {/* Payment Method */}
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

        {/* Donate Button */}
        <button
          onClick={handleDonate}
          disabled={(!selectedAmount && !customAmount) || !selectedPayment || isProcessing}
          className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 px-6 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Heart className="w-5 h-5" />
              <span>Donate ₹{getFinalAmount().toLocaleString()}</span>
            </>
          )}
        </button>

        <p className="text-xs text-muted-foreground text-center mt-4">
          Your donation is secure and tax-deductible. We'll send you a receipt via email.
        </p>
      </motion.div>
    </div>
  )
}
