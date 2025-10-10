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

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-nunito-sans',
  display: 'swap',
  preload: true,
})

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  variable: '--font-dm-serif-display',
  display: 'swap',
  weight: ['400'],
  preload: true,
})

const tiroDevanagari = Tiro_Devanagari_Hindi({
  subsets: ['devanagari', 'latin'],
  variable: '--font-tiro-devanagari',
  display: 'swap',
  weight: ['400'],
  preload: true,
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
  weight: ['400'],
  preload: true,
})

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
  weight: ['400'],
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: 'Shikshanam - Ancient Wisdom for Modern Life',
    template: '%s | Shikshanam'
  },
  description: 'Explore Sanskrit philosophy, Vedanta, Samkhya, Yoga, and traditional Indian wisdom through comprehensive courses and interactive learning experiences.',
  keywords: [
    'Sanskrit',
    'Vedanta',
    'Samkhya',
    'Yoga',
    'Indian Philosophy',
    'Ancient Wisdom',
    'Spiritual Learning',
    'Dharma',
    'Upanishads',
    'Bhagavad Gita',
    'Traditional Knowledge',
    'Philosophy Courses',
    'Spiritual Education',
    'Wisdom Traditions',
    'Eastern Philosophy'
  ],
  authors: [{ name: 'Shikshanam Team' }],
  creator: 'Shikshanam',
  publisher: 'Shikshanam',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://shikshanam.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shikshanam.com',
    title: 'Shikshanam - Ancient Wisdom for Modern Life',
    description: 'Explore Sanskrit philosophy, Vedanta, Samkhya, Yoga, and traditional Indian wisdom through comprehensive courses and interactive learning experiences.',
    siteName: 'Shikshanam',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Shikshanam - Ancient Wisdom for Modern Life',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shikshanam - Ancient Wisdom for Modern Life',
    description: 'Explore Sanskrit philosophy, Vedanta, Samkhya, Yoga, and traditional Indian wisdom through comprehensive courses and interactive learning experiences.',
    images: ['/og-image.jpg'],
    creator: '@shikshanam',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FF8A00' },
    { media: '(prefers-color-scheme: dark)', color: '#FF8A00' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${nunitoSans.variable} ${dmSerifDisplay.variable} ${tiroDevanagari.variable} ${playfairDisplay.variable} ${cinzel.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#FF8A00" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
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
      </body>
    </html>
  )
}
