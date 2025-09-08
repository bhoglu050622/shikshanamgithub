'use client';

export default function ShlokaSection() {
  return (
    <section id="shloka-section" className="py-16 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        {/* Shloka Banner */}
        <div className="bg-gradient-to-r from-pink-500/10 to-pink-600/10 border border-pink-500/30 rounded-2xl p-12 text-center mb-12">
          <div className="flex items-center justify-center gap-8 mb-8">
            <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center">
              <span className="text-2xl text-white font-bold">ॐ</span>
            </div>
            <div className="w-1 h-20 bg-pink-500/50"></div>
            <div className="text-left">
              <h3 className="text-3xl font-tiro-hindi text-white mb-2">ईशावास्यम् इदं सर्वं</h3>
              <p className="text-pink-400 text-lg">The opening verse of Isha Upanishad</p>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="text-2xl font-tiro-hindi text-white leading-relaxed mb-6">
              ईशावास्यम् इदं सर्वं यत्किञ्च जगत्यां जगत् ।<br/>
              तेन त्यक्तेन भुञ्जीथा मा गृधः कस्यस्विद्धनम् ॥
            </div>
            
            <div className="text-lg text-pink-400 leading-relaxed mb-8">
              "All this, whatever moves in this moving world, is enveloped by God. 
              Therefore, find your enjoyment in renunciation; do not covet what belongs to others."
            </div>
            
            <div className="text-gray-300 text-base leading-relaxed">
              This profound verse from the Isha Upanishad teaches us the fundamental truth about the nature of existence. 
              It reveals that everything in this universe is permeated by the divine consciousness, and true fulfillment 
              comes not from accumulation but from understanding our connection to the whole.
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a 
            href="https://shikshanam.in/isha-upanishad-course/#:~:text=Enroll%20now"
            rel="noopener noreferrer"
          >
            <button 
              className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-4 px-12 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl text-lg animate-button-bob"
              onClick={() => {
                const pricingSection = document.getElementById('course-info-section');
                if (pricingSection) {
                  pricingSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Start Your Spiritual Journey
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
