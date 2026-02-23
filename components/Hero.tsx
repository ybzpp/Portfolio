'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/lib/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useGSAP(
    () => {
      const el = bgRef.current;
      if (!el) return;
      gsap.to(el, {
        y: 80,
        ease: 'none',
        scrollTrigger: {
          trigger: 'section#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    },
    { dependencies: [] }
  );

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden px-6 pt-12 pb-24 md:pb-28"
    >
      {/* Video background */}
      <div ref={bgRef} className="absolute inset-0 pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-20"
        >
          <source src="/showreel.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/90 via-dark-bg/70 to-dark-bg" />
        <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-neon-pink/5" />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.p
          className="font-display text-neon-cyan text-xs md:text-sm mb-8 [letter-spacing:0.2em]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          &gt; {t.hero.subtitle}
        </motion.p>
        <motion.h1
          className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-100 mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {t.hero.title}
          <span className="text-neon-pink block mt-2">{t.hero.titleHighlight}</span>
        </motion.h1>
        <motion.p
          className="font-body text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t.hero.desc}
        </motion.p>
        <motion.div
          className="flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            href="#portfolio"
            className="px-6 py-3 font-display text-xs border-2 border-neon-cyan bg-neon-cyan text-dark-bg rounded-none hover:bg-neon-cyan/90 transition-all duration-200 hover:shadow-pixel-cyan"
          >
            {t.hero.ctaWorks}
          </Link>
          <Link
            href="#contact"
            className="px-6 py-3 font-display text-xs border-2 border-neon-pink text-neon-pink rounded-none hover:bg-neon-pink/20 transition-all duration-200 hover:shadow-pixel-pink"
          >
            {t.hero.ctaContact}
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10"
        style={{ bottom: 'max(1.5rem, calc(env(safe-area-inset-bottom, 0px) + 1rem))' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span className="font-display text-[10px] text-zinc-500 [letter-spacing:0.15em]">{t.hero.scroll}</span>
        <motion.div
          className="w-1 h-10 bg-neon-cyan rounded-none"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
