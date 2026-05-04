# 안티프리즈 (ANTIFREEZE) — CLAUDE.md

## 디자인 시스템 (Figma 기반)
피그마 파일: `https://www.figma.com/design/rHTlrQFwmz64g3LHGsU21M/안티프리즈`

### 색상
- **배경**: `#FFFF77` (형광 옐로우) — `bg-af-yellow`
- **텍스트**: `#8E1606` (크림슨 레드) — `text-af-red`
- **보더**: `#CA1E08` (브라이트 레드) — `border-af-border`

### 폰트
- **Space Mono** — 모노스페이스 에디토리얼 스타일
- **DotGothic16** — 헤딩 및 강조 텍스트
- `font-mono` 클래스로 본문 일관 적용

### 스타일 원칙
- 에디토리얼/매거진 감성 (신문, 인쇄물 느낌)
- 보더로 섹션 구분
- 과채류 이미지(호박, 토마토 등) 사용
- 넓은 여백, 선명한 색 대비
- tailwind 클래스에서 `af-` 접두사 사용 (커스텀 토큰)

## 기술 스택
- **프레임워크**: Next.js 14 (App Router)
- **언어**: TypeScript
- **스타일**: Tailwind CSS (커스텀 토큰 설정됨)
- **AI**: OpenAI GPT-4o (스트리밍)
- **상태 관리**: Zustand
