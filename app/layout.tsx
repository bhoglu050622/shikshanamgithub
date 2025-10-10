import type { Metadata, Viewport } from 'next'
import { Inter, Nunito_Sans, DM_Serif_Display, Tiro_Devanagari_Hindi, Playfair_Display, Cinzel } from 'next/font/google'
import './globals.css'

// Import polyfills first to ensure browser globals are available during SSR
// import '@/lib/polyfills'
import PerformanceMonitor from '@/components/optimization/PerformanceMonitor'
import ErrorBoundary from '@/components/ErrorBoundary'
import HydrationBoundary from '@/components/HydrationBoundary'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/lib/theme'
import { PopupProvider, PopupManager } from '@/components/popups'
import { AuthProvider } from '@/lib/auth/AuthContext'
import ImagePreloader from '@/components/optimization/ImagePreloader'

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
    <html 
      lang="en" 
      className={`${inter.variable} ${nunito.variable} ${dmSerif.variable} ${tiroDevanagari.variable} ${playfairDisplay.variable} ${cinzel.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#FF8A00" />
        <meta name="color-scheme" content="light dark" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Clean up extension attributes that might cause hydration mismatches
              (function() {
                if (typeof window !== 'undefined') {
                  const cleanup = () => {
                    const html = document.documentElement;
                    if (html) {
                      const attributesToRemove = [
                        'katalonextensionid',
                        'data-extension-id',
                        'data-browser-extension'
                      ];
                      attributesToRemove.forEach(attr => {
                        if (html.hasAttribute(attr)) {
                          html.removeAttribute(attr);
                        }
                      });
                    }
                  };
                  
                  // Run cleanup immediately and on DOM mutations
                  cleanup();
                  if (window.MutationObserver) {
                    const observer = new MutationObserver(cleanup);
                    observer.observe(document.documentElement, {
                      attributes: true,
                      attributeFilter: ['katalonextensionid', 'data-extension-id', 'data-browser-extension']
                    });
                  }
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <HydrationBoundary>
          <ErrorBoundary>
            <ThemeProvider>
              <AuthProvider>
                <PopupProvider>
                  <PerformanceMonitor />
                  <ImagePreloader />
                  <Header />
                  <main className="flex-1">
                    {children}
                  </main>
                  <Footer />
                  <PopupManager />
                </PopupProvider>
              </AuthProvider>
            </ThemeProvider>
          </ErrorBoundary>
        </HydrationBoundary>
      </body>
    </html>
  )
}
