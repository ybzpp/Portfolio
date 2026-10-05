'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import servicesData from '@/data/services.json';

export default function Header() {
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(scrollY, [0, 120], ['rgba(10,10,18,0.4)', 'rgba(10,10,18,0.97)']);
  const { locale, setLocale, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    { href: '#playables', label: t.nav.playables },
    { href: '#showreel', label: t.nav.showreel },
    { href: '#portfolio', label: t.nav.works },
    ...(servicesData.length ? [{ href: '#services', label: t.nav.services }] : []),
    { href: '#about', label: t.nav.about },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <motion.header className="fixed top-0 left-0 right-0 z-50 border-b border-dark-border/60 backdrop-blur-md" style={{ backgroundColor }}>
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-10 py-4">
        <Link href="#hero" onClick={() => setMenuOpen(false)} className="font-display text-sm text-zinc-100 hover:text-neon-cyan shrink-0">[SK]</Link>
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7" aria-label={t.nav.works}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="font-display text-[9px] xl:text-[10px] text-zinc-400 hover:text-neon-cyan transition-colors whitespace-nowrap">{link.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <div className="flex border-2 border-dark-border">
            {(['ru', 'en'] as const).map((language) => (
              <button key={language} type="button" onClick={() => setLocale(language)} aria-pressed={locale === language} className={`px-2 py-1.5 font-display text-[10px] transition-colors ${locale === language ? 'bg-neon-cyan text-dark-bg' : 'text-zinc-400 hover:text-zinc-200'}`}>{language.toUpperCase()}</button>
            ))}
          </div>
          <button type="button" className="lg:hidden font-display text-[10px] border-2 border-dark-border px-3 py-2 text-zinc-300" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? '×' : '☰'} <span className="sr-only">{t.nav.menu}</span></button>
        </div>
      </div>
      {menuOpen && (
        <nav id="mobile-navigation" className="lg:hidden grid grid-cols-2 gap-px border-t border-dark-border bg-dark-border" aria-label={t.nav.menu}>
          {navLinks.map((link) => <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="bg-dark-bg px-6 py-5 font-display text-[10px] text-zinc-300 hover:text-neon-cyan">{link.label}</Link>)}
        </nav>
      )}
    </motion.header>
  );
}
