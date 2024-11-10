import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Function to calculate issue distribution
export function calculateIssueDistribution() {
  // Hardcoded values as per requirement
  return [
    { category: 'Delayed Cases', count: 50, percentage: 30 },
    { category: 'Critical Issues', count: 35, percentage: 25 },
    { category: 'Pending Actions', count: 25, percentage: 20 },
    { category: 'Risk Indicators', count: 15, percentage: 15 }
  ];
}

// Function to categorize issues
export function categorizeIssue(status: string) {
  switch (status) {
    case 'Critical':
      return 'Critical Issues';
    case 'Pending':
      return 'Pending Actions';
    case 'Delayed':
      return 'Delayed Cases';
    default:
      return 'Risk Indicators';
  }
}

export function getIssueDistributionData() {
  return [
    { name: 'Visa Delay', value: 85 },
    { name: 'Processing Delay', value: 82 },
    { name: 'Document Missing', value: 88 },
    { name: 'Verification Failed', value: 83 },
    { name: 'Application Review', value: 86 },
    { name: 'Document Verification', value: 84 },
    { name: 'Compliance Check', value: 81 },
    { name: 'Security Review', value: 81 }
  ];
} 