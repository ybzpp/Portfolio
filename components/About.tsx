'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import HoloCard from './HoloCard';

const hardSkills = {
  gamedev: ['Unity', 'C#', 'Luna Playworks', 'ECS', 'Zenject', 'DOTween', 'Photon Fusion', 'Mirror', 'Git'],
  tools: ['After Effects', 'Photoshop', 'Cinema 4D'],
};

const softSkillsRu = ['Найм и собеседования', 'Эффективность команды', 'Дедлайны', 'Итеративная разработка'];
const softSkillsEn = ['Hiring & interviews', 'Team efficiency', 'Deadlines', 'Iterative development'];

export default function About() {
  const { locale, t } = useLanguage();
  const softSkills = locale === 'ru' ? softSkillsRu : softSkillsEn;

  return (
    <section id="about" className="relative py-24 px-6 md:px-12 bg-dark-card/70 border-y-2 border-dark-border">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="font-display text-xl md:text-2xl font-bold text-zinc-100 mb-16 text-center [letter-spacing:0.05em]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          [{t.about.title}]
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <HoloCard src="/res/photo.png" alt="Sergey Korolev" name="SERGEY KOROLEV" title="GAME DEVELOPER" />
            <p className="font-body text-zinc-400 text-lg leading-relaxed">
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
              <h3 className="font-display text-neon-cyan text-xs [letter-spacing:0.1em] mb-3">
                &gt; {t.about.hardSkills}
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="font-display text-zinc-500 text-[10px] mb-1 [letter-spacing:0.05em]">GAMEDEV</p>
                  <p className="font-body text-zinc-300 text-lg">
                    {hardSkills.gamedev.join(', ')}
                  </p>
                </div>
                <div>
                  <p className="font-display text-zinc-500 text-[10px] mb-1 [letter-spacing:0.05em]">TOOLS / CREATIVES</p>
                  <p className="font-body text-zinc-300 text-lg">
                    {hardSkills.tools.join(', ')}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-display text-neon-pink text-xs [letter-spacing:0.1em] mb-3">
                &gt; {t.about.softSkills}
              </h3>
              <p className="font-body text-zinc-300 text-lg">{softSkills.join(' · ')}</p>
            </div>
            <div>
              <h3 className="font-display text-neon-green text-xs [letter-spacing:0.1em] mb-3">
                &gt; {t.about.experience}
              </h3>
              <ul className="space-y-3">
                {t.about.timeline.map((item) => (
                  <li key={item.year} className="flex gap-4 border-l-2 border-neon-cyan/50 pl-3">
                    <span className="font-display text-neon-cyan text-[10px] shrink-0 w-14 [letter-spacing:0.05em]">
                      {item.year}
                    </span>
                    <span className="font-body text-zinc-400 text-lg">{item.text}</span>
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
