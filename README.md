# 🌿 나에게 맞는 식물은?

생활패턴 기반 식물 큐레이션 서비스 — 실제로 오래 살아남을 식물 추천

## 기술 스택

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS** (커스텀 디자인 토큰)
- **Framer Motion** (애니메이션)
- **Supabase** (DB + 결과 저장)
- **SVG 캐릭터** (외부 이미지 없는 식물 일러스트)

## 빠른 시작

```bash
# 1. 의존성 설치
npm install

# 2. 환경변수 설정
cp .env.example .env.local
# → .env.local 파일에 Supabase 키 입력

# 3. 개발 서버 실행
npm run dev
```

## 프로젝트 구조

```
src/
├── app/
│   ├── page.tsx              # 인트로 랜딩
│   ├── test/page.tsx         # 테스트 플로우 (8문항)
│   ├── result/[id]/page.tsx  # 결과 페이지
│   └── api/og/route.tsx      # OG 이미지 생성
├── components/
│   └── shared/
│       └── PlantIllustration.tsx  # SVG 식물 캐릭터
├── data/
│   ├── plants.ts             # 식물 40종 데이터
│   └── questions.ts          # 8문항 질문 데이터
├── lib/
│   ├── algorithm.ts          # 가중치 기반 추천 알고리즘
│   ├── supabase.ts           # DB 클라이언트
│   └── utils.ts              # 유틸 함수
└── types/
    └── index.ts              # TypeScript 타입 정의
```

## Supabase 설정

```sql
-- 테스트 결과 저장
CREATE TABLE test_results (
  id           TEXT PRIMARY KEY,
  plant_id     TEXT NOT NULL,
  match_score  INT2,
  answers      JSONB,
  share_count  INT DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 공유 이벤트 트래킹
CREATE TABLE share_events (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  result_id  TEXT REFERENCES test_results(id),
  platform   TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 공유 카운트 증가 함수
CREATE OR REPLACE FUNCTION increment_share_count(result_id TEXT)
RETURNS VOID AS $$
  UPDATE test_results SET share_count = share_count + 1 WHERE id = result_id;
$$ LANGUAGE SQL;
```

## 추천 알고리즘 가중치

| 요소 | 가중치 | 비고 |
|------|--------|------|
| 채광 | 28% | 최우선 |
| 물주기 빈도 | 22% | 최우선 |
| 반려동물 안전 | 15% | 하드 필터 |
| 공간 크기 | 12% | |
| 키우는 목적 | 10% | |
| 감성 스타일 | 8% | |
| 성향 키워드 | 5% | |

## Vercel 배포

```bash
# Vercel CLI로 배포
npx vercel

# 환경변수 설정
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
```

## MVP 이후 확장 계획

- [ ] 식물 구매 링크 연결 (쿠팡 파트너스)
- [ ] 카카오 공유 SDK 연동
- [ ] 인스타 스토리 공유 카드 (Canvas API)
- [ ] 마이 식물 다이어리 (Supabase Auth)
- [ ] 계절별 추천 업데이트
- [ ] 커뮤니티 "나도 이 식물!" 기능
