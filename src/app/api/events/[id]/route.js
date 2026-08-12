import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request, { params }) {
    try {
        const { id } = await params;

        const event = await prisma.event.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (!event) {
            return NextResponse.json({
                success: false,
                message: "Event not found",
            }, {
                status: 404,
            });
        }

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

export async function PUT(request, { params }) {

    try {

        const { id } = await params;

        const body = await request.json();

        await prisma.event.update({

            where: {
                id: Number(id),
            },

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

export async function DELETE(request, { params }) {

    try {

        const { id } = await params;

        await prisma.event.delete({

            where: {
                id: Number(id),
            },

        });

        return NextResponse.json({

            success: true,

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
