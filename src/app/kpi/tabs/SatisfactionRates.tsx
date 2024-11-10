import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer
} from 'recharts';

const COLORS = ['#7FFFD4', '#98FFE3', '#85EED2', '#6BDFC4'];

export default function SatisfactionRates() {
  // Dummy data for different charts
  const monthlyRatings = [
    { month: 'Jan', rating: 4.2 },
    { month: 'Feb', rating: 4.5 },
    { month: 'Mar', rating: 4.3 },
    { month: 'Apr', rating: 4.7 },
    { month: 'May', rating: 4.6 },
    { month: 'Jun', rating: 4.8 },
  ];

  const categoryRatings = [
    { name: 'Content Quality', value: 85 },
    { name: 'Instructor Support', value: 90 },
    { name: 'Resources', value: 78 },
    { name: 'Platform Usability', value: 88 },
  ];

  const traineeDistribution = [
    { name: 'Highly Satisfied', value: 65 },
    { name: 'Satisfied', value: 25 },
    { name: 'Neutral', value: 7 },
    { name: 'Dissatisfied', value: 3 },
  ];

  return (
    <div className="satisfaction-container">
      <div className="chart-grid">
        {/* Trend Line Chart */}
        <div className="chart-container">
          <h4>Monthly Satisfaction Trend</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyRatings}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Line type="monotone" dataKey="rating" stroke="#7FFFD4" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Bar Chart */}
        <div className="chart-container">
          <h4>Category-wise Satisfaction</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryRatings}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="value" fill="#7FFFD4" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Distribution Pie Chart */}
        <div className="chart-container">
          <h4>Overall Satisfaction Distribution</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={traineeDistribution}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#7FFFD4"
                dataKey="value"
                label
              >
                {traineeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <style jsx>{`
        .satisfaction-container {
          padding: 20px;
          background-color: #004D40;
          color: white;
        }
        .chart-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
        .chart-container {
          background-color: rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          padding: 15px;
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