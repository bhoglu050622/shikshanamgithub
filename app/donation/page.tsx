'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, Users, BookOpen, Globe, Target, CheckCircle, Star, ArrowRight, CreditCard, Smartphone, Banknote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { DonationContent } from '@/lib/cms/donation-types'

export default function DonationPage() {
  const [content, setContent] = useState<DonationContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedAmount, setSelectedAmount] = useState('')
  const [customAmount, setCustomAmount] = useState('')
  const [selectedCause, setSelectedCause] = useState('')

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/cms/donation')
      const result = await response.json()
      
      if (result.success) {
        setContent(result.data)
      }
    } catch (error) {
      console.error('Error fetching donation content:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDonation = (amount: string) => {
    setSelectedAmount(amount)
    // Here you would integrate with payment gateway
    console.log('Donation amount:', amount)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Content Not Available</h1>
          <p className="text-muted-foreground">Please try again later.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${content.hero.backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            {content.hero.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8"
          >
            {content.hero.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => document.getElementById('donation-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Heart className="w-5 h-5 mr-2" />
              {content.cta.buttonText}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.impact.title}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{content.impact.subtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(content.impact?.stats || []).map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-lg font-semibold mb-2">{stat.label}</div>
                <div className="text-muted-foreground">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Causes Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.causes.title}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{content.causes.subtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(content.causes?.causes || []).map((cause, index) => (
              <motion.div
                key={cause.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <div className="relative h-48">
                    <img 
                      src={cause.image} 
                      alt={cause.title}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{cause.title}</h3>
                    <p className="text-muted-foreground mb-4">{cause.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Raised: {cause.currentAmount}</span>
                        <span>Goal: {cause.targetAmount}</span>
                      </div>
                      <Progress value={cause.progress} className="h-2" />
                      <div className="text-right text-sm text-muted-foreground">
                        {cause.progress}% complete
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full"
                      onClick={() => setSelectedCause(cause.id)}
                    >
                      Support This Cause
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Options */}
      <section id="donation-form" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.donationOptions.title}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{content.donationOptions.subtitle}</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Choose Your Donation Amount</CardTitle>
                <CardDescription>Select a preset amount or enter a custom amount</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Preset Amounts */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {(content.donationOptions?.options || []).map((option) => (
                    <motion.div
                      key={option.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card 
                        className={`cursor-pointer transition-all ${
                          selectedAmount === option.amount 
                            ? 'ring-2 ring-primary bg-primary/5' 
                            : 'hover:shadow-md'
                        } ${option.popular ? 'border-primary' : ''}`}
                        onClick={() => handleDonation(option.amount)}
                      >
                        <CardContent className="p-4 text-center">
                          {option.popular && (
                            <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full mb-2 inline-block">
                              Popular
                            </div>
                          )}
                          <div className="text-2xl font-bold mb-2">{option.amount}</div>
                          <div className="font-semibold mb-1">{option.label}</div>
                          <div className="text-sm text-muted-foreground">{option.description}</div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Custom Amount */}
                {content.donationOptions?.customAmount?.enabled && (
                  <div className="space-y-2">
                    <Label htmlFor="custom-amount">Custom Amount</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="custom-amount"
                        type="number"
                        placeholder={content.donationOptions.customAmount.placeholder}
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        min={content.donationOptions.customAmount.minAmount.replace('₹', '')}
                      />
                      <Button 
                        onClick={() => handleDonation(`₹${customAmount}`)}
                        disabled={!customAmount}
                      >
                        Donate
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Minimum amount: {content.donationOptions.customAmount.minAmount}
                    </p>
                  </div>
                )}

                {/* Payment Methods */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Payment Methods</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <CreditCard className="w-5 h-5" />
                      <span>Credit/Debit Card</span>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <Smartphone className="w-5 h-5" />
                      <span>UPI</span>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <Banknote className="w-5 h-5" />
                      <span>Net Banking</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.testimonials.title}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{content.testimonials.subtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {(content.testimonials?.testimonials || []).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <span className="text-sm text-muted-foreground">({testimonial.role})</span>
                        </div>
                        <p className="text-muted-foreground mb-2">{testimonial.content}</p>
                        <div className="text-sm font-semibold text-primary">
                          Donated: {testimonial.amount}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.faq.title}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{content.faq.subtitle}</p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {(content.faq?.questions || []).map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.cta.title}</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">{content.cta.subtitle}</p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => document.getElementById('donation-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Heart className="w-5 h-5 mr-2" />
              {content.cta.buttonText}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
