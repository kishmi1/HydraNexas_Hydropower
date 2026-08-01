import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {

    const internships = await prisma.internshipProgram.findMany({

        orderBy: {
            createdAt: "desc",
        },

    });

    return NextResponse.json({

        success: true,
        internships,

    });

}

export async function POST(request) {

    try {

        const body = await request.json();

        const internship = await prisma.internshipProgram.create({

            data: {

                title: body.title,
                duration: body.duration,
                description: body.description,

            },

        });

        return NextResponse.json({

            success: true,
            internship,

        });

    } catch (error) {

        return NextResponse.json({

            success: false,
            message: error.message,

        });

    }

}
