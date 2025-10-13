'use client'

import { useState } from 'react'

interface FAQItem {
  id: string
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    id: 'what-is-course',
    question: 'What is Emotional Intelligence with Samkhya Darshan?',
    answer: 'This is a transformative course that combines ancient Samkhya philosophy with modern emotional intelligence principles. You\'ll learn to understand and manage your emotions using time-tested wisdom from one of India\'s oldest philosophical systems, making it highly practical for modern life challenges.'
  },
  {
    id: 'course-validity',
    question: 'How long is the course valid?',
    answer: 'You get 1-year access to all course materials from the date of enrollment. During this period, you can revisit the content anytime, anywhere, as many times as you want. This gives you ample time to complete the course at your own pace and revisit lessons as needed.'
  },
  {
    id: 'access-after-completion',
    question: 'Can I access the course after completion?',
    answer: 'Yes! As long as you\'re within the 1-year validity period, you can continue to access all course materials even after completing the course. This allows you to revise and reinforce your learning whenever you need a refresher.'
  },
  {
    id: 'after-one-year',
    question: 'What happens after 1 year?',
    answer: 'After 1 year, your access to the course materials will expire. However, any certificates earned and downloaded materials will remain with you permanently. You can also re-enroll at that time if you wish to continue learning and accessing updated content.'
  },
  {
    id: 'prerequisites',
    question: 'Do I need any prior knowledge of philosophy or psychology?',
    answer: 'No prior knowledge is required! The course is designed for complete beginners and takes you step-by-step through the concepts. We start with fundamentals and build up gradually, making ancient wisdom accessible and practical for everyone.'
  },
  {
    id: 'practical-application',
    question: 'How can I apply this in my daily life?',
    answer: 'Each module includes practical exercises, real-life scenarios, and actionable techniques you can implement immediately. You\'ll learn to manage stress, improve relationships, make better decisions, and achieve emotional balance using these time-tested principles.'
  },
  {
    id: 'certificate-validity',
    question: 'Is the certificate permanently valid?',
    answer: 'Yes! Upon successful completion of the course, you\'ll receive a certificate that is yours to keep permanently. You can add it to your LinkedIn profile, resume, and use it to showcase your expertise in emotional intelligence and personal development. The certificate remains valid even after your course access expires.'
  },
  {
    id: 'mobile-access',
    question: 'Can I access the course on my mobile device?',
    answer: 'Absolutely! The course is fully optimized for mobile devices. You can watch videos, download materials, and complete exercises from your smartphone or tablet, allowing you to learn on the go.'
  },
  {
    id: 'community-support',
    question: 'Do I get community support?',
    answer: 'Yes! You\'ll have access to our learning community during your 1-year access period where you can ask questions, share experiences, and connect with fellow learners on the same journey of emotional growth.'
  },
  {
    id: 'instructor-support',
    question: 'What kind of instructor support is available?',
    answer: 'Our instructors provide guidance through the community forum and regular Q&A sessions. You can ask questions about the concepts, seek clarification on techniques, and get personalized advice for applying the principles to your specific situations.'
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
            Have questions about Emotional Intelligence with Samkhya Darshan? We've compiled the most common questions 
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
