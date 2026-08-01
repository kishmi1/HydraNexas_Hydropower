import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {

    const documents = await prisma.tenderDocument.findMany({

        orderBy: {
            createdAt: "desc",
        },

    });

    return NextResponse.json({

        success: true,
        documents,

    });

}

export async function POST(request) {

    try {

        const body = await request.json();

        const document = await prisma.tenderDocument.create({

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
            document,

        });

    } catch (error) {

        return NextResponse.json({

            success: false,
            message: error.message,

        });

    }

}
