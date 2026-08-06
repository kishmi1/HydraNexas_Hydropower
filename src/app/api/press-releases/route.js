import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {

    try {

        const pressReleases = await prisma.pressRelease.findMany({

            orderBy: {
                createdAt: "desc",
            },

        });

        return NextResponse.json({

            success: true,
            pressReleases,

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

        // Validate required fields
        if (!body.title || !body.slug || !body.summary || !body.content || 
            !body.category || !body.publishedDate || !body.author) {
            return NextResponse.json({
                success: false,
                message: "Missing required fields",
            }, {
                status: 400,
            });
        }

        // Ensure tags is an array
        const tags = Array.isArray(body.tags) ? body.tags : [];

        const pressRelease = await prisma.pressRelease.create({

            data: {

                title: body.title,
                slug: body.slug,
                summary: body.summary,
                content: body.content,
                featuredImage: body.featuredImage || null,
                category: body.category,
                publishedDate: body.publishedDate,
                author: body.author,
                pdfUrl: body.pdfUrl || null,
                tags: tags,
                status: body.status || "Draft",

            },

        });

        return NextResponse.json({

            success: true,
            pressRelease,

        });

    } catch (error) {

        console.error("Error creating press release:", error);

        // Check for unique constraint violation
        if (error.code === 'P2002') {
            return NextResponse.json({
                success: false,
                message: "A press release with this slug already exists",
            }, {
                status: 409,
            });
        }

        return NextResponse.json({

            success: false,
            message: error.message,

        }, {

            status: 500,

        });

    }

}
