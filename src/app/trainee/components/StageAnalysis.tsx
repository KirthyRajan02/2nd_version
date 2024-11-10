'use client'

interface StageAnalysisProps {
  activeFilters: {
    stage: string[]
    performance: string[]
    country: string[]
    program: string[]
    batch: string[]
  }
}

const StageAnalysis = ({ }: StageAnalysisProps) => {
  return (
    <div className="bg-[#002E25] rounded-lg">
      <div className="p-6">
        <div className="h-[360px] flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-[#4FD1C5] text-xl font-medium mb-2">
              Stage Analysis Coming Soon
            </h3>
            <p className="text-gray-400 text-sm">
              We&apos;re working on bringing you detailed stage-wise analysis.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StageAnalysis 