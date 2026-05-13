import type { Metadata, Viewport } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const notoSansKR = Noto_Sans_KR({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto',
})

export const metadata: Metadata = {
  title: '나에게 맞는 식물은? 🌿',
  description: '생활패턴 기반 식물 큐레이션 — 실제로 오래 살아남을 식물을 찾아드려요.',
  keywords: ['식물 추천', '식물 테스트', '심리테스트', '식물 큐레이션', '반려 식물'],
  authors: [{ name: '식물 큐레이션' }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    title: '나에게 맞는 식물은? 🌿',
    description: '단순 예쁜 식물이 아닌, 내 생활에서 실제로 살아남는 식물 추천',
    images: [{ url: '/api/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '나에게 맞는 식물은? 🌿',
    description: '생활패턴 기반 식물 큐레이션',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#E8F0E4',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={notoSansKR.variable}>
      <body className={`${notoSansKR.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
