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
      { message: 'Failed to insert Movie' ,error: e }), {
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
    let paged;
    paged = searchParams.get('page');
    if(!paged){paged = 1;}
    let per_page; 
    per_page = searchParams.get('per_page');
    if(!per_page){per_page = 2;}
    const client = await clientPromise;
    const db = client.db('movies');
    const collection = db.collection('movies');
    let result;
    if (id) {
      try {
        const result = await collection.find({ _id: new ObjectId(id) }).toArray();
        return NextResponse.json({
          movies: result,
          message: result.length > 0 ? 'success' : 'Movie not found'
        }, {
          status: result.length > 0 ? 200 : 201,
        });
      } catch (error) {
        return NextResponse.json({
          message: 'Internal Server Error',
        }, {
          status: 500,
        });
      }  
    } else {
      result = await collection.find().skip((Number(paged) - 1) * Number(per_page)).limit(Number(per_page)).toArray();
      let allResultsCount = await collection.find().toArray();
      console.log(result,'sss');
      return NextResponse.json({
        movies: result,
        message: 'success',
        counts : allResultsCount.length
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




export async function PUT(request) {
  try {
    const client = await clientPromise;
    const db = client.db('movies');
    const collection = db.collection('movies');
    const formData = await request.formData();
    const query = {_id: new ObjectId(formData.get('_id'))};
    const checkOld = await collection.find(query).toArray();
    let path;
    if(formData.get('files')){
      //path = await uploadFile(formData.get("files"),'uploads');
      path = 'https://cdn.pixabay.com/photo/2019/04/24/21/55/cinema-4153289_960_720.jpg';
    }else{
      //path = await uploadFile(formData.get("files"),'uploads');
      path = 'https://cdn.pixabay.com/photo/2019/04/24/21/55/cinema-4153289_960_720.jpg';
    }

    if (checkOld.length > 0 ) {
      const Update = await collection.updateOne(
        query,
        { $set: { "title": formData.get('title'),"date":formData.get('date'),"path":path} }
      );
      console.log(Update,'UpdateUpdateUpdateUpdate');
      if (Update.matchedCount === 0) {
          return new NextResponse(JSON.stringify(
            { message: 'No Record Found' ,error: e }), {
            status: 404,
            headers: {
              'Content-Type': 'application/json',
            },
          });
      } else if (Update.modifiedCount === 0) {
          return NextResponse.json({
            message: 'No changes made to records!'
          }, {
            status: 200
          });
      } else {
        return NextResponse.json({
          message: 'Movie Updated Successfully!'
        }, {
          status: 200
        });
      }
    }else{
      return new NextResponse(JSON.stringify(
        { message: 'No Record Found' ,error: e }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (e) {
    console.error(e);
    return new NextResponse(JSON.stringify(
      { message: 'Failed to Update Movie' ,error: e }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}