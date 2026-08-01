import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {

    try {

        const events = await prisma.event.findMany({

            orderBy: {
                createdAt: "desc",
            },

        });

        return NextResponse.json({

            success: true,
            events,

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

export async function POST(request) {

    try {

        const body = await request.json();

        const event = await prisma.event.create({

            data: {

                title: body.title,
                date: body.date,
                location: body.location,
                image: body.image,
                description: body.description,

            },

        });

        return NextResponse.json({

            success: true,
            event,

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
