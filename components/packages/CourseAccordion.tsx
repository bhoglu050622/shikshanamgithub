'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, BookOpen, PlayCircle, Award, Lock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Lesson {
  title: string;
  duration: string;
  type?: 'video' | 'reading' | 'quiz' | 'assignment';
  preview?: boolean;
}

interface CourseModule {
  title: string;
  description: string;
  duration: string;
  level?: string;
  lessons?: Lesson[];
  learningOutcomes?: string[];
}

interface CourseAccordionProps {
  modules: CourseModule[];
  title?: string;
  subtitle?: string;
}

const getLessonIcon = (type?: string) => {
  switch (type) {
    case 'video':
      return PlayCircle;
    case 'quiz':
      return Award;
    case 'reading':
      return BookOpen;
    default:
      return BookOpen;
  }
};

export function CourseAccordion({ 
  modules,
  title = "Course Curriculum",
  subtitle = "Comprehensive learning path structured for your success"
}: CourseAccordionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleModule = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const totalDuration = modules.reduce((acc, module) => {
    const match = module.duration.match(/(\d+)/);
    return acc + (match ? parseInt(match[0]) : 0);
  }, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
          {title}
        </h2>
        <p className="text-xl text-slate-600 mb-6">{subtitle}</p>
        
        {/* Stats */}
        <div className="flex items-center justify-center gap-8 text-sm">
          <div className="flex items-center gap-2 text-slate-600">
            <BookOpen className="w-5 h-5 text-saffron-600" />
            <span><strong>{modules.length}</strong> Modules</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Clock className="w-5 h-5 text-saffron-600" />
            <span><strong>{totalDuration}</strong> Hours</span>
          </div>
        </div>
      </div>

      {/* Timeline Connector */}
      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-saffron-200 via-amber-200 to-saffron-200 hidden md:block" />
        
        <div className="space-y-6">
          {modules.map((module, index) => (
            <div key={index} className="relative">
              {/* Timeline Node */}
              <div className="absolute left-0 top-6 w-16 h-16 rounded-full bg-gradient-to-br from-saffron-500 to-amber-600 hidden md:flex items-center justify-center shadow-lg ring-4 ring-white z-10">
                <span className="text-xl font-bold text-white">{index + 1}</span>
              </div>
              
              {/* Module Card */}
              <Card 
                className={`ml-0 md:ml-24 border-2 transition-all duration-300 ${
                  expandedIndex === index 
                    ? 'border-saffron-300 shadow-xl' 
                    : 'border-slate-200 hover:border-saffron-200 shadow-md'
                }`}
              >
                {/* Module Header */}
                <button
                  onClick={() => toggleModule(index)}
                  className="w-full text-left p-6 flex items-start justify-between hover:bg-saffron-50/30 transition-colors rounded-t-lg"
                >
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="md:hidden inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-saffron-500 to-amber-600 text-white font-bold text-sm">
                        {index + 1}
                      </span>
                      <h3 className="text-xl font-bold text-slate-800">
                        {module.title}
                      </h3>
                    </div>
                    <p className="text-slate-600 mb-3">{module.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2 text-sm text-saffron-600 bg-saffron-50 px-3 py-1 rounded-full">
                        <Clock className="w-4 h-4" />
                        <span>{module.duration}</span>
                      </div>
                      {module.level && (
                        <Badge variant="outline" className="border-slate-300">
                          {module.level}
                        </Badge>
                      )}
                      {module.lessons && (
                        <span className="text-sm text-slate-500">
                          {module.lessons.length} lessons
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0">
                    {expandedIndex === index ? (
                      <ChevronUp className="w-6 h-6 text-saffron-600" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-slate-400" />
                    )}
                  </div>
                </button>

                {/* Expanded Content */}
                {expandedIndex === index && (
                  <CardContent className="px-6 pb-6 space-y-6">
                    <div className="border-t border-slate-200 pt-6">
                      {/* Learning Outcomes */}
                      {module.learningOutcomes && module.learningOutcomes.length > 0 && (
                        <div className="mb-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-200">
                          <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                            <Award className="w-5 h-5 text-emerald-600" />
                            What You'll Learn
                          </h4>
                          <ul className="space-y-2">
                            {module.learningOutcomes.map((outcome, i) => (
                              <li key={i} className="flex items-start gap-2 text-slate-700">
                                <span className="text-emerald-600 font-bold mt-1">✓</span>
                                <span>{outcome}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Lessons List */}
                      {module.lessons && module.lessons.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-slate-800 mb-4">Module Content</h4>
                          <div className="space-y-2">
                            {module.lessons.map((lesson, lessonIndex) => {
                              const LessonIcon = getLessonIcon(lesson.type);
                              return (
                                <div
                                  key={lessonIndex}
                                  className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200"
                                >
                                  <div className="flex items-center gap-3 flex-1">
                                    <LessonIcon className="w-5 h-5 text-saffron-600 flex-shrink-0" />
                                    <span className="text-slate-700">{lesson.title}</span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <span className="text-sm text-slate-500">{lesson.duration}</span>
                                    {lesson.preview ? (
                                      <Badge className="bg-emerald-100 text-emerald-700 border-0 text-xs">
                                        Preview
                                      </Badge>
                                    ) : (
                                      <Lock className="w-4 h-4 text-slate-400" />
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                )}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

