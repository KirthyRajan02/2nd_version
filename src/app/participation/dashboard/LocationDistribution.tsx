'use client';

import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  LinearProgress, 
  Divider, 
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { locationData } from '@/app/participation/data/mockData';

// Enhanced location data with additional metrics
const enhancedLocationData = locationData.map(location => ({
  ...location,
  trainingCenters: Math.floor(Math.random() * 5) + 1,
  activePrograms: Math.floor(Math.random() * 8) + 3,
  completionRate: Math.floor(Math.random() * 20) + 80,
  employmentRate: Math.floor(Math.random() * 15) + 85,
  topEmployers: [
    'Saudi Tourism Authority',
    'Hilton Hotels',
    'Marriott International',
    'Saudi Airlines',
    'National Tourism Council'
  ].slice(0, Math.floor(Math.random() * 3) + 2),
  upcomingEvents: Math.floor(Math.random() * 5) + 1,
  popularCourses: [
    'Hotel Management',
    'Tourism Marketing',
    'Event Planning',
    'Cultural Tourism',
    'Hospitality Services'
  ].slice(0, Math.floor(Math.random() * 3) + 2)
}));

export default function LocationDistribution() {
  const totalParticipants = locationData.reduce((sum, item) => sum + item.participants, 0);
  const totalCenters = enhancedLocationData.reduce((sum, item) => sum + item.trainingCenters, 0);

  return (
    <Box>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Geographic Distribution Analysis
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Detailed breakdown of program distribution across different cities
        </Typography>

        {/* Summary Stats */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2, bgcolor: 'primary.dark' }}>
              <Typography variant="h6">{totalParticipants}</Typography>
              <Typography variant="body2">Total Participants</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2, bgcolor: 'success.dark' }}>
              <Typography variant="h6">{totalCenters}</Typography>
              <Typography variant="body2">Training Centers</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2, bgcolor: 'warning.dark' }}>
              <Typography variant="h6">{locationData.length}</Typography>
              <Typography variant="body2">Active Cities</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2, bgcolor: 'info.dark' }}>
              <Typography variant="h6">87%</Typography>
              <Typography variant="body2">Avg Completion Rate</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Main Chart */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Participant Distribution by City
          </Typography>
          <Box sx={{ height: 400 }}>
            <ResponsiveContainer>
              <BarChart data={locationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                <XAxis dataKey="city" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0A1929',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                />
                <Bar 
                  dataKey="participants" 
                  fill="#00A76F"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Paper>

        {/* Detailed Analysis */}
        <Grid container spacing={3}>
          {/* Performance Metrics Table */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                City Performance Metrics
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>City</TableCell>
                      <TableCell align="right">Participants</TableCell>
                      <TableCell align="right">Training Centers</TableCell>
                      <TableCell align="right">Active Programs</TableCell>
                      <TableCell align="right">Completion Rate</TableCell>
                      <TableCell align="right">Employment Rate</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {enhancedLocationData.map((location) => (
                      <TableRow key={location.city}>
                        <TableCell component="th" scope="row">
                          {location.city}
                        </TableCell>
                        <TableCell align="right">{location.participants}</TableCell>
                        <TableCell align="right">{location.trainingCenters}</TableCell>
                        <TableCell align="right">{location.activePrograms}</TableCell>
                        <TableCell align="right">{location.completionRate}%</TableCell>
                        <TableCell align="right">{location.employmentRate}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* City Detail Cards */}
          {enhancedLocationData.map((location) => (
            <Grid item xs={12} md={4} key={location.city}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  {location.city}
                </Typography>
                
                <Stack spacing={2}>
                  {/* Participants */}
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Total Participants
                    </Typography>
                    <Typography variant="h4">
                      {location.participants}
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={(location.participants / totalParticipants) * 100} 
                      sx={{ mt: 1 }}
                    />
                  </Box>

                  <Divider />

                  {/* Training Centers */}
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Training Centers: {location.trainingCenters}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Active Programs: {location.activePrograms}
                    </Typography>
                  </Box>

                  <Divider />

                  {/* Popular Courses */}
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Popular Courses
                    </Typography>
                    {location.popularCourses.map((course) => (
                      <Chip 
                        key={course}
                        label={course}
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                      />
                    ))}
                  </Box>

                  <Divider />

                  {/* Top Employers */}
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Top Employers
                    </Typography>
                    {location.topEmployers.map((employer) => (
                      <Typography key={employer} variant="body2">
                        • {employer}
                      </Typography>
                    ))}
                  </Box>

                  {/* Performance Metrics */}
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Performance Metrics
                    </Typography>
                    <Box sx={{ mb: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2">Completion Rate</Typography>
                        <Typography variant="body2">{location.completionRate}%</Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={location.completionRate}
                        sx={{ mt: 1 }}
                      />
                    </Box>
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2">Employment Rate</Typography>
                        <Typography variant="body2">{location.employmentRate}%</Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={location.employmentRate}
                        color="success"
                        sx={{ mt: 1 }}
                      />
                    </Box>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}