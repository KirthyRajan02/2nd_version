'use client';

import { Box, Typography, Grid, Paper, LinearProgress, Divider } from '@mui/material';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area
} from 'recharts';
import { hotelData } from '@/app/participation/data/mockData';

export default function HotelBreakdown() {
  // Transform data for the main chart
  const transformedData = hotelData.map(hotel => ({
    name: hotel.hotel,
    total: hotel.universities.reduce((acc, uni) => acc + uni.participants, 0),
    capacity: Math.floor(Math.random() * 50) + 150, // Random capacity for demo
    occupancy: Math.floor(Math.random() * 20) + 80, // Random occupancy rate
    universities: hotel.universities.length
  }));

  // Data for area chart (monthly trend)
  const monthlyData = [
    { month: 'Jan', current: 150, previous: 120 },
    { month: 'Feb', current: 200, previous: 160 },
    { month: 'Mar', current: 280, previous: 220 },
    { month: 'Apr', current: 350, previous: 280 },
    { month: 'May', current: 400, previous: 320 },
    { month: 'Jun', current: 450, previous: 380 }
  ];

  const COLORS = ['#00A76F', '#2196F3', '#FEB019'];

  return (
    <Box>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom color="text.primary">
          Hotel & University Distribution
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Overview of participant distribution across partner hotels and universities
        </Typography>

        {/* Key Metrics */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {transformedData.map((hotel, index) => (
            <Grid item xs={12} md={4} key={hotel.name}>
              <Paper 
                sx={{ 
                  p: 2.5, 
                  bgcolor: 'background.paper',
                  borderLeft: 6,
                  borderColor: COLORS[index],
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {hotel.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {hotel.total} Participants • {hotel.universities} Universities
                  </Typography>
                </Box>
                <Box 
                  sx={{ 
                    width: 60, 
                    height: 60, 
                    borderRadius: '50%',
                    border: '3px solid',
                    borderColor: COLORS[index],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Typography variant="h6" color={COLORS[index]}>
                    {hotel.occupancy}%
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Main Charts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Capacity vs Actual Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Typography variant="h6" gutterBottom>
              Capacity vs Actual Participants
            </Typography>
            <ResponsiveContainer>
              <BarChart data={transformedData} barGap={0}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#fff' }}
                />
                <YAxis 
                  tick={{ fill: '#fff' }}
                  domain={[0, 'dataMax']}
                  tickCount={5}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0A1929',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="capacity" 
                  fill="#2196F3" 
                  name="Total Capacity"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="total" 
                  fill="#00A76F" 
                  name="Current Participants"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Monthly Trend Chart */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Typography variant="h6" gutterBottom>
              Monthly Trend
            </Typography>
            <ResponsiveContainer>
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: '#fff' }}
                />
                <YAxis 
                  tick={{ fill: '#fff' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0A1929',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="current"
                  stackId="1"
                  stroke="#00A76F"
                  fill="#00A76F"
                  fillOpacity={0.3}
                  name="Current Year"
                />
                <Area
                  type="monotone"
                  dataKey="previous"
                  stackId="2"
                  stroke="#2196F3"
                  fill="#2196F3"
                  fillOpacity={0.3}
                  name="Previous Year"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Detailed Breakdown */}
      <Grid container spacing={3}>
        {hotelData.map((hotel, index) => (
          <Grid item xs={12} md={4} key={hotel.hotel}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                {hotel.hotel}
              </Typography>
              
              {/* University Distribution */}
              {hotel.universities.map((uni, uniIndex) => (
                <Box key={uni.name} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">{uni.name}</Typography>
                    <Typography variant="body2" sx={{ color: COLORS[uniIndex] }}>
                      {uni.participants}
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={(uni.participants / 50) * 100} 
                    sx={{ 
                      height: 8,
                      borderRadius: 4,
                      bgcolor: 'rgba(255,255,255,0.1)',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: COLORS[uniIndex]
                      }
                    }}
                  />
                </Box>
              ))}

              <Divider sx={{ my: 2 }} />

              {/* Additional Metrics */}
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Total Capacity
                  </Typography>
                  <Typography variant="h6">
                    {transformedData[index].capacity}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Occupancy Rate
                  </Typography>
                  <Typography variant="h6" color={COLORS[index]}>
                    {transformedData[index].occupancy}%
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
} 