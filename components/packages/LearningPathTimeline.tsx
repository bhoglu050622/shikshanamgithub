'use client';

import React from 'react';
import { CheckCircle, Clock, Award } from 'lucide-react';

interface TimelineStep {
  title: string;
  description: string;
  duration: string;
  icon?: React.ReactNode;
}

interface LearningPathTimelineProps {
  steps: TimelineStep[];
  orientation?: 'vertical' | 'horizontal';
}

export function LearningPathTimeline({ 
  steps, 
  orientation = 'vertical' 
}: LearningPathTimelineProps) {
  if (orientation === 'horizontal') {
    return (
      <div className="relative">
        {/* Horizontal Timeline */}
        <div className="flex items-start justify-between gap-4 overflow-x-auto pb-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center min-w-[200px] flex-1">
              {/* Step Number and Icon */}
              <div className="relative mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-saffron-500 to-amber-600 flex items-center justify-center shadow-lg shadow-saffron-200">
                  <span className="text-2xl font-bold text-white">{index + 1}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute top-8 left-16 w-full h-0.5 bg-gradient-to-r from-saffron-300 to-amber-300" 
                       style={{ width: 'calc(100vw / ' + steps.length + ')' }} />
                )}
              </div>
              
              {/* Content Card */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:border-saffron-300 transition-all hover:shadow-xl">
                <h3 className="text-lg font-bold text-slate-800 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600 mb-3">{step.description}</p>
                <div className="flex items-center text-xs text-saffron-600">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{step.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Vertical Timeline Line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-saffron-200 via-amber-200 to-saffron-200" />
      
      <div className="space-y-12">
        {steps.map((step, index) => (
          <div key={index} className="relative flex items-start gap-8">
            {/* Timeline Node */}
            <div className="relative z-10 flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-saffron-500 to-amber-600 flex items-center justify-center shadow-lg shadow-saffron-200 ring-4 ring-white">
                <span className="text-2xl font-bold text-white">{index + 1}</span>
              </div>
            </div>
            
            {/* Content Card */}
            <div className="flex-1 bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:border-saffron-300 transition-all hover:shadow-xl hover:-translate-y-1 transform duration-300">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-slate-800">{step.title}</h3>
                {step.icon || <CheckCircle className="w-6 h-6 text-saffron-600 flex-shrink-0" />}
              </div>
              <p className="text-slate-600 mb-4 leading-relaxed">{step.description}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center text-sm text-saffron-600 bg-saffron-50 px-4 py-2 rounded-full">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="font-semibold">{step.duration}</span>
                </div>
                {index === steps.length - 1 && (
                  <div className="flex items-center text-sm text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full">
                    <Award className="w-4 h-4 mr-2" />
                    <span className="font-semibold">Certificate</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

