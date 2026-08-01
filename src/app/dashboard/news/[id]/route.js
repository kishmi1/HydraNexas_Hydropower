import { prisma } from "@/lib/prisma";

export async function GET(request, { params }) {
    try {
        const { id } = await params;

        const news = await prisma.news.findUnique({
            where: {
                id: Number(id),
            },
        });

        return Response.json({
            success: true,
            news,
        });

    } catch (error) {
        return Response.json(
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

        const { id } = await params;

        await prisma.news.delete({
            where: {
                id: Number(id),
            },
        });

        return Response.json({
            success: true,
        });

    } catch (error) {

        return Response.json(
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

        const news = await prisma.news.update({
            where: {
                id: Number(id),
            },
            data: {
                title: body.title,
                category: body.category,
                author: body.author,
                date: body.date,
                image: body.image,
                description: body.description,
                content: body.content,
                tags: body.tags,
                highlights: body.highlights,
                status: body.status,
                featured: body.featured,
            },
        });

        return Response.json({
            success: true,
            news,
        });

    } catch (error) {

        return Response.json(
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
