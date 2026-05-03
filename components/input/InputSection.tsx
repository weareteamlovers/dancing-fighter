'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import InputCard from './InputCard'
import ExpensePopup from './popups/ExpensePopup'
import SimplePopup from './popups/SimplePopup'
import { useFormStore } from '@/store/useFormStore'

type PopupType = 'income' | 'expenses' | 'savings' | 'unexpected' | 'goal' | null

export default function InputSection() {
  const router = useRouter()
  const [activePopup, setActivePopup] = useState<PopupType>(null)
  const { formData, setIncome, setSavings, setUnexpected, setGoal, isComplete } = useFormStore()

  const expenseSummary = Object.entries({
    '식비': formData.expenses.food,
    '교통비': formData.expenses.transport,
    '데이트': formData.expenses.date,
    '통신비': formData.expenses.telecom,
    '주거비': formData.expenses.housing,
    '기타': formData.expenses.other,
  })
    .filter(([, v]) => v.trim())
    .map(([k, v]) => `${k} ${v}`)
    .join(' · ')

  const expensesEmpty = !Object.values(formData.expenses).some((v) => v.trim())

  const handleStart = () => {
    if (!isComplete()) {
      alert('최소 월 소득 또는 지출 항목 하나는 입력해주세요.')
      return
    }
    router.push('/report')
  }

  return (
    <section id="input-section" className="border-t-2 border-af-border">
      {/* Section header */}
      <div className="border-b border-af-border px-6 md:px-12 py-5 flex items-center justify-between">
        <span className="font-mono text-xs tracking-tight text-af-red/60">
          FINANCIAL INPUT
        </span>
        <span className="font-mono text-xs tracking-tight text-af-red/60">
          {[formData.income, expenseSummary, formData.savings, formData.unexpected, formData.goal].filter(Boolean).length} / 5 입력됨
        </span>
      </div>

      {/* Input cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="border-b md:border-r border-af-border">
          <InputCard
            number="#01"
            label="월 소득"
            summary={formData.income}
            isEmpty={!formData.income.trim()}
            onClick={() => setActivePopup('income')}
          />
        </div>
        <div className="border-b lg:border-r border-af-border">
          <InputCard
            number="#02"
            label="현재 지출"
            summary={expenseSummary}
            isEmpty={expensesEmpty}
            onClick={() => setActivePopup('expenses')}
          />
        </div>
        <div className="border-b md:border-r lg:border-r-0 border-af-border">
          <InputCard
            number="#03"
            label="저축 목표"
            summary={formData.savings}
            isEmpty={!formData.savings.trim()}
            onClick={() => setActivePopup('savings')}
          />
        </div>
        <div className="border-b md:border-r-0 lg:border-r border-af-border">
          <InputCard
            number="#04"
            label="예상 못한 지출"
            summary={formData.unexpected}
            isEmpty={!formData.unexpected.trim()}
            onClick={() => setActivePopup('unexpected')}
          />
        </div>
        <div className="border-b md:border-r border-af-border md:col-span-2 lg:col-span-1">
          <InputCard
            number="#05"
            label="재무 목표 & 고민"
            summary={formData.goal}
            isEmpty={!formData.goal.trim()}
            onClick={() => setActivePopup('goal')}
          />
        </div>
      </div>

      {/* CTA */}
      <div className="border-t-2 border-af-border p-6 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="font-mono text-af-red text-sm tracking-tight leading-relaxed text-center md:text-left">
          <p>입력한 정보를 바탕으로 AI가</p>
          <p>이번 달 맞춤 재무 리포트를 생성합니다.</p>
        </div>
        <button
          onClick={handleStart}
          className="group border-2 border-af-red px-8 py-4 font-mono font-bold text-af-red tracking-tight hover:bg-af-red hover:text-af-yellow transition-all text-sm md:text-base whitespace-nowrap"
        >
          자산 및 생활 설계 시작
          <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>

      {/* Popups */}
      <SimplePopup
        isOpen={activePopup === 'income'}
        onClose={() => setActivePopup(null)}
        title="월 소득"
        subtitle="세후 실수령액 기준으로 자유롭게 입력해 주세요"
        placeholder="예: 230만원, 월급 210에 알바 30, 프리랜서 월 평균 350"
        value={formData.income}
        onChange={setIncome}
      />

      <ExpensePopup
        isOpen={activePopup === 'expenses'}
        onClose={() => setActivePopup(null)}
      />

      <SimplePopup
        isOpen={activePopup === 'savings'}
        onClose={() => setActivePopup(null)}
        title="저축 목표"
        subtitle="이번 달 목표 저축액 또는 저축 방식을 입력해 주세요"
        placeholder="예: 매달 50만원 저축 목표, 월급의 20% 저축 중"
        value={formData.savings}
        onChange={setSavings}
      />

      <SimplePopup
        isOpen={activePopup === 'unexpected'}
        onClose={() => setActivePopup(null)}
        title="예상 못한 지출"
        subtitle="이번 달 계획에 없던 지출을 입력해 주세요"
        placeholder="예: 친구 결혼 축의금 10만원, 핸드폰 수리비 20만원"
        value={formData.unexpected}
        onChange={setUnexpected}
        multiline
      />

      <SimplePopup
        isOpen={activePopup === 'goal'}
        onClose={() => setActivePopup(null)}
        title="재무 목표 & 고민"
        subtitle="돈에 관한 목표나 고민을 자유롭게 털어놓으세요"
        placeholder="예: 6개월 안에 300만원 모아서 유럽 여행 가고 싶어. 근데 매달 남는 돈이 없어서 어떻게 해야 할지 모르겠어."
        value={formData.goal}
        onChange={setGoal}
        multiline
      />
    </section>
  )
}
