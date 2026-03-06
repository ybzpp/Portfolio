'use client';

import { useRef, useCallback, useEffect, useState } from 'react';

export default function HoloCard({ src, alt, name, title }: { src: string; alt: string; name?: string; title?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const sparkleCanvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const [vars, setVars] = useState({
    '--mx': '50%',
    '--my': '50%',
    '--angle': '0deg',
    '--rx': '0deg',
    '--ry': '0deg',
    '--s': '1',
    '--hyp': '0',
  });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 35;
    const rotateX = (0.5 - y) * 35;
    const angle = Math.atan2(y - 0.5, x - 0.5) * (180 / Math.PI) + 180;
    const hyp = Math.sqrt((x - 0.5) ** 2 + (y - 0.5) ** 2);

    setVars({
      '--mx': `${x * 100}%`,
      '--my': `${y * 100}%`,
      '--angle': `${angle}deg`,
      '--rx': `${rotateX}deg`,
      '--ry': `${rotateY}deg`,
      '--s': '1.06',
      '--hyp': `${hyp}`,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setVars({
      '--mx': '50%',
      '--my': '50%',
      '--angle': '0deg',
      '--rx': '0deg',
      '--ry': '0deg',
      '--s': '1',
      '--hyp': '0',
    });
  }, []);

  // Sparkle particles on canvas
  useEffect(() => {
    const canvas = sparkleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 560;

    const sparkles: { x: number; y: number; size: number; speed: number; hue: number; life: number; maxLife: number }[] = [];

    for (let i = 0; i < 60; i++) {
      sparkles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 0.5,
        speed: Math.random() * 0.5 + 0.2,
        hue: Math.random() * 360,
        life: Math.random() * 100,
        maxLife: 80 + Math.random() * 60,
      });
    }

    let running = true;
    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const s of sparkles) {
        s.life += s.speed;
        if (s.life > s.maxLife) {
          s.life = 0;
          s.x = Math.random() * canvas.width;
          s.y = Math.random() * canvas.height;
          s.hue = Math.random() * 360;
        }

        const progress = s.life / s.maxLife;
        const alpha = progress < 0.5
          ? progress * 2
          : (1 - progress) * 2;

        ctx.save();
        ctx.globalAlpha = alpha * 0.9;
        ctx.fillStyle = `hsl(${s.hue}, 100%, 80%)`;
        ctx.shadowColor = `hsl(${s.hue}, 100%, 70%)`;
        ctx.shadowBlur = 6;

        // Draw a 4-point star
        const cx = s.x;
        const cy = s.y;
        const r = s.size;
        ctx.beginPath();
        for (let i = 0; i < 4; i++) {
          const a = (i * Math.PI) / 2;
          const outerX = cx + Math.cos(a) * r * 2;
          const outerY = cy + Math.sin(a) * r * 2;
          const innerA = a + Math.PI / 4;
          const innerX = cx + Math.cos(innerA) * r * 0.5;
          const innerY = cy + Math.sin(innerA) * r * 0.5;
          if (i === 0) ctx.moveTo(outerX, outerY);
          else ctx.lineTo(outerX, outerY);
          ctx.lineTo(innerX, innerY);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="holo-card"
      style={vars as unknown as React.CSSProperties}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="holo-card__inner">
        {/* Border frame */}
        <div className="holo-card__frame">
          {/* Photo */}
          <div className="holo-card__photo-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={alt} className="holo-card__img" />
          </div>

          {/* Name plate */}
          {name && (
            <div className="holo-card__nameplate">
              <span className="holo-card__name">{name}</span>
              {title && <span className="holo-card__title">{title}</span>}
            </div>
          )}

          {/* Rarity stars */}
          <div className="holo-card__rarity">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="holo-card__star" style={{ animationDelay: `${i * 0.15}s` }}>&#9733;</span>
            ))}
          </div>
        </div>

        {/* Overlay effects */}
        <div className="holo-card__holo" />
        <div className="holo-card__shine" />
        <div className="holo-card__glare" />
        <canvas ref={sparkleCanvasRef} className="holo-card__sparkle-canvas" />
        <div className="holo-card__edge-glow" />
      </div>
    </div>
  );
}
