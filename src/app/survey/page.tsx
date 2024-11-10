'use client';

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    PieChart, Pie, Cell, Line, ResponsiveContainer,
    ComposedChart, Area
  } from 'recharts';
  
  const COLORS = ['#7FFFD4', '#98FFE3', '#85EED2', '#6BDFC4'];
  
  export default function SurveyMetrics() {
    // Dummy data for different charts
    const countryResponses = [
      { country: 'USA', responses: 250, satisfaction: 85 },
      { country: 'UK', responses: 180, satisfaction: 88 },
      { country: 'India', responses: 320, satisfaction: 82 },
      { country: 'Germany', responses: 150, satisfaction: 86 },
      { country: 'Australia', responses: 120, satisfaction: 84 },
    ];
  
    const feedbackCategories = [
      { category: 'Course Content', positive: 85, neutral: 10, negative: 5 },
      { category: 'Instructor', positive: 90, neutral: 7, negative: 3 },
      { category: 'Platform', positive: 78, neutral: 15, negative: 7 },
      { category: 'Support', positive: 82, neutral: 12, negative: 6 },
    ];
  
    const monthlyParticipation = [
      { month: 'Jan', responses: 120, rate: 75 },
      { month: 'Feb', responses: 150, rate: 82 },
      { month: 'Mar', responses: 180, rate: 85 },
      { month: 'Apr', responses: 200, rate: 88 },
      { month: 'May', responses: 220, rate: 90 },
      { month: 'Jun', responses: 250, rate: 92 },
    ];
  
    const sentimentAnalysis = [
      { name: 'Very Positive', value: 45 },
      { name: 'Positive', value: 30 },
      { name: 'Neutral', value: 15 },
      { name: 'Negative', value: 10 },
    ];
  
    return (
      <div className="survey-metrics-container">
        <div className="chart-grid">
          {/* Geographic Distribution Chart */}
          <div className="chart-container">
            <h4>Geographic Response Distribution</h4>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={countryResponses}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="country" />
                <YAxis yAxisId="left" orientation="left" domain={[0, 400]} />
                <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="responses" fill="#7FFFD4" name="Responses" />
                <Line yAxisId="right" type="monotone" dataKey="satisfaction" stroke="#98FFE3" name="Satisfaction %" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
  
          {/* Feedback Categories Chart */}
          <div className="chart-container">
            <h4>Feedback Category Analysis</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={feedbackCategories} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="category" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="positive" stackId="a" fill="#7FFFD4" name="Positive" />
                <Bar dataKey="neutral" stackId="a" fill="#98FFE3" name="Neutral" />
                <Bar dataKey="negative" stackId="a" fill="#85EED2" name="Negative" />
              </BarChart>
            </ResponsiveContainer>
          </div>
  
          {/* Monthly Participation Trend */}
          <div className="chart-container">
            <h4>Monthly Survey Participation</h4>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={monthlyParticipation}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" domain={[0, 300]} />
                <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Area yAxisId="left" type="monotone" dataKey="responses" fill="#7FFFD4" stroke="#7FFFD4" name="Responses" />
                <Line yAxisId="right" type="monotone" dataKey="rate" stroke="#98FFE3" name="Response Rate %" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
  
          {/* Sentiment Analysis Pie Chart */}
          <div className="chart-container">
            <h4>Overall Sentiment Distribution</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sentimentAnalysis}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#7FFFD4"
                  dataKey="value"
                  label
                >
                  {sentimentAnalysis.map((entry, index) => (
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
          .survey-metrics-container {
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