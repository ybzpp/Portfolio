'use client';

import { LanguageProvider } from '@/lib/LanguageContext';
import { RetroDisplayProvider } from './RetroDisplay';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <LanguageProvider><RetroDisplayProvider>{children}</RetroDisplayProvider></LanguageProvider>;
}
