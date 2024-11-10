'use client'

import { useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import { MetricCard } from './components/MetricCard'
import { AlertCard } from './components/AlertCard'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('timeline')
  const [selectedStage, setSelectedStage] = useState('all')
  const [selectedProgram, setSelectedProgram] = useState('all')
  const [selectedCountry, setSelectedCountry] = useState('all')
  const [selectedBatch, setSelectedBatch] = useState('all')

  // Program Timeline Data
  const timelineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Applications Received',
        data: [150, 280, 420, 580, 750, 900],
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Candidates Selected',
        data: [50, 120, 200, 280, 350, 400],
        borderColor: '#FF9800',
        backgroundColor: 'rgba(255, 152, 0, 0.1)',
        tension: 0.4,
      },
    ],
  }

  // Weekly Progress Data
  const weeklyProgressData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: 'Expected Progress',
      data: [25, 50, 75, 100],
      borderColor: '#4CAF50',
      borderDash: [5, 5],
      fill: false,
    }, {
      label: 'Actual Progress',
      data: [20, 45, 65, 80],
      borderColor: '#FF9800',
      backgroundColor: 'rgba(255, 152, 0, 0.1)',
      fill: true,
    }]
  }

  // Critical Path Data
  const criticalPathData = {
    currentStage: 'Training Center Allocation',
    delayedCases: 15,
    criticalCases: 8,
    stageDelays: [
      { stage: 'Document Verification', count: 5, severity: 'yellow' },
      { stage: 'Interview Process', count: 3, severity: 'red' },
      { stage: 'Center Allocation', count: 7, severity: 'yellow' }
    ]
  }

  // Program Status Data
  const participantStatusData = {
    total: 400,
    onTrack: {
      count: 280,
      percentage: 70,
      trend: '+8%'
    },
    atRisk: {
      count: 80,
      percentage: 20,
      trend: '-3%'
    },
    delayed: {
      count: 40,
      percentage: 10,
      trend: '-5%'
    }
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: { color: '#fff' }
      }
    },
    scales: {
      y: {
        grid: { color: 'rgba(255,255,255,0.1)' },
        ticks: { color: '#fff' }
      },
      x: {
        grid: { color: 'rgba(255,255,255,0.1)' },
        ticks: { color: '#fff' }
      }
    }
  }

  const documentVerificationData = {
    labels: ['Verified', 'Pending', 'Critical'],
    datasets: [{
      data: [65, 20, 15],
      backgroundColor: [
        'rgba(76, 175, 80, 0.8)',  // Green
        'rgba(255, 152, 0, 0.8)',  // Yellow
        'rgba(244, 67, 54, 0.8)',  // Red
      ],
      borderColor: [
        'rgba(76, 175, 80, 1)',
        'rgba(255, 152, 0, 1)',
        'rgba(244, 67, 54, 1)',
      ],
      borderWidth: 1
    }]
  }

  const centerCapacityData = {
    labels: ['Singapore', 'Dubai', 'Swiss', 'Melbourne'],
    datasets: [{
      data: [95, 80, 70, 85],
      backgroundColor: [
        'rgba(244, 67, 54, 0.8)',  // Red (>90%)
        'rgba(255, 152, 0, 0.8)',  // Yellow (80-90%)
        'rgba(76, 175, 80, 0.8)',  // Green (<80%)
        'rgba(255, 152, 0, 0.8)',  // Yellow
      ],
      borderColor: [
        'rgba(244, 67, 54, 1)',
        'rgba(255, 152, 0, 1)',
        'rgba(76, 175, 80, 1)',
        'rgba(255, 152, 0, 1)',
      ],
      borderWidth: 1
    }]
  }

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#fff',
          padding: 20,
          font: {
            size: 12
          }
        }
      }
    },
    cutout: '65%',
    maintainAspectRatio: false
  }

  // First, add this new data structure near your other data declarations
  const stageAnalysisData = {
    stages: [
      {
        name: 'Resume Screening',
        totalCases: 400,
        completed: 380,
        inProgress: 15,
        delayed: 5,
        completionRate: 95,
        expectedTimeframe: '3-5 days',
        averageTime: 4,
        status: 'On Track'
      },
      {
        name: 'Initial Interview',
        totalCases: 380,
        completed: 320,
        inProgress: 40,
        delayed: 20,
        completionRate: 84,
        expectedTimeframe: '7-10 days',
        averageTime: 9,
        status: 'Slight Delay'
      },
      {
        name: 'Background Check',
        totalCases: 320,
        completed: 250,
        inProgress: 50,
        delayed: 20,
        completionRate: 78,
        expectedTimeframe: '10-15 days',
        averageTime: 12,
        status: 'On Track'
      },
      {
        name: 'Training Center Allocation',
        totalCases: 250,
        completed: 180,
        inProgress: 40,
        delayed: 30,
        completionRate: 72,
        expectedTimeframe: '5-7 days',
        averageTime: 8,
        status: 'Delayed'
      },
      {
        name: 'Onboarding',
        totalCases: 180,
        completed: 150,
        inProgress: 20,
        delayed: 10,
        completionRate: 83,
        expectedTimeframe: '2-3 days',
        averageTime: 3,
        status: 'On Track'
      }
    ]
  }

  // Keep the existing stageAnalysisData structure but update the chart data
  const stageAnalysisChartData = {
    labels: stageAnalysisData.stages.map(stage => stage.name),
    datasets: [
      {
        label: 'Completed',
        data: stageAnalysisData.stages.map(stage => stage.completed),
        backgroundColor: 'rgba(75, 192, 192, 0.7)',  // Green
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'In Progress',
        data: stageAnalysisData.stages.map(stage => stage.inProgress),
        backgroundColor: 'rgba(255, 206, 86, 0.7)',  // Yellow
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
      {
        label: 'Delayed',
        data: stageAnalysisData.stages.map(stage => stage.delayed),
        backgroundColor: 'rgba(255, 99, 132, 0.7)',  // Red
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      }
    ]
  }

  // Update just the chart options to modify the y-axis
  const stageAnalysisChartOptions = {
    ...chartOptions,
    scales: {
      x: {
        stacked: true,
        grid: { color: 'rgba(255,255,255,0.1)' },
        ticks: { color: '#fff' }
      },
      y: {
        stacked: true,
        grid: { color: 'rgba(255,255,255,0.1)' },
        ticks: {
          color: '#fff',
          callback: function(tickValue: string | number) {
            const value = Number(tickValue);
            return value >= 1000 ? (value/1000) + 'k cases' : value + ' cases';
          }
        }
      }
    },
    plugins: {
      ...chartOptions.plugins,
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          label: function(context: import('chart.js').TooltipItem<'bar'>) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y + ' cases';
            }
            return label;
          }
        }
      },
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#fff',
          padding: 20,
          font: {
            size: 12
          }
        }
      }
    }
  }

  // Add filter options data
  const filterOptions = {
    stages: ['Resume Screening', 'Initial Interview', 'Background Check', 'Training Center Allocation', 'Onboarding'],
    programs: ['Program A', 'Program B', 'Program C', 'Program D'],
    countries: ['Singapore', 'Dubai', 'Swiss', 'Melbourne'],
    batches: ['Batch 1', 'Batch 2', 'Batch 3', 'Batch 4']
  }

  // Add the FilterBar component
  const FilterBar = () => {
    const handleApplyFilters = () => {
      // This will trigger a re-render with the current filter values
      // You can add additional logic here if needed
      console.log('Applying filters:', {
        stage: selectedStage,
        program: selectedProgram,
        country: selectedCountry,
        batch: selectedBatch
      });
    };

    return (
      <div className="flex flex-wrap gap-2 mb-6">
        <div className="flex-1 min-w-[200px]">
          <select
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
            className="w-full bg-[#002B36] text-white px-4 py-2 rounded-lg border border-teal-800/30"
          >
            <option value="all">Select Stage</option>
            {filterOptions.stages.map(stage => (
              <option key={stage} value={stage}>{stage}</option>
            ))}
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <select
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
            className="w-full bg-[#002B36] text-white px-4 py-2 rounded-lg border border-teal-800/30"
          >
            <option value="all">Select Program</option>
            {filterOptions.programs.map(program => (
              <option key={program} value={program}>{program}</option>
            ))}
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full bg-[#002B36] text-white px-4 py-2 rounded-lg border border-teal-800/30"
          >
            <option value="all">Select Country</option>
            {filterOptions.countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="w-full bg-[#002B36] text-white px-4 py-2 rounded-lg border border-teal-800/30"
          >
            <option value="all">Select Batch</option>
            {filterOptions.batches.map(batch => (
              <option key={batch} value={batch}>{batch}</option>
            ))}
          </select>
        </div>
        <button
          onClick={() => {
            setSelectedStage('all')
            setSelectedProgram('all')
            setSelectedCountry('all')
            setSelectedBatch('all')
          }}
          className="px-6 py-2 text-white bg-teal-600 rounded-lg hover:bg-teal-700"
        >
          Clear
        </button>
        <button
          onClick={handleApplyFilters}
          className="px-6 py-2 text-white bg-teal-600 rounded-lg hover:bg-teal-700"
        >
          Apply Filters
        </button>
      </div>
    )
  }

  // Add the getFilteredData function
  const getFilteredData = () => {
    // This is a placeholder for the actual filtering logic
    // You would implement the actual filtering based on your data structure
    if (selectedCountry !== 'all') {
      return {
        stageAnalysisData: {
          stages: stageAnalysisData.stages.map(stage => ({
            ...stage,
            totalCases: Math.floor(stage.totalCases * 0.5),
            completed: Math.floor(stage.completed * 0.5),
            inProgress: Math.floor(stage.inProgress * 0.5),
            delayed: Math.floor(stage.delayed * 0.5),
          }))
        },
        // Add filtered versions of other data structures
        documentVerificationData,
        centerCapacityData,
        // ... other data
      }
    }

    return {
      stageAnalysisData,
      documentVerificationData,
      centerCapacityData,
      // ... other data
    }
  }

  // First, add this new data structure near your other chart data
  const stageStatusPieData = {
    labels: ['On Track', 'Slight Delay', 'Delayed'],
    datasets: [{
      data: stageAnalysisData.stages.reduce((acc, stage) => {
        if (stage.status === 'On Track') acc[0]++;
        else if (stage.status === 'Slight Delay') acc[1]++;
        else acc[2]++;
        return acc;
      }, [0, 0, 0]),
      backgroundColor: [
        'rgba(76, 175, 80, 0.8)',  // Green
        'rgba(255, 152, 0, 0.8)',  // Yellow
        'rgba(244, 67, 54, 0.8)',  // Red
      ],
      borderColor: [
        'rgba(76, 175, 80, 1)',
        'rgba(255, 152, 0, 1)',
        'rgba(244, 67, 54, 1)',
      ],
      borderWidth: 1
    }]
  }

  // Add these options for the small pie chart
  const smallPieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true
      }
    }
  }

  const renderContent = () => {
    const filteredData = getFilteredData()
    switch (activeTab) {
      case 'timeline':
        return (
          <div className="space-y-6">
            <FilterBar />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <MetricCard
                title="Total Selected Candidates"
                value={filteredData.stageAnalysisData.stages[0].totalCases.toString()}
                change="+15% from last batch"
                trend="up"
                className="border-l-4 border-green-500"
              />
              <MetricCard
                title="Training Center Allocated"
                value={`${participantStatusData.onTrack.percentage}%`}
                change={participantStatusData.onTrack.trend}
                trend="up"
                className="border-l-4 border-blue-500"
              />
              <MetricCard
                title="Pending Allocation"
                value={`${participantStatusData.delayed.percentage}%`}
                change={participantStatusData.delayed.trend}
                trend="down"
                className="border-l-4 border-yellow-500"
              />
            </div>
            <div className="bg-[#002633] p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Program Application Progress</h3>
              <Line data={timelineData} options={chartOptions} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#002633] p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-4">Training Center Allocations</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center text-gray-300">
                    <span>Singapore Tourism Academy</span>
                    <span className="text-green-400">120 candidates</span>
                  </li>
                  <li className="flex justify-between items-center text-gray-300">
                    <span>Dubai Tourism Institute</span>
                    <span className="text-yellow-400">95 candidates</span>
                  </li>
                  <li className="flex justify-between items-center text-gray-300">
                    <span>Swiss Hotel Management School</span>
                    <span className="text-green-400">85 candidates</span>
                  </li>
                  <li className="flex justify-between items-center text-gray-300">
                    <span>Melbourne Tourism College</span>
                    <span className="text-red-400">100 candidates</span>
                  </li>
                </ul>
              </div>
              <div className="bg-[#002633] p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-4">Weekly Progress Overview</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">Document Collection</span>
                      <span className="text-green-400">85% Complete</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 rounded-full h-2" style={{ width: '85%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">Interview Completion</span>
                      <span className="text-yellow-400">70% Complete</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-yellow-500 rounded-full h-2" style={{ width: '70%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">Center Allocation</span>
                      <span className="text-red-400">45% Complete</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-red-500 rounded-full h-2" style={{ width: '45%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'stages':
        return (
          <div className="space-y-6">
            <FilterBar />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <MetricCard
                title="Overall Completion Rate"
                value={`${Math.round(stageAnalysisData.stages.reduce((acc, stage) => 
                  acc + stage.completionRate, 0) / stageAnalysisData.stages.length)}%`}
                change="+5% from last month"
                trend="up"
                className="border-l-4 border-green-500"
              />
              <MetricCard
                title="Total In Progress"
                value={stageAnalysisData.stages.reduce((acc, stage) => 
                  acc + stage.inProgress, 0).toString()}
                change="-10% from last week"
                trend="down"
                className="border-l-4 border-yellow-500"
              />
              <MetricCard
                title="Total Delayed Cases"
                value={stageAnalysisData.stages.reduce((acc, stage) => 
                  acc + stage.delayed, 0).toString()}
                change="-3 from last week"
                trend="down"
                className="border-l-4 border-red-500"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-3 bg-[#002633] p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-4">Stage Progress Overview</h3>
                <div className="h-[400px]" id="chart-container">
                  <Bar data={stageAnalysisChartData} options={stageAnalysisChartOptions} />
                </div>
              </div>
              
              <div className="bg-[#002633] p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-4">Status Distribution</h3>
                <div className="h-[300px]">
                  <Doughnut data={stageStatusPieData} options={smallPieOptions} />
                </div>
              </div>
            </div>

            <div className="bg-[#002633] p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Stage Details</h3>
              <div className="space-y-4">
                {stageAnalysisData.stages.map((stage, index) => (
                  <div key={index} className="p-4 bg-[#001F29] rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">{stage.name}</span>
                      <span className={`px-2 py-1 rounded text-sm ${
                        stage.status === 'On Track' 
                          ? 'bg-green-500/20 text-green-400'
                          : stage.status === 'Slight Delay'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-red-500/20 text-red-400'
                      }`}>
                        {stage.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-gray-400">Completion Rate</div>
                        <div className="text-white">{stage.completionRate}%</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Cases</div>
                        <div className="text-white">{stage.completed}/{stage.totalCases}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Expected Time</div>
                        <div className="text-white">{stage.expectedTimeframe}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Delayed Cases</div>
                        <div className="text-red-400">{stage.delayed}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'weekly':
        return (
          <div className="space-y-6">
            <FilterBar />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <MetricCard
                title="On-Track Participants"
                value={`${participantStatusData.onTrack.count}`}
                change={participantStatusData.onTrack.trend}
                trend="up"
                className="border-l-4 border-green-500"
              />
              <MetricCard
                title="Delayed Cases"
                value={criticalPathData.delayedCases.toString()}
                change="-2 from last week"
                trend="down"
                className="border-l-4 border-yellow-500"
              />
              <MetricCard
                title="Critical Cases"
                value={criticalPathData.criticalCases.toString()}
                change="+3 from last week"
                trend="up"
                className="border-l-4 border-red-500"
              />
            </div>

            <div className="bg-[#002633] p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Weekly Progress Tracking</h3>
              <Line data={weeklyProgressData} options={chartOptions} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#002633] p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-4">Time Analysis</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">Expected Timeline</span>
                      <span className="text-green-400">12 weeks</span>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Current Progress</span>
                        <span className="text-yellow-400">Week 8 (-1 week)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#002633] p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-4">Critical Path Status</h3>
                <div className="space-y-3">
                  {criticalPathData.stageDelays.map((delay, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-300">{delay.stage}</span>
                      <span className={`px-2 py-1 rounded text-sm ${
                        delay.severity === 'red' 
                          ? 'bg-red-500/20 text-red-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {delay.count} cases
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 'alerts':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-[#002633] p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-4">Document Verification Status</h3>
                <div className="h-[300px] relative">
                  <Doughnut data={documentVerificationData} options={doughnutOptions} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">85%</div>
                      <div className="text-sm text-gray-400">Completion</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#002633] p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-4">Training Center Capacity</h3>
                <div className="h-[300px] relative">
                  <Doughnut data={centerCapacityData} options={doughnutOptions} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">82%</div>
                      <div className="text-sm text-gray-400">Avg. Capacity</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <AlertCard
              severity="critical"
              title="Document Verification Required"
              message="35 candidates need to submit additional documentation"
            />
            <div className="bg-[#002633] p-6 rounded-xl">
              <h4 className="text-white font-medium mb-2">Required Documents:</h4>
              <ul className="text-gray-300 space-y-1">
                <li className="flex items-center justify-between">
                  <span>Educational Certificates</span>
                  <span className="text-red-400">15 pending</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Work Experience Proof</span>
                  <span className="text-yellow-400">12 pending</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Language Proficiency Scores</span>
                  <span className="text-yellow-400">8 pending</span>
                </li>
              </ul>
              <p className="text-blue-400 mt-4">Deadline: May 30, 2024</p>
            </div>
            <AlertCard
              severity="warning"
              title="Training Center Capacity Alert"
              message="Singapore Tourism Academy approaching maximum capacity"
            />
          </div>
        )
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-[#002B36] rounded-xl p-2 w-full">
        <div className="flex justify-between w-full">
          {[
            { id: 'timeline', label: 'Timeline' },
            
            { id: 'weekly', label: 'Weekly Progress' },
            { id: 'alerts', label: 'Alerts' },
            { id: 'stages', label: 'Stage Analysis' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-8 py-3 rounded-lg font-medium transition-colors
                flex-1 mx-1 text-center
                ${activeTab === tab.id 
                  ? 'bg-[#004D40] text-white' 
                  : 'text-white/80 hover:text-white hover:bg-[#004D40]/50'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-teal-900/20 rounded-xl p-6 border border-teal-800/30">
        {renderContent()}
      </div>
    </div>
  )
}