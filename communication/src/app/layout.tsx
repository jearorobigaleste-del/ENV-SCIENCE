import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import MotionProvider from '@/components/MotionProvider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Communication × IT × Environment',
  description:
    'How are Communication, Information Technology, and Environmental Science connected? A cinematic scrollytelling experience.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  )
}
