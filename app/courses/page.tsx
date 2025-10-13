import { getAllCoursesCategories, getCourseCount } from '@/lib/courses'
import CoursesClient from './CoursesClient'
import type { Metadata } from 'next'

// Note: Course categories are now dynamically generated from the /app/courses/ directory
// See lib/courses/scanner.ts for the scanning logic
// See lib/courses/categories.ts for category configuration

export const metadata: Metadata = {
  title: 'Courses | Shikshanam - Sanskrit, Philosophy & Ancient Wisdom',
  description: 'Explore our comprehensive collection of courses in Sanskrit, Indian philosophy, Upanishads, and practical wisdom. From free introductory courses to complete mastery bundles.',
  openGraph: {
    title: 'Courses | Shikshanam',
    description: 'Explore our comprehensive collection of courses in Sanskrit, Indian philosophy, Upanishads, and practical wisdom.',
  }
}

export default function CoursesPage() {
  // Fetch data server-side
  const courseCategories = getAllCoursesCategories()
  const courseCount = getCourseCount()

  return <CoursesClient categories={courseCategories} courseCount={courseCount} />
}
