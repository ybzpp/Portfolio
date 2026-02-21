'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);

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
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-20"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 bg-grid-pattern bg-grid opacity-40"
        style={{ backgroundSize: '60px 60px' }}
      />

      {/* Video background — положите showreel.mp4 в public/ для фона */}
      <div ref={bgRef} className="absolute inset-0">
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
        {/* Fallback gradient when no video */}
        <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-neon-pink/5 pointer-events-none" />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.p
          className="font-display text-neon-cyan text-sm md:text-base tracking-[0.3em] uppercase mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Game Developer & Motion Designer
        </motion.p>
        <motion.h1
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-zinc-100 mb-6 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Sergey
          <span className="text-neon-pink"> Korolev</span>
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Создаю механики игр на Unity и оживляю интерфейсы с помощью анимации.
          Технический артист и креативный разработчик — от кода до моушн-дизайна.
        </motion.p>
        <motion.div
          className="flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            href="#portfolio"
            className="px-8 py-4 font-display text-sm tracking-wider uppercase bg-neon-cyan text-dark-bg rounded hover:bg-neon-cyan/90 transition-all duration-300 hover:shadow-neon-cyan"
          >
            Смотреть работы
          </Link>
          <Link
            href="#contact"
            className="px-8 py-4 font-display text-sm tracking-wider uppercase border-2 border-neon-pink text-neon-pink rounded hover:bg-neon-pink/10 transition-all duration-300"
          >
            Связаться со мной
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span className="text-xs text-zinc-500 uppercase tracking-widest">Scroll</span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-neon-cyan to-transparent rounded-full"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
