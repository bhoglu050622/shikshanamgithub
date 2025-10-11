'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { EnhancedCourseHero, EnhancedCourseContent, EnhancedCoursePricing } from '@/components/course'

export default function ChanakyaCodePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  // Course data extracted from shikshanam.in
  const courseData = {
    title: "Dominate Negotiation & Business Tactics!",
    subtitle: "Chanakya's Code isn't just a course—it's your secret weapon to dominate the game of business and money.",
    checkoutUrl: "https://courses.shikshanam.in/single-checkout/676d65e491299d479661c3aa?pid=p1",
    instructors: [
      {
        name: "Ravi Singh Choudhary",
        title: "Author of Chanakya's Intelligence",
        description: "As an acclaimed author of five books, including Rishi Intelligence and Chanakya's Intelligence, Ravi Singh Choudhary offers profound insights into leadership, strategy, and governance inspired by Chanakya's works. His expertise seamlessly integrate Chanakya's timeless principles into practical frameworks for effective decision-making, team management, and strategic foresight.",
        credentials: [
          "B.Tech graduate in Mechanical Engineering",
          "Over six years of industry experience at HEC Ranchi and Vedanta",
          "Corporate training modules on Tarkashastra for TVS",
          "Convenor of the 10th World Ayurveda Congress",
          "Contributor to India's New Education Policy"
        ],
        image: "https://shikshanam.in/wp-content/uploads/2024/05/ravi-singh-choudhary.jpg"
      },
      {
        name: "Vishal Chaurasia",
        title: "Founder of Hyper Quest, Alumnus-IIT Patna",
        description: "An IIT Patna alumnus and a Cultural Entrepreneur, Vishal Chaurasia combines his expertise in Indian philosophy and modern education to foster transformative learning experiences. As the founder of Shikshanam, a platform dedicated to teaching Hindu Darshans, Sanskrit, and Upanishads, Vishal has revolutionized how ancient wisdom is taught, making it accessible to over 1 lakh learners globally.",
        credentials: [
          "IIT Patna alumnus",
          "Founder of Shikshanam platform",
          "YouTube channel with 1.5 million subscribers",
          "Cultural Entrepreneur",
          "Expert in Indian philosophy and modern education"
        ],
        socialStats: {
          followers: 1500000,
          students: 100000,
          rating: 4.9
        },
        image: "https://shikshanam.in/wp-content/uploads/2024/05/vishal-chaurasia.jpg"
      }
    ],
    features: [
      "Negotiation Mastery",
      "Persuasion Tactics", 
      "Leadership Excellence",
      "Team Building Skills",
      "Competitive Strategies",
      "Strategic Decision Making",
      "Business Intelligence",
      "Ancient Wisdom for Modern Success"
    ],
    modules: [
      {
        title: "Step 1: Unlock the Secret Code",
        description: "Discover a timeless principle from Chanakya that forms the foundation of your strategy.",
        duration: "2 hours",
        lessons: [
          { title: "Introduction to Chanakya's Philosophy", duration: "30 min", type: "video" as const },
          { title: "The Secret Code Revealed", duration: "45 min", type: "video" as const },
          { title: "Foundation Principles", duration: "45 min", type: "reading" as const }
        ]
      },
      {
        title: "Step 2: The Code in Action",
        description: "Learn how to apply the principle with actionable case studies tailored to startups and businesses.",
        duration: "3 hours",
        lessons: [
          { title: "Real-world Applications", duration: "60 min", type: "video" as const },
          { title: "Case Study Analysis", duration: "60 min", type: "video" as const },
          { title: "Startup Strategies", duration: "60 min", type: "video" as const }
        ]
      },
      {
        title: "Step 3: Conquer the Challenge",
        description: "Solve a high-stakes problem to prove your mastery of the code.",
        duration: "2.5 hours",
        lessons: [
          { title: "Challenge Scenarios", duration: "45 min", type: "video" as const },
          { title: "Problem Solving Framework", duration: "60 min", type: "video" as const },
          { title: "Mastery Assessment", duration: "45 min", type: "quiz" as const }
        ]
      }
    ],
    testimonials: [
      {
        text: "This course exposed the gaps in my thinking. I always thought I was smart in business. A must-do!",
        author: "Aman Bhogal",
        role: "Entrepreneur"
      },
      {
        text: "Negotiation ka section truly amazing tha! Jo strategies maine seekhi, unhe apply karke maine kuch hi mahino mein 15% ka salary hike le liya!",
        author: "Marina Zeliang",
        role: "Marketing Manager"
      },
      {
        text: "Bhai this is not just a course, this is a mindset shift. Chanakya ji ka gyaan real life mein kaise kaam karta hai, ab samajh aaya.",
        author: "Ravi Verma",
        role: "Business Analyst"
      },
      {
        text: "Simple language, deep concepts. Aur samajh aata jaa raha tha toh maza aa raha tha.",
        author: "Neha Singh",
        role: "Law Student"
      },
      {
        text: "Powerful insights. You feel like you're learning from the original mastermind.",
        author: "Manan Gupta",
        role: "Strategy Consultant"
      }
    ]
  }

  const handleEnroll = () => {
    window.open(courseData.checkoutUrl, '_blank')
  }

  const handlePreview = () => {
    // Handle video preview logic
    console.log('Playing preview for Chanakya Code')
  }

  return (
    <div id="chanakya-course" className="min-h-screen">
      {/* Enhanced Hero Section */}
      <EnhancedCourseHero
        title="Chanakya's Code: Dominate Negotiation & Business Tactics!"
        subtitle={courseData.subtitle}
        description="Master ancient business wisdom and negotiation strategies from Chanakya's teachings. Learn the timeless principles that shaped empires and apply them to modern business challenges."
        type="Premium Course"
        price="₹3,999"
        originalPrice="₹5,999"
        duration="8-10 weeks"
        level="Professional"
        language="English & Hindi"
        rating={4.9}
        studentsCount={1250}
        features={courseData.features}
        image="https://shikshanam.in/wp-content/uploads/2024/05/chanakya-code-hero.jpg"
        onEnroll={handleEnroll}
        onPreview={handlePreview}
      />

      {/* Enhanced Course Content */}
      <EnhancedCourseContent
        whatYouWillLearn={[
          "Master negotiation tactics from ancient wisdom",
          "Develop strategic thinking abilities", 
          "Learn leadership principles that last",
          "Apply business ethics in modern context",
          "Handle crisis situations effectively",
          "Build lasting business relationships"
        ]}
        features={courseData.features}
        requirements={[
          "Basic understanding of business concepts",
          "Willingness to learn and apply ancient wisdom",
          "Open mind towards philosophical approaches",
          "Commitment to complete the course"
        ]}
        curriculum={courseData.modules.map(module => ({
          title: module.title,
          description: module.description,
          duration: module.duration,
          lessons: module.lessons.length
        }))}
        instructor="Ravi Singh Choudhary & Vishal Chaurasia"
        instructorBio="Expert instructors with deep knowledge of Chanakya's principles and modern business applications."
        rating={4.9}
        studentsCount={1250}
        longDescription="This comprehensive course delves deep into the strategic wisdom of Chanakya, the ancient Indian philosopher and royal advisor. You'll learn negotiation tactics, leadership principles, and business strategies that have stood the test of time for over 2000 years."
      />

      {/* Enhanced Course Pricing */}
      <EnhancedCoursePricing
        price="₹3,999"
        originalPrice="₹5,999"
        savings="₹2,000"
        features={courseData.features}
        duration="8-10 weeks"
        level="Professional"
        studentsCount={1250}
        rating={4.9}
        onEnroll={handleEnroll}
        urgencyMessage="Master Ancient Business Wisdom"
        guaranteeText="30-Day Money Back Guarantee"
        bonusItems={[
          "Exclusive Case Studies",
          "Business Strategy Templates",
          "Leadership Assessment Tools",
          "Lifetime Course Updates"
        ]}
      />
    </div>
  )
}