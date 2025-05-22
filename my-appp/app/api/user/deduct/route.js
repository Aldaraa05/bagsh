import clientPromise from '@/app/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(request) {
  try {
    const { userId, amount } = await request.json();

    if (!userId || !amount || isNaN(amount)) {
      return new Response(JSON.stringify({ error: 'Invalid request data' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    const numericAmount = Number(amount);
    if (numericAmount <= 0) {
      return new Response(JSON.stringify({ error: 'Amount must be positive' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    const client = await clientPromise;
    const db = client.db();

    // Convert userId to ObjectId
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

    const user = await db.collection('users').findOne({ _id: objectId });
    
    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    const currentBalance = user.balance || 0;
    if (currentBalance < numericAmount) {
      return new Response(JSON.stringify({ error: 'Insufficient balance' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    await db.collection('users').updateOne(
      { _id: objectId },
      { $inc: { balance: -numericAmount } }
    );

    const updatedUser = await db.collection('users').findOne({ _id: objectId });

    return new Response(JSON.stringify({ 
      success: true,
      newBalance: updatedUser.balance
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (e) {
    console.error('Deduct error:', e);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}