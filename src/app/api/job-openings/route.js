import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {

    const jobs = await prisma.jobOpening.findMany({

        orderBy: {
            createdAt: "desc",
        },

    });

    return NextResponse.json({

        success: true,
        jobs,

    });

}

export async function POST(request) {

    try {

        const body = await request.json();

        const job = await prisma.jobOpening.create({

            data: {

                position: body.position,
                department: body.department,
                location: body.location,
                type: body.type,
                deadline: body.deadline,

            },

        });

        return NextResponse.json({

            success: true,
            job,

        });

    } catch (error) {

        return NextResponse.json({

            success: false,
            message: error.message,

        });

    }

}
