import type { Metadata } from 'next';
import { Orbitron, Rajdhani } from 'next/font/google';
import './globals.css';

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-rajdhani',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sergey Korolev — Game Developer & Motion Designer',
  description:
    'Game Developer & Motion Designer. Unity, C#, After Effects. Creating game mechanics and bringing interfaces to life.',
  openGraph: {
    title: 'Sergey Korolev — Game Developer & Motion Designer',
    description: 'Portfolio: games, UI animation, motion design.',
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
      className={`${orbitron.variable} ${rajdhani.variable} noise-overlay`}
    >
      <body className="antialiased min-h-screen bg-dark-bg text-zinc-200 font-body">
        {children}
      </body>
    </html>
  );
}
