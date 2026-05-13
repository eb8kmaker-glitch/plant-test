'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { QUESTIONS } from '@/data/questions'
import { Answers } from '@/types'
import { getRecommendation } from '@/lib/algorithm'
import { generateId } from '@/lib/utils'
import { PlantIllustration } from '@/components/shared/PlantIllustration'

const LOADING_MESSAGES = [
  '생활 패턴 분석 중...',
  '최적의 식물 탐색 중...',
  '생존률 계산 중...',
  '나만의 식물 큐레이팅 중...',
]

export default function TestPage() {
  const router = useRouter()
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [selected, setSelected] = useState<string | null>(null)
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMsg, setLoadingMsg] = useState(0)
  const timerRef = useRef<NodeJS.Timeout>()

  const question = QUESTIONS[currentQ]
  const totalQ = QUESTIONS.length
  const progress = ((currentQ + (selected ? 1 : 0)) / totalQ) * 100
  const isLastQ = currentQ === totalQ - 1
  const phase = currentQ < 4 ? '성향 분석' : '환경 체크'

  useEffect(() => {
    const key = question.id as keyof Answers
    setSelected((answers[key] as string) || null)
  }, [currentQ])

  useEffect(() => {
    if (!isLoading) return
    timerRef.current = setInterval(() => {
      setLoadingMsg(m => (m + 1) % LOADING_MESSAGES.length)
    }, 900)
    return () => clearInterval(timerRef.current)
  }, [isLoading])

  function handleSelect(value: string) {
    setSelected(value)
  }

  function handleNext() {
    if (!selected) return
    const key = question.id as keyof Answers
    const newAnswers = { ...answers, [key]: selected as any }
    setAnswers(newAnswers)

    if (isLastQ) {
      submitTest(newAnswers)
    } else {
      setDirection('forward')
      setCurrentQ(q => q + 1)
    }
  }

  function handleBack() {
    if (currentQ === 0) {
      router.push('/')
      return
    }
    setDirection('back')
    setCurrentQ(q => q - 1)
  }

  async function submitTest(finalAnswers: Answers) {
    setIsLoading(true)
    await new Promise(r => setTimeout(r, 2800))

    const result = getRecommendation(finalAnswers)
    if (!result) {
      router.push('/')
      return
    }

    const id = generateId()
    // 로컬스토리지에 결과 저장 (Supabase 연동 전 임시)
    localStorage.setItem(`result_${id}`, JSON.stringify({
      id,
      plantId: result.plant.id,
      matchScore: result.score,
      answers: finalAnswers,
      createdAt: new Date().toISOString(),
    }))

    router.push(`/result/${id}`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sage-50 to-cream flex flex-col items-center justify-center gap-6 px-6">
        <motion.div
          animate={{ rotate: [-4, 4, -4] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <PlantIllustration plantId="monstera" size={110} />
        </motion.div>
        <motion.p
          key={loadingMsg}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="text-forest text-base font-medium"
        >
          {LOADING_MESSAGES[loadingMsg]}
        </motion.p>
        <div className="flex gap-2">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-sage-400"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
              transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col max-w-md mx-auto">
      {/* 프로그레스 바 */}
      <div className="px-5 pt-5 pb-0 bg-cream sticky top-0 z-10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-text-soft font-medium">{currentQ + 1} / {totalQ}</span>
          <span className="text-[11px] font-bold text-sage-600 bg-sage-50 px-3 py-1 rounded-full">
            {phase}
          </span>
        </div>
        <div className="h-1.5 bg-beige rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-sage-400 to-forest rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* 질문 영역 */}
      <div className="flex-1 px-5 pt-6 pb-4">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: direction === 'forward' ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction === 'forward' ? -40 : 40 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <p className="text-[11px] font-bold tracking-widest text-sage-500 uppercase mb-2">
              {question.category}
            </p>
            <h2 className="text-[22px] font-extrabold text-forest leading-tight tracking-tight mb-1">
              {question.text}
            </h2>
            <p className="text-[13px] text-text-soft mb-6">{question.sub}</p>

            <div className="flex flex-col gap-3">
              {question.options.map((opt) => {
                const isSelected = selected === opt.value
                return (
                  <motion.button
                    key={opt.value}
                    onClick={() => handleSelect(opt.value)}
                    whileTap={{ scale: 0.97 }}
                    className={`
                      w-full flex items-center gap-4 p-4 rounded-2xl text-left
                      border-2 transition-all duration-150
                      ${isSelected
                        ? 'border-sage-500 bg-sage-50 shadow-sm'
                        : 'border-transparent bg-white shadow-[0_1px_8px_rgba(61,107,79,0.07)] hover:border-mint hover:bg-sage-50/50'
                      }
                    `}
                  >
                    {/* 라디오 서클 */}
                    <div className={`
                      w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                      transition-all duration-150
                      ${isSelected ? 'border-sage-500 bg-sage-500' : 'border-mint bg-white'}
                    `}>
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>

                    <span className="text-2xl flex-shrink-0">{opt.emoji}</span>

                    <div className="flex-1 min-w-0">
                      <p className={`text-[14.5px] font-semibold leading-tight ${isSelected ? 'text-forest' : 'text-text-dark'}`}>
                        {opt.label}
                      </p>
                      {opt.sub && (
                        <p className="text-[12px] text-text-soft mt-0.5">{opt.sub}</p>
                      )}
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 하단 네비게이션 */}
      <div className="px-5 pb-8 pt-2 flex gap-3 bg-cream sticky bottom-0">
        <button
          onClick={handleBack}
          className="px-5 py-4 bg-white border border-beige rounded-xl text-text-mid text-[14px] font-medium hover:bg-beige transition-colors"
        >
          ←
        </button>
        <motion.button
          onClick={handleNext}
          whileTap={selected ? { scale: 0.97 } : {}}
          className={`
            flex-1 py-4 rounded-xl text-[15.5px] font-bold transition-all duration-200
            ${selected
              ? 'bg-forest text-white shadow-[0_4px_16px_rgba(61,107,79,0.25)] hover:bg-sage-800'
              : 'bg-sage-100 text-sage-400 cursor-not-allowed'
            }
          `}
        >
          {isLastQ ? '결과 보기 →' : '다음으로 →'}
        </motion.button>
      </div>
    </div>
  )
}
