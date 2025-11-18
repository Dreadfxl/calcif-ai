import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brutalist Palette
        concrete: {
          DEFAULT: '#2B2D2F',
          dark: '#1A1A1A',
          light: '#3A3C3E',
        },
        chrome: {
          DEFAULT: '#C0C0C0',
          light: '#E8E8E8',
          dark: '#A0A0A0',
        },
        cyber: {
          blue: '#00FFFF',
          green: '#00FF41',
          pink: '#FF10F0',
          purple: '#8B00FF',
          yellow: '#DFFF00',
        },
        matrix: {
          green: '#00FF41',
        },
        warning: '#FF6B00',
        deep: '#0A0A0A',
        steel: '#4682B4',
      },
      fontFamily: {
        header: ['Archivo Black', 'Roboto Condensed', 'sans-serif'],
        mono: ['IBM Plex Mono', 'Courier New', 'monospace'],
        accent: ['Orbitron', 'Audiowide', 'sans-serif'],
      },
      fontSize: {
        'brutalist-h1': ['4rem', { lineHeight: '1.2', fontWeight: '900', letterSpacing: '0.15em' }],
        'brutalist-h2': ['3rem', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '0.1em' }],
        'brutalist-h3': ['2rem', { lineHeight: '1.3', fontWeight: '700', letterSpacing: '0.08em' }],
        'brutalist-body': ['1rem', { lineHeight: '1.4', letterSpacing: '0.02em' }],
      },
      spacing: {
        'brutalist-xs': '4px',
        'brutalist-sm': '8px',
        'brutalist-md': '16px',
        'brutalist-lg': '24px',
        'brutalist-xl': '48px',
        'brutalist-xxl': '72px',
      },
      borderWidth: {
        'brutalist-thin': '2px',
        'brutalist-medium': '4px',
        'brutalist-thick': '6px',
        'brutalist-ultra': '8px',
      },
      boxShadow: {
        'brutalist-card': '8px 8px 0px rgba(0, 0, 0, 1)',
        'brutalist-button': '4px 4px 0px rgba(0, 0, 0, 0.8)',
        'brutalist-elevated': '12px 12px 0px rgba(0, 0, 0, 1)',
        'neon-blue': '0 0 20px #00FFFF, 0 0 40px #0080FF',
        'neon-green': '0 0 20px #00FF41, 0 0 40px #00AA2B',
        'neon-pink': '0 0 20px #FF10F0, 0 0 40px #AA0BA0',
      },
      animation: {
        'glitch': 'glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
        'matrix-rain': 'matrix-rain 20s linear infinite',
        'slide-in-right': 'slide-in-right 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
        'particle-burst': 'particle-burst 0.5s ease-out forwards',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        'neon-pulse': {
          '0%, 100%': { opacity: '1', filter: 'brightness(1)' },
          '50%': { opacity: '0.8', filter: 'brightness(1.5)' },
        },
        'matrix-rain': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'particle-burst': {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
      },
      backgroundImage: {
        'concrete-texture': `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,.05) 2px, rgba(0,0,0,.05) 4px),
                            repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,.05) 2px, rgba(0,0,0,.05) 4px)`,
        'chrome-gradient': 'linear-gradient(180deg, #E8E8E8 0%, #A0A0A0 50%, #C0C0C0 100%)',
      },
    },
  },
  plugins: [],
}

export default config
