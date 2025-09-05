'use client'

import { motion } from 'framer-motion'
import { Star, Users, BookOpen, Award, ExternalLink } from 'lucide-react'

const gurus = [
  {
    name: 'Dr. Rajesh Kumar',
    title: 'Sanskrit Scholar',
    specialization: 'Vedic Literature & Grammar',
    avatar: '/gurus/guru1.jpg',
    rating: 4.9,
    students: '450+',
    courses: '12',
    experience: '15+ years',
    achievements: ['PhD in Sanskrit', 'Published 20+ papers', 'Award-winning teacher'],
    description: 'Expert in classical Sanskrit texts with deep understanding of Vedic wisdom and traditional grammar.',
    color: 'from-golden-olive to-golden-olive/90'
  },
  {
    name: 'Prof. Meera Patel',
    title: 'Philosophy Expert',
    specialization: 'Vedanta & Yoga Philosophy',
    avatar: '/gurus/guru2.jpg',
    rating: 4.8,
    students: '320+',
    courses: '8',
    experience: '12+ years',
    achievements: ['Masters in Philosophy', 'Certified Yoga Teacher', 'International Speaker'],
    description: 'Specializes in making complex philosophical concepts accessible through practical examples and meditation.',
    color: 'from-deep-maroon to-deep-maroon/90'
  },
  {
    name: 'Acharya Amit Singh',
    title: 'Life Coach',
    specialization: 'Ancient Wisdom & Modern Life',
    avatar: '/gurus/guru3.jpg',
    rating: 4.9,
    students: '680+',
    courses: '15',
    experience: '18+ years',
    achievements: ['Life Coach Certification', 'Best-selling Author', 'Corporate Trainer'],
    description: 'Bridges ancient Indian wisdom with contemporary challenges to help students find purpose and peace.',
    color: 'from-copper-orange to-copper-orange/90'
  },
  {
    name: 'Dr. Priya Sharma',
    title: 'Classical Literature',
    specialization: 'Sanskrit Poetry & Drama',
    avatar: '/gurus/guru4.jpg',
    rating: 4.7,
    students: '280+',
    courses: '10',
    experience: '10+ years',
    achievements: ['PhD in Classical Literature', 'Poetry Award Winner', 'Cultural Ambassador'],
    description: 'Passionate about bringing classical Sanskrit literature to life through storytelling and performance.',
    color: 'from-temple-gold to-temple-gold/90'
  },
  {
    name: 'Swami Vivek',
    title: 'Spiritual Guide',
    specialization: 'Meditation & Self-Realization',
    avatar: '/gurus/guru5.jpg',
    rating: 4.9,
    students: '520+',
    courses: '6',
    experience: '25+ years',
    achievements: ['Monastic Training', 'Meditation Master', 'Spiritual Retreat Leader'],
    description: 'Guides students on the path of self-discovery through meditation and spiritual practices.',
    color: 'from-deep-indigo to-deep-indigo/90'
  },
  {
    name: 'Dr. Arjun Reddy',
    title: 'Wellness Expert',
    specialization: 'Ayurveda & Holistic Health',
    avatar: '/gurus/guru6.jpg',
    rating: 4.8,
    students: '420+',
    courses: '9',
    experience: '14+ years',
    achievements: ['MD in Ayurveda', 'Wellness Coach', 'Health Columnist'],
    description: 'Combines traditional Ayurvedic wisdom with modern wellness practices for holistic health.',
    color: 'from-sand-beige to-sand-beige/90'
  }
]

export default function MeetGurus() {
  return (
    <section id="meet-gurus" className="section-padding bg-sand-beige">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-dark-olive mb-6">
            Learn From{' '}
            <span className="bg-gradient-to-r from-golden-olive to-deep-maroon bg-clip-text text-transparent">
              Enlightened Minds
            </span>
          </h2>
          <p className="text-xl text-deep-maroon max-w-3xl mx-auto">
            Learn from authentic masters who have dedicated their lives to preserving and sharing ancient Indian wisdom.
          </p>
        </motion.div>

        {/* Gurus Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {gurus.map((guru, index) => (
            <motion.div
              key={guru.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="group cursor-pointer"
            >
              <div className="bg-parchment-ivory rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-golden-olive/20 overflow-hidden relative">
                {/* Temple Bell Sound Animation */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-golden-olive/30 rounded-full animate-ping"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-deep-maroon/30 rounded-full animate-ping animation-delay-1000"></div>
                </div>
                
                {/* Avatar Section */}
                <div className="relative p-8 text-center">
                  <div className="relative mx-auto mb-4">
                    <div className={`w-28 h-28 bg-gradient-to-br ${guru.color} rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-500 relative overflow-hidden`}>
                      {guru.name.split(' ').map(n => n[0]).join('')}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md group-hover:scale-110 transition-transform duration-300">
                      <Star className="w-4 h-4 text-temple-gold fill-current" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-dark-olive mb-1 group-hover:text-golden-olive transition-colors duration-300">{guru.name}</h3>
                  <p className="text-golden-olive font-medium mb-2">{guru.title}</p>
                  <p className="text-sand-beige text-sm">{guru.specialization}</p>
                </div>

                {/* Stats */}
                <div className="px-8 pb-4">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-dark-olive">{guru.rating}</div>
                      <div className="text-xs text-sand-beige">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-dark-olive">{guru.students}</div>
                      <div className="text-xs text-sand-beige">Students</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-dark-olive">{guru.courses}</div>
                      <div className="text-xs text-sand-beige">Courses</div>
                    </div>
                  </div>
                </div>

                {/* Hover Reveal Content */}
                <div className="px-8 pb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                                      <div className="border-t border-golden-olive/20 pt-4">
                    <p className="text-deep-maroon text-sm mb-4 leading-relaxed">
                      {guru.description}
                    </p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-dark-olive mb-2 text-sm">Experience & Achievements:</h4>
                      <ul className="space-y-1">
                        {guru.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-center space-x-2 text-xs text-sand-beige">
                            <Award className="w-3 h-3 text-temple-gold" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-sand-beige">{guru.experience} experience</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-1 text-golden-olive hover:text-golden-olive/80 text-sm font-medium"
                      >
                        <span>View Profile</span>
                        <ExternalLink className="w-3 h-3" />
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="px-8 pb-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full bg-gradient-to-r ${guru.color} text-white py-3 px-6 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300`}
                  >
                    Learn with {guru.name.split(' ')[0]}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-golden-olive/5 to-deep-maroon/5 rounded-3xl p-8 max-w-2xl mx-auto border border-temple-gold/20">
            <h3 className="font-serif text-2xl font-bold text-dark-olive mb-4">
              Want to meet more Gurus?
            </h3>
            <p className="text-deep-maroon mb-6">
              Discover our complete roster of authentic teachers and find the perfect guide for your journey.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-shikshanam-primary px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              Meet All Gurus
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
