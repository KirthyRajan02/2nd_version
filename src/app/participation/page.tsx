'use client';

import { useState } from 'react';
import { 
  Container, 
  Box, 
  Tabs, 
  Tab, 
  Select, 
  MenuItem, 
  Button,
  Typography,
  ThemeProvider,
  createTheme
} from '@mui/material';
import HotelBreakdown from './dashboard/components/HotelBreakdown';
import SectorDistribution from './dashboard/SectorDistribution';
import LocationDistribution from './dashboard/LocationDistribution';

// Create a dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0A2F2F',
      paper: '#0A1929',
    },
    primary: {
      main: '#00A76F',
    },
  },
});

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedStage, setSelectedStage] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <Container maxWidth="xl" sx={{ py: 4 }}>
          {/* Top Navigation */}
          <Box sx={{ 
            borderBottom: 1, 
            borderColor: 'divider', 
            mb: 3,
            width: '100%'
          }}>
            <Tabs 
              value={selectedTab} 
              onChange={(_e: React.SyntheticEvent, newValue: number) => setSelectedTab(newValue)}
              sx={{ 
                '& .MuiTab-root': { 
                  color: 'grey.400',
                  '&.Mui-selected': { color: 'primary.main' },
                  minWidth: '33.33%',
                  padding: '12px 16px'
                }
              }}
            >
              <Tab label="HOTEL BREAKDOWN" />
              <Tab label="SECTOR DISTRIBUTION" />
              <Tab label="LOCATION DISTRIBUTION" />
            </Tabs>
          </Box>

          {/* Filters */}
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            mb: 4,
            flexWrap: 'wrap',
            '& .MuiSelect-root': { 
              minWidth: 200,
              bgcolor: 'background.paper',
            }
          }}>
            <Select 
              value={selectedStage}
              displayEmpty 
              size="small"
              onChange={(e) => setSelectedStage(e.target.value)}
            >
              <MenuItem value="">Select Stage</MenuItem>
              {[
                "Training Stage",
                "Internship Stage",
                "Employment Stage",
                "Professional Stage"
              ].map((stage) => (
                <MenuItem key={stage} value={stage}>
                  {stage}
                </MenuItem>
              ))}
            </Select>
            <Select 
              value={selectedProgram}
              displayEmpty 
              size="small"
              onChange={(e) => setSelectedProgram(e.target.value)}
            >
              <MenuItem value="">Select Program</MenuItem>
              {[
                "Hotel Operations",
                "Front Office Management",
                "Housekeeping Management",
                "Food & Beverage Service",
                "Culinary Arts",
                "Tourism Management"
              ].map((program) => (
                <MenuItem key={program} value={program}>
                  {program}
                </MenuItem>
              ))}
            </Select>
            <Select 
              value={selectedCountry}
              displayEmpty 
              size="small"
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <MenuItem value="">Select Country</MenuItem>
              {[
                "Saudi Arabia",
                "UAE",
                "Qatar",
                "Bahrain",
                "Kuwait",
                "Oman"
              ].map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
            <Select 
              value={selectedBatch}
              displayEmpty 
              size="small"
              onChange={(e) => setSelectedBatch(e.target.value)}
            >
              <MenuItem value="">Select Batch</MenuItem>
              {[
                "2024-Q1",
                "2024-Q2",
                "2024-Q3",
                "2024-Q4"
              ].map((batch) => (
                <MenuItem key={batch} value={batch}>
                  {batch}
                </MenuItem>
              ))}
            </Select>
            <Button 
              variant="contained" 
              color="primary"
              size="small"
              onClick={() => {
                setSelectedStage('');
                setSelectedProgram('');
                setSelectedCountry('');
                setSelectedBatch('');
              }}
            >
              Clear
            </Button>
            <Button 
              variant="contained" 
              color="primary"
              size="small"
              onClick={() => {
                // Handle filter application here
                console.log({
                  stage: selectedStage,
                  program: selectedProgram,
                  country: selectedCountry,
                  batch: selectedBatch
                });
              }}
            >
              Apply Filters
            </Button>
          </Box>

          {/* Stats Summary */}
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            mb: 4,
            flexWrap: 'wrap'
          }}>
            <StatCard 
              title="Total Selected Candidates"
              value="400"
              change="+15% from last batch"
              color="success"
            />
            <StatCard 
              title="Training Center Allocated"
              value="70%"
              change="+8%"
              color="info"
            />
            <StatCard 
              title="Pending Allocation"
              value="10%"
              change="-5%"
              color="warning"
              negative
            />
          </Box>

          {/* Main Content */}
          <Box sx={{ 
            bgcolor: 'background.paper', 
            borderRadius: 1,
            p: 3,
            boxShadow: 1
          }}>
            {selectedTab === 0 && <HotelBreakdown />}
            {selectedTab === 1 && <SectorDistribution />}
            {selectedTab === 2 && <LocationDistribution />}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  color: string;
  negative?: boolean;
}

function StatCard({ title, value, change, color, negative = false }: StatCardProps) {
  return (
    <Box sx={{ 
      bgcolor: 'background.paper',
      p: 3,
      borderRadius: 1,
      flex: '1 1 300px',
      minWidth: 250,
      boxShadow: 1,
      borderLeft: 3,
      borderColor: `${color}.main`
    }}>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h4" sx={{ mb: 1, color: `${color}.main` }}>
        {value}
      </Typography>
      <Typography 
        variant="body2" 
        color={negative ? 'error.main' : 'success.main'}
        sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
      >
        {change}
      </Typography>
    </Box>
  );
}