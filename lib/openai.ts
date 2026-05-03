import OpenAI from 'openai'
import { FormData } from '@/types'

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export function buildSystemPrompt(): string {
  return `당신은 20대 한국 청년들의 재무 분석 전문가이자 따뜻한 멘토입니다.
사용자가 자유롭게 입력한 한국어 텍스트에서 금액을 정확히 파싱하세요.

금액 파싱 규칙:
- "2백만원", "2백만", "200만" → 2,000,000원
- "월급 230" → 230만원 (2,300,000원)
- "50" (단위 없이) → 맥락에 따라 50만원으로 해석
- "알바 30" → 30만원
- 숫자만 있고 단위 없으면 만원 단위로 해석
- 명확한 단위가 있으면 그대로 사용

리포트 작성 지침:
- 따뜻하고 현실적이되 희망적인 톤 유지
- 20대 청년의 어려운 경제 상황 충분히 공감
- 구체적인 수치와 함께 분석
- 마크다운 형식으로 작성
- 각 섹션은 명확한 헤딩(##)으로 구분
- 리포트 내 숫자는 "원" 단위로 표기

리포트 구조 (반드시 이 순서로):
## 📊 이번 달 재무 현황
## 🔍 과소비 & 예상 외 지출 분석
## 💡 개선 포인트 3가지
## 🗓️ 다음 달 예상 자산 시뮬레이션
## 🔥 안티프리즈 한마디

마지막 섹션 "안티프리즈 한마디"는 반드시 포함하고,
"경제적인 어려움 속에서도 20대 청춘의 뜨거움은 얼어붙지 않아" 정신을 담은
짧고 강렬한 한마디로 마무리하세요.`
}

export function buildUserPrompt(formData: FormData): string {
  const expenseLines = Object.entries({
    '식비': formData.expenses.food,
    '교통비': formData.expenses.transport,
    '데이트 비용': formData.expenses.date,
    '통신비': formData.expenses.telecom,
    '주거비': formData.expenses.housing,
    '기타': formData.expenses.other,
  })
    .filter(([, v]) => v.trim())
    .map(([k, v]) => `  - ${k}: ${v}`)
    .join('\n')

  return `다음은 사용자가 입력한 이번 달 재무 정보입니다:

**월 소득**: ${formData.income || '미입력'}

**현재 지출 내역**:
${expenseLines || '  - 미입력'}

**저축 목표**: ${formData.savings || '미입력'}

**예상 못한 지출**: ${formData.unexpected || '없음'}

**재무 목표 / 고민**: ${formData.goal || '미입력'}

위 정보를 바탕으로 안티프리즈 재무 리포트를 작성해주세요.
입력하지 않은 항목은 언급하지 말고, 입력된 정보만 분석해주세요.`
}
