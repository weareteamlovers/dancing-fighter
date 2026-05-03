'use client'

import { useEffect, useState, useRef } from 'react'
import { useFormStore } from '@/store/useFormStore'
import { useRouter } from 'next/navigation'
import { parseReport } from '@/lib/openai'

export default function ReportDisplay() {
  const router = useRouter()
  const { formData } = useFormStore()
  const [rawReport, setRawReport] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const now = new Date()

  useEffect(() => {
    const hasData = formData.income || Object.values(formData.expenses).some(Boolean)
    if (!hasData) {
      router.replace('/')
      return
    }

    const fetchReport = async () => {
      try {
        const res = await fetch('/api/report', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ formData }),
        })
        if (!res.ok) throw new Error('리포트 생성에 실패했습니다.')
        const reader = res.body?.getReader()
        if (!reader) throw new Error('스트림을 읽을 수 없습니다.')
        const decoder = new TextDecoder()
        setLoading(false)
        let buffer = ''
        while (true) {
          const { done: isDone, value } = await reader.read()
          if (isDone) break
          buffer += decoder.decode(value, { stream: true })
          setRawReport(buffer)
        }
        setDone(true)
      } catch (err) {
        setError(err instanceof Error ? err.message : '오류가 발생했습니다.')
        setLoading(false)
      }
    }
    fetchReport()
  }, [])

  const month = now.getMonth() + 1
  const year = now.getFullYear()
  const parsed = done ? parseReport(rawReport) : null

  return (
    <div className="min-h-screen bg-af-yellow">
      {/* Nav */}
      <nav className="border-b border-af-border px-8 md:px-16 py-3 flex items-center justify-between">
        <button
          onClick={() => router.push('/')}
          className="font-mono font-bold text-af-red text-xs tracking-tight hover:text-af-border transition-colors uppercase"
        >
          ANTIFREEZE / 안티프리즈
        </button>
        <span className="font-mono text-af-red/60 text-xs tracking-tight">
          {year}.{String(month).padStart(2, '0')} AI REPORT
        </span>
      </nav>

      {/* Loading */}
      {(loading || (!done && !error)) && (
        <div className="px-8 md:px-16 py-20 flex flex-col gap-4">
          <p className="font-mono text-af-red text-sm tracking-tight animate-pulse">
            AI 리포트 생성 중...
          </p>
          {[80, 65, 90, 55, 72].map((w, i) => (
            <div
              key={i}
              className="h-3 bg-af-border/20 animate-pulse"
              style={{ width: `${w}%`, animationDelay: `${i * 0.12}s` }}
            />
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="px-8 md:px-16 py-16 border border-af-border m-8">
          <p className="font-mono text-af-red text-sm tracking-tight">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 font-mono text-xs text-af-red underline hover:no-underline"
          >
            다시 시도
          </button>
        </div>
      )}

      {/* Report body */}
      {done && parsed && (
        <>
          {/* Hero: headline + food image */}
          <div className="border-b-2 border-af-border grid grid-cols-1 lg:grid-cols-2 min-h-[300px] md:min-h-[380px]">
            {/* Left: headline */}
            <div className="border-b lg:border-b-0 lg:border-r border-af-border px-8 md:px-16 py-12 md:py-16 flex flex-col justify-between">
              <div className="font-mono text-xs text-af-red/50 tracking-tight">
                {year}.{String(month).padStart(2, '0')} &nbsp;/&nbsp; AI REPORT
              </div>
              <h1 className="font-mono font-bold text-af-red tracking-tighter leading-tight mt-4 text-3xl md:text-4xl lg:text-5xl">
                {parsed.headline || '이번 달 재무 리포트'}
              </h1>
            </div>

            {/* Right: decorative food image */}
            <div className="relative overflow-hidden flex items-end justify-center bg-af-yellow px-8 py-0 min-h-[220px]">
              <span
                className="text-[180px] md:text-[260px] lg:text-[320px] leading-none select-none"
                style={{ marginBottom: '-16px' }}
              >
                🍲
              </span>
            </div>
          </div>

          {/* Report sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 border-b-2 border-af-border">
            {/* Check Point! */}
            <div className="border-b lg:border-b-0 lg:border-r border-af-border px-8 md:px-16 py-12 md:py-16">
              <h2 className="font-mono italic font-bold text-af-red text-2xl md:text-3xl tracking-tight mb-8">
                Check Point!
              </h2>
              <ul className="space-y-4">
                {parsed.checkPoints.map((point, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="font-mono text-af-border text-sm shrink-0 mt-0.5">—</span>
                    <p className="font-mono text-af-red text-sm tracking-tight leading-relaxed">{point}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Advice! */}
            <div className="px-8 md:px-16 py-12 md:py-16">
              <h2 className="font-mono italic font-bold text-af-red text-2xl md:text-3xl tracking-tight mb-8">
                Advice!
              </h2>
              <ol className="space-y-4">
                {parsed.advice.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="font-mono font-bold text-af-border text-sm shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, '0')}.
                    </span>
                    <p className="font-mono text-af-red text-sm tracking-tight leading-relaxed">{item}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Bottom navigation */}
          <div className="border-b-2 border-af-border grid grid-cols-3 items-center px-8 md:px-16 py-6">
            <button
              onClick={() => router.push('/')}
              className="group flex items-center gap-2 font-mono text-xs text-af-red hover:text-af-border tracking-tight transition-colors justify-start"
            >
              <span className="text-xl group-hover:-translate-x-1 transition-transform inline-block">←</span>
              <span>수정하기</span>
            </button>

            <div className="flex items-center justify-center gap-2 md:gap-3">
              {['🍅', '🧅', '🌽', '🥦', '🥕'].map((v) => (
                <span key={v} className="text-xl md:text-2xl select-none">{v}</span>
              ))}
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-af-red/40 tracking-tight justify-end">
              <span>다음 달에 또 만나요</span>
              <span className="text-xl">→</span>
            </div>
          </div>

          {/* Share section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-af-border min-h-[240px]">
            {/* Left: large decorative image */}
            <div className="border-b lg:border-b-0 lg:border-r border-af-border relative overflow-hidden flex items-end justify-center min-h-[180px]">
              <span
                className="text-[160px] md:text-[220px] leading-none select-none"
                style={{ marginBottom: '-16px' }}
              >
                🍄
              </span>
            </div>

            {/* Right: share text */}
            <div className="px-8 md:px-16 py-12 md:py-16 flex flex-col justify-center gap-3">
              <p className="font-mono text-af-red/50 text-xs tracking-tight">SHARE</p>
              <h3 className="font-mono font-bold text-af-red text-2xl md:text-3xl tracking-tighter leading-tight">
                리포트 공유하기
              </h3>
              <button className="self-start font-mono font-bold text-af-red text-xl md:text-2xl tracking-tight hover:text-af-border transition-colors italic">
                Instagram
              </button>
              <button className="self-start font-mono text-af-red text-sm tracking-tight border-b border-af-border pb-0.5 hover:text-af-border transition-colors">
                사진으로 저장
              </button>
            </div>
          </div>

          {/* Footer */}
          <footer className="px-8 md:px-16 py-6 flex items-center justify-between border-t border-af-border">
            <span className="font-mono text-xs text-af-red/40 tracking-tight">ANTIFREEZE © {year}</span>
            <span className="font-mono text-xs text-af-red/40 tracking-tight">dancingfighter.com</span>
          </footer>
        </>
      )}
    </div>
  )
}
