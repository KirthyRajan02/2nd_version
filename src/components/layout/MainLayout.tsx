'use client'

import { useLayoutStore } from '@/store/layout-store'
import Sidebar from './Sidebar'

export default function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { isCollapsed } = useLayoutStore()

  return (
    <div className="flex min-h-screen bg-[#0A2F2F]">
      <Sidebar />
      <div className={`flex-1 transition-all duration-300 ${
        isCollapsed ? 'ml-16' : 'ml-64'
      }`}>
         
        <main className="pt-8 px-5">
          {children}
        </main>
      </div>
    </div>
  )
}
