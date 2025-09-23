import { Metadata } from 'next'
import { BookOpen, Users, Clock, Star, CheckCircle, ArrowRight, Target, TrendingUp, Shield, Lightbulb } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Chanakya Code - Ancient Business Wisdom | Shikshanam',
  description: 'Master ancient business wisdom and negotiation strategies from Chanakya\'s teachings. Learn leadership principles and strategic thinking for modern business success.',
}

export default function ChanakyaCodePage() {
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
            Chanakya Code
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Master ancient business wisdom and negotiation strategies from Chanakya's teachings. Learn leadership principles and strategic thinking for modern business success.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mb-8">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>8-10 weeks</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Professional Level</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4" />
              <span>4.8/5 Rating</span>
            </div>
          </div>
          
          <div className="text-3xl font-bold text-saffron-600 mb-8">
            ₹3,999
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
              The Chanakya Code course brings to life the timeless wisdom of Chanakya, the ancient Indian strategist and political advisor. Learn how his principles of leadership, negotiation, and strategic thinking can be applied to modern business challenges.
            </p>
            <p className="text-gray-600 mb-6">
              This comprehensive course covers everything from basic negotiation tactics to advanced leadership strategies, all rooted in the profound insights of one of history's greatest strategic minds.
            </p>
            
            <div className="bg-gradient-to-r from-saffron-50 to-peacock-green-50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">What You'll Learn</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2 text-gray-600">
                  <CheckCircle className="w-4 h-4 text-saffron-600" />
                  <span>Ancient business strategies for modern success</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-600">
                  <CheckCircle className="w-4 h-4 text-saffron-600" />
                  <span>Advanced negotiation techniques</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-600">
                  <CheckCircle className="w-4 h-4 text-saffron-600" />
                  <span>Leadership principles from Chanakya's teachings</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-600">
                  <CheckCircle className="w-4 h-4 text-saffron-600" />
                  <span>Strategic thinking and decision making</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Course Features</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-saffron-100 rounded-full flex items-center justify-center mt-1">
                  <Target className="w-4 h-4 text-saffron-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Business Strategy</h4>
                  <p className="text-gray-600 text-sm">Learn strategic planning and execution</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-saffron-100 rounded-full flex items-center justify-center mt-1">
                  <TrendingUp className="w-4 h-4 text-saffron-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Negotiation Skills</h4>
                  <p className="text-gray-600 text-sm">Master the art of effective negotiation</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-saffron-100 rounded-full flex items-center justify-center mt-1">
                  <Shield className="w-4 h-4 text-saffron-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Leadership Principles</h4>
                  <p className="text-gray-600 text-sm">Develop strong leadership qualities</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-saffron-100 rounded-full flex items-center justify-center mt-1">
                  <Lightbulb className="w-4 h-4 text-saffron-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Case Studies</h4>
                  <p className="text-gray-600 text-sm">Real-world applications and examples</p>
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
                <h3 className="text-xl font-bold text-gray-900">Module 1: Introduction to Chanakya's Philosophy</h3>
                <span className="text-sm text-gray-500">Week 1-2</span>
              </div>
              <p className="text-gray-600 mb-4">Understanding the historical context and core principles of Chanakya's teachings.</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Historical background of Chanakya</li>
                <li>• Core philosophical principles</li>
                <li>• Relevance to modern business</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Module 2: Strategic Thinking & Planning</h3>
                <span className="text-sm text-gray-500">Week 3-4</span>
              </div>
              <p className="text-gray-600 mb-4">Learn how to think strategically and plan for long-term success.</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Strategic analysis frameworks</li>
                <li>• Long-term planning techniques</li>
                <li>• Risk assessment and mitigation</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Module 3: Negotiation Mastery</h3>
                <span className="text-sm text-gray-500">Week 5-6</span>
              </div>
              <p className="text-gray-600 mb-4">Master the art of negotiation using ancient wisdom and modern techniques.</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Preparation strategies</li>
                <li>• Communication techniques</li>
                <li>• Closing deals effectively</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Module 4: Leadership Excellence</h3>
                <span className="text-sm text-gray-500">Week 7-8</span>
              </div>
              <p className="text-gray-600 mb-4">Develop leadership qualities based on Chanakya's principles.</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Leadership styles and approaches</li>
                <li>• Team building and management</li>
                <li>• Decision making under pressure</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-saffron-50 to-peacock-green-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Master Ancient Business Wisdom?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of professionals who have transformed their careers using Chanakya's timeless principles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-saffron-600 to-saffron-700 hover:from-saffron-700 hover:to-saffron-800 text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Enroll Now - ₹3,999
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
