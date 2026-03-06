'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import HoloCard from './HoloCard';

const hardSkills = {
  gamedev: ['Unity', 'C#', 'Luna Playworks', 'ECS', 'Zenject', 'DOTween', 'Photon Fusion', 'Mirror', 'Git', 'UniTask', 'Addressables', 'Shader Graph'],
  tools: ['After Effects', 'Photoshop', 'Cinema 4D', 'Figma', 'Premiere Pro'],
};

const softSkillsRu = [
  'Найм и собеседования', 'Эффективность команды', 'Дедлайны',
  'Итеративная разработка', 'Менторство', 'Code Review',
];
const softSkillsEn = [
  'Hiring & interviews', 'Team efficiency', 'Deadlines',
  'Iterative development', 'Mentoring', 'Code Review',
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function About() {
  const { locale, t } = useLanguage();
  const softSkills = locale === 'ru' ? softSkillsRu : softSkillsEn;

  return (
    <section id="about" className="relative py-28 px-6 md:px-12 overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-cyan/[0.03] rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-pink/[0.03] rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          className="font-display text-xl md:text-2xl font-bold text-zinc-100 mb-20 text-center [letter-spacing:0.05em]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          [{t.about.title}]
        </motion.h2>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center lg:items-start">
          {/* Left: Card + bio */}
          <motion.div
            className="flex flex-col items-center gap-8 lg:sticky lg:top-28 shrink-0"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <HoloCard
              src="/res/photo.webp"
              alt="Sergey Korolev"
              name="SERGEY KOROLEV"
              title="GAME DEVELOPER"
            />
            <p className="font-body text-zinc-400 text-base leading-relaxed max-w-sm text-center">
              {t.about.bio}
            </p>
          </motion.div>

          {/* Right: Skills & experience */}
          <motion.div
            className="flex-1 space-y-10 min-w-0"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {/* Hard Skills */}
            <motion.div variants={fadeUp} className="p-6 border border-dark-border/60 bg-dark-card/40 backdrop-blur-sm">
              <h3 className="font-display text-neon-cyan text-xs [letter-spacing:0.1em] mb-5 flex items-center gap-2">
                <span className="w-2 h-2 bg-neon-cyan inline-block" aria-hidden="true" />
                {t.about.hardSkills}
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="font-display text-zinc-500 text-[10px] mb-2 [letter-spacing:0.08em]">GAMEDEV</p>
                  <div className="flex flex-wrap gap-2">
                    {hardSkills.gamedev.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 font-body text-sm text-neon-cyan/90 border border-neon-cyan/20 bg-neon-cyan/[0.06] hover:bg-neon-cyan/[0.12] hover:border-neon-cyan/40 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-display text-zinc-500 text-[10px] mb-2 [letter-spacing:0.08em]">TOOLS / CREATIVES</p>
                  <div className="flex flex-wrap gap-2">
                    {hardSkills.tools.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 font-body text-sm text-neon-purple/90 border border-neon-purple/20 bg-neon-purple/[0.06] hover:bg-neon-purple/[0.12] hover:border-neon-purple/40 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Soft Skills */}
            <motion.div variants={fadeUp} className="p-6 border border-dark-border/60 bg-dark-card/40 backdrop-blur-sm">
              <h3 className="font-display text-neon-pink text-xs [letter-spacing:0.1em] mb-5 flex items-center gap-2">
                <span className="w-2 h-2 bg-neon-pink inline-block" aria-hidden="true" />
                {t.about.softSkills}
              </h3>
              <div className="flex flex-wrap gap-2">
                {softSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 font-body text-sm text-neon-pink/90 border border-neon-pink/20 bg-neon-pink/[0.06] hover:bg-neon-pink/[0.12] hover:border-neon-pink/40 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Experience timeline */}
            <motion.div variants={fadeUp} className="p-6 border border-dark-border/60 bg-dark-card/40 backdrop-blur-sm">
              <h3 className="font-display text-neon-green text-xs [letter-spacing:0.1em] mb-5 flex items-center gap-2">
                <span className="w-2 h-2 bg-neon-green inline-block" aria-hidden="true" />
                {t.about.experience}
              </h3>
              <ul className="space-y-5">
                {t.about.timeline.map((item, i) => (
                  <li key={item.year} className="relative pl-6 border-l-2 border-neon-green/30 group">
                    <span className="absolute left-[-7px] top-1 w-3 h-3 border-2 border-neon-green bg-dark-bg group-hover:bg-neon-green/30 transition-colors" aria-hidden="true" />
                    <span className="font-display text-neon-green text-[11px] [letter-spacing:0.08em] block mb-1">
                      {item.year}
                      {i === 0 && <span className="ml-2 inline-block w-1.5 h-1.5 bg-neon-green rounded-full animate-glow-pulse" aria-hidden="true" />}
                    </span>
                    <span className="font-body text-zinc-300 text-base leading-relaxed">{item.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
