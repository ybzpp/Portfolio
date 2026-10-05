'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const RetroContext = createContext<{ enabled: boolean; toggle: () => void } | null>(null);

// Ported from 035.soda_dungeon_3/web/public/shared/millennium.js and post-effects.js.
// Keep the original default intensity: CRT 42%, bloom 32%, saturation 118%.
const crt = 0.42;
const bloom = 0.32;

export function RetroGlass() {
  return <div className="crt-glass" aria-hidden="true"><div className="crt-noise" /></div>;
}

export function RetroDisplayProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(true);
  const [width, setWidth] = useState(960);
  const scale = Math.max(0.5, Math.min(2, width / 960));
  const offset = 0.8 * crt * scale;
  const blur = (2.5 + 1.5 * bloom) * scale;

  useEffect(() => {
    try { setEnabled(localStorage.getItem('portfolio-crt') !== 'off'); } catch {}
    const resize = () => setWidth(window.innerWidth);
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.crt = enabled ? 'on' : 'off';
  }, [enabled]);

  const toggle = useCallback(() => {
    const next = !enabled;
    setEnabled(next);
    try { localStorage.setItem('portfolio-crt', next ? 'on' : 'off'); } catch {}
  }, [enabled]);

  return (
    <RetroContext.Provider value={{ enabled, toggle }}>
      <svg className="crt-filter-defs" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="portfolio-crt" x="-3%" y="-3%" width="106%" height="106%" colorInterpolationFilters="sRGB">
            <feColorMatrix type="saturate" values="1.18" result="color" />
            <feColorMatrix in="color" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red" />
            <feOffset in="red" dx={offset} result="r" />
            <feColorMatrix in="color" values="0 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" result="cyan" />
            <feOffset in="cyan" dx={-0.6 * offset} result="c" />
            <feBlend in="r" in2="c" mode="screen" result="rgb" />
            <feColorMatrix in="rgb" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  .2126 .7152 .0722 0 -.62" result="luminance" />
            <feComponentTransfer in="luminance" result="highlightMask"><feFuncA type="linear" slope="2.64" /></feComponentTransfer>
            <feComposite in="rgb" in2="highlightMask" operator="in" result="highlights" />
            <feGaussianBlur in="highlights" stdDeviation={blur} result="glow" />
            <feComponentTransfer in="glow" result="dimGlow">
              <feFuncR type="linear" slope={0.5 * bloom} />
              <feFuncG type="linear" slope={0.5 * bloom} />
              <feFuncB type="linear" slope={0.5 * bloom} />
            </feComponentTransfer>
            <feBlend in="rgb" in2="dimGlow" mode="screen" />
          </filter>
        </defs>
      </svg>
      {children}
      <RetroGlass />
    </RetroContext.Provider>
  );
}

export function useRetroDisplay() {
  const context = useContext(RetroContext);
  if (!context) throw new Error('useRetroDisplay must be used within RetroDisplayProvider');
  return context;
}
