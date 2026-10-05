'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sergey-korolev-developer/', icon: 'in' },
  { label: 'Telegram', href: 'https://t.me/ybzppgames', icon: 'tg' },
  { label: 'Itch.io', href: 'https://ybzpp.itch.io/', icon: 'io' },
  { label: 'GitHub', href: 'https://github.com/ybzpp', icon: 'gh' },
  { label: 'Ludum Dare', href: 'https://ldjam.com/users/ybzpp/games', icon: 'ld' },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="relative py-24 px-6 md:px-12 border-t-2 border-dark-border">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="font-display text-lg md:text-xl font-bold text-zinc-100 [letter-spacing:0.05em]">
            [{t.contact.title}]
          </h2>
          <p className="font-body text-zinc-400 text-lg">
            {t.contact.desc}
          </p>
          <a
            href="mailto:s.korolev.developer@gmail.com"
            className="inline-block font-body text-neon-cyan hover:underline text-lg font-medium"
          >
            s.korolev.developer@gmail.com
          </a>
          <div className="flex flex-wrap gap-3 pt-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 font-display text-xs border-2 border-dark-border text-zinc-400 hover:border-neon-cyan hover:text-neon-cyan transition-colors rounded-none"
              >
                {s.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto mt-16 pt-8 border-t-2 border-dark-border text-center font-body text-zinc-500 text-lg">
        {t.footer.replace('{year}', String(new Date().getFullYear()))}
      </div>
    </footer>
  );
}
