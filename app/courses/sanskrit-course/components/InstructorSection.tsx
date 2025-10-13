'use client';

import Image from 'next/image';
import { gurukulAcharyaData } from '@/lib/courses/instructorData';

export default function InstructorSection() {
  return (
    <section className="instructor-section">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#8B4513] mb-4" style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}>
            आचार्य परिचय
          </h2>
          <p className="text-xl text-[#654321]">Learn from Traditional Gurukul Master</p>
        </div>

        <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border-2 border-[#FF6B35]/20">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative h-64 md:h-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35]/20 to-[#8B4513]/20"></div>
              <Image
                src="https://shikshanam.in/wp-content/uploads/2024/03/gurukul-acharya.jpg"
                alt="Gurukul Acharya"
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://placehold.co/600x600/FDF6E3/8B4513?text=Gurukul+Acharya';
                }}
              />
            </div>

            <div className="p-8 md:p-12">
              <h3 className="text-3xl font-bold text-[#8B4513] mb-2">{gurukulAcharyaData.name}</h3>
              <p className="text-lg text-[#FF6B35] font-semibold mb-6">{gurukulAcharyaData.title}</p>

              <p className="text-[#654321] mb-6 leading-relaxed">
                {gurukulAcharyaData.bio}
              </p>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-[#8B4513] mb-3 uppercase tracking-wide">Specialization</h4>
                <div className="flex flex-wrap gap-2">
                  {gurukulAcharyaData.specialization.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#FF6B35]/10 text-[#8B4513] text-sm rounded-full border border-[#FF6B35]/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-[#FF6B35]/20">
                <p className="text-sm text-[#8B6F47]">
                  <strong className="text-[#8B4513]">Experience:</strong> {gurukulAcharyaData.experience}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

