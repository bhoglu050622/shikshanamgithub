import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPostBySlug, getFeaturedImageUrl, stripHtml } from '@/lib/wordpress'

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) return { title: 'Blog | Shikshanam' }
  const title = stripHtml(post.title?.rendered || '')
  const description = stripHtml(post.excerpt?.rendered || '').slice(0, 160)
  const image = getFeaturedImageUrl(post) || undefined
  const url = `https://shikshanam.in/blog/${post.slug}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug)
  if (!post) {
    return (
      <div className="container-custom py-16">
        <h1 className="text-2xl font-semibold">Post not found</h1>
        <p className="mt-4">
          Return to <Link className="text-golden-olive underline" href="/wisdom">Wisdom</Link>.
        </p>
      </div>
    )
  }

  const featured = getFeaturedImageUrl(post)

  return (
    <article className="container-custom py-10">
      <Link href="/wisdom" className="inline-block mb-6 text-golden-olive hover:underline">← Back to Wisdom</Link>
      <h1 className="font-display text-4xl md:text-5xl leading-tight" dangerouslySetInnerHTML={{ __html: post.title?.rendered || '' }} />
      {featured && (
        <div className="relative mt-6 aspect-[16/9] rounded-2xl overflow-hidden border border-premium-border">
          <Image src={featured} alt={stripHtml(post.title?.rendered || 'Blog image')} fill className="object-cover" />
        </div>
      )}
      <div className="prose prose-lg max-w-none mt-8 prose-headings:font-display prose-a:text-golden-olive prose-img:rounded-xl prose-img:border prose-img:border-premium-border dark:prose-invert" dangerouslySetInnerHTML={{ __html: post.content?.rendered || '' }} />
    </article>
  )
}


