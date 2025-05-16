export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const body = await request.json();

    if (!body.title || !body.description || !body.gmail || !body.image) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newInfo = {
      title: body.title,
      description: body.description,
      gmail: body.gmail,
      image: body.image,
      createdAt: new Date(),
    };

    const result = await db.collection("infos").insertOne(newInfo);

    const responseData = {
      id: result.insertedId.toString(),
      title: newInfo.title,
      description: newInfo.description,
      gmail: newInfo.gmail,
      image: newInfo.image,
      createdAt: newUser.createdAt,
    };

    return NextResponse.json(responseData, { status: 201 });
  } catch (error) {
    console.error("Info post:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const infos = await db.collection("infos").find({}).toArray();
    return new Response(JSON.stringify(infos), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Failed to fetch users" }), {
      status: 500,
    });
  }
}
