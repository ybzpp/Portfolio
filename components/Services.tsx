'use client';

import { motion } from 'framer-motion';
import servicesData from '@/data/services.json';
import { useLanguage } from '@/lib/LanguageContext';
import type { ServiceProject } from '@/lib/services';

const services = servicesData as ServiceProject[];

export default function Services() {
  const { locale, t } = useLanguage();
  return (
    <section id="services" className="relative py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-display text-[10px] text-neon-green mb-5">&gt; {t.services.eyebrow}</p>
          <h2 className="font-display text-xl md:text-2xl text-zinc-100 mb-5 leading-relaxed">[{t.services.title}]</h2>
          <p className="font-body text-zinc-400 text-lg">{t.services.desc}</p>
        </div>
        {services.length ? (
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => (
              <article key={service.slug} className="border-2 border-dark-border bg-dark-card p-6">
                {service.cover && (
                  <div className="aspect-video mb-6 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={service.cover} alt={service.title} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                )}
                <h3 className="font-display text-sm text-zinc-100 mb-4">{service.title}</h3>
                <p className="font-body text-zinc-400 mb-5">{locale === 'ru' ? service.descriptionRu : service.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">{service.tags.map((tag) => <span key={tag} className="font-body text-xs text-neon-green border border-neon-green/25 px-2 py-1">{tag}</span>)}</div>
                <a href={service.url} target="_blank" rel="noopener noreferrer" className="font-display text-[10px] text-neon-green hover:underline">{t.services.open} ↗</a>
              </article>
            ))}
          </div>
        ) : (
          <motion.div className="relative border-2 border-dark-border bg-dark-card/60 p-8 sm:p-12 lg:p-16 overflow-hidden" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="absolute top-0 right-0 w-64 h-64 bg-neon-green/[0.04] blur-3xl pointer-events-none" />
            <div className="relative max-w-2xl mx-auto text-center">
              <span className="inline-block mb-6 font-display text-xl text-neon-green" aria-hidden="true">[ &gt;_ ]</span>
              <h3 className="font-display text-sm sm:text-lg text-zinc-200 leading-relaxed mb-5">{t.services.emptyTitle}</h3>
              <p className="font-body text-zinc-400 text-lg leading-relaxed mb-7">{t.services.emptyDesc}</p>
              <div className="flex flex-wrap justify-center gap-2 mb-8">{t.services.areas.map((area) => <span key={area} className="font-body text-sm text-neon-green/80 px-3 py-1.5 border border-neon-green/20">{area}</span>)}</div>
              <a href="#contact" className="inline-block font-display text-[10px] border-2 border-neon-green/50 text-neon-green px-5 py-3 hover:bg-neon-green/10 transition-colors">{t.services.contact} ↗</a>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
