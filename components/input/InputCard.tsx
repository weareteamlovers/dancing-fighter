'use client'

interface InputCardProps {
  emoji: string
  label: string
  hint: string
  value: string
  isEmpty: boolean
  onClick: () => void
}

export default function InputCard({ emoji, label, hint, value, isEmpty, onClick }: InputCardProps) {
  return (
    <button
      onClick={onClick}
      className="group w-full h-full text-left px-6 py-8 flex flex-col items-center hover:bg-af-red transition-colors"
    >
      {/* Vegetable circle */}
      <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border border-af-border group-hover:border-af-yellow/60 flex items-center justify-center bg-af-yellow group-hover:bg-af-red/80 transition-colors mb-5 overflow-hidden shrink-0">
        <span className="text-6xl md:text-7xl select-none leading-none">{emoji}</span>
      </div>

      {/* Label */}
      <div className="font-mono font-bold text-af-red group-hover:text-af-yellow text-base md:text-lg tracking-tight text-center transition-colors leading-tight">
        {label}
      </div>

      {/* Value or hint */}
      <div className="mt-2 font-mono text-xs tracking-tight text-center transition-colors text-af-red/50 group-hover:text-af-yellow/60 min-h-[32px] flex items-center px-2 max-w-[180px]">
        <span className="line-clamp-2">{isEmpty ? hint : value}</span>
      </div>

      {/* Status badge */}
      <div className={`mt-4 font-mono text-xs tracking-tight px-4 py-1.5 transition-colors ${
        isEmpty
          ? 'border border-af-border text-af-red/60 group-hover:border-af-yellow/50 group-hover:text-af-yellow/60'
          : 'bg-af-red text-af-yellow group-hover:bg-af-yellow group-hover:text-af-red'
      }`}>
        {isEmpty ? '입력하기' : '완료 ✓'}
      </div>
    </button>
  )
}
