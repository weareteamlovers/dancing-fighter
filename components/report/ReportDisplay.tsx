'use client'

import { useEffect, useState } from 'react'
import { useFormStore } from '@/store/useFormStore'
import { useRouter } from 'next/navigation'
import { parseReport } from '@/lib/openai'

const HERO_IMG = 'https://www.figma.com/api/mcp/asset/eca24d65-cefc-44b5-bf89-6b634f2ccb00'
const FOOTER_IMG = 'https://www.figma.com/api/mcp/asset/3f1029a5-49b8-45c3-a8da-e77a03de831a'
const PUMPKIN_IMG = 'https://www.figma.com/api/mcp/asset/5603e7e9-0432-4610-8754-99df8256bfd6'
const TOMATO_IMG = 'https://www.figma.com/api/mcp/asset/4ea74aaa-4804-4cfc-867f-185036d1e35e'
const ARROW_IMG = 'https://www.figma.com/api/mcp/asset/3a622c96-934d-4484-a4c2-ca0de7c91b93'
const BROCCOLI_IMG = 'https://www.figma.com/api/mcp/asset/94b5a728-3fd6-4182-b0ae-f74d9a919ac9'

export default function ReportDisplay() {
  const router = useRouter()
  const { formData } = useFormStore()
  const [rawReport, setRawReport] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const now = new Date()

  useEffect(() => {
    const hasData = Object.values(formData).some((v) => v.trim().length > 0)
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

  const parsed = done ? parseReport(rawReport) : null

  const dotStyle: React.CSSProperties = { fontFamily: 'DotGothic16, "Noto Sans KR", sans-serif' }

  return (
    <div className="bg-af-yellow flex flex-col items-center">

      {/* Nav */}
      <nav
        className="bg-af-yellow border-b border-l border-r border-af-border w-full flex items-center justify-between px-5 py-[10px] text-af-red text-base tracking-[0.01em] whitespace-nowrap overflow-hidden shrink-0"
        style={{ ...dotStyle, height: '34px' }}
      >
        <button onClick={() => router.push('/')} className="leading-[0.9] hover:underline">
          Home :)
        </button>
        <div className="flex items-center gap-2 text-center">
          <span className="leading-[0.9]">우리가 돈이 없지, 사랑이 없냐!</span>
          <span>•</span>
          <span className="leading-[0.9]">돈은 아껴도 사랑은 아끼지 말아요 :팀사랑꾼들</span>
        </div>
        <span className="leading-[0.9]">About Me</span>
      </nav>

      {/* Loading */}
      {(loading || (!done && !error)) && (
        <div className="w-full border-l border-r border-af-border min-h-[400px] flex flex-col items-center justify-center gap-6 px-10">
          <h2 className="text-af-red text-[45px] leading-[0.9] tracking-[-0.03em] animate-pulse" style={dotStyle}>
            분석 중...
          </h2>
          <p className="font-mono text-af-red text-base tracking-[-0.03em] text-center">
            AI가 자산 생활 설계 리포트를 만들고 있어요
          </p>
          {rawReport && (
            <p className="font-mono text-af-red/50 text-xs tracking-[-0.03em] text-center max-w-sm">
              {rawReport.slice(-80)}
              <span className="animate-pulse">▌</span>
            </p>
          )}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="w-full border border-af-border m-8 p-10 flex flex-col gap-4">
          <p className="font-mono text-af-red text-sm">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="font-mono text-af-red text-sm underline hover:no-underline self-start"
          >
            다시 시도
          </button>
        </div>
      )}

      {/* Completed report */}
      {done && parsed && (
        <>
          {/* Hero */}
          <header className="border-l border-r border-t border-af-border w-full h-[720px] relative flex flex-col items-start justify-end px-5 py-[25px] shrink-0 overflow-hidden">
            <img
              alt="샐러드"
              src={HERO_IMG}
              className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none"
            />
            <div className="relative flex flex-col gap-5 items-center text-center text-af-red w-full px-10">
              <p className="font-mono text-base tracking-[-0.03em] leading-[1.3] w-full">자산 생활 설계도 #01</p>
              <h1 className="text-[60px] leading-[1.1] tracking-[0.01em] w-full" style={dotStyle}>
                {parsed.headline}
              </h1>
              <p className="font-mono text-base tracking-[-0.03em] leading-[1.3] w-full">
                {now.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </header>

          {/* Main */}
          <main className="border border-af-border w-full flex flex-col gap-[99px] items-center pt-[100px] overflow-hidden shrink-0">

            {/* Check Point */}
            <section className="flex flex-col gap-[30px] items-center text-af-red w-full">
              <h2 className="text-[45px] leading-[0.9] tracking-[-0.03em] whitespace-nowrap" style={dotStyle}>
                Check Point!
              </h2>
              <ul className="flex flex-col gap-[21px] items-center font-mono text-base text-center tracking-[-0.03em] leading-[1.3] max-w-[600px] w-full px-10">
                {parsed.checkPoints.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </section>

            {/* Advice */}
            <section className="flex flex-col gap-[30px] items-center text-af-red text-center w-full px-10 md:px-[340px]">
              <h2 className="text-[45px] leading-[0.9] tracking-[-0.03em] w-full" style={dotStyle}>
                Advice!
              </h2>
              <ol className="flex flex-col gap-6 font-mono text-base tracking-[-0.03em] leading-[1.3] w-full text-left list-decimal">
                {parsed.advice.map((item, i) => (
                  <li key={i} className="ms-6">
                    {item}
                  </li>
                ))}
              </ol>
            </section>

            {/* Navigation */}
            <div className="border-b border-t border-af-border w-full h-[460px] flex items-stretch overflow-hidden shrink-0">
              <button
                onClick={() => router.push('/')}
                className="bg-af-yellow border-r border-af-border flex-1 flex items-end justify-between p-[50px] hover:bg-af-yellow-hover transition-colors"
              >
                <div className="flex flex-col h-full items-end justify-between w-full">
                  <div className="flex items-center justify-between w-full font-mono text-af-red text-xl leading-[1.3] tracking-[-0.03em] whitespace-nowrap">
                    <span>#03</span>
                    <span>Entry</span>
                  </div>
                  <p className="font-mono text-af-red text-xl leading-[1.3] tracking-[-0.03em] text-center w-full whitespace-nowrap">
                    입력 사항 수정하러 가기
                  </p>
                  <div className="flex items-center justify-between w-full">
                    <img alt="화살표" src={ARROW_IMG} className="h-[80px] w-[80px] max-w-none" />
                    <div className="h-[147px] w-[139px] relative overflow-hidden shrink-0">
                      <img alt="호박" src={PUMPKIN_IMG} className="absolute max-w-none"
                        style={{ width: '137%', height: '130%', left: '-17%', top: '-13%' }} />
                    </div>
                  </div>
                </div>
              </button>

              <div className="bg-af-yellow flex-1 flex items-end justify-between p-[50px] opacity-40 cursor-not-allowed select-none">
                <div className="flex flex-col h-full items-start justify-between w-full">
                  <div className="flex items-center justify-between w-full font-mono text-af-red text-xl leading-[1.3] tracking-[-0.03em] whitespace-nowrap">
                    <span>Entry</span>
                    <span>#05</span>
                  </div>
                  <p className="font-mono text-af-red text-xl leading-[1.3] tracking-[-0.03em] text-center w-full whitespace-nowrap">
                    회원가입하고 부자 생활 습관 이어가기
                  </p>
                  <div className="flex items-center justify-between w-full">
                    <div className="h-[147px] w-[139px] relative overflow-hidden shrink-0">
                      <img alt="토마토" src={TOMATO_IMG} className="absolute max-w-none"
                        style={{ width: '774%', height: '489%', left: '-290%', top: '-114%' }} />
                    </div>
                    <img alt="화살표" src={ARROW_IMG} className="h-[80px] w-[80px] max-w-none rotate-180" />
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className="border-t border-af-border w-full py-[173px] relative overflow-hidden flex flex-col items-center justify-center shrink-0">
            <img alt="채소 모음" src={FOOTER_IMG}
              className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none" />
            <div className="relative flex flex-col gap-7 items-center w-[298px]">
              <div className="h-[116px] w-[110px] relative overflow-hidden">
                <img alt="브로콜리" src={BROCCOLI_IMG} className="absolute max-w-none"
                  style={{ width: '139%', height: '132%', left: '-21%', top: '-12%' }} />
              </div>
              {['리포트 공유하기', 'Instagram', '사진으로 저장'].map((label) => (
                <div
                  key={label}
                  className="text-[45px] text-af-border leading-[0.9] tracking-[-0.03em] text-center whitespace-nowrap cursor-pointer hover:underline"
                  style={dotStyle}
                >
                  {label}
                </div>
              ))}
            </div>
          </footer>
        </>
      )}
    </div>
  )
}
