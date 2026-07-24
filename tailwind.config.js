/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
        body: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          DEFAULT: '#0B1020',
          soft: '#1E293B',
          muted: '#475569',
        },
        brand: {
          indigo: '#4F46E5',
          iris: '#6366F1',
          violet: '#8B5CF6',
          purple: '#9333EA',
          cyan: '#06B6D4',
          sky: '#38BDF8',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          off: '#F8FAFC',
          tint: '#F1F5FF',
        },
      },
      backgroundImage: {
        'aurora':
          'radial-gradient(60% 60% at 20% 20%, rgba(99,102,241,0.28) 0%, transparent 60%), radial-gradient(55% 55% at 80% 15%, rgba(56,189,248,0.24) 0%, transparent 55%), radial-gradient(50% 60% at 65% 85%, rgba(147,51,234,0.22) 0%, transparent 60%)',
        'brand-gradient':
          'linear-gradient(135deg, #4F46E5 0%, #6366F1 25%, #8B5CF6 50%, #38BDF8 80%, #06B6D4 100%)',
        'mesh':
          'radial-gradient(at 40% 20%, rgba(99,102,241,0.18) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(56,189,248,0.16) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(147,51,234,0.14) 0px, transparent 50%), radial-gradient(at 80% 100%, rgba(6,182,212,0.14) 0px, transparent 50%)',
        'noise':
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(30, 41, 59, 0.14)',
        glow: '0 20px 70px -20px rgba(99, 102, 241, 0.45)',
        card: '0 1px 2px rgba(15,23,42,0.04), 0 12px 40px -12px rgba(15,23,42,0.12)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem',
      },
      keyframes: {
        'float': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        'blob': {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(30px,-30px) scale(1.1)' },
          '66%': { transform: 'translate(-20px,20px) scale(0.95)' },
        },
        'marquee': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'gradient-x': {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'shimmer': {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        blob: 'blob 18s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
      },
    },
  },
  plugins: [],
};
