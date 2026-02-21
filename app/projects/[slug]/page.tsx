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
  problem?: string;
  solution?: string;
  videoUrl: string | null;
  links: { label: string; url: string }[];
  gallery: string[];
};

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const { t } = useLanguage();
  const [coverError, setCoverError] = useState(false);
  const slug = params.slug as string;
  const project = (projectsData as Project[]).find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-display text-2xl text-zinc-400 mb-4">{t.project.notFound}</h1>
          <Link href="/#portfolio" className="text-neon-cyan hover:underline">
            {t.project.backToPortfolio}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-dark-bg/90 border-b border-dark-border">
        <Link
          href="/#portfolio"
          className="font-display font-bold text-lg text-zinc-100 hover:text-neon-cyan transition-colors"
        >
          SK
        </Link>
        <button
          onClick={() => router.back()}
          className="text-sm text-zinc-400 hover:text-neon-cyan transition-colors"
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
              <span className="text-neon-cyan text-sm font-mono">{project.year}</span>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded bg-dark-card border border-dark-border text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-zinc-100 mb-6">
              {project.title}
            </h1>
            <p className="text-zinc-400 text-lg mb-10">{project.description}</p>

            {(project.cover && !coverError) ? (
              <div className="rounded-lg overflow-hidden border border-dark-border mb-10 aspect-video bg-dark-card flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.cover}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onError={() => setCoverError(true)}
                />
              </div>
            ) : project.cover ? (
              <div className="rounded-lg border border-dark-border mb-10 aspect-video bg-dark-card flex items-center justify-center">
                <span className="font-display text-6xl text-zinc-600">{project.title.charAt(0)}</span>
              </div>
            ) : null}

            {project.problem && (
              <div className="mb-8">
                <h3 className="font-display text-neon-cyan text-sm uppercase tracking-wider mb-2">
                  {t.project.task}
                </h3>
                <p className="text-zinc-400">{project.problem}</p>
              </div>
            )}
            {project.solution && (
              <div className="mb-8">
                <h3 className="font-display text-neon-pink text-sm uppercase tracking-wider mb-2">
                  {t.project.solution}
                </h3>
                <p className="text-zinc-400">{project.solution}</p>
              </div>
            )}

            {project.videoUrl && (
              <div className="mb-10">
                <h3 className="font-display text-zinc-300 text-sm uppercase tracking-wider mb-4">
                  {t.project.video}
                </h3>
                <div className="aspect-video rounded-lg overflow-hidden border border-dark-border bg-black">
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
                  className="px-5 py-2.5 rounded font-medium text-sm bg-neon-cyan text-dark-bg hover:bg-neon-cyan/90 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.article>
        </div>
      </main>
    </>
  );
}
