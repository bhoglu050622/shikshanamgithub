'use client'

import { useState, useEffect } from 'react'
import { EnhancedCourseHero, EnhancedCourseContent, EnhancedCoursePricing } from '@/components/course'

export default function SamkhyaDarshanPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleEnroll = () => {
    console.log('Enrolling in Samkhya Darshan course')
  }

  const handlePreview = () => {
    console.log('Playing preview for Samkhya Darshan')
  }

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <EnhancedCourseHero
        title="सांख्य दर्शन: The Philosophy of Cosmic Evolution"
        subtitle="Understanding Purusha and Prakriti"
        description="Explore the dualistic philosophy of Samkhya, understanding the eternal dance between consciousness (Purusha) and nature (Prakriti). Learn the 25 principles of cosmic evolution."
        type="Philosophy Course"
        price="₹1,299"
        originalPrice="₹1,999"
        duration="8-10 weeks"
        level="Intermediate"
        language="Sanskrit & Hindi"
        rating={4.8}
        studentsCount={1100}
        features={[
          "25 Tattvas Study",
          "Purusha-Prakriti Analysis",
          "Three Gunas Exploration",
          "Cosmic Evolution Theory",
          "Practical Applications",
          "Classical Texts"
        ]}
        onEnroll={handleEnroll}
        onPreview={handlePreview}
      />

      {/* Enhanced Course Content */}
      <EnhancedCourseContent
        whatYouWillLearn={[
          "Understand the 25 principles (Tattvas) of existence",
          "Explore the relationship between Purusha and Prakriti",
          "Study the three Gunas (Sattva, Rajas, Tamas)",
          "Learn about cosmic evolution and involution",
          "Understand the nature of consciousness",
          "Apply Samkhya principles to personal development"
        ]}
        features={[
          "25 Tattvas Study",
          "Purusha-Prakriti Analysis",
          "Three Gunas Exploration",
          "Cosmic Evolution Theory",
          "Practical Applications",
          "Classical Texts"
        ]}
        requirements={[
          "Interest in philosophical systems",
          "Basic understanding of Indian philosophy",
          "Analytical thinking ability",
          "Regular study and contemplation"
        ]}
        curriculum={[
      {
        title: "Introduction to Samkhya Philosophy",
            description: "Historical background and key concepts",
        duration: "2 hours",
            lessons: 4
          },
          {
            title: "Purusha and Prakriti",
            description: "The fundamental duality of consciousness and nature",
            duration: "4 hours",
            lessons: 8
      },
      {
        title: "The 25 Tattvas",
            description: "Detailed study of the principles of existence",
            duration: "6 hours",
            lessons: 12
          },
          {
            title: "Three Gunas and Evolution",
            description: "Understanding the cosmic process of evolution",
            duration: "4 hours",
            lessons: 8
          }
        ]}
        instructor="Acharya Suresh Mishra"
        instructorBio="Traditional scholar of Samkhya philosophy with 25+ years of teaching experience and deep expertise in classical Indian philosophical systems."
        rating={4.8}
        studentsCount={1100}
        longDescription="Samkhya Darshan, one of the oldest philosophical systems of India, provides a comprehensive framework for understanding reality through the interplay of consciousness and nature. This course explores the systematic evolution of the cosmos from its primordial state."
      />

      {/* Enhanced Course Pricing */}
      <EnhancedCoursePricing
        price="₹1,299"
        originalPrice="₹1,999"
        savings="₹700"
              features={[
          "25 Tattvas Study",
          "Purusha-Prakriti Analysis",
          "Three Gunas Exploration",
          "Cosmic Evolution Theory",
          "Practical Applications",
          "Classical Texts"
        ]}
        duration="8-10 weeks"
        level="Intermediate"
        studentsCount={1100}
        rating={4.8}
        onEnroll={handleEnroll}
        urgencyMessage="Understand Cosmic Evolution"
        guaranteeText="30-Day Money Back Guarantee"
        bonusItems={[
          "Tattva Classification Charts",
          "Guna Assessment Tools",
          "Meditation Practice Guide",
          "Philosophy Study Group"
        ]}
      />
    </div>
  )
}