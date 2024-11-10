import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  AreaChart, Area
} from 'recharts';

const COLORS = ['#7FFFD4', '#98FFE3', '#85EED2', '#6BDFC4'];

export default function ProgramEffectiveness() {
  // Dummy data for different charts
  const completionTrend = [
    { month: 'Jan', completion: 75, target: 80 },
    { month: 'Feb', completion: 82, target: 80 },
    { month: 'Mar', completion: 88, target: 80 },
    { month: 'Apr', completion: 85, target: 80 },
    { month: 'May', completion: 92, target: 80 },
    { month: 'Jun', completion: 95, target: 80 },
  ];

  const skillsProgress = [
    { skill: 'Technical', before: 45, after: 85 },
    { skill: 'Problem Solving', before: 50, after: 88 },
    { skill: 'Communication', before: 60, after: 90 },
    { skill: 'Teamwork', before: 55, after: 87 },
    { skill: 'Leadership', before: 40, after: 82 },
  ];

  const employmentOutcomes = [
    { name: 'Employed', value: 75 },
    { name: 'Further Education', value: 15 },
    { name: 'Job Seeking', value: 8 },
    { name: 'Other', value: 2 },
  ];

  const performanceMetrics = [
    { category: 'Project Success', value: 88 },
    { category: 'Assessment Scores', value: 85 },
    { category: 'Attendance Rate', value: 95 },
    { category: 'Engagement', value: 82 },
    { category: 'Practical Skills', value: 87 },
  ];

  return (
    <div className="effectiveness-container">
      <div className="chart-grid">
        {/* Completion Trend Area Chart */}
        <div className="chart-container">
          <h4>Program Completion Trend</h4>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={completionTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="completion" stroke="#7FFFD4" fill="#7FFFD4" fillOpacity={0.6} name="Completion Rate" />
              <Area type="monotone" dataKey="target" stroke="#98FFE3" fill="#98FFE3" fillOpacity={0.3} name="Target" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Skills Progress Bar Chart */}
        <div className="chart-container">
          <h4>Skills Progress Comparison</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={skillsProgress} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="skill" type="category" />
              <Tooltip />
              <Legend />
              <Bar dataKey="before" fill="#85EED2" name="Pre-Program" />
              <Bar dataKey="after" fill="#7FFFD4" name="Post-Program" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Employment Outcomes Pie Chart */}
        <div className="chart-container">
          <h4>Employment Outcomes</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={employmentOutcomes}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#7FFFD4"
                dataKey="value"
                label
              >
                {employmentOutcomes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Metrics Radar Chart */}
        <div className="chart-container">
          <h4>Performance Metrics</h4>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={performanceMetrics}>
              <PolarGrid />
              <PolarAngleAxis dataKey="category" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar name="Performance" dataKey="value" stroke="#7FFFD4" fill="#7FFFD4" fillOpacity={0.6} />
              <Tooltip />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <style jsx>{`
        .effectiveness-container {
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