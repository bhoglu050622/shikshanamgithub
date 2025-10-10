'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, X, CheckCircle } from 'lucide-react'
import BasePopup from './BasePopup'

interface FormData {
  fullName: string
  email: string
  areaOfContribution: string
  typeOfContribution: string
  description: string
  contributionPlan: string
  language: string
  acknowledgment: boolean
  files: File[]
}

const contributionTypes = [
  'Original article or research',
  'Translation of ancient text',
  'Audio / Video lecture',
  'Traditional practice documentation',
  'Other (specify)'
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

export default function ContributeContentPopup() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    areaOfContribution: '',
    typeOfContribution: '',
    description: '',
    contributionPlan: '',
    language: 'English',
    acknowledgment: false,
    files: []
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files)
      setFormData(prev => ({ ...prev, files: [...prev.files, ...newFiles] }))
    }
  }

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }))
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
        title="Thank You for Your Contribution!"
        subtitle="Our editorial team will review your submission and get in touch if it aligns with our curation."
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8"
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <p className="text-muted-foreground">
            We appreciate your dedication to preserving ancient wisdom. You'll hear from us soon!
          </p>
        </motion.div>
      </BasePopup>
    )
  }

  return (
    <BasePopup
      title="Contribute Your Knowledge"
      subtitle="Share your research, writings, or translations to help preserve timeless wisdom."
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

        {/* Area of Contribution */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Area or Topic of Contribution *
          </label>
          <input
            type="text"
            required
            value={formData.areaOfContribution}
            onChange={(e) => handleInputChange('areaOfContribution', e.target.value)}
            className="w-full px-4 py-3 border border-sand-200 dark:border-slate-600 rounded-xl bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            placeholder="e.g., Yoga, Sanskrit, Ayurveda, Vedanta"
          />
        </div>

        {/* Type of Contribution */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Type of Contribution *
          </label>
          <select
            required
            value={formData.typeOfContribution}
            onChange={(e) => handleInputChange('typeOfContribution', e.target.value)}
            className="w-full px-4 py-3 border border-sand-200 dark:border-slate-600 rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          >
            <option value="">Select contribution type</option>
            {contributionTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Short Description *
          </label>
          <textarea
            required
            rows={3}
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="w-full px-4 py-3 border border-sand-200 dark:border-slate-600 rounded-xl bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
            placeholder="What is your contribution about?"
          />
        </div>

        {/* Contribution Plan */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            How do you plan to contribute? *
          </label>
          <textarea
            required
            rows={4}
            value={formData.contributionPlan}
            onChange={(e) => handleInputChange('contributionPlan', e.target.value)}
            className="w-full px-4 py-3 border border-sand-200 dark:border-slate-600 rounded-xl bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
            placeholder="Describe your approach, materials, or intent."
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            File Upload
          </label>
          <div
            className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
              dragActive
                ? 'border-primary bg-primary/5'
                : 'border-sand-200 dark:border-slate-600 hover:border-primary/50'
            }`}
            onDragEnter={(e) => {
              e.preventDefault()
              setDragActive(true)
            }}
            onDragLeave={(e) => {
              e.preventDefault()
              setDragActive(false)
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault()
              setDragActive(false)
              handleFileUpload(e.dataTransfer.files)
            }}
          >
            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground mb-2">
              Drag and drop files here, or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              PDFs, Word docs, images, or short videos
            </p>
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp4,.mov"
              onChange={(e) => handleFileUpload(e.target.files)}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-block mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg cursor-pointer hover:bg-primary/90 transition-colors"
            >
              Browse Files
            </label>
          </div>

          {/* Uploaded Files */}
          {formData.files.length > 0 && (
            <div className="mt-4 space-y-2">
              {formData.files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-sand-100 dark:bg-slate-700 rounded-lg">
                  <span className="text-sm text-foreground">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="p-1 hover:bg-sand-200 dark:hover:bg-slate-600 rounded"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Language */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Language of Content *
          </label>
          <select
            required
            value={formData.language}
            onChange={(e) => handleInputChange('language', e.target.value)}
            className="w-full px-4 py-3 border border-sand-200 dark:border-slate-600 rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        {/* Acknowledgment */}
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="acknowledgment"
            checked={formData.acknowledgment}
            onChange={(e) => handleInputChange('acknowledgment', e.target.checked)}
            className="mt-1 w-4 h-4 text-primary border-sand-200 dark:border-slate-600 rounded focus:ring-primary/20"
          />
          <label htmlFor="acknowledgment" className="text-sm text-foreground">
            I confirm this is my original work or that I have rights to share it. *
          </label>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting || !formData.acknowledgment}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Contribution'}
        </motion.button>
      </form>
    </BasePopup>
  )
}
