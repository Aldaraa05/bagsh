import clientPromise from '@/app/lib/mongodb';
import { ObjectId } from 'mongodb'; 
import { headers } from 'next/headers';

export async function GET(request, { params }) {
  try {
    const userId = params.id;

    if (!userId) {
      return new Response(JSON.stringify({error: "User ID is required" }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    let objectId;
    try {
      objectId = new ObjectId(userId);
    } catch (e) {
      return new Response(JSON.stringify({ error: 'Invalid user ID format' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    const client = await clientPromise;
    const db = client.db();
    
    const user = await db.collection('users').findOne({ _id: objectId });

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    if (user.balance === undefined) {
      await db.collection('users').updateOne(
        { _id: objectId },
        { $set: { balance: 0 } }
      );
      return new Response(JSON.stringify({ balance: 0 }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    return new Response(JSON.stringify({ balance: user.balance }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (e) {
    console.error('Balance error:', e);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}