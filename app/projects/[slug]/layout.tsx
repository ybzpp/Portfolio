import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import projects from '@/data/projects.json';

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) notFound();
  return {
    title: `${project.title} — Sergey Korolev`,
    description: project.description,
    openGraph: { title: project.title, description: project.description, images: [project.cover] },
  };
}

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return children;
}
