export const mockData = {
  visaIssues: [
    { id: "VS001", name: "John Smith", country: "USA", branch: "New York", issue: "Visa Delay", status: "Delayed", date: "2024-02-15" },
    { id: "VS002", name: "Emma Wilson", country: "UK", branch: "London", issue: "Processing Delay", status: "In Progress", date: "2024-01-28" },
    { id: "VS003", name: "Michael Chen", country: "Canada", branch: "Toronto", issue: "Document Missing", status: "Critical", date: "2024-03-01" },
    { id: "VS004", name: "Sophie Dubois", country: "France", branch: "Paris", issue: "Verification Failed", status: "Critical", date: "2024-02-20" },
    { id: "VS005", name: "Hans Mueller", country: "Germany", branch: "Berlin", issue: "Application Review", status: "Pending", date: "2024-03-10" },
    { id: "VS006", name: "Carlos Garcia", country: "Spain", branch: "Madrid", issue: "Document Verification", status: "Pending", date: "2024-01-15" },
    { id: "VS007", name: "Marco Rossi", country: "Italy", branch: "Rome", issue: "Compliance Check", status: "In Progress", date: "2024-02-05" },
    { id: "VS008", name: "Yuki Tanaka", country: "Japan", branch: "Tokyo", issue: "Security Review", status: "In Review", date: "2024-03-05" }
  ],

  traineeData: [
    { id: "TR001", name: "John Doe", program: "Hotel Management", startDate: "2024-01-01", status: "On Track", deadline: "2024-03-31", progress: 75 },
    { id: "TR002", name: "Jane Smith", program: "Travel Management", startDate: "2024-01-15", status: "Delayed", deadline: "2024-04-15", progress: 45 },
    { id: "TR003", name: "Mike Johnson", program: "Restaurant Management", startDate: "2024-02-01", status: "Delayed", deadline: "2024-05-01", progress: 35 },
    { id: "TR004", name: "Sarah Wilson", program: "Tourism and Travel Management", startDate: "2024-02-15", status: "In Progress", deadline: "2024-05-15", progress: 25 },
    { id: "TR005", name: "Tom Brown", program: "Hotel Management", startDate: "2024-03-01", status: "On Track", deadline: "2024-06-01", progress: 65 },
  ],

  issueCategories: [
    { category: "Delayed Cases", count: 25, percentage: 25.0 },
    { category: "Critical Issues", count: 35, percentage: 35.0 },
    { category: "Pending Actions", count: 30, percentage: 30.0 },
    { category: "Risk Indicators", count: 10, percentage: 10.0 }
  ],

  trainingCategories: [
    { category: "In Progress", count: 13, percentage: 43.3 },
    { category: "Completed", count: 5, percentage: 16.7 },
    { category: "Not Started", count: 4, percentage: 13.3 },
    { category: "Delayed", count: 3, percentage: 10 },
    { category: "On Track", count: 5, percentage: 16.7 }
  ],

  statusSummary: {
    delayedCases: { count: 15, percentage: 37.5 },
    criticalIssues: { count: 10, percentage: 25 },
    pendingActions: { count: 8, percentage: 20 },
    riskIndicators: { count: 7, percentage: 17.5 }
  },

  issueDistribution: [
    { category: 'Delayed Cases', count: 50, percentage: 30 },
    { category: 'Critical Issues', count: 35, percentage: 25 },
    { category: 'Pending Actions', count: 25, percentage: 20 },
    { category: 'Risk Indicators', count: 15, percentage: 15 }
  ],
};
