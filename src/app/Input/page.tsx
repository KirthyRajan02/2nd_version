'use client'

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from 'next/navigation';
import { Loader2 } from "lucide-react";

export default function InputPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    month: '',
    country: '',
    batch: '',
    program: '',
    stage: '',
    
    // Participant Data
    activeParticipants: '',
    // overallProgress: '',
    
    // Stage Distribution
    preVisaCount: '',
    visaProcessingCount: '',
    onboardingCount: '',
    acknowledgmentCount: '',
    
    // Progress Metrics
    trainingProgress: '',
    workshopCompletion: '',
    completionRate: '',
    
    // Stage-wise Workshop Data
    // stage1Workshops: '',
    // stage2Workshops: '',
    // stage3Workshops: '',
    // stage4Workshops: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      setShowSuccess(true);
      
      // Reset form and redirect after delay
      setTimeout(() => {
        setShowSuccess(false);
        router.push('/dashboard');
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-emerald-950/50 backdrop-blur">
        <Card className="p-6 bg-emerald-900/90 border-emerald-600/30">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Success!</h2>
            <p className="text-emerald-100">Data has been submitted successfully.</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card className="bg-emerald-900/20 backdrop-blur border-emerald-600/30">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold text-white mb-6">Tourism Program Data</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-emerald-100">Country</label>
                <Select 
                  value={formData.country}
                  onValueChange={(value) => handleInputChange('country', value)}
                >
                  <SelectTrigger className="bg-emerald-950/50 border-emerald-600/30 text-white">
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                  <SelectContent className="bg-emerald-950 border-emerald-600/30">
                    {['UAE', 'USA', 'UK', 'Canada', 'Australia'].map(country => (
                      <SelectItem key={country} value={country} className="text-white hover:bg-emerald-800/50">
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-emerald-100">Batch</label>
                <Select 
                  value={formData.batch}
                  onValueChange={(value) => handleInputChange('batch', value)}
                >
                  <SelectTrigger className="bg-emerald-950/50 border-emerald-600/30 text-white">
                    <SelectValue placeholder="Select Batch" />
                  </SelectTrigger>
                  <SelectContent className="bg-emerald-950 border-emerald-600/30">
                    {['2024-Q1', '2024-Q2', '2024-Q3', '2024-Q4'].map(batch => (
                      <SelectItem key={batch} value={batch} className="text-white hover:bg-emerald-800/50">
                        {batch}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Participant Data */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <label className="text-sm text-emerald-100">Stage Currently In</label>
                <Select onValueChange={(value) => handleInputChange('batch', value)}>
                  <SelectTrigger className="bg-emerald-950/50 border-emerald-600/30 text-white">
                    <SelectValue placeholder="Select Stage" />
                  </SelectTrigger>
                  <SelectContent className="bg-emerald-950 border-emerald-600/30">
                    {['Stage 1', 'Stage 2', 'Stage 3', 'Stage 4'].map(batch => (
                      <SelectItem key={batch} value={batch} className="text-white hover:bg-emerald-800/50">
                        {batch}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-emerald-100">Program Enrolled In</label>
                <Select onValueChange={(value) => handleInputChange('batch', value)}>
                  <SelectTrigger className="bg-emerald-950/50 border-emerald-600/30 text-white">
                    <SelectValue placeholder="Select Program" />
                  </SelectTrigger>
                  <SelectContent className="bg-emerald-950 border-emerald-600/30">
                    {['Program A', 'Program B', 'Program C', 'Program D'].map(batch => (
                      <SelectItem key={batch} value={batch} className="text-white hover:bg-emerald-800/50">
                        {batch}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Month Selection */}
            <div className="space-y-2">
                <label className="text-sm text-emerald-100">Month</label>
                <Select onValueChange={(value) => handleInputChange('batch', value)}>
                  <SelectTrigger className="bg-emerald-950/50 border-emerald-600/30 text-white">
                    <SelectValue placeholder="Select Month" />
                  </SelectTrigger>
                  <SelectContent className="bg-emerald-950 border-emerald-600/30">
                    {['Select Month', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(batch => (
                      <SelectItem key={batch} value={batch} className="text-white hover:bg-emerald-800/50">
                        {batch}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>


            {/* Stage Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-emerald-100">Active Participants</label>
                <Input 
                  type="number"
                  className="bg-emerald-950/50 border-emerald-600/30 text-white"
                  placeholder="Enter the total number of active participants"
                  onChange={(e) => handleInputChange('activeParticipants', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-emerald-100">Visa Processing</label>
                <Input 
                  type="number"
                  className="bg-emerald-950/50 border-emerald-600/30 text-white"
                  placeholder="Enter the number of participants in visa processing"
                  onChange={(e) => handleInputChange('preVisaCount', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-emerald-100">Onboarding</label>
                <Input 
                  type="number"
                  className="bg-emerald-950/50 border-emerald-600/30 text-white"
                  placeholder="Enter the number of participants in onboarding"
                  onChange={(e) => handleInputChange('visaProcessingCount', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-emerald-100">Training in progress</label>
                <Input 
                  type="number"
                  className="bg-emerald-950/50 border-emerald-600/30 text-white"
                  placeholder="Enter the number of participants undergoing training"
                  onChange={(e) => handleInputChange('acknowledgmentCount', e.target.value)}
                />
              </div>
            </div>

            {/* Workshop Data */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((stage) => (
                <div key={stage} className="space-y-2">
                  <label className="text-sm text-emerald-100">Stage {stage} Workshops</label>
                  <Input 
                    type="number"
                    className="bg-emerald-950/50 border-emerald-600/30 text-white"
                    placeholder={`Enter stage ${stage} workshop count`}
                    onChange={(e) => handleInputChange(`stage${stage}Workshops`, e.target.value)}
                  />
                </div>
              ))}
            </div> */}

            {/* Action Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                className="bg-emerald-950/50 border-emerald-600/30 text-white hover:bg-[#846EDB] hover:text-white"
                onClick={() => router.push('/dashboard')}
              >
                Back to Dashboard
              </Button>
              
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-emerald-950/50 border-emerald-700/30 text-white hover:bg-[#846EDB]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Data'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}