import { LucideIcon } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

export function MetricCard({ title, value, icon: Icon, trend, className }: MetricCardProps) {
    return (
      <div className={`bg-emerald-800/10 p-6 rounded-xl ${className}`}>
        <div className="flex items-center justify-between">
          <h3 className="text-emerald-700 font-medium">{title}</h3>
          <Icon className="w-6 h-6 text-emerald-600" />
        </div>
        <p className="text-3xl font-bold mt-2 text-emerald-900">{value}</p>
        {trend && (
          <div className={`flex items-center mt-2 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            <span>{trend.value}%</span>
          </div>
        )}
      </div>
    )
  }