import type { Metadata } from 'next'
import { Space_Mono } from 'next/font/google'
import './globals.css'

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '안티프리즈 — 얼어붙지 않는 20대 재무 리포트',
  description:
    '경제적인 어려움 속에서도 20대 청춘의 뜨거움은 얼어붙지 않을거야. 20대를 위한 경제 생활 AI 리포트 서비스.',
  keywords: ['재무', '소비', '저축', '20대', '경제', 'AI 리포트'],
  openGraph: {
    title: '안티프리즈',
    description: '20대를 위한 경제 생활 AI 리포트',
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
      <body className="bg-af-yellow font-mono antialiased">{children}</body>
    </html>
  )
}
