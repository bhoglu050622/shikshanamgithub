'use client'

import { useState } from 'react'

interface FAQItem {
  id: string
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    id: 'what-is-chanakya-code',
    question: 'What is Chanakya\'s Code and how is it different from other business courses?',
    answer: 'Chanakya\'s Code is a comprehensive course based on the ancient wisdom of Chanakya\'s Arthashastra, adapted for modern business challenges. Unlike generic business courses, it provides time-tested principles that have been proven effective for over 2000 years. The course combines ancient strategic thinking with contemporary business applications, giving you a unique advantage in negotiations, leadership, and strategic decision-making.'
  },
  {
    id: 'course-duration',
    question: 'How long does the course take to complete?',
    answer: 'The course is designed to be completed at your own pace. The core content includes 12 comprehensive modules that can be completed in 4-6 weeks with 2-3 hours of study per week. However, you have lifetime access, so you can revisit the material whenever you need a refresher or want to dive deeper into specific topics.'
  },
  {
    id: 'prerequisites',
    question: 'Do I need any prior knowledge or experience to take this course?',
    answer: 'No prior knowledge of ancient Indian philosophy or business strategy is required. The course is designed for professionals at all levels - from entrepreneurs and managers to executives and consultants. We start with the fundamentals and build up to advanced applications, making it accessible to beginners while providing valuable insights for experienced professionals.'
  },
  {
    id: 'practical-application',
    question: 'How practical and applicable are these ancient principles in modern business?',
    answer: 'Extremely practical! Each lesson includes real-world case studies, modern examples, and actionable frameworks you can implement immediately. We\'ve helped over 10,000 professionals apply these principles to close multi-million dollar deals, resolve team conflicts, and make strategic decisions. The principles are timeless because they address fundamental human psychology and strategic thinking that hasn\'t changed over the centuries.'
  },
  {
    id: 'money-back-guarantee',
    question: 'What is your refund policy?',
    answer: 'We offer a 30-day money-back guarantee. If you\'re not completely satisfied with the course content, quality, or value, simply contact our support team within 30 days of purchase, and we\'ll provide a full refund, no questions asked. We\'re confident in the value we provide, which is why we can offer this guarantee.'
  },
  {
    id: 'bonus-materials',
    question: 'What bonus materials are included with the course?',
    answer: 'You\'ll receive over $1,200 worth of bonus materials including: Negotiation templates and scripts, Leadership style assessment, Strategic thinking workbook, 50+ real-world case studies, Audio lesson summaries, and access to our private mastermind community. All bonuses are included at no extra cost when you enroll today.'
  },
  {
    id: 'community-access',
    question: 'Do I get access to a community or support group?',
    answer: 'Yes! You\'ll get lifetime access to our exclusive private community where you can network with other successful professionals, ask questions, share experiences, and get ongoing support from our instructors and fellow students. This community has been instrumental in helping students apply the principles and achieve their goals.'
  },
  {
    id: 'mobile-access',
    question: 'Can I access the course on my mobile device?',
    answer: 'Absolutely! The course is fully optimized for mobile devices. You can watch videos, download materials, and access the community from your smartphone or tablet. We also provide audio summaries of all lessons so you can learn during your commute or workout.'
  },
  {
    id: 'certificate',
    question: 'Do I receive a certificate upon completion?',
    answer: 'Yes, upon successful completion of the course, you\'ll receive a certificate of completion that you can add to your LinkedIn profile and resume. This certificate demonstrates your commitment to professional development and mastery of strategic thinking principles.'
  },
  {
    id: 'instructor-support',
    question: 'What kind of support do I get from the instructors?',
    answer: 'Our instructors are actively involved in the community and regularly answer questions, provide additional insights, and share new case studies. You also get access to monthly live Q&A sessions where you can ask specific questions about applying the principles to your unique business challenges.'
  }
]

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  return (
    <section className="section-padding bg-gradient-to-br from-sand-beige to-parchment-ivory">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-display font-bold text-text-primary mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-body text-text-secondary max-w-3xl mx-auto text-readable">
            Have questions about Chanakya's Code? We've compiled the most common questions 
            and detailed answers to help you make an informed decision.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-text-primary pr-4">
                    {item.question}
                  </h3>
                  <div className={`transform transition-transform duration-300 flex-shrink-0 ${
                    openItems.has(item.id) ? 'rotate-180' : ''
                  }`}>
                    <svg className="w-6 h-6 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {openItems.has(item.id) && (
                  <div className="px-6 pb-6 animate-fade-in">
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-text-secondary text-readable leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Still Have Questions CTA */}
          <div className="text-center mt-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-text-primary mb-4">
                Still Have Questions?
              </h3>
              <p className="text-text-secondary mb-6 text-readable">
                Our support team is here to help! If you have any questions not covered in our FAQ, 
                feel free to reach out to us directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-shikshanam-primary px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Contact Support
                </button>
                <button className="btn-shikshanam-outline px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Schedule a Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
