import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

                highlights: body.highlights,
                tags: body.tags,

                featured: body.featured,
                status: body.status,

            },

        });

        return NextResponse.json({

            success: true,
            news,

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

        await prisma.news.delete({

            where: {

                id: Number(id),

            },

        });

        return NextResponse.json({

            success: true,

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
