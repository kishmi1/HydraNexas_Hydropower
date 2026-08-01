import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {

    const gallery = await prisma.mediaGallery.findMany({

        orderBy: {
            createdAt: "desc",
        },

    });

    return NextResponse.json({

        success: true,
        gallery,

    });

}

export async function POST(request) {

    try {

        const body = await request.json();

        const item = await prisma.mediaGallery.create({

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
            item,

        });

    } catch (error) {

        return NextResponse.json({

            success: false,
            message: error.message,

        });

    }

}
