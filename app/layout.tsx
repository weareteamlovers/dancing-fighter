import type { Metadata } from 'next'
import { Space_Mono } from 'next/font/google'
import './globals.css'
import ThemeApplier from '@/components/ThemeApplier'
import ThemeToggle from '@/components/ThemeToggle'

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '안티프리즈 — 얼어붙지 않는 20대 자산 설계 AI',
  description:
    '경제적인 어려움 속에서도 20대 청춘의 뜨거움은 얼어붙지 않을거야. 12가지 질문으로 만드는 나만의 자산 생활 설계도.',
  keywords: ['재무', '자산', '저축', '20대', '경제', 'AI 리포트'],
  openGraph: {
    title: '안티프리즈',
    description: '20대를 위한 자산 생활 설계 AI',
    url: 'https://dancingfighter.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={spaceMono.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DotGothic16&family=Noto+Sans+KR:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-af-yellow antialiased">
        <ThemeApplier />
        {children}
        <ThemeToggle />
      </body>
    </html>
  )
}
