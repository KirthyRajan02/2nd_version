interface AlertCardProps {
    severity: 'critical' | 'warning' | 'success'
    title: string
    message: string
  }
  
  export function AlertCard({ severity, title, message }: AlertCardProps) {
    const severityStyles = {
      critical: 'bg-red-900/30 border-red-500',
      warning: 'bg-yellow-900/30 border-yellow-500',
      success: 'bg-green-900/30 border-green-500'
    }
  
    const severityTextStyles = {
      critical: 'text-red-400',
      warning: 'text-yellow-400',
      success: 'text-green-400'
    }
  
    return (
      <div className={`p-4 rounded-lg border ${severityStyles[severity]}`}>
        <h4 className={`font-medium ${severityTextStyles[severity]}`}>{title}</h4>
        <p className="mt-1 text-sm text-gray-300">{message}</p>
      </div>
    )
  }