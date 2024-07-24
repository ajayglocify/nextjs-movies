import clientPromise from '../../lib/db';
import { NextResponse } from 'next/server';
import uploadFile from '../../lib/upload';
import { ObjectId } from 'mongodb';

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db('movies');
    const collection = db.collection('movies');
    const formData = await request.formData();


    const query = {
      $or: [
        { title: formData.get('title') }
      ]
    };
    const checkOld = await collection.find(query).toArray();
    if (checkOld.length > 0 ) {
      return new NextResponse(JSON.stringify({ message: 'Movie Title already exists.' }), {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    if (checkOld.length === 0 ) {
      //const path = await uploadFile(formData.get("files"),'uploads');
      const path = 'https://cdn.pixabay.com/photo/2019/04/24/21/55/cinema-4153289_960_720.jpg';
      const result = await collection.insertOne({
        title : formData.get('title'),
        date : formData.get('date'),
        path : path

      });
      return new NextResponse(JSON.stringify({
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (e) {
    console.error(e);
    return new NextResponse(JSON.stringify(
      { message: 'Failed to insert Movie' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}



export async function GET(request) {
  try {
   
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const client = await clientPromise;
    const db = client.db('movies');
    const collection = db.collection('movies');
    let result;

    if (id) {
      
      result = await collection.find({ _id: new ObjectId(id) }).toArray();
      if (result) {
        return NextResponse.json({
          movie: result,
          message: 'success'
        }, {
          status: 200,
        });
      } else {
        return NextResponse.json({
          message: 'Movie not found'
        }, {
          status: 404,
        });
      }
    } else {
      result = await collection.find().toArray();
      return NextResponse.json({
        movies: result,
        message: 'success'
      }, {
        status: result.length > 0 ? 200 : 204,
      });
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({
      message: 'Failed to get Movies'
    }, {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
  