import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET ALL PROJECTS
export async function GET() {
    try {
        const projects = await prisma.project.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json({
            success: true,
            projects,
        });

    } catch (error) {
        console.log(error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch projects",
            },
            {
                status: 500,
            }
        );
    }
}

// CREATE PROJECT
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
        console.log(error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to create project",
            },
            {
                status: 500,
            }
        );
    }
}
