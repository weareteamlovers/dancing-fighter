export interface FormData {
  age: string           // #01 현재 나이
  assets: string        // #02 현재 자산
  debt: string          // #03 현재 부채
  goalEndOfYear: string // #04 1개월 후 목표 자산
  goalIn4Years: string  // #05 3개월 후 목표 자산
  goalAt30: string      // #06 6개월 후 목표 자산
  expenses: string      // #07 현재 지출 (고정, 변동)
  housing: string       // #08 주거 형태
  parentSupport: string // #09 부모님 지원 (선택)
  income: string        // #10 현재 소득 및 업종 (선택)
  freeTime: string      // #11 일주일 중 자유시간
  etc: string           // #12 기타 특이사항 및 자기소개
}

export type FormField = keyof FormData
