import { Plant, Answers, LightLevel, WateringLevel, SpaceSize } from '@/types'
import { PLANTS } from '@/data/plants'

const WEIGHTS = {
  light:         0.28,
  watering_freq: 0.22,
  pet_safety:    0.15,
  space:         0.12,
  purpose:       0.10,
  style_pref:    0.08,
  personality:   0.05,
}

const LIGHT_ORDER: LightLevel[] = ['low', 'medium', 'high', 'direct']
const WATER_ORDER: WateringLevel[] = ['very_low', 'low', 'medium', 'high']

function lightDistance(plantLights: LightLevel[], userLight: LightLevel): number {
  const userIdx = LIGHT_ORDER.indexOf(userLight)
  const minDist = Math.min(...plantLights.map(l => Math.abs(LIGHT_ORDER.indexOf(l) - userIdx)))
  if (minDist === 0) return 1.0
  if (minDist === 1) return 0.5
  return 0.1
}

function waterDistance(plantWater: WateringLevel, userWater: WateringLevel): number {
  const pIdx = WATER_ORDER.indexOf(plantWater)
  const uIdx = WATER_ORDER.indexOf(userWater)
  const diff = Math.abs(pIdx - uIdx)
  // 유저가 물을 적게 줄 수 있는데 식물이 많이 필요하면 치명적
  const plantNeedsMore = pIdx > uIdx
  if (diff === 0) return 1.0
  if (diff === 1) return plantNeedsMore ? 0.3 : 0.6
  if (diff === 2) return plantNeedsMore ? 0.0 : 0.2
  return 0.0
}

function getPersonalityKeywords(answers: Answers): string[] {
  const keywords: string[] = []
  if (answers.management === 'forget' || answers.personality === 'lazy') {
    keywords.push('귀차니스트')
  }
  if (answers.management === 'record' || answers.management === 'alarm') {
    keywords.push('꼼꼼한', '루틴형인간')
  }
  if (answers.personality === 'sensory' || answers.room_style === 'cafe') {
    keywords.push('감성러')
  }
  if (answers.room_style === 'minimal') {
    keywords.push('미니멀리스트')
  }
  if (answers.room_style === 'botanical') {
    keywords.push('식물원감성')
  }
  if (answers.personality === 'homebody' || answers.personality === 'lazy') {
    keywords.push('혼자만의시간')
  }
  if (answers.purpose === 'scent') {
    keywords.push('향기러버')
  }
  if (answers.purpose === 'harvest') {
    keywords.push('요리러버', '실용파')
  }
  return keywords
}

function getStyleKeywords(answers: Answers): string[] {
  const keywords: string[] = []
  if (answers.room_style === 'minimal') keywords.push('미니멀', '모던', '깔끔', '심플')
  if (answers.room_style === 'cozy') keywords.push('내추럴', '아늑', '빈티지')
  if (answers.room_style === 'botanical') keywords.push('보태니컬', '내추럴', '트로피컬')
  if (answers.room_style === 'cafe') keywords.push('감성', '감성카페', '빈티지')
  if (answers.room_style === 'maximal') keywords.push('맥시멀', '보태니컬', '컬러풀')
  return keywords
}

export function scorePlant(plant: Plant, answers: Answers): number {
  let score = 0

  // 1. 반려동물 하드 필터 (고양이/강아지가 있으면 독성 식물은 0점)
  if (answers.pet && answers.pet !== 'none' && !plant.petSafe) {
    return 0
  }

  // 2. 채광 매칭 (28%)
  if (answers.light) {
    const lightScore = lightDistance(plant.light, answers.light as LightLevel)
    score += WEIGHTS.light * lightScore * 100
  }

  // 3. 물 주기 매칭 (22%)
  if (answers.watering_freq) {
    const waterScore = waterDistance(plant.watering, answers.watering_freq as WateringLevel)
    score += WEIGHTS.watering_freq * waterScore * 100
  }

  // 4. 공간 매칭 (12%)
  if (answers.space) {
    const spaceMap: Record<string, SpaceSize[]> = {
      tiny:   ['tiny'],
      small:  ['tiny', 'small'],
      medium: ['tiny', 'small', 'medium'],
      large:  ['tiny', 'small', 'medium', 'large'],
    }
    const validSpaces = spaceMap[answers.space] || []
    const spaceMatch = plant.space.some(s => validSpaces.includes(s)) ? 1 : 0
    score += WEIGHTS.space * spaceMatch * 100
  }

  // 5. 목적 매칭 (10%)
  if (answers.purpose && plant.purpose.includes(answers.purpose as any)) {
    score += WEIGHTS.purpose * 100
  }

  // 6. 스타일 키워드 매칭 (8%)
  const styleKeywords = getStyleKeywords(answers)
  const styleMatches = plant.styleKeywords.filter(k => styleKeywords.includes(k)).length
  if (styleMatches > 0) {
    score += WEIGHTS.style_pref * Math.min(styleMatches / 2, 1) * 100
  }

  // 7. 성향 키워드 매칭 (5%)
  const personalityKeywords = getPersonalityKeywords(answers)
  const moodMatches = plant.moodKeywords.filter(k => personalityKeywords.includes(k)).length
  if (moodMatches > 0) {
    score += WEIGHTS.personality * Math.min(moodMatches / 2, 1) * 100
  }

  // 8. 생존률 보정 (난이도 낮을수록 보너스)
  const survivalBonus = (4 - plant.difficulty) * 2
  score += survivalBonus

  return Math.round(Math.min(score, 99))
}

export function getTopPlants(answers: Answers, topN = 3): Array<{ plant: Plant; score: number }> {
  const scored = PLANTS.map(plant => ({
    plant,
    score: scorePlant(plant, answers),
  }))

  return scored
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN)
}

export function getRecommendation(answers: Answers): { plant: Plant; score: number } | null {
  const top = getTopPlants(answers, 1)
  return top.length > 0 ? top[0] : null
}
