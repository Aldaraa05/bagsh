import { NextResponse } from 'next/server';
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from 'mongodb';
export async function POST(request) {
  try {
    const { title, desc, image, info } = await request.json();

    if ( !title || !desc || !image || !info) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const newInfo = {
      title,
      desc,
      image,
      info,
      createdAt: new Date()
    };

    const result = await db.collection('infos').insertOne(newInfo);

    return NextResponse.json(
      { success: true, insertedId: result.insertedId },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error adding info:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const infos = await db.collection('infos')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(infos);
  } catch (error) {
    console.error('Error fetching infos:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    
    const result = await db.collection('infos').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Info not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error deleting info:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
export async function PUT(request) {
  try {
    const { id, title, desc, image, info } = await request.json(); 

    if (!id || !title || !desc || !image || !info) { 
      return NextResponse.json(
        { error: 'All fields including ID are required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection('infos').updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title,
          desc,
          image,
          info,
          updatedAt: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Info not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error updating info:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}