'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { participantsData } from '../data/participants'
import { participantDetails } from '../data/participantDetails'
import { FiChevronRight, FiSearch } from 'react-icons/fi'

interface Participant {
  id: string
  name: string
  company: string
  position: string
  location: string
  country: string
  program: string
  batchNumber: string
  stage: {
    current: string
    date: string
  }
}

interface ParticipantTabProps {
  activeFilters: {
    stage: string[]
    performance: string[]
    country: string[]
    program: string[]
    batch: string[]
  }
}

export default function ParticipantTab({ activeFilters }: ParticipantTabProps) {
  const router = useRouter()
  const [participants, setParticipants] = useState<Participant[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredParticipants, setFilteredParticipants] = useState<Participant[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setParticipants(participantsData.participants)
    setFilteredParticipants(participantsData.participants)
  }, [])

  useEffect(() => {
    let filtered = participants.filter(participant =>
      participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.country.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Apply stage filters
    if (activeFilters.stage.length > 0) {
      filtered = filtered.filter(participant => 
        activeFilters.stage.includes(participant.stage.current)
      )
    }

    // Apply performance filters using participantDetails
    if (activeFilters.performance.length > 0) {
      filtered = filtered.filter(participant => {
        const rating = participantDetails[participant.id]?.performance.rating || 0
        if (activeFilters.performance.includes('High')) {
          return rating >= 4
        }
        if (activeFilters.performance.includes('Medium')) {
          return rating >= 2 && rating < 4
        }
        if (activeFilters.performance.includes('Low')) {
          return rating < 2
        }
        return true
      })
    }

    // Apply country filter
    if (activeFilters.country.length > 0) {
      filtered = filtered.filter(participant => 
        activeFilters.country.includes(participant.country)
      )
    }

    // Apply program filter
    if (activeFilters.program.length > 0) {
      filtered = filtered.filter(participant => 
        activeFilters.program.includes(participant.program)
      )
    }

    // Apply batch filter
    if (activeFilters.batch.length > 0) {
      filtered = filtered.filter(participant => 
        activeFilters.batch.includes(participant.batchNumber)
      )
    }

    setFilteredParticipants(filtered)
  }, [searchTerm, participants, activeFilters])

  const handleParticipantClick = (participantId: string) => {
    router.push(`/trainee/participant/${participantId}`)
  }

  // Use conditional rendering for client-side only content
  if (!mounted) {
    return null // or a loading skeleton
  }

  return (
    <div className="flex flex-col h-full bg-[#002E25]">
      {/* Search Section - Fixed */}
      <div className="flex-none px-6 pt-8 pb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 border border-[#1D4B44] rounded-lg bg-[#1A3F3A] text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#4FD1C5]"
            placeholder="Search by name, company, or country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Results Count - Fixed */}
      <div className="flex-none px-6 pb-4 text-gray-400 text-sm">
        Showing {filteredParticipants.length} of {participants.length} participants
      </div>

      {/* Table Container */}
      <div className="flex-1 overflow-hidden">
        {/* Fixed Header Table */}
        <table className="w-full table-fixed bg-[#002E25]">
          <thead>
            <tr className="border-y border-[#1D4B44]">
              <th className="w-1/4 text-left text-sm font-medium text-gray-400 px-6 py-3">Name</th>
              <th className="w-1/5 text-left text-sm font-medium text-gray-400 px-6 py-3">Company</th>
              <th className="w-1/5 text-left text-sm font-medium text-gray-400 px-6 py-3">Location</th>
              <th className="w-1/5 text-left text-sm font-medium text-gray-400 px-6 py-3">Program</th>
              <th className="w-1/5 text-left text-sm font-medium text-gray-400 px-6 py-3">Stage</th>
              <th className="w-16 text-left text-sm font-medium text-gray-400 px-6 py-3"></th>
            </tr>
          </thead>
        </table>

        {/* Scrollable Content */}
        <div 
          className="overflow-y-auto bg-[#002E25]"
          style={{ height: 'calc(100vh - 280px)' }}
        >
          <table className="w-full table-fixed">
            <tbody className="divide-y divide-[#1D4B44]">
              {filteredParticipants.map((participant) => (
                <tr 
                  key={participant.id}
                  onClick={() => handleParticipantClick(participant.id)}
                  className="hover:bg-[#1A3F3A] cursor-pointer transition-colors"
                >
                  <td className="w-1/4 px-6 py-4">
                    <div>
                      <p className="text-white font-medium">{participant.name}</p>
                      <p className="text-gray-400 text-sm">{participant.position}</p>
                    </div>
                  </td>
                  <td className="w-1/5 px-6 py-4 text-white">{participant.company}</td>
                  <td className="w-1/5 px-6 py-4">
                    <div>
                      <p className="text-white">{participant.location}</p>
                      <p className="text-gray-400 text-sm">{participant.country}</p>
                    </div>
                  </td>
                  <td className="w-1/5 px-6 py-4">
                    <div>
                      <p className="text-white">{participant.program}</p>
                      <p className="text-gray-400 text-sm">Batch {participant.batchNumber}</p>
                    </div>
                  </td>
                  <td className="w-1/5 px-6 py-4">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        participant.stage.current === 'employed' 
                          ? 'bg-[#4FD1C5]'
                          : participant.stage.current === 'evaluation'
                          ? 'bg-[#68D391]'
                          : participant.stage.current === 'training'
                          ? 'bg-[#F6E05E]'
                          : 'bg-[#4FD1C5]'
                      }`} />
                      <span className="text-white capitalize">
                        {participant.stage.current}
                      </span>
                    </div>
                  </td>
                  <td className="w-16 px-6 py-4">
                    <button className="text-gray-400 hover:text-white">
                      <FiChevronRight size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}