import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  AreaChart, Area
} from 'recharts';

const COLORS = ['#7FFFD4', '#98FFE3', '#85EED2', '#6BDFC4'];

export default function BatchProgress() {
  // Dummy data for different charts
  const batchProgressTrend = [
    { week: 'Week 1', completion: 20, target: 25 },
    { week: 'Week 2', completion: 45, target: 50 },
    { week: 'Week 3', completion: 68, target: 75 },
    { week: 'Week 4', completion: 85, target: 80 },
    { week: 'Week 5', completion: 92, target: 85 },
    { week: 'Week 6', completion: 98, target: 90 },
  ];

  const skillDistribution = [
    { skill: 'Technical', value: 85 },
    { skill: 'Soft Skills', value: 78 },
    { skill: 'Project Work', value: 92 },
    { skill: 'Assessments', value: 88 },
    { skill: 'Attendance', value: 95 },
  ];

  const moduleCompletion = [
    { name: 'Completed', value: 75 },
    { name: 'In Progress', value: 15 },
    { name: 'Pending', value: 10 },
  ];

  const traineePerformance = [
    { trainee: 'John', score: 88 },
    { trainee: 'Emma', score: 92 },
    { trainee: 'Michael', score: 85 },
    { trainee: 'Sarah', score: 90 },
    { trainee: 'David', score: 87 },
  ];

  return (
    <div className="batch-progress-container">
      <div className="chart-grid">
        {/* Progress Trend Area Chart */}
        <div className="chart-container">
          <h4>Batch Progress Trend</h4>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={batchProgressTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="completion" 
                stroke="#7FFFD4" 
                fill="#7FFFD4" 
                fillOpacity={0.6} 
                name="Completion" 
              />
              <Area 
                type="monotone" 
                dataKey="target" 
                stroke="#98FFE3" 
                fill="#98FFE3" 
                fillOpacity={0.3} 
                name="Target" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Skills Radar Chart */}
        <div className="chart-container">
          <h4>Skills Distribution</h4>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillDistribution}>
              <PolarGrid />
              <PolarAngleAxis dataKey="skill" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar 
                name="Skills" 
                dataKey="value" 
                stroke="#7FFFD4" 
                fill="#7FFFD4" 
                fillOpacity={0.6} 
              />
              <Tooltip />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Module Completion Pie Chart */}
        <div className="chart-container">
          <h4>Module Completion Status</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={moduleCompletion}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#7FFFD4"
                dataKey="value"
                label
              >
                {moduleCompletion.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Trainee Performance Bar Chart */}
        <div className="chart-container">
          <h4>Individual Performance</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={traineePerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="trainee" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="score" fill="#7FFFD4" name="Performance Score" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <style jsx>{`
        .batch-progress-container {
          padding: 20px;
          background-color: #004D40;
          color: white;
        }
        .chart-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(2, 1fr);
          gap: 20px;
          margin-top: 20px;
        }
        .chart-container {
          background-color: rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          padding: 15px;
          min-height: 350px;
        }
        h4 {
          margin-bottom: 15px;
          text-align: center;
          color: white;
        }
      `}</style>
    </div>
  );
}