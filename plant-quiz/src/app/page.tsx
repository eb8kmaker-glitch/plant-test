import Link from 'next/link'
import { Metadata } from 'next'
import { PlantIllustration } from '@/components/shared/PlantIllustration'

export const metadata: Metadata = {
  title: '나에게 맞는 식물은? 🌿',
  description: '단순 예쁜 식물이 아니라, 내 생활에서 실제로 살아남는 식물을 찾아드려요.',
  openGraph: {
    title: '나에게 맞는 식물은? 🌿',
    description: '생활패턴 기반 식물 큐레이션 서비스 — 실제로 오래 살아남을 식물 추천',
    images: ['/og-default.png'],
  },
}

const TAGS = [
  { icon: '🌞', label: '채광 분석' },
  { icon: '💧', label: '물주기 패턴' },
  { icon: '🏠', label: '공간 매칭' },
  { icon: '🐾', label: '반려동물 안전' },
  { icon: '✨', label: '성향 큐레이션' },
]

export default function HomePage() {
  return (
    <main className="min-h-screen max-w-md mx-auto flex flex-col items-center px-6 py-10"
      style={{ background: 'linear-gradient(160deg, #E8F0E4 0%, #F5F0E8 60%, #EDE8D8 100%)' }}
    >
      {/* 식물 캐릭터 */}
      <div className="mb-2 mt-4">
        <PlantIllustration plantId="monstera" size={160} animated />
      </div>

      {/* 뱃지 */}
      <div className="text-[11px] font-bold tracking-[0.12em] text-forest bg-white/50 border border-sage-200 px-4 py-1.5 rounded-full mb-5">
        🌿 PLANT CURATION
      </div>

      {/* 타이틀 */}
      <h1 className="text-[30px] font-extrabold text-text-dark text-center leading-tight tracking-tight mb-3">
        나에게 맞는<br />식물은?
      </h1>

      {/* 서브 카피 */}
      <p className="text-[14.5px] text-text-mid text-center leading-[1.75] mb-7">
        단순 예쁜 식물이 아니라<br />
        <strong className="text-forest">내 생활에서 실제로 살아남는</strong><br />
        식물을 찾아드려요
      </p>

      {/* 태그들 */}
      <div className="flex flex-wrap gap-2 justify-center mb-9">
        {TAGS.map(t => (
          <span key={t.label} className="bg-white/80 text-text-mid text-[12px] px-3 py-1.5 rounded-full border border-mint/60 font-medium">
            {t.icon} {t.label}
          </span>
        ))}
      </div>

      {/* CTA 버튼 */}
      <Link href="/test"
        className="w-full bg-forest text-white text-center py-5 rounded-2xl text-[16px] font-bold tracking-tight shadow-[0_8px_24px_rgba(61,107,79,0.25)] hover:bg-sage-800 active:scale-[0.97] transition-all block"
      >
        테스트 시작하기 →
      </Link>

      <p className="mt-4 text-[12px] text-text-soft text-center">
        약 3분 소요 · 8가지 질문
      </p>

      {/* 하단 안내 */}
      <div className="mt-10 bg-white/60 rounded-2xl p-5 w-full border border-sage-100">
        <p className="text-[11.5px] text-text-soft text-center mb-3 font-semibold tracking-wide uppercase">이런 분께 추천해요</p>
        <div className="flex flex-col gap-2">
          {[
            '🪴 식물 키우다 자꾸 죽이는 분',
            '😅 어떤 식물을 사야 할지 모르겠는 분',
            '🏠 인테리어에 식물을 더하고 싶은 분',
            '🐾 반려동물과 함께 사는 집사',
          ].map(item => (
            <p key={item} className="text-[13px] text-text-mid">{item}</p>
          ))}
        </div>
      </div>
    </main>
  )
}
