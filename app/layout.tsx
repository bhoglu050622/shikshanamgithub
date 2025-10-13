import type { Metadata, Viewport } from 'next'
import { Inter, Nunito_Sans, DM_Serif_Display, Tiro_Devanagari_Hindi, Playfair_Display } from 'next/font/google'
import './globals.css'
import './mobile.css'
// Temporarily disabled heavy components to troubleshoot
// import PerformanceMonitor from '@/components/optimization/PerformanceMonitor'
import ErrorBoundary from '@/components/ErrorBoundary'
// import ClientServiceWorker from '@/components/ClientServiceWorker'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/lib/theme'
import { AuthProvider } from '@/lib/auth/AuthContext'
// import { AccessibilityProvider } from '@/components/accessibility/AccessibilityProvider'
// import { AccessibilityToolbar } from '@/components/accessibility/AccessibilityToolbar'
// import { SEOProvider } from '@/lib/seo'
// import { AnalyticsProvider } from '@/lib/analytics'
// import '@/lib/console-filter'

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

const dmSerif = DM_Serif_Display({ 
  subsets: ['latin'],
  variable: '--font-dm-serif',
  display: 'swap',
  weight: ['400'],
  preload: true,
})

const tiroDevanagari = Tiro_Devanagari_Hindi({ 
  subsets: ['latin'],
  variable: '--font-tiro-devanagari',
  display: 'swap',
  weight: ['400'],
  preload: true,
})

const playfairDisplay = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '700'],
  preload: true,
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
    <html lang="en" className={`${inter.variable} ${nunito.variable} ${dmSerif.variable} ${tiroDevanagari.variable} ${playfairDisplay.variable}`} suppressHydrationWarning>
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
        
        {/* Google Analytics 4 */}
        {process.env.NEXT_PUBLIC_GA4_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID}', {
                    page_path: window.location.pathname,
                    debug_mode: ${process.env.NEXT_PUBLIC_GA4_DEBUG === 'true'}
                  });
                `,
              }}
            />
          </>
        )}
        
        {/* Meta Pixel */}
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
                  fbq('track', 'PageView');
                `,
              }}
            />
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_META_PIXEL_ID}&ev=PageView&noscript=1`}
              />
            </noscript>
          </>
        )}
        
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
          <ThemeProvider>
            <AuthProvider>
              <div className="min-h-screen bg-parchment-ivory transition-colors duration-300 overflow-x-hidden w-full">
                <Header />
                <main id="main-content" className="w-full pb-20" role="main">
                  {children}
                </main>
                <Footer />
              </div>
            </AuthProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
