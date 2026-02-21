'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sergey-korolev-developer/', icon: 'in' },
  { label: 'Telegram', href: 'https://t.me/ybzppgames', icon: 'tg' },
  { label: 'Itch.io', href: 'https://ybzpp.itch.io/', icon: 'io' },
  { label: 'GitHub', href: 'https://github.com/ybzpp', icon: 'gh' },
  { label: 'Ludum Dare', href: 'https://ldjam.com/users/ybzpp/games', icon: 'ld' },
];

export default function Footer() {
  const [formData, setFormData] = useState({ name: '', contact: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: здесь можно подключить API или mailto
    setSent(true);
    setFormData({ name: '', contact: '', message: '' });
  };

  return (
    <footer id="contact" className="relative py-24 px-6 md:px-12 border-t border-dark-border">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold text-zinc-100">
            Контакты
          </h2>
          <p className="text-zinc-400">
            Есть проект или вопрос? Напишите — отвечу в течение дня.
          </p>
          <a
            href="mailto:your@email.com"
            className="inline-block text-neon-cyan hover:underline font-medium"
          >
            your@email.com
          </a>
          <div className="flex flex-wrap gap-4 pt-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded border border-dark-border text-zinc-400 hover:border-neon-cyan hover:text-neon-cyan transition-colors text-sm"
              >
                {s.label}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="font-display text-lg text-zinc-300 mb-4">Форма обратной связи</h3>
          {sent ? (
            <p className="text-neon-green">Сообщение отправлено. Спасибо!</p>
          ) : (
            <>
              <input
                type="text"
                placeholder="Имя"
                value={formData.name}
                onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                className="w-full px-4 py-3 rounded bg-dark-card border border-dark-border text-zinc-200 placeholder-zinc-500 focus:border-neon-cyan focus:outline-none transition-colors"
                required
              />
              <input
                type="text"
                placeholder="Email или Telegram"
                value={formData.contact}
                onChange={(e) => setFormData((d) => ({ ...d, contact: e.target.value }))}
                className="w-full px-4 py-3 rounded bg-dark-card border border-dark-border text-zinc-200 placeholder-zinc-500 focus:border-neon-cyan focus:outline-none transition-colors"
                required
              />
              <textarea
                placeholder="Сообщение"
                value={formData.message}
                onChange={(e) => setFormData((d) => ({ ...d, message: e.target.value }))}
                rows={4}
                className="w-full px-4 py-3 rounded bg-dark-card border border-dark-border text-zinc-200 placeholder-zinc-500 focus:border-neon-cyan focus:outline-none transition-colors resize-none"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 rounded font-display text-sm tracking-wider uppercase bg-neon-pink text-white hover:bg-neon-pink/90 transition-all hover:shadow-neon-pink"
              >
                Отправить
              </button>
            </>
          )}
        </motion.form>
      </div>

      <div className="max-w-5xl mx-auto mt-16 pt-8 border-t border-dark-border text-center text-zinc-500 text-sm">
        © {new Date().getFullYear()} Sergey Korolev. Game Developer & Motion Designer.
      </div>
    </footer>
  );
}
