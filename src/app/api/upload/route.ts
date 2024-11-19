import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import { dbConnect ,disconnect} from '@/lib/db';

interface UploadData {
  month: string;
  country: string;
  stage: string;
  [key: string]: string | number // for dynamic fields that can be strings or numbers
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      console.error('No file received');
      return NextResponse.json({ error: 'No file received' }, { status: 400 });
    }

    // Read Excel file
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet) as UploadData[];

    console.log('Parsed Excel data:', jsonData); // Debug log

    if (!process.env.MONGODB_URI) {
      console.error('MONGODB_URI is not defined');
      return NextResponse.json({ error: 'Database configuration error' }, { status: 500 });
    }

    try {
      const collection = await dbConnect('tourism_dashboard', 'tourismdata');
      console.log('Connected to MongoDB'); // Debug log

      // const db = client.db('tourism_dashboard');
      // const collection = db.collection('tourismdata');

      if (jsonData.length > 0) {
        // Create operations array for bulkWrite
        const operations = jsonData.map((doc: UploadData) => ({
          updateOne: {
            filter: {
              month: doc.month,
              country: doc.country,
              stage: doc.stage
            },
            update: { $set: doc },
            upsert: true // Insert if doesn't exist, update if exists
          }
        }));

        const result = await collection.bulkWrite(operations);
        
        return NextResponse.json({ 
          success: true, 
          message: `Processed ${result.upsertedCount} new and ${result.modifiedCount} existing documents`
        });
      } else {
        console.error('No data to insert');
        return NextResponse.json({ error: 'No data to insert' }, { status: 400 });
      }

    } catch (error) {
      console.error('Upload error:', error);
      return NextResponse.json({ 
        error: 'Upload failed', 
        details: error instanceof Error ? error.message : 'Unknown error'
      }, { status: 500 });
    } finally {
      await disconnect();
    }

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      error: 'Upload failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 