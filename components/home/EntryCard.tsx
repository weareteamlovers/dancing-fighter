'use client'

import { useState } from 'react'
import { useFormStore } from '@/store/useFormStore'
import { FormField } from '@/types'
import EntryPopup from './EntryPopup'

interface EntryCardProps {
  num: string        // "01" ~ "12"
  field: FormField
  title: string
  placeholder?: string
  imgSrc: string
  imgAlt: string
  imgStyle?: React.CSSProperties
}

export default function EntryCard({
  num,
  field,
  title,
  placeholder,
  imgSrc,
  imgAlt,
  imgStyle,
}: EntryCardProps) {
  const { formData, setField } = useFormStore()
  const [open, setOpen] = useState(false)
  const value = formData[field]
  const filled = value.trim().length > 0

  return (
    <>
      <li className="relative group">
        {/* Card */}
        <button
          onClick={() => setOpen(true)}
          className="w-full bg-af-yellow border border-af-border flex flex-col items-center justify-center pb-10 pt-[45px] px-3 overflow-clip hover:bg-af-yellow-hover transition-colors text-left"
        >
          {/* Inner content area */}
          <div className="flex flex-col gap-[30px] h-[375px] items-end px-10 w-full">
            {/* Folio label */}
            <div className="flex items-center justify-between w-full font-mono text-af-red text-xl leading-[1.3] tracking-[-0.03em] whitespace-nowrap shrink-0">
              <span>Entry</span>
              <span>#{num}</span>
            </div>

            {/* Vegetable image */}
            <div className="flex items-center justify-center w-full shrink-0">
              <div className="h-[174px] w-[165px] relative overflow-hidden shrink-0">
                <img
                  alt={imgAlt}
                  src={imgSrc}
                  className="absolute max-w-none"
                  style={imgStyle ?? { width: '100%', height: '100%', objectFit: 'contain', left: 0, top: 0 }}
                />
              </div>
            </div>

            {/* Title */}
            <div className="flex-1 flex items-center justify-center w-full min-h-0">
              <p className="font-mono text-af-red text-xl leading-[1.3] tracking-[-0.03em] text-center">
                {title}
              </p>
            </div>

            {/* Arrow indicator */}
            <div className="flex items-center justify-center shrink-0 h-7 w-7">
              <span className="font-mono text-af-red text-2xl rotate-90 inline-block leading-none">↙</span>
            </div>
          </div>
        </button>

        {/* 입력 badge */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-[1px] z-10 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <div className={`px-4 h-[30px] flex items-center justify-center ${filled ? 'bg-af-border' : 'bg-af-red'}`}>
            <span className="font-mono text-af-yellow text-base leading-[1.3] tracking-[-0.03em] whitespace-nowrap">
              {filled ? '완료' : '입력'}
            </span>
          </div>
        </div>
      </li>

      {open && (
        <EntryPopup
          entryNum={`#${num}`}
          title={title}
          placeholder={placeholder}
          value={value}
          onChange={(v) => setField(field, v)}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}
