  'use client';

  import React, { useState, useMemo } from 'react';
  import { Card } from '@/components/ui/card';
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { AlertTable } from '@/app/statusalerts/components/alert-table';
  import { StatusSummary } from '@/app/statusalerts/components/status-summary';
  import { TraineeTable } from '@/app/statusalerts/components/trainee-table';
  import { mockData } from '@/app/statusalerts/lib/data';
  import { Button } from "@/app/statusalerts/components/ui/button";
  import { FilterIcon } from 'lucide-react'; // Import the filter icon
  import { TrainingPieChart } from '@/app/statusalerts/components/charts/training-pie-chart';
  import { calculateIssueDistribution } from '@/app/statusalerts/lib/utils';
  import { BarChart } from '@/app/statusalerts/components/charts/bar-chart';
  import { getIssueDistributionData } from './lib/utils';

  export default function Dashboard() {
    const [selectedCountry, setSelectedCountry] = useState<string>('all');
    const [selectedIssue, setSelectedIssue] = useState('all');
    const [selectedBranch, setSelectedBranch] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');

    const [appliedFilters, setAppliedFilters] = useState({
      country: 'all',
      issue: 'all',
      branch: 'all',
      status: 'all'
    });

    const filteredData = useMemo(() => {
      return mockData.visaIssues.filter(item => {
        return (
          (appliedFilters.country === 'all' || item.country === appliedFilters.country) &&
          (appliedFilters.issue === 'all' || item.issue === appliedFilters.issue) &&
          (appliedFilters.branch === 'all' || item.branch === appliedFilters.branch) &&
          (appliedFilters.status === 'all' || item.status === appliedFilters.status)
        );
      });
    }, [appliedFilters]);

    const issueDistribution = useMemo(() => {
      return calculateIssueDistribution();
    }, []);

    console.log('Issue Distribution:', issueDistribution); // For debugging

    const handleApplyFilters = () => {
      setAppliedFilters({
        country: selectedCountry,
        issue: selectedIssue,
        branch: selectedBranch,
        status: selectedStatus
      });
    };

    const handleResetFilters = () => {
      setSelectedCountry('all');
      setSelectedIssue('all');
      setSelectedBranch('all');
      setSelectedStatus('all');
      setAppliedFilters({
        country: 'all',
        issue: 'all',
        branch: 'all',
        status: 'all'
      });
    };

    const uniqueCountries = useMemo(() => 
      Array.from(new Set(mockData.visaIssues.map(item => item.country))),
      []
    );

    const uniqueIssues = useMemo(() => 
      Array.from(new Set(mockData.visaIssues.map(item => item.issue))),
      []
    );

    const uniqueBranches = useMemo(() => 
      Array.from(new Set(mockData.visaIssues.map(item => item.branch))),
      []
    );

    const uniqueStatuses = useMemo(() => 
      Array.from(new Set(mockData.visaIssues.map(item => item.status))),
      []
    );

    const issueData = getIssueDistributionData();

    return (
      <div className="  bg-[#00201E] p-6">
        <div className=" mx-auto space-y-6">
          <h1 className="text-2xl font-bold text-[#40E0D0]">
            Static Alerts & Critical Information
          </h1>

          {/* Filter Controls */}
          <div className="w-full  -[#004D47] p-4 rounded-lg border border-[#005C54]">
            <div className="flex items-center gap-4">
              {/* Categories */}
              <div className="grid grid-cols-4 gap-4 flex-1">
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger className="bg-[#004D47] border-[#005C54] text-[#40E0D0]">
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Countries</SelectItem>
                    {uniqueCountries.map(country => (
                      <SelectItem key={country} value={country}>{country}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedIssue} onValueChange={setSelectedIssue}>
                  <SelectTrigger className="bg-[#004D47] border-[#005C54] text-[#40E0D0]">
                    <SelectValue placeholder="Select Issue" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Issues</SelectItem>
                    {uniqueIssues.map(issue => (
                      <SelectItem key={issue} value={issue}>{issue}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                  <SelectTrigger className="bg-[#004D47] border-[#005C54] text-[#40E0D0]">
                    <SelectValue placeholder="Select Branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Branches</SelectItem>
                    {uniqueBranches.map(branch => (
                      <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="bg-[#004D47] border-[#005C54] text-[#40E0D0]">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    {uniqueStatuses.map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Filter and Reset Buttons */}
              <div className="flex gap-2">
                <Button
                  onClick={handleApplyFilters}
                  className="bg-[#40E0D0] text-[#004D47] hover:bg-[#2BC4B8] p-2 h-10 w-10 rounded-full"
                >
                  <FilterIcon className="h-5 w-5" />
                </Button>
                <Button
                  onClick={handleResetFilters}
                  className="bg-[#004D47] text-[#40E0D0] hover:bg-[#005C54] p-2"
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>

          {/* Status Summary */}
          <StatusSummary data={issueDistribution || []} />

          {/* Main Content */}
          <div className="grid grid-cols-2 gap-6">
            {/* Issue Categories Pie Chart */}
            <Card className="bg-[#004D47] border-[#005C54]">
              <div className="p-4">
                <h2 className="text-[#40E0D0] text-xl font-semibold mb-4">
                  Issue Distribution
                </h2>
                <div className="flex-1">
                  <BarChart data={issueData} />
                </div>
              </div>
            </Card>

            {/* Training Status Pie Chart */}
            <Card className="bg-[#004D47] border-[#005C54]">
              <div className="p-4">
                <h2 className="text-[#40E0D0] text-xl font-semibold mb-4">
                  Training Status Distribution
                </h2>
                <TrainingPieChart data={mockData.trainingCategories} />
              </div>
            </Card>
          </div>

          {/* Alerts Section - Full Width Cards */}
          <div className="space-y-6">
            {/* Alert Table */}
            <Card className="bg-[#004D47] border-[#005C54]">
              <div className="p-4">
                <h2 className="text-[#40E0D0] text-xl font-semibold mb-4">
                  Recent Alerts
                </h2>
                <AlertTable data={filteredData} />
              </div>
            </Card>

            {/* Trainee Table */}
            <Card className="bg-[#004D47] border-[#005C54]">
              <div className="p-4">
                <h2 className="text-[#40E0D0] text-xl font-semibold mb-4">
                  Program Alerts
                </h2>
                <TraineeTable data={mockData.traineeData} />
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }