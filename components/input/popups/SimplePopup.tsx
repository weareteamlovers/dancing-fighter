'use client'

import PopupWrapper from './PopupWrapper'

interface SimplePopupProps {
  isOpen: boolean
  onClose: () => void
  title: string
  subtitle: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  multiline?: boolean
}

export default function SimplePopup({
  isOpen,
  onClose,
  title,
  subtitle,
  placeholder,
  value,
  onChange,
  multiline = false,
}: SimplePopupProps) {
  return (
    <PopupWrapper isOpen={isOpen} onClose={onClose} title={title} subtitle={subtitle}>
      <div className="space-y-4">
        {multiline ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={4}
            className="w-full bg-transparent border border-af-border text-af-red font-mono text-sm px-3 py-2 placeholder:text-af-red/40 focus:outline-none focus:border-af-red transition-colors resize-none"
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-transparent border border-af-border text-af-red font-mono text-sm px-3 py-2 placeholder:text-af-red/40 focus:outline-none focus:border-af-red transition-colors"
          />
        )}
        <button
          onClick={onClose}
          className="w-full bg-af-red text-af-yellow font-mono font-bold text-sm tracking-tight py-3 hover:bg-af-border transition-colors"
        >
          완료
        </button>
      </div>
    </PopupWrapper>
  )
}
