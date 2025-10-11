'use client'

import { useState, useEffect } from 'react'
import { EnhancedCourseHero, EnhancedCourseContent, EnhancedCoursePricing } from '@/components/course'

export default function IshaUpanishadCoursePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleEnroll = () => {
    console.log('Enrolling in Isha Upanishad course')
  }

  const handlePreview = () => {
    console.log('Playing preview for Isha Upanishad')
  }

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <EnhancedCourseHero
        title="ईशावास्य उपनिषद्: Online Course on The Isha Upanishad"
        subtitle="The Essence of Vedantic Wisdom"
        description="Explore the first and most concise Upanishad that encapsulates the entire philosophy of Vedanta in just 18 verses. Understand the nature of reality, renunciation, and the path to liberation."
        type="Philosophy Course"
        price="₹1,999"
        originalPrice="₹2,999"
        duration="8-10 weeks"
        level="Intermediate"
        language="Sanskrit & Hindi"
        rating={4.9}
        studentsCount={1500}
        features={[
          "18 Sacred Verses",
          "Vedantic Philosophy",
          "Sanskrit Commentary",
          "Meditation Practices",
          "Spiritual Insights",
          "Life Application"
        ]}
        onEnroll={handleEnroll}
        onPreview={handlePreview}
      />

      {/* Enhanced Course Content */}
      <EnhancedCourseContent
        whatYouWillLearn={[
          "Understand the 18 verses of Isha Upanishad",
          "Explore the concept of Ishavasyam (divine presence)",
          "Learn about renunciation and detachment",
          "Study the nature of action and inaction",
          "Understand the path to liberation (moksha)",
          "Apply Upanishadic wisdom to daily life"
        ]}
        features={[
          "18 Sacred Verses",
          "Vedantic Philosophy",
          "Sanskrit Commentary",
          "Meditation Practices",
          "Spiritual Insights",
          "Life Application"
        ]}
        requirements={[
          "Interest in Vedantic philosophy",
          "Basic understanding of Sanskrit terms helpful",
          "Regular study and contemplation",
          "Open mind towards spiritual concepts"
        ]}
        curriculum={[
          {
            title: "Introduction to Isha Upanishad",
            description: "Context, structure, and significance",
            duration: "2 hours",
            lessons: 4
          },
          {
            title: "Verses 1-6: The Divine Presence",
            description: "Understanding Ishavasyam and renunciation",
            duration: "4 hours",
            lessons: 8
          },
          {
            title: "Verses 7-11: Knowledge and Ignorance",
            description: "The interplay of Vidya and Avidya",
            duration: "3 hours",
            lessons: 6
          },
          {
            title: "Verses 12-18: The Path to Liberation",
            description: "Ultimate realization and prayer",
            duration: "3 hours",
            lessons: 6
          }
        ]}
        instructor="Swami Tattvamayananda"
        instructorBio="Renowned Vedanta scholar and monk of Ramakrishna Order with 30+ years of teaching experience in Upanishadic literature."
        rating={4.9}
        studentsCount={1500}
        longDescription="The Isha Upanishad, also known as Ishavasyopanishad, is the first of the principal Upanishads and contains the essence of Vedantic philosophy in just 18 verses. This course provides a comprehensive study of this foundational text."
      />

      {/* Enhanced Course Pricing */}
      <EnhancedCoursePricing
        price="₹1,999"
        originalPrice="₹2,999"
        savings="₹1,000"
        features={[
          "18 Sacred Verses",
          "Vedantic Philosophy",
          "Sanskrit Commentary",
          "Meditation Practices",
          "Spiritual Insights",
          "Life Application"
        ]}
        duration="8-10 weeks"
        level="Intermediate"
        studentsCount={1500}
        rating={4.9}
        onEnroll={handleEnroll}
        urgencyMessage="Master Vedantic Wisdom"
        guaranteeText="30-Day Money Back Guarantee"
        bonusItems={[
          "Sanskrit Text with Translation",
          "Audio Chanting Guide",
          "Meditation Practice Sessions",
          "Philosophy Discussion Group"
        ]}
      />
    </div>
  )
}