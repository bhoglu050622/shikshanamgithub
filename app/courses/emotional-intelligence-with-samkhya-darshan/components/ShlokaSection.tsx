'use client'

export default function ShlokaSection() {
  return (
    <section className="section-padding bg-gradient-to-r from-deep-maroon to-copper-orange text-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          {/* Sanskrit Shloka */}
          <div className="mb-8">
            <div className="text-3xl md:text-4xl font-devanagari mb-4 leading-relaxed">
              प्रकृतिः पुरुषः चैव गुणाः सर्वे च ते मया
            </div>
            <div className="text-lg md:text-xl opacity-90 mb-2">
              Prakṛtiḥ puruṣaḥ caiva guṇāḥ sarve ca te mayā
            </div>
          </div>

          {/* English Translation */}
          <div className="mb-8">
            <h3 className="text-xl md:text-2xl font-semibold mb-4">
              "Nature, consciousness, and all qualities are known by me"
            </h3>
            <p className="text-lg opacity-90 text-readable leading-relaxed">
              This profound wisdom from Samkhya philosophy teaches us that true self-awareness comes from 
              understanding the interplay between nature (prakriti), consciousness (purusha), and the three 
              fundamental qualities (gunas) that govern all existence.
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="flex justify-center items-center gap-4 mb-8">
            <div className="w-8 h-px bg-temple-gold"></div>
            <div className="w-3 h-3 bg-temple-gold rounded-full"></div>
            <div className="w-8 h-px bg-temple-gold"></div>
          </div>

          {/* Call to Action */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <h4 className="text-lg font-semibold mb-3">
              Master the Art of Self-Awareness
            </h4>
            <p className="text-white/90 mb-4 text-readable">
              Learn how Samkhya's principles can help you develop emotional intelligence, 
              self-awareness, and inner balance that transforms your life from within.
            </p>
            <button className="bg-temple-gold text-deep-maroon font-semibold px-8 py-3 rounded-xl hover:bg-temple-gold/90 transform hover:scale-105 transition-all duration-300 shadow-lg">
              Start Your Journey Today
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
