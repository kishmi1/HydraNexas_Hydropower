import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request) {

    try {

        const { searchParams } = new URL(request.url);

        const status = searchParams.get("status");

        const projects = await prisma.project.findMany({

            where: status
                ? { status }
                : {},

            orderBy: {

                createdAt: "desc",

            },

        });

        return NextResponse.json({

            success: true,
            projects,

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

        const project = await prisma.project.create({

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

        return NextResponse.json({

            success: false,
            message: error.message,

        }, {

            status: 500,

        });

    }

}
