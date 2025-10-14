import { Metadata } from 'next'
import Link from 'next/link'
import instructorsData from '@/data/processed/instructors.json'

export const metadata: Metadata = {
  title: 'Meet Our Gurus - Shikshanam',
  description: 'Learn from experienced Sanskrit scholars and spiritual teachers who guide your learning journey.',
}

// Transform instructor data to match the expected format
const gurus = instructorsData.map((instructor) => ({
  name: instructor.name,
  title: instructor.title,
  description: instructor.bio,
  href: `/gurus/${instructor.id}`,
  image: instructor.image,
  specialties: instructor.specializations,
  experience: '10+ years',
  qualifications: instructor.qualifications,
  social: instructor.social
}))

export default function GurusPage() {
  return (
    <>
      <main className="main-container py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl font-bold text-gray-900 mb-4 text-center mx-auto">
              Meet Our Gurus
            </h1>
            <p className="font-sans text-xl text-gray-600 max-w-3xl mx-auto text-center">
              Learn from experienced scholars and spiritual teachers who are passionate about sharing the wisdom of ancient India
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {gurus.map((guru) => (
              <div key={guru.name} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-w-4 aspect-h-3">
                  <div className="w-full h-64 bg-gradient-to-br from-saffron-100 to-peacock-green-100 flex items-center justify-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-saffron-500 to-peacock-green-500 rounded-full flex items-center justify-center">
                      <span className="font-sans text-2xl font-bold text-white">
                        {guru.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-sans text-xl font-bold text-gray-900 mb-2 text-center">{guru.name}</h3>
                  <p className="font-sans text-saffron-600 font-medium mb-3 text-center">{guru.title}</p>
                  <p className="font-sans text-gray-600 mb-4 text-sm leading-relaxed text-justify">{guru.description}</p>
                  
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
                  
                  {guru.qualifications && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Qualifications:</p>
                      <div className="flex flex-wrap gap-2">
                        {guru.qualifications.slice(0, 2).map((qualification) => (
                          <span
                            key={qualification}
                            className="px-3 py-1 bg-peacock-green-50 text-peacock-green-700 text-xs rounded-full"
                          >
                            {qualification}
                          </span>
                        ))}
                        {guru.qualifications.length > 2 && (
                          <span className="px-3 py-1 bg-gray-50 text-gray-600 text-xs rounded-full">
                            +{guru.qualifications.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  
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
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4 text-center mx-auto">Join Our Learning Community</h2>
            <p className="font-sans text-gray-600 mb-6 max-w-2xl mx-auto text-justify">
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
