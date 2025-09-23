import { Metadata } from 'next'
import { BookOpen, Users, Clock, Star, CheckCircle, ArrowRight, Globe, MessageSquare, Brain, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sanskrit Beginner - Complete Foundation Course | Shikshanam',
  description: 'Complete Sanskrit foundation course from basics to conversation level. Learn grammar fundamentals, vocabulary building, and conversation practice with cultural context.',
}

export default function SanskritBeginnerPage() {
  return (
    <main className="main-container py-16">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-saffron-100 to-peacock-green-100 text-saffron-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            <span>Premium Course</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            संस्कृत: प्रारंभ से संभाषण तक
          </h1>
          <h2 className="text-2xl text-gray-700 mb-6">
            Sanskrit: From Beginning to Conversation
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Complete Sanskrit foundation course from basics to conversation level. Learn grammar fundamentals, vocabulary building, and conversation practice with cultural context.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mb-8">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>12-15 weeks</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Beginner Level</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4" />
              <span>4.9/5 Rating</span>
            </div>
          </div>
          
          <div className="text-3xl font-bold text-saffron-600 mb-8">
            ₹2,898
          </div>
          
          <button className="bg-gradient-to-r from-saffron-600 to-saffron-700 hover:from-saffron-700 hover:to-saffron-800 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Enroll Now
          </button>
        </div>

        {/* Course Overview */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Course Overview</h2>
            <p className="text-gray-600 mb-6">
              This comprehensive Sanskrit foundation course is designed for complete beginners who want to learn Sanskrit from the ground up. You'll start with the basics of Devanagari script and gradually build up to conversational Sanskrit.
            </p>
            <p className="text-gray-600 mb-6">
              The course combines traditional learning methods with modern pedagogical approaches, making Sanskrit accessible and enjoyable for learners of all backgrounds.
            </p>
            
            <div className="bg-gradient-to-r from-saffron-50 to-peacock-green-50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">What You'll Learn</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2 text-gray-600">
                  <CheckCircle className="w-4 h-4 text-saffron-600" />
                  <span>Devanagari script reading and writing</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-600">
                  <CheckCircle className="w-4 h-4 text-saffron-600" />
                  <span>Basic Sanskrit grammar and sentence structure</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-600">
                  <CheckCircle className="w-4 h-4 text-saffron-600" />
                  <span>Essential vocabulary for daily conversation</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-600">
                  <CheckCircle className="w-4 h-4 text-saffron-600" />
                  <span>Cultural context and traditional wisdom</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Course Features</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-saffron-100 rounded-full flex items-center justify-center mt-1">
                  <BookOpen className="w-4 h-4 text-saffron-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Grammar Fundamentals</h4>
                  <p className="text-gray-600 text-sm">Master the basics of Sanskrit grammar</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-saffron-100 rounded-full flex items-center justify-center mt-1">
                  <Brain className="w-4 h-4 text-saffron-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Vocabulary Building</h4>
                  <p className="text-gray-600 text-sm">Build a strong foundation of essential words</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-saffron-100 rounded-full flex items-center justify-center mt-1">
                  <MessageSquare className="w-4 h-4 text-saffron-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Conversation Practice</h4>
                  <p className="text-gray-600 text-sm">Practice speaking Sanskrit in real scenarios</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-saffron-100 rounded-full flex items-center justify-center mt-1">
                  <Heart className="w-4 h-4 text-saffron-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Cultural Context</h4>
                  <p className="text-gray-600 text-sm">Understand the cultural significance of Sanskrit</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Curriculum */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Course Curriculum</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Module 1: Introduction to Sanskrit & Devanagari Script</h3>
                <span className="text-sm text-gray-500">Week 1-3</span>
              </div>
              <p className="text-gray-600 mb-4">Learn the basics of Sanskrit language and master the Devanagari script.</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Introduction to Sanskrit language and its importance</li>
                <li>• Devanagari script: vowels and consonants</li>
                <li>• Basic pronunciation and phonetics</li>
                <li>• Writing practice and exercises</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Module 2: Basic Grammar & Sentence Structure</h3>
                <span className="text-sm text-gray-500">Week 4-6</span>
              </div>
              <p className="text-gray-600 mb-4">Understand the fundamental grammar rules and sentence construction.</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Nouns and their declensions</li>
                <li>• Verbs and their conjugations</li>
                <li>• Basic sentence patterns</li>
                <li>• Gender, number, and case</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Module 3: Essential Vocabulary & Phrases</h3>
                <span className="text-sm text-gray-500">Week 7-9</span>
              </div>
              <p className="text-gray-600 mb-4">Build a strong vocabulary foundation with commonly used words and phrases.</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Family and relationships</li>
                <li>• Daily activities and routines</li>
                <li>• Numbers, colors, and basic adjectives</li>
                <li>• Common verbs and their usage</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Module 4: Conversation Practice & Cultural Context</h3>
                <span className="text-sm text-gray-500">Week 10-12</span>
              </div>
              <p className="text-gray-600 mb-4">Practice conversational Sanskrit and understand its cultural significance.</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Greetings and polite expressions</li>
                <li>• Simple conversations and dialogues</li>
                <li>• Cultural context and traditions</li>
                <li>• Introduction to classical texts</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Module 5: Advanced Practice & Reading</h3>
                <span className="text-sm text-gray-500">Week 13-15</span>
              </div>
              <p className="text-gray-600 mb-4">Advanced practice sessions and introduction to reading simple Sanskrit texts.</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Complex sentence structures</li>
                <li>• Reading simple stories and poems</li>
                <li>• Writing practice and composition</li>
                <li>• Preparation for intermediate level</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Learning Outcomes</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">By the end of this course, you will:</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-saffron-600 mt-0.5" />
                  <span className="text-gray-600">Read and write Devanagari script fluently</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-saffron-600 mt-0.5" />
                  <span className="text-gray-600">Understand basic Sanskrit grammar rules</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-saffron-600 mt-0.5" />
                  <span className="text-gray-600">Build a vocabulary of 500+ essential words</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-saffron-600 mt-0.5" />
                  <span className="text-gray-600">Engage in simple Sanskrit conversations</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Additional Benefits:</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-saffron-600 mt-0.5" />
                  <span className="text-gray-600">Access to exclusive Sanskrit learning community</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-saffron-600 mt-0.5" />
                  <span className="text-gray-600">Certificate of completion</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-saffron-600 mt-0.5" />
                  <span className="text-gray-600">Lifetime access to course materials</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-saffron-600 mt-0.5" />
                  <span className="text-gray-600">Preparation for intermediate Sanskrit courses</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-saffron-50 to-peacock-green-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Start Your Sanskrit Journey Today</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of learners who have discovered the beauty and wisdom of Sanskrit. Begin your journey into the world's oldest language.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-saffron-600 to-saffron-700 hover:from-saffron-700 hover:to-saffron-800 text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Enroll Now - ₹2,898
            </button>
            <button className="border-2 border-saffron-600 text-saffron-700 hover:bg-saffron-600 hover:text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
