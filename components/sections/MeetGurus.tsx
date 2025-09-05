'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, ExternalLink, X, BookOpen, Award, Clock, MessageCircle } from 'lucide-react'

const gurus = [
  {
    id: 1,
    name: "Dr. Ananya Sharma",
    title: "Vyakarana, Spoken Sanskrit",
    tags: ["Grammar Expert", "15+ years", "Vedic Studies"],
    image: "/images/gurus/ananya-sharma.jpg",
    profile: "/gurus/ananya-sharma",
    bio: "Dr. Ananya Sharma is a renowned Sanskrit scholar with over 15 years of experience in teaching Vyakarana (grammar) and spoken Sanskrit. She holds a PhD in Sanskrit Literature from Banaras Hindu University and has published numerous papers on classical Sanskrit grammar.",
    areas: ["Sanskrit Grammar", "Vedic Studies", "Classical Literature", "Spoken Sanskrit"],
    experience: "15+ years",
    students: "500+",
    rating: "4.9/5",
    specialties: [
      "Advanced Grammar (Ashtadhyayi)",
      "Vedic Sanskrit",
      "Classical Poetry",
      "Conversational Sanskrit"
    ]
  },
  {
    id: 2,
    name: "Sri Raghav Ji",
    title: "Chanting, Pronunciation",
    tags: ["Pronunciation", "12+ years", "Chanting"],
    image: "/images/gurus/raghav-ji.jpg",
    profile: "/gurus/raghav-ji",
    bio: "Sri Raghav Ji is a traditional Sanskrit teacher specializing in pronunciation and chanting. He learned Sanskrit in the traditional gurukula system and has been teaching for over 12 years. His expertise lies in perfect pronunciation and the musical aspects of Sanskrit.",
    areas: ["Pronunciation", "Chanting", "Traditional Teaching", "Vedic Chants"],
    experience: "12+ years",
    students: "300+",
    rating: "4.8/5",
    specialties: [
      "Vedic Chanting",
      "Pronunciation Mastery",
      "Traditional Teaching Methods",
      "Sanskrit Music"
    ]
  },
  {
    id: 3,
    name: "Meera Iyer",
    title: "Beginner facilitation, Games",
    tags: ["Beginner", "Games", "8+ years"],
    image: "/images/gurus/meera-iyer.jpg",
    profile: "/gurus/meera-iyer",
    bio: "Meera Iyer specializes in making Sanskrit accessible to beginners through innovative teaching methods and gamification. With 8 years of experience, she has developed unique approaches to help students overcome the initial challenges of learning Sanskrit.",
    areas: ["Beginner Sanskrit", "Gamification", "Modern Teaching", "Student Engagement"],
    experience: "8+ years",
    students: "400+",
    rating: "4.9/5",
    specialties: [
      "Beginner-Friendly Methods",
      "Interactive Learning",
      "Sanskrit Games",
      "Student Motivation"
    ]
  }
]

interface GuruCardProps {
  guru: typeof gurus[0]
  index: number
  onOpenModal: (guru: typeof gurus[0]) => void
}

function GuruCard({ guru, index, onOpenModal }: GuruCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
      whileHover={{ scale: 1.05 }}
      onClick={() => onOpenModal(guru)}
    >
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-teal-primary/20 group-hover:shadow-xl transition-all duration-300">
        <div className="relative w-24 h-24 mx-auto mb-4">
          <div className="w-24 h-24 bg-gradient-to-br from-teal-primary to-teal-primary/80 rounded-full flex items-center justify-center relative overflow-hidden">
            <User className="w-12 h-12 text-white" />
            {/* Halo glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-primary/30 to-teal-primary/20 blur-sm group-hover:blur-md transition-all duration-300"></div>
          </div>
        </div>
        <h3 className="text-lg font-bold text-dark-text mb-1 text-center">
          {guru.name}
        </h3>
        <p className="text-teal-primary text-sm mb-4 text-center">
          {guru.title}
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {guru.tags.map((tag, tagIndex) => (
            <span key={tagIndex} className="bg-teal-primary/10 text-teal-primary px-2 py-1 rounded-full text-xs">
              {tag}
            </span>
          ))}
        </div>
        <button className="text-teal-primary hover:text-teal-primary/80 text-sm font-medium flex items-center space-x-1 mx-auto group-hover:scale-105 transition-all duration-300">
          <span>View Profile</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </motion.div>
  )
}

interface GuruModalProps {
  guru: typeof gurus[0] | null
  isOpen: boolean
  onClose: () => void
}

function GuruModal({ guru, isOpen, onClose }: GuruModalProps) {
  if (!guru) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-primary to-teal-primary/80 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-dark-text">{guru.name}</h2>
                  <p className="text-teal-primary">{guru.title}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-muted-gray hover:text-dark-text transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Bio */}
              <div>
                <h3 className="text-lg font-semibold text-dark-text mb-2">About</h3>
                <p className="text-muted-gray leading-relaxed">{guru.bio}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-light-cyan rounded-xl">
                  <div className="text-2xl font-bold text-teal-primary">{guru.experience}</div>
                  <div className="text-sm text-muted-gray">Experience</div>
                </div>
                <div className="text-center p-4 bg-light-cyan rounded-xl">
                  <div className="text-2xl font-bold text-teal-primary">{guru.students}</div>
                  <div className="text-sm text-muted-gray">Students</div>
                </div>
                <div className="text-center p-4 bg-light-cyan rounded-xl">
                  <div className="text-2xl font-bold text-teal-primary">{guru.rating}</div>
                  <div className="text-sm text-muted-gray">Rating</div>
                </div>
              </div>

              {/* Areas of Expertise */}
              <div>
                <h3 className="text-lg font-semibold text-dark-text mb-3">Areas of Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {guru.areas.map((area, index) => (
                    <span key={index} className="bg-teal-primary/10 text-teal-primary px-3 py-1 rounded-full text-sm">
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specialties */}
              <div>
                <h3 className="text-lg font-semibold text-dark-text mb-3">Specialties</h3>
                <ul className="space-y-2">
                  {guru.specialties.map((specialty, index) => (
                    <li key={index} className="flex items-center space-x-2 text-muted-gray">
                      <Award className="w-4 h-4 text-teal-primary" />
                      <span>{specialty}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button className="btn-sanskrit-primary flex-1 flex items-center justify-center space-x-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Book a Class</span>
                </button>
                <button className="btn-sanskrit-outline flex-1 flex items-center justify-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function MeetGurus() {
  const [selectedGuru, setSelectedGuru] = useState<typeof gurus[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = (guru: typeof gurus[0]) => {
    setSelectedGuru(guru)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedGuru(null)
  }

  return (
    <section className="section-padding bg-lavender-primary">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-display text-dark-text mb-4">
            Meet Your Gurus
          </h2>
          <p className="text-body text-muted-gray max-w-2xl mx-auto">
            Learn from experienced Sanskrit scholars and native speakers who 
            bring ancient wisdom to modern learning with gentle guidance.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {gurus.map((guru, index) => (
            <GuruCard
              key={guru.id}
              guru={guru}
              index={index}
              onOpenModal={handleOpenModal}
            />
          ))}
        </div>

        <GuruModal
          guru={selectedGuru}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </section>
  )
}