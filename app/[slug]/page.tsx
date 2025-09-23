import DynamicPage from '@/components/DynamicPage'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  return <DynamicPage slug={slug} />
}

// Generate static params for known pages
export async function generateStaticParams() {
  // You can pre-generate static params for known pages here
  // For now, we'll let Next.js handle dynamic routes
  return []
}
