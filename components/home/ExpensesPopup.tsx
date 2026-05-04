'use client'

import { useEffect, useState } from 'react'

interface ExpensesPopupProps {
  value: string
  onChange: (v: string) => void
  onClose: () => void
}

const ITEMS = [
  { key: 'food',      label: '식비',      placeholder: 'ex) 30만원' },
  { key: 'housing',   label: '주거비',    placeholder: 'ex) 월세 40만원' },
  { key: 'date',      label: '데이트 비용', placeholder: 'ex) 20만원' },
  { key: 'drink',     label: '술 / 친구 약속',   placeholder: 'ex) 10만원' },
  { key: 'transport', label: '교통비',    placeholder: 'ex) 5만 5천원' },
  { key: 'telecom',   label: '통신비',    placeholder: 'ex) 4만원' },
  { key: 'sub',       label: '구독료',    placeholder: 'ex) 유튜브 넷플릭스 챗지피티 등 대략 6만원' },
  { key: 'shopping',  label: '쇼핑',      placeholder: 'ex) 15만원' },
  { key: 'etc',       label: '기타',      placeholder: '자유롭게 입력하세요!' },
] as const

type ItemKey = typeof ITEMS[number]['key']

// 입력 문자열을 원 단위 숫자로 파싱
function parseToWon(input: string): number {
  const s = input.trim()
  if (!s) return 0

  // 숫자만 → 만원 단위
  if (/^\d+$/.test(s)) return parseInt(s) * 10000

  let total = 0
  // 억
  const eok = s.match(/(\d+(?:\.\d+)?)\s*억/)
  if (eok) total += parseFloat(eok[1]) * 100000000
  // 만
  const man = s.match(/(\d+(?:\.\d+)?)\s*만/)
  if (man) total += parseFloat(man[1]) * 10000
  // 천
  const cheon = s.match(/(\d+(?:\.\d+)?)\s*천/)
  if (cheon) total += parseFloat(cheon[1]) * 1000
  // 백
  const baek = s.match(/(\d+(?:\.\d+)?)\s*백/)
  if (baek) total += parseFloat(baek[1]) * 100

  // 단위 없이 숫자+원 (ex: 3500원)
  if (total === 0) {
    const won = s.match(/^(\d+)\s*원?$/)
    if (won) total = parseInt(won[1])
  }

  return total
}

// 원 단위 숫자를 한국어로 표시
function formatWon(won: number): string {
  if (won === 0) return '0원'
  const eok = Math.floor(won / 100000000)
  const man = Math.floor((won % 100000000) / 10000)
  const rest = won % 10000

  const parts: string[] = []
  if (eok > 0) parts.push(`${eok}억`)
  if (man > 0) parts.push(`${man}만원`)
  if (rest > 0) parts.push(`${rest}원`)
  if (parts.length === 0) return '0원'
  // 마지막 부분에만 "원" 붙이기 (만원이 있으면 rest는 그냥 붙임)
  return parts.join(' ')
}

// 저장된 문자열에서 각 항목 값 복원 시도
function parseExisting(saved: string): Record<ItemKey, string> {
  const result: Record<ItemKey, string> = {
    food: '', housing: '', transport: '', telecom: '', date: '',
    sub: '', shopping: '', drink: '', etc: '',
  }
  for (const item of ITEMS) {
    const match = saved.match(new RegExp(`${item.label}\\s*([^,]+)`))
    if (match) result[item.key] = match[1].trim()
  }
  return result
}

export default function ExpensesPopup({ value, onChange, onClose }: ExpensesPopupProps) {
  const [fields, setFields] = useState<Record<ItemKey, string>>(() => parseExisting(value))

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const totalWon = ITEMS.reduce((sum, item) => sum + parseToWon(fields[item.key]), 0)
  const totalLabel = formatWon(totalWon)

  const handleChange = (key: ItemKey, val: string) => {
    setFields((prev) => ({ ...prev, [key]: val }))
  }

  const handleConfirm = () => {
    const parts = ITEMS
      .filter((item) => fields[item.key].trim())
      .map((item) => `${item.label} ${fields[item.key].trim()}`)
    const summary = parts.length > 0
      ? `${parts.join(', ')} / 지출 총합 ${totalLabel}`
      : ''
    onChange(summary)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-af-yellow border border-af-border w-full max-w-[500px] mx-4 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-af-border px-6 py-4 shrink-0">
          <div className="flex items-center gap-4">
            <span className="font-mono text-af-red text-sm tracking-[-0.03em]">Entry</span>
            <span className="font-mono text-af-red text-sm tracking-[-0.03em]">#07</span>
          </div>
          <button onClick={onClose} className="font-mono text-af-red text-sm hover:text-af-border transition-colors">
            ✕
          </button>
        </div>

        {/* Title */}
        <div className="px-6 py-6 border-b border-af-border shrink-0">
          <p className="font-mono text-af-red text-xl leading-[1.3] tracking-[-0.03em] text-center">
            현재 지출 ( 고정, 변동 )
          </p>
        </div>

        {/* Items */}
        <div className="overflow-y-auto flex-1 px-6 py-4 flex flex-col gap-3">
          {ITEMS.map((item) => (
            <div key={item.key} className="flex flex-col gap-1">
              <label className="font-mono text-af-red text-xs tracking-[-0.03em]">
                {item.label}
              </label>
              <input
                type="text"
                value={fields[item.key]}
                onChange={(e) => handleChange(item.key, e.target.value)}
                placeholder={item.placeholder}
                className="w-full bg-transparent border border-af-border px-4 py-2 font-mono text-af-red text-sm tracking-[-0.03em] placeholder:text-af-red/40 outline-none focus:border-af-red"
              />
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="px-6 py-4 border-t border-af-border shrink-0 flex items-center justify-between">
          <span className="font-mono text-af-red text-sm tracking-[-0.03em]">지출 총합</span>
          <span className="font-mono text-af-border text-lg tracking-[-0.03em] font-bold">
            {totalLabel}
          </span>
        </div>

        {/* Confirm */}
        <div className="px-6 pb-6 shrink-0">
          <button
            onClick={handleConfirm}
            className="w-full bg-af-red text-af-yellow font-mono text-sm tracking-[-0.03em] py-3 hover:bg-af-border transition-colors"
          >
            완료
          </button>
        </div>
      </div>
    </div>
  )
}
