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
          <h2 className="font-display text-3xl md:text-5xl font-bold text-zinc-100 mb-4">
            {t.portfolio.title}
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            {t.portfolio.desc}
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-5 py-2.5 rounded font-medium text-sm transition-all duration-300 ${
                activeFilter === cat.id
                  ? 'bg-neon-cyan text-dark-bg'
                  : 'bg-dark-card text-zinc-400 border border-dark-border hover:border-neon-cyan/50 hover:text-zinc-200'
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
                  <div className="relative overflow-hidden rounded-lg bg-dark-card border border-dark-border hover:border-neon-cyan/40 transition-all duration-300 h-64">
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
                        <span className="font-display text-5xl text-zinc-600 select-none">
                          {project.title.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-display text-lg font-semibold text-zinc-100 group-hover:text-neon-cyan transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="portfolio-card-tag text-xs px-2 py-0.5 rounded bg-neon-cyan/20 text-neon-cyan"
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
