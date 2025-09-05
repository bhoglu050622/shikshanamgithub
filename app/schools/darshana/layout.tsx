import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'School of Darshana | Nyaya, Vaisheshika, Samkhya, Yoga, Mimamsa, Vedanta',
  description: 'Explore India\'s six Darshanas with a clear roadmap—start with a quiz or choose a school: Nyaya, Vaisheshika, Samkhya, Yoga, Mimamsa, Vedanta.',
  openGraph: {
    title: 'School of Darshana | Shikshanam',
    description: 'Explore India\'s six Darshanas with a clear roadmap—start with a quiz or choose a school: Nyaya, Vaisheshika, Samkhya, Yoga, Mimamsa, Vedanta.',
    url: 'https://shikshanam.com/schools/darshana',
    type: 'website',
  },
  alternates: {
    canonical: '/schools/darshana',
  },
}

export default function DarshanaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Six Darshanas",
            "description": "The six classical schools of Indian philosophy",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Nyaya",
                "description": "Logic and debate",
                "url": "/schools/darshana/nyaya"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Vaisheshika",
                "description": "Categories and atoms",
                "url": "/schools/darshana/vaisheshika"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Samkhya",
                "description": "Tattva map of reality",
                "url": "/schools/darshana/samkhya"
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "Yoga",
                "description": "Practice and psychology",
                "url": "/schools/darshana/yoga"
              },
              {
                "@type": "ListItem",
                "position": 5,
                "name": "Mimamsa",
                "description": "Dharma and ritual",
                "url": "/schools/darshana/mimamsa"
              },
              {
                "@type": "ListItem",
                "position": 6,
                "name": "Vedanta",
                "description": "Ultimate reality",
                "url": "/schools/darshana/vedanta"
              }
            ]
          })
        }}
      />
      {children}
    </>
  )
}
