import { Metadata } from 'next'
import { Users, BookOpen, Lightbulb, Heart, Globe, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Career - Join Our Team | Shikshanam',
  description: 'Join Shikshanam and help us preserve and share ancient Indian wisdom through modern technology. Explore career opportunities in education, technology, and content creation.',
}

export default function CareerPage() {
  return (
    <>
      <main className="main-container py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Join Our Mission
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Help us preserve and share the timeless wisdom of ancient India through modern technology and innovative learning methods.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Work With Us?</h2>
              <p className="text-gray-600 mb-6">
                At Shikshanam, we're building something meaningful - a bridge between ancient wisdom and modern learners. Our team is passionate about making profound knowledge accessible to everyone, everywhere.
              </p>
              <p className="text-gray-600 mb-6">
                We offer a unique opportunity to work at the intersection of technology, education, and spirituality, creating products that truly make a difference in people's lives.
              </p>
              <div className="bg-gradient-to-r from-saffron-50 to-peacock-green-50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Our Culture</h3>
                <p className="text-gray-600">
                  We foster a collaborative environment where innovation meets tradition, and every team member contributes to our mission of spreading ancient wisdom.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What We Offer</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-saffron-100 rounded-full flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-saffron-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Meaningful Work</h3>
                    <p className="text-gray-600 text-sm">Contribute to preserving and sharing ancient wisdom</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-saffron-100 rounded-full flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-saffron-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Flexible Environment</h3>
                    <p className="text-gray-600 text-sm">Remote-first culture with flexible working hours</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-saffron-100 rounded-full flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-saffron-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Learning Opportunities</h3>
                    <p className="text-gray-600 text-sm">Access to our courses and expert knowledge</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-saffron-100 rounded-full flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-saffron-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Growth & Development</h3>
                    <p className="text-gray-600 text-sm">Continuous learning and career advancement</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Open Positions</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-saffron-500 to-peacock-green-500 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Content Creator</h3>
                    <p className="text-saffron-600 font-medium">Full-time • Remote</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Create engaging educational content for our Sanskrit and philosophy courses. Work with our expert team to develop curriculum and learning materials.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-saffron-100 text-saffron-700 rounded-full text-sm">Sanskrit</span>
                  <span className="px-3 py-1 bg-saffron-100 text-saffron-700 rounded-full text-sm">Education</span>
                  <span className="px-3 py-1 bg-saffron-100 text-saffron-700 rounded-full text-sm">Content Writing</span>
                </div>
                <button className="w-full bg-gradient-to-r from-saffron-600 to-saffron-700 hover:from-saffron-700 hover:to-saffron-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300">
                  Apply Now
                </button>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-saffron-500 to-peacock-green-500 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Frontend Developer</h3>
                    <p className="text-saffron-600 font-medium">Full-time • Remote</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Build beautiful, accessible user interfaces for our learning platform. Work with React, Next.js, and modern web technologies.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-saffron-100 text-saffron-700 rounded-full text-sm">React</span>
                  <span className="px-3 py-1 bg-saffron-100 text-saffron-700 rounded-full text-sm">Next.js</span>
                  <span className="px-3 py-1 bg-saffron-100 text-saffron-700 rounded-full text-sm">TypeScript</span>
                </div>
                <button className="w-full bg-gradient-to-r from-saffron-600 to-saffron-700 hover:from-saffron-700 hover:to-saffron-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300">
                  Apply Now
                </button>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-saffron-500 to-peacock-green-500 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Community Manager</h3>
                    <p className="text-saffron-600 font-medium">Part-time • Remote</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Foster our learning community, engage with students, and help create a supportive environment for spiritual growth.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-saffron-100 text-saffron-700 rounded-full text-sm">Community</span>
                  <span className="px-3 py-1 bg-saffron-100 text-saffron-700 rounded-full text-sm">Social Media</span>
                  <span className="px-3 py-1 bg-saffron-100 text-saffron-700 rounded-full text-sm">Communication</span>
                </div>
                <button className="w-full bg-gradient-to-r from-saffron-600 to-saffron-700 hover:from-saffron-700 hover:to-saffron-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300">
                  Apply Now
                </button>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-saffron-500 to-peacock-green-500 rounded-xl flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">UX Designer</h3>
                    <p className="text-saffron-600 font-medium">Full-time • Remote</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Design intuitive and accessible learning experiences that make ancient wisdom approachable for modern learners.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-saffron-100 text-saffron-700 rounded-full text-sm">UX Design</span>
                  <span className="px-3 py-1 bg-saffron-100 text-saffron-700 rounded-full text-sm">Figma</span>
                  <span className="px-3 py-1 bg-saffron-100 text-saffron-700 rounded-full text-sm">Accessibility</span>
                </div>
                <button className="w-full bg-gradient-to-r from-saffron-600 to-saffron-700 hover:from-saffron-700 hover:to-saffron-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300">
                  Apply Now
                </button>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-saffron-500 to-peacock-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Passion</h3>
                <p className="text-gray-600">
                  We're driven by a genuine love for ancient wisdom and a desire to share it with the world.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-saffron-500 to-peacock-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Inclusivity</h3>
                <p className="text-gray-600">
                  We believe wisdom should be accessible to everyone, regardless of background or location.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-saffron-500 to-peacock-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
                <p className="text-gray-600">
                  We combine traditional knowledge with cutting-edge technology to create unique learning experiences.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-saffron-50 to-peacock-green-50 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Don't See Your Role?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We're always looking for passionate individuals who share our mission. If you don't see a position that matches your skills, we'd love to hear from you anyway.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-gradient-to-r from-saffron-600 to-saffron-700 hover:from-saffron-700 hover:to-saffron-800 text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get in Touch
              </a>
              <a
                href="/about"
                className="border-2 border-saffron-600 text-saffron-700 hover:bg-saffron-600 hover:text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-300"
              >
                Learn More About Us
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
