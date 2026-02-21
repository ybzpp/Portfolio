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
          pink: '#ff2a6d',
          cyan: '#00f5ff',
          green: '#39ff14',
          purple: '#bf5fff',
          yellow: '#ffeb3b',
        },
      },
      fontFamily: {
        display: ['var(--font-pixel)', 'monospace'],
        body: ['var(--font-vt323)', 'monospace'],
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
        'grid-pattern': 'linear-gradient(rgba(0, 245, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 245, 255, 0.08) 1px, transparent 1px)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      backgroundSize: {
        grid: '16px 16px',
      },
      boxShadow: {
        'pixel': '4px 4px 0 var(--card-border, #1e1e3f)',
        'pixel-cyan': '4px 4px 0 rgba(0, 245, 255, 0.4)',
        'pixel-pink': '4px 4px 0 rgba(255, 42, 109, 0.4)',
        'neon-pink': '0 0 20px rgba(255, 42, 109, 0.4), 0 0 40px rgba(255, 42, 109, 0.2)',
        'neon-cyan': '0 0 20px rgba(0, 245, 255, 0.4), 0 0 40px rgba(0, 245, 255, 0.2)',
        'neon-green': '0 0 20px rgba(57, 255, 20, 0.4)',
      },
    },
  },
  plugins: [],
};

export default config;
