'use client';

import Image from 'next/image';
import { vishalChaurasiaData } from '@/lib/courses/instructorData';

export default function InstructorSection() {
  return (
    <section className="instructor-section-yoga">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#8B5CF6] mb-4" style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}>
            आचार्य से मिलें
          </h2>
          <p className="text-xl text-[#6B7280]">Learn from a Master of Yoga Philosophy</p>
        </div>

        <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#8B5CF6]/5 to-[#3B82F6]/5 rounded-3xl shadow-2xl overflow-hidden border-2 border-[#8B5CF6]/20">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative h-64 md:h-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/20 to-[#3B82F6]/20"></div>
              <Image
                src={vishalChaurasiaData.image || 'https://placehold.co/600x600/8B5CF6/FFFFFF?text=Vishal+Chaurasia'}
                alt={vishalChaurasiaData.name}
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://placehold.co/600x600/8B5CF6/FFFFFF?text=Vishal+Chaurasia';
                }}
              />
            </div>

            <div className="p-8 md:p-12">
              <h3 className="text-3xl font-bold text-[#1F2937] mb-2">{vishalChaurasiaData.name}</h3>
              <p className="text-lg text-[#8B5CF6] font-semibold mb-6">{vishalChaurasiaData.title}</p>

              <p className="text-[#4B5563] mb-6 leading-relaxed">
                {vishalChaurasiaData.bio}
              </p>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-[#1F2937] mb-3 uppercase tracking-wide">Specializations</h4>
                <div className="flex flex-wrap gap-2">
                  {vishalChaurasiaData.specialization.slice(0, 4).map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#8B5CF6]/10 text-[#8B5CF6] text-sm rounded-full border border-[#8B5CF6]/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {vishalChaurasiaData.stats && (
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#8B5CF6]/20">
                  <div className="text-center">
                    <svg className="w-6 h-6 mx-auto mb-1 text-[#8B5CF6]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.267,4,12,4,12,4S5.733,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.733,2,12,2,12s0,4.267,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.733,20,12,20,12,20s6.267,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.267,22,12,22,12S22,7.733,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z"></path>
                    </svg>
                    <p className="text-xs text-[#6B7280]">{vishalChaurasiaData.stats.youtube}</p>
                  </div>
                  <div className="text-center">
                    <svg className="w-6 h-6 mx-auto mb-1 text-[#8B5CF6]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.2,5.2 0 0,1 16.2,21.4H7.8C4.6,21.4 2,18.8 2,15.6V7.8A5.2,5.2 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8M16.5,5.5A1.5,1.5 0 0,1 18,7A1.5,1.5 0 0,1 16.5,8.5A1.5,1.5 0 0,1 15,7A1.5,1.5 0 0,1 16.5,5.5Z"></path>
                    </svg>
                    <p className="text-xs text-[#6B7280]">{vishalChaurasiaData.stats.instagram}</p>
                  </div>
                  <div className="text-center">
                    <svg className="w-6 h-6 mx-auto mb-1 text-[#8B5CF6]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17,2V5H14C13.4,5 13,5.4 13,6V8H16L15.5,11H13V20H10V11H7V8H10V6C10,3.8 11.3,2 14,2H17Z"></path>
                    </svg>
                    <p className="text-xs text-[#6B7280]">{vishalChaurasiaData.stats.facebook}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

