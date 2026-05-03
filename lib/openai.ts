import OpenAI from 'openai'
import { FormData } from '@/types'

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export function buildSystemPrompt(): string {
  return `당신은 20대 한국 청년들의 재무 분석 전문가이자 따뜻한 멘토입니다.
사용자의 재무 정보를 분석하여 아래 정확한 형식으로만 리포트를 작성하세요.

금액 파싱 규칙:
- "2백만원", "2백만", "200만" → 2,000,000원
- "월급 230" → 230만원 (2,300,000원)
- "50" (단위 없이) → 50만원으로 해석
- 숫자만 있고 단위 없으면 만원 단위로 해석

반드시 아래 형식만 사용하세요 (다른 섹션이나 추가 텍스트 금지):

HEADLINE:
[사용자 상황을 담은 짧은 제목. 한 문장, 10~20자, 희망적·응원하는 어조. 예: 취미생활을 유지하며 모아요!]

CHECK_POINT:
- [관찰 1: 구체적 수치 포함한 현황 분석]
- [관찰 2]
- [관찰 3]
- [관찰 4]
- [관찰 5]
- [관찰 6]

ADVICE:
1. [즉시 실천 가능한 조언 1]
2. [조언 2]
3. [조언 3]
4. [조언 4]

규칙:
- HEADLINE: 공감 가고 희망적인 한 문장
- CHECK_POINT: 사실 기반 분석, 수치 포함, 각 항목 1~2문장
- ADVICE: 현실적이고 구체적, 20대 눈높이에 맞게
- 따뜻하고 응원하는 톤 유지`
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

월 소득: ${formData.income || '미입력'}
지출 내역:
${expenseLines || '  - 미입력'}
저축 목표: ${formData.savings || '미입력'}
예상 못한 지출: ${formData.unexpected || '없음'}
재무 목표/고민: ${formData.goal || '미입력'}

위 정보를 바탕으로 안티프리즈 재무 리포트를 지정된 형식으로 작성해주세요.`
}

export function parseReport(text: string): {
  headline: string
  checkPoints: string[]
  advice: string[]
} {
  const headlineMatch = text.match(/HEADLINE:\s*\n([\s\S]*?)(?=\n\nCHECK_POINT|\nCHECK_POINT)/)
  const headline = headlineMatch?.[1]?.trim() ?? ''

  const checkPointMatch = text.match(/CHECK_POINT:\s*\n([\s\S]*?)(?=\n\nADVICE:|\nADVICE:|$)/)
  const checkPoints = (checkPointMatch?.[1] ?? '')
    .split('\n')
    .filter((l) => l.trimStart().startsWith('- '))
    .map((l) => l.replace(/^\s*- /, '').trim())
    .filter(Boolean)

  const adviceMatch = text.match(/ADVICE:\s*\n([\s\S]*)$/)
  const advice = (adviceMatch?.[1] ?? '')
    .split('\n')
    .filter((l) => /^\d+\./.test(l.trim()))
    .map((l) => l.replace(/^\d+\.\s*/, '').trim())
    .filter(Boolean)

  return { headline, checkPoints, advice }
}
