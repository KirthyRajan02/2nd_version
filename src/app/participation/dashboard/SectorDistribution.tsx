'use client';

import { Box, Typography, Grid, Paper, LinearProgress, Stack } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, TooltipProps } from 'recharts';
import { sectorData } from '@/app/participation/data/mockData';

const COLORS = ['#00A76F', '#2196F3', '#FEB019', '#FF4560', '#9C27B0'];

// Calculate total participants once
const totalParticipants = sectorData.reduce((sum, sector) => sum + sector.value, 0);

// Custom label for the pie chart
const renderCustomizedLabel = ({ 
  cx, 
  cy, 
  midAngle, 
  outerRadius, 
  percent, 
  name
}: {
  cx: number;
  cy: number;
  midAngle: number;
  outerRadius: number;
  percent: number;
  name: string;
}) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius * 1.1;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize="12"
    >
      {`${name} (${(percent * 100).toFixed(0)}%)`}
    </text>
  );
};

// Custom tooltip
const CustomTooltip = ({ 
  active, 
  payload 
}: TooltipProps<number, string>) => {
  if (active && payload?.[0]) {
    return (
      <Paper
        sx={{
          p: 2,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: 1
        }}
      >
        <Typography variant="subtitle2" color="text.primary">
          {payload[0].name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Participants: {payload[0].value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Percentage: {((Number(payload[0].value) / totalParticipants) * 100).toFixed(1)}%
        </Typography>
      </Paper>
    );
  }
  return null;
};

export default function SectorDistribution() {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Sector-wise Distribution Analysis
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Comprehensive breakdown of participant distribution across various tourism sectors
      </Typography>

      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={6}>
          <Paper 
            sx={{ 
              p: 3, 
              height: '400px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Typography variant="h6" gutterBottom>
              Sector Distribution
            </Typography>
            <Box sx={{ flex: 1, minHeight: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={sectorData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={renderCustomizedLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {sectorData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    formatter={(value) => (
                      <span style={{ color: '#fff' }}>{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Detailed Analysis */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '400px', overflow: 'auto' }}>
            <Typography variant="h6" gutterBottom>
              Detailed Breakdown
            </Typography>
            <Stack spacing={3}>
              {sectorData.map((sector, index) => (
                <Box key={sector.name}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="subtitle2" color={COLORS[index]}>
                      {sector.name}
                    </Typography>
                    <Typography variant="subtitle2">
                      {sector.value} participants
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(sector.value / totalParticipants) * 100}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: 'rgba(255,255,255,0.1)',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: COLORS[index]
                      }
                    }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                    <Typography variant="caption" color="text.secondary">
                      {((sector.value / totalParticipants) * 100).toFixed(1)}%
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      of total participants
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 