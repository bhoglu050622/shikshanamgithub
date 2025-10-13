'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Play, Clock, FileText } from 'lucide-react';
import { useState } from 'react';
import { accordionContent } from '../motion.config';

interface ModuleCardProps {
  title: string;
  subtitle: string;
  duration: string;
  videoCount: number;
  topics: string[];
  description: string;
  isFreeDemo?: boolean;
  index: number;
}

export default function ModuleCard({
  title,
  subtitle,
  duration,
  videoCount,
  topics,
  description,
  isFreeDemo = false,
  index,
}: ModuleCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg border border-[var(--yoga-border-light)] overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/* Card Header */}
      <div className="p-6 bg-gradient-to-br from-[var(--yoga-bg)] to-white">
        <div className="flex items-start justify-between mb-3">
          <h3 className="yoga-heading-3 text-[var(--yoga-primary)] flex-1">
            {title}
          </h3>
          {isFreeDemo && (
            <span className="px-3 py-1 bg-[var(--yoga-accent)] text-white text-xs font-semibold rounded-full">
              FREE
            </span>
          )}
        </div>
        
        <p className="text-[var(--yoga-text-secondary)] mb-4">{subtitle}</p>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 text-sm text-[var(--yoga-text-tertiary)]">
          <div className="flex items-center gap-2">
            <Play className="w-4 h-4" />
            <span>{videoCount} Videos</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
        </div>

        <p className="mt-3 text-sm text-[var(--yoga-muted)]">{description}</p>
      </div>

      {/* Expandable Topics */}
      <div className="border-t border-[var(--yoga-border-light)]">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-[var(--yoga-bg)] transition-colors duration-200 yoga-focus-visible"
          aria-expanded={isExpanded}
          aria-controls={`topics-${index}`}
        >
          <span className="font-semibold text-[var(--yoga-primary)]">
            View Topics ({topics.length})
          </span>
          <ChevronDown
            className={`w-5 h-5 text-[var(--yoga-primary)] transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </button>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              id={`topics-${index}`}
              variants={accordionContent}
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              className="overflow-hidden"
            >
              <div className="px-6 pb-6">
                <ul className="space-y-3">
                  {topics.map((topic, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--yoga-primary)]/10 text-[var(--yoga-primary)] text-xs font-semibold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <span className="flex-1 text-[var(--yoga-text-secondary)]">{topic}</span>
                    </li>
                  ))}
                </ul>

                {/* Resource Links */}
                <div className="mt-6 pt-6 border-t border-[var(--yoga-border-light)] flex gap-4">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-sm text-[var(--yoga-accent)] hover:underline"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Download Notes</span>
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-sm text-[var(--yoga-accent)] hover:underline"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Take Quiz</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

