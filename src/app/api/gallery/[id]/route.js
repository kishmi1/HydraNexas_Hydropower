import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request, { params }) {

    const { id } = await params;

    const body = await request.json();

    await prisma.mediaGallery.update({

        where: {
            id: Number(id),
        },

        data: {

            title: body.title,
            category: body.category,
            type: body.type,

            image: body.image,
            video: body.video,

            description: body.description,

        },

    });

    return NextResponse.json({

        success: true,

    });

}

export async function DELETE(request, { params }) {

    const { id } = await params;

    await prisma.mediaGallery.delete({

        where: {
            id: Number(id),
        },

    });

    return NextResponse.json({

        success: true,

    });

}
