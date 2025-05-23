import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
      const client = await clientPromise;
      const db = client.db();
      const body = await req.json();
      const { gmail, password } = body;
      console.log(body)
      console.log('Received login request:', { gmail, password }); 

      if (!gmail || !password) {
        return NextResponse.json(
          { error: "Email and password are required" },
          { status: 400 }
        );
      }

    const user = await db.collection('users').findOne({ 
      gmail: { $regex: new RegExp(`^${gmail.trim()}$`, 'i') } 
    });

    console.log('Found user in DB:', user); 

    if (!user) {
      return NextResponse.json(
        { error: "User not found" }, 
        { status: 401 }
      );
    }

    console.log('Comparing passwords:', {
      inputPassword: password,
      storedPassword: user.password
    }); 

    if (user.password !== password.trim()) {
      return NextResponse.json(
        { error: "Password incorrect" }, 
        { status: 401 }
      );
    }

    const { password: _, ...userData } = user;

    return NextResponse.json({
      message: "Login successful",
      user: userData
    }, { status: 200 });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}