# 안티프리즈 (ANTIFREEZE)

> 경제적인 어려움 속에서도 20대 청춘의 뜨거움은 얼어붙지 않을거야.

20대를 위한 경제 생활 AI 리포트 서비스. 지난 달의 과소비와 예상 못한 지출 습관을 추적하고, 실수를 반복하지 않도록 돕습니다.

## 빠른 시작

```bash
# 1. 의존성 설치
npm install

# 2. 환경변수 설정
cp .env.local.example .env.local
# .env.local 파일에 OPENAI_API_KEY 입력

# 3. 개발 서버 실행
npm run dev
```

→ http://localhost:3000

## 기술 스택

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **OpenAI GPT-4o** (스트리밍)
- **Zustand** (상태 관리)

## 환경변수

| 변수 | 설명 |
|------|------|
| `OPENAI_API_KEY` | OpenAI API 키 |
| `NEXT_PUBLIC_APP_URL` | 앱 URL |

## 1차 MVP 기능

- 회원가입 없이 바로 사용
- 랜딩 → 입력 → AI 리포트 단일 플로우
- 지출 항목 세분화 (식비/교통/데이트/통신/주거/기타)
- 자유형 텍스트 입력 ("2백만원", "월급 230" 등)
- GPT-4o 스트리밍 리포트 생성

## 배포

```bash
# Vercel (권장)
vercel --prod
```

---

dancingfighter.com
