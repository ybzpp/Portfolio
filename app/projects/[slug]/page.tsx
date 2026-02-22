'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import projectsData from '@/data/projects.json';
import { youtubeEmbedUrl } from '@/lib/youtube';
import { useLanguage } from '@/lib/LanguageContext';

type Project = {
  slug: string;
  title: string;
  year: string;
  category: string;
  tags: string[];
  cover: string;
  description: string;
  descriptionRu?: string;
  problem?: string;
  problemRu?: string;
  solution?: string;
  solutionRu?: string;
  videoUrl: string | null;
  links: { label: string; labelRu?: string; url: string }[];
  gallery: string[];
};

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const { locale, t } = useLanguage();
  const [coverError, setCoverError] = useState(false);
  const slug = params.slug as string;
  const project = (projectsData as Project[]).find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-display text-sm md:text-base text-zinc-400 mb-4 [letter-spacing:0.05em]">{t.project.notFound}</h1>
          <Link href="/#portfolio" className="font-display text-xs text-neon-cyan hover:underline border-2 border-neon-cyan px-4 py-2 rounded-none">
            {t.project.backToPortfolio}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-dark-bg/95 border-b-2 border-dark-border">
        <Link
          href="/#portfolio"
          className="font-display font-bold text-sm md:text-base text-zinc-100 hover:text-neon-cyan transition-colors [letter-spacing:0.1em]"
        >
          [SK]
        </Link>
        <button
          onClick={() => router.back()}
          className="font-display text-xs text-zinc-400 hover:text-neon-cyan transition-colors border-2 border-dark-border px-3 py-1.5 rounded-none hover:border-neon-cyan"
        >
          ← {t.project.back}
        </button>
      </header>

      <main className="pt-24 pb-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="font-display text-[10px] text-neon-cyan [letter-spacing:0.05em]">{project.year}</span>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-display text-[10px] px-2 py-0.5 rounded-none bg-dark-card border-2 border-dark-border text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="font-display text-xl md:text-2xl font-bold text-zinc-100 mb-6 [letter-spacing:0.03em]">
              {project.title}
            </h1>
            <p className="font-body text-zinc-400 text-lg mb-10">{locale === 'ru' && project.descriptionRu ? project.descriptionRu : project.description}</p>

            {(project.cover && !coverError) ? (
              <div className="rounded-none overflow-hidden border-2 border-dark-border mb-10 aspect-video bg-dark-card flex items-center justify-center shadow-pixel">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.cover}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onError={() => setCoverError(true)}
                />
              </div>
            ) : project.cover ? (
              <div className="rounded-none border-2 border-dark-border mb-10 aspect-video bg-dark-card flex items-center justify-center shadow-pixel">
                <span className="font-display text-5xl text-zinc-600">{project.title.charAt(0)}</span>
              </div>
            ) : null}

            {project.problem && (
              <div className="mb-8 border-l-2 border-neon-cyan pl-4">
                <h3 className="font-display text-neon-cyan text-xs [letter-spacing:0.1em] mb-2">
                  &gt; {t.project.task}
                </h3>
                <p className="font-body text-zinc-400 text-lg">{locale === 'ru' && project.problemRu ? project.problemRu : project.problem}</p>
              </div>
            )}
            {project.solution && (
              <div className="mb-8 border-l-2 border-neon-pink pl-4">
                <h3 className="font-display text-neon-pink text-xs [letter-spacing:0.1em] mb-2">
                  &gt; {t.project.solution}
                </h3>
                <p className="font-body text-zinc-400 text-lg">{locale === 'ru' && project.solutionRu ? project.solutionRu : project.solution}</p>
              </div>
            )}

            {project.videoUrl && (
              <div className="mb-10">
                <h3 className="font-display text-zinc-300 text-xs [letter-spacing:0.1em] mb-4">
                  &gt; {t.project.video}
                </h3>
                <div className="aspect-video rounded-none overflow-hidden border-2 border-dark-border bg-black shadow-pixel">
                  <iframe
                    src={youtubeEmbedUrl(project.videoUrl)}
                    title={project.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              {project.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-none font-display text-xs border-2 border-neon-cyan bg-neon-cyan text-dark-bg hover:bg-neon-cyan/90 transition-all hover:shadow-pixel-cyan"
                >
                  {locale === 'ru' && link.labelRu ? link.labelRu : link.label}
                </a>
              ))}
            </div>
          </motion.article>
        </div>
      </main>
    </>
  );
}
