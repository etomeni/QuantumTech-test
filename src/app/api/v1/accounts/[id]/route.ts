// src/app/api/accounts/[id]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { deleteImageFileFromCloudinary, uploadToCloudinary } from '@/lib/cloudinary';

export async function GET(request: Request) {
    try {
        const url = new URL(request.url)
        const pathSegments = url.pathname.split('/')
        const id = pathSegments[pathSegments.length - 1]

        // Or you can use regex to extract the ID more cleanly if needed.


        const account = await prisma.account.findUnique({
            where: { id: id },
        });

        if (!account) {
            return NextResponse.json({
                status: false,
                statusCode: 404,
                result: null,
                message: 'Account not found',
            }, { status: 404 });
        }

        return NextResponse.json({
            status: true,
            statusCode: 200,
            result: account,
            message: 'Account fetched successfully',
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


export async function PUT(req: Request) {
    try {
        const url = new URL(req.url)
        const id = url.pathname.split('/').pop() // Gets the [id] from the URL

        const data = await req.json();
        // const { firstName, lastName, occupation } = data;
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

        const updated = await prisma.account.update({
            where: { id: id },
            data: { 
                firstName, lastName, occupation, 
                ...(imageUrl && { image: imageUrl }),
            },
        });

        return NextResponse.json({
            status: true,
            statusCode: 200,
            result: updated,
            message: 'Account updated successfully',
        });
    } catch (error: any) {
        if (error.code === 'P2025') {
            return NextResponse.json({
                status: false,
                statusCode: 404,
                result: null,
                message: 'Account not found',
            }, { status: 404 });
        }

        return NextResponse.json({
            status: false,
            statusCode: 500,
            result: null,
            message: 'Internal server error',
        }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const url = new URL(req.url)
        const id = url.pathname.split('/').pop() // Gets the [id] from the URL

        // Fetch the account from the database
        const account = await prisma.account.findUnique({
            where: { id },
        });

        if (!account) {
            return NextResponse.json({
                status: false,
                statusCode: 404,
                result: null,
                message: 'Account not found',
            }, { status: 404 });
        }

        // If account has an image, delete it from Cloudinary
        if (account.image) {
            // Delete image from Cloudinary
            const deleteResult = await deleteImageFileFromCloudinary(account.image);

            if (!deleteResult) {
                return NextResponse.json({
                    status: false,
                    statusCode: 500,
                    result: null,
                    message: 'Failed to delete blog post.',
                });
            }
        }

        // Now delete the account from the database
        await prisma.account.delete({
            where: { id: id },
        });

        return NextResponse.json({
            status: true,
            statusCode: 200,
            result: null,
            message: 'Account deleted successfully',
        });
    } catch (error: any) {
        if (error.code === 'P2025') {
            return NextResponse.json({
                status: false,
                statusCode: 404,
                result: null,
                message: 'Account not found',
            }, { status: 404 });
        }

        return NextResponse.json({
            status: false,
            statusCode: 500,
            result: null,
            message: 'Internal server error',
        }, { status: 500 });
    }
}
