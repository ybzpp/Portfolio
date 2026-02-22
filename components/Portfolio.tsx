'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import projectsData from '@/data/projects.json';
import { useLanguage } from '@/lib/LanguageContext';

type Category = 'all' | 'gamedev' | 'motion';

export default function Portfolio() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<Category>('all');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const categories: { id: Category; label: string }[] = [
    { id: 'all', label: t.portfolio.all },
    { id: 'gamedev', label: t.portfolio.gamedev },
    { id: 'motion', label: t.portfolio.motion },
  ];

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return projectsData;
    return projectsData.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="portfolio" className="relative py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-xl md:text-2xl font-bold text-zinc-100 mb-4 [letter-spacing:0.05em]">
            [{t.portfolio.title}]
          </h2>
          <p className="font-body text-zinc-400 text-lg max-w-xl mx-auto">
            {t.portfolio.desc}
          </p>
        </motion.div>

        {/* Filters - pixel buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-4 py-2 font-display text-xs border-2 rounded-none transition-all duration-200 ${
                activeFilter === cat.id
                  ? 'bg-neon-cyan text-dark-bg border-neon-cyan shadow-pixel-cyan'
                  : 'bg-dark-card text-zinc-400 border-dark-border hover:border-neon-cyan/70 hover:text-zinc-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.article
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="group"
              >
                <Link href={`/projects/${project.slug}`}>
                  <div className="relative overflow-hidden rounded-none bg-dark-card border-2 border-dark-border hover:border-neon-cyan transition-all duration-200 h-64 shadow-pixel group-hover:shadow-pixel-cyan">
                    {/* Cover image — fallback if no image or 404 */}
                    <div className="absolute inset-0 bg-dark-border/50 flex items-center justify-center">
                      {project.cover && !imageErrors[project.slug] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={project.cover}
                          alt={project.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={() => setImageErrors((prev) => ({ ...prev, [project.slug]: true }))}
                        />
                      ) : (
                        <span className="font-display text-4xl text-zinc-600 select-none">
                          {project.title.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-dark-bg/90">
                      <h3 className="font-display text-sm font-semibold text-zinc-100 group-hover:text-neon-cyan transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="portfolio-card-tag font-display text-[10px] px-2 py-0.5 border border-neon-cyan/50 bg-neon-cyan/20 text-neon-cyan rounded-none"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
