'use client'

import PopupWrapper from './PopupWrapper'
import { useFormStore } from '@/store/useFormStore'
import { ExpenseBreakdown } from '@/types'

interface ExpensePopupProps {
  isOpen: boolean
  onClose: () => void
}

const EXPENSE_FIELDS: { key: keyof ExpenseBreakdown; label: string; placeholder: string }[] = [
  { key: 'food',      label: '🍜 식비',       placeholder: '예: 30만원, 35만' },
  { key: 'transport', label: '🚇 교통비',     placeholder: '예: 7만원, 버스패스 6.5' },
  { key: 'date',      label: '💑 데이트 비용', placeholder: '예: 20만원, 한 달에 두 번 정도 15씩' },
  { key: 'telecom',   label: '📱 통신비',     placeholder: '예: 5만원, 통신비 5.5' },
  { key: 'housing',   label: '🏠 주거비',     placeholder: '예: 월세 40만원, 보증금 500에 30' },
  { key: 'other',     label: '📝 기타',       placeholder: '구독료, 의류, 여가 등 자유롭게 입력' },
]

export default function ExpensePopup({ isOpen, onClose }: ExpensePopupProps) {
  const { formData, setExpense } = useFormStore()

  const handleDone = () => {
    const hasAny = Object.values(formData.expenses).some((v) => v.trim())
    if (hasAny) onClose()
    else onClose()
  }

  return (
    <PopupWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="현재 지출"
      subtitle="금액을 자유롭게 입력하세요. 예: 30만원, 3백만, 300000"
    >
      <div className="space-y-4">
        {EXPENSE_FIELDS.map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className="block text-af-red font-mono text-sm font-bold mb-1 tracking-tight">
              {label}
            </label>
            <input
              type="text"
              value={formData.expenses[key]}
              onChange={(e) => setExpense(key, e.target.value)}
              placeholder={placeholder}
              className="w-full bg-transparent border border-af-border text-af-red font-mono text-sm px-3 py-2 placeholder:text-af-red/40 focus:outline-none focus:border-af-red transition-colors"
            />
          </div>
        ))}

        <button
          onClick={handleDone}
          className="w-full mt-2 bg-af-red text-af-yellow font-mono font-bold text-sm tracking-tight py-3 hover:bg-af-border transition-colors"
        >
          완료
        </button>
      </div>
    </PopupWrapper>
  )
}
