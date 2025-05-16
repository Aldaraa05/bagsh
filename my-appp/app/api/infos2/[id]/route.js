import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const info = await db
      .collection("infos")
      .findOne({ _id: new ObjectId(id) });

    if (!info) {
      return NextResponse.json({ error: "Info not found" }, { status: 404 });
    }

    return NextResponse.json(info);
  } catch (error) {
    console.error("Error fetching info by ID:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
