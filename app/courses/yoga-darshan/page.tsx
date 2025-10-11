'use client'

import { useState, useEffect } from 'react'
import { EnhancedCourseHero, EnhancedCourseContent, EnhancedCoursePricing } from '@/components/course'

export default function YogaDarshanPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleEnroll = () => {
    console.log('Enrolling in Yoga Darshan course')
  }

  const handlePreview = () => {
    console.log('Playing preview for Yoga Darshan')
  }

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <EnhancedCourseHero
        title="योग दर्शन: Yoga Philosophy through Patanjali Yoga Sutras"
        subtitle="Transform Your Life with Ancient Wisdom"
        description="Transform your life with the wisdom of all 195 Yoga Sutras of Maharshi Patanjali. Understand the complete philosophy of yoga beyond physical postures."
        type="Philosophy Course"
        price="₹1,999"
        originalPrice="₹2,999"
        duration="10-12 weeks"
        level="Beginner"
        language="Sanskrit & Hindi"
        rating={4.9}
        studentsCount={1800}
        features={[
          "195 Sutras Covered",
          "4 Chapters",
          "Live Q&A",
          "Certification",
          "Meditation Practices",
          "Philosophy Integration"
        ]}
        onEnroll={handleEnroll}
        onPreview={handlePreview}
      />

      {/* Enhanced Course Content */}
      <EnhancedCourseContent
        whatYouWillLearn={[
          "Understand the complete philosophy of yoga",
          "Study all 195 Yoga Sutras systematically",
          "Learn the eight limbs of yoga (Ashtanga)",
          "Develop meditation and concentration skills",
          "Apply yogic principles to daily life",
          "Achieve mental clarity and spiritual growth"
        ]}
        features={[
          "195 Sutras Covered",
          "4 Chapters",
          "Live Q&A",
      "Certification",
          "Meditation Practices",
          "Philosophy Integration"
        ]}
        requirements={[
          "Interest in yoga philosophy",
          "Basic understanding of yoga helpful but not required",
          "Regular study and practice commitment",
          "Open mind towards spiritual concepts"
        ]}
        curriculum={[
          {
            title: "Samadhi Pada (Concentration)",
            description: "The first chapter on concentration and absorption",
            duration: "4 hours",
            lessons: 8
          },
          {
            title: "Sadhana Pada (Practice)",
            description: "The practical path including eight limbs of yoga",
            duration: "5 hours",
            lessons: 10
          },
          {
            title: "Vibhuti Pada (Supernatural Powers)",
            description: "Advanced practices and psychic abilities",
            duration: "4 hours",
            lessons: 8
          },
          {
            title: "Kaivalya Pada (Liberation)",
            description: "The final goal of yoga - absolute freedom",
        duration: "3 hours",
            lessons: 6
          }
        ]}
        instructor="Swami Yogananda"
        instructorBio="Traditional yoga teacher with 25+ years of experience in Patanjali Yoga Sutras and classical yoga philosophy."
        rating={4.9}
        studentsCount={1800}
        longDescription="This comprehensive course covers all 195 sutras of Patanjali's Yoga Sutras, the foundational text of yoga philosophy. Students will gain deep understanding of the complete yogic path from ethical guidelines to ultimate liberation."
      />

      {/* Enhanced Course Pricing */}
      <EnhancedCoursePricing
        price="₹1,999"
        originalPrice="₹2,999"
        savings="₹1,000"
              features={[
          "195 Sutras Covered",
          "4 Chapters",
          "Live Q&A",
          "Certification",
          "Meditation Practices",
          "Philosophy Integration"
        ]}
        duration="10-12 weeks"
        level="Beginner"
        studentsCount={1800}
        rating={4.9}
        onEnroll={handleEnroll}
        urgencyMessage="Transform Your Life Today"
        guaranteeText="30-Day Money Back Guarantee"
        bonusItems={[
          "Sanskrit Text with Translation",
          "Guided Meditation Sessions",
          "Yoga Philosophy Handbook",
          "Monthly Live Discussions"
        ]}
      />
    </div>
  )
}