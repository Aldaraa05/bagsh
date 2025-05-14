import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const teacherId = searchParams.get('teacherId');
        const client = await clientPromise;
        const db = client.db();
        
        const reviews = await db.collection('reviews')
            .find({ teacherId })
            .sort({ createdAt: -1 })
            .toArray();
            
        return NextResponse.json(reviews);
    } catch (error) {
        console.error('Failed to fetch reviews:', error);
        return NextResponse.json(
            { error: 'Failed to fetch reviews' },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const client = await clientPromise;
        const db = client.db();
        const body = await request.json();
        console.log(body)
        // Validate required fields
        if (!body.teacherId || !body.studentId || !body.comment || !body.rating) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Validate rating is between 1-5
        if (body.rating < 1 || body.rating > 5) {
            return NextResponse.json(
                { error: 'Rating must be between 1 and 5' },
                { status: 400 }
            );
        }

        const newReview = {
            teacherId: body.teacherId,
            studentId: body.studentId,
            studentName: body.studentName,
            comment: body.comment,
            rating: body.rating,
            createdAt: new Date(),
            likes: 0
        };

        const result = await db.collection('reviews').insertOne(newReview);

        return NextResponse.json({
            id: result.insertedId,
            ...newReview
        }, { status: 201 });

    } catch (error) {
        console.error('Review submission error:', error);
        return NextResponse.json(
            { error: 'Failed to submit review' },
            { status: 500 }
        );
    }
}


export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('_id');
        
        if (!id) {
            return NextResponse.json(
                { error: 'Review ID is required' },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db();
        
        let result;
        
        try {
            // First try with ObjectId
            result = await db.collection('reviews').deleteOne({ 
                _id: new ObjectId(id) 
            });
        } catch (mongodbError) {
            console.log('ObjectId conversion failed, trying string ID');
            // If ObjectId fails, try with string directly
            result = await db.collection('reviews').deleteOne({ 
                _id: id 
            });
        }

        if (result.deletedCount === 0) {
            return NextResponse.json(
                { error: 'Review not found or already deleted' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: 'Review deleted successfully' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Failed to delete review:', error);
        return NextResponse.json(
            { 
                error: 'Failed to delete review',
                details: error.message
            },
            { status: 500 }
        );
    }
}