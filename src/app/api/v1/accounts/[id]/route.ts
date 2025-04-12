// src/app/api/accounts/[id]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { deleteImageFileFromCloudinary, uploadToCloudinary } from '@/lib/cloudinary';

export async function GET(req: Request, context: { params: { id: string } }) {
    try {
        const { id } = await context.params;

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

export async function PUT(req: Request, context: { params: { id: string } }) {
    try {
        const { id } = await context.params;

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

// export async function PUT(req: NextRequest) {
//     try {
//         const body = await req.json();
//         const { id, firstName, lastName, occupation, image } = body;

//         if (!id) {
//             return NextResponse.json({
//                 status: false,
//                 statusCode: 400,
//                 result: null,
//                 message: 'Account ID is required',
//             }, { status: 400 });
//         }

//         const account = await prisma.account.update({
//             where: { id },
//             data: {
//                 ...(firstName && { firstName }),
//                 ...(lastName && { lastName }),
//                 ...(occupation && { occupation }),
//                 ...(image && { image }),
//             },
//         });

//         return NextResponse.json({
//             status: true,
//             statusCode: 200,
//             result: account,
//             message: 'Account updated successfully',
//         });

//     } catch (error) {
//         return NextResponse.json({
//             status: false,
//             statusCode: 500,
//             result: null,
//             message: 'Internal server error',
//         }, { status: 500 });
//     }
// }


export async function DELETE(req: Request, context: { params: { id: string } }) {
    try {
        const { id } = await context.params;

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
