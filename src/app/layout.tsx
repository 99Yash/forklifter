import { TailwindIndicator } from '@/components/tailwind-indicator';
import { ThemeProvider } from '@/components/theme-provider';
import { siteConfig } from '@/config/site';

import Providers from '@/components/providers';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import LogLib from '@loglib/tracker/react';
import { Analytics } from '@vercel/analytics/react';
import { type Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: 'Online portfolio generator',
  keywords: [
    'portfolio',
    'generator',
    'NextJS',
    'TailwindCSS',
    'TypeScript',
    'MongoDB',
    'NodeJS',
  ],
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
  twitter: {
    title: siteConfig.name,
    description: 'Fully responsive, Open source Portfolio generator.',
    creator: '@YashGouravKar1',
    card: 'summary_large_image',
  },
  authors: {
    name: 'Yash Gourav Kar',
    url: siteConfig.links.twitter,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: 'https://forklifter.vercel.app/og.png',
        width: 2322,
        height: 1306,
      },
    ],
  },
  icons: {
    shortcut: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Analytics />
      </head>

      <body
        className={cn('min-h-screen font-sans antialiased', inter.variable)}
      >
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <LogLib config={{ id: 'forklifter_vercel' }} />
            {children}
          </ThemeProvider>
          <Toaster />
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  );
}
