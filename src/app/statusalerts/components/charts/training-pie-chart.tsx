'use client';

import { PieChart as RechartsChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const TRAINING_COLORS = {
  'In Progress': '#4CAF50',    // Green
  'Completed': '#2196F3',      // Blue
  'Not Started': '#FFC107',    // Amber
  'Delayed': '#F44336',        // Red
  'On Track': '#8BC34A'        // Light Green
} as const;

export interface TrainingDataItem {
  category: string;
  count: number;
  percentage?: number;
}

export function TrainingPieChart({ data }: { data: TrainingDataItem[] }) {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer>
        <RechartsChart>
          <Pie
            data={data}
            cx="55%"
            cy="50%"
            innerRadius={0}
            outerRadius={60}
            paddingAngle={1}
            dataKey="count"
            nameKey="category"
            label={(entry) => {
              return `${entry.category} (${entry.count}) - ${entry.percentage?.toFixed(1)}%`;
            }}
            labelLine={{ 
              stroke: '#40E0D0',
              strokeWidth: 1,

            }}
            minAngle={55}
            style={{
              fontSize: '12px'
            }}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={TRAINING_COLORS[entry.category as keyof typeof TRAINING_COLORS] || '#999999'} 
                strokeWidth={0}
              />
            ))}
          </Pie>
          <Legend 
            verticalAlign="bottom"
            formatter={(value: string) => (
              <span className="text-[#40E0D0]">
                {value}
              </span>
            )}
          />
          <Tooltip />
        </RechartsChart>
      </ResponsiveContainer>
    </div>
  );
} 