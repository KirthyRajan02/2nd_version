'use client'

import { useState, useEffect, useCallback } from 'react';
import { 
  ResponsiveContainer, PieChart, Pie, BarChart, Bar, XAxis, YAxis, 
  Tooltip, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, 
  PolarRadiusAxis, Legend, LineChart, Line, ComposedChart,
  CartesianGrid, LabelList
} from 'recharts';

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/Button";
import { Loader2 } from "lucide-react";

// Theme constants
const THEME = {
    colors: {
      primary: '#10b981',    // emerald-500
      secondary: '#064e3b',  // emerald-900
      warning: '#f59e0b',    // amber-500
      error: '#ef4444',      // red-500
      background: 'rgba(6, 78, 59, 0.2)', // semi-transparent emerald
      stages: {  // Add this new section
        stage1: '#10b981',
        stage2: '#34d399',
        stage3: '#f59e0b',
        stage4: '#ef4444'
      }
    },
    status: {
      onTrack: '#10b981',
      delayed: '#f59e0b',
      critical: '#ef4444',
      onprogress: 'white',
    }
  };
  

const progressData_Overview = [
    {
      name: "Pre-visa Processing",
      stage1: 100,
      stage2: 80,
      stage3: 60,
      stage4: 40,
      totalProgress: 70
    },
    {
      name: "Visa Processing",
      stage1: 90,
      stage2: 70,
      stage3: 50,
      stage4: 30,
      totalProgress: 60
    },
    {
      name: "Onboarding",
      stage1: 80,
      stage2: 60,
      stage3: 40,
      stage4: 20,
      totalProgress: 50
    },
    {
      name: "Ticket Issues",
      stage1: 70,
      stage2: 50,
      stage3: 30,
      stage4: 10,
      totalProgress: 40
    },
    {
      name: "Workshop Completion",
      stage1: 60,
      stage2: 40,
      stage3: 20,
      stage4: 5,
      totalProgress: 30
    },
    {
      name: "Training Progress",
      stage1: 50,
      stage2: 30,
      stage3: 10,
      stage4: 0,
      totalProgress: 20
    }
  ]

// Add this static data object at the top of the file, after the THEME constant

const DASHBOARD_DATA = {
    UAE: {
      activeParticipants: 950,
      overallProgress: 82,
      stageDistribution: [
        { 
          name: 'Pre-Visa', 
          value: 230,
          status: 'onTrack' as const,
          progress: 90,
          participants: 250,
          training: 85,
          workshops: 220,
          completion: 95,
          stage1: 250,
          stage2: 200,
          stage3: 150,
          stage4: 100,
          totalProgress: 85
        },
        { 
          name: 'Visa Processing', 
          value: 160,
          status: 'delayed' as const,
          progress: 75,
          participants: 180,
          training: 70,
          workshops: 160,
          completion: 80,
          stage1: 200,
          stage2: 160,
          stage3: 120,
          stage4: 80,
          totalProgress: 70
        },
        { 
          name: 'Onboarding', 
          value: 210,
          status: 'critical' as const,
          progress: 65,
          participants: 200,
          training: 60,
          workshops: 170,
          completion: 70,
          stage1: 180,
          stage2: 140,
          stage3: 100,
          stage4: 60,
          totalProgress: 60
        },
        { 
          name: 'Acknowledgment', 
          value: 110,
          status: 'onprogress' as const,
          progress: 45,
          participants: 100,
          training: 40,
          workshops: 80,
          completion: 50,
          stage1: 150,
          stage2: 120,
          stage3: 80,
          stage4: 40,
          totalProgress: 45
        },
        { 
          name: 'Training', 
          value: 180, 
          status: 'onprogress' as const,
          progress: 60,
          participants: 180,
          training: 55,
          workshops: 150,
          completion: 65,
          stage1: 170,
          stage2: 130,
          stage3: 90,
          stage4: 50,
          totalProgress: 55
        }
      ]
    },
    USA: {
      activeParticipants: 850,
      overallProgress: 75,
      stageDistribution: [
        { 
          name: 'Pre-Visa', 
          value: 200,
          status: 'onTrack' as const,
          progress: 85,
          participants: 220,
          training: 80,
          workshops: 190,
          completion: 90,
          stage1: 220,
          stage2: 180,
          stage3: 140,
          stage4: 90,
          totalProgress: 80
        },
        { 
          name: 'Visa Processing', 
          value: 180,
          status: 'delayed' as const,
          progress: 70,
          participants: 200,
          training: 65,
          workshops: 170,
          completion: 75,
          stage1: 190,
          stage2: 150,
          stage3: 110,
          stage4: 70,
          totalProgress: 65
        },
        { 
          name: 'Onboarding', 
          value: 170,
          status: 'critical' as const,
          progress: 60,
          participants: 190,
          training: 55,
          workshops: 160,
          completion: 65,
          stage1: 170,
          stage2: 130,
          stage3: 90,
          stage4: 50,
          totalProgress: 55
        },
        { 
          name: 'Acknowledgment', 
          value: 150,
          status: 'onprogress' as const,
          progress: 50,
          participants: 170,
          training: 45,
          workshops: 140,
          completion: 55,
          stage1: 160,
          stage2: 120,
          stage3: 80,
          stage4: 40,
          totalProgress: 50
        },
        { 
          name: 'Training', 
          value: 150,
          status: 'onprogress' as const,
          progress: 55,
          participants: 170,
          training: 50,
          workshops: 140,
          completion: 60,
          stage1: 160,
          stage2: 120,
          stage3: 80,
          stage4: 40,
          totalProgress: 50
        }
      ]
    },
    UK: {
      activeParticipants: 650,
      overallProgress: 60,
      stageDistribution: [
        { 
          name: 'Pre-Visa', 
          value: 150,
          status: 'onTrack' as const,
          progress: 80,
          participants: 170,
          training: 75,
          workshops: 140,
          completion: 85,
          stage1: 170,
          stage2: 140,
          stage3: 110,
          stage4: 80,
          totalProgress: 75
        },
        { 
          name: 'Visa Processing', 
          value: 130,
          status: 'delayed' as const,
          progress: 65,
          participants: 150,
          training: 60,
          workshops: 120,
          completion: 70,
          stage1: 140,
          stage2: 110,
          stage3: 80,
          stage4: 50,
          totalProgress: 60
        },
        { 
          name: 'Onboarding', 
          value: 120,
          status: 'critical' as const,
          progress: 55,
          participants: 140,
          training: 50,
          workshops: 110,
          completion: 60,
          stage1: 130,
          stage2: 100,
          stage3: 70,
          stage4: 40,
          totalProgress: 50
        },
        { 
          name: 'Acknowledgment', 
          value: 130,
          status: 'onprogress' as const,
          progress: 45,
          participants: 150,
          training: 40,
          workshops: 120,
          completion: 50,
          stage1: 140,
          stage2: 110,
          stage3: 80,
          stage4: 50,
          totalProgress: 45
        },
        { 
          name: 'Training', 
          value: 120,
          status: 'onprogress' as const,
          progress: 50,
          participants: 140,
          training: 45,
          workshops: 110,
          completion: 55,
          stage1: 130,
          stage2: 100,
          stage3: 70,
          stage4: 40,
          totalProgress: 45
        }
      ]
    },
    Canada: {
      activeParticipants: 450,
      overallProgress: 85,
      stageDistribution: [
        { 
          name: 'Pre-Visa', 
          value: 120,
          status: 'onTrack' as const,
          progress: 95,
          participants: 130,
          training: 90,
          workshops: 110,
          completion: 100,
          stage1: 130,
          stage2: 110,
          stage3: 90,
          stage4: 70,
          totalProgress: 90
        },
        { 
          name: 'Visa Processing', 
          value: 100,
          status: 'delayed' as const,
          progress: 80,
          participants: 110,
          training: 75,
          workshops: 90,
          completion: 85,
          stage1: 110,
          stage2: 90,
          stage3: 70,
          stage4: 50,
          totalProgress: 75
        },
        { 
          name: 'Onboarding', 
          value: 90,
          status: 'critical' as const,
          progress: 70,
          participants: 100,
          training: 65,
          workshops: 80,
          completion: 75,
          stage1: 100,
          stage2: 80,
          stage3: 60,
          stage4: 40,
          totalProgress: 65
        },
        { 
          name: 'Acknowledgment', 
          value: 70,
          status: 'onprogress' as const,
          progress: 60,
          participants: 80,
          training: 55,
          workshops: 60,
          completion: 65,
          stage1: 80,
          stage2: 60,
          stage3: 40,
          stage4: 20,
          totalProgress: 55
        },
        { 
          name: 'Training', 
          value: 70,
          status: 'onprogress' as const,
          progress: 65,
          participants: 80,
          training: 60,
          workshops: 60,
          completion: 70,
          stage1: 80,
          stage2: 60,
          stage3: 40,
          stage4: 20,
          totalProgress: 60
        }
      ]
    },
    Australia: {
      activeParticipants: 350,
      overallProgress: 90,
      stageDistribution: [
        { 
          name: 'Pre-Visa', 
          value: 100,
          status: 'onTrack' as const,
          progress: 100,
          participants: 100,
          training: 95,
          workshops: 90,
          completion: 100,
          stage1: 100,
          stage2: 90,
          stage3: 80,
          stage4: 70,
          totalProgress: 95
        },
        { 
          name: 'Visa Processing', 
          value: 80,
          status: 'delayed' as const,
          progress: 85,
          participants: 80,
          training: 80,
          workshops: 70,
          completion: 90,
          stage1: 80,
          stage2: 70,
          stage3: 60,
          stage4: 50,
          totalProgress: 80
        },
        { 
          name: 'Onboarding', 
          value: 70,
          status: 'critical' as const,
          progress: 75,
          participants: 70,
          training: 70,
          workshops: 60,
          completion: 80,
          stage1: 70,
          stage2: 60,
          stage3: 50,
          stage4: 40,
          totalProgress: 70
        },
        { 
          name: 'Acknowledgment', 
          value: 50,
          status: 'onprogress' as const,
          progress: 65,
          participants: 50,
          training: 60,
          workshops: 40,
          completion: 70,
          stage1: 50,
          stage2: 40,
          stage3: 30,
          stage4: 20,
          totalProgress: 60
        },
        { 
          name: 'Training', 
          value: 50,
          status: 'onprogress' as const,
          progress: 70,
          participants: 50,
          training: 65,
          workshops: 40,
          completion: 75,
          stage1: 50,
          stage2: 40,
          stage3: 30,
          stage4: 20,
          totalProgress: 65
        }
      ]
    }
  };


interface DashboardFilters {
  country: string;
  batch: string;
  stage: string;
  program: string;
}

interface StageData {
  name: string;
  value: number;
  status: 'onTrack' | 'delayed' | 'critical' | 'onprogress';
  stage1?: number;
  stage2?: number;
  stage3?: number;
  stage4?: number;
  totalProgress?: number;
  participants?: number;
  training?: number;
  workshops?: number;
  completion?: number;
}

interface ProgressMetric {
  subject: string;
  value: number;
  fullMark?: number;
}

interface WorkshopData {
  name: string;
  completed: number;
  pending: number;
}

// Add these type definitions at the top of the file with other interfaces

export default function ProgramDashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<DashboardFilters>({
    country: 'All Countries',
    batch: 'All Batches',
    stage: 'All Stages',
    program: 'All Programs'
  });

  const [metrics, setMetrics] = useState({
    activeParticipants: 0,
    overallProgress: 0,
    stageDistribution: [] as StageData[],
    progressMetrics: [] as ProgressMetric[],
    workshopCompletion: [] as WorkshopData[]
  });

  const setProgressData = useState(progressData_Overview)[1];

  // Update the filter handling functions
  const handleFilterChange = (key: keyof DashboardFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    updateDashboardData(newFilters);
  };

  const resetFilters = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent form submission
    const defaultFilters = {
      country: 'All Countrys',
      batch: 'All Batchs',
      stage: 'All Stages',
      program: 'All Programs'
    };
    setFilters(defaultFilters);
    updateDashboardData(defaultFilters);
  };

  // Add a new function to handle data updates
  const updateDashboardData = useCallback(async (currentFilters: DashboardFilters) => {
    setIsLoading(true);
    try {
      // Handle 'All Countrys' selection
      let countryData;
      if (currentFilters.country === 'All Countrys') {
        countryData = {
          activeParticipants: Object.values(DASHBOARD_DATA).reduce((sum, country) => sum + country.activeParticipants, 0),
          overallProgress: Math.round(
            Object.values(DASHBOARD_DATA).reduce((sum, country) => sum + country.overallProgress, 0) / Object.keys(DASHBOARD_DATA).length
          ),
          stageDistribution: Object.values(DASHBOARD_DATA)[0].stageDistribution.map((stage, index) => ({
            ...stage,
            value: Object.values(DASHBOARD_DATA).reduce((sum, country) => 
              sum + (country.stageDistribution[index]?.value || 0), 0
            )
          }))
        };
      } else {
        countryData = DASHBOARD_DATA[currentFilters.country as keyof typeof DASHBOARD_DATA] || DASHBOARD_DATA.UAE;
      }

      // Apply batch and program multipliers
      const batchMultiplier = currentFilters.batch === 'All Batchs' ? 1 :
                             currentFilters.batch === '2024-Q1' ? 1 :
                             currentFilters.batch === '2024-Q2' ? 0.8 :
                             currentFilters.batch === '2024-Q3' ? 0.6 : 1;

      const programMultiplier = currentFilters.program === 'All Programs' ? 1 :
                               currentFilters.program === 'Program A' ? 1 :
                               currentFilters.program === 'Program B' ? 0.7 :
                               currentFilters.program === 'Program C' ? 0.5 : 1;

      // Apply stage filter
      let stageMultipliers = {
        stage1: 1,
        stage2: 1,
        stage3: 1,
        stage4: 1
      };

      // Update stage multipliers based on selected stage
      if (currentFilters.stage !== 'All Stages') {
        stageMultipliers = {
          stage1: currentFilters.stage === 'Stage 1' ? 1 : 0,
          stage2: currentFilters.stage === 'Stage 2' ? 1 : 0,
          stage3: currentFilters.stage === 'Stage 3' ? 1 : 0,
          stage4: currentFilters.stage === 'Stage 4' ? 1 : 0
        };
      }

      // Update progress data with all multipliers
      const updatedProgressData = progressData_Overview.map(item => ({
        ...item,
        stage1: Math.round(item.stage1 * batchMultiplier * programMultiplier * stageMultipliers.stage1),
        stage2: Math.round(item.stage2 * batchMultiplier * programMultiplier * stageMultipliers.stage2),
        stage3: Math.round(item.stage3 * batchMultiplier * programMultiplier * stageMultipliers.stage3),
        stage4: Math.round(item.stage4 * batchMultiplier * programMultiplier * stageMultipliers.stage4)
      }));

      setProgressData(updatedProgressData);

      // Update metrics with stage filtering
      const adjustedStageDistribution = countryData.stageDistribution.map(stage => {
        const stageData = {
          ...stage,
          value: Math.round(stage.value * batchMultiplier * programMultiplier),
          stage1: Math.round((stage.stage1 || 0) * batchMultiplier * programMultiplier * stageMultipliers.stage1),
          stage2: Math.round((stage.stage2 || 0) * batchMultiplier * programMultiplier * stageMultipliers.stage2),
          stage3: Math.round((stage.stage3 || 0) * batchMultiplier * programMultiplier * stageMultipliers.stage3),
          stage4: Math.round((stage.stage4 || 0) * batchMultiplier * programMultiplier * stageMultipliers.stage4)
        };

        // Update the total value based on visible stages
        if (currentFilters.stage !== 'All Stages') {
          const stageKey = currentFilters.stage.toLowerCase().replace(' ', '') as keyof typeof stageData;
          const stageValue = stageData[stageKey];
          stageData.value = typeof stageValue === 'number' ? stageValue : 0;
        }

        return stageData;
      });

      // Calculate active participants based on selected stage
      let activeParticipantsMultiplier = 1;
      if (currentFilters.stage !== 'All Stages') {
        const stageIndex = parseInt(currentFilters.stage.split(' ')[1]) - 1;
        activeParticipantsMultiplier = [1, 0.8, 0.6, 0.4][stageIndex] || 1;
      }

      // Calculate workshop completion data based on filters
      const workshopCompletion = adjustedStageDistribution.map(stage => ({
        name: stage.name,
        completed: Math.round(stage.workshops || 0),
        pending: Math.round(stage.participants || 0) - Math.round(stage.workshops || 0)
      }));

      setMetrics({
        activeParticipants: Math.round(countryData.activeParticipants * batchMultiplier * programMultiplier * activeParticipantsMultiplier),
        overallProgress: Math.round(countryData.overallProgress * batchMultiplier),
        stageDistribution: adjustedStageDistribution,
        progressMetrics: [
          { subject: 'Stage 1', value: Math.round(85 * batchMultiplier * stageMultipliers.stage1), fullMark: 100 },
          { subject: 'Stage 2', value: Math.round(70 * batchMultiplier * stageMultipliers.stage2), fullMark: 100 },
          { subject: 'Stage 3', value: Math.round(65 * programMultiplier * stageMultipliers.stage3), fullMark: 100 },
          { subject: 'Stage 4', value: Math.round(80 * programMultiplier * stageMultipliers.stage4), fullMark: 100 }
        ],
        workshopCompletion: workshopCompletion
      });

    } catch (error) {
      console.error('Error updating dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [setProgressData]); // Add setProgressData to the dependency array

  useEffect(() => {
    updateDashboardData(filters);
  }, [filters, updateDashboardData]); // Add updateDashboardData to dependencies

  return (
    <div className="p-6 space-y-6">
      {/* Filter Panel */}
      <Card className="p-2 bg-emerald-950/40 backdrop-blur border-emerald-600/30">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <FilterSelect
            placeholder="Country"
            options={['UAE', 'USA', 'UK', 'Canada', 'Australia']}
            value={filters.country}
            onChange={(value: string) => handleFilterChange('country', value)}
            
          />
          <FilterSelect
            placeholder="Batch"
            options={['2024-Q1', '2024-Q2', '2024-Q3']}
            value={filters.batch}
            onChange={(value: string) => handleFilterChange('batch', value)}
          />
          <FilterSelect
            placeholder="Stage"
            options={[
              'Stage 1',
              'Stage 2',
              'Stage 3',
              'Stage 4'
            ]}
            value={filters.stage}
            onChange={(value: string) => handleFilterChange('stage', value)}
          />
          <FilterSelect
            placeholder="Program"
            options={['Program A', 'Program B', 'Program C']}
            value={filters.program}
            onChange={(value: string) => handleFilterChange('program', value)}
          />
          <Button 
            variant="outline" 
            onClick={resetFilters}
            type="button"
            className="w-full bg-emerald-950/50 border-emerald-600/30 text-emerald-50 hover:bg-emerald-800/50"
          >
            Reset Filters
          </Button>
        </div>
      </Card>

      {isLoading ? (
        <div className="flex items-center justify-center h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
        </div>
      ) : (
        <>
          {/* KPI Overview */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <MetricCard
              title="Active Participants"
              value={metrics.activeParticipants}
              status="success"
              isPercentage={false}
            />
            <MetricCard
              title="Overall Progress"
              value={metrics.overallProgress}
              status="warning"
              isPercentage={true}
            />

            <MetricCard
              title="Visa Processing"
              value={metrics.stageDistribution.find(s => s.name === 'Visa Processing')?.value || 0}
              status={metrics.stageDistribution.find(s => s.name === 'Visa Processing')?.status || 'delayed'}
              isPercentage={false}
            />
            <MetricCard
              title="Onboarding"
              value={metrics.stageDistribution.find(s => s.name === 'Onboarding')?.value || 0}
              status={metrics.stageDistribution.find(s => s.name === 'Onboarding')?.status || 'critical'}
              isPercentage={false}
            />
            <MetricCard
              title="Training Progress"
              value={metrics.stageDistribution.find(s => s.name === 'Training')?.value || 0}
              status={metrics.stageDistribution.find(s => s.name === 'Training')?.status || 'onprogress'}
              isPercentage={false}
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Visa Process Timeline */}
            <ChartCard 
              title="Visa Process Timeline" 
              chart="lineBar" 
              data={[
                { stage: 'Pre-visa', participants: metrics.stageDistribution.find(s => s.name === 'Pre-Visa')?.value || 0 },
                { stage: 'Visa Processing', participants: metrics.stageDistribution.find(s => s.name === 'Visa Processing')?.value || 0 },
                { stage: 'Onboarding', participants: metrics.stageDistribution.find(s => s.name === 'Onboarding')?.value || 0 },
                { stage: 'Acknowledgment', participants: metrics.stageDistribution.find(s => s.name === 'Acknowledgment')?.value || 0 }
              ]} 
            />

            {/* Progress Stages Distribution */}
            <ChartCard 
              title="Progress Stages" 
              chart="pie" 
              data={[
                { name: 'Pre-visa', value: metrics.stageDistribution.find(s => s.name === 'Pre-Visa')?.value || 0, status: 'onTrack' },
                { name: 'Visa Processing', value: metrics.stageDistribution.find(s => s.name === 'Visa Processing')?.value || 0, status: 'delayed' },
                { name: 'Onboarding', value: metrics.stageDistribution.find(s => s.name === 'Onboarding')?.value || 0, status: 'critical' },
                { name: 'Acknowledgment', value: metrics.stageDistribution.find(s => s.name === 'Acknowledgment')?.value || 0, status: 'onprogress' }
              ]} 
            />
            
            {/* Workshop Completion */}
            <ChartCard 
              title="Workshop Completion Rates" 
              chart="bar" 
              data={metrics.workshopCompletion} 
            />
            
            {/* Training Progress */}
            <ChartCard 
              title="Training Progress" 
              chart="radar" 
              data={metrics.progressMetrics} 
            />

            {/* Active Participants Trend */}
            <ChartCard 
              title="Active Participants Trend" 
              chart="line" 
              data={[
                { month: 'Jan', participants: 120 },
                { month: 'Feb', participants: 150 },
                { month: 'Mar', participants: metrics.activeParticipants }
              ]} 
            />
          </div>

          {/* Comprehensive Group Chart */}
          <Card className="bg-emerald-900/20 border-emerald-600/30">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-emerald-50 mb-4">Program Progress Overview</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={metrics.stageDistribution.map(stage => ({
                name: stage.name,
                stage1: stage.stage1 || 0,
                stage2: stage.stage2 || 0,
                stage3: stage.stage3 || 0,
                stage4: stage.stage4 || 0,
                totalProgress: stage.totalProgress || 0
              }))}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="rgba(255,255,255,0.1)"
                vertical={false}
              />
              <XAxis 
                dataKey="name" 
                stroke="#fff"
                tick={{ fill: '#fff', fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={100}
                interval={0}
              />
              <YAxis
                stroke="#fff"
                tick={{ fill: '#fff', fontSize: 12 }}
                label={{ 
                  value: 'Number of People', 
                  angle: -90,
                  position: 'insideLeft',
                  offset: 15,
                  style: { 
                    fill: '#fff',
                    textAnchor: 'middle',
                    dy: '1em'
                  } 
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#064e3b',
                  border: `1px solid ${THEME.colors.primary}`,
                  borderRadius: '6px',
                  color: '#fff'
                }}
                formatter={(value, name) => {
                  const stageColors = {
                    stage1: '#10b981', // emerald-500
                    stage2: '#064e3b', // emerald-900
                    stage3: '#f59e0b', // amber-500
                    stage4: '#ef4444'  // red-500
                  };
                  
                  const stageName = name === 'stage1' ? 'Stage 1' :
                                   name === 'stage2' ? 'Stage 2' :
                                   name === 'stage3' ? 'Stage 3' :
                                   name === 'stage4' ? 'Stage 4' : name;
                  
                  return [
                    <span key={stageName} style={{ color: stageColors[name as keyof typeof stageColors] }}>
                      {`${stageName}: ${value} People`}
                    </span>,
                    ''
                  ];
                }}
                labelFormatter={(label) => `${label}`}
              />
              <Legend 
                verticalAlign="top"
                height={36}
                wrapperStyle={{
                  paddingBottom: '20px'
                }}
              />
              <Bar 
                dataKey="stage1" 
                name="Stage 1" 
                fill={THEME.colors.stages.stage1}
                radius={[4, 4, 0, 0]}
                maxBarSize={30}
              >
                <LabelList 
                  dataKey="stage1" 
                  position="top" 
                  fill="#fff"
                  formatter={(value: number) => `${value}`}
                />
              </Bar>
              <Bar 
                dataKey="stage2" 
                name="Stage 2" 
                fill={THEME.colors.stages.stage2}
                radius={[4, 4, 0, 0]}
                maxBarSize={30}
                >
                <LabelList 
                  dataKey="stage2" 
                  position="top" 
                  fill="#fff"
                  formatter={(value: number) => `${value}`}
                />
              </Bar>
              <Bar 
                dataKey="stage3" 
                name="Stage 3" 
                fill={THEME.colors.stages.stage3}
                radius={[4, 4, 0, 0]}
                maxBarSize={30}
                 >
                <LabelList 
                  dataKey="stage3" 
                  position="top" 
                  fill="#fff"
                  formatter={(value: number) => `${value}`}
                />
              </Bar>
              <Bar 
                dataKey="stage4" 
                name="Stage 4" 
                fill={THEME.colors.stages.stage4}
                radius={[4, 4, 0, 0]}
                maxBarSize={30}
              >
                <LabelList 
                  dataKey="stage4" 
                  position="top" 
                  fill="#fff"
                  formatter={(value: number) => `${value}`}
                />
              </Bar>
            </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        
        </Card>
        
        </>
      )}
    </div>
  );
}

// Component for filter select dropdowns
function FilterSelect({ placeholder, options, value, onChange }: { 
  placeholder: string, 
  options: string[], 
  value: string, 
  onChange: (value: string) => void 
}) {
  return (
    <Select 
      value={value} 
      onValueChange={onChange}
    >
      <SelectTrigger className="bg-emerald-950/50 border-emerald-600/30 text-emerald-50">
        <SelectValue placeholder={`All ${placeholder}s`}>
          {value}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-emerald-950 border-emerald-600/30">
        <SelectItem 
          value={`All ${placeholder}s`} 
          className="text-emerald-50 hover:bg-emerald-800/50"
        >
          All {placeholder}s
        </SelectItem>
        {options.map(option => (
          <SelectItem 
            key={option} 
            value={option}
            className="text-emerald-50 hover:bg-emerald-800/50"
          >
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

// Component for metric cards
function MetricCard({ title, value, status, isPercentage = false }: { title: string, value: number, status: string, isPercentage: boolean }) {
  return (
    <Card className="p-4 bg-emerald-900/20 backdrop-blur">
      <h3 className="font-semibold text-emerald-50">{title}</h3>
      <div className="text-3xl font-bold text-white mt-2">
        {value}{isPercentage ? '%' : ''}
      </div>
      <Badge 
        variant="outline" 
        className={`mt-2 border-2 ${
          status === 'success' ? 'border-emerald-500 text-emerald-500' : 
          status === 'warning' ? 'border-amber-500 text-amber-500' : 
          'border-red-500 text-red-500'
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    </Card>
  );
}

// Component for chart cards
// Add these interfaces before the ChartCard component
interface ChartDataItem {
  name?: string;
  value?: number;
  status?: 'onTrack' | 'delayed' | 'critical' | 'onprogress';
  subject?: string;
  completed?: number;
  pending?: number;
  month?: string;
  participants?: number;
  stage?: string;
}

// Update the ChartCard component signature
function ChartCard({ 
  title, 
  chart, 
  data 
}: { 
  title: string;
  chart: 'pie' | 'radar' | 'bar' | 'line' | 'lineBar';
  data: ChartDataItem[];
}) {
  const renderChart = () => {
    switch (chart) {
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              label={({ name, value }) => `${name}: ${value}`}
              labelLine={true}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={index} 
                  fill={entry.status ? THEME.status[entry.status] : THEME.status.onTrack} 
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        );
      case 'radar':
        return (
          <RadarChart data={data} height={300}>
            <PolarGrid 
              gridType="polygon" 
              stroke="#ffffff33" 
            />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ 
                fill: '#fff', 
                fontSize: 16,
                dy: 3
              }}
              axisLine={{ stroke: '#ffffff50' }}
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]}
              tick={{ fill: '#fff', fontSize: 14 }}
              tickCount={5}
              tickFormatter={(value) => `${value}`}
              axisLine={false}

            />
            <Radar
              name="Progress"
              dataKey="value"
              stroke={THEME.colors.primary}
              fill={THEME.colors.primary}
              fillOpacity={0.6}
            >
              <LabelList 
                dataKey="value" 
                position="outside"
                formatter={(value: number) => `${value}%`}
                fill="#fff"
                fontSize={16}
                offset={15}
                style={{ fontWeight: 'bold' }}
              />
            </Radar>
            <Legend 
              wrapperStyle={{
                color: '#fff',
                fontSize: '16px',
                padding: '10px'
              }}
            />
          </RadarChart>
        );
      case 'bar':
        return (
          <BarChart data={data}>
            <XAxis 
              dataKey="name" 
              stroke="#fff"
              tick={{ fill: '#fff', fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              stroke="#fff"
              tick={{ fill: '#fff', fontSize: 12 }}
            />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-emerald-900/90 p-2 rounded-lg border border-emerald-500/30">
                      <p className="text-white font-semibold">{data.name}</p>
                      <p className="text-emerald-400">completed: {data.completed}</p>
                      <p className="text-amber-400">pending: {data.pending}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
            <Bar dataKey="completed" fill={THEME.colors.primary} stackId="a">
              <LabelList 
                dataKey="completed" 
                position="center"
                fill="#fff"
                formatter={(value: number) => value}
                style={{
                  fontSize: '12px',
                  fontWeight: 'bold',
                  textShadow: '0 0 3px rgba(0,0,0,0.75)'
                }}
              />
            </Bar>
            <Bar dataKey="pending" fill={THEME.colors.warning} stackId="a">
              <LabelList 
                dataKey="pending" 
                position="center"
                fill="#fff"
                formatter={(value: number) => value}
                style={{
                  fontSize: '12px',
                  fontWeight: 'bold',
                  textShadow: '0 0 3px rgba(0,0,0,0.75)'
                }}
              />
            </Bar>
          </BarChart>
        );
        case 'line':
        return (
          <LineChart 
            data={data}
            margin={{
              top: 30,    // Increased top margin
              right: 30,
              left: 20,
              bottom: 20
            }}
          >
            <XAxis 
              dataKey="month"
              stroke="#fff"
              tick={{ fill: '#fff', fontSize: 12 }}
            />
            <YAxis 
              stroke="#fff"
              tick={{ fill: '#fff', fontSize: 12 }}
              label={{ 
                value: 'Number of People', 
                angle: -90,
                position: 'insideLeft',
                offset: 15,
                style: { 
                  fill: '#fff',
                  textAnchor: 'middle',
                  dy: '1em'
                } 
              }}
            />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="participants" 
              stroke={THEME.colors.primary} 
              strokeWidth={2}
              dot={{ fill: THEME.colors.primary, r: 6 }}
            >
              <LabelList 
                dataKey="participants" 
                position="top"
                fill="#fff"
                offset={15}        // Increased offset from 10 to 15
                formatter={(value: number) => `${value}`}
                style={{
                  fontSize: '12px',
                  fontWeight: 'bold',
                  textShadow: '0 0 3px rgba(0,0,0,0.75)'
                }}
              />
            </Line>
          </LineChart>
        );
        // visa process timeline
      case 'lineBar':
        return (
          <ComposedChart 
            data={data}
            margin={{
              top: 30,    // Increased top margin
              right: 30,
              left: 20,
              bottom: 20
            }}
            height={400}  // Increased height
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="rgba(255,255,255,0.1)"
              vertical={false}
            />
            <XAxis 
              dataKey="stage"
              stroke="#fff"
              tick={{ fill: '#fff', fontSize: 12 }}
            />
            <YAxis 
              stroke="#fff"
              tick={{ fill: '#fff', fontSize: 12 }}
              label={{ 
                value: 'Number of Participants', 
                angle: -90,
                position: 'insideLeft',
                offset: 15,
                style: { 
                  fill: '#fff',
                  textAnchor: 'middle',
                  dy: '1em'
                } 
              }}
            />
            <Tooltip />
            <Legend />
            <Bar 
              dataKey="participants" 
              fill={THEME.colors.primary}
              fillOpacity={0.4}
              barSize={40}
              name="Participants Count"
            >
              <LabelList 
                dataKey="participants" 
                position="top"
                fill="#fff"
                offset={15}        // Increased offset
                formatter={(value: number) => `${value}`}
                style={{ 
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}
              />
            </Bar>
            <Line 
              type="monotone" 
              dataKey="participants" 
              stroke={THEME.colors.primary} 
              strokeWidth={2}
              dot={{ fill: THEME.colors.primary, r: 6 }}
              name="Progress Line"
            />
          </ComposedChart>
        );
      // Add other chart types as needed
      default:
        return <div>Unsupported chart type</div>;
    }
  };

  return (
    <Card className="p-4 bg-emerald-900/20 backdrop-blur">
      <h3 className="font-semibold text-emerald-50 mb-4">{title}</h3>
      <div className="h-[300px]">
        <ResponsiveContainer>
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
