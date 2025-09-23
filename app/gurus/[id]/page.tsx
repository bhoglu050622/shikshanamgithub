import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  Users, 
  Star, 
  ExternalLink,
  Youtube,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Globe
} from 'lucide-react'
import instructorsData from '@/data/processed/instructors.json'
import { getAllBlogPosts } from '@/lib/blog-data'
import { BlogCard } from '@/components/blog'

interface Instructor {
  id: string
  name: string
  title: string
  bio: string
  image: string
  qualifications: string[]
  specializations: string[]
  social: {
    youtube: string
    linkedin: string
    twitter: string
  }
}

async function getInstructor(id: string): Promise<Instructor | null> {
  const instructor = instructorsData.find(inst => inst.id === id)
  return instructor || null
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const instructor = await getInstructor(resolvedParams.id)
  
  if (!instructor) {
    return {
      title: 'Instructor Not Found'
    }
  }

  return {
    title: `${instructor.name} - ${instructor.title} | Shikshanam`,
    description: instructor.bio,
    openGraph: {
      title: `${instructor.name} - ${instructor.title}`,
      description: instructor.bio,
      images: instructor.image ? [instructor.image] : [],
    }
  }
}

export async function generateStaticParams() {
  return instructorsData.map((instructor) => ({
    id: instructor.id,
  }))
}

export default async function InstructorPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const instructor = await getInstructor(resolvedParams.id)

  if (!instructor) {
    notFound()
  }

  // Get instructor's blog posts
  const allPosts = getAllBlogPosts()
  const instructorPosts = allPosts.filter(post => post.author === instructor.name)

  return (
    <div className="min-h-screen bg-gradient-to-br from-sand-beige/5 to-golden-olive/5">
      {/* Hero Section */}
      <section className="py-16 sm:py-20">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 items-center">
              {/* Profile Image */}
              <div className="lg:col-span-1">
                <div className="relative">
                  <div className="w-64 h-64 mx-auto lg:mx-0 bg-gradient-to-br from-golden-olive to-sand-beige rounded-3xl flex items-center justify-center text-white text-6xl font-bold shadow-2xl">
                    {instructor.name.charAt(0)}
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <GraduationCap className="w-8 h-8 text-golden-olive" />
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="lg:col-span-2 text-center lg:text-left">
                <div className="mb-6">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-premium-text mb-4">
                    {instructor.name}
                  </h1>
                  <h2 className="text-xl sm:text-2xl text-golden-olive font-semibold mb-6">
                    {instructor.title}
                  </h2>
                  <p className="text-lg text-sand-beige leading-relaxed max-w-3xl">
                    {instructor.bio}
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
                  {instructor.social.youtube && instructor.social.youtube !== '#' && (
                    <a 
                      href={instructor.social.youtube} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full border border-premium-border hover:bg-red-50 hover:border-red-300 transition-all duration-200 flex items-center justify-center"
                    >
                      <Youtube className="w-5 h-5 text-red-500" />
                    </a>
                  )}
                  {instructor.social.linkedin && instructor.social.linkedin !== '#' && (
                    <a 
                      href={instructor.social.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full border border-premium-border hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 flex items-center justify-center"
                    >
                      <Linkedin className="w-5 h-5 text-blue-600" />
                    </a>
                  )}
                  {instructor.social.twitter && instructor.social.twitter !== '#' && (
                    <a 
                      href={instructor.social.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full border border-premium-border hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 flex items-center justify-center"
                    >
                      <Twitter className="w-5 h-5 text-blue-400" />
                    </a>
                  )}
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-white/70 dark:bg-black/20 rounded-xl backdrop-blur-sm">
                    <div className="text-2xl font-bold text-premium-text">{instructorPosts.length}</div>
                    <div className="text-sm text-sand-beige">Articles</div>
                  </div>
                  <div className="text-center p-4 bg-white/70 dark:bg-black/20 rounded-xl backdrop-blur-sm">
                    <div className="text-2xl font-bold text-premium-text">{instructor.specializations.length}</div>
                    <div className="text-sm text-sand-beige">Specializations</div>
                  </div>
                  <div className="text-center p-4 bg-white/70 dark:bg-black/20 rounded-xl backdrop-blur-sm">
                    <div className="text-2xl font-bold text-premium-text">{instructor.qualifications.length}</div>
                    <div className="text-sm text-sand-beige">Qualifications</div>
                  </div>
                  <div className="text-center p-4 bg-white/70 dark:bg-black/20 rounded-xl backdrop-blur-sm">
                    <div className="text-2xl font-bold text-premium-text">500+</div>
                    <div className="text-sm text-sand-beige">Students</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Qualifications & Specializations */}
      <section className="py-16 sm:py-20 bg-white/50 dark:bg-black/10">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
              {/* Qualifications */}
              <Card className="border-premium-border bg-white/70 dark:bg-black/20 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-golden-olive/10 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-golden-olive" />
                    </div>
                    <h3 className="text-2xl font-bold text-premium-text">Qualifications</h3>
                  </div>
                  <div className="space-y-4">
                    {instructor.qualifications.map((qualification, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-golden-olive rounded-full"></div>
                        <span className="text-sand-beige">{qualification}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Specializations */}
              <Card className="border-premium-border bg-white/70 dark:bg-black/20 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-golden-olive/10 rounded-full flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-golden-olive" />
                    </div>
                    <h3 className="text-2xl font-bold text-premium-text">Specializations</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {instructor.specializations.map((specialization, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-golden-olive/10 text-golden-olive border-golden-olive/20 hover:bg-golden-olive/20 transition-colors"
                      >
                        {specialization}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Articles by Instructor */}
      {instructorPosts.length > 0 && (
        <section className="py-16 sm:py-20">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12 sm:mb-16">
                <h3 className="text-3xl sm:text-4xl font-bold text-premium-text mb-4">
                  Articles by {instructor.name}
                </h3>
                <p className="text-lg text-sand-beige max-w-2xl mx-auto">
                  Explore the latest insights and wisdom shared by our expert instructor
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {instructorPosts.slice(0, 6).map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>

              {instructorPosts.length > 6 && (
                <div className="text-center mt-12">
                  <a 
                    href="/wisdom"
                    className="inline-flex items-center px-6 py-3 border border-golden-olive text-golden-olive hover:bg-golden-olive hover:text-white transition-all duration-200 rounded-lg"
                  >
                    View All Articles
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-golden-olive/5 to-sand-beige/5">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl sm:text-4xl font-bold text-premium-text mb-6">
              Learn from {instructor.name}
            </h3>
            <p className="text-lg text-sand-beige mb-8 max-w-2xl mx-auto">
              Join thousands of students who have transformed their understanding of ancient Indian wisdom through {instructor.name}'s expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/courses"
                className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-golden-olive hover:bg-golden-olive/90 text-white"
              >
                Explore Courses
              </a>
              <a 
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold rounded-full transition-all duration-200 border border-golden-olive text-golden-olive hover:bg-golden-olive hover:text-white"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
