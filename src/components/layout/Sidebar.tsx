'use client'

import { Menu as MenuIcon, ChevronRight as ChevronRightIcon, LayoutDashboard, Users, Clock, Building2, LineChart, Bell, Settings, BarChart, GitBranch } from 'lucide-react'
import { useLayoutStore } from '@/store/layout-store'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { usePathname } from 'next/navigation'

const navigationItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' }, // D:\project\key performance indicators\src\app\dashboard
  { name: 'Participant Distribution & Location Metrics', icon: GitBranch, path: '/participation' },
  { name: 'Trainee Metrics', icon: Users, path: '/trainee' },
  // { name: 'Program Stage Metrics', icon: GitBranch, path: '/programstage' },
  { name: 'Timeline & Duration Metrics', icon: Clock, path: '/timeline/dashboard' },
  { name: 'Organizational Metrics', icon: Building2, path: '/organization' },
  { name: 'Key Performance Indicators (KPIs)', icon: LineChart, path: '/kpi' }, // D:\project\key performance indicators\src\app\kpi
  { name: 'Status Alerts & Critical Information', icon: Bell, path: '/statusalerts' },
  { name: 'Survey Metrics', icon: BarChart, path: '/survey' },
  { name: 'Administrative Metrics', icon: Settings, path: '/admin' }
]

export default function Sidebar() {
  const { isCollapsed, setIsCollapsed } = useLayoutStore()
  const pathname = usePathname()

  return (
    <div className={`fixed top-0 left-0 h-full ${isCollapsed ? 'w-16' : 'w-64'} bg-[#082525] p-4 flex flex-col transition-all duration-300`}>
      <div className="flex items-center justify-between mb-8">
        <Card className='bg-[#0A2F2F] p-2'>
          <h2 className={`text-white text-xl ${isCollapsed ? 'hidden' : 'block'}`}>
            Tourism
          </h2>
        </Card>
        <button 
          className={`text-white ${isCollapsed ? 'mx-auto' : ''}`}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRightIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
      </div>

      <nav className="space-y-2">
        {navigationItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className={`flex items-center text-white p-2 hover:bg-[#846EDB] rounded-lg transition-colors ${
              pathname === item.path ? 'bg-[#3E615F]' : ''
            }`}
          >
            <item.icon className="h-5 w-5 min-w-5" />
            {!isCollapsed && (
              <span className="ml-3">{item.name}</span>
            )}
          </Link>
        ))}
      </nav>
    </div>
  )
}
