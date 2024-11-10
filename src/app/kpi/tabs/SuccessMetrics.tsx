import { Card } from '@/components/ui/card'
import { MetricCard } from '@/components/ui/metric-card'
import { 
  BarChart, 
  Bar, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { Trophy, Star, TrendingUp, BookOpen } from 'lucide-react'

const mockData = {
  averageScore: 85.4,
  passRate: 92.3,
  skillImprovement: 76.8,
  satisfactionRate: 88.5,
  performanceByModule: [
    { module: 'Module 1', avgScore: 87, passRate: 94 },
    { module: 'Module 2', avgScore: 82, passRate: 88 },
    { module: 'Module 3', avgScore: 89, passRate: 96 },
    { module: 'Module 4', avgScore: 84, passRate: 91 }
  ],
  skillGrowth: [
    { skill: 'Technical', before: 45, after: 85 },
    { skill: 'Communication', before: 55, after: 80 },
    { skill: 'Leadership', before: 40, after: 75 },
    { skill: 'Problem Solving', before: 50, after: 88 }
  ]
}

export default function SuccessMetrics() {
  return (
    <div className="container mx-auto p-6 space-y-6">

      {/* Filter Section */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex space-x-6">
          <select className="bg-[#082525] text-white p-2 border-[#3E615F] bg-[#3E615F] rounded-md w-48">
            <option>Select Stage</option>
            <option>Stage 1</option>
            <option>Stage 2</option>
            <option>Stage 3</option>
          </select>
          <select className="bg-[#082525] text-white p-2 border-[#3E615F] bg-[#3E615F] rounded-md w-48">
            <option>Select Program</option>
            <option>Program A</option>
            <option>Program B</option>
            <option>Program C</option>
          </select>
          <select className="bg-[#082525] text-white p-2 border-[#3E615F] bg-[#3E615F] rounded-md w-48">
            <option>Select Country</option>
            <option>USA</option>
            <option>UK</option>
            <option>Australia</option>
          </select>
          <select className="bg-[#082525] text-white p-2 border-[#3E615F] bg-[#3E615F] rounded-md w-48">
            <option>Select Batch</option>
            <option>Batch 1</option>
            <option>Batch 2</option>
            <option>Batch 3</option>
          </select>
        </div>
        <div className="flex space-x-2">
          <button className="bg-[#3E615F] text-white p-2 rounded-md flex items-center">
            <span>Apply Filter</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </button>
          <button className="bg-[#3E615F] text-white p-2 rounded-md">
            Clear
          </button>
        </div>
      </div>

      {/* Metrics Section */}
      <Card className="bg-[#082525] p-1 border-[#3E615F]">

      <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
        <MetricCard
          title="Average Score"
          value={`${mockData.averageScore}%`}
          icon={Trophy}
          trend={{ value: 2.3, isPositive: true }}
          className="text-white [&_*]:text-white py-2"
        />
        <MetricCard
          title="Pass Rate"
          value={`${mockData.passRate}%`}
          icon={Star}
          trend={{ value: 1.5, isPositive: true }}
          className="text-white [&_*]:text-white py-2"
        />
        <MetricCard
          title="Skill Improvement"
          value={`${mockData.skillImprovement}%`}
          icon={TrendingUp}
          trend={{ value: 4.2, isPositive: true }}
          className="text-white [&_*]:text-white py-2"
        />
        <MetricCard
          title="Satisfaction Rate"
          value={`${mockData.satisfactionRate}%`}
          icon={BookOpen}
          trend={{ value: 3.1, isPositive: true }}
          className="text-white [&_*]:text-white py-2"
        />
      </div>
      </Card>

      {/* Charts Section */}
      <Card className="bg-[#082525] p-1.5 border-[#3E615F]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {/* First Row */}
          <Card className="bg-[#093632] p-4  border-[#082525]">
            <h3 className="text-lg text-white font-medium mb-4">Performance by Module</h3>
            <div className="h-[300px]">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockData.performanceByModule}>
                <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="module" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="avgScore" name="Average Score" fill="#059669" />
              <Bar dataKey="passRate" name="Pass Rate" fill="#0ea5e9" />
            </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="bg-[#093632] p-4  border-[#082525]">
            <h3 className="text-lg text-white font-medium mb-4">Skill Growth Analysis</h3>
            <div className="h-[300px]">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockData.skillGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="skill" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="before" name="Before Training" fill="#94a3b8" />
              <Bar dataKey="after" name="After Training" fill="#059669" />
            </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          
        </div>
      </Card>
    </div>
  )
}