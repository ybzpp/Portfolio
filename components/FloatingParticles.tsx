'use client';

const PARTICLES = [
  { left: '10%', top: '20%', size: 4, color: 'var(--neon-cyan)', dur: '8s', delay: '0s' },
  { left: '85%', top: '15%', size: 6, color: 'var(--neon-pink)', dur: '10s', delay: '1s' },
  { left: '25%', top: '70%', size: 3, color: 'var(--neon-cyan)', dur: '12s', delay: '0.5s' },
  { left: '70%', top: '60%', size: 5, color: 'var(--neon-pink)', dur: '9s', delay: '2s' },
  { left: '50%', top: '35%', size: 2, color: 'var(--neon-cyan)', dur: '11s', delay: '0.2s' },
  { left: '15%', top: '85%', size: 4, color: 'var(--neon-pink)', dur: '7s', delay: '1.5s' },
  { left: '90%', top: '80%', size: 3, color: 'var(--neon-cyan)', dur: '13s', delay: '0.8s' },
  { left: '40%', top: '10%', size: 5, color: 'var(--neon-pink)', dur: '9s', delay: '0.3s' },
  { left: '60%', top: '90%', size: 2, color: 'var(--neon-cyan)', dur: '10s', delay: '1.2s' },
  { left: '5%', top: '50%', size: 3, color: 'var(--neon-pink)', dur: '8s', delay: '0.7s' },
  { left: '95%', top: '40%', size: 4, color: 'var(--neon-cyan)', dur: '11s', delay: '1.8s' },
  { left: '30%', top: '5%', size: 2, color: 'var(--neon-pink)', dur: '9s', delay: '0.4s' },
  { left: '75%', top: '95%', size: 5, color: 'var(--neon-cyan)', dur: '10s', delay: '2.2s' },
];

export default function FloatingParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="absolute floating-particle"
          style={{
            left: p.left,
            top: p.top,
            width: Math.max(2, p.size),
            height: Math.max(2, p.size),
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            animationDuration: p.dur,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
