import OpenAI from 'openai'
import { FormData } from '@/types'

export function getOpenAI() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
}

export function buildSystemPrompt(): string {
  return `당신은 20대 한국 청년들의 자산 설계 전문가이자 따뜻한 멘토입니다.
사용자의 재무 정보를 분석하여 아래 정확한 형식으로만 리포트를 작성하세요.

금액 파싱 규칙:
- "2백만원", "2백만", "200만" → 2,000,000원
- "230" (단위 없이) → 230만원으로 해석
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
- [관찰 7]

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
  const lines = [
    `현재 나이: ${formData.age || '미입력'}`,
    `현재 자산: ${formData.assets || '미입력'}`,
    `현재 부채: ${formData.debt || '미입력'}`,
    `올해 연말 목표 자산: ${formData.goalEndOfYear || '미입력'}`,
    `4년 후 목표 자산: ${formData.goalIn4Years || '미입력'}`,
    `서른살 목표 자산: ${formData.goalAt30 || '미입력'}`,
    `현재 지출 (고정+변동): ${formData.expenses || '미입력'}`,
    `주거 형태: ${formData.housing || '미입력'}`,
    `부모님 지원 금액: ${formData.parentSupport || '없음'}`,
    `현재 소득 및 업종: ${formData.income || '미입력'}`,
    `일주일 중 자유시간: ${formData.freeTime || '미입력'}`,
    `기타 특이사항 및 자기소개: ${formData.etc || '없음'}`,
  ]

  return `다음은 사용자가 입력한 자산 생활 설계 정보입니다:\n\n${lines.join('\n')}\n\n위 정보를 바탕으로 안티프리즈 자산 생활 설계 리포트를 지정된 형식으로 작성해주세요.`
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
