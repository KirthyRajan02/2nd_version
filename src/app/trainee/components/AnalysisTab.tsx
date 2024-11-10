'use client'

import { useState } from 'react'
// import BatchAnalysis from './BatchAnalysis'
import StageAnalysis from './StageAnalysis'
import MapView from './MapView'

interface AnalysisTabProps {
  activeFilters: {
    stage: string[]
    performance: string[]
    country: string[]
    program: string[]
    batch: string[]
  }
}

const AnalysisTab = ({ activeFilters }: AnalysisTabProps) => {
  const [activeTab, setActiveTab] = useState('mapView')

  return (
    <div className="h-[calc(100vh-120px)] overflow-y-auto p-6 bg-[#001A14]">
      {/* Main Tabs */}
      <div className="flex space-x-1 mb-6 border-b border-[#1D4B44]">
        {/* <button
          onClick={() => setActiveTab('batchAnalysis')}
          className={`px-6 py-3 text-sm font-medium relative
            ${activeTab === 'batchAnalysis' 
              ? 'text-[#4FD1C5]' 
              : 'text-gray-400 hover:text-white'
            }
          `}
        >
          Batch Analysis
          {activeTab === 'batchAnalysis' && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#4FD1C5]" />
          )}
        </button> */}
        <button
          onClick={() => setActiveTab('mapView')}
          className={`px-6 py-3 text-sm font-medium relative
            ${activeTab === 'mapView' 
              ? 'text-[#0088CC]' 
              : 'text-gray-400 hover:text-white'
            }
          `}
        >
          Map View
          {activeTab === 'mapView' && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0088CC]" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('stageAnalysis')}
          className={`px-6 py-3 text-sm font-medium relative
            ${activeTab === 'stageAnalysis' 
              ? 'text-[#0088CC]' 
              : 'text-gray-400 hover:text-white'
            }
          `}
        >
          Stage Analysis
          {activeTab === 'stageAnalysis' && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0088CC]" />
          )}
        </button>
      </div>

      {/* Content */}
      {/* {activeTab === 'batchAnalysis' && <BatchAnalysis activeFilters={activeFilters} />} */}
      {activeTab === 'mapView' && <MapView activeFilters={activeFilters} />}
      {activeTab === 'stageAnalysis' && <StageAnalysis activeFilters={activeFilters} />}
    </div>
  )
}

export default AnalysisTab