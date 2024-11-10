'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { 
  PlayCircle, 
  CheckCircle, 
  Lock,
  ChevronLeft,
  Clock,
  Video,
  Upload
} from 'lucide-react';

type VideoLesson = {
  id: number;
  title: string;
  duration: number;
  status: 'completed' | 'in-progress' | 'locked';
  description: string;
  videoUrl?: string;
};

type Assignment = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  instructions: string[];
};

interface ModuleContentProps {
  moduleId: number;
  onBack: () => void;
}

export function ModuleContent({ onBack }: ModuleContentProps) {
  const [selectedLesson, setSelectedLesson] = useState<VideoLesson | null>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

  // const assignment: Assignment = {
  //   id: 1,
  //   title: "Module 1 Assignment",
  //   description: "Complete the following tasks related to hospitality fundamentals",
  //   dueDate: "2024-03-20",
  //   status: 'pending',
  //   instructions: [
  //     "Write a 500-word essay on the importance of customer service in hospitality",
  //     "Create a presentation on different sectors of the hospitality industry",
  //     "Complete the customer interaction simulation exercise",
  //     "Submit your reflection on the learning outcomes of this module"
  //   ]
  // };

  const lessons: VideoLesson[] = [
    {
      id: 1,
      title: "Welcome to Hospitality Industry",
      duration: 15,
      status: 'completed',
      description: "An overview of the hospitality industry and its various sectors.",
      videoUrl: "https://example.com/video1.mp4"
    },
    {
      id: 2,
      title: "Understanding Guest Service",
      duration: 20,
      status: 'completed',
      description: "Learn about the importance of guest service and key principles.",
      videoUrl: "https://example.com/video2.mp4"
    },
    {
      id: 3,
      title: "Professional Standards",
      duration: 25,
      status: 'in-progress',
      description: "Essential professional standards in hospitality.",
      videoUrl: "https://example.com/video3.mp4"
    },
    {
      id: 4,
      title: "Communication Skills",
      duration: 30,
      status: 'locked',
      description: "Effective communication techniques for hospitality professionals."
    },
    {
      id: 5,
      title: "Industry Trends",
      duration: 30,
      status: 'locked',
      description: "Current trends and future outlook in hospitality."
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <PlayCircle className="h-5 w-5 text-blue-500" />;
      default:
        return <Lock className="h-5 w-5 text-gray-400" />;
    }
  };

  const handleLessonClick = (lesson: VideoLesson) => {
    if (lesson.status !== 'locked') {
      setSelectedLesson(lesson);
      setSelectedAssignment(null);
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between -mt-9">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Modules
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side - Video or Assignment Card */}
        <Card className="h-[400px]">
          {selectedLesson && (
            <CardContent className="flex items-center justify-center bg-gray-50 p-6 w-full h-full">
              <div className="w-full aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                {selectedLesson.videoUrl ? (
                  <video 
                    className="w-full h-full rounded-lg"
                    controls
                    src={selectedLesson.videoUrl}
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="text-center text-gray-500">
                    <Video className="h-12 w-12 mx-auto mb-2" />
                    <p>Video player placeholder</p>
                  </div>
                )}
              </div>
            </CardContent>
          )}
          {selectedAssignment && (
            <div className="h-full flex flex-col">
              <CardHeader className="border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{selectedAssignment.title}</CardTitle>
                    <p className="text-sm text-gray-600 mt-2">Due: {selectedAssignment.dueDate}</p>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                    {selectedAssignment.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  <p className="text-gray-600">{selectedAssignment.description}</p>
                  <div className="space-y-4">
                    <h4 className="font-medium">Instructions:</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      {selectedAssignment.instructions.map((instruction, index) => (
                        <li key={index} className="text-gray-600">{instruction}</li>
                      ))}
                    </ul>
                  </div>
                  <Button className="w-full flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Submit Assignment
                  </Button>
                </div>
              </CardContent>
            </div>
          )}
          {!selectedLesson && !selectedAssignment && (
            <div className="h-full flex items-center justify-center text-gray-500">
              <div className="text-center">
                <Video className="h-12 w-12 mx-auto mb-2" />
                <p>Select a lesson or assignment to start</p>
              </div>
            </div>
          )}
        </Card>

        {/* Content List */}
        <Card className="h-[400px]">
          <CardHeader className="border-b sticky top-0 bg-white z-10">
            <CardTitle>Introduction to Hospitality</CardTitle>
          </CardHeader>
          <CardContent className="p-0 h-[calc(100%-5rem)] overflow-y-auto">
            <div className="divide-y">
              {lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className={`p-6 flex items-center gap-4 hover:bg-gray-50 transition-colors ${
                    lesson.status === 'locked' ? 'opacity-50' : 'cursor-pointer'
                  } ${selectedLesson?.id === lesson.id ? 'bg-blue-50' : ''}`}
                  onClick={() => handleLessonClick(lesson)}
                >
                  <div className="flex-shrink-0">
                    {getStatusIcon(lesson.status)}
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium text-gray-900 mb-1">
                      {lesson.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {lesson.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{lesson.duration} mins</span>
                  </div>
                </div>
              ))}
              
              {/* Assignment Section */}
              {/* <div
                className={`p-6 flex items-center gap-4 hover:bg-gray-50 transition-colors cursor-pointer
                  ${selectedAssignment ? 'bg-blue-50' : ''}`}
                onClick={handleAssignmentClick}
              >
                <div className="flex-shrink-0">
                  <FileText className="h-5 w-5 text-orange-500" />
                </div>
                <div className="flex-grow">
                  <h4 className="font-medium text-gray-900 mb-1">
                    Module Assignment
                  </h4>
                  <p className="text-sm text-gray-600">
                    Complete the module assessment to test your understanding
                  </p>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>Due Mar 20</span>
                </div>
              </div> */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
