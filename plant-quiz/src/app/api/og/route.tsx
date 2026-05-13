import { ImageResponse } from 'next/og'
import { PLANTS } from '@/data/plants'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const plantId = searchParams.get('plant') || 'monstera'
  const score = searchParams.get('score') || '85'

  const plant = PLANTS.find(p => p.id === plantId)
  if (!plant) return new Response('Not found', { status: 404 })

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: 'linear-gradient(150deg, #E2EDD8 0%, #EDE8D8 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* 배경 원 */}
        <div style={{
          position: 'absolute', right: 80, top: 60,
          width: 200, height: 200, borderRadius: '50%',
          background: 'rgba(122,158,126,0.15)',
          display: 'flex',
        }} />

        {/* 메인 카드 */}
        <div style={{
          background: 'white',
          borderRadius: 40,
          padding: '60px 80px',
          display: 'flex',
          alignItems: 'center',
          gap: 80,
          boxShadow: '0 20px 80px rgba(61,107,79,0.12)',
          maxWidth: 1000,
        }}>
          {/* 왼쪽: 텍스트 */}
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{
              fontSize: 16, fontWeight: 700, letterSpacing: '0.12em',
              color: '#4A7C59', background: '#E8F0E4',
              padding: '8px 20px', borderRadius: 40,
              marginBottom: 24, width: 'fit-content',
            }}>
              🌿 PLANT CURATION
            </div>

            <div style={{ fontSize: 22, color: '#8A9E8A', marginBottom: 8 }}>
              나의 식물 유형
            </div>

            <div style={{
              fontSize: 52, fontWeight: 900, color: '#2C3E2D',
              lineHeight: 1.15, marginBottom: 16,
            }}>
              {plant.name}형
            </div>

            <div style={{
              fontSize: 24, color: '#5A6B5A', lineHeight: 1.5, marginBottom: 32,
            }}>
              {plant.personaTitle}
            </div>

            <div style={{
              fontSize: 42, fontWeight: 900, color: '#3D6B4F',
            }}>
              {score}% 매칭
            </div>

            <div style={{
              fontSize: 18, color: '#8A9E8A', marginTop: 12,
            }}>
              나에게 맞는 식물은? — 테스트해보기
            </div>
          </div>

          {/* 오른쪽: 빈 공간 (실제로는 식물 이미지) */}
          <div style={{
            width: 280, height: 280,
            background: 'linear-gradient(135deg, #E8F0E4, #C8DFC0)',
            borderRadius: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 120,
          }}>
            🌿
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
