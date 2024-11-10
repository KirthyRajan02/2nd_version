interface MetricCardProps {
    title: string
    value: string
    change: string
    trend: 'up' | 'down'
    className?: string
  }
  
  export function MetricCard({ title, value, change, trend, className = '' }: MetricCardProps) {
    return (
      <div className={`p-6 rounded-xl bg-[#002633] ${className}`}>
        <h3 className="text-sm font-medium text-gray-400">{title}</h3>
        <div className="mt-2 flex items-baseline">
          <p className="text-2xl font-semibold text-white">{value}</p>
          <p
            className={`ml-2 flex items-center text-sm font-medium ${
              trend === 'up' ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {trend === 'up' ? (
              <svg
                className="h-4 w-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            ) : (
              <svg
                className="h-4 w-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                />
              </svg>
            )}
            {change}
          </p>
        </div>
      </div>
    )
  }