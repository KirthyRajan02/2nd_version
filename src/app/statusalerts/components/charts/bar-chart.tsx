import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

interface BarChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
}

export function BarChart({ data }: BarChartProps) {
  const customColors = [
    '#FF6B6B',  // Red
    '#4ECDC4',  // Teal
    '#45B7D1',  // Light Blue
    '#96CEB4',  // Sage Green
    '#FFEEAD',  // Light Yellow
    '#D4A5A5',  // Dusty Rose
    '#9ED2C6',  // Seafoam
    '#FFB6B9',  // Pink
  ];

  return (
    <ResponsiveContainer width="110%" height={350}>
      <RechartsBarChart 
        data={data} 
        margin={{ top: 20, right: 30, left: -25, bottom: 60 }}
      >
        <CartesianGrid 
          strokeDasharray="3 3" 
          stroke="#005C54" 
          horizontal={true}
          vertical={false}
        />
        <XAxis 
          dataKey="name" 
          tick={{ fill: '#40E0D0', fontSize: 9 }}
          interval={0}
          angle={-45}
          textAnchor="end"
          height={60}
        />
        <YAxis 
          tick={{ fill: '#40E0D0', fontSize: 10 }}
          domain={[80, 90]}
          ticks={[80, 82, 84, 86, 88, 90]}
          label={{ 
            value: 'Number of Issues', 
            angle: -90, 
            position: 'insideCenter',
            fill: '#40E0D0',
            fontSize: 10,
            offset: 0
          }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#004D47',
            border: '1px solid #005C54',
            color: '#40E0D0'
          }}
        />
        <Bar 
          dataKey="value" 
          radius={[4, 4, 0, 0]}
          fill={customColors[0]} // Set a default color
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={customColors[index % customColors.length]} 
            />
          ))}
        </Bar>
      </RechartsBarChart>
    </ResponsiveContainer>
  );
} 