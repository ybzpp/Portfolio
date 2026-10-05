import type { Metadata } from 'next';
import { Press_Start_2P, Manrope } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';
import FloatingParticles from '@/components/FloatingParticles';

const pressStart = Press_Start_2P({
  subsets: ['latin', 'cyrillic'],
  weight: '400',
  variable: '--font-pixel',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sergey Korolev — AI Product Engineer · Playable Ads',
  description:
    'AI Product Engineer building AI products, web services, Unity games and Playable Ads. Play interactive demos and explore released games.',
  metadataBase: new URL('https://sergeykorolev.dev'),
  openGraph: {
    title: 'Sergey Korolev — AI Product Engineer · Playable Ads',
    description: 'AI products, web services, interactive Playable Ads and Unity games.',
    type: 'website',
    locale: 'ru_RU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sergey Korolev — AI Product Engineer',
    description: 'AI products, web services, Unity games and playable demos.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ru"
      className={`${pressStart.variable} ${manrope.variable} noise-overlay`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-dark-bg text-zinc-200 font-body relative pixel-grid-bg starfield">
        <FloatingParticles />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
