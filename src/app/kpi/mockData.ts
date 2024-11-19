export const mockDashboardData = {
  activeTrainees: {
    totalTrainees: 30,
    activeTrainees: 28,
    monthlyTrend: [
      { month: 'Jan', count: 150 },
      { month: 'Feb', count: 165 },
      { month: 'Mar', count: 180 },
      { month: 'Apr', count: 175 },
      { month: 'May', count: 190 },
      { month: 'Jun', count: 210 }
    ],
    yearlyData: [
      { year: 2021, count: 120 },
      { year: 2022, count: 150 },
      { year: 2023, count: 180 },
      { year: 2024, count: 210 }
    ],
    locationData: [
      { location: 'USA', count: 80 },
      { location: 'UK', count: 45 },
      { location: 'UAE', count: 35 },
      { location: 'Canada', count: 20 }
    ],
    statusDistribution: [
      { name: 'On Track', value: 65, status: 'onTrack' },
      { name: 'Delayed', value: 25, status: 'delayed' },
      { name: 'Critical', value: 10, status: 'critical' }
    ],
    workshopCompletion: [
      { name: 'Workshop A', completed: 85, pending: 15 },
      { name: 'Workshop B', completed: 75, pending: 25 },
      { name: 'Workshop C', completed: 90, pending: 10 }
    ],
    ganttData: [
      { task: 'Module 1', Attended: 85 },
      { task: 'Module 2', Attended: 75 },
      { task: 'Module 3', Attended: 65 },
      { task: 'Module 4', Attended: 55 }
    ]
  }
}; 