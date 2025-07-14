import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Software Engineer Portfolio | Full-Stack Developer',
    template: '%s | Software Engineer Portfolio'
  },
  description: 'Professional software engineer with 3+ years of experience in full-stack development, specializing in React, Node.js, and modern web technologies.',
  keywords: ['software engineer', 'full-stack developer', 'react', 'node.js', 'typescript', 'portfolio'],
  authors: [{ name: 'Software Engineer' }],
  creator: 'Software Engineer',
  publisher: 'Software Engineer',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'http://localhost:3000',
    title: 'Software Engineer Portfolio | Full-Stack Developer',
    description: 'Professional software engineer with 3+ years of experience in full-stack development.',
    siteName: 'Software Engineer Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Software Engineer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Software Engineer Portfolio | Full-Stack Developer',
    description: 'Professional software engineer with 3+ years of experience in full-stack development.',
    images: ['/og-image.jpg'],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1e293b" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
} 