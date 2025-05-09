import clientPromise from "@/app/lib/mongodb";
import { serialize } from 'cookie';
import { NextResponse } from 'next/server';

export async function GET( Request) {
    try{
      const client = await clientPromise;
      const db = client.db();
      const users = await db.collection('users').find({}).toArray();
      return new Response(JSON.stringify(users), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch(e){
      return new Response(JSON.stringify({error: 'Failed to fetch users'}), {
        status : 500,
      })
    }     
  } 
  
  export async function POST(request) {
    try {
      const client = await clientPromise;
      const db = client.db();
      const body = await request.json();
  
      if (!body.name || !body.surname || !body.gmail || !body.password) {
        return NextResponse.json(
          { error: 'Missing required fields' },
          { status: 400 }
        );
      }
  
      const existingUser = await db.collection('users').findOne({ gmail: body.gmail });
      if (existingUser) {
        return NextResponse.json(
          { error: 'User already exists' },
          { status: 409 }
        );
      }
  
      const newUser = {
        name: body.name,
        surname: body.surname,
        gmail: body.gmail,
        number: body.number || null,
        password: body.password, // Note: Hash this in production!
        createdAt: new Date(),
        role: body.role || 'student',
      };
  
      const result = await db.collection('users').insertOne(newUser);
      
      // Create session immediately after signup
      const sessionToken = newUser.gmail; // Simplified - use JWT in production
      
      const cookie = serialize('sessionToken', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });
  
      const responseData = {
        id: result.insertedId.toString(),
        ...newUser,
        password: undefined // Don't send password back
      };
  
      return NextResponse.json(responseData, {
        status: 201,
        headers: { 'Set-Cookie': cookie }
      });
  
    } catch (error) {
      console.error('Signup error:', error);
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      );
    }
  }
  