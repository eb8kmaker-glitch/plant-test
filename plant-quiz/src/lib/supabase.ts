// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ── DB 저장 함수 ───────────────────────────────────────────

export async function saveResult(data: {
  id: string
  plantId: string
  matchScore: number
  answers: object
}) {
  const { error } = await supabase.from('test_results').insert({
    id: data.id,
    plant_id: data.plantId,
    match_score: data.matchScore,
    answers: data.answers,
  })
  if (error) console.error('Supabase save error:', error)
}

export async function getResult(id: string) {
  const { data, error } = await supabase
    .from('test_results')
    .select('*')
    .eq('id', id)
    .single()
  if (error) return null
  return data
}

export async function incrementShareCount(resultId: string, platform: string) {
  await supabase.from('share_events').insert({
    result_id: resultId,
    platform,
  })
  await supabase.rpc('increment_share_count', { result_id: resultId })
}
