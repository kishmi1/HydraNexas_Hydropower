import { prisma } from "@/lib/prisma";

// GET - Public website मा news देखाउन
export async function GET() {
    try {

        const news = await prisma.news.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });


        return Response.json(
            {
                success: true,
                data: news,
            },
            {
                status: 200,
            }
        );


    } catch (error) {

        console.error(error);

        return Response.json(
            {
                success: false,
                message: "Failed to fetch news",
            },
            {
                status: 500,
            }
        );

    }
}
export async function POST(request) {
    try {
        const body = await request.json();

        const news = await prisma.news.create({
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

        return Response.json(
            {
                success: true,
                data: news,
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.error(error);

        return Response.json(
            {
                success: false,
                message: "Failed to create news",
            },
            {
                status: 500,
            }
        );
    }
}
