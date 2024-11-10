'use client';

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Video, Plus } from 'lucide-react';
import { ModuleContent } from './ModuleContent';
import { Button } from "@/components/ui/Button";

type Module = {
  title: string;
  stats: {
    label: string;
    count: number;
  }[];
  progress: number;
  icon: React.ElementType;
};

export function ModulesTab() {
  const [selectedModule, setSelectedModule] = useState<number | null>(null);

  const modules: Module[] = [
    {
      title: "Introduction to Hospitality",
      stats: [
        { label: "Videos", count: 8 },
        { label: "Duration", count: 120 } // in minutes
      ],
      progress: 75,
      icon: Video
    },
    {
      title: "Customer Service Excellence",
      stats: [
        { label: "Videos", count: 12 },
        { label: "Duration", count: 180 }
      ],
      progress: 45,
      icon: Video
    },
    {
      title: "Food Safety & Hygiene",
      stats: [
        { label: "Videos", count: 10 },
        { label: "Duration", count: 150 }
      ],
      progress: 30,
      icon: Video
    },
    {
      title: "Restaurant Operations",
      stats: [
        { label: "Videos", count: 15 },
        { label: "Duration", count: 200 }
      ],
      progress: 0,
      icon: Video
    },
    {
      title: "Food & Beverage Service",
      stats: [
        { label: "Videos", count: 8 },
        { label: "Duration", count: 140 }
      ],
      progress: 0,
      icon: Video
    },
    {
      title: "Hotel Management Basics",
      stats: [
        { label: "Videos", count: 10 },
        { label: "Duration", count: 160 }
      ],
      progress: 0,
      icon: Video
    }
  ];

  if (selectedModule !== null) {
    return (
      <ModuleContent 
        moduleId={selectedModule} 
        onBack={() => setSelectedModule(null)} 
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Create Course Button */}
      <div className="flex justify-between items-center px-6 pt-6">
        <h2 className="text-2xl font-semibold">Course Modules</h2>
        <Button 
          className="flex items-center gap-2"
          variant="default"
        >
          <Plus className="h-4 w-4" />
          Create Course
        </Button>
      </div>

      {/* Existing Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        {modules.map((module, index) => (
          <Card 
            key={index}
            className="group relative hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
            onClick={() => setSelectedModule(index)}
          >
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Title */}
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {module.title}
                  </h3>
                  <module.icon className="h-5 w-5 text-blue-500" />
                </div>

                {/* Stats */}
                <div className="space-y-2">
                  {module.stats.map((stat, statIndex) => (
                    <div key={statIndex} className="flex items-center gap-2">
                      <span className="text-gray-600">{stat.label}:</span>
                      <span className="font-medium text-gray-900">
                        {stat.label === 'Duration' ? `${stat.count} mins` : stat.count}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Progress Bar */}
                {module.progress > 0 && (
                  <div className="relative h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="absolute left-0 top-0 h-full bg-blue-500 transition-all duration-300"
                      style={{ width: `${module.progress}%` }}
                    />
                  </div>
                )}

                {/* Arrow Icon */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <ChevronRight className="h-6 w-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 