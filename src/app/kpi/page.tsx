'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import ActiveTrainees from './tabs/ActiveTrainees'
import CompletionRates from './tabs/CompletionRates'
import SuccessMetrics from './tabs/SuccessMetrics'
import ProgramEffectiveness from './tabs/ProgramEffectiveness'
import SatisfactionRates from './tabs/SatisfactionRates'
import BatchProgress from './tabs/BatchProgress'

export default function KPIDashboard() {
  const [activeTab, setActiveTab] = useState('Active Trainees')

  const tabs = [
    'Active Trainees',
    'Completion Rates',
    'Success Metrics',
    'Satisfaction Rates',
    'Program Effectiveness',
    'Batch Progress',
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'Active Trainees':
        return <ActiveTrainees />
      case 'Completion Rates':
        return <CompletionRates />
      case 'Success Metrics':
        return <SuccessMetrics />
      case 'Satisfaction Rates':
        return <SatisfactionRates />
      case 'Program Effectiveness':
        return <ProgramEffectiveness />
      case 'Batch Progress':
        return <BatchProgress />
      default:
        return null
    }
  }

  return (
    <>
      {/* <div className="p-6">
          <h1 className="text-2xl font-semibold text-white mb-6">Key Performance Indicators</h1> 
      </div> */}
      {/* Tabs Section */}
      <Card className="bg-[#0A2F2F] p-1 border-[#6D988B] max-w-6xl mx-auto">
        <div className="flex gap-4 overflow-x-auto">  
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-6 py-2 rounded-lg text-white transition-colors ${
                activeTab === tab 
                  ? 'bg-[#82D9BF]'
                  : 'hover:bg-[#846EDB]'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </Card>

      {/* Dashboard Content */}
      <div className="mt-6">
        {renderContent()}
      </div>
    </>
  )
}