import './globals.css'

import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' }
  ]
}

export const metadata: Metadata = {
  metadataBase: process.env.VERCEL_URL
    ? new URL(`https://${process.env.VERCEL_URL}`)
    : new URL('http://localhost:3000'),
  title: siteConfig.name,
  description: siteConfig.description,
  robots: 'follow, index',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: dark)',
        url: '/favicon-dark.ico'
      },
      {
        media: '(prefers-color-scheme: light)',
        url: '/favicon-light.ico'
      }
    ],
    shortcut: [
      {
        media: '(prefers-color-scheme: dark)',
        url: '/favicon-dark.ico'
      },
      {
        media: '(prefers-color-scheme: light)',
        url: '/favicon-light.ico'
      }
    ],
    apple: [
      {
        media: '(prefers-color-scheme: dark)',
        url: '/apple-touch-icon-dark.png'
      },
      {
        media: '(prefers-color-scheme: light)',
        url: '/apple-touch-icon-light.png'
      }
    ]
  },
  openGraph: {
    title: siteConfig.name,
    siteName: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: siteConfig.name
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: '/twitter-card.png',
        width: 1200,
        height: 630,
        alt: siteConfig.name
      }
    ],
    site: '@papertrail'
  },
  applicationName: siteConfig.name,
  generator: 'Papertrail'
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'font-sans antialiased',
          GeistSans.variable,
          GeistMono.variable,
          'h-screen'
        )}
      >
        <Toaster position="top-center" containerAriaLabel="Toaster" />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex h-screen flex-col">
            <Header />
            <main className="flex flex-1 items-center justify-center">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
