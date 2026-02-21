import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: 'var(--bg, #0a0a12)',
          card: 'var(--card, #0f0f1a)',
          border: 'var(--border, #2a2a4a)',
        },
        neon: {
          pink: 'var(--neon-pink)',
          cyan: 'var(--neon-cyan)',
          green: 'var(--neon-green)',
          purple: 'var(--neon-purple)',
          yellow: 'var(--neon-yellow)',
        },
      },
      fontFamily: {
        display: ['var(--font-pixel)', 'monospace'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      borderWidth: {
        'pixel': '3px',
        'pixel-lg': '4px',
      },
      borderRadius: {
        'pixel': '0',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(color-mix(in srgb, var(--neon-cyan) 8%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--neon-cyan) 8%, transparent) 1px, transparent 1px)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      backgroundSize: {
        grid: '16px 16px',
      },
      boxShadow: {
        'pixel': '4px 4px 0 var(--card-border, #1e1e3f)',
        'pixel-cyan': '4px 4px 0 color-mix(in srgb, var(--neon-cyan) 40%, transparent)',
        'pixel-pink': '4px 4px 0 color-mix(in srgb, var(--neon-pink) 40%, transparent)',
        'neon-pink': '0 0 20px color-mix(in srgb, var(--neon-pink) 40%, transparent), 0 0 40px color-mix(in srgb, var(--neon-pink) 20%, transparent)',
        'neon-cyan': '0 0 20px color-mix(in srgb, var(--neon-cyan) 40%, transparent), 0 0 40px color-mix(in srgb, var(--neon-cyan) 20%, transparent)',
        'neon-green': '0 0 20px color-mix(in srgb, var(--neon-green) 40%, transparent)',
      },
    },
  },
  plugins: [],
};

export default config;
