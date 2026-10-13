import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000'
  ),
  title: 'A Little Request from Makarius',
  description: 'A heartfelt invitation to become Makarius Kleon Andrade’s Ninong or Ninang.',
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'A Little Request from Makarius',
    description: 'A heartfelt invitation to become Makarius Kleon Andrade’s Ninong or Ninang.',
    images: [
      {
        url: '/apple-icon.png',
        width: 800,
        height: 800,
        alt: 'Makarius Kleon Andrade',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'A Little Request from Makarius',
    description: 'A heartfelt invitation to become Makarius Kleon Andrade’s Ninong or Ninang.',
    images: ['/apple-icon.png'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
