'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { usePopup } from './PopupContext'

interface BasePopupProps {
  children: React.ReactNode
  title: string
  subtitle: string
}

export default function BasePopup({ children, title, subtitle }: BasePopupProps) {
  const { closePopup } = usePopup()

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={closePopup}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-sand-50 dark:bg-slate-800 rounded-3xl shadow-2xl border border-sand-200 dark:border-slate-700"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-sand-50 dark:bg-slate-800 border-b border-sand-200 dark:border-slate-700 rounded-t-3xl px-8 py-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
                  {title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {subtitle}
                </p>
              </div>
              <button
                onClick={closePopup}
                className="ml-4 p-2 hover:bg-sand-100 dark:hover:bg-slate-700 rounded-full transition-colors duration-200"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 py-6">
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
