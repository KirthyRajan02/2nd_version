'use client'

import { useState, useEffect } from 'react'
import ParticipantTab from './ParticipantTab'
import AnalysisTab from './AnalysisTab'
import { FiChevronDown } from 'react-icons/fi'
import { participantsData } from '../data/participants'

interface Filters {
  stage: string[]
  performance: string[]
  country: string[]
  program: string[]
  batch: string[]
}

export default function Tabs() {
  const [activeTab, setActiveTab] = useState('analysis')

  const [activeFilters, setActiveFilters] = useState<Filters>({
    stage: [],
    performance: [],
    country: [],
    program: [],
    batch: []
  })
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!(event.target as Element).closest('.dropdown-container')) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleFilter = (type: keyof Filters, value: string) => {
    setActiveFilters(prev => {
      const filters = { ...prev }
      if (filters[type].includes(value)) {
        filters[type] = filters[type].filter(f => f !== value)
      } else {
        filters[type] = [...filters[type], value]
      }
      return filters
    })
  }

  const clearFilters = () => {
    setActiveFilters({ stage: [], performance: [], country: [], program: [], batch: [] })
  }

  const getCountries = () => {
    return Array.from(new Set(
      participantsData.participants.map(participant => participant.country)
    )).sort()
  }

  const getPrograms = () => {
    return Array.from(new Set(
      participantsData.participants.map(participant => participant.program)
    )).sort()
  }

  const getBatches = () => {
    return Array.from(new Set(
      participantsData.participants.map(participant => participant.batchNumber)
    )).sort()
  }


  const handleApplyFilters = () => {
    // Add your apply filters logic here
    console.log('Filters applied:', activeFilters)
  }

  const toggleView = () => {
    const newTab = activeTab === 'analysis' ? 'participants' : 'analysis'
    setActiveTab(newTab)
    sessionStorage.setItem('lastActiveTab', newTab)
  }

  useEffect(() => {
    const lastTab = sessionStorage.getItem('lastActiveTab')
    if (lastTab) {
      setActiveTab(lastTab)
    }
  }, [])

  return (
    <div className="h-full flex flex-col bg-[#002E25]">
      <div className="border-b border-[#1D4B44] px-6">
        <div className="flex flex-col">
          {/* Filters Row */}
          <div className="flex items-center space-x-4 py-4">
            {/* Stage Filter */}
            <div className="flex-1 dropdown-container relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'stage' ? null : 'stage')}
                className="w-full flex items-center justify-between bg-[#1D4B44] text-white rounded-md border border-[#2D5A52] p-2"
              >
                <span className="text-sm">
                  {activeFilters.stage.length 
                    ? `${activeFilters.stage.length} stages selected` 
                    : 'Select Stage'}
                </span>
                <FiChevronDown className={`transition-transform ${openDropdown === 'stage' ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === 'stage' && (
                <div className="absolute z-10 w-full mt-1 bg-[#1D4B44] border border-[#2D5A52] rounded-md shadow-lg">
                  {['onboard', 'training', 'evaluation', 'employed'].map((stage) => (
                    <label key={stage} className="flex items-center px-4 py-2 hover:bg-[#2D5A52] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={activeFilters.stage.includes(stage)}
                        onChange={() => toggleFilter('stage', stage)}
                        className="mr-2"
                      />
                      <span className="text-white text-sm capitalize">{stage}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Program Filter */}
            <div className="flex-1 dropdown-container relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'program' ? null : 'program')}
                className="w-full flex items-center justify-between bg-[#1D4B44] text-white rounded-md border border-[#2D5A52] p-2"
              >
                <span className="text-sm">
                  {activeFilters.program.length 
                    ? `${activeFilters.program.length} programs selected` 
                    : 'Select Program'}
                </span>
                <FiChevronDown className={`transition-transform ${openDropdown === 'program' ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === 'program' && (
                <div className="absolute z-10 w-full mt-1 bg-[#1D4B44] border border-[#2D5A52] rounded-md shadow-lg">
                  {getPrograms().map((program) => (
                    <label key={program} className="flex items-center px-4 py-2 hover:bg-[#2D5A52] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={activeFilters.program.includes(program)}
                        onChange={() => toggleFilter('program', program)}
                        className="mr-2"
                      />
                      <span className="text-white text-sm">{program}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Country Filter */}
            <div className="flex-1 dropdown-container relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'country' ? null : 'country')}
                className="w-full flex items-center justify-between bg-[#1D4B44] text-white rounded-md border border-[#2D5A52] p-2"
              >
                <span className="text-sm">
                  {activeFilters.country.length 
                    ? `${activeFilters.country.length} countries selected` 
                    : 'Select Country'}
                </span>
                <FiChevronDown className={`transition-transform ${openDropdown === 'country' ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === 'country' && (
                <div className="absolute z-10 w-full mt-1 bg-[#1D4B44] border border-[#2D5A52] rounded-md shadow-lg">
                  {getCountries().map((country) => (
                    <label key={country} className="flex items-center px-4 py-2 hover:bg-[#2D5A52] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={activeFilters.country.includes(country)}
                        onChange={() => toggleFilter('country', country)}
                        className="mr-2"
                      />
                      <span className="text-white text-sm">{country}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Batch Filter */}
            <div className="flex-1 dropdown-container relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'batch' ? null : 'batch')}
                className="w-full flex items-center justify-between bg-[#1D4B44] text-white rounded-md border border-[#2D5A52] p-2"
              >
                <span className="text-sm">
                  {activeFilters.batch.length 
                    ? `${activeFilters.batch.length} batches selected` 
                    : 'Select Batch'}
                </span>
                <FiChevronDown className={`transition-transform ${openDropdown === 'batch' ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === 'batch' && (
                <div className="absolute z-10 w-full mt-1 bg-[#1D4B44] border border-[#2D5A52] rounded-md shadow-lg">
                  {getBatches().map((batch) => (
                    <label key={batch} className="flex items-center px-4 py-2 hover:bg-[#2D5A52] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={activeFilters.batch.includes(batch)}
                        onChange={() => toggleFilter('batch', batch)}
                        className="mr-2"
                      />
                      <span className="text-white text-sm">Batch {batch}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white"
              >
                Clear
              </button>
              <button
                onClick={handleApplyFilters}
                className="px-4 py-2 text-sm bg-[#4FD1C5] text-white rounded-md hover:bg-[#3DAF9F]"
              >
                Apply Filters
              </button>
              <button
                onClick={toggleView}
                className="px-4 py-2 text-sm bg-[#1D4B44] text-white rounded-md border border-[#2D5A52] hover:bg-[#2D5A52]"
              >
                {activeTab === 'analysis' ? 'Trainees' : 'Analysis'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 mt-1">
        {activeTab === 'analysis' ? (
          <AnalysisTab activeFilters={activeFilters} />
        ) : (
          <ParticipantTab activeFilters={activeFilters} />
        )}
      </div>
    </div>
  )
}