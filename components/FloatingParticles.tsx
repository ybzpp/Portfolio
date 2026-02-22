'use client';

import { motion } from 'framer-motion';

const PARTICLES = [
  { left: '10%', top: '20%', size: 4, color: 'var(--neon-cyan)', duration: 8, delay: 0 },
  { left: '85%', top: '15%', size: 6, color: 'var(--neon-pink)', duration: 10, delay: 1 },
  { left: '25%', top: '70%', size: 3, color: 'var(--neon-cyan)', duration: 12, delay: 0.5 },
  { left: '70%', top: '60%', size: 5, color: 'var(--neon-pink)', duration: 9, delay: 2 },
  { left: '50%', top: '35%', size: 2, color: 'var(--neon-cyan)', duration: 11, delay: 0.2 },
  { left: '15%', top: '85%', size: 4, color: 'var(--neon-pink)', duration: 7, delay: 1.5 },
  { left: '90%', top: '80%', size: 3, color: 'var(--neon-cyan)', duration: 13, delay: 0.8 },
  { left: '40%', top: '10%', size: 5, color: 'var(--neon-pink)', duration: 9, delay: 0.3 },
  { left: '60%', top: '90%', size: 2, color: 'var(--neon-cyan)', duration: 10, delay: 1.2 },
  { left: '5%', top: '50%', size: 3, color: 'var(--neon-pink)', duration: 8, delay: 0.7 },
  { left: '95%', top: '40%', size: 4, color: 'var(--neon-cyan)', duration: 11, delay: 1.8 },
  { left: '30%', top: '5%', size: 2, color: 'var(--neon-pink)', duration: 9, delay: 0.4 },
  { left: '75%', top: '95%', size: 5, color: 'var(--neon-cyan)', duration: 10, delay: 2.2 },
];

export default function FloatingParticles() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden
    >
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-none"
          style={{
            left: p.left,
            top: p.top,
            width: Math.max(2, p.size),
            height: Math.max(2, p.size),
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
          animate={{
            y: [0, -16, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
