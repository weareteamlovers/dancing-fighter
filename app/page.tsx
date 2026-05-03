'use client'

import { useRouter } from 'next/navigation'
import EntryCard from '@/components/home/EntryCard'
import { useFormStore } from '@/store/useFormStore'

const HERO_IMG = 'https://www.figma.com/api/mcp/asset/2bea2929-1c1c-4388-8fac-d61f9a46f697'
const FOOTER_IMG = 'https://www.figma.com/api/mcp/asset/32ecb0f9-e15a-48c1-99bd-bf20569bf1d4'

const ENTRIES = [
  {
    num: '01',
    field: 'age' as const,
    title: '현재 나이',
    placeholder: 'ex) 24살',
    imgSrc: 'https://www.figma.com/api/mcp/asset/8c8cc715-c22f-4729-a30c-f7acddb563ef',
    imgAlt: '샐러드',
    imgStyle: { width: '123%', height: '136%', left: '-12%', top: '-15%' },
  },
  {
    num: '02',
    field: 'assets' as const,
    title: '현재 자산\n(ex.예금 100만원\n  주식투자 200만원)',
    placeholder: 'ex) 예금 100만원, 주식투자 200만원',
    imgSrc: 'https://www.figma.com/api/mcp/asset/8c056564-11eb-4d04-94d2-15db257603e7',
    imgAlt: '사과',
    imgStyle: { width: '267%', height: '169%', left: '-85%', top: '-42%' },
  },
  {
    num: '03',
    field: 'debt' as const,
    title: '현재 부채\n(ex.학자금 대출 2000만원)',
    placeholder: 'ex) 학자금 대출 2000만원',
    imgSrc: 'https://www.figma.com/api/mcp/asset/b555f641-eb09-43da-8be3-062edd4311c0',
    imgAlt: '호박',
    imgStyle: { width: '137%', height: '130%', left: '-17%', top: '-13%' },
  },
  {
    num: '04',
    field: 'goalEndOfYear' as const,
    title: '올해 연말\n목표 자산',
    placeholder: 'ex) 500만원',
    imgSrc: 'https://www.figma.com/api/mcp/asset/014bd5fc-e5d8-48c5-aa4e-4a2411959fce',
    imgAlt: '배',
    imgStyle: { width: '226%', height: '381%', left: '-64%', top: '-169%' },
  },
  {
    num: '05',
    field: 'goalIn4Years' as const,
    title: '4년 후\n목표 자산',
    placeholder: 'ex) 5000만원',
    imgSrc: 'https://www.figma.com/api/mcp/asset/76497de5-18d4-48f4-b17b-3229db32b7f7',
    imgAlt: '토마토',
    imgStyle: { width: '774%', height: '489%', left: '-290%', top: '-114%' },
  },
  {
    num: '06',
    field: 'goalAt30' as const,
    title: '서른살\n목표 자산',
    placeholder: 'ex) 1억원',
    imgSrc: 'https://www.figma.com/api/mcp/asset/94b5a728-3fd6-4182-b0ae-f74d9a919ac9',
    imgAlt: '브로콜리',
    imgStyle: { width: '139%', height: '132%', left: '-21%', top: '-12%' },
  },
  {
    num: '07',
    field: 'expenses' as const,
    title: '현재 지출\n( 고정, 변동 )',
    placeholder: 'ex) 월세 50만원, 식비 30만원, 교통비 10만원',
    imgSrc: 'https://www.figma.com/api/mcp/asset/9e92746e-771c-4fa4-8616-d2ba8349a828',
    imgAlt: '콜리플라워',
    imgStyle: { width: '203%', height: '128%', left: '-51%', top: '-12%' },
  },
  {
    num: '08',
    field: 'housing' as const,
    title: '주거 형태\n( 월세, 전세, 매매, 본가 )',
    placeholder: 'ex) 월세 보증금 500 / 40만원',
    imgSrc: 'https://www.figma.com/api/mcp/asset/8879e53b-0856-4219-a805-01fac16d9aaa',
    imgAlt: '파파야',
    imgStyle: { width: '110%', height: '156%', left: '-4%', top: '-26%' },
  },
  {
    num: '09',
    field: 'parentSupport' as const,
    title: '(선택) 부모님으로부터\n지원받는 금액이 있어요',
    placeholder: 'ex) 월 30만원 용돈',
    imgSrc: 'https://www.figma.com/api/mcp/asset/6745e321-2c50-4184-a02d-3030b20b1ae6',
    imgAlt: '상추',
    imgStyle: { width: '102%', height: '77%', left: '-1%', top: '13%' },
  },
  {
    num: '10',
    field: 'income' as const,
    title: '(선택) 현재 소득 및 업종',
    placeholder: 'ex) 직장인 월 230만원, IT업종',
    imgSrc: 'https://www.figma.com/api/mcp/asset/93439a6c-2121-4f41-a076-0bf3d45b1e04',
    imgAlt: '고추',
    imgStyle: { width: '84%', height: '113%', left: '11%', top: '-10%' },
  },
  {
    num: '11',
    field: 'freeTime' as const,
    title: '일주일 중 자유시간',
    placeholder: 'ex) 주 2일 주말, 평일 저녁 2~3시간',
    imgSrc: 'https://www.figma.com/api/mcp/asset/fe82d1ed-9aa1-4c46-996d-e36aebb3e7b9',
    imgAlt: '아보카도',
    imgStyle: { width: '258%', height: '184%', left: '-79%', top: '-41%' },
  },
  {
    num: '12',
    field: 'etc' as const,
    title: '기타 특이사항\n및 자기소개',
    placeholder: 'ex) 취업준비생, 사이드 프로젝트 중, 여행 좋아함',
    imgSrc: 'https://www.figma.com/api/mcp/asset/7579abf5-3217-4488-8f1b-7c9d972b2cea',
    imgAlt: '버섯',
    imgStyle: { width: '164%', height: '116%', left: '-39%', top: '-9%' },
  },
]

export default function HomePage() {
  const router = useRouter()
  const { isComplete } = useFormStore()

  const handleSubmit = () => {
    if (!isComplete()) {
      alert('최소 한 가지 이상 입력해주세요.')
      return
    }
    router.push('/report')
  }

  return (
    <div className="bg-af-yellow flex flex-col w-full">

      {/* Hero */}
      <header
        className="border border-af-border w-full h-[700px] relative overflow-hidden flex flex-col items-center justify-center shrink-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_IMG})` }}
      >
        <div className="absolute inset-0 bg-black/5 pointer-events-none" />
        <div className="relative flex flex-col gap-5 items-center text-center text-af-yellow px-10 max-w-[600px] w-full text-shadow-hero">
          <h1
            className="text-[60px] leading-[1.1] tracking-[0.01em] w-full"
            style={{ fontFamily: 'DotGothic16, "Noto Sans KR", sans-serif' }}
          >
            안티프리즈:
          </h1>
          <p className="font-mono text-[13px] tracking-[-0.03em] leading-[1.2] w-full whitespace-pre-line">
            {`청춘을 얼리지 않으면서 지속가능한 지출 계획을 세워줘요.\n\n매주 일요일 밤 예정에 없던 지출을 기록하면, 다음 주 같은 실수를 막아줘요.\n\n돈을 못 모으는 이유보다, 무너지는 순간을 찾아줘요.\n\n이번 달 소비의 원인을 감정과 상황으로 분석해요.`}
          </p>
        </div>
      </header>

      {/* Nav */}
      <nav
        className="bg-af-yellow border-b border-l border-r border-af-border w-full flex items-center justify-between px-5 py-[10px] text-af-red text-base tracking-[0.01em] whitespace-nowrap overflow-hidden shrink-0"
        style={{ fontFamily: 'DotGothic16, "Noto Sans KR", sans-serif', height: '34px' }}
      >
        <span className="underline decoration-solid leading-[0.9]">Home :)</span>
        <div className="flex items-center gap-2 text-center">
          <span className="leading-[0.9]">우리가 돈이 없지, 사랑이 없냐!</span>
          <span className="leading-[0.9]">•</span>
          <span className="leading-[0.9]">돈은 아껴도 사랑은 아끼지 말아요 :팀사랑꾼들</span>
        </div>
        <span className="text-center leading-[0.9]">About Me</span>
      </nav>

      {/* Status bar */}
      <div className="bg-af-yellow border border-af-border w-full shrink-0" style={{ height: 0 }} />

      {/* Checklist heading */}
      <header className="border-l border-r border-af-border w-full px-[10px] py-[150px] flex flex-col items-center gap-[30px] text-center text-af-red shrink-0 overflow-hidden">
        <h2
          className="text-[45px] leading-[0.9] tracking-[-0.03em] whitespace-nowrap"
          style={{ fontFamily: 'DotGothic16, "Noto Sans KR", sans-serif' }}
        >
          Checklist!
        </h2>
        <div className="font-mono text-base tracking-[-0.03em] leading-[1.3]">
          <p>자산과 생활 설계를 위해 현재 상황을 알려주세요.</p>
          <p>
            12가지 사항만 간단히 입력하면 돼요!
            <br />
            똑똑한 AI가 잘 해석할테니 자유로운 양식으로 작성하면 돼요.
          </p>
        </div>
      </header>

      {/* Entry cards grid */}
      <ol className="border border-af-border w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-hidden shrink-0 pb-10">
        {ENTRIES.map((entry) => (
          <EntryCard key={entry.num} {...entry} />
        ))}
      </ol>

      {/* Footer */}
      <footer className="border-t border-af-border w-full py-[173px] relative overflow-hidden flex flex-col items-center justify-center shrink-0">
        <img
          alt="채소 모음"
          src={FOOTER_IMG}
          className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none"
        />
        <div className="relative flex flex-col gap-7 items-center w-[298px]">
          <div
            className="text-[45px] text-af-border leading-[0.9] tracking-[-0.03em] text-center whitespace-nowrap cursor-pointer"
            style={{ fontFamily: 'DotGothic16, "Noto Sans KR", sans-serif' }}
            onClick={handleSubmit}
          >
            {'> 자산 및 생활 설계 시작'}
          </div>
          <div
            className="text-[45px] text-af-border leading-[0.9] tracking-[-0.03em] text-center whitespace-nowrap"
            style={{ fontFamily: 'DotGothic16, "Noto Sans KR", sans-serif' }}
          >
            (feat.팀사랑꾼들 AI)
          </div>
          <div
            className="text-[45px] text-af-border leading-[0.9] tracking-[-0.03em] text-center whitespace-nowrap"
            style={{ fontFamily: 'DotGothic16, "Noto Sans KR", sans-serif' }}
          >
            {'> Instagram'}
          </div>
        </div>
      </footer>

    </div>
  )
}
