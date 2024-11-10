'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { 
  ListTodo,  
  Eye,
  Lock,
  Calendar,
  Search,
  Filter,
  GraduationCap
} from 'lucide-react';

// Type definitions
type ModuleStatus = 'locked' | 'in-progress' | 'completed';

type Module = {
  id: number;
  title: string;
  status: ModuleStatus;
  progress: number;
};

type Task = {
  id: number;
  moduleId: number;
  title: string;
  deadline: string;
  priority: 'High' | 'Medium' | 'Normal';
  type: string;
  status: 'Locked' | 'Available' | 'In Progress' | 'Completed';
  description: string;
  prerequisites?: number[]; // Module IDs required to unlock this task
};

export function TasksTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Module data
  const modules: Module[] = [
    {
      id: 1,
      title: "Introduction to Hospitality",
      status: 'completed',
      progress: 100
    },
    {
      id: 2,
      title: "Customer Service Excellence",
      status: 'in-progress',
      progress: 60
    },
    {
      id: 3,
      title: "Food Safety & Hygiene",
      status: 'locked',
      progress: 0
    },
    {
      id: 4,
      title: "Hotel Operations",
      status: 'locked',
      progress: 0
    }
  ];

  // Tasks data with module relationships
  const tasks: Task[] = [
    {
      id: 1,
      moduleId: 1,
      title: "Complete Introduction Quiz",
      deadline: "2024-03-15",
      priority: "High",
      type: "Assessment",
      status: "Completed",
      description: "Complete the introductory module assessment",
      prerequisites: []
    },
    {
      id: 2,
      moduleId: 2,
      title: "Customer Service Role-play Exercise",
      deadline: "2024-03-20",
      priority: "High",
      type: "Practical",
      status: "Available",
      description: "Practice customer interaction scenarios",
      prerequisites: [1]
    },
    {
      id: 3,
      moduleId: 2,
      title: "Complaint Handling Simulation",
      deadline: "2024-03-25",
      priority: "Medium",
      type: "Simulation",
      status: "Locked",
      description: "Handle various customer complaint scenarios",
      prerequisites: [1, 2]
    },
    {
      id: 4,
      moduleId: 3,
      title: "Food Safety Certificate",
      deadline: "2024-04-01",
      priority: "High",
      type: "Certification",
      status: "Locked",
      description: "Complete food safety certification exam",
      prerequisites: [1, 2]
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      'Locked': 'bg-gray-100 text-gray-800',
      'Available': 'bg-yellow-100 text-yellow-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      'Completed': 'bg-green-100 text-green-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const isTaskUnlocked = (task: Task): boolean => {
    if (!task.prerequisites?.length) return true;
    return task.prerequisites.every(moduleId => 
      modules.find(m => m.id === moduleId)?.status === 'completed'
    );
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || task.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 p-6">
      {/* Module Progress */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 -mt-9">
        {modules.map((module) => (
          <Card key={module.id} className="transition-all hover:shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-xl ${
                  module.status === 'completed' ? 'bg-green-50' : 
                  module.status === 'in-progress' ? 'bg-blue-50' : 'bg-gray-50'
                }`}>
                  <GraduationCap className={`h-8 w-8 ${
                    module.status === 'completed' ? 'text-green-600' : 
                    module.status === 'in-progress' ? 'text-blue-600' : 'text-gray-400'
                  }`} />
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-900">{module.title}</h3>
                  <div className="mt-2 h-1.5 w-24 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        module.status === 'completed' ? 'bg-green-500' : 
                        module.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                      style={{ width: `${module.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search tasks..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => setFilterStatus('all')}
        >
          <Filter className="h-4 w-4" />
          Clear Filters
        </Button>
      </div>

      {/* Tasks List */}
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Module Tasks</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {filteredTasks.map((task) => {
              const relatedModule = modules.find(m => m.id === task.moduleId);
              const isUnlocked = isTaskUnlocked(task);

              return (
                <div
                  key={task.id}
                  className={`flex items-center justify-between p-6 ${
                    isUnlocked ? 'hover:bg-gray-50' : 'bg-gray-50/50'
                  } transition-colors`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${
                      !isUnlocked ? 'bg-gray-100' :
                      task.status === 'Completed' ? 'bg-green-50' : 'bg-blue-50'
                    }`}>
                      {!isUnlocked ? (
                        <Lock className="h-6 w-6 text-gray-400" />
                      ) : (
                        <ListTodo className={`h-6 w-6 ${
                          task.status === 'Completed' ? 'text-green-600' : 'text-blue-600'
                        }`} />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">
                        {task.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm text-gray-500">
                          {relatedModule?.title}
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="text-sm text-gray-500">{task.type}</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {task.deadline}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                    {isUnlocked && (
                      <Button variant="ghost" size="sm" className="hover:bg-blue-50">
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 