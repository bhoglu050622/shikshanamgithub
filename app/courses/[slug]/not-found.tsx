import Link from 'next/link'
import { BookOpen, ArrowLeft, Home } from 'lucide-react'
import Button from '@/components/ui/button'

export default function CourseNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="mb-8">
          <div className="w-24 h-24 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-12 h-12 text-orange-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Course Not Found
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
            The course you're looking for doesn't exist or may have been moved.
          </p>
        </div>

        <div className="space-y-4">
          <Button
            variant="primary"
            href="/courses"
            className="w-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Browse All Courses
          </Button>
          
          <Button
            variant="outline"
            href="/"
            className="w-full"
          >
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Button>
        </div>

        <div className="mt-8 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Can't find what you're looking for?{' '}
            <Link href="/contact" className="text-orange-600 hover:text-orange-700 font-medium">
              Contact us
            </Link>{' '}
            and we'll help you find the right course.
          </p>
        </div>
      </div>
    </div>
  )
}
