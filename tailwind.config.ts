import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'af-yellow': 'rgb(var(--af-yellow) / <alpha-value>)',
        'af-yellow-hover': 'rgb(var(--af-yellow-hover) / <alpha-value>)',
        'af-red': 'rgb(var(--af-red) / <alpha-value>)',
        'af-border': 'rgb(var(--af-border) / <alpha-value>)',
        'af-hero-text': 'rgb(var(--af-hero-text) / <alpha-value>)',
      },
      fontFamily: {
        dot: ['DotGothic16', 'Noto Sans KR', 'sans-serif'],
        mono: ['"Space Mono"', 'Noto Sans KR', 'monospace'],
      },
      textShadow: {
        hero: '0px 0px 4px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
}
export default config
