'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export interface AccordionItem {
  title: string | React.ReactNode;
  content: string | React.ReactNode;
  id?: string;
}

interface CourseAccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpen?: number[];
  className?: string;
}

export default function CourseAccordion({
  items,
  allowMultiple = false,
  defaultOpen = [],
  className = '',
}: CourseAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set(defaultOpen));

  const toggleItem = (index: number) => {
    setOpenItems((prev) => {
      const newSet = new Set(allowMultiple ? prev : []);
      if (prev.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item, index) => {
        const isOpen = openItems.has(index);
        
        return (
          <motion.div
            key={item.id || index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="course-card border border-gray-200 overflow-hidden"
            suppressHydrationWarning
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${index}`}
            >
              <h3 className="course-heading-4 text-gray-900 pr-4">
                {item.title}
              </h3>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0"
              >
                <ChevronDown className="w-5 h-5 text-gray-600" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`accordion-content-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-2 course-body text-gray-600">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

