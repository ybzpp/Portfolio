'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '@/lib/LanguageContext';

export type Playable = { slug: string; title: string; entry: string };

export default function PlayablePlayer({ playable, onClose }: { playable: Playable; onClose: () => void }) {
  const { t } = useLanguage();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [generation, setGeneration] = useState(0);
  const [ready, setReady] = useState(false);
  const [slow, setSlow] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [canFullscreen, setCanFullscreen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    const content = contentRef.current;
    if (!dialog) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    closeRef.current?.focus();
    setCanFullscreen(document.fullscreenEnabled);
    const updateFullscreen = () => setFullscreen(document.fullscreenElement === content);
    document.addEventListener('fullscreenchange', updateFullscreen);
    return () => {
      document.removeEventListener('fullscreenchange', updateFullscreen);
      if (document.fullscreenElement === content) void document.exitFullscreen().catch(() => {});
      dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);

  useEffect(() => {
    setReady(false);
    setSlow(false);
    const timer = window.setTimeout(() => setSlow(true), 20000);
    const onMessage = (event: MessageEvent) => {
      if (event.source !== iframeRef.current?.contentWindow) return;
      if (event.data?.type === 'portfolio:playable-ready') {
        setReady(true);
        window.clearTimeout(timer);
      }
      if (event.data?.type === 'portfolio:playable-close') onClose();
    };
    window.addEventListener('message', onMessage);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('message', onMessage);
    };
  }, [generation, onClose]);

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await contentRef.current?.requestFullscreen();
    } catch {
      setCanFullscreen(false);
    }
  };

  return createPortal(
    <dialog ref={dialogRef} className="playable-player" aria-labelledby="playable-player-title" onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div ref={contentRef} className="playable-player__content">
        <header className="playable-player__toolbar">
          <div className="min-w-0">
            <p className="font-display text-[8px] text-neon-cyan mb-2">PLAYABLE ADS</p>
            <h2 id="playable-player-title" className="font-body font-semibold text-zinc-100 truncate">{playable.title}</h2>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden md:inline font-body text-xs text-zinc-500 mr-2">{t.playables.escape}</span>
            <button type="button" onClick={() => setGeneration((value) => value + 1)} className="player-control" aria-label={t.playables.restart} title={t.playables.restart}>↻</button>
            {canFullscreen && <button type="button" onClick={() => void toggleFullscreen()} className="player-control player-control--fullscreen" aria-label={fullscreen ? t.playables.exitFullscreen : t.playables.fullscreen} title={fullscreen ? t.playables.exitFullscreen : t.playables.fullscreen}>⛶</button>}
            <button ref={closeRef} type="button" onClick={onClose} className="player-control player-control--close" aria-label={t.playables.close} title={t.playables.close}>×</button>
          </div>
        </header>
        <div className="playable-player__stage">
          {!ready && <p role="status" className="absolute z-10 top-4 left-1/2 -translate-x-1/2 max-w-[90%] text-center text-sm px-4 py-2 bg-dark-card/90 border border-dark-border text-zinc-300 pointer-events-none">{slow ? t.playables.slow : t.playables.loading}</p>}
          <iframe ref={iframeRef} key={generation} src={playable.entry} title={playable.title} className="playable-player__frame" sandbox="allow-scripts allow-same-origin" allow="autoplay; fullscreen" allowFullScreen />
        </div>
      </div>
    </dialog>,
    document.body
  );
}
