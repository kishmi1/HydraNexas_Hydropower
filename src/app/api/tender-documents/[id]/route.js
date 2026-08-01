import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request, { params }) {

    try {

        const { id } = await params;

        const body = await request.json();

        await prisma.tenderDocument.update({

            where: {
                id: Number(id),
            },

            data: {

                title: body.title,
                type: body.type,
                size: body.size,
                uploadDate: body.uploadDate,
                file: body.file,

            },

        });

        return NextResponse.json({
            success: true,
        });

    } catch (error) {

        return NextResponse.json({

            success: false,
            message: error.message,

        }, {

            status: 500,

        });

    }

}

export async function DELETE(request, { params }) {

    try {

        const { id } = await params;

        await prisma.tenderDocument.delete({

            where: {
                id: Number(id),
            },

        });

        return NextResponse.json({
            success: true,
        });

    } catch (error) {

        return NextResponse.json({

            success: false,
            message: error.message,

        }, {

            status: 500,

        });

    }

}
