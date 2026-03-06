'use client';

import { useRef, useCallback, useEffect } from 'react';

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function HoloCard({ src, alt, name, title }: { src: string; alt: string; name?: string; title?: string }) {
  const zoneRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const sparkleCanvasRef = useRef<HTMLCanvasElement>(null);

  // Target values (set by mouse), current values (lerped each frame)
  const target = useRef({ x: 0.5, y: 0.5, active: false });
  const current = useRef({ x: 0.5, y: 0.5, s: 1 });
  const frameRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const rawX = (e.clientX - rect.left) / rect.width;
    const rawY = (e.clientY - rect.top) / rect.height;
    target.current.x = Math.max(0.02, Math.min(0.98, rawX));
    target.current.y = Math.max(0.02, Math.min(0.98, rawY));
    target.current.active = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    target.current.active = false;
  }, []);

  // Smooth animation loop — lerps current toward target
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    let running = true;

    const tick = () => {
      if (!running) return;
      const t = target.current;
      const c = current.current;
      const ease = 0.08;

      const goalX = t.active ? t.x : 0.5;
      const goalY = t.active ? t.y : 0.5;
      const goalS = t.active ? 1.04 : 1;

      c.x = lerp(c.x, goalX, ease);
      c.y = lerp(c.y, goalY, ease);
      c.s = lerp(c.s, goalS, ease);

      const rx = (0.5 - c.y) * 28;
      const ry = (c.x - 0.5) * 28;
      const angle = Math.atan2(c.y - 0.5, c.x - 0.5) * (180 / Math.PI) + 180;

      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${c.s})`;
      card.style.setProperty('--mx', `${c.x * 100}%`);
      card.style.setProperty('--my', `${c.y * 100}%`);
      card.style.setProperty('--angle', `${angle}deg`);

      frameRef.current = requestAnimationFrame(tick);
    };

    tick();
    return () => {
      running = false;
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  // Sparkle canvas
  useEffect(() => {
    const canvas = sparkleCanvasRef.current;
    const card = cardRef.current;
    if (!canvas || !card) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = card.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const w = () => canvas.width / Math.min(window.devicePixelRatio || 1, 2);
    const h = () => canvas.height / Math.min(window.devicePixelRatio || 1, 2);

    const sparkles: { x: number; y: number; size: number; speed: number; hue: number; life: number; maxLife: number }[] = [];
    for (let i = 0; i < 50; i++) {
      sparkles.push({
        x: Math.random() * w(),
        y: Math.random() * h(),
        size: Math.random() * 2.5 + 0.5,
        speed: Math.random() * 0.5 + 0.2,
        hue: Math.random() * 360,
        life: Math.random() * 100,
        maxLife: 80 + Math.random() * 60,
      });
    }

    let running = true;
    const rafId = { current: 0 };
    const draw = () => {
      if (!running) return;
      const cw = w();
      const ch = h();
      ctx.clearRect(0, 0, cw, ch);

      for (const s of sparkles) {
        s.life += s.speed;
        if (s.life > s.maxLife) {
          s.life = 0;
          s.x = Math.random() * cw;
          s.y = Math.random() * ch;
          s.hue = Math.random() * 360;
        }
        const progress = s.life / s.maxLife;
        const alpha = progress < 0.5 ? progress * 2 : (1 - progress) * 2;

        ctx.save();
        ctx.globalAlpha = alpha * 0.9;
        ctx.fillStyle = `hsl(${s.hue}, 100%, 80%)`;
        ctx.shadowColor = `hsl(${s.hue}, 100%, 70%)`;
        ctx.shadowBlur = 6;

        const cx = s.x, cy = s.y, r = s.size;
        ctx.beginPath();
        for (let j = 0; j < 4; j++) {
          const a = (j * Math.PI) / 2;
          const ox = cx + Math.cos(a) * r * 2;
          const oy = cy + Math.sin(a) * r * 2;
          const ia = a + Math.PI / 4;
          const ix = cx + Math.cos(ia) * r * 0.5;
          const iy = cy + Math.sin(ia) * r * 0.5;
          if (j === 0) ctx.moveTo(ox, oy);
          else ctx.lineTo(ox, oy);
          ctx.lineTo(ix, iy);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
      rafId.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      running = false;
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div
      ref={zoneRef}
      className="holo-card__zone"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className="holo-card"
      >
        <div className="holo-card__inner">
          <div className="holo-card__frame">
            <div className="holo-card__photo-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={alt} className="holo-card__img" loading="lazy" />
            </div>

            {name && (
              <div className="holo-card__nameplate">
                <span className="holo-card__name">{name}</span>
                {title && <span className="holo-card__title">{title}</span>}
              </div>
            )}

            <div className="holo-card__rarity">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="holo-card__star" style={{ animationDelay: `${i * 0.15}s` }}>&#9733;</span>
              ))}
            </div>
          </div>

          <div className="holo-card__holo" />
          <div className="holo-card__shine" />
          <div className="holo-card__glare" />
          <canvas ref={sparkleCanvasRef} className="holo-card__sparkle-canvas" />
          <div className="holo-card__edge-glow" />
        </div>
      </div>
    </div>
  );
}
