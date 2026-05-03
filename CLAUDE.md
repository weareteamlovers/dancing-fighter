# 안티프리즈 (ANTIFREEZE) — CLAUDE.md

## 프로젝트 개요
- **서비스명**: 안티프리즈 / ANTIFREEZE
- **깃헙 레포**: dancing-fighter
- **도메인**: dancingfighter.com
- **슬로건**: 경제적인 어려움 속에서도 20대 청춘의 뜨거움은 얼어붙지 않을거야.
- **타겟**: 20대 한국 청년
- **핵심 기능**: 월별 AI 재무 리포트, 예상 못한 지출 추적, 과소비 패턴 분석

## 디자인 시스템 (Figma 기반)
피그마 파일: `https://www.figma.com/design/rHTlrQFwmz64g3LHGsU21M/안티프리즈`

### 색상
- **배경**: `#FFFF77` (형광 옐로우) — `bg-af-yellow`
- **텍스트**: `#8E1606` (크림슨 레드) — `text-af-red`
- **보더**: `#CA1E08` (브라이트 레드) — `border-af-border`

### 폰트
- **Space Mono** — 모노스페이스 에디토리얼 스타일
- `font-mono` 클래스로 전체 일관 적용

### 스타일 원칙
- 에디토리얼/매거진 감성 (신문, 인쇄물 느낌)
- 보더로 섹션 구분
- 과채류 이미지(호박, 토마토) 사용 가능
- 넓은 여백, 선명한 색 대비

## 기술 스택
- **프레임워크**: Next.js 14 (App Router)
- **언어**: TypeScript
- **스타일**: Tailwind CSS (커스텀 토큰 설정됨)
- **AI**: OpenAI GPT-4o (스트리밍)
- **상태 관리**: Zustand
- **폼**: React Hook Form (필요 시)

## 프로젝트 구조
```
dancing-fighter/
├── app/
│   ├── page.tsx              # 홈 (히어로 + 입력섹션)
│   ├── report/page.tsx       # AI 리포트 결과 페이지
│   ├── api/report/route.ts   # GPT API 엔드포인트 (스트리밍)
│   ├── layout.tsx            # 루트 레이아웃 (Space Mono 폰트)
│   └── globals.css           # 글로벌 스타일
├── components/
│   ├── hero/HeroSection.tsx        # 랜딩 히어로
│   ├── input/
│   │   ├── InputSection.tsx        # 전체 입력 섹션
│   │   ├── InputCard.tsx           # 클릭 → 팝업 카드
│   │   └── popups/
│   │       ├── PopupWrapper.tsx    # 모달 레이아웃
│   │       ├── ExpensePopup.tsx    # 지출 (세분화)
│   │       └── SimplePopup.tsx     # 단일 입력 팝업
│   └── report/ReportDisplay.tsx    # 리포트 표시 (스트리밍)
├── store/useFormStore.ts      # Zustand 폼 상태
├── lib/openai.ts              # GPT 프롬프트 로직
└── types/index.ts             # TypeScript 타입
```

## 환경변수
`.env.local` 파일에 설정:
```
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 1차 MVP 요구사항
1. ✅ 피그마 디자인 100% 구현 (#FFFF77 배경, #8E1606 텍스트, Space Mono)
2. ✅ 회원가입 없이 동작
3. ✅ 히어로 → 스크롤 → 입력 → /report 페이지 플로우
4. ✅ 입력 카드 클릭 시 팝업 등장
5. ✅ 지출 팝업: 식비/교통비/데이트/통신비/주거비/기타 세분화
6. ✅ 자유형 텍스트 입력 (GPT가 파싱)
7. ✅ GPT-4o 스트리밍 리포트 출력

## 개발 명령어
```bash
npm install
cp .env.local.example .env.local
# .env.local에 OPENAI_API_KEY 입력
npm run dev
```

## 다음 단계 (2차)
- 매주 일요일 예상 못한 지출 입력 알림
- 회원가입 / 히스토리 저장
- 리포트 PDF 저장/공유
- 지난 달 대비 변화 추적

## 코딩 컨벤션
- 모든 컴포넌트: `'use client'` 또는 서버 컴포넌트 명시
- 상태는 Zustand store에서 관리
- API 응답은 스트리밍 방식 유지
- 한국어 UI, 영어 코드 변수명
- tailwind 클래스에서 `af-` 접두사 사용 (커스텀 토큰)
