'use client'

import { useState, useEffect } from 'react';
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
import MapView from '@/app/dashboard/MapView';
import { Upload, Plus } from "lucide-react";
import { axiosInstance } from '@/lib/axios';
import { useRouter } from 'next/navigation';


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

interface ChartData {
  name?: string;
  value?: number;
  status?: 'onTrack' | 'delayed' | 'critical' | 'onprogress';
  subject?: string;
  fullMark?: number;
  month?: string;
  participants?: number;
  completed?: number;
  pending?: number;
  stage?: string;
}

// Add these helper functions before the ProgramDashboard component
const calculateProgressMetrics = (data: any): ProgressMetric[] => {
  return [
    { subject: 'Participants', value: data.activeParticipants, fullMark: 1000 },
    { subject: 'Training', value: data.overallProgress, fullMark: 100 },
    { subject: 'Workshops', value: 75, fullMark: 100 },
    { subject: 'Completion', value: 80, fullMark: 100 }
  ];
};

const calculateWorkshopCompletion = (data: any): WorkshopData[] => {
  return data.stageDistribution.map((stage: StageData) => ({
    name: stage.name,
    completed: stage.workshops || 0,
    pending: (stage.participants || 0) - (stage.workshops || 0)
  }));
};

export default function ProgramDashboard() {
  const router = useRouter();
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

  // Update the filter handling functions
  const handleFilterChange = (key: keyof DashboardFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    updateDashboardData(newFilters);
  };

  const resetFilters = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent form submission
    const defaultFilters = {
      country: 'All Countries',
      batch: 'All Batches',
      stage: 'All Stages',
      program: 'All Programs'
    };
    setFilters(defaultFilters);
    updateDashboardData(defaultFilters);
  };

  // Add a new function to handle data updates
  const updateDashboardData = async (currentFilters: DashboardFilters) => {
    const MAX_RETRIES = 3;
    let retries = 0;

    while (retries < MAX_RETRIES) {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get('/dashboard', {
          params: {
            country: currentFilters.country,
            batch: currentFilters.batch,
            stage: currentFilters.stage,
            program: currentFilters.program
          }
        });
        
        const data = response.data;
        setMetrics({
          activeParticipants: data.activeParticipants,
          overallProgress: data.overallProgress,
          stageDistribution: data.stageDistribution,
          progressMetrics: calculateProgressMetrics(data),
          workshopCompletion: calculateWorkshopCompletion(data)
        });
        break; // Success, exit the retry loop
      } catch (error: any) {
        if (error?.status === 504 && retries < MAX_RETRIES - 1) {
          retries++;
          await new Promise(resolve => setTimeout(resolve, 1000 * retries));
          continue;
        }
        console.error('Error fetching dashboard data:', error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Remove the useEffect hook that was watching filters
  // Instead, call updateDashboardData on initial load
  useEffect(() => {
    updateDashboardData(filters);
  }, [filters]); // Add filters to dependency array

  const handleExcelImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) {
        console.error('No file selected');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log('Upload result:', result); // Debug log

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed');
      }

      // Refresh dashboard data after successful upload
      await updateDashboardData(filters);
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-emerald-900 p-2 shadow-lg rounded-xl">
        <div className="flex flex-col gap-2">
          {/* Top row with title, import and login */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Tourism Dashboard</h1>
            <div className="flex items-center gap-2">
              <Button 
                onClick={() => router.push('/Input')}
                className="bg-emerald-950/50 hover:bg-[#846EDB] text-white flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add New Data
              </Button>
              <label
                htmlFor="excel-upload"
                className="inline-flex items-center gap-2 cursor-pointer bg-emerald-950/50 border-[#846EDB] text-white hover:bg-[#846EDB] rounded-lg px-4 py-2 text-sm font-medium transition-colors"
              >
                <Upload className="h-4 w-4" />
                Import Excel
                <input
                  id="excel-upload"
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleExcelImport}
                  className="hidden"
                />
              </label>
              <Button 
                variant="outline" 
                className="bg-emerald-950/50 border-emerald-600/30 text-white hover:bg-[#846EDB] hover:text-white rounded-lg"
                onClick={() => window.location.href = '/user'}
              >
                Login
              </Button>
            </div>
          </div>

          {/* Bottom row with breadcrumb and request button */}
          <div className="flex justify-between items-center">
            <div className="flex items-center text-emerald-100/80 text-sm">
              <span>Home</span>
              <span className="mx-2">›</span>
              <span>Dashboard</span>
            </div>
            <Button 
              variant="outline" 
              className="bg-[#d4ff67] text-emerald-900 hover:bg-[#c2ee55] border-none px-6 rounded-lg"
            >
              Request Tourism Statistics
            </Button>
          </div>
        </div>
      </div>

      {/* Existing dashboard content */}
      <div className="p-5 space-y-6">
        {/* Filter Panel */}
        <Card className="p-1 bg-emerald-950/40 backdrop-blur border-emerald-600/30">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-1">
            <FilterSelect
              placeholder="Countrie"
              options={['UAE', 'USA', 'UK', 'Canada', 'Australia']}
              value={filters.country}
              onChange={(value: string) => handleFilterChange('country', value)}
              
            />
            <FilterSelect
              placeholder="Batche"
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
                value={Math.round(metrics.overallProgress)}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* First six charts including Active Participants */}
              <ChartCard 
                title="Active Participants Trend" 
                chart="line" 
                data={[
                  { month: 'Jan', participants: 120 },
                  { month: 'Feb', participants: 150 },
                  { month: 'Mar', participants: metrics.activeParticipants }
                ]} 
              />
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
              <ChartCard 
                title="Workshop Completion Rates" 
                chart="bar" 
                data={metrics.workshopCompletion} 
              />
              <ChartCard 
                title="Training Progress" 
                chart="radar" 
                data={metrics.progressMetrics} 
              />
            </div>

            {/* Full-width Map */}
            <Card className="p-4 bg-emerald-900/20 backdrop-blur">
              <h3 className="font-semibold text-emerald-50 mb-2">Global Distribution</h3>
              <div className="h-[500px] relative overflow-hidden">
                <div className="absolute inset-0">
                  <MapView 
                    activeFilters={{
                      stage: filters.stage === 'All Stages' ? [] : [filters.stage],
                      performance: [],
                      country: filters.country === 'All Countries' ? [] : [filters.country],
                      program: filters.program === 'All Programs' ? [] : [filters.program],
                      batch: filters.batch === 'All Batches' ? [] : [filters.batch]
                    }}
                  />
                </div>
              </div>
            </Card>

            {/* Program Progress Overview */}
            <Card className="bg-emerald-900/20 backdrop-blur">
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
                            stage1: '#10b981',
                            stage2: '#064e3b',
                            stage3: '#f59e0b',
                            stage4: '#ef4444'
                          };
                          
                          const stageName = name === 'stage1' ? 'Stage 1' :
                                        name === 'stage2' ? 'Stage 2' :
                                        name === 'stage3' ? 'Stage 3' :
                                        name === 'stage4' ? 'Stage 4' : name;
                          
                          return [
                            <span key={name} style={{ color: stageColors[name as keyof typeof stageColors] }}>
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
function ChartCard({ 
  title, 
  chart, 
  data 
}: { 
  title: string;
  chart: 'pie' | 'radar' | 'bar' | 'line' | 'lineBar';
  data: ChartData[];
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
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const completed = payload[0].value as number;
                  const pending = payload[1].value as number;
                  return (
                    <div className="bg-emerald-900/90 p-2 rounded-lg border border-emerald-500/30">
                      <p className="text-white font-semibold">{label}</p>
                      <p className="text-emerald-400">completed : {completed}</p>
                      <p className="text-amber-400">pending : {pending}</p>
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
            data={data.filter(d => d.participants !== undefined)}
            margin={{
              top: 30,
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
            {data.some(d => d.participants !== undefined) && (
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
                  offset={15}
                  formatter={(value: number) => `${value}`}
                  style={{
                    fontSize: '12px',
                    fontWeight: 'bold',
                    textShadow: '0 0 3px rgba(0,0,0,0.75)'
                  }}
                />
              </Line>
            )}
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
