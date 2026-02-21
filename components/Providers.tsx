'use client';

import { ThemeProvider } from '@/lib/theme';
import { LanguageProvider } from '@/lib/LanguageContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </ThemeProvider>
  );
}
