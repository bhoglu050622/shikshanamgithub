'use client';

export default function ShlokaSection() {
  return (
    <section className="shloka-section">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] rounded-3xl p-8 md:p-12 shadow-2xl">
            <h2 
              className="text-3xl md:text-4xl font-bold text-white mb-6 leading-relaxed"
              style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}
            >
              संस्कृतं नाम दैवी वाक् अन्वाख्याता महर्षिभिः।<br />
              मयूरव्यंसकादीनां समाहारो विवक्षितः॥
            </h2>
            <p className="text-white/90 text-lg md:text-xl leading-relaxed">
              Sanskrit is called the divine language,<br />
              Described by the great sages.<br />
              It is the essence of all expressions,<br />
              Like the beauty of a peacock's feathers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

