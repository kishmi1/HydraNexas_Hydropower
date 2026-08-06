import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        console.log("Fetching gallery items...");
        const gallery = await prisma.mediaGallery.findMany({

            orderBy: {
                createdAt: "desc",
            },

        });
        console.log("Gallery items fetched:", gallery.length);

        return NextResponse.json({

            success: true,
            gallery,

        });

    } catch (error) {
        console.error("Error fetching gallery:", error);
        return NextResponse.json({
            success: false,
            message: error.message,
        }, {
            status: 500,
        });
    }

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
