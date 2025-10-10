import type { Metadata, Viewport } from 'next'
import { Inter, Nunito_Sans, DM_Serif_Display, Tiro_Devanagari_Hindi, Playfair_Display, Cinzel } from 'next/font/google'
import './globals.css'

// Import polyfills first to ensure browser globals are available during SSR
import '@/lib/polyfills'
import PerformanceMonitor from '@/components/optimization/PerformanceMonitor'
// import ClientServiceWorker from '@/components/ClientServiceWorker'
import ErrorBoundary from '@/components/ErrorBoundary'
// import ClientServiceWorker from '@/components/ClientServiceWorker'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/lib/theme'
import { PopupProvider, PopupManager } from '@/components/popups'
import { AuthProvider } from '@/lib/auth/AuthContext'
import ImagePreloader from '@/components/optimization/ImagePreloader'
// import { AccessibilityProvider } from '@/components/accessibility/AccessibilityProvider'
// import { AccessibilityToolbar } from '@/components/accessibility/AccessibilityToolbar'
// import { SEOProvider } from '@/lib/seo'
// import { AnalyticsProvider } from '@/lib/analytics'
// import '@/lib/console-filter'

// Critical fonts - loaded immediately
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

const nunito = Nunito_Sans({ 
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
  preload: true,
})

// Decorative fonts - lazy loaded, no preload
const dmSerif = DM_Serif_Display({ 
  subsets: ['latin'],
  variable: '--font-dm-serif',
  display: 'swap',
  weight: ['400'],
  preload: false,
})

const tiroDevanagari = Tiro_Devanagari_Hindi({ 
  subsets: ['latin'],
  variable: '--font-tiro-devanagari',
  display: 'swap',
  weight: ['400'],
  preload: false,
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '700'],
  preload: false,
})

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
  weight: ['400', '700'],
  preload: false,
})

export const metadata: Metadata = {
  title: 'Shikshanam - Ancient Indian Knowledge Platform | Sanskrit, Darshanas, Self-help',
  description: 'Unlock the timeless wisdom of Sanskrit, Darshanas, and Self-help. Join Shikshanam to explore ancient Indian knowledge through live classes, courses, and spiritual guidance.',
  keywords: 'Sanskrit, Darshanas, Self-help, Ancient India, Wisdom, Spiritual Learning, Indian Philosophy, Vedic Knowledge, Yoga, Meditation, Bhagavad Gita, Vedanta, Ayurveda, Classical Literature, Devanagari, Sanskrit Grammar, Indian Culture, Traditional Learning, Online Sanskrit Classes, Sanskrit Courses, Philosophy Courses, Self Development, Ancient Wisdom, Spiritual Growth, Indian Heritage, Cultural Education',
  authors: [{ name: 'Shikshanam Team' }],
  creator: 'Shikshanam',
  publisher: 'Shikshanam',
  robots: 'index, follow',
  metadataBase: new URL('https://shikshanam.com'),
  alternates: {
    canonical: 'https://shikshanam.com',
  },
  openGraph: {
    title: 'Shikshanam - Ancient Indian Knowledge Platform',
    description: 'Unlock the timeless wisdom of Sanskrit, Darshanas, and Self-help through our comprehensive learning platform.',
    url: 'https://shikshanam.com',
    siteName: 'Shikshanam',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Shikshanam - Ancient Indian Knowledge Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shikshanam - Ancient Indian Knowledge Platform',
    description: 'Unlock the timeless wisdom of Sanskrit, Darshanas, and Self-help through our comprehensive learning platform.',
    images: ['/og-image.jpg'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FF8A00' },
    { media: '(prefers-color-scheme: dark)', color: '#FF8A00' }
  ],
  colorScheme: 'light dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${nunito.variable} ${dmSerif.variable} ${tiroDevanagari.variable} ${playfairDisplay.variable} ${cinzel.variable}`} suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://shikshanam.com" />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        {/* Structured Data Scripts */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: '{"@context":"https://schema.org","@type":"EducationalOrganization","name":"Shikshanam","description":"Ancient Indian Knowledge Platform for Sanskrit, Darshanas, and Self-help","url":"https://shikshanam.com","logo":"https://shikshanam.com/logo.png","sameAs":["https://twitter.com/shikshanam","https://facebook.com/shikshanam","https://instagram.com/shikshanam"],"offers":{"@type":"Course","name":"Sanskrit Learning","description":"Learn Sanskrit through structured courses and live classes"}}'
          }}
          suppressHydrationWarning
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[]}'
          }}
          suppressHydrationWarning
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: '(function(){function makeContentVisible(){const hiddenElements=document.querySelectorAll(\'[style*="opacity:0"]\');hiddenElements.forEach(el=>{el.style.opacity=\'1\';el.style.transform=\'none\';el.style.transition=\'none\'});}makeContentVisible();if(document.readyState===\'loading\'){document.addEventListener(\'DOMContentLoaded\',makeContentVisible);}setTimeout(makeContentVisible,100);})();'
          }}
          suppressHydrationWarning
        />
        
        {/* Skip Links for Accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <a href="#navigation" className="skip-link">
          Skip to navigation
        </a>
        <a href="#footer" className="skip-link">
          Skip to footer
        </a>
        
        <ErrorBoundary>
          {/* <PerformanceMonitor /> */}
          {/* <ClientServiceWorker /> */}
          {/* <ImagePreloader /> */}
          <ThemeProvider>
            <AuthProvider>
              <PopupProvider>
                <div className="min-h-screen bg-parchment-ivory transition-colors duration-300 overflow-x-hidden">
                  <Header />
                  <main id="main-content" className="flex-1 w-full max-w-full" role="main">
                    {children}
                  </main>
                  <Footer />
                  <PopupManager />
                </div>
              </PopupProvider>
            </AuthProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
