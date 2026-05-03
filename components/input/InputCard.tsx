'use client'

interface InputCardProps {
  number: string        // #01, #02 ...
  label: string
  summary?: string      // filled value summary
  isEmpty: boolean
  onClick: () => void
}

export default function InputCard({ number, label, summary, isEmpty, onClick }: InputCardProps) {
  return (
    <button
      onClick={onClick}
      className="group w-full border border-af-border p-5 md:p-6 text-left transition-all hover:bg-af-red hover:border-af-red relative overflow-hidden"
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-6 md:mb-10">
        <span className="font-mono text-xs tracking-tight text-af-red group-hover:text-af-yellow transition-colors">
          {number}
        </span>
        <span
          className={`font-mono text-xs tracking-tight transition-colors ${
            isEmpty ? 'text-af-red/40 group-hover:text-af-yellow/60' : 'text-af-border group-hover:text-af-yellow'
          }`}
        >
          {isEmpty ? '입력 전' : '입력 완료 ✓'}
        </span>
      </div>

      {/* Label */}
      <div className="font-mono font-bold text-lg md:text-xl tracking-tight text-af-red group-hover:text-af-yellow transition-colors leading-tight">
        {label}
      </div>

      {/* Summary of filled value */}
      {!isEmpty && summary && (
        <div className="mt-2 font-mono text-xs text-af-red/70 group-hover:text-af-yellow/70 transition-colors truncate">
          {summary}
        </div>
      )}

      {/* Click hint */}
      {isEmpty && (
        <div className="absolute bottom-4 right-5 font-mono text-xs text-af-red/30 group-hover:text-af-yellow/50 transition-colors">
          클릭해서 입력 →
        </div>
      )}
    </button>
  )
}
