'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { FiArrowLeft, FiMapPin, FiBriefcase, FiBook, FiCheck, FiClock, FiHome, FiUser, FiActivity, FiTrendingUp } from 'react-icons/fi'
import { IoAirplaneOutline } from 'react-icons/io5'
// import participantDetailsData from '../../data/participantDetails.json'
// import participantsData from '../../data/participants.json'
import { participantsData } from '@/app/trainee/data/participants'  //D:\project\key performance indicators\src\app\trainee\data\participants.ts
import { participantDetails } from '@/app/trainee/data/participantDetails' 

type ParticipantDetail = {
  personalInfo: {
    name: string
    gender: string
    age: number
    education: string
  }
  professionalInfo: {
    currentCompany: string
    companyType: string
    experience: string
    currentPosition: string
  }
  boardingDetails: {
    from: string
    stayingIn?: string
    costOfStay?: string
  }
  programProgress: {
    [key: string]: {
      status: 'completed' | 'in progress' | 'pending'
    }
  }
}

// Add proper typing for the params
interface PageProps {
  params: Promise<{
    id: string
  }>
}

// Add this interface near your other type definitions
interface Participant {
  id: string;
  program: string;
  batchNumber: string | number;
  location: string;
  country: string;
}

// Helper component for consistent info display
const InfoItem = ({ icon, label, value }: { icon?: React.ReactNode, label: string, value: string }) => (
  <div className="flex items-start space-x-3">
    {icon && <div className="text-gray-400 mt-1">{icon}</div>}
    <div className="flex-1">
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-white break-words">{value}</p>
    </div>
  </div>
)

// Add this new component for the progress timeline
const ProgressTimeline = ({ progress }: { 
  progress: {
    [key: string]: {
      status: 'completed' | 'in progress' | 'pending'
    }
  }
}) => {
  const stages = [
    { key: 'onboard', label: 'Onboarding' },
    { key: 'training', label: 'Training' },
    { key: 'evaluation', label: 'Evaluation' },
    { key: 'employed', label: 'Employment' }
  ]

  return (
    <div className="relative">
      {/* Progress Line */}
      <div className="absolute top-5 left-6 right-6 h-0.5 bg-[#1D4B44]" />
      
      {/* Progress Steps */}
      <div className="relative flex justify-between">
        {stages.map((stage) => {
          const status = progress[stage.key]?.status
          const isCompleted = status === 'completed'
          const isInProgress = status === 'in progress'
          
          return (
            <div key={stage.key} className="flex flex-col items-center z-10">
              {/* Step Circle */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center
                ${isCompleted ? 'bg-[#4FD1C5]' : 
                  isInProgress ? 'bg-yellow-500' : 'bg-[#1D4B44]'}`}>
                {isCompleted ? (
                  <FiCheck className="text-[#002E25] text-lg" />
                ) : isInProgress ? (
                  <div className="w-3 h-3 bg-[#002E25] rounded-full" />
                ) : (
                  <div className="w-3 h-3 bg-gray-500 rounded-full" />
                )}
              </div>
              
              {/* Step Label */}
              <div className="mt-2 text-center">
                <p className={`text-sm font-medium
                  ${isCompleted ? 'text-[#4FD1C5]' : 
                    isInProgress ? 'text-yellow-500' : 'text-gray-400'}`}>
                  {stage.label}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {isCompleted ? 'Completed' : 
                    isInProgress ? 'In Progress' : 'Pending'}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Add this helper function at the top of your file after imports
const getRandomStatus = () => {
  const statuses = ['signed contract', 'In workshop']
  return statuses[Math.floor(Math.random() * statuses.length)]
}

export default function ParticipantPage({ params }: PageProps) {
  const resolvedParams = use(params)  // Unwrap the params promise
  const router = useRouter()
  const [details, setDetails] = useState<ParticipantDetail | null>(null)
  const [participant, setParticipant] = useState<Participant | null>(null)
  const participantId = resolvedParams.id
  // Add this new state for contract status
  const [contractStatus] = useState(getRandomStatus())

  useEffect(() => {
    const participantDetail = participantDetails[participantId as keyof typeof participantDetails]
    const participantData = participantsData.participants.find(p => p.id === participantId)
    
    if (participantDetail && participantData) {
      setDetails(participantDetail)
      setParticipant(participantData)
    }
  }, [participantId])

  const handleBackClick = () => {
    // Navigate back to dashboard with participants tab
    router.push('/dashboard')
    // Ensure participants tab is active
    sessionStorage.setItem('lastActiveTab', 'participants')
  }

  if (!details || !participant) {
    return (
      <div className="min-h-screen bg-[#002E25] p-6 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#002E25] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={handleBackClick}
          className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          Back to Dashboard
        </button>

        {/* Main Content Grid */}
        <div className="space-y-6">
          {/* Top Row - Personal & Professional Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Personal Information Card */}
            <div className="bg-[#1A3F3A] rounded-lg p-6 border border-[#1D4B44] hover:border-[#4FD1C5] transition-colors">
              <h2 className="text-lg font-medium text-white mb-4 flex items-center">
                <FiUser className="mr-2 text-[#4FD1C5]" />
                Personal Information
              </h2>
              <div className="space-y-4">
                <InfoItem label="Name" value={details.personalInfo.name} />
                <InfoItem label="Gender" value={details.personalInfo.gender} />
                <InfoItem label="Age" value={details.personalInfo.age.toString()} />
                <InfoItem label="Education" value={details.personalInfo.education} />
              </div>
            </div>

            {/* Professional Information Card */}
            <div className="md:col-span-2 bg-[#1A3F3A] rounded-lg p-6 border border-[#1D4B44] hover:border-[#4FD1C5] transition-colors">
              <h2 className="text-lg font-medium text-white mb-4 flex items-center">
                <FiBriefcase className="mr-2 text-[#4FD1C5]" />
                Professional Details
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <InfoItem 
                    icon={<FiBriefcase />}
                    label="Company" 
                    value={details.professionalInfo.currentCompany} 
                  />
                  <InfoItem 
                    icon={<FiBriefcase />}
                    label="Company Type" 
                    value={details.professionalInfo.companyType} 
                  />
                  <InfoItem 
                    icon={<FiClock />}
                    label="Experience" 
                    value={details.professionalInfo.experience} 
                  />
                </div>
                <div className="space-y-4">
                  <InfoItem 
                    icon={<FiBriefcase />}
                    label="Occupation" 
                    value={details.professionalInfo.currentPosition} 
                  />
                  <InfoItem 
                    icon={<FiBook />}
                    label="Program" 
                    value={`${participant.program} (Batch ${participant.batchNumber})`} 
                  />
                  <InfoItem 
                    icon={<FiMapPin />}
                    label="Work Location" 
                    value={`${participant.location}, ${participant.country}`} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Current Status Section */}
          <div className="bg-[#1A3F3A] rounded-lg p-6 border border-[#1D4B44] hover:border-[#4FD1C5] transition-colors">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="p-3 bg-[#002E25] rounded-full mr-4">
                  <FiActivity className="text-[#4FD1C5] text-xl" />
                </div>
                <div>
                  <h2 className="text-lg font-medium text-white">Current Status</h2>
                  <p className="text-gray-400 text-sm">Program Participation Status</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right mr-6">
                  <p className="text-gray-400 text-sm">Last Updated</p>
                  <p className="text-white">{new Date().toLocaleDateString()}</p>
                </div>
                <div className={`px-5 py-2.5 rounded-full ${
                  contractStatus === 'signed contract' 
                    ? 'bg-green-500/20 border border-green-500/30'
                    : 'bg-yellow-500/20 border border-yellow-500/30'
                }`}>
                  <div className="flex items-center space-x-2">
                    <span className={`w-2 h-2 rounded-full ${
                      contractStatus === 'signed contract' 
                        ? 'bg-green-400'
                        : 'bg-yellow-400'
                    }`}></span>
                    <span className={`text-sm font-medium ${
                      contractStatus === 'signed contract' 
                        ? 'text-green-400'
                        : 'text-yellow-400'
                    }`}>
                      {contractStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row - Location and Progress */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Workshop Location Details */}
            <div className="bg-[#1A3F3A] rounded-lg p-6 border border-[#1D4B44] hover:border-[#4FD1C5] transition-colors">
              <h2 className="text-lg font-medium text-white mb-4 flex items-center">
                <FiMapPin className="mr-2 text-[#4FD1C5]" />
                Workshop Location Details
              </h2>
              <div className="space-y-4">
                <InfoItem 
                  icon={<FiMapPin />}
                  label="Current Location" 
                  value={`${participant.location}, ${participant.country}`} 
                />
                <InfoItem 
                  icon={<FiMapPin />}
                  label="Place of Origin" 
                  value={details.boardingDetails.from} 
                />
                <InfoItem 
                  icon={<FiHome />}
                  label="Staying In" 
                  value={details.boardingDetails.stayingIn || 'Company Accommodation'} 
                />
                <InfoItem 
                  icon={<IoAirplaneOutline />}
                  label="Cost of Stay" 
                  value={`$${details.boardingDetails.costOfStay || '1500'}/month`} 
                />
              </div>
            </div>

            {/* Program Progress Card */}
            <div className="md:col-span-2 bg-[#1A3F3A] rounded-lg p-6 border border-[#1D4B44]">
              <h2 className="text-lg font-medium text-white mb-6 flex items-center">
                <FiTrendingUp className="mr-2 text-[#4FD1C5]" />
                Program Progress
              </h2>

              {/* Replace the existing timeline implementation with the component */}
              <ProgressTimeline progress={details.programProgress} />

              {/* Current Stage Details */}
              <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="p-4 bg-[#002E25] rounded-lg">
                  <div>
                    <h3 className="text-[#4FD1C5] font-medium mb-2">Current Stage</h3>
                    <p className="text-white">
                      {(Object.entries(details.programProgress).find(([, value]) => 
                        value.status === 'in progress')?.[0] ?? 'Completed')
                        .charAt(0).toUpperCase() + 
                        (Object.entries(details.programProgress).find(([, value]) => 
                        value.status === 'in progress')?.[0] ?? 'Completed')
                        .slice(1)}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-[#002E25] rounded-lg">
                  <div>
                    <h3 className="text-[#4FD1C5] font-medium mb-2">Overall Progress</h3>
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 bg-[#1D4B44] rounded-full h-2">
                        <div 
                          className="bg-[#4FD1C5] h-2 rounded-full" 
                          style={{ 
                            width: `${Math.round((Object.values(details.programProgress)
                              .filter(stage => stage.status === 'completed').length / 4) * 100)}%` 
                          }}
                        />
                      </div>
                      <span className="text-white font-medium">
                        {Math.round((Object.values(details.programProgress)
                          .filter(stage => stage.status === 'completed').length / 4) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 