'use client'

import Tabs from './components/Tabs'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#002E25]">
      <div className="h-screen p-6">
        <div className="flex flex-col h-full">
          <div className="mb-4">
            <h1 className="text-2xl text-white font-semibold">
              Tourism Excellence Program
            </h1>
          </div>
          <div className="flex-1 bg-[#002E25] rounded-lg overflow-hidden">
            <Tabs />
          </div>
        </div>
      </div>
    </div>
  )
}