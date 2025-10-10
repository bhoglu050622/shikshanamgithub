'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, X, CheckCircle } from 'lucide-react'
import BasePopup from './BasePopup'

interface FormData {
  fullName: string
  email: string
  fieldOfExpertise: string
  yearsOfExperience: string
  bio: string
  resume: File | null
  portfolioLink: string
  teachingModes: string[]
  languages: string[]
  consent: boolean
}

const expertiseFields = [
  'Vedic Studies',
  'Meditation',
  'Sanskrit',
  'Ayurveda',
  'Philosophy',
  'Yoga',
  'Tantra',
  'Upanishads',
  'Bhagavad Gita',
  'Other'
]

const teachingModes = [
  'Online',
  'In-person',
  'Hybrid'
]

const languages = [
  'English',
  'Hindi',
  'Sanskrit',
  'Tamil',
  'Telugu',
  'Bengali',
  'Gujarati',
  'Marathi',
  'Other'
]

export default function BecomeTeacherPopup() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    fieldOfExpertise: '',
    yearsOfExperience: '',
    bio: '',
    resume: null,
    portfolioLink: '',
    teachingModes: [],
    languages: [],
    consent: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleArrayChange = (field: 'teachingModes' | 'languages', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }))
  }

  const handleFileUpload = (file: File | null) => {
    setFormData(prev => ({ ...prev, resume: file }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <BasePopup
        title="Thank You for Applying!"
        subtitle="Our team will review your details and contact you regarding the next steps."
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8"
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <p className="text-muted-foreground">
            We're excited about your interest in joining our mission. You'll hear from us soon!
          </p>
        </motion.div>
      </BasePopup>
    )
  }

  return (
    <BasePopup
      title="Apply to Become a Teacher"
      subtitle="Share your experience and join our mission to make traditional wisdom accessible to all."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            className="w-full px-4 py-3 border border-sand-200 dark:border-slate-600 rounded-xl bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            placeholder="Enter your full name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-4 py-3 border border-sand-200 dark:border-slate-600 rounded-xl bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            placeholder="Enter your email address"
          />
        </div>

        {/* Field of Expertise */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Field of Expertise *
          </label>
          <select
            required
            value={formData.fieldOfExpertise}
            onChange={(e) => handleInputChange('fieldOfExpertise', e.target.value)}
            className="w-full px-4 py-3 border border-sand-200 dark:border-slate-600 rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          >
            <option value="">Select your field of expertise</option>
            {expertiseFields.map((field) => (
              <option key={field} value={field}>{field}</option>
            ))}
          </select>
        </div>

        {/* Years of Experience */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Years of Experience *
          </label>
          <select
            required
            value={formData.yearsOfExperience}
            onChange={(e) => handleInputChange('yearsOfExperience', e.target.value)}
            className="w-full px-4 py-3 border border-sand-200 dark:border-slate-600 rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          >
            <option value="">Select years of experience</option>
            <option value="1-2">1-2 years</option>
            <option value="3-5">3-5 years</option>
            <option value="6-10">6-10 years</option>
            <option value="11-15">11-15 years</option>
            <option value="16-20">16-20 years</option>
            <option value="20+">20+ years</option>
          </select>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Short Bio *
          </label>
          <textarea
            required
            rows={4}
            value={formData.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            className="w-full px-4 py-3 border border-sand-200 dark:border-slate-600 rounded-xl bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
            placeholder="Tell us about your background, teaching style, and experience..."
          />
        </div>

        {/* Resume Upload */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Upload Resume / Scripture / Sample Material
          </label>
          <div className="border-2 border-dashed border-sand-200 dark:border-slate-600 rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground mb-2">
              Upload your resume or sample materials
            </p>
            <p className="text-xs text-muted-foreground">
              PDFs, Docs, images, or zip files
            </p>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
              onChange={(e) => handleFileUpload(e.target.files?.[0] || null)}
              className="hidden"
              id="resume-upload"
            />
            <label
              htmlFor="resume-upload"
              className="inline-block mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg cursor-pointer hover:bg-primary/90 transition-colors"
            >
              Browse Files
            </label>
          </div>

          {/* Uploaded File */}
          {formData.resume && (
            <div className="mt-4 flex items-center justify-between p-3 bg-sand-100 dark:bg-slate-700 rounded-lg">
              <span className="text-sm text-foreground">{formData.resume.name}</span>
              <button
                type="button"
                onClick={() => handleFileUpload(null)}
                className="p-1 hover:bg-sand-200 dark:hover:bg-slate-600 rounded"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          )}
        </div>

        {/* Portfolio Link */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Online Portfolio or Lecture Link
          </label>
          <input
            type="url"
            value={formData.portfolioLink}
            onChange={(e) => handleInputChange('portfolioLink', e.target.value)}
            className="w-full px-4 py-3 border border-sand-200 dark:border-slate-600 rounded-xl bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            placeholder="https://example.com/portfolio"
          />
        </div>

        {/* Preferred Mode of Teaching */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Preferred Mode of Teaching *
          </label>
          <div className="space-y-2">
            {teachingModes.map((mode) => (
              <label key={mode} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.teachingModes.includes(mode)}
                  onChange={() => handleArrayChange('teachingModes', mode)}
                  className="w-4 h-4 text-primary border-sand-200 dark:border-slate-600 rounded focus:ring-primary/20"
                />
                <span className="text-sm text-foreground">{mode}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Languages You Teach In *
          </label>
          <div className="grid grid-cols-2 gap-2">
            {languages.map((lang) => (
              <label key={lang} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.languages.includes(lang)}
                  onChange={() => handleArrayChange('languages', lang)}
                  className="w-4 h-4 text-primary border-sand-200 dark:border-slate-600 rounded focus:ring-primary/20"
                />
                <span className="text-sm text-foreground">{lang}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Consent */}
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="consent"
            checked={formData.consent}
            onChange={(e) => handleInputChange('consent', e.target.checked)}
            className="mt-1 w-4 h-4 text-primary border-sand-200 dark:border-slate-600 rounded focus:ring-primary/20"
          />
          <label htmlFor="consent" className="text-sm text-foreground">
            I agree to share my details for internal review and verification. *
          </label>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting || !formData.consent || formData.teachingModes.length === 0 || formData.languages.length === 0}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </motion.button>
      </form>
    </BasePopup>
  )
}
