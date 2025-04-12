// src/app/api/accounts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { uploadToCloudinary } from '@/lib/cloudinary';


// export async function GET() {
//     try {
//         const accounts = await prisma.account.findMany();
//         return NextResponse.json({
//             status: true,
//             statusCode: 200,
//             result: accounts,
//             message: 'Accounts fetched successfully',
//         });
//     } catch (error) {
//         console.log(error);

//         return NextResponse.json({
//             status: false,
//             statusCode: 500,
//             result: null,
//             message: 'Internal server error',
//         }, { status: 500 });
//     }
// }


export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const skip = (page - 1) * limit;

        const [accounts, total] = await Promise.all([
            prisma.account.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            prisma.account.count(),
        ]);

        return NextResponse.json({
            status: true,
            statusCode: 200,
            result: {
                data: accounts,
                meta: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit),
                },
            },
            message: 'Accounts fetched successfully',
        });
    } catch (error) {
        return NextResponse.json({
            status: false,
            statusCode: 500,
            result: null,
            message: 'Internal server error',
        }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { firstName, lastName, occupation, image } = data;

        if (!firstName || !lastName || !occupation) {
            return NextResponse.json({
                status: false,
                statusCode: 400,
                result: null,
                message: 'Missing required fields',
            }, { status: 400 });
        }

        // Upload image if provided
        let imageUrl = undefined;
        if (image) {
            imageUrl = await uploadToCloudinary(image);
        }

        const newAccount = await prisma.account.create({
            data: { firstName, lastName, occupation, image: imageUrl, },
        });

        return NextResponse.json({
            status: true,
            statusCode: 201,
            result: newAccount,
            message: 'Account created successfully',
        }, { status: 201 });
    } catch (error) {
        console.log(error);

        return NextResponse.json({
            status: false,
            statusCode: 500,
            result: null,
            message: 'Internal server error',
        }, { status: 500 });
    }
}
