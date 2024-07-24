import clientPromise from '../../lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt'


export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db('movies');
    const collection = db.collection('users');
    
    const body = await request.json();

    // Define the query using the $or operator
    const query = {
      $or: [
        { emails: body.emails }
      ]
    };
    const checkOld = await collection.find(query).toArray();
    if (checkOld.length > 0 ) {
      return new NextResponse(JSON.stringify({ message: 'Duplicate username or Email. Please try changing either email or username.' }), {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    if (checkOld.length === 0 ) {
      body.passwords = body.cpasswords = await bcrypt.hash(body.passwords, 10);
      const result = await collection.insertOne(body);
      return new NextResponse(JSON.stringify(result), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }


  } catch (e) {
    console.error(e);
    return new NextResponse(JSON.stringify(
      { message: 'Failed to insert data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
