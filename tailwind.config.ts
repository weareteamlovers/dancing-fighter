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
        'af-yellow': '#FFFF77',
        'af-yellow-hover': '#FFDF4E',
        'af-red': '#8E1606',
        'af-border': '#CA1E08',
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
