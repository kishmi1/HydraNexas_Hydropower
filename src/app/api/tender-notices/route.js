import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const notices = await prisma.tenderNotice.findMany({

            orderBy: {
                createdAt: "desc",
            },

        });

        return NextResponse.json({

            success: true,
            notices,

        });
    } catch (error) {
        console.error("Error fetching tender notices:", error);
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

        const notice = await prisma.tenderNotice.create({

            data: {

                title: body.title,
                publishDate: body.publishDate,
                location: body.location,
                description: body.description,

            },

        });

        return NextResponse.json({

            success: true,
            notice,

        });

    } catch (error) {

        return NextResponse.json({

            success: false,
            message: error.message,

        });

    }

}
