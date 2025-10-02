'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCourseData } from '@/lib/hooks/useCourseData'
import { 
  BookOpen, 
  Users, 
  Clock, 
  Star, 
  ArrowRight,
  Play,
  Download,
  Sparkles,
  Flame,
  Heart,
  Brain,
  Lightbulb,
  Target,
  Award,
  Globe,
  Zap,
  ChevronDown,
  ChevronUp,
  Filter,
  Search,
  Calendar,
  Video,
  Headphones,
  FileText,
  CheckCircle,
  Lock,
  Unlock,
  Crown,
  Gift,
  TrendingUp,
  MessageCircle,
  Instagram,
  Mail,
  ExternalLink,
  User,
  Shield,
  HelpCircle,
  Settings,
  Bell,
  Bookmark,
  Share2,
  ThumbsUp,
  Eye,
  EyeOff,
  IndianRupee,
  Percent,
  Package,
  Phone,
  MapPin,
  Clock3,
  Award as AwardIcon,
  BookMarked,
  GraduationCap,
  Languages,
  UserCheck
} from 'lucide-react'
import MotionWrapper, { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper'

// Type definition for course data
interface CourseData {
  title: string;
  subtitle: string;
  instructor: string;
  language: string;
  price: string;
  originalPrice: string | null;
  duration: string;
  level: string;
  rating: number;
  reviewCount: number;
  type: string;
  status: string;
  checkoutLink: string;
  contactNumber: string;
  features?: any[];
  learningObjectives?: string[];
  keyHighlights?: string[];
  syllabus?: any[];
  testimonials?: any[];
}

// Course data
// Default static data (fallback)
const defaultCourseData = {
  id: 'tantra-darshan',
  title: 'प्राचीन तंत्र दर्शन',
  subtitle: 'Decoding the principles of Tantra',
  instructor: 'Vishal Chaurasia',
  language: 'Hindi',
  price: 'Free',
  originalPrice: null,
  duration: '2-3 hours',
  level: 'All Levels',
  rating: 5,
  reviewCount: 23,
  type: 'Free Course',
  status: 'available',
  checkoutLink: 'https://courses.shikshanam.in/single-checkout/6700f323b6e40105f97a57ed?pid=p1',
  contactNumber: '9910032165'
}

// Course features
const courseFeatures = [
  {
    icon: Gift,
    title: 'Affordable For All',
    description: 'Our course prices are designed to fit everyone\'s budget. We\'ve made sure that affordability is at the heart of what we offer.'
  },
  {
    icon: Clock,
    title: 'Lifetime Access',
    description: 'Enjoy the perk of lifelong access to all our courses. This means you can learn at your own pace, on your own terms, wherever suits you best. No rush, no deadlines.'
  },
  {
    icon: Video,
    title: 'Video Lectures',
    description: 'Dive into learning with our awesome video lessons. They\'re super clear and easy to grasp, making your learning experience way more valuable.'
  },
  {
    icon: Globe,
    title: 'Learning on the Go',
    description: 'Discover learning your way with our easy website and app. Access resources anytime for ultimate learning flexibility.'
  },
  {
    icon: MessageCircle,
    title: 'Doubt Solving',
    description: 'Harness the potential of our interactive community forum for answers to all your queries. Become part of a supportive learning community, where assistance awaits at every step of your journey.'
  },
  {
    icon: Brain,
    title: 'Interactive Learning',
    description: 'Beyond just video lectures, you\'ll also unlock a treasure trove of additional resources like quizzes and notes. These valuable tools are here to enhance your learning experience.'
  }
]

// Learning objectives
const learningObjectives = [
  'शिव शक्ति से विश्व की निर्माण प्रक्रिया',
  'तंत्र के विभिन्न अंग और उनका विज्ञान',
  'एक तांत्रिक विधि जिसे आप नवरात्रि पर प्रारम्भ कर सकते हैं'
]

// Key highlights
const keyHighlights = [
  'प्रत्यभिज्ञाहृदयम ग्रंथ की विवेचना',
  'Presentation के माध्यम से तथ्यों का सरलीकरण',
  'QnA : पाये अपने प्रश्नों का उत्तर'
]

// Syllabus
const syllabus = [
  {
    id: 1,
    title: 'प्राचीन तंत्र दर्शन : Free Class',
    type: 'live_tv',
    duration: 'Class 1',
    description: 'Introduction to ancient Tantra philosophy and its fundamental principles'
  }
]

// Testimonials
const testimonials = [
  {
    name: 'Kaushal Kumar',
    rating: 5,
    comment: 'प्राचीन तंत्र दर्शन',
    verified: true
  },
  {
    name: 'Siba prosad Saikia',
    rating: 5,
    comment: 'बहुत अच्छी जानकारी मिली सिर्फ सुनने मात्र से शांति की अनुभूति हुई 🚩🙏',
    verified: true
  },
  {
    name: 'Rahul Pradhan',
    rating: 5,
    comment: 'Beautiful knowledge',
    verified: true
  },
  {
    name: 'Prashant Tiwari Hardik',
    rating: 5,
    comment: 'vey informative',
    verified: true
  },
  {
    name: 'surinder grover',
    rating: 5,
    comment: 'Jay Shree Ram! Very nicely explained.',
    verified: true
  },
  {
    name: 'Kesav Daund',
    rating: 5,
    comment: 'excellent explained of all points of view',
    verified: true
  },
  {
    name: 'Lalitha Sharma',
    rating: 5,
    comment: 'good',
    verified: true
  },
  {
    name: 'Yash Singh',
    rating: 5,
    comment: 'good class experience and good explanation',
    verified: true
  },
  {
    name: 'kavyansh hindu',
    rating: 5,
    comment: 'o my god',
    verified: true
  },
  {
    name: 'Yes Gamer Raj',
    rating: 5,
    comment: 'धन्यवादम्',
    verified: true
  },
  {
    name: 'Mahesh kumar',
    rating: 5,
    comment: 'great',
    verified: true
  },
  {
    name: 'Being human',
    rating: 5,
    comment: 'good knowledge',
    verified: true
  },
  {
    name: 'Koshal Sharma',
    rating: 5,
    comment: 'thank you',
    verified: true
  },
  {
    name: 'Hardip Khachar',
    rating: 5,
    comment: 'explained very well about tantra which increased curiosity about your hidden conscious power',
    verified: true
  }
]

export default function TantraDarshanCoursePage() {
  const [showAllReviews, setShowAllReviews] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  
  // Use the custom hook for dynamic course data
  const { courseData, loading, error } = useCourseData('tantra-darshan', defaultCourseData)

  // Use dynamic features from courseData or fallback to static
  const dynamicFeatures = courseData.features || courseFeatures
  const dynamicLearningObjectives = courseData.learningObjectives || learningObjectives
  const dynamicKeyHighlights = courseData.keyHighlights || keyHighlights
  const dynamicSyllabus = courseData.syllabus || syllabus
  const dynamicTestimonials = courseData.testimonials || testimonials
  
  const displayedReviews = showAllReviews ? dynamicTestimonials : dynamicTestimonials.slice(0, 5)

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course data...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      
      {/* Hero Section */}
      <section className="relative section-padding overflow-hidden bg-gradient-to-br from-saffron-50/30 via-transparent to-deep-teal-50/30">
        {/* Background Ornaments */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-saffron-200/20 via-deep-teal-200/15 to-indigo-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-br from-deep-teal-200/20 via-indigo-200/15 to-saffron-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle animation-delay-2000"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Course Info */}
            <StaggerContainer>
              <StaggerItem>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center space-x-2 text-saffron-600">
                    <Gift className="w-5 h-5" />
                    <span className="text-sm font-medium">Free Course</span>
                  </div>
                  <div className="flex items-center space-x-2 text-wisdom-500">
                    <Star className="w-4 h-4 fill-current text-yellow-400" />
                    <span className="text-sm">{courseData.rating}/5</span>
                    <span className="text-sm">({courseData.reviewCount} reviews)</span>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <h1 className="text-hero text-high-contrast mb-4">
                  {courseData.title}
                </h1>
                <p className="text-2xl text-saffron-600 mb-6 font-medium">
                  {courseData.subtitle}
                </p>
              </StaggerItem>

              <StaggerItem>
                <div className="flex flex-wrap items-center gap-6 mb-8">
                  <div className="flex items-center space-x-2">
                    <UserCheck className="w-5 h-5 text-wisdom-500" />
                    <span className="text-wisdom-600">Instructor: <span className="font-semibold text-high-contrast">{courseData.instructor}</span></span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Languages className="w-5 h-5 text-wisdom-500" />
                    <span className="text-wisdom-600">Language: <span className="font-semibold text-high-contrast">{courseData.language}</span></span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock3 className="w-5 h-5 text-wisdom-500" />
                    <span className="text-wisdom-600">Duration: <span className="font-semibold text-high-contrast">{courseData.duration}</span></span>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="flex items-center space-x-4 mb-8">
                  <div className="text-3xl font-bold text-green-600">
                    {courseData.price}
                  </div>
                  {courseData.originalPrice && (
                    <div className="text-lg text-wisdom-400 line-through">
                      {courseData.originalPrice}
                    </div>
                  )}
                </div>
              </StaggerItem>

              <StaggerItem>
                <motion.a
                  href={courseData.checkoutLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Play className="w-6 h-6" />
                  <span>Enroll Now - Free</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
              </StaggerItem>
            </StaggerContainer>

            {/* Course Preview */}
            <StaggerContainer>
              <StaggerItem>
                <div className="relative">
                  <div className="card-premium p-8">
                    <div className="aspect-video bg-gradient-to-br from-saffron-100 to-deep-teal-100 rounded-2xl flex items-center justify-center mb-6">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-gradient-to-r from-saffron-500 to-deep-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Play className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-high-contrast mb-2">Course Preview</h3>
                        <p className="text-wisdom-600">Watch introduction to Tantra philosophy</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-wisdom-600">Course Type:</span>
                        <span className="font-semibold text-high-contrast">{courseData.type}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-wisdom-600">Level:</span>
                        <span className="font-semibold text-high-contrast">{courseData.level}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-wisdom-600">Access:</span>
                        <span className="font-semibold text-green-600">Lifetime</span>
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Course Tabs */}
      <section className="section-padding bg-white/50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                { id: 'overview', label: 'Overview', icon: BookOpen },
                { id: 'syllabus', label: 'Syllabus', icon: FileText },
                { id: 'reviews', label: 'Reviews', icon: Star }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-saffron-500 text-white shadow-lg'
                      : 'bg-wisdom-100 text-wisdom-700 hover:bg-wisdom-200'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-12"
                >
                  {/* Course Description */}
                  <div className="card-premium p-8">
                    <h2 className="text-2xl font-display text-high-contrast mb-6">About the Course</h2>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-wisdom-600 leading-relaxed mb-6">
                        इस live चर्चा में, हम प्राचीन तंत्र दर्शन के मौलिक सिद्धांतों की गहराई से समझने का प्रयास करेंगे। मौलिक सिद्धांतों के साथ साथ तंत्र ग्रन्थों के वर्गीकरण, और प्रचलित तांत्रिक विधियों के पीछे का विज्ञान जैसे:- शिव-शक्ति स्वरूप, चक्र, कुंडलिनी, बीजमंत्र, मध्य-विकास विधियाँ आदि प्राचीन तथ्यों को आधुनिक दृष्टिकोण से समझाया जाएगा ।
                      </p>
                      
                      <div className="bg-saffron-50 p-6 rounded-2xl mb-6">
                        <p className="text-wisdom-700 font-medium">
                          आपको नवरात्रि की अनेकों शुभकामनायें । इस free class से जुड़कर आप सभी इस नवरात्रि को और भी ज्ञानवर्धक बनाएँ ।
                        </p>
                        <p className="text-wisdom-600 mt-2">
                          यदि Live Class से जुडने में या अन्य कोई समस्या आए तो आप हमें {courseData.contactNumber} नंबर पर संपर्क करें ।
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* What You Will Learn */}
                  <div className="card-premium p-8">
                    <h2 className="text-2xl font-display text-high-contrast mb-6">What You Will Learn</h2>
                    <div className="space-y-4">
                      {dynamicLearningObjectives.map((objective, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-3"
                        >
                          <div className="w-6 h-6 bg-gradient-to-r from-saffron-500 to-saffron-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                          <p className="text-wisdom-600 leading-relaxed">{objective}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="card-premium p-8">
                    <h2 className="text-2xl font-display text-high-contrast mb-6">Key Highlights</h2>
                    <div className="space-y-4">
                      {dynamicKeyHighlights.map((highlight, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-3"
                        >
                          <div className="w-6 h-6 bg-gradient-to-r from-deep-teal-500 to-deep-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <Sparkles className="w-4 h-4 text-white" />
                          </div>
                          <p className="text-wisdom-600 leading-relaxed">{highlight}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'syllabus' && (
                <motion.div
                  key="syllabus"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="card-premium p-8">
                    <h2 className="text-2xl font-display text-high-contrast mb-6">Course Syllabus</h2>
                    <div className="space-y-4">
                      {dynamicSyllabus.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center space-x-4 p-4 bg-wisdom-50 rounded-xl hover:bg-wisdom-100 transition-colors"
                        >
                          <div className="w-12 h-12 bg-gradient-to-r from-saffron-500 to-saffron-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold">{item.id.toString().padStart(2, '0')}</span>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-high-contrast mb-1">{item.title}</h3>
                            <p className="text-wisdom-600 text-sm">{item.description}</p>
                          </div>
                          <div className="flex items-center space-x-2 text-wisdom-500">
                            <Video className="w-5 h-5" />
                            <span className="text-sm">{item.duration}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="card-premium p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-display text-high-contrast">Student Reviews</h2>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-wisdom-600">({courseData.reviewCount} reviews)</span>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {displayedReviews.map((review, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border-b border-wisdom-200 pb-6 last:border-b-0"
                        >
                          <div className="flex items-start space-x-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-saffron-500 to-saffron-600 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-semibold text-sm">
                                {review.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h4 className="font-semibold text-high-contrast">{review.name}</h4>
                                {review.verified && (
                                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-3 h-3 text-white" />
                                  </div>
                                )}
                                <div className="flex items-center space-x-1">
                                  {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                                  ))}
                                </div>
                              </div>
                              <p className="text-wisdom-600 leading-relaxed">{review.comment}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {testimonials.length > 5 && (
                      <div className="text-center mt-8">
                        <button
                          onClick={() => setShowAllReviews(!showAllReviews)}
                          className="btn-outline flex items-center space-x-2 mx-auto"
                        >
                          <span>{showAllReviews ? 'Show Less' : 'View More Reviews'}</span>
                          {showAllReviews ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Course Features */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-display text-high-contrast mb-4">
              What You Will Get
            </h2>
            <p className="text-body text-wisdom-600 max-w-3xl mx-auto">
              Comprehensive learning experience with lifetime access and expert support
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dynamicFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-premium p-6 text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-saffron-500 to-saffron-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-high-contrast mb-3">
                  {feature.title}
                </h3>
                <p className="text-wisdom-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-gradient-to-br from-saffron-50/30 via-transparent to-deep-teal-50/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="card-premium p-12">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Gift className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-3xl font-display text-high-contrast mb-6">
                Start Your Tantra Journey Today
              </h2>
              
              <p className="text-wisdom-600 mb-8 leading-relaxed">
                Join thousands of students who have already discovered the profound wisdom of ancient Tantra philosophy. 
                This free course is your gateway to understanding the principles that have guided seekers for centuries.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <motion.a
                  href={courseData.checkoutLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary flex items-center space-x-3 px-8 py-4 text-lg"
                >
                  <Play className="w-6 h-6" />
                  <span>Enroll Now - Free</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
                
                <div className="flex items-center space-x-2 text-wisdom-600">
                  <Phone className="w-5 h-5" />
                  <span>Need help? Call {courseData.contactNumber}</span>
                </div>
              </div>
              
              <div className="text-sm text-wisdom-500">
                <p>✓ Lifetime Access ✓ Expert Instruction ✓ Community Support</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </>
  )
}
