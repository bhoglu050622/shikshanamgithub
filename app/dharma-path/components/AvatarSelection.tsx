'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, User, Mail, Phone, Lock } from 'lucide-react'
import { avatars } from '../data/avatars'
import { Avatar } from '../types/dharma-path'

interface AvatarSelectionProps {
  onAvatarSelected: (avatar: Avatar, profile: { name: string; email: string; phone: string }) => void
}

export default function AvatarSelection({ onAvatarSelected }: AvatarSelectionProps) {
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [profile, setProfile] = useState({ name: '', email: '', phone: '' })

  const handleAvatarClick = (avatar: Avatar) => {
    setSelectedAvatar(avatar)
    setShowModal(true)
  }

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedAvatar && profile.name && profile.email && profile.phone) {
      onAvatarSelected(selectedAvatar, profile)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-12 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Choose Your <span className="text-saffron-400">Divine Guide</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Select an avatar that resonates with your spiritual journey. Each represents different aspects 
            of consciousness and will guide you through your Dharma Path.
          </p>
        </motion.div>

        {/* Avatar Grid */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {avatars.map((avatar, index) => (
            <motion.div
              key={avatar.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAvatarClick(avatar)}
              className="group cursor-pointer"
            >
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:border-saffron-400/50 transition-all duration-300 shadow-2xl hover:shadow-saffron-500/20">
                {/* Avatar Symbol */}
                <div className="text-center mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-saffron-400/20 to-saffron-600/30 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-4xl">{avatar.symbol}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{avatar.name}</h3>
                  <p className="text-saffron-400 font-medium">{avatar.sanskritName}</p>
                </div>

                {/* Essence */}
                <div className="text-center mb-6">
                  <p className="text-lg font-semibold text-saffron-300 mb-2">{avatar.essence}</p>
                  <p className="text-white/80 text-sm leading-relaxed">{avatar.description}</p>
                </div>

                {/* Attributes */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {avatar.attributes.map((attr, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-saffron-400/20 text-saffron-300 text-xs rounded-full border border-saffron-400/30"
                      >
                        {attr}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Verse Preview */}
                <div className="text-center">
                  <p className="text-white/70 text-sm italic mb-2">"{avatar.verse.english}"</p>
                  <p className="text-saffron-400/80 text-xs">- {avatar.verse.sanskrit}</p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-saffron-400/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Profile Modal */}
        <AnimatePresence>
          {showModal && selectedAvatar && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 max-w-md w-full border border-white/20 shadow-2xl"
              >
                {/* Selected Avatar Info */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-saffron-400/20 to-saffron-600/30 rounded-full flex items-center justify-center mb-4">
                    <span className="text-3xl">{selectedAvatar.symbol}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedAvatar.name}</h3>
                  <p className="text-saffron-400">{selectedAvatar.essence}</p>
                </div>

                {/* Privacy Notice */}
                <div className="bg-saffron-400/10 border border-saffron-400/30 rounded-xl p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <Lock className="w-5 h-5 text-saffron-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-saffron-300 text-sm font-medium mb-1">Your Privacy is Sacred</p>
                      <p className="text-white/70 text-xs leading-relaxed">
                        All your information stays on your device. No data is sent to servers or stored externally. 
                        You can reset or export your journey at any time.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Profile Form */}
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-saffron-400/50 focus:border-saffron-400/50 transition-all duration-300"
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-saffron-400/50 focus:border-saffron-400/50 transition-all duration-300"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-saffron-400/50 focus:border-saffron-400/50 transition-all duration-300"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 px-6 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-saffron-500 to-saffron-600 text-white rounded-xl hover:from-saffron-600 hover:to-saffron-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-saffron-400/50 flex items-center justify-center space-x-2"
                    >
                      <span>Continue Journey</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
