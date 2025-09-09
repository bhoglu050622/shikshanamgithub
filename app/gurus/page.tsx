import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Meet Our Gurus - Shikshanam',
  description: 'Learn from experienced Sanskrit scholars and spiritual teachers who guide your learning journey.',
}

const gurus = [
  {
    name: 'Meera Patel',
    title: 'Sanskrit Grammar Expert',
    description: 'With over 15 years of experience in Sanskrit grammar and literature, Meera brings deep knowledge and patient teaching to help students master the fundamentals.',
    href: '/gurus/meera-patel',
    image: '/images/gurus/meera-patel.jpg',
    specialties: ['Sanskrit Grammar', 'Classical Literature', 'Vedic Studies'],
    experience: '15+ years'
  },
  {
    name: 'Priya Sharma',
    title: 'Vedanta Philosophy',
    description: 'A renowned scholar of Vedanta philosophy, Priya helps students understand the profound wisdom of ancient Indian thought and its practical applications.',
    href: '/gurus/priya-sharma',
    image: '/images/gurus/priya-sharma.jpg',
    specialties: ['Vedanta', 'Upanishads', 'Spiritual Philosophy'],
    experience: '12+ years'
  },
  {
    name: 'Rajesh Kumar',
    title: 'Classical Literature',
    description: 'An expert in classical Sanskrit literature, Rajesh brings to life the beauty and wisdom of ancient texts through engaging storytelling and analysis.',
    href: '/gurus/rajesh-kumar',
    image: '/images/gurus/rajesh-kumar.jpg',
    specialties: ['Classical Literature', 'Poetry', 'Epic Studies'],
    experience: '18+ years'
  }
]

export default function GurusPage() {
  return (
    <>
      <main className="main-container py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our Gurus
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn from experienced scholars and spiritual teachers who are passionate about sharing the wisdom of ancient India
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {gurus.map((guru) => (
              <div key={guru.name} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-w-4 aspect-h-3">
                  <div className="w-full h-64 bg-gradient-to-br from-saffron-100 to-peacock-green-100 flex items-center justify-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-saffron-500 to-peacock-green-500 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {guru.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{guru.name}</h3>
                  <p className="text-saffron-600 font-medium mb-3">{guru.title}</p>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{guru.description}</p>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Specialties:</p>
                    <div className="flex flex-wrap gap-2">
                      {guru.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="px-3 py-1 bg-saffron-50 text-saffron-700 text-xs rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Experience: {guru.experience}</span>
                    <Link
                      href={guru.href}
                      className="text-saffron-600 hover:text-saffron-700 font-medium text-sm flex items-center"
                    >
                      Learn More
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-saffron-50 to-peacock-green-50 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Our Learning Community</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our gurus are not just teachers, but guides who walk alongside you on your journey of discovery. They bring years of experience, deep knowledge, and genuine care for your growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses"
                className="bg-gradient-to-r from-saffron-600 to-saffron-700 hover:from-saffron-700 hover:to-saffron-800 text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Start Learning
              </Link>
              <Link
                href="/contact"
                className="border-2 border-saffron-600 text-saffron-700 hover:bg-saffron-600 hover:text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-300"
              >
                Ask Questions
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
