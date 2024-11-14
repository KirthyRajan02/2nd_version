import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country');
    const batch = searchParams.get('batch');
    const stage = searchParams.get('stage');
    const program = searchParams.get('program');

    // Connect to MongoDB
    const client = await MongoClient.connect(process.env.MONGODB_URI as string);
    const db = client.db('tourism_dashboard');
    const collection = db.collection('tourismdata');

    // Build query based on filters
    const query: any = {};
    if (country && country !== 'All Countries') query.country = country;
    if (batch && batch !== 'All Batches') query.batch = batch;
    if (stage && stage !== 'All Stages') query.stage = stage;
    if (program && program !== 'All Programs') query.program = program;

    // Fetch and aggregate data
    const data = await collection.find(query).toArray();
    
    // Transform data to match dashboard requirements
    const transformedData = {
      activeParticipants: data.length,
      overallProgress: calculateOverallProgress(data),
      stageDistribution: calculateStageDistribution(data)
    };

    await client.close();
    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
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
  // Implement your status determination logic
  return 'onTrack';
} 