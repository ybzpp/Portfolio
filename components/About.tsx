'use client';

import { motion } from 'framer-motion';

const hardSkills = {
  gamedev: ['Unity', 'C#', 'Unreal Engine', 'Shader Graph', 'Git'],
  motion: ['After Effects', 'Cinema 4D', 'Blender', 'Spine', 'UI Animation'],
};

const softSkills = ['Коммуникация', 'Работа в команде', 'Дедлайны', 'Итеративная разработка'];

const timeline = [
  { year: '2021', text: 'Начало коммерческой разработки игр, участие в Ludum Dare' },
  { year: '2022', text: 'Релизы на Google Play, моушн и рекламные ролики' },
  { year: '2023–24', text: 'Мобильные и браузерные проекты, Yandex Games, студийная работа' },
  { year: '2025', text: 'Ludum Dare 57, фокус на геймдев и технический арт' },
];

export default function About() {
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
          Обо мне
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Photo placeholder + short bio */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="aspect-square max-w-sm rounded-lg overflow-hidden border border-dark-border bg-dark-bg flex items-center justify-center">
              <span className="text-zinc-500 font-display text-sm">Ваше фото</span>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              Разработчик игр и моушн-дизайнер. Объединяю код и визуал: от механик в Unity до
              анимации интерфейсов и VFX. Участвую в game jams, релизах на мобильных и в браузере.
            </p>
          </motion.div>

          {/* Skills */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h3 className="font-display text-neon-cyan text-sm uppercase tracking-wider mb-3">
                Hard Skills
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
                Soft Skills
              </h3>
              <p className="text-zinc-300">{softSkills.join(' · ')}</p>
            </div>
            <div>
              <h3 className="font-display text-neon-green text-sm uppercase tracking-wider mb-3">
                Опыт
              </h3>
              <ul className="space-y-3">
                {timeline.map((item, i) => (
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
