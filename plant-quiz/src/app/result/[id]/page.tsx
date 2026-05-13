'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { PLANTS } from '@/data/plants'
import { Plant, TestResult } from '@/types'
import { PlantIllustration } from '@/components/shared/PlantIllustration'
import { getDifficultyLabel, getMatchComment } from '@/lib/utils'

const WATERING_LABEL: Record<string, string> = {
  very_low: '월 1~2회',
  low: '주 1회',
  medium: '2~3일에 1회',
  high: '매일',
}

export default function ResultPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [plant, setPlant] = useState<Plant | null>(null)
  const [score, setScore] = useState(0)
  const [copied, setCopied] = useState(false)
  const shareCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const raw = localStorage.getItem(`result_${id}`)
    if (!raw) { router.push('/'); return }
    const result: TestResult = JSON.parse(raw)
    const found = PLANTS.find(p => p.id === result.plantId)
    if (!found) { router.push('/'); return }
    setPlant(found)
    setScore(result.matchScore)
  }, [id])

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleKakao() {
    if (typeof window !== 'undefined' && (window as any).Kakao) {
      (window as any).Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: `나는 ${plant?.name}형! 🌿`,
          description: plant?.personaTitle || '',
          imageUrl: `${window.location.origin}/api/og?plant=${plant?.id}&score=${score}`,
          link: { mobileWebUrl: window.location.href, webUrl: window.location.href },
        },
        buttons: [{ title: '나도 테스트하기', link: { mobileWebUrl: window.location.origin, webUrl: window.location.origin } }],
      })
    } else {
      handleCopyLink()
    }
  }

  function handleInsta() {
    alert('인스타그램 앱에서 스토리로 공유해보세요! 링크가 클립보드에 복사됩니다.')
    handleCopyLink()
  }

  if (!plant) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="flex gap-2">
          {[0,1,2].map(i => (
            <motion.div key={i} className="w-2.5 h-2.5 rounded-full bg-sage-400"
              animate={{ opacity: [0.3,1,0.3] }}
              transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>
    )
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    show: (i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.12, duration: 0.45, ease: 'easeOut' }
    }),
  }

  return (
    <div className="min-h-screen bg-cream pb-12 max-w-md mx-auto">

      {/* 히어로 영역 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(150deg, #E2EDD8 0%, #EDE8D8 100%)' }}
      >
        {/* 배경 데코 */}
        <div className="absolute right-[-20px] top-[-20px] w-32 h-32 rounded-full bg-sage-400/10" />
        <div className="absolute left-[-10px] bottom-[-10px] w-20 h-20 rounded-full bg-bark/10" />

        <div className="relative px-6 pt-10 pb-8 flex flex-col items-center">
          <div className="text-[11px] font-bold tracking-widest text-forest bg-white/60 px-4 py-1.5 rounded-full mb-5">
            🌿 당신의 식물 유형
          </div>

          <motion.div
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
          >
            <PlantIllustration plantId={plant.id} size={140} />
          </motion.div>

          <p className="text-[12px] text-text-soft mt-4 mb-1">궁합 지수</p>
          <motion.p
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="text-[42px] font-extrabold text-forest tracking-tight leading-none mb-2"
          >
            {score}%
          </motion.p>
          <p className="text-[13px] text-text-mid mb-3">{getMatchComment(score)}</p>

          <h1 className="text-[23px] font-extrabold text-text-dark text-center leading-tight tracking-tight mb-2">
            {plant.name}
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-text-mid bg-white/80 px-3 py-1 rounded-full border border-mint/50">
              {plant.type === 'indoor' ? '실내식물' : plant.type === 'succulent' ? '다육이' : plant.type === 'herb' ? '허브' : '야외식물'}
            </span>
            <span className="text-[12px] text-text-mid bg-white/80 px-3 py-1 rounded-full border border-mint/50">
              {getDifficultyLabel(plant.difficulty)}
            </span>
          </div>
        </div>
      </motion.div>

      {/* 카드 본문 */}
      <div className="px-4 pt-5 flex flex-col gap-4">

        {/* 퍼소나 타이틀 */}
        <motion.div custom={0} variants={cardVariants} initial="hidden" animate="show"
          className="bg-forest rounded-2xl p-5 text-white relative overflow-hidden"
        >
          <div className="absolute right-4 top-4 text-[40px] opacity-10">🌿</div>
          <p className="text-[11px] font-bold tracking-widest opacity-60 mb-2">나의 식물 유형</p>
          <p className="text-[18px] font-bold leading-snug">{plant.personaTitle}</p>
        </motion.div>

        {/* 추천 이유 */}
        <motion.div custom={1} variants={cardVariants} initial="hidden" animate="show"
          className="bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(61,107,79,0.07)]"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-sage-500" />
            <p className="text-[11px] font-bold tracking-widest text-sage-500 uppercase">추천 이유</p>
          </div>
          <p className="text-[14px] text-text-mid leading-[1.75]">{plant.reason}</p>
        </motion.div>

        {/* 관리 방법 */}
        <motion.div custom={2} variants={cardVariants} initial="hidden" animate="show"
          className="bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(61,107,79,0.07)]"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-sage-500" />
            <p className="text-[11px] font-bold tracking-widest text-sage-500 uppercase">관리 방법</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: '햇빛', value: plant.careSummary.lightDesc, icon: '☀️' },
              { label: '물 주기', value: WATERING_LABEL[plant.watering], icon: '💧' },
              { label: '난이도', value: plant.careSummary.difficultyLabel, icon: '🌱' },
              { label: '공간', value: plant.careSummary.spaceDesc, icon: '🏠' },
            ].map(item => (
              <div key={item.label} className="bg-sage-50 rounded-xl p-3">
                <p className="text-[10.5px] text-text-soft mb-1">{item.icon} {item.label}</p>
                <p className="text-[13px] font-semibold text-text-dark leading-tight">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 생존 팁 */}
        <motion.div custom={3} variants={cardVariants} initial="hidden" animate="show"
          className="bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(61,107,79,0.07)]"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-sage-500" />
            <p className="text-[11px] font-bold tracking-widest text-sage-500 uppercase">생존 핵심 팁</p>
          </div>
          <div className="bg-gradient-to-r from-sage-50 to-beige rounded-xl p-4 border-l-4 border-sage-400">
            <p className="text-[13.5px] text-text-mid leading-[1.7] italic">
              &ldquo;{plant.survivalTip}&rdquo;
            </p>
          </div>
        </motion.div>

        {/* 잘 맞는 사람 / 안 맞는 사람 */}
        <motion.div custom={4} variants={cardVariants} initial="hidden" animate="show"
          className="bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(61,107,79,0.07)]"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-sage-500" />
            <p className="text-[11px] font-bold tracking-widest text-sage-500 uppercase">궁합</p>
          </div>
          <p className="text-[11.5px] font-semibold text-sage-600 mb-2">잘 맞는 사람</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {plant.personality.match.map(tag => (
              <span key={tag} className="text-[12px] font-medium bg-sage-50 text-forest px-3 py-1.5 rounded-full border border-sage-100">
                {tag}
              </span>
            ))}
          </div>
          <p className="text-[11.5px] font-semibold text-bark mb-2">살짝 안 맞는 유형</p>
          <div className="flex flex-wrap gap-2">
            {plant.personality.mismatch.map(tag => (
              <span key={tag} className="text-[12px] font-medium bg-orange-50 text-brown px-3 py-1.5 rounded-full border border-orange-100">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* 공유 카드 */}
        <motion.div custom={5} variants={cardVariants} initial="hidden" animate="show">
          <div
            ref={shareCardRef}
            className="rounded-2xl p-6 text-white relative overflow-hidden mb-3"
            style={{ background: 'linear-gradient(135deg, #3D6B4F 0%, #5A8B5A 100%)' }}
          >
            <div className="absolute right-[-10px] bottom-[-20px] w-24 h-24 rounded-full bg-white/6" />
            <div className="absolute left-[-5px] top-[-10px] w-16 h-16 rounded-full bg-white/6" />
            <div className="relative z-10 flex items-center gap-4">
              <PlantIllustration plantId={plant.id} size={70} />
              <div>
                <p className="text-[12px] opacity-70 mb-1">나의 식물 유형</p>
                <p className="text-[16px] font-bold leading-snug">{plant.personaTitle}</p>
                <p className="text-[13px] opacity-75 mt-1">{score}% 매칭</p>
              </div>
            </div>
          </div>

          {/* 공유 버튼들 */}
          <div className="flex gap-2 mb-3">
            <button
              onClick={handleKakao}
              className="flex-1 py-3.5 rounded-xl font-bold text-[13.5px] flex items-center justify-center gap-1.5"
              style={{ background: '#FEE500', color: '#3A1D00' }}
            >
              <span>💬</span> 카카오
            </button>
            <button
              onClick={handleInsta}
              className="flex-1 py-3.5 rounded-xl font-bold text-[13.5px] flex items-center justify-center gap-1.5 text-white"
              style={{ background: 'linear-gradient(120deg, #E1306C, #833AB4)' }}
            >
              <span>📸</span> 인스타
            </button>
            <button
              onClick={handleCopyLink}
              className="flex-1 py-3.5 rounded-xl font-bold text-[13.5px] flex items-center justify-center gap-1.5 bg-white border border-beige text-text-mid hover:bg-beige transition-colors"
            >
              {copied ? '✓ 복사됨' : '🔗 복사'}
            </button>
          </div>

          <button
            onClick={() => router.push('/')}
            className="w-full py-4 rounded-xl text-[14px] text-text-mid bg-white border border-beige hover:bg-beige transition-colors font-medium"
          >
            ↺ 다시 테스트하기
          </button>
        </motion.div>
      </div>
    </div>
  )
}
