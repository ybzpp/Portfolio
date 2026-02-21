'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/lib/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const PARTICLES = [
  { left: '10%', top: '20%', size: 4, color: 'var(--neon-cyan)', duration: 8, delay: 0 },
  { left: '85%', top: '15%', size: 6, color: 'var(--neon-pink)', duration: 10, delay: 1 },
  { left: '25%', top: '70%', size: 3, color: 'var(--neon-cyan)', duration: 12, delay: 0.5 },
  { left: '70%', top: '60%', size: 5, color: 'var(--neon-pink)', duration: 9, delay: 2 },
  { left: '50%', top: '35%', size: 2, color: 'var(--neon-cyan)', duration: 11, delay: 0.2 },
  { left: '15%', top: '85%', size: 4, color: 'var(--neon-pink)', duration: 7, delay: 1.5 },
  { left: '90%', top: '80%', size: 3, color: 'var(--neon-cyan)', duration: 13, delay: 0.8 },
  { left: '40%', top: '10%', size: 5, color: 'var(--neon-pink)', duration: 9, delay: 0.3 },
  { left: '60%', top: '90%', size: 2, color: 'var(--neon-cyan)', duration: 10, delay: 1.2 },
];

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
      className="relative min-h-[120vh] flex flex-col items-center justify-center overflow-hidden px-6 pt-20"
    >
      {/* Pixel grid background */}
      <div
        className="absolute inset-0 bg-grid-pattern opacity-30"
        style={{ backgroundSize: '16px 16px' }}
      />

      {/* Pixel stars / particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-none"
            style={{
              left: p.left,
              top: p.top,
              width: Math.max(2, p.size),
              height: Math.max(2, p.size),
              background: p.color,
              boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            }}
            animate={{
              y: [0, -16, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: p.delay,
            }}
          />
        ))}
      </div>

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
          className="font-display text-neon-cyan text-xs md:text-sm mb-4 [letter-spacing:0.2em]"
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
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
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
