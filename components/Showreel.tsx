'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import projects from '@/data/projects.json';
import { useLanguage } from '@/lib/LanguageContext';
import { youtubeEmbedUrl } from '@/lib/youtube';

const reel = projects.find((project) => project.slug === 'showreel');
const reelEmbed = reel?.videoUrl ? youtubeEmbedUrl(reel.videoUrl) : '';

export default function Showreel() {
  const { t } = useLanguage();
  const [playing, setPlaying] = useState(false);
  if (!reel?.videoUrl || !reelEmbed) return null;

  return (
    <section id="showreel" className="relative py-24 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-neon-purple/[0.025] via-neon-pink/[0.04] to-transparent" />
      <motion.div className="relative max-w-5xl mx-auto text-center" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <p className="font-display text-[10px] text-neon-pink mb-5">{t.showreel.eyebrow}</p>
        <h2 className="font-display text-2xl md:text-4xl text-zinc-100 mb-5">[{t.showreel.title}]</h2>
        <p className="font-body text-zinc-400 text-lg mb-10">{t.showreel.desc}</p>
        <div className="relative aspect-video bg-black border-2 border-neon-pink/40 shadow-pixel-pink overflow-hidden">
          {playing ? <iframe src={`${reelEmbed}?autoplay=1&rel=0`} title={t.showreel.title} className="w-full h-full" referrerPolicy="strict-origin-when-cross-origin" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen /> : (
            <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 flex flex-col items-center justify-center w-full h-full" aria-label={t.showreel.play}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={reel.cover} alt="" className="absolute inset-0 w-full h-full object-cover opacity-55 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500" loading="lazy" />
              <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <span className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-full border-2 border-neon-pink bg-dark-bg/60 flex items-center justify-center text-neon-pink text-2xl sm:text-4xl group-hover:bg-neon-pink group-hover:text-white transition-colors" aria-hidden="true">▶</span>
              <span className="relative font-display text-[9px] sm:text-xs text-white mt-5">{t.showreel.play}</span>
            </button>
          )}
        </div>
        <a href={reel.videoUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-6 font-body text-sm text-zinc-500 hover:text-neon-pink">{t.showreel.youtube} ↗</a>
      </motion.div>
    </section>
  );
}
