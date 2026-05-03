'use client'

import { useEffect, useRef } from 'react'

interface PopupWrapperProps {
  isOpen: boolean
  onClose: () => void
  title: string
  subtitle?: string
  children: React.ReactNode
}

export default function PopupWrapper({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
}: PopupWrapperProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  if (!isOpen) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ backgroundColor: 'rgba(142, 22, 6, 0.15)' }}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose()
      }}
    >
      <div
        className="w-full max-w-lg bg-af-yellow border-2 border-af-border animate-slide-up"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="border-b-2 border-af-border p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-af-red font-mono font-bold text-xl md:text-2xl tracking-tight leading-tight">
                {title}
              </h2>
              {subtitle && (
                <p className="mt-1 text-af-red/70 text-sm font-mono tracking-tight">
                  {subtitle}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="shrink-0 w-8 h-8 border border-af-border text-af-red font-mono text-lg leading-none hover:bg-af-border hover:text-af-yellow transition-colors flex items-center justify-center"
              aria-label="닫기"
            >
              ×
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8">{children}</div>
      </div>
    </div>
  )
}
