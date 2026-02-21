'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

const hardSkills = {
  gamedev: ['Unity', 'C#', 'Unreal Engine', 'Shader Graph', 'Git'],
  motion: ['After Effects', 'Cinema 4D', 'Blender', 'Spine', 'UI Animation'],
};

const softSkillsRu = ['Коммуникация', 'Работа в команде', 'Дедлайны', 'Итеративная разработка'];
const softSkillsEn = ['Communication', 'Teamwork', 'Deadlines', 'Iterative development'];

export default function About() {
  const { locale, t } = useLanguage();
  const softSkills = locale === 'ru' ? softSkillsRu : softSkillsEn;

  return (
    <section id="about" className="relative py-24 px-6 md:px-12 bg-dark-card/50">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="font-display text-3xl md:text-5xl font-bold text-zinc-100 mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t.about.title}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="aspect-square max-w-sm rounded-lg overflow-hidden border border-dark-border bg-dark-bg flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/res/photo.png"
                alt="Sergey Korolev"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-zinc-400 leading-relaxed">
              {t.about.bio}
            </p>
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h3 className="font-display text-neon-cyan text-sm uppercase tracking-wider mb-3">
                {t.about.hardSkills}
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-zinc-500 text-xs mb-1">GameDev</p>
                  <p className="text-zinc-300">
                    {hardSkills.gamedev.join(', ')}
                  </p>
                </div>
                <div>
                  <p className="text-zinc-500 text-xs mb-1">Motion</p>
                  <p className="text-zinc-300">
                    {hardSkills.motion.join(', ')}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-display text-neon-pink text-sm uppercase tracking-wider mb-3">
                {t.about.softSkills}
              </h3>
              <p className="text-zinc-300">{softSkills.join(' · ')}</p>
            </div>
            <div>
              <h3 className="font-display text-neon-green text-sm uppercase tracking-wider mb-3">
                {t.about.experience}
              </h3>
              <ul className="space-y-3">
                {t.about.timeline.map((item, i) => (
                  <li key={item.year} className="flex gap-4">
                    <span className="text-neon-cyan font-mono text-sm shrink-0 w-16">
                      {item.year}
                    </span>
                    <span className="text-zinc-400 text-sm">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
