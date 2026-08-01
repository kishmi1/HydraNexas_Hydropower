import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {

    const governances = await prisma.governance.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    return NextResponse.json({
        success: true,
        governances,
    });

}

export async function POST(request) {

    try {

        const body = await request.json();

        const governance = await prisma.governance.create({

            data: {

                title: body.title,
                description: body.description,

            },

        });

        return NextResponse.json({

            success: true,
            governance,

        });

    } catch (error) {

        return NextResponse.json({

            success: false,
            message: error.message,

        });

    }

}
