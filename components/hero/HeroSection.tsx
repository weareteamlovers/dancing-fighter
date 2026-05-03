'use client'

import { useEffect, useState } from 'react'

export default function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const now = new Date()

  useEffect(() => { setMounted(true) }, [])

  const scrollToInput = () => {
    document.getElementById('input-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="bg-af-yellow border-b-2 border-af-border">
      {/* Top bar */}
      <nav className="border-b border-af-border px-8 md:px-16 py-3 flex items-center justify-between">
        <span className="font-mono font-bold text-af-red text-xs tracking-tight uppercase">
          ANTIFREEZE / 안티프리즈
        </span>
        {mounted && (
          <span className="font-mono text-af-red/60 text-xs tracking-tight">
            {now.getFullYear()}.{String(now.getMonth() + 1).padStart(2, '0')}
          </span>
        )}
      </nav>

      {/* Hero body */}
      <div className="grid grid-cols-2 min-h-[380px] md:min-h-[480px] lg:min-h-[560px]">
        {/* Left: text */}
        <div className="border-r border-af-border px-8 md:px-16 py-12 md:py-20 flex flex-col justify-between">
          <h1 className="font-mono font-bold text-af-red tracking-tighter leading-none">
            <span className="block text-[clamp(2.2rem,5.5vw,5rem)]">안티프리즈:</span>
          </h1>
          <div>
            <p className="font-mono text-af-red text-sm md:text-base tracking-tight leading-loose mb-8">
              경제적인 어려움 속에서도<br />
              20대 청춘의 뜨거움은<br />
              얼어붙지 않을거야.
            </p>
            <button
              onClick={scrollToInput}
              className="font-mono font-bold text-af-red text-sm tracking-tight border-b-2 border-af-red pb-1 hover:text-af-border hover:border-af-border transition-colors"
            >
              지금 시작하기 ↓
            </button>
          </div>
        </div>

        {/* Right: tomato */}
        <div className="relative overflow-hidden flex items-end justify-center bg-af-yellow">
          <span
            className="text-[200px] md:text-[300px] lg:text-[380px] leading-none select-none"
            style={{ marginBottom: '-16px' }}
          >
            🍅
          </span>
        </div>
      </div>
    </section>
  )
}
