import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from 'mongodb';

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return new Response(
        JSON.stringify({ error: "Teacher ID is required" }),
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const teacher = await db.collection('users').findOne(
      { 
        _id: new ObjectId(id),
        role: 'teacher' 
      },
      { projection: { password: 0 } }
    );

    if (!teacher) {
      return new Response(
        JSON.stringify({ error: "Teacher not found" }),
        { status: 404 }
      );
    }

    const responseData = {
      ...teacher,
      _id: teacher._id.toString()
    };

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({ error: "Failed to fetch teacher info" }),
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();

    if (!body.field || body.value === undefined) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    let updateOperation;
    const arrayFields = ['experience', 'certificates', 'achievements', 'schedule'];
    
    if (arrayFields.includes(body.field)) {
      if (body.action === 'remove') {
        updateOperation = {
          $pull: { [`info.${body.field}`]: body.value }
        };
      } else {
        updateOperation = {
          $addToSet: { [`info.${body.field}`]: body.value }
        };
      }
    } else {
      updateOperation = {
        $set: { [`info.${body.field}`]: body.value }
      };
    }

    const result = await db.collection('users').updateOne(
      { 
        _id: new ObjectId(id),
        role: 'teacher' 
      },
      updateOperation
    );

    if (result.modifiedCount === 0) {
      return new Response(
        JSON.stringify({ error: "No document found or no changes made" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({ error: "Алдаа гарлаа" }),
      { status: 500 }
    );
  }
}