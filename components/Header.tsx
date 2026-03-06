'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

export default function Header() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 120], [0, 0.95]);
  const borderOpacity = useTransform(scrollY, [0, 120], [0, 1]);
  const backgroundColor = useTransform(bgOpacity, (v) => `rgba(10, 10, 15, ${v})`);
  const borderBottomColor = useTransform(borderOpacity, (v) => `rgba(30, 30, 46, ${v})`);
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
        className="font-display font-bold text-sm sm:text-base text-zinc-100 hover:text-neon-cyan transition-colors [letter-spacing:0.1em] shrink-0"
      >
        [SK]
      </Link>
      <nav className="absolute left-0 right-0 flex items-center justify-center gap-1.5 sm:gap-4 md:gap-8 pointer-events-none">
        <div className="flex items-center gap-1.5 sm:gap-4 md:gap-8 pointer-events-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display text-[9px] sm:text-xs text-zinc-400 hover:text-neon-cyan transition-colors whitespace-nowrap border-b-2 border-transparent hover:border-neon-cyan pb-0.5 leading-none py-1"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
      <div className="flex border-2 border-dark-border overflow-hidden shrink-0 rounded-none items-center">
        <button
          type="button"
          onClick={() => setLocale('ru')}
          className={`px-1.5 sm:px-2 py-1 sm:py-1.5 font-display text-[9px] sm:text-xs transition-colors border-r-2 border-dark-border leading-none ${locale === 'ru' ? 'bg-neon-cyan text-dark-bg' : 'text-zinc-400 hover:text-zinc-200'}`}
        >
          RU
        </button>
        <button
          type="button"
          onClick={() => setLocale('en')}
          className={`px-1.5 sm:px-2 py-1 sm:py-1.5 font-display text-[9px] sm:text-xs transition-colors leading-none ${locale === 'en' ? 'bg-neon-cyan text-dark-bg' : 'text-zinc-400 hover:text-zinc-200'}`}
        >
          EN
        </button>
      </div>
    </motion.header>
  );
}
