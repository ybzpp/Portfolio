import type { Metadata } from 'next';
import { Press_Start_2P, VT323 } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';

const pressStart = Press_Start_2P({
  subsets: ['latin', 'cyrillic'],
  weight: '400',
  variable: '--font-pixel',
  display: 'swap',
});

const vt323 = VT323({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-vt323',
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
      className={`${pressStart.variable} ${vt323.variable} noise-overlay`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-dark-bg text-zinc-200 font-body relative pixel-grid-bg starfield">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('portfolio-theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t);})();`,
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
