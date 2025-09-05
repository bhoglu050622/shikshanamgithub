'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Rangoli from './Rangoli'

interface SectionDividerProps {
  className?: string
  animated?: boolean
}

export default function SectionDivider({ className = '', animated = true }: SectionDividerProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div ref={ref} className={`relative w-full h-20 overflow-hidden ${className}`}>
      {animated && isInView && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Rangoli 
            width={400} 
            height={80} 
            className="top-0 left-1/2 transform -translate-x-1/2" 
            animated={true}
          />
        </motion.div>
      )}
      
      {/* Static rangoli pattern as fallback */}
      {!animated && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Rangoli 
            width={300} 
            height={60} 
            className="opacity-30" 
            animated={false}
          />
        </div>
      )}
    </div>
  )
}
