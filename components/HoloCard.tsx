'use client';

import { useRef, useState, useCallback } from 'react';

export default function HoloCard({ src, alt }: { src: string; alt: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({
    transform: 'perspective(800px) rotateX(0deg) rotateY(0deg)',
    '--mouse-x': '50%',
    '--mouse-y': '50%',
    '--angle': '0deg',
  });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 30;
    const rotateX = (0.5 - y) * 30;
    const angle = Math.atan2(y - 0.5, x - 0.5) * (180 / Math.PI) + 180;

    setStyle({
      transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`,
      '--mouse-x': `${x * 100}%`,
      '--mouse-y': `${y * 100}%`,
      '--angle': `${angle}deg`,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)',
      '--mouse-x': '50%',
      '--mouse-y': '50%',
      '--angle': '0deg',
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className="holo-card aspect-square max-w-sm"
      style={style as React.CSSProperties}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="holo-card__inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="holo-card__img" />
        <div className="holo-card__shine" />
        <div className="holo-card__glare" />
        <div className="holo-card__sparkles" />
      </div>
    </div>
  );
}
