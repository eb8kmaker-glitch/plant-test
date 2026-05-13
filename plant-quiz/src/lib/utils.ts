import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateId(length = 8): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

export function getDifficultyLabel(difficulty: 1 | 2 | 3): string {
  return ['', '★☆☆ 쉬움', '★★☆ 보통', '★★★ 어려움'][difficulty]
}

export function getMatchComment(score: number): string {
  if (score >= 90) return '완벽한 조합이에요'
  if (score >= 80) return '아주 잘 맞아요'
  if (score >= 70) return '잘 맞는 편이에요'
  if (score >= 60) return '나쁘지 않아요'
  return '도전해볼 만해요'
}
