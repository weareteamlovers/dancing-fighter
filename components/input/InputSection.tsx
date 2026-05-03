'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import InputCard from './InputCard'
import SimplePopup from './popups/SimplePopup'
import { useFormStore } from '@/store/useFormStore'
import { ExpenseBreakdown } from '@/types'

type PopupId = 'income' | keyof ExpenseBreakdown | 'savings' | 'unexpected' | 'goal' | null

interface CardConfig {
  id: PopupId
  emoji: string
  label: string
  hint: string
  multiline?: boolean
  placeholder: string
  title: string
  subtitle: string
}

const CARDS: CardConfig[] = [
  {
    id: 'income',
    emoji: '🍅',
    label: '월 소득',
    hint: '세후 실수령액',
    placeholder: '예: 230만원, 월급 210에 알바 30',
    title: '월 소득',
    subtitle: '세후 실수령액 기준으로 자유롭게 입력해 주세요',
  },
  {
    id: 'food',
    emoji: '🍎',
    label: '식비',
    hint: '한 달 식비',
    placeholder: '예: 30만원, 35만',
    title: '식비',
    subtitle: '한 달 식비를 자유롭게 입력해 주세요',
  },
  {
    id: 'transport',
    emoji: '🥕',
    label: '교통비',
    hint: '버스·지하철·택시',
    placeholder: '예: 7만원, 버스패스 6.5만',
    title: '교통비',
    subtitle: '한 달 교통비를 자유롭게 입력해 주세요',
  },
  {
    id: 'date',
    emoji: '🍒',
    label: '데이트 비용',
    hint: '연인과의 지출',
    placeholder: '예: 20만원, 한 달에 두 번 정도 15씩',
    title: '데이트 비용',
    subtitle: '한 달 데이트 비용을 자유롭게 입력해 주세요',
  },
  {
    id: 'telecom',
    emoji: '🧄',
    label: '통신비',
    hint: '핸드폰·인터넷',
    placeholder: '예: 5만원, 통신비 5.5만',
    title: '통신비',
    subtitle: '핸드폰·인터넷 요금을 입력해 주세요',
  },
  {
    id: 'housing',
    emoji: '🧅',
    label: '주거비',
    hint: '월세·관리비',
    placeholder: '예: 월세 40만원, 보증금 500에 30',
    title: '주거비',
    subtitle: '월세, 관리비 등 주거 관련 지출을 입력해 주세요',
  },
  {
    id: 'other',
    emoji: '🥦',
    label: '기타 지출',
    hint: '구독·의류·여가',
    placeholder: '구독료, 의류, 여가 등 자유롭게',
    title: '기타 지출',
    subtitle: '구독료, 의류, 여가 등 기타 지출을 입력해 주세요',
  },
  {
    id: 'savings',
    emoji: '🌽',
    label: '저축 목표',
    hint: '이번 달 목표',
    placeholder: '예: 매달 50만원, 월급의 20% 저축 중',
    title: '저축 목표',
    subtitle: '이번 달 목표 저축액 또는 방식을 입력해 주세요',
  },
  {
    id: 'unexpected',
    emoji: '🌶️',
    label: '예상 못한 지출',
    hint: '계획에 없던 지출',
    placeholder: '예: 결혼 축의금 10만원, 핸드폰 수리비 20만원',
    title: '예상 못한 지출',
    subtitle: '이번 달 계획에 없던 지출을 입력해 주세요',
    multiline: true,
  },
  {
    id: 'goal',
    emoji: '🥑',
    label: '재무 목표 & 고민',
    hint: '돈에 관한 목표',
    placeholder: '예: 6개월 안에 300만원 모아서 유럽 여행 가고 싶어.',
    title: '재무 목표 & 고민',
    subtitle: '돈에 관한 목표나 고민을 자유롭게 털어놓으세요',
    multiline: true,
  },
]

const EXPENSE_KEYS: (keyof ExpenseBreakdown)[] = ['food', 'transport', 'date', 'telecom', 'housing', 'other']

function isExpenseKey(id: PopupId): id is keyof ExpenseBreakdown {
  return EXPENSE_KEYS.includes(id as keyof ExpenseBreakdown)
}

export default function InputSection() {
  const router = useRouter()
  const [activePopup, setActivePopup] = useState<PopupId>(null)
  const { formData, setIncome, setExpense, setSavings, setUnexpected, setGoal, isComplete } = useFormStore()

  const getValue = (id: PopupId): string => {
    if (!id) return ''
    if (id === 'income') return formData.income
    if (id === 'savings') return formData.savings
    if (id === 'unexpected') return formData.unexpected
    if (id === 'goal') return formData.goal
    if (isExpenseKey(id)) return formData.expenses[id]
    return ''
  }

  const setValue = (id: PopupId, value: string) => {
    if (!id) return
    if (id === 'income') setIncome(value)
    else if (id === 'savings') setSavings(value)
    else if (id === 'unexpected') setUnexpected(value)
    else if (id === 'goal') setGoal(value)
    else if (isExpenseKey(id)) setExpense(id, value)
  }

  const handleStart = () => {
    if (!isComplete()) {
      alert('최소 월 소득 또는 지출 항목 하나는 입력해주세요.')
      return
    }
    router.push('/report')
  }

  const filledCount = CARDS.filter((c) => getValue(c.id).trim()).length
  const activeCard = CARDS.find((c) => c.id === activePopup)

  // Fill to complete rows (3 columns): add filler if needed
  const fillerCount = (3 - (CARDS.length % 3)) % 3

  return (
    <section id="input-section">
      {/* Section header */}
      <div className="border-b border-af-border px-8 md:px-16 py-5 flex items-center justify-between">
        <span className="font-mono italic font-bold text-af-red text-xl md:text-2xl tracking-tight">
          Check List!
        </span>
        <span className="font-mono text-xs text-af-red/50 tracking-tight">
          {filledCount} / {CARDS.length} 입력됨
        </span>
      </div>

      {/* Cards grid — 1px gap with grid background for border-like lines */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-b border-af-border"
        style={{ gap: '1px', backgroundColor: '#CA1E08' }}
      >
        {CARDS.map((card) => {
          const value = getValue(card.id)
          return (
            <div key={card.id} className="bg-af-yellow">
              <InputCard
                emoji={card.emoji}
                label={card.label}
                hint={card.hint}
                value={value}
                isEmpty={!value.trim()}
                onClick={() => setActivePopup(card.id)}
              />
            </div>
          )
        })}
        {/* Filler cells to complete last row */}
        {Array.from({ length: fillerCount }).map((_, i) => (
          <div key={`filler-${i}`} className="bg-af-yellow hidden lg:block" />
        ))}
      </div>

      {/* CTA section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 border-b-0">
        {/* Left: large decorative image */}
        <div className="border-r-0 lg:border-r border-af-border flex items-end justify-start px-8 md:px-16 py-10 overflow-hidden relative min-h-[180px]">
          <span className="absolute bottom-0 left-8 md:left-12 text-[160px] md:text-[200px] leading-none select-none" style={{ marginBottom: '-20px' }}>
            🌶️
          </span>
          <span className="absolute bottom-0 right-0 text-[140px] md:text-[180px] leading-none select-none opacity-60" style={{ marginBottom: '-12px' }}>
            🍄
          </span>
        </div>

        {/* Right: CTA text + button */}
        <div className="px-8 md:px-16 py-12 flex flex-col justify-center gap-6 border-t lg:border-t-0 border-af-border">
          <div>
            <p className="font-mono font-bold text-af-red text-lg md:text-xl tracking-tight leading-snug">
              → 자산 및 생활 설계 시작
            </p>
            <p className="font-mono text-af-red/60 text-sm tracking-tight mt-1">
              재산/생활설계 시작 AI
            </p>
          </div>
          <button
            onClick={handleStart}
            className="self-start font-mono font-bold text-af-red text-sm tracking-tight border-b-2 border-af-red pb-1 hover:text-af-border hover:border-af-border transition-colors"
          >
            리포트 생성하기 →
          </button>
        </div>
      </div>

      {/* Popup */}
      {activeCard && (
        <SimplePopup
          isOpen={activePopup !== null}
          onClose={() => setActivePopup(null)}
          title={activeCard.title}
          subtitle={activeCard.subtitle}
          placeholder={activeCard.placeholder}
          value={getValue(activePopup)}
          onChange={(v) => setValue(activePopup, v)}
          multiline={activeCard.multiline}
        />
      )}
    </section>
  )
}
