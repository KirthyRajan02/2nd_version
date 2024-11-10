import { Card } from '@/components/ui/card'
import { MetricCard } from '@/components/ui/metric-card'
import { 
  LineChart, 
  Line, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts'
import { Award, Target, Clock, TrendingUp } from 'lucide-react'

const mockData = {
  overallCompletion: 78,
  onTimeCompletion: 65,
  averageTime: 42,
  completionTrend: [
    { month: 'Jan', rate: 75 },
    { month: 'Feb', rate: 78 },
    { month: 'Mar', rate: 82 },
    { month: 'Apr', rate: 85 }
  ],
  completionStatus: [
    { name: 'Completed', value: 78 },
    { name: 'In Progress', value: 15 },
    { name: 'Delayed', value: 7 }
  ]
}

const COLORS = ['#059669', '#fbbf24', '#ef4444']

export default function CompletionRates() {
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
            title="Overall Completion"
            value={`${mockData.overallCompletion}%`}
            icon={Award}
            trend={{ value: 5, isPositive: true }}
            className="text-white [&_*]:text-white py-2"
          />
          <MetricCard
            title="On-Time Completion"
            value={`${mockData.onTimeCompletion}%`}
            icon={Target}
            trend={{ value: 3, isPositive: true }}
            className="text-white [&_*]:text-white py-2"
          />
          <MetricCard
            title="Average Time"
            value={`${mockData.averageTime} days`}
            icon={Clock}
            trend={{ value: 2, isPositive: false }}
            className="text-white [&_*]:text-white py-2"
          />
          <MetricCard
            title="Completion Trend"
            value={`${mockData.completionTrend[mockData.completionTrend.length - 1].rate}%`}
            icon={TrendingUp}
            trend={{ value: 4, isPositive: true }}
            className="text-white [&_*]:text-white py-2"
          />
        </div>
      </Card>

      {/* Charts Section */}
      <Card className="bg-[#082525] p-1.5 border-[#3E615F]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {/* First Row */}
          <Card className="bg-[#093632] p-4  border-[#082525]">
          <h3 className="text-lg font-medium mb-4">Completion Rate Trend</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData.completionTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fill: '#FFFFFF' }} />
              <YAxis domain={[0, 100]} tick={{ fill: '#FFFFFF' }} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="rate" 
                stroke="#059669" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
          </div>
        </Card>

      <Card className="bg-[#093632] p-4  border-[#082525]">
          <h3 className="text-lg font-medium mb-4">Completion Status Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mockData.completionStatus}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {mockData.completionStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        </div>
      </Card>
    </div>
  )
}

