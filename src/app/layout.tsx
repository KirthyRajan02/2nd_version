// src/app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import MainLayout from '@/components/layout/MainLayout'

export const metadata: Metadata = {
  title: 'Training Program Dashboard',
  description: 'KPI tracking for training programs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  )
}