import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request, { params }) {

    try {

        const { id } = await params;

        const pressRelease = await prisma.pressRelease.findUnique({

            where: {
                id: Number(id),
            },

        });

        if (!pressRelease) {

            return NextResponse.json({

                success: false,
                message: "Press release not found",

            }, {

                status: 404,

            });

        }

        return NextResponse.json({

            success: true,
            pressRelease,

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

        const pressRelease = await prisma.pressRelease.update({

            where: {
                id: Number(id),
            },

            data: {

                title: body.title,
                slug: body.slug,
                summary: body.summary,
                content: body.content,
                featuredImage: body.featuredImage,
                category: body.category,
                publishedDate: body.publishedDate,
                author: body.author,
                pdfUrl: body.pdfUrl,
                tags: body.tags,
                status: body.status,

            },

        });

        return NextResponse.json({

            success: true,
            pressRelease,

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

        await prisma.pressRelease.delete({

            where: {
                id: Number(id),
            },

        });

        return NextResponse.json({

            success: true,
            message: "Press release deleted successfully",

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
