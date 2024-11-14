'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { BookOpen, Video, FileText, Download, ExternalLink, Clock, Lock, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function ResourcesTab() {
  const resources: Array<{
    title: string;
    type: string;
    format: string;
    duration: string;
    status: 'Completed' | 'In Progress' | 'Not Started' | 'Locked';
    icon: React.ComponentType;
  }> = [
      { title: "Front Office Operations Manual", type: "Document", format: "PDF", duration: "2 hours", status: "Completed", icon: FileText },
      { title: "Guest Service Excellence", type: "Video", format: "MP4", duration: "45 mins", status: "In Progress", icon: Video },
      { title: "Hotel Management System Guide", type: "Document", format: "PDF", duration: "1.5 hours", status: "Not Started", icon: FileText },
      { title: "Communication Skills Workshop", type: "Interactive", format: "HTML", duration: "1 hour", status: "Locked", icon: Lock },
      { title: "Customer Service Handbook", type: "Document", format: "PDF", duration: "3 hours", status: "Not Started", icon: FileText },
      { title: "Reservation System Training", type: "Video", format: "MP4", duration: "1.5 hours", status: "Locked", icon: Video },
      { title: "Emergency Procedures Guide", type: "Document", format: "PDF", duration: "1 hour", status: "Completed", icon: FileText },
      { title: "Housekeeping Standards", type: "Document", format: "PDF", duration: "2.5 hours", status: "In Progress", icon: FileText },
      { title: "Food Safety Guidelines", type: "Document", format: "PDF", duration: "2 hours", status: "Not Started", icon: FileText },
      { title: "Security Protocols", type: "Document", format: "PDF", duration: "1.5 hours", status: "Not Started", icon: FileText },
      { title: "Property Management System", type: "Document", format: "PDF", duration: "3 hours", status: "Locked", icon: FileText },
      { title: "Guest Complaint Resolution", type: "Document", format: "PDF", duration: "1 hour", status: "Not Started", icon: FileText }
    ];

  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterType, setFilterType] = React.useState('all');

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || resource.type.toLowerCase() === filterType;
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status: 'Completed' | 'In Progress' | 'Not Started' | 'Locked') => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-700';
      case 'In Progress': return 'bg-blue-100 text-blue-700';
      case 'Not Started': return 'bg-gray-100 text-gray-700';
      case 'Locked': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-9">
        {/* Category Cards */}
        {['Documents', 'Videos', 'Interactive'].map((category, idx) => (
          <Card key={category} className="transition-all hover:shadow-lg border border-gray-200 rounded-xl">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`p-4 rounded-xl bg-opacity-20 ${['bg-blue-100', 'bg-purple-100', 'bg-green-100'][idx]}`}>
                {idx === 0 ? <FileText className="h-8 w-8 text-blue-600" /> : idx === 1 ? <Video className="h-8 w-8 text-purple-600" /> : <BookOpen className="h-8 w-8 text-green-600" />}
              </div>
              <div>
                <p className={`text-3xl font-bold ${['text-blue-600', 'text-purple-600', 'text-green-600'][idx]}`}>{
                  idx === 0 ? '12' : idx === 1 ? '8' : '5'}</p>
                <p className="text-sm font-medium text-gray-600">{category}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input placeholder="Search resources..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px] border-gray-300 rounded-lg">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="document">Documents</SelectItem>
            <SelectItem value="video">Videos</SelectItem>
            <SelectItem value="interactive">Interactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Resources List */}
      <Card className="border-gray-200 rounded-lg">
        <CardHeader className="border-b border-gray-200 p-4">
          <CardTitle className="text-lg font-semibold">Learning Resources</CardTitle>
        </CardHeader>
        <CardContent className="overflow-y-auto max-h-[600px] p-4">
          <div className="space-y-4">
            {filteredResources.map((resource, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-all hover:shadow-md">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${resource.status === 'Locked' ? 'bg-gray-100' : 'bg-blue-50'}`}>
                    {React.cloneElement(<resource.icon />, { className: `h-6 w-6 ${resource.status === 'Locked' ? 'text-gray-400' : 'text-blue-600'}` })}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">{resource.title}</h4>
                    <div className="flex items-center gap-2 text-gray-500">
                      <span>{resource.type}</span>
                      <span className="text-gray-300">•</span>
                      <span>{resource.format}</span>
                      <span className="text-gray-300">•</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{resource.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(resource.status)}`}>
                    {resource.status}
                  </span>
                  {resource.status !== 'Locked' && (
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="hover:bg-blue-100">
                        <ExternalLink className="h-4 w-4 text-blue-600" />
                      </Button>
                      <Button variant="ghost" size="sm" className="hover:bg-blue-100">
                        <Download className="h-4 w-4 text-blue-600" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
