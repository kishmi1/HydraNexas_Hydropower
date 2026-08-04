import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const boardDirectors = await prisma.boardDirector.findMany({
            orderBy: {
                createdAt: "asc",
            },
        });

        return NextResponse.json({
            success: true,
            boardDirectors,
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

export async function POST(request) {
    try {
        const body = await request.json();

        const boardDirector = await prisma.boardDirector.create({
            data: {
                name: body.name,
                position: body.position,
                image: body.image,
                description: body.description,
            },
        });
        console.log(prisma);
        console.log(prisma.boardDirector);

        return NextResponse.json({
            success: true,
            boardDirector,
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
