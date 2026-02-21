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
          bg: '#0a0a0f',
          card: '#12121a',
          border: '#1e1e2e',
        },
        neon: {
          pink: '#ff2a6d',
          cyan: '#05d9e8',
          green: '#00ff9f',
          purple: '#9d4edd',
        },
      },
      fontFamily: {
        display: ['var(--font-orbitron)', 'monospace'],
        body: ['var(--font-rajdhani)', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(5, 217, 232, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(5, 217, 232, 0.03) 1px, transparent 1px)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      backgroundSize: {
        grid: '60px 60px',
      },
      boxShadow: {
        'neon-pink': '0 0 20px rgba(255, 42, 109, 0.4), 0 0 40px rgba(255, 42, 109, 0.2)',
        'neon-cyan': '0 0 20px rgba(5, 217, 232, 0.4), 0 0 40px rgba(5, 217, 232, 0.2)',
        'neon-green': '0 0 20px rgba(0, 255, 159, 0.4)',
      },
    },
  },
  plugins: [],
};

export default config;
