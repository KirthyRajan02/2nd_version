import { NextResponse } from 'next/server';
// import { MongoClient } from 'mongodb';
import { dbConnect , } from '@/lib/db';



console.log( dbConnect('tourism_dashboard', 'tourismdata'));
const collection = await dbConnect('tourism_dashboard', 'tourismdata')
console.log("collection");

// const client = new MongoClient(process.env.MONGODB_URI, options);
// console.log("client");
// console.log(client.connect());
// await client.connect();
// console.log('Connected to MongoDB');

// Initialize connection
// try {
//   // await client.connect();
//   console.log('Connected to MongoDB');
// } catch (error) {
//   console.error('Error connecting to MongoDB in dashboard route:', error);
// }

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country');
    const batch = searchParams.get('batch');
    const stage = searchParams.get('stage');
    const program = searchParams.get('program');

    // const db = client.db('tourism_dashboard');
    // const collection = db.collection('tourismdata');

    // Fetch all data first for total count
    const allData = await collection.find({}).toArray();

    // Build query based on filters
    const query: any = {};
    if (country && country !== 'All Countries') query.country = country;
    if (batch && batch !== 'All Batches') query.batch = batch;
    if (stage && stage !== 'All Stages') query.stage = stage;
    if (program && program !== 'All Programs') query.program = program;

    // Fetch and process filtered data
    const filteredData = await collection.find(query).toArray();
    
    const processedData = filteredData.map((item: Record<string, any>) => ({
      basicInfo: {
        country: item.country,
        batch: item.batch,
        stage: item.stage,
        programs: item.programs,
        status: item.status,
        month: item.month
      },
      metrics: {
        completion: item.completion,
        participants: item.participants,
        progress: item.progress,
        totalProgress: item.totalProgress
      },
      stages: {
        stage1: item.stage1,
        stage2: item.stage2,
        stage3: item.stage3,
        stage4: item.stage4
      },
      activities: {
        training: item.training,
        workshops: item.workshops
      }
    }));

    const transformedData = {
      activeParticipants: filteredData.length,
      totalParticipants: allData.length,
      overallProgress: calculateOverallProgress(filteredData),
      stageDistribution: calculateStageDistribution(allData),
      filteredData: processedData
    };

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Dashboard error:', error);
    // Return a more detailed error response
    return NextResponse.json({ 
      error: 'Failed to fetch dashboard data',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { 
      status: 500 
    });
  }
}

function calculateOverallProgress(data: any[]) {
  // Implement your progress calculation logic
  return data.reduce((acc, curr) => acc + (curr.progress || 0), 0) / data.length;
}

function calculateStageDistribution(data: any[]) {
  // Implement your stage distribution logic
  const stages = ['Pre-Visa', 'Visa Processing', 'Onboarding', 'Acknowledgment', 'Training'];
  return stages.map(stage => ({
    name: stage,
    value: data.filter(item => item.stage === stage).length,
    status: determineStatus(stage, data)
  }));
}

function determineStatus(stage: string, data: any[]) {
  const stageData = data.filter(item => item.stage === stage);
  
  if (stageData.length === 0) return 'onTrack';
  
  // Count occurrences of each status
  const statusCounts = stageData.reduce((acc: Record<string, number>, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {});

  // If any critical cases exist, return critical
  if (statusCounts['critical'] > 0) return 'critical';
  
  // If delayed cases are more than 30% of total, return delayed
  const delayedPercentage = (statusCounts['delayed'] || 0) / stageData.length;
  if (delayedPercentage > 0.3) return 'delayed';
  
  // If there are any in progress cases, return onprogress
  if (statusCounts['onprogress'] > 0) return 'onprogress';
  
  // Default to onTrack
  return 'onTrack';
} 