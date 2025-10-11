'use client'

import { useState, useEffect } from 'react'
import { EnhancedCourseHero, EnhancedCourseContent, EnhancedCoursePricing } from '@/components/course'

export default function SanskritBhashaPragyaPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleEnroll = () => {
    console.log('Enrolling in Sanskrit Bhasha Pragya course')
  }

  const handlePreview = () => {
    console.log('Playing preview for Sanskrit Bhasha Pragya')
  }

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <EnhancedCourseHero
        title="संस्कृत भाषा प्रज्ञा: Online Sanskrit Course in Hindi for Beginners"
        subtitle="Master the Divine Language"
        description="Comprehensive Sanskrit language course taught in Hindi for complete beginners. Learn grammar, vocabulary, and develop reading skills systematically."
        type="Language Course"
        price="₹2,499"
        originalPrice="₹3,499"
        duration="12-15 weeks"
        level="Beginner"
        language="Hindi"
        rating={4.8}
        studentsCount={2100}
        features={[
          "Hindi Instruction",
          "Grammar Fundamentals",
          "Reading Practice",
          "Writing Exercises",
          "Vocabulary Building",
          "Cultural Context"
        ]}
        onEnroll={handleEnroll}
        onPreview={handlePreview}
      />

      {/* Enhanced Course Content */}
      <EnhancedCourseContent
        whatYouWillLearn={[
          "Master Sanskrit Devanagari script",
          "Understand basic grammar rules",
          "Build essential vocabulary",
          "Read simple Sanskrit texts",
          "Write basic Sanskrit sentences",
          "Appreciate Sanskrit literature"
        ]}
        features={[
          "Hindi Instruction",
          "Grammar Fundamentals", 
          "Reading Practice",
          "Writing Exercises",
          "Vocabulary Building",
          "Cultural Context"
        ]}
        requirements={[
          "Ability to read Hindi (Devanagari script)",
          "Interest in Sanskrit language and culture",
          "Regular practice and dedication",
          "Basic understanding of Indian culture helpful"
        ]}
        curriculum={[
          {
            title: "Devanagari Script & Pronunciation",
            description: "Master the Sanskrit alphabet and proper pronunciation",
            duration: "3 hours",
            lessons: 6
          },
          {
            title: "Basic Grammar Foundation",
            description: "Noun declensions, verb conjugations, and sentence structure",
            duration: "6 hours",
            lessons: 12
          },
          {
            title: "Vocabulary & Word Formation",
            description: "Essential words, compound formation, and roots",
            duration: "4 hours",
            lessons: 8
          },
          {
            title: "Reading Practice",
            description: "Simple texts, shlokas, and comprehension exercises",
            duration: "5 hours",
            lessons: 10
          }
        ]}
        instructor="Dr. Kavita Sharma"
        instructorBio="PhD in Sanskrit Literature with 20+ years of teaching experience. Expert in making Sanskrit accessible to modern learners."
        rating={4.8}
        studentsCount={2100}
        longDescription="This comprehensive Sanskrit course is designed specifically for Hindi speakers who want to learn Sanskrit from scratch. The course covers everything from basic script to reading classical texts, with emphasis on practical application and cultural understanding."
      />

      {/* Enhanced Course Pricing */}
      <EnhancedCoursePricing
        price="₹2,499"
        originalPrice="₹3,499"
        savings="₹1,000"
        features={[
          "Hindi Instruction",
          "Grammar Fundamentals",
          "Reading Practice",
          "Writing Exercises",
          "Vocabulary Building",
          "Cultural Context"
        ]}
        duration="12-15 weeks"
        level="Beginner"
        studentsCount={2100}
        rating={4.8}
        onEnroll={handleEnroll}
        urgencyMessage="Learn the Divine Language"
        guaranteeText="30-Day Money Back Guarantee"
        bonusItems={[
          "Sanskrit Dictionary Access",
          "Practice Worksheets",
          "Audio Pronunciation Guide",
          "Classical Text Library"
        ]}
      />
    </div>
  )
}