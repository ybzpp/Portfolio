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
  title: 'Sergey Korolev — Unity Developer · Playable Ads',
  description:
    'Unity Developer with 5 years in game dev. Playable Ads, hyper-casual, multiplayer. Unity, C#, fast development, quality.',
  openGraph: {
    title: 'Sergey Korolev — Unity Developer · Playable Ads',
    description: 'Portfolio: games, prototypes, Playable Ads. Unity, C#, Photon Fusion.',
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
