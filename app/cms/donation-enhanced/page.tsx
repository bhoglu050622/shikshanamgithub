'use client';

import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  DollarSign, 
  Users, 
  Target, 
  HelpCircle, 
  MessageCircle,
  Gift,
  TrendingUp
} from 'lucide-react';

import { 
  UniversalCMSProvider, 
  UniversalCMS,
  CMSCard,
  CMSButton,
  CMSLink,
  CMSText,
  CMSImage,
  CMSAdminPanel
} from '@/components/cms/UniversalCMS';
import { useCMSContent } from '@/lib/cms/hooks';

const sections = [
  { id: 'hero', name: 'Hero Section', icon: Heart, description: 'Main donation call-to-action' },
  { id: 'impact', name: 'Impact Stories', icon: TrendingUp, description: 'Show the impact of donations' },
  { id: 'causes', name: 'Causes', icon: Target, description: 'Different causes to support' },
  { id: 'options', name: 'Donation Options', icon: DollarSign, description: 'Donation amounts and methods' },
  { id: 'testimonials', name: 'Testimonials', icon: MessageCircle, description: 'Donor testimonials' },
  { id: 'faq', name: 'FAQ', icon: HelpCircle, description: 'Frequently asked questions' },
  { id: 'cta', name: 'Call to Action', icon: Gift, description: 'Final call to action' }
];

function DonationCMSContent() {
  const { content, loading, error, updateContent } = useCMSContent('/api/cms/donation');
  const [previewMode, setPreviewMode] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <CMSText variant="secondary">Loading donation content...</CMSText>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <CMSCard className="max-w-md">
          <div className="p-6 text-center">
            <div className="text-red-500 mb-4">
              <Heart className="w-12 h-12 mx-auto" />
            </div>
            <CMSText variant="primary" as="h2" className="text-xl font-semibold mb-2">
              Error Loading Content
            </CMSText>
            <CMSText variant="secondary" className="mb-4">{error}</CMSText>
            <CMSButton onClick={() => window.location.reload()}>
              Try Again
            </CMSButton>
          </div>
        </CMSCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* CMS Admin Panel */}
      <CMSAdminPanel 
        pageId="donation"
        pageTitle="Donation Page"
        sections={sections}
      />

      {/* Main CMS Interface */}
      <UniversalCMS
        pageId="donation"
        pageTitle="Donation Page"
        sections={sections}
        onUpdate={updateContent}
      >
        {/* Preview Content */}
        <div className="space-y-8">
          {/* Hero Section */}
          <CMSCard elementId="hero" className="text-center py-16">
            <CMSText variant="primary" as="h1" className="text-4xl font-bold mb-4">
              {content?.hero?.title || 'Support Our Mission'}
            </CMSText>
            <CMSText variant="secondary" className="text-xl mb-8">
              {content?.hero?.subtitle || 'Help us preserve and share ancient Indian wisdom'}
            </CMSText>
            <div className="flex justify-center space-x-4">
              <CMSButton variant="primary" elementId="hero-cta">
                Donate Now
              </CMSButton>
              <CMSButton variant="secondary" elementId="hero-learn">
                Learn More
              </CMSButton>
            </div>
          </CMSCard>

          {/* Impact Section */}
          <CMSCard elementId="impact" className="py-12">
            <CMSText variant="primary" as="h2" className="text-3xl font-bold text-center mb-8">
              {content?.impact?.title || 'Your Impact'}
            </CMSText>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <CMSCard key={item} elementId={`impact-${item}`} className="text-center p-6">
                  <CMSText variant="accent" as="h3" className="text-2xl font-bold mb-2">
                    {item === 1 ? '₹50L+' : item === 2 ? '2000+' : '25+'}
                  </CMSText>
                  <CMSText variant="secondary">
                    {item === 1 ? 'Raised' : item === 2 ? 'Supporters' : 'Projects'}
                  </CMSText>
                </CMSCard>
              ))}
            </div>
          </CMSCard>

          {/* Causes Section */}
          <CMSCard elementId="causes" className="py-12">
            <CMSText variant="primary" as="h2" className="text-3xl font-bold text-center mb-8">
              {content?.causes?.title || 'Support Our Causes'}
            </CMSText>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Sanskrit Preservation', description: 'Digitize ancient manuscripts' },
                { title: 'Teacher Training', description: 'Train rural teachers' },
                { title: 'Mobile Learning', description: 'Develop learning apps' }
              ].map((cause, index) => (
                <CMSCard key={index} elementId={`cause-${index}`} className="p-6">
                  <CMSText variant="primary" as="h3" className="text-xl font-semibold mb-2">
                    {cause.title}
                  </CMSText>
                  <CMSText variant="secondary" className="mb-4">
                    {cause.description}
                  </CMSText>
                  <CMSButton variant="primary" elementId={`cause-btn-${index}`}>
                    Support This Cause
                  </CMSButton>
                </CMSCard>
              ))}
            </div>
          </CMSCard>

          {/* Donation Options */}
          <CMSCard elementId="options" className="py-12">
            <CMSText variant="primary" as="h2" className="text-3xl font-bold text-center mb-8">
              {content?.options?.title || 'Choose Your Donation'}
            </CMSText>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { amount: '₹500', description: 'Support one student' },
                { amount: '₹1,000', description: 'Fund one course' },
                { amount: '₹5,000', description: 'Preserve one manuscript' }
              ].map((option, index) => (
                <CMSCard key={index} elementId={`option-${index}`} className="text-center p-6">
                  <CMSText variant="accent" as="h3" className="text-3xl font-bold mb-2">
                    {option.amount}
                  </CMSText>
                  <CMSText variant="secondary" className="mb-4">
                    {option.description}
                  </CMSText>
                  <CMSButton variant="primary" elementId={`option-btn-${index}`}>
                    Donate {option.amount}
                  </CMSButton>
                </CMSCard>
              ))}
            </div>
          </CMSCard>

          {/* Testimonials */}
          <CMSCard elementId="testimonials" className="py-12">
            <CMSText variant="primary" as="h2" className="text-3xl font-bold text-center mb-8">
              {content?.testimonials?.title || 'What Our Donors Say'}
            </CMSText>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: 'Priya Sharma', quote: 'Supporting Sanskrit preservation has been incredibly rewarding.' },
                { name: 'Rajesh Kumar', quote: 'The impact of my donation is visible in the community.' }
              ].map((testimonial, index) => (
                <CMSCard key={index} elementId={`testimonial-${index}`} className="p-6">
                  <CMSText variant="secondary" className="mb-4 italic">
                    "{testimonial.quote}"
                  </CMSText>
                  <CMSText variant="primary" className="font-semibold">
                    - {testimonial.name}
                  </CMSText>
                </CMSCard>
              ))}
            </div>
          </CMSCard>

          {/* FAQ */}
          <CMSCard elementId="faq" className="py-12">
            <CMSText variant="primary" as="h2" className="text-3xl font-bold text-center mb-8">
              {content?.faq?.title || 'Frequently Asked Questions'}
            </CMSText>
            <div className="space-y-4">
              {[
                { question: 'How is my donation used?', answer: 'Your donation directly funds our preservation and education programs.' },
                { question: 'Is my donation tax-deductible?', answer: 'Yes, we are a registered non-profit organization.' }
              ].map((faq, index) => (
                <CMSCard key={index} elementId={`faq-${index}`} className="p-6">
                  <CMSText variant="primary" as="h3" className="font-semibold mb-2">
                    {faq.question}
                  </CMSText>
                  <CMSText variant="secondary">
                    {faq.answer}
                  </CMSText>
                </CMSCard>
              ))}
            </div>
          </CMSCard>

          {/* Final CTA */}
          <CMSCard elementId="cta" className="text-center py-16">
            <CMSText variant="primary" as="h2" className="text-3xl font-bold mb-4">
              {content?.cta?.title || 'Ready to Make a Difference?'}
            </CMSText>
            <CMSText variant="secondary" className="text-xl mb-8">
              {content?.cta?.subtitle || 'Join thousands of supporters in preserving ancient wisdom'}
            </CMSText>
            <div className="flex justify-center space-x-4">
              <CMSButton variant="primary" elementId="cta-donate">
                Donate Now
              </CMSButton>
              <CMSLink href="/contact" elementId="cta-contact">
                Contact Us
              </CMSLink>
            </div>
          </CMSCard>
        </div>
      </UniversalCMS>
    </div>
  );
}

export default function DonationCMSEnhanced() {
  return (
    <UniversalCMSProvider pageId="donation">
      <DonationCMSContent />
    </UniversalCMSProvider>
  );
}
