'use client'

import { useEffect, useRef } from 'react'

interface EntryPopupProps {
  entryNum: string
  title: string
  placeholder?: string
  value: string
  onChange: (v: string) => void
  onClose: () => void
}

export default function EntryPopup({
  entryNum,
  title,
  placeholder,
  value,
  onChange,
  onClose,
}: EntryPopupProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    textareaRef.current?.focus()
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-af-yellow border border-af-border w-full max-w-[500px] mx-4 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-af-border px-6 py-4">
          <div className="flex items-center gap-4">
            <span className="font-mono text-af-red text-sm tracking-[-0.03em]">Entry</span>
            <span className="font-mono text-af-red text-sm tracking-[-0.03em]">{entryNum}</span>
          </div>
          <button
            onClick={onClose}
            className="font-mono text-af-red text-sm hover:text-af-border transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Title */}
        <div className="px-6 py-8 border-b border-af-border">
          <p className="font-mono text-af-red text-xl leading-[1.3] tracking-[-0.03em] text-center">
            {title}
          </p>
        </div>

        {/* Input */}
        <div className="px-6 py-6">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onClose() } }}
            placeholder={placeholder ?? '자유롭게 입력해주세요'}
            rows={4}
            className="w-full bg-transparent border border-af-border px-4 py-3 font-mono text-af-red text-sm tracking-[-0.03em] leading-[1.5] placeholder:text-af-red/40 resize-none outline-none focus:border-af-red"
          />
        </div>

        {/* Confirm button */}
        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full bg-af-red text-af-yellow font-mono text-sm tracking-[-0.03em] py-3 hover:bg-af-border transition-colors"
          >
            완료
          </button>
        </div>
      </div>
    </div>
  )
}
