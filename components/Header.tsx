'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

const navLinks = [
  { href: '#portfolio', label: 'Работы' },
  { href: '#about', label: 'Обо мне' },
  { href: '#contact', label: 'Контакты' },
];

export default function Header() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 120], [0, 0.95]);
  const borderOpacity = useTransform(scrollY, [0, 120], [0, 1]);
  const backgroundColor = useTransform(bgOpacity, (v) => `rgba(10, 10, 15, ${v})`);
  const borderBottomColor = useTransform(borderOpacity, (v) => `rgba(30, 30, 46, ${v})`);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
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
      <nav className="flex items-center gap-6 md:gap-10">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm font-medium text-zinc-400 hover:text-neon-cyan transition-colors relative group"
          >
            {link.label}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-neon-cyan group-hover:w-full transition-all duration-300" />
          </Link>
        ))}
      </nav>
    </motion.header>
  );
}
