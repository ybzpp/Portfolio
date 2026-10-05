'use client';

import { motion } from 'framer-motion';
import { useCallback, useState } from 'react';
import playables from '@/data/playables.json';
import { useLanguage } from '@/lib/LanguageContext';
import PlayablePlayer, { type Playable } from './PlayablePlayer';

export default function Playables() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<Playable | null>(null);
  const closePlayer = useCallback(() => setSelected(null), []);

  return (
    <section id="playables" className="relative px-6 md:px-12 py-24">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center max-w-3xl mx-auto mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="font-display text-[9px] sm:text-[10px] text-neon-green leading-relaxed mb-5">&gt; {t.playables.eyebrow}</p>
          <h2 className="font-display text-xl md:text-3xl text-zinc-100 mb-5">[{t.playables.title}]</h2>
          <p className="font-body text-zinc-400 text-lg leading-relaxed">{t.playables.desc}</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {playables.map((playable, index) => (
            <button key={playable.slug} type="button" onClick={() => setSelected(playable)} className={`playable-card playable-card--${playable.accent} group text-left`} aria-label={`${t.playables.open} ${playable.title}`}>
              <div className="playable-card__visual">
                <span className="absolute z-10 top-4 left-4 font-display text-[9px] text-white/80 bg-dark-bg/80 px-2 py-1">0{index + 1}</span>
                <span className="absolute z-10 top-4 right-4 flex items-center gap-2 font-display text-[8px] text-white/90 bg-dark-bg/80 px-2 py-1"><span className="w-1.5 h-1.5 bg-neon-green" /> PLAYABLE</span>
                {playable.cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={playable.cover} alt="" loading="lazy" className="playable-card__image" />
                ) : <span className="font-display text-5xl text-neon-cyan/70">GS</span>}
                <span className="playable-card__play" aria-hidden="true">▶</span>
              </div>
              <div className="p-5 border-t border-dark-border flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-xs text-zinc-100 leading-relaxed group-hover:text-neon-cyan transition-colors">{playable.title}</h3>
                  <p className="font-body text-sm text-zinc-500 mt-2">Unity · Luna · {t.playables.hint}</p>
                </div>
                <span className="font-display text-[9px] text-neon-cyan shrink-0 mt-1">{t.playables.play} ↗</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      {selected && <PlayablePlayer playable={selected} onClose={closePlayer} />}
    </section>
  );
}
