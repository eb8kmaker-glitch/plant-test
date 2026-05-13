'use client'

import { cn } from '@/lib/utils'

interface PlantIllustrationProps {
  plantId: string
  size?: number
  className?: string
  animated?: boolean
}

// 식물별 SVG 캐릭터 맵
const ILLUSTRATIONS: Record<string, (size: number) => JSX.Element> = {

  sansevieria: (s) => (
    <svg width={s} height={s} viewBox="0 0 120 120" fill="none">
      <circle cx="60" cy="60" r="56" fill="#E8F0E4"/>
      <rect x="42" y="90" width="36" height="22" rx="6" fill="#C4A882"/>
      <rect x="38" y="85" width="44" height="10" rx="5" fill="#8B6F5E"/>
      <rect x="55" y="28" width="10" height="58" rx="5" fill="#5A8B5A"/>
      <rect x="43" y="35" width="9" height="52" rx="4.5" fill="#7A9E7E"/>
      <rect x="68" y="31" width="9" height="54" rx="4.5" fill="#6B9E6B"/>
      <line x1="47" y1="37" x2="47" y2="84" stroke="#4A7C59" strokeWidth="0.8" strokeDasharray="3,4"/>
      <line x1="60" y1="29" x2="60" y2="84" stroke="#4A7C59" strokeWidth="0.8" strokeDasharray="3,4"/>
      <line x1="72" y1="32" x2="72" y2="82" stroke="#4A7C59" strokeWidth="0.8" strokeDasharray="3,4"/>
      <circle cx="55" cy="55" r="2" fill="#3D6B4F"/>
      <circle cx="65" cy="53" r="2" fill="#3D6B4F"/>
      <path d="M53 60 Q60 64 67 60" stroke="#3D6B4F" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  ),

  pothos: (s) => (
    <svg width={s} height={s} viewBox="0 0 120 120" fill="none">
      <circle cx="60" cy="60" r="56" fill="#E8F0E4"/>
      <rect x="44" y="88" width="32" height="20" rx="5" fill="#C4A882"/>
      <rect x="40" y="83" width="40" height="10" rx="5" fill="#8B6F5E"/>
      <path d="M60 83 Q58 68 50 52" stroke="#4A7C59" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M60 83 Q62 70 72 55" stroke="#4A7C59" strokeWidth="2" strokeLinecap="round"/>
      <path d="M58 72 Q52 76 44 68" stroke="#4A7C59" strokeWidth="1.5" strokeLinecap="round"/>
      <ellipse cx="42" cy="48" rx="16" ry="10" fill="#7A9E7E" transform="rotate(-25 42 48)"/>
      <ellipse cx="55" cy="36" rx="13" ry="8" fill="#5A8B5A" transform="rotate(-8 55 36)"/>
      <ellipse cx="74" cy="50" rx="14" ry="9" fill="#6B9E6B" transform="rotate(20 74 50)"/>
      <path d="M34 46 Q42 44 50 50" stroke="#4A7C59" strokeWidth="0.8" fill="none"/>
      <path d="M48 34 Q55 32 62 38" stroke="#4A7C59" strokeWidth="0.8" fill="none"/>
      <circle cx="55" cy="58" r="2" fill="#3D6B4F"/>
      <circle cx="65" cy="56" r="2" fill="#3D6B4F"/>
      <path d="M53 62 Q60 66 67 62" stroke="#3D6B4F" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  ),

  monstera: (s) => (
    <svg width={s} height={s} viewBox="0 0 120 120" fill="none">
      <circle cx="60" cy="60" r="56" fill="#E2EDD8"/>
      <rect x="45" y="90" width="30" height="20" rx="5" fill="#C4A882"/>
      <rect x="41" y="85" width="38" height="10" rx="5" fill="#8B6F5E"/>
      <path d="M60 85 Q58 68 50 50" stroke="#4A7C59" strokeWidth="3" strokeLinecap="round"/>
      <path d="M60 85 Q62 72 74 56" stroke="#4A7C59" strokeWidth="2.5" strokeLinecap="round"/>
      {/* 몬스테라 특유의 구멍 뚫린 잎 */}
      <path d="M38 44 Q42 28 58 30 Q66 38 62 48 Q70 42 76 50 Q72 62 60 58 Q52 66 44 58 Q36 54 38 44Z" fill="#5A8B5A"/>
      <ellipse cx="52" cy="40" rx="4" ry="3" fill="#E2EDD8"/>
      <ellipse cx="64" cy="52" rx="3.5" ry="2.5" fill="#E2EDD8"/>
      <ellipse cx="48" cy="52" rx="3" ry="2" fill="#E2EDD8"/>
      <path d="M38 44 Q52 40 60 58" stroke="#4A7C59" strokeWidth="0.8" fill="none"/>
      <path d="M58 30 Q62 44 76 50" stroke="#4A7C59" strokeWidth="0.8" fill="none"/>
      <circle cx="55" cy="70" r="2.2" fill="#3D6B4F"/>
      <circle cx="66" cy="68" r="2.2" fill="#3D6B4F"/>
      <path d="M53 75 Q60 79 68 75" stroke="#3D6B4F" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  ),

  'rubber-tree': (s) => (
    <svg width={s} height={s} viewBox="0 0 120 120" fill="none">
      <circle cx="60" cy="60" r="56" fill="#EAF0E0"/>
      <rect x="46" y="90" width="28" height="20" rx="5" fill="#C4A882"/>
      <rect x="42" y="85" width="36" height="10" rx="5" fill="#8B6F5E"/>
      <rect x="57" y="40" width="6" height="46" rx="3" fill="#6B4E3D"/>
      <ellipse cx="46" cy="50" rx="18" ry="12" fill="#3D6B4F" transform="rotate(-20 46 50)"/>
      <ellipse cx="74" cy="46" rx="16" ry="11" fill="#4A7C59" transform="rotate(15 74 46)"/>
      <ellipse cx="60" cy="35" rx="14" ry="9" fill="#5A8B5A" transform="rotate(-5 60 35)"/>
      <path d="M36 46 Q46 46 56 52" stroke="#2A4D38" strokeWidth="0.8" fill="none"/>
      <path d="M64 34 Q68 34 74 40" stroke="#2A4D38" strokeWidth="0.8" fill="none"/>
      <circle cx="55" cy="64" r="2" fill="#3D6B4F"/>
      <circle cx="65" cy="62" r="2" fill="#3D6B4F"/>
      <path d="M53 68 Q60 72 67 68" stroke="#3D6B4F" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  ),

  haworthia: (s) => (
    <svg width={s} height={s} viewBox="0 0 120 120" fill="none">
      <circle cx="60" cy="60" r="56" fill="#E8F0E4"/>
      <rect x="44" y="90" width="32" height="20" rx="5" fill="#C4A882"/>
      <rect x="40" y="85" width="40" height="10" rx="5" fill="#8B6F5E"/>
      {/* 하월시아 특유의 통통한 삼각형 잎들 */}
      <path d="M60 85 L52 58 Q60 52 68 58 Z" fill="#5A8B5A"/>
      <path d="M60 85 L44 62 Q46 54 56 56 Z" fill="#6B9E6B"/>
      <path d="M60 85 L76 62 Q74 54 64 56 Z" fill="#5A8B5A"/>
      <path d="M60 85 L50 72 Q44 66 50 60 Z" fill="#7A9E7E"/>
      <path d="M60 85 L70 72 Q76 66 70 60 Z" fill="#7A9E7E"/>
      {/* 반투명 창 느낌 */}
      <ellipse cx="52" cy="60" rx="3" ry="5" fill="rgba(255,255,255,0.3)" transform="rotate(-15 52 60)"/>
      <ellipse cx="68" cy="60" rx="3" ry="5" fill="rgba(255,255,255,0.3)" transform="rotate(15 68 60)"/>
      <circle cx="55" cy="78" r="1.8" fill="#3D6B4F"/>
      <circle cx="65" cy="78" r="1.8" fill="#3D6B4F"/>
      <path d="M53 82 Q60 85 67 82" stroke="#3D6B4F" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
    </svg>
  ),

  echeveria: (s) => (
    <svg width={s} height={s} viewBox="0 0 120 120" fill="none">
      <circle cx="60" cy="60" r="56" fill="#F0EBE8"/>
      <rect x="44" y="92" width="32" height="18" rx="5" fill="#C4A882"/>
      <rect x="40" y="87" width="40" height="10" rx="5" fill="#8B6F5E"/>
      {/* 로제트 형태의 에케베리아 */}
      <circle cx="60" cy="70" r="4" fill="#E8A0A0"/>
      <ellipse cx="60" cy="58" rx="8" ry="5" fill="#E8A0A0"/>
      <ellipse cx="72" cy="64" rx="8" ry="5" fill="#D4B4B4" transform="rotate(60 72 64)"/>
      <ellipse cx="48" cy="64" rx="8" ry="5" fill="#D4B4B4" transform="rotate(-60 48 64)"/>
      <ellipse cx="70" cy="76" rx="8" ry="5" fill="#C8A0A0" transform="rotate(30 70 76)"/>
      <ellipse cx="50" cy="76" rx="8" ry="5" fill="#C8A0A0" transform="rotate(-30 50 76)"/>
      <ellipse cx="60" cy="82" rx="8" ry="5" fill="#BCA0A0"/>
      <ellipse cx="74" cy="58" rx="6" ry="4" fill="#D4B0B0" transform="rotate(50 74 58)"/>
      <ellipse cx="46" cy="58" rx="6" ry="4" fill="#D4B0B0" transform="rotate(-50 46 58)"/>
      <circle cx="55" cy="70" r="1.8" fill="#8B4040"/>
      <circle cx="65" cy="70" r="1.8" fill="#8B4040"/>
      <path d="M53 74 Q60 77 67 74" stroke="#8B4040" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
    </svg>
  ),

  'golden-barrel': (s) => (
    <svg width={s} height={s} viewBox="0 0 120 120" fill="none">
      <circle cx="60" cy="60" r="56" fill="#EDF5E4"/>
      <rect x="44" y="90" width="32" height="20" rx="5" fill="#C4A882"/>
      <rect x="40" y="85" width="40" height="10" rx="5" fill="#8B6F5E"/>
      {/* 둥근 황금환 선인장 */}
      <ellipse cx="60" cy="62" rx="22" ry="24" fill="#7A9E7E"/>
      <ellipse cx="60" cy="62" rx="18" ry="20" fill="#6B9E6B"/>
      {/* 갈비뼈 패턴 */}
      <path d="M60 40 Q70 50 70 62 Q70 74 60 84" stroke="#4A7C59" strokeWidth="0.8" fill="none"/>
      <path d="M60 40 Q50 50 50 62 Q50 74 60 84" stroke="#4A7C59" strokeWidth="0.8" fill="none"/>
      <path d="M60 40 Q75 55 78 62 Q75 70 60 84" stroke="#4A7C59" strokeWidth="0.8" fill="none"/>
      <path d="M60 40 Q45 55 42 62 Q45 70 60 84" stroke="#4A7C59" strokeWidth="0.8" fill="none"/>
      {/* 황금빛 가시 */}
      <line x1="60" y1="40" x2="58" y2="33" stroke="#E8B84B" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="70" y1="44" x2="73" y2="38" stroke="#E8B84B" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="50" y1="44" x2="47" y2="38" stroke="#E8B84B" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="78" y1="60" x2="85" y2="59" stroke="#E8B84B" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="42" y1="60" x2="35" y2="59" stroke="#E8B84B" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="55" cy="62" r="2" fill="#3D6B4F"/>
      <circle cx="65" cy="62" r="2" fill="#3D6B4F"/>
      <path d="M53 67 Q60 71 67 67" stroke="#3D6B4F" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  ),

  basil: (s) => (
    <svg width={s} height={s} viewBox="0 0 120 120" fill="none">
      <circle cx="60" cy="60" r="56" fill="#E4EDD8"/>
      <rect x="44" y="90" width="32" height="20" rx="5" fill="#C4A882"/>
      <rect x="40" y="85" width="40" height="10" rx="5" fill="#8B6F5E"/>
      <rect x="58" y="50" width="4" height="36" rx="2" fill="#5A7A3A"/>
      <ellipse cx="60" cy="38" rx="12" ry="9" fill="#6B9E4B"/>
      <ellipse cx="46" cy="50" rx="10" ry="7" fill="#5A8B3A" transform="rotate(-20 46 50)"/>
      <ellipse cx="74" cy="50" rx="10" ry="7" fill="#5A8B3A" transform="rotate(20 74 50)"/>
      <ellipse cx="48" cy="65" rx="9" ry="6" fill="#6B9E4B" transform="rotate(-15 48 65)"/>
      <ellipse cx="72" cy="65" rx="9" ry="6" fill="#6B9E4B" transform="rotate(15 72 65)"/>
      {/* 잎맥 */}
      <path d="M54 36 Q60 32 66 36" stroke="#4A7C2A" strokeWidth="0.8" fill="none"/>
      <circle cx="55" cy="75" r="2" fill="#3A6B2A"/>
      <circle cx="65" cy="75" r="2" fill="#3A6B2A"/>
      <path d="M53 79 Q60 83 67 79" stroke="#3A6B2A" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  ),

  mint: (s) => (
    <svg width={s} height={s} viewBox="0 0 120 120" fill="none">
      <circle cx="60" cy="60" r="56" fill="#E0F0EC"/>
      <rect x="44" y="92" width="32" height="18" rx="5" fill="#C4A882"/>
      <rect x="40" y="87" width="40" height="10" rx="5" fill="#8B6F5E"/>
      <rect x="58" y="45" width="4" height="43" rx="2" fill="#4A9E7A"/>
      <ellipse cx="47" cy="52" rx="12" ry="7" fill="#5DCAA5" transform="rotate(-25 47 52)"/>
      <ellipse cx="73" cy="52" rx="12" ry="7" fill="#5DCAA5" transform="rotate(25 73 52)"/>
      <ellipse cx="47" cy="66" rx="11" ry="7" fill="#4AAE8A" transform="rotate(-20 47 66)"/>
      <ellipse cx="73" cy="66" rx="11" ry="7" fill="#4AAE8A" transform="rotate(20 73 66)"/>
      <ellipse cx="60" cy="40" rx="9" ry="6" fill="#5DCAA5"/>
      {/* 잎맥 */}
      <path d="M38 50 Q47 48 56 54" stroke="#2A8A6A" strokeWidth="0.8" fill="none"/>
      <path d="M64 54 Q73 48 82 50" stroke="#2A8A6A" strokeWidth="0.8" fill="none"/>
      <circle cx="55" cy="78" r="2" fill="#0F6E56"/>
      <circle cx="65" cy="78" r="2" fill="#0F6E56"/>
      <path d="M53 82 Q60 86 67 82" stroke="#0F6E56" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  ),

  lavender: (s) => (
    <svg width={s} height={s} viewBox="0 0 120 120" fill="none">
      <circle cx="60" cy="60" r="56" fill="#EEE8F5"/>
      <rect x="44" y="90" width="32" height="20" rx="5" fill="#C4A882"/>
      <rect x="40" y="85" width="40" height="10" rx="5" fill="#8B6F5E"/>
      {/* 라벤더 줄기들 */}
      <line x1="60" y1="85" x2="54" y2="48" stroke="#7A9E5A" strokeWidth="2" strokeLinecap="round"/>
      <line x1="60" y1="85" x2="60" y2="44" stroke="#7A9E5A" strokeWidth="2" strokeLinecap="round"/>
      <line x1="60" y1="85" x2="66" y2="48" stroke="#7A9E5A" strokeWidth="2" strokeLinecap="round"/>
      <line x1="60" y1="85" x2="50" y2="52" stroke="#7A9E5A" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="60" y1="85" x2="70" y2="52" stroke="#7A9E5A" strokeWidth="1.5" strokeLinecap="round"/>
      {/* 라벤더 꽃봉오리 */}
      <ellipse cx="54" cy="44" rx="4" ry="8" fill="#9B7EC8"/>
      <ellipse cx="60" cy="40" rx="4" ry="8" fill="#AE8FD8"/>
      <ellipse cx="66" cy="44" rx="4" ry="8" fill="#9B7EC8"/>
      <ellipse cx="50" cy="48" rx="3" ry="6" fill="#8B6EC8"/>
      <ellipse cx="70" cy="48" rx="3" ry="6" fill="#8B6EC8"/>
      <circle cx="55" cy="75" r="2" fill="#534AB7"/>
      <circle cx="65" cy="75" r="2" fill="#534AB7"/>
      <path d="M53 79 Q60 83 67 79" stroke="#534AB7" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  ),

  spathiphyllum: (s) => (
    <svg width={s} height={s} viewBox="0 0 120 120" fill="none">
      <circle cx="60" cy="60" r="56" fill="#EAF0E4"/>
      <rect x="44" y="90" width="32" height="20" rx="5" fill="#C4A882"/>
      <rect x="40" y="85" width="40" height="10" rx="5" fill="#8B6F5E"/>
      {/* 스파티필럼 잎 */}
      <path d="M60 85 Q56 68 44 52" stroke="#4A7C59" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M60 85 Q62 70 74 54" stroke="#4A7C59" strokeWidth="2" strokeLinecap="round"/>
      <ellipse cx="40" cy="47" rx="16" ry="9" fill="#5A8B5A" transform="rotate(-35 40 47)"/>
      <ellipse cx="74" cy="50" rx="14" ry="8" fill="#6B9E6B" transform="rotate(30 74 50)"/>
      {/* 하얀 꽃 */}
      <path d="M60 55 Q56 42 60 36 Q64 42 60 55Z" fill="white" stroke="#D4D0C0" strokeWidth="0.5"/>
      <ellipse cx="60" cy="48" rx="5" ry="2" fill="#F5F0E0"/>
      <rect x="59" y="50" width="2" height="8" rx="1" fill="#A8C47A"/>
      <circle cx="55" cy="70" r="2" fill="#3D6B4F"/>
      <circle cx="65" cy="70" r="2" fill="#3D6B4F"/>
      <path d="M53 74 Q60 78 67 74" stroke="#3D6B4F" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  ),

  // 기본 fallback SVG (다른 식물에 적용)
  default: (s) => (
    <svg width={s} height={s} viewBox="0 0 120 120" fill="none">
      <circle cx="60" cy="60" r="56" fill="#E8F0E4"/>
      <rect x="44" y="88" width="32" height="22" rx="6" fill="#C4A882"/>
      <rect x="40" y="83" width="40" height="10" rx="5" fill="#8B6F5E"/>
      <path d="M60 83 Q58 66 52 48" stroke="#4A7C59" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M60 83 Q62 68 70 50" stroke="#4A7C59" strokeWidth="2" strokeLinecap="round"/>
      <ellipse cx="46" cy="43" rx="17" ry="10" fill="#7A9E7E" transform="rotate(-30 46 43)"/>
      <ellipse cx="56" cy="30" rx="14" ry="8" fill="#5A8B5A" transform="rotate(-8 56 30)"/>
      <ellipse cx="73" cy="45" rx="14" ry="9" fill="#6B9E6B" transform="rotate(22 73 45)"/>
      <circle cx="55" cy="60" r="2" fill="#3D6B4F"/>
      <circle cx="65" cy="58" r="2" fill="#3D6B4F"/>
      <path d="M53 64 Q60 68 67 64" stroke="#3D6B4F" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  ),
}

export function PlantIllustration({ plantId, size = 120, className, animated = false }: PlantIllustrationProps) {
  const render = ILLUSTRATIONS[plantId] || ILLUSTRATIONS.default
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center',
        animated && 'animate-sway',
        className
      )}
    >
      {render(size)}
    </div>
  )
}
