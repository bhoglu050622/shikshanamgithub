'use client'

import { useState } from 'react'

interface Lesson {
  title: string
  duration?: string
  type?: 'video' | 'reading' | 'exercise' | 'quiz'
}

interface Module {
  title: string
  description?: string
  duration?: string
  lessons: Lesson[]
}

interface CurriculumAccordionProps {
  modules: Module[]
  theme?: string
  className?: string
}

export default function CurriculumAccordion({
  modules,
  theme = 'default',
  className = ''
}: CurriculumAccordionProps) {
  const [openModule, setOpenModule] = useState<number | null>(0) // First module open by default

  function getThemeColors(theme: string) {
    const colors = {
      'chanakya': {
        accent: 'text-orange-600',
        border: 'border-orange-200',
        background: 'bg-orange-50',
        hover: 'hover:bg-orange-100'
      },
      'samkhya': {
        accent: 'text-amber-600',
        border: 'border-amber-200',
        background: 'bg-amber-50',
        hover: 'hover:bg-amber-100'
      },
      'isha': {
        accent: 'text-teal-600',
        border: 'border-teal-200',
        background: 'bg-teal-50',
        hover: 'hover:bg-teal-100'
      },
      'prashna': {
        accent: 'text-blue-600',
        border: 'border-blue-200',
        background: 'bg-blue-50',
        hover: 'hover:bg-blue-100'
      },
      'sanskrit': {
        accent: 'text-amber-600',
        border: 'border-amber-200',
        background: 'bg-amber-50',
        hover: 'hover:bg-amber-100'
      },
      'vaisheshik': {
        accent: 'text-emerald-600',
        border: 'border-emerald-200',
        background: 'bg-emerald-50',
        hover: 'hover:bg-emerald-100'
      },
      'yoga': {
        accent: 'text-green-600',
        border: 'border-green-200',
        background: 'bg-green-50',
        hover: 'hover:bg-green-100'
      },
      'nyaya': {
        accent: 'text-purple-600',
        border: 'border-purple-200',
        background: 'bg-purple-50',
        hover: 'hover:bg-purple-100'
      },
      'default': {
        accent: 'text-gray-600',
        border: 'border-gray-200',
        background: 'bg-gray-50',
        hover: 'hover:bg-gray-100'
      }
    }
    return colors[theme as keyof typeof colors] || colors.default
  }

  const themeColors = getThemeColors(theme)

  function getLessonIcon(type?: string) {
    switch (type) {
      case 'video':
        return (
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10V9a2 2 0 012-2h2a2 2 0 012 2v1M9 10v1a2 2 0 002 2h2a2 2 0 002-2v-1" />
          </svg>
        )
      case 'reading':
        return (
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        )
      case 'exercise':
        return (
          <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        )
      case 'quiz':
        return (
          <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      default:
        return (
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        )
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {modules.map((module, moduleIndex) => (
        <div
          key={moduleIndex}
          className={`border rounded-xl overflow-hidden transition-all duration-300 ${
            openModule === moduleIndex ? themeColors.border : 'border-gray-200'
          }`}
        >
          <button
            onClick={() => setOpenModule(openModule === moduleIndex ? null : moduleIndex)}
            className={`w-full px-6 py-4 text-left ${themeColors.hover} transition-colors duration-200`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Module {moduleIndex + 1}: {module.title}
                </h3>
                {module.description && (
                  <p className="text-sm text-gray-600 mb-2">{module.description}</p>
                )}
                {module.duration && (
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {module.duration}
                  </span>
                )}
              </div>
              <div className="ml-4">
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                    openModule === moduleIndex ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </button>

          {openModule === moduleIndex && (
            <div className={`px-6 py-4 ${themeColors.background} border-t ${themeColors.border}`}>
              <div className="space-y-3">
                {module.lessons.map((lesson, lessonIndex) => (
                  <div key={lessonIndex} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                    <div className="flex-shrink-0">
                      {getLessonIcon(lesson.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                    </div>
                    {lesson.duration && (
                      <div className="flex-shrink-0">
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {lesson.duration}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
