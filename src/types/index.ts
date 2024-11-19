export interface Tab {
  id: string;
  label: string;
}

interface TrendPoint {
  date: string;
  value: number;
}

export interface TraineeData {
  totalTrainees: number;
  activeTrainees: number;
  trend: TrendPoint[];
} 