import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    // Fetch only users with teacher role
    const teachers = await db.collection('users').find({ 
      role: 'teacher',
      'info.id': { $exists: true } 
    }).toArray();

    return NextResponse.json(teachers);
  } catch (e) {
    console.error('Failed to fetch teachers', e);
    return NextResponse.json(
      { error: 'Failed to fetch teachers' },
      { status: 500 }
    );
  }
}