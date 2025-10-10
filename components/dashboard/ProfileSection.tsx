'use client'

import { motion } from 'framer-motion'
import { User, Mail, Phone, Calendar, Edit3 } from 'lucide-react'
import { User as UserType } from '@/lib/auth/AuthContext'

interface ProfileSectionProps {
  user: UserType
  isLoading?: boolean
  onEdit?: () => void
}

export default function ProfileSection({ user, isLoading = false, onEdit }: ProfileSectionProps) {
  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-xl p-6 animate-pulse">
        <div className="flex items-center justify-between mb-6">
          <div className="h-6 w-32 bg-muted rounded"></div>
          <div className="h-8 w-8 bg-muted rounded"></div>
        </div>
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="h-5 w-5 bg-muted rounded"></div>
              <div className="h-4 w-48 bg-muted rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not available'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatLoginTime = (timestamp?: number) => {
    if (!timestamp) return 'Not available'
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Profile Information</h2>
        {onEdit && (
          <button
            onClick={onEdit}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Edit Profile
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <User className="w-5 h-5 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">Full Name</p>
            <p className="font-medium text-foreground">
              {user.name || 'Not provided'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Mail className="w-5 h-5 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">Email Address</p>
            <p className="font-medium text-foreground">{user.email}</p>
          </div>
        </div>

        {user.mobile && (
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Mobile Number</p>
              <p className="font-medium text-foreground">{user.mobile}</p>
            </div>
          </div>
        )}

        {user.learnerId && (
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Learner ID</p>
              <p className="font-medium text-foreground font-mono text-sm">
                {user.learnerId}
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center space-x-3">
          <Calendar className="w-5 h-5 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">Last Login</p>
            <p className="font-medium text-foreground">
              {formatLoginTime(user.loginTime)}
            </p>
          </div>
        </div>
      </div>

      {user.learnerId && (
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            Your learning progress and course data are synced with your Graphy account.
            All your achievements and progress are automatically tracked.
          </p>
        </div>
      )}
    </motion.div>
  )
}
