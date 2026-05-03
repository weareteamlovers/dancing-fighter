```
 █████╗ ███╗   ██╗████████╗██╗███████╗██████╗ ███████╗███████╗███████╗
██╔══██╗████╗  ██║╚══██╔══╝██║██╔════╝██╔══██╗██╔════╝██╔════╝╚══███╔╝
███████║██╔██╗ ██║   ██║   ██║█████╗  ██████╔╝█████╗  █████╗    ███╔╝ 
██╔══██║██║╚██╗██║   ██║   ██║██╔══╝  ██╔══██╗██╔══╝  ██╔══╝   ███╔╝  
██║  ██║██║ ╚████║   ██║   ██║██║     ██║  ██║███████╗███████╗███████╗
╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚═╝╚═╝     ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝
```

<div align="center">

**안티프리즈 — 얼어붙지 않는 20대의 금융 일기장**

[![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![OpenAI](https://img.shields.io/badge/GPT--4o-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com)

[dancingfighter.com](https://dancingfighter.com)

</div>

---

## ☀ 우리가 돈이 없지, 사랑이 없냐

> *돈이 별로 없을 때도 우리들은 얼어붙지 않을거야.*

경제적인 어려움 속에서도 20대 청춘의 뜨거움은 식지 않는다.  
**안티프리즈**는 12가지 질문으로 나만의 자산 생활 설계도를 만들어주는 AI 서비스다.  
회원가입 없이, 지금 바로.

---

## 빠른 시작

```bash
# 1. 클론
git clone https://github.com/weareteamlovers/dancing-fighter.git
cd dancing-fighter

# 2. 의존성 설치
npm install

# 3. 환경변수 설정
cp .env.local.example .env.local
```

`.env.local` 파일을 열고 API 키를 입력한다:

```env
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

```bash
# 4. 개발 서버 실행
npm run dev
```

→ **[http://localhost:3000](http://localhost:3000)** 에서 확인

---

## 기술 스택

```
Frontend   Next.js 14 (App Router) + TypeScript
Styling    Tailwind CSS — 커스텀 디자인 토큰 (af-yellow / af-red / af-border)
AI         OpenAI GPT-4o — 스트리밍 응답
State      Zustand
Font       Space Mono + DotGothic16
```

---

## 디자인 시스템

| 토큰 | 색상 | 용도 |
|------|------|------|
| `af-yellow` | `#FFFF77` | 배경 |
| `af-red` | `#8E1606` | 텍스트 |
| `af-border` | `#CA1E08` | 보더 / 완료 배지 |

에디토리얼 / 매거진 감성. 인쇄물처럼.

---

## 프로젝트 구조

```
dancing-fighter/
├── app/
│   ├── page.tsx           # 홈 (Hero → Checklist → 입력)
│   ├── report/page.tsx    # AI 리포트 결과
│   ├── api/report/        # GPT-4o 스트리밍 엔드포인트
│   └── layout.tsx
├── components/
│   └── home/
│       ├── EntryCard.tsx  # 12개 입력 카드
│       └── EntryPopup.tsx # 입력 팝업 모달
├── store/
│   └── useFormStore.ts    # Zustand 전역 상태
└── lib/
    └── openai.ts          # GPT 프롬프트 로직
```

---

## 핵심 플로우

```
Hero 섹션
    ↓
☀ 마키 배너 (돈이 별로 없을 때도 우리들은 얼어붙지 않을거야)
    ↓
Checklist! — 12가지 항목 입력
    (나이 / 자산 / 부채 / 목표 / 지출 / 주거 / 소득 ···)
    ↓
자산 및 생활 설계 시작 →
    ↓
GPT-4o 스트리밍 리포트 (/report)
```

---

## 환경변수

| 변수 | 필수 | 설명 |
|------|:----:|------|
| `OPENAI_API_KEY` | ✅ | OpenAI API 키 |
| `NEXT_PUBLIC_APP_URL` | ✅ | 앱 도메인 URL |

---

## 배포

```bash
# Vercel (권장)
vercel --prod
```

---

<div align="center">

**팀사랑꾼들** · [Instagram](https://instagram.com) · [dancingfighter.com](https://dancingfighter.com)

*돈은 아껴도 사랑은 아끼지 말아요 :)*

</div>
