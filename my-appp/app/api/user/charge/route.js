import clientPromise from "@/app/lib/mongodb";
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

    const objectId = new ObjectId(userId);

    const user = await db.collection('users').findOne({ _id: objectId });
    
    if (!user) {
      console.log('User not found with ID:', userId); // Debug log
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
    }

    const result = await db.collection('users').updateOne(
      { _id: objectId },
      { $inc: { balance: numericAmount } }
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
    console.error('Charge error:', e);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}