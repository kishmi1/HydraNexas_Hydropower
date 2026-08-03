import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET(request, { params }) {
    try {
        const { id } = await params;

        const project = await prisma.project.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (!project) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Project not found",
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json({
            success: true,
            project,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            {
                status: 500,
            }
        );
    }
}

export async function PUT(request, { params }) {

    try {

        const { id } = await params;

        const body = await request.json();

        const project = await prisma.project.update({

            where: {

                id: Number(id),

            },

            data: {

                name: body.name,
                slug: body.slug,

                location: body.location,
                capacity: body.capacity,

                status: body.status,
                year: body.year,

                image: body.image,

                description: body.description,
                details: body.details,

                specifications: body.specifications,
                progress: body.progress,
                timeline: body.timeline,

                featured: body.featured,

            },

        });

        return NextResponse.json({

            success: true,
            project,

        });

    } catch (error) {
        console.error(error);

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

        await prisma.project.delete({

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
