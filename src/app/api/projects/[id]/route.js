import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request, { params }) {
    const { id } = await params;
    try {

        const body = await request.json();
        console.log(JSON.stringify(body, null, 2));
        console.log(body.timeline);
        console.log(body.specifications);
        await prisma.project.update({
            where: {
                id: Number(params.id),
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
        });

    } catch (error) {

        console.error(error.message);
        console.error(error.stack);

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

export async function DELETE(request, { params }) {

    try {

        await prisma.project.delete({

            where: {
                id: Number(params.id),
            },

        });

        return NextResponse.json({
            success: true,
        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to delete project",
            },
            {
                status: 500,
            }
        );

    }

}
