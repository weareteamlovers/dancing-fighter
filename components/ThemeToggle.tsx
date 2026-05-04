'use client'

import { useState } from 'react'
import { useThemeStore, Theme } from '@/store/useThemeStore'

const MODES: { theme: Theme; emoji: string; label: string }[] = [
  { theme: 'white', emoji: '☀️', label: '화이트' },
  { theme: 'yellow', emoji: '💡', label: '옐로우' },
  { theme: 'dark', emoji: '🌙', label: '다크' },
]

export default function ThemeToggle() {
  const { theme, setTheme } = useThemeStore()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col border border-af-border overflow-visible"
      style={{ fontFamily: 'DotGothic16, "Noto Sans KR", sans-serif' }}
    >
      {MODES.map(({ theme: t, emoji, label }, i) => {
        const isActive = theme === t

        return (
          <div key={t} className="relative">
            {/* Tooltip */}
            {hoveredIndex === i && (
              <div className="absolute right-full top-1/2 -translate-y-1/2 mr-2 px-2 py-1 text-xs whitespace-nowrap pointer-events-none border border-af-border text-af-red bg-af-yellow">
                {label}
              </div>
            )}

            {/* Button */}
            <button
              onClick={() => setTheme(t)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={[
                'w-10 h-10 flex items-center justify-center text-lg transition-colors',
                isActive
                  ? 'bg-af-red text-af-yellow'
                  : 'bg-af-yellow text-af-red hover:bg-af-yellow-hover',
                i < MODES.length - 1 ? 'border-b border-af-border' : '',
              ].join(' ')}
            >
              {emoji}
            </button>
          </div>
        )
      })}
    </div>
  )
}
