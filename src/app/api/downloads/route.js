import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {

    const downloads = await prisma.download.findMany({

        orderBy: {
            createdAt: "desc",
        },

    });

    return NextResponse.json({

        success: true,
        downloads,

    });

}

export async function POST(request) {

    try {

        const body = await request.json();

        console.log(body);

        const download = await prisma.download.create({

            data: {

                title: body.title,
                type: body.type,
                size: body.size,
                file: body.file,

            },

        });

        return NextResponse.json({

            success: true,
            download,

        });

    } catch (error) {

        return NextResponse.json({

            success: false,
            message: error.message,

        });

    }

}
