'use client'

import { useState, useEffect } from 'react'

interface TimestampProps {
  timestamp: string
}

export default function Timestamp({ timestamp }: TimestampProps) {
  const [formattedDate, setFormattedDate] = useState('Loading...')

  useEffect(() => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      setFormattedDate('Just now')
    } else if (diffInHours < 24) {
      setFormattedDate(`${diffInHours}h ago`)
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      if (diffInDays < 7) {
        setFormattedDate(`${diffInDays}d ago`)
      } else {
        setFormattedDate(date.toLocaleDateString())
      }
    }
  }, [timestamp])

  return <span>{formattedDate}</span>
}