'use client';

export default function ShlokaSection() {
  return (
    <section className="shloka-section-yoga">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] rounded-3xl p-8 md:p-12 shadow-2xl">
            <h2 
              className="text-3xl md:text-4xl font-bold text-white mb-6 leading-relaxed"
              style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}
            >
              योगः चित्तवृत्ति निरोधः।<br />
              तदा द्रष्टुः स्वरूपेऽवस्थानम्॥
            </h2>
            <p className="text-white/90 text-lg md:text-xl leading-relaxed">
              Yoga is the cessation of the modifications of the mind.<br />
              Then the Seer abides in its own true nature.
            </p>
            <p className="text-white/70 text-sm md:text-base mt-4">
              — Patanjali Yoga Sutras 1.2-1.3
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

