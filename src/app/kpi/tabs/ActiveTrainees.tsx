import { Card, } from "@/components/ui/card";

import { TrendingUp, Users } from "lucide-react";

import { useState, useEffect, useCallback } from "react";
import { MetricCard } from "@/components/ui/metric-card";
import { ChartCard } from "@/components/ui/chart-card";
import axios from 'axios';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/Button";
import { mockDashboardData } from '../mockData'

// Update the theme colors to match the dashboard theme
const THEME = {
  colors: {
    primary: '#82D9BF',
    secondary: '#093632',
    warning: '#f59e0b',
    error: '#ef4444',
    background: 'rgba(9, 54, 50, 0.2)',
    stages: {
      stage1: '#82D9BF',
      stage2: '#6D988B',
      stage3: '#f59e0b',
      stage4: '#ef4444'
    }
  },
  status: {
    onTrack: '#82D9BF',
    delayed: '#f59e0b',
    critical: '#ef4444',
    onprogress: 'white',
  }
};

interface DashboardData {
  totalTrainees: number;
  activeTrainees: number;
  monthlyTrend: Array<{
    month: string;
    count: number;
  }>;
  yearlyData: Array<{
    year: number;
    count: number;
  }>;
  locationData: Array<{
    location: string;
    count: number;
  }>;
  statusDistribution: Array<{
    status: string;
    count: number;
  }>;
  workshopCompletion: Array<{
    workshop: string;
    completion: number;
  }>;
  ganttData: Array<{
    task: string;
    Attended: number;
  }>;
}

interface DashboardFilters {
  country: string;
  batch: string;
  stage: string;
  program: string;
  totalprogress: number;
  stage1: number;
  stage2: number;
  stage3: number;
  stage4: number;
}

interface ApiErrorResponse {
  message: string;
  error: string;
  // add other expected error fields
}

export default function ActiveTrainees() {
  const [processedData, setProcessedData] = useState<{
    totalTrainees: number;
    activeTrainees: number;
    monthlyTrend: { month: string; count: number; }[];
    yearlyData: { year: number; count: number; }[];
    locationData: { location: string; count: number; }[];
    statusDistribution: { name: string; value: number; status: string; }[];
    workshopCompletion: { name: string; completed: number; pending: number; }[];
    ganttData: { task: string; Attended: number; }[];
  }>({
    totalTrainees: 0,
    activeTrainees: 0,
    monthlyTrend: [],
    yearlyData: [],
    locationData: [],
    statusDistribution: [],
    workshopCompletion: [],
    ganttData: []
  });

  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<DashboardFilters>({
    country: '',
    batch: 'All Batches',
    stage: 'All Stages',
    program: 'All Programs',
    totalprogress: 0,
    stage1: 0,
    stage2: 0,
    stage3: 0,
    stage4: 0
  });

  const updateDashboardData = useCallback(async (currentFilters: DashboardFilters) => {
    setIsLoading(true);
    try {
      const response = await axios.get<{ data: DashboardData }>('/api/dashboard', {
        params: currentFilters
      });
      
      const dashboardData: DashboardData = response.data.data;
      console.log("Data");
      console.log(dashboardData);
      processData(dashboardData);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('API Error:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data as ApiErrorResponse
        });
      } else {
        console.error('Unexpected error:', error);
      }
      setProcessedData(prev => ({
        ...prev,
        totalTrainees: 0,
        activeTrainees: 0,
        monthlyTrend: [],
        yearlyData: [],
        locationData: [],
        statusDistribution: [],
        workshopCompletion: [],
        ganttData: []
      }));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    updateDashboardData(filters);
  }, [filters, updateDashboardData]);

  const handleFilterChange = (key: keyof DashboardFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    updateDashboardData(newFilters);
  };

  const handleClearFilters = () => {
    const defaultFilters: DashboardFilters = {
      country: '',
      batch: '',
      stage: '',
      program: '',
      totalprogress: 0,
      stage1: 0,
      stage2: 0,
      stage3: 0,
      stage4: 0
    };
    setFilters(defaultFilters);
    updateDashboardData(defaultFilters);
  };

  const processData = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _data: DashboardData
  ) => {
    if (process.env.NODE_ENV === 'development') {
      setProcessedData(mockDashboardData.activeTrainees);
      return;
    }
    // Your existing data processing logic
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {isLoading ? (
        <div></div>
      ) : (
        <>
          {/* Filter Section */}
          <div className="flex justify-between items-center mb-2">
            <div className="flex space-x-6">
              <Select 
                value={filters.country} 
                onValueChange={(value) => handleFilterChange('country', value)}
              >
                <SelectTrigger className="bg-[#082525] text-white border-[#3E615F] w-48">
                  <SelectValue placeholder="All Countries" />
                </SelectTrigger>
                <SelectContent className="bg-[#082525] border-[#3E615F]">
                  <SelectItem className="text-white hover:bg-[#3E615F] focus:bg-[#3E615F] focus:text-white" value="All Countries">All Countries</SelectItem>
                  <SelectItem className="text-white hover:bg-[#3E615F] focus:bg-[#3E615F] focus:text-white" value="USA">USA</SelectItem>
                  <SelectItem className="text-white hover:bg-[#3E615F] focus:bg-[#3E615F] focus:text-white" value="UK">UK</SelectItem>
                  <SelectItem className="text-white hover:bg-[#3E615F] focus:bg-[#3E615F] focus:text-white" value="UAE">UAE</SelectItem>
                  <SelectItem className="text-white hover:bg-[#3E615F] focus:bg-[#3E615F] focus:text-white" value="Canada">Canada</SelectItem>
                  
                </SelectContent>
              </Select>

              <Select 
                value={filters.program} 
                onValueChange={(value) => handleFilterChange('program', value)}
              >
                <SelectTrigger className="bg-[#082525] text-white border-[#3E615F] w-48">
                  <SelectValue placeholder="All Programs" />
                </SelectTrigger>
                <SelectContent className="bg-[#082525] border-[#3E615F]">
                  <SelectItem className="text-white hover:bg-[#3E615F] focus:bg-[#3E615F] focus:text-white" value="All Programs">All Programs</SelectItem>
                  <SelectItem className="text-white hover:bg-[#3E615F] focus:bg-[#3E615F] focus:text-white" value="Program A">Program A</SelectItem>
                  <SelectItem className="text-white hover:bg-[#3E615F] focus:bg-[#3E615F] focus:text-white" value="Program B">Program B</SelectItem>
                  <SelectItem className="text-white hover:bg-[#3E615F] focus:bg-[#3E615F] focus:text-white" value="Program C">Program C</SelectItem>
                </SelectContent>
              </Select>

              <Select 
                value={filters.stage} 
                onValueChange={(value) => handleFilterChange('stage', value)}
              >
                <SelectTrigger className="bg-[#082525] text-white border-[#3E615F] w-48">
                  <SelectValue placeholder="All Stages" />
                </SelectTrigger>
                <SelectContent className="bg-[#082525] border-[#3E615F]">
                  <SelectItem className="text-white hover:bg-[#3E615F] focus:bg-[#3E615F] focus:text-white" value="All Stages">All Stages</SelectItem>
                  <SelectItem className="text-white hover:bg-[#3E615F] focus:bg-[#3E615F] focus:text-white" value="Stage 1">Stage 1</SelectItem>
                  <SelectItem className="text-white hover:bg-[#3E615F] focus:bg-[#3E615F] focus:text-white" value="Stage 2">Stage 2</SelectItem>
                  <SelectItem className="text-white hover:bg-[#3E615F] focus:bg-[#3E615F] focus:text-white" value="Stage 3">Stage 3</SelectItem>
                </SelectContent>
              </Select>

              <Select 
                value={filters.batch} 
                onValueChange={(value) => handleFilterChange('batch', value)}
              >
                <SelectTrigger className="bg-[#082525] text-white border-[#3E615F] w-48">
                  <SelectValue placeholder="All Batches" />
                </SelectTrigger>
                <SelectContent className="bg-[#082525] border-[#3E615F]">
                  <SelectItem className="text-white hover:bg-[#3E615F] focus:bg-[#3E615F] focus:text-white" value="All Batches">All Batches</SelectItem>
                  <SelectItem className="text-white hover:bg-[#3E615F] focus:bg-[#3E615F] focus:text-white" value="Batch 1">Batch 1</SelectItem>
                  <SelectItem className="text-white hover:bg-[#3E615F] focus:bg-[#3E615F] focus:text-white" value="Batch 2">Batch 2</SelectItem>
                  <SelectItem className="text-white hover:bg-[#3E615F] focus:bg-[#3E615F] focus:text-white" value="Batch 3">Batch 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-2">

              <Button 
                className="bg-[#3E615F] text-white"
                onClick={handleClearFilters}
              >
                Reset Filter
              </Button>
            </div>
          </div>

          {/* Metrics Section */}
          <Card className="bg-[#082525] p-1 border-[#6D988B]">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
              <MetricCard
                title="Total Trainees"
                value={processedData.totalTrainees}
                icon={Users}
                className="text-white [&_*]:text-white py-2"
              />
              <MetricCard
                title="Active Trainees"
                value={processedData.activeTrainees}
                icon={TrendingUp}
                trend={{ value: 8, isPositive: true }}
                className="text-white [&_*]:text-white py-2"
              />
              <MetricCard
                title="Completion Rate"
                value={`${processedData.totalTrainees > 0 ? 
                  Math.round((processedData.activeTrainees / processedData.totalTrainees) * 100) : 0}%`}
                icon={TrendingUp}
                trend={{ value: 5, isPositive: true }}
                className="text-white [&_*]:text-white py-2"
              />
              <MetricCard
                title="Average Progress"
                value="73%"
                icon={Users}
                trend={{ value: 3, isPositive: true }}
                className="text-white [&_*]:text-white py-2"
              />
            </div>
          </Card>

          {/* Charts Section */}
          <Card className="bg-[#082525] p-1.5 border-[#6D988B]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {/* First Row */}
              <ChartCard 
                title="Trainee Trend" 
                chart="line" 
                data={processedData.monthlyTrend.map(item => ({
                  month: item.month,
                  participants: item.count,
                  color: THEME.colors.primary
                }))} 
              />

              <ChartCard 
                title="Onboarded Distribution" 
                chart="bar" 
                data={processedData.yearlyData.map(item => ({
                  year: item.year,
                  count: item.count
                }))} 
              />

              <ChartCard 
                title="Programs Completed" 
                chart="area" 
                data={processedData.yearlyData.map(item => ({
                  year: item.year,
                  count: item.count
                }))} 
              />

              {/* Second Row */}
              <ChartCard 
                title="Location Distribution" 
                chart="bar" 
                data={processedData.locationData.map(item => ({
                  location: item.location,
                  count: item.count
                }))} 
                layout="vertical" 
              />
              
              <ChartCard 
                title="Workshops" 
                chart="line" 
                data={processedData.ganttData.map(item => ({
                  task: item.task,
                  Attended: item.Attended
                }))} 
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }} 
              />

              <ChartCard 
                title="Status Distribution" 
                chart="pie" 
                data={processedData.statusDistribution.map(item => ({
                  name: item.name,
                  value: item.value
                }))} 
              />
            </div>
          </Card>
        </>
      )}
    </div>
  )
}