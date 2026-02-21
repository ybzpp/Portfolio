'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from '@/lib/theme';
import { useLanguage } from '@/lib/LanguageContext';

const navKeys = ['works', 'about', 'contact'] as const;

export default function Header() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 120], [0, 0.95]);
  const borderOpacity = useTransform(scrollY, [0, 120], [0, 1]);
  const { theme, toggleTheme } = useTheme();
  const bgFrom = theme === 'light' ? '244, 244, 245' : '10, 10, 15';
  const borderFrom = theme === 'light' ? '228, 228, 231' : '30, 30, 46';
  const backgroundColor = useTransform(bgOpacity, (v) => `rgba(${bgFrom}, ${v})`);
  const borderBottomColor = useTransform(borderOpacity, (v) => `rgba(${borderFrom}, ${v})`);
  const { locale, setLocale, t } = useLanguage();

  const navLinks = [
    { href: '#portfolio', label: t.nav.works },
    { href: '#about', label: t.nav.about },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-3 sm:px-6 md:px-12 py-3 sm:py-4"
      style={{
        backgroundColor,
        borderBottomWidth: 1,
        borderBottomColor,
      }}
    >
      <Link
        href="#hero"
        className="font-display font-bold text-lg tracking-wider text-zinc-100 hover:text-neon-cyan transition-colors"
      >
        SK
      </Link>
      <nav className="flex items-center gap-2 sm:gap-4 md:gap-10">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-xs sm:text-sm font-medium text-zinc-400 hover:text-neon-cyan transition-colors relative group whitespace-nowrap"
          >
            {link.label}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-neon-cyan group-hover:w-full transition-all duration-300" />
          </Link>
        ))}
        <button
          type="button"
          onClick={toggleTheme}
          className="p-1.5 sm:p-2 rounded border border-dark-border text-zinc-400 hover:text-neon-cyan hover:border-neon-cyan/50 transition-colors text-sm shrink-0"
          title={theme === 'dark' ? 'Светлая тема' : 'Dark theme'}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? '☀' : '🌙'}
        </button>
        <div className="flex rounded border border-dark-border overflow-hidden shrink-0">
          <button
            type="button"
            onClick={() => setLocale('ru')}
            className={`px-1.5 sm:px-2 py-1 text-xs sm:text-sm transition-colors ${locale === 'ru' ? 'bg-neon-cyan text-dark-bg' : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            RU
          </button>
          <button
            type="button"
            onClick={() => setLocale('en')}
            className={`px-1.5 sm:px-2 py-1 text-xs sm:text-sm transition-colors ${locale === 'en' ? 'bg-neon-cyan text-dark-bg' : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            EN
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
