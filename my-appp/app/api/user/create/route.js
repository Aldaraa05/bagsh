import clientPromise from '@/app/lib/mongodb';

export async function POST(request) {
  try {
    const { userId, items, totalPrice, status } = await request.json();

    if (!userId || !items || !items.length || !totalPrice) {
      return new Response(JSON.stringify({ error: 'Invalid request data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const client = await clientPromise;
    const db = client.db();

    const newOrder = {
      userId,
      items,
      totalPrice,
      status: status || 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection('orders').insertOne(newOrder);

    return new Response(
      JSON.stringify({ 
        success: true, 
        orderId: result.insertedId 
      }), 
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Failed to create order' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}