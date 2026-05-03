'use client'

import { useEffect, useState } from 'react'

export default function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const now = new Date()
  const month = now.getMonth() + 1
  const year = now.getFullYear()

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToInput = () => {
    document.getElementById('input-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="min-h-screen border-b-2 border-af-border flex flex-col">
      {/* Nav */}
      <nav className="border-b border-af-border px-6 md:px-12 py-4 flex items-center justify-between">
        <span className="font-mono font-bold text-af-red text-sm tracking-tight">
          ANTIFREEZE / 안티프리즈
        </span>
        <span className="font-mono text-af-red/60 text-xs tracking-tight">
          {mounted ? `${year}.${String(month).padStart(2, '0')} REPORT` : ''}
        </span>
      </nav>

      {/* Hero main */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2">
        {/* Left — headline */}
        <div className="border-b lg:border-b-0 lg:border-r border-af-border p-8 md:p-12 lg:p-16 flex flex-col justify-between">
          <div>
            <div className="font-mono text-xs text-af-red/50 tracking-tight mb-8 md:mb-16">
              #01 &nbsp;/&nbsp; HERO
            </div>
            <h1 className="font-mono font-bold text-af-red leading-tight tracking-tight">
              <span className="block text-3xl md:text-4xl xl:text-5xl mb-2">
                경제적인 어려움 속에서도
              </span>
              <span className="block text-3xl md:text-4xl xl:text-5xl mb-2">
                20대 청춘의 뜨거움은
              </span>
              <span className="block text-4xl md:text-5xl xl:text-6xl border-b-4 border-af-border pb-4">
                얼어붙지 않을거야.
              </span>
            </h1>
          </div>

          <div className="mt-10 md:mt-0">
            <p className="font-mono text-af-red/70 text-sm tracking-tight leading-relaxed mb-6">
              지난 달의 실수를 반복하지 않도록.
              <br />
              예상 못한 지출과 과소비 패턴을 추적하고
              <br />
              다음 달을 더 잘 살아갈 수 있게.
            </p>
            <button
              onClick={scrollToInput}
              className="group font-mono font-bold text-af-red text-sm border-b-2 border-af-red pb-1 hover:text-af-border hover:border-af-border transition-colors tracking-tight"
            >
              지금 시작하기
              <span className="inline-block ml-2 group-hover:translate-y-0.5 transition-transform">↓</span>
            </button>
          </div>
        </div>

        {/* Right — info panels */}
        <div className="flex flex-col">
          {/* Top info */}
          <div className="border-b border-af-border p-8 md:p-12 flex-1 flex flex-col justify-center">
            <div className="font-mono text-xs text-af-red/50 tracking-tight mb-4">
              서비스 소개
            </div>
            <div className="space-y-4">
              {[
                { num: '01', text: '매달 월초, 지난 달 재무 데이터 기반 AI 리포트 생성' },
                { num: '02', text: '과소비·예상외 지출 패턴 분석 및 개선 포인트 제안' },
                { num: '03', text: '다음 달 예상 자산 시뮬레이션' },
              ].map(({ num, text }) => (
                <div key={num} className="flex gap-4">
                  <span className="font-mono text-af-red/40 text-xs shrink-0 mt-0.5">{num}</span>
                  <p className="font-mono text-af-red text-sm tracking-tight leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom — weekly notice */}
          <div className="p-8 md:p-12 bg-af-red flex flex-col justify-center">
            <div className="font-mono text-af-yellow/60 text-xs tracking-tight mb-3">
              매주 일요일 저녁 알림
            </div>
            <p className="font-mono font-bold text-af-yellow text-sm md:text-base tracking-tight leading-relaxed">
              "이번 주 예정에 없던 지출을 입력해주세요."
            </p>
            <p className="font-mono text-af-yellow/70 text-xs tracking-tight mt-2 leading-relaxed">
              → 다음 달 월초 리포트에 개선할 점으로 자동 반영됩니다.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="border-t border-af-border px-6 md:px-12 py-4 flex items-center justify-center">
        <button
          onClick={scrollToInput}
          className="font-mono text-xs text-af-red/50 tracking-tight hover:text-af-red transition-colors flex items-center gap-2"
        >
          <span>스크롤해서 정보 입력하기</span>
          <span className="animate-bounce inline-block">↓</span>
        </button>
      </div>
    </section>
  )
}
