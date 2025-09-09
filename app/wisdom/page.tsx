import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import { getBlogPosts, getFeaturedImageUrl, stripHtml } from '@/lib/wordpress'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Wisdom | Ancient Indian Philosophy & Sanskrit Articles',
  description: 'Explore curated articles on Sanskrit, Darshana, and timeless Indian wisdom. Learn from ancient texts and modern interpretations.',
  keywords: ['Sanskrit', 'Darshana', 'Indian philosophy', 'Vedic wisdom', 'ancient wisdom', 'spiritual articles'],
  openGraph: {
    title: 'Wisdom | Shikshanam',
    description: 'Curated articles on Sanskrit, Darshana, and timeless Indian wisdom',
    type: 'website',
    url: 'https://shikshanam.in/wisdom',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wisdom | Shikshanam',
    description: 'Curated articles on Sanskrit, Darshana, and timeless Indian wisdom',
  },
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="rounded-2xl overflow-hidden border border-premium-border bg-white/70 dark:bg-black/20 animate-pulse">
          <div className="aspect-[16/9] bg-sand-beige/40" />
          <div className="p-5 space-y-3">
            <div className="h-5 bg-sand-beige/40 rounded" />
            <div className="h-4 bg-sand-beige/30 rounded w-3/4" />
            <div className="h-4 bg-sand-beige/30 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}

async function BlogGrid({ page }: { page: number }) {
  const { posts, totalPages } = await getBlogPosts(page, 12)

  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => {
          const href = `/blog/${post.slug}`
          const img = getFeaturedImageUrl(post)
          const excerpt = stripHtml(post.excerpt?.rendered || '').slice(0, 160)
          return (
            <Link key={post.id} href={href} className="group rounded-2xl overflow-hidden border border-premium-border bg-white/70 dark:bg-black/20 hover:shadow-lg transition-all duration-200">
              <div className="relative aspect-[16/9] bg-sand-beige/40">
                {img && (
                  <Image
                    src={img}
                    alt={stripHtml(post.title?.rendered || 'Blog')}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-lg leading-snug group-hover:text-golden-olive transition-colors" dangerouslySetInnerHTML={{ __html: post.title?.rendered || '' }} />
                <p className="mt-2 text-sm text-sand-beige">{excerpt}…</p>
                <div className="mt-4 text-sm text-golden-olive font-medium">Read more →</div>
              </div>
            </Link>
          )
        })}
      </section>

      {totalPages > 1 && (
        <nav className="mt-10 flex items-center justify-center gap-3">
          <PaginationButton disabled={page <= 1} href={page > 1 ? `/wisdom?page=${page - 1}` : '#'}>
            Previous
          </PaginationButton>
          <span className="text-sm text-sand-beige">Page {page} of {totalPages}</span>
          <PaginationButton disabled={page >= totalPages} href={page < totalPages ? `/wisdom?page=${page + 1}` : '#'}>
            Next
          </PaginationButton>
        </nav>
      )}
    </>
  )
}

export default async function WisdomPage({ searchParams }: { searchParams: { page?: string } }) {
  const page = Number(searchParams?.page || 1)

  return (
    <div className="container-custom py-12">
      <header className="mb-10 text-center">
        <h1 className="font-display text-4xl md:text-5xl bg-gradient-to-r from-golden-olive via-deep-maroon to-copper-orange bg-clip-text text-transparent">
          Wisdom
        </h1>
        <p className="mt-3 text-sand-beige">
          Curated articles on Sanskrit, Darshana, and timeless Indian wisdom.
        </p>
      </header>

      <Suspense fallback={<LoadingSkeleton />}>
        <BlogGrid page={page} />
      </Suspense>
    </div>
  )
}

function PaginationButton({ href, disabled, children }: { href: string; disabled?: boolean; children: React.ReactNode }) {
  if (disabled) {
    return (
      <span className="px-4 py-2 rounded-xl border border-premium-border text-sand-beige/60 cursor-not-allowed">
        {children}
      </span>
    )
  }
  return (
    <Link href={href} className="px-4 py-2 rounded-xl border border-premium-border hover:bg-premium-accent-primary/10 text-premium-text transition-colors">
      {children}
    </Link>
  )
}


