export type LightLevel = 'low' | 'medium' | 'high' | 'direct'
export type WateringLevel = 'very_low' | 'low' | 'medium' | 'high'
export type SpaceSize = 'tiny' | 'small' | 'medium' | 'large'
export type PlantType = 'indoor' | 'succulent' | 'herb' | 'outdoor'
export type PurposeType = 'decoration' | 'healing' | 'air' | 'scent' | 'harvest'

export interface Plant {
  id: string
  name: string
  nameEn: string
  emoji: string
  type: PlantType
  difficulty: 1 | 2 | 3
  light: LightLevel[]
  watering: WateringLevel
  wateringDays: number
  petSafe: boolean
  humidity: 'low' | 'medium' | 'high'
  space: SpaceSize[]
  purpose: PurposeType[]
  moodKeywords: string[]
  styleKeywords: string[]
  survivalTip: string
  personaTitle: string
  reason: string
  careSummary: {
    lightDesc: string
    waterDesc: string
    spaceDesc: string
    difficultyLabel: string
  }
  personality: {
    match: string[]
    mismatch: string[]
  }
}

export interface Answers {
  personality?: string
  management?: string
  room_style?: string
  purpose?: string
  light?: LightLevel
  watering_freq?: WateringLevel
  space?: SpaceSize
  pet?: 'cat' | 'dog' | 'none'
}

export interface TestResult {
  id: string
  plantId: string
  matchScore: number
  answers: Answers
  createdAt: string
}

export interface Question {
  id: keyof Answers
  category: string
  phase: '성향 분석' | '환경 체크'
  text: string
  sub: string
  options: {
    emoji: string
    label: string
    sub?: string
    value: string
  }[]
}
