export interface ExpenseBreakdown {
  food: string        // 식비
  transport: string   // 교통비
  date: string        // 데이트 비용
  telecom: string     // 통신비
  housing: string     // 주거비
  other: string       // 기타
}

export interface FormData {
  income: string              // 월 소득 (자유 입력)
  expenses: ExpenseBreakdown  // 지출 세분화
  savings: string             // 저축 목표
  unexpected: string          // 예상 못한 지출
  goal: string                // 재무 목표/고민
}

export interface ReportRequest {
  formData: FormData
}

export interface ReportSection {
  title: string
  content: string
  emoji?: string
}
