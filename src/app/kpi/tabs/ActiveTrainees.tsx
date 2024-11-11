import { Card } from '@/components/ui/card'
import { MetricCard } from '@/components/ui/metric-card'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
import { Users, TrendingUp } from 'lucide-react'
import { BarChart, Bar, PieChart, Pie, AreaChart, Area } from 'recharts'
import { ResponsiveContainer } from 'recharts'

const mockData = {
  totalTrainees: 245,
  activeTrainees: 180,
  monthlyTrend: [
    { month: ' ', count: 60 },
    { month: 'Jan', count: 120 },
    { month: 'Feb', count: 155 },
    { month: 'Mar', count: 150 },
    { month: 'Apr', count: 195 },
    { month: 'May', count: 170 },
    { month: 'Jun', count: 240 }
  ],
  yearlyData: [
    { year: 'Jan', count: 155 },
    { year: 'Feb', count: 150 },
    { year: 'Mar', count: 195 },
    { year: 'Apr', count: 170 },
    { year: 'May', count: 240 },
  ],
  locationData: [
    { location: 'New York', count: 85 },
    { location: 'London', count: 65 },
    { location: 'Tokyo', count: 45 },
    { location: 'UAE', count: 35 },
    { location: 'Sydney', count: 25 }
  ],
  statusDistribution: [
    { name: 'Active', value: 180 },
    { name: 'Inactive', value: 65 }
  ],
  ganttData: [
    { task: 'Jan', start: 0, Attended: 3 },
    { task: 'Feb', start: 2, Attended: 4 },
    { task: 'Mar', start: 5, Attended: 2 },
    { task: 'Apr', start: 7, Attended: 3 },
    { task: 'May', start: 9, Attended: 2 }
  ],
}

export default function ActiveTrainees() {
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
      <Card className="bg-[#082525] p-1 border-[#6D988B]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
          <MetricCard
            title="Total Trainees"
            value={mockData.totalTrainees}
            icon={Users}
            trend={{ value: 12, isPositive: true }}
            className="text-white [&_*]:text-white py-2"
          />
          <MetricCard
            title="Active Trainees"
            value={mockData.activeTrainees}
            icon={TrendingUp}
            trend={{ value: 8, isPositive: true }}
            className="text-white [&_*]:text-white py-2"
          />
          <MetricCard
            title="Completion Rate"
            value={`${Math.round((mockData.activeTrainees / mockData.totalTrainees) * 100)}%`}
            icon={TrendingUp}
            trend={{ value: 5, isPositive: true }}
            className="text-white [&_*]:text-white py-2"
          />
          <MetricCard
            title="Average Progress"
            value="73%"
            icon={Users}
            trend={{ value: 3, isPositive: true }}
            className="text-white [&_*]:text-white py-2"
          />
        </div>
      </Card>

      {/* Charts Section */}
      <Card className="bg-[#082525] p-1.5 border-[#6D988B]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {/* First Row */}
          <Card className="bg-[#093632] p-4  border-[#082525]">
            <h3 className="text-lg text-white font-medium mb-4">Trainee Trend</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData.monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff33" />
                  <XAxis dataKey="month" tick={{ fill: '#FFFFFF' }} />
                  <YAxis stroke="#fff" />
                  <Tooltip contentStyle={{ backgroundColor: '#082525', borderRadius: '8px' }} />
                  <Line type="monotone" dataKey="count" stroke="#82D9BF" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="bg-[#093632] p-4  border-[#082525]">
            <h3 className="text-lg text-white font-medium mb-4">Onboarded Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData.yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff33" />
                  <XAxis dataKey="year" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip contentStyle={{ backgroundColor: '#082525', borderRadius: '8px' }} />
                  <Bar dataKey="count" fill="#82D9BF" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="bg-[#093632] p-4  border-[#082525]">
            <h3 className="text-lg text-white font-medium mb-4">Programs Completed</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockData.yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff33" />
                  <XAxis dataKey="year" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip contentStyle={{ backgroundColor: '#082525', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="count" fill="#82D9BF" stroke="#82D9BF" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Second Row */}
          <Card className="bg-[#093632] p-4  border-[#082525]">
            <h3 className="text-lg text-white font-medium mb-4">Location Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData.locationData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff33" />
                  <XAxis type="number" stroke="#fff" />
                  <YAxis dataKey="location" type="category" stroke="#fff" />
                  <Tooltip contentStyle={{ backgroundColor: '#082525', borderRadius: '8px' }} />
                  <Bar dataKey="count" fill="#82D9BF" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          
          <Card className="bg-[#093632] p-4  border-[#082525]">
            <h3 className="text-lg text-white font-medium mb-4">Workshops</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={mockData.ganttData}
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff33" />
                  <XAxis dataKey="task" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#082525', borderRadius: '8px' }}
                    // formatter={(value, name) => [`Attended: ${value}`, name]}
                  />
                  <Line 
                    type="monotone"
                    dataKey="Attended" 
                    stroke="#82D9BF"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="bg-[#093632] p-4  border-[#082525]">
            <h3 className="text-lg text-white font-medium mb-4">Status Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockData.statusDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#82D9BF"
                    dataKey="value"
                    label
                  />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', color: '#ffff' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  )
}