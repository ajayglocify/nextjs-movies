import clientPromise from '../../lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db('movies');
    const collection = db.collection('users');
    const body = await request.json();
    const jwtSecretKey = process.env.DIY_JWT_SECRET;
    const result = await collection.findOne({emails:body.emails});
    if(result){
      const isMatch = await bcrypt.compare(body.passwords, result.passwords);
      if (isMatch) {

        let jsonData = {
          signInTime: Date.now(),
          emails:result.emails
        }
        const token = jwt.sign(jsonData, jwtSecretKey);

        return new NextResponse(JSON.stringify({"message":"Login Successful!","token":token}), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else {
        return new NextResponse(JSON.stringify({"message":"Invalid Credentials!"}), {
          status: 401, // 401 is a more appropriate status code for invalid credentials
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
    }else{
      return new NextResponse(JSON.stringify({"message":"Invalid Credentials!"}), {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (e) {
    console.error(e);
    return new NextResponse(JSON.stringify(
      { error: 'Failed to insert data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
