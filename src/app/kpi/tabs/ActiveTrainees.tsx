import { Card, } from "@/components/ui/card";

import { TrendingUp, Users } from "lucide-react";

import { useState } from "react";
import { useEffect } from "react";
import { MetricCard } from "@/components/ui/metric-card";
import { ChartCard } from "@/components/ui/chart-card";
import axios from 'axios';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/Button";

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
  activeParticipants: number;
  overallProgress: number;
  stageDistribution: {
    name: string;
    status: string;
    value: number;
  }[];
}

interface DashboardFilters {
  country: string;
  batch: string;
  stage: string;
  program: string;
  totalprogress: Number;
  stage1: Number;
  stage2: Number;
  stage3: Number;
  stage4: Number;
}

export default function ActiveTrainees() {
  const [rawData, setRawData] = useState  <DashboardData[]>([]);
  const [processedData, setProcessedData] = useState<{
    totalTrainees: number;
    activeTrainees: number;
    monthlyTrend: { month: string; count: number; }[];
    yearlyData: { year: string; count: number; }[];
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

  useEffect(() => {
    updateDashboardData(filters);
  }, [filters]);


  const updateDashboardData = async (currentFilters: DashboardFilters) => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/dashboard', {
        params: currentFilters
      });
      
      
      // Update to handle the new response format
      const responseData = response.data;
      console.log("Data");
      console.log(responseData);
      setRawData([responseData]); // Keep rawData as array for compatibility
      processData(responseData);
    } catch (error) {
      // More detailed error handling
      if (axios.isAxiosError(error)) {
        console.error('API Error:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data
        });
      } else {
        console.error('Unexpected error:', error);
      }
      // Optionally set an error state here if you want to show error messages to users
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
  };

  const handleFilterChange = (key: keyof DashboardFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    updateDashboardData(newFilters);
  };

  const handleApplyFilters = () => {
    updateDashboardData(filters);
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

  const processData = (data: DashboardData) => {
    // Ensure data exists and has required properties
    if (!data) {
      console.error('Invalid data format received:', data);
      return;
    }

    const totalTrainees = data.stageDistribution.reduce((sum, stage) => sum + stage.value, 0);
    const activeTrainees = data.activeParticipants;

    // Process stage distribution for status chart
    const statusDistribution = data.stageDistribution.map(stage => ({
      name: stage.name,
      value: stage.value,
      status: stage.status
    }));

    // Since we don't have monthly/yearly data in the API response,
    // we'll create placeholder data from the stage distribution
    const monthlyTrend = data.stageDistribution.map(stage => ({
      month: stage.name,
      count: stage.value
    }));

    const yearlyData = monthlyTrend.map(({ month, count }) => ({
      year: month,
      count
    }));

    // Location data might need to be handled differently or removed
    const locationData = data.stageDistribution.map(stage => ({
      location: stage.name,
      count: stage.value
    }));

    // Workshop data might need to be handled differently or removed
    const workshopCompletion = data.stageDistribution.map(stage => ({
      name: stage.name,
      completed: stage.value,
      pending: totalTrainees - stage.value
    }));

    const ganttData = data.stageDistribution.map(stage => ({
      task: stage.name,
      Attended: stage.value
    }));

    setProcessedData({
      totalTrainees,
      activeTrainees,
      monthlyTrend,
      yearlyData,
      locationData,
      statusDistribution,
      workshopCompletion,
      ganttData
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">

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
    </div>
  )
}