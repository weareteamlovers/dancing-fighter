'use client'

import { useEffect, useState, useRef } from 'react'
import { useFormStore } from '@/store/useFormStore'
import { useRouter } from 'next/navigation'

function parseMarkdown(text: string): string {
  return text
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[h|u|l])/gm, '')
}

export default function ReportDisplay() {
  const router = useRouter()
  const { formData } = useFormStore()
  const [report, setReport] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const now = new Date()

  useEffect(() => {
    // Redirect if no data
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

        while (true) {
          const { done: isDone, value } = await reader.read()
          if (isDone) break
          const chunk = decoder.decode(value, { stream: true })
          setReport((prev) => prev + chunk)
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

  return (
    <div className="min-h-screen bg-af-yellow">
      {/* Header */}
      <nav className="border-b-2 border-af-border px-6 md:px-12 py-4 flex items-center justify-between">
        <button
          onClick={() => router.push('/')}
          className="font-mono text-af-red text-sm tracking-tight hover:text-af-border transition-colors"
        >
          ← 안티프리즈
        </button>
        <span className="font-mono text-af-red/60 text-xs tracking-tight">
          {year}.{String(month).padStart(2, '0')} AI REPORT
        </span>
      </nav>

      {/* Report hero */}
      <div className="border-b-2 border-af-border grid grid-cols-1 md:grid-cols-3">
        <div className="md:col-span-2 border-b md:border-b-0 md:border-r border-af-border p-8 md:p-12 lg:p-16">
          <div className="font-mono text-xs text-af-red/50 tracking-tight mb-6">#04 &nbsp;/&nbsp; REPORT</div>
          <h1 className="font-mono font-bold text-af-red text-3xl md:text-4xl xl:text-5xl tracking-tight leading-tight">
            이번 달<br />재무 리포트
          </h1>
          <p className="mt-4 font-mono text-af-red/70 text-sm tracking-tight">
            입력한 정보를 바탕으로 AI가 분석한 결과입니다.
          </p>
        </div>
        <div className="p-8 md:p-12 flex flex-col justify-end">
          <div className="font-mono text-xs text-af-red/40 tracking-tight mb-2">생성일</div>
          <div className="font-mono font-bold text-af-red text-2xl tracking-tight">
            {year}.{String(month).padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* Report content */}
      <div className="px-6 md:px-12 lg:px-16 py-10 md:py-16 max-w-3xl">
        {loading && (
          <div className="space-y-3">
            <div className="font-mono text-af-red text-sm tracking-tight animate-pulse">
              AI 리포트 생성 중...
            </div>
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-4 bg-af-border/20 rounded animate-pulse"
                style={{ width: `${70 + Math.random() * 30}%`, animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        )}

        {error && (
          <div className="border border-af-border p-6">
            <p className="font-mono text-af-red text-sm tracking-tight">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 font-mono text-xs text-af-red underline hover:no-underline"
            >
              다시 시도
            </button>
          </div>
        )}

        {report && (
          <div ref={containerRef}>
            <div
              className={`report-content font-mono text-af-red text-sm leading-relaxed tracking-tight ${!done ? 'cursor' : ''}`}
              dangerouslySetInnerHTML={{ __html: parseMarkdown(report) }}
            />
          </div>
        )}
      </div>

      {/* Bottom navigation */}
      {done && (
        <div className="border-t-2 border-af-border grid grid-cols-1 md:grid-cols-2">
          <div className="border-b md:border-b-0 md:border-r border-af-border p-8 md:p-12 flex flex-col justify-between hover:bg-af-red group transition-colors cursor-pointer" onClick={() => router.push('/')}>
            <div className="flex items-center justify-between mb-8 md:mb-16">
              <span className="font-mono text-xs tracking-tight text-af-red group-hover:text-af-yellow transition-colors">#03</span>
              <span className="font-mono text-xs tracking-tight text-af-red group-hover:text-af-yellow transition-colors">Entry</span>
            </div>
            <div className="font-mono font-bold text-af-red group-hover:text-af-yellow transition-colors text-lg tracking-tight">
              ← 리포트에서 잘못된 내용 수정하기
            </div>
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-between hover:bg-af-red group transition-colors cursor-pointer">
            <div className="flex items-center justify-between mb-8 md:mb-16">
              <span className="font-mono text-xs tracking-tight text-af-red group-hover:text-af-yellow transition-colors">Entry</span>
              <span className="font-mono text-xs tracking-tight text-af-red group-hover:text-af-yellow transition-colors">#05</span>
            </div>
            <div className="font-mono font-bold text-af-red group-hover:text-af-yellow transition-colors text-lg tracking-tight">
              회원가입하고<br />부자 생활 습관 이어가기 →
            </div>
          </div>
        </div>
      )}

      <footer className="border-t border-af-border px-6 md:px-12 py-6 flex items-center justify-between">
        <span className="font-mono text-xs text-af-red/40 tracking-tight">ANTIFREEZE © 2024</span>
        <span className="font-mono text-xs text-af-red/40 tracking-tight">dancingfighter.com</span>
      </footer>
    </div>
  )
}
