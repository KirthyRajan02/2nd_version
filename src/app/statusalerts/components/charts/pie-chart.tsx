'use client';

import { PieChart as RechartsChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = {
  'Delayed Cases': '#8A2BE2',    // Purple
  'Critical Issues': '#32CD32',  // Green
  'Pending Actions': '#FFA500',  // Orange
  'Risk Indicators': '#FFD700'   // Gold
} as const;

export interface DataItem {
  category: string;
  count: number;
  percentage?: number;
}

export const PieChart = ({ 
  data 
}: { 
  data: DataItem[] 
}) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <ResponsiveContainer>
        <RechartsChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={0}
            outerRadius={80}
            paddingAngle={3}
            dataKey="count"
            nameKey="category"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[entry.category as keyof typeof COLORS]} 
              />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </RechartsChart>
      </ResponsiveContainer>
    </div>
  );
};