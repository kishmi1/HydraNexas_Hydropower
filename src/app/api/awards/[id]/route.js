import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        const award = await prisma.award.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!award) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Award not found",
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json({
            success: true,
            award,
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

        const award = await prisma.award.update({
            where: {
                id: parseInt(id),
            },
            data: {
                title: body.title,
                year: body.year,
                description: body.description,
                icon: body.icon || "FaTrophy",
            },
        });

        return NextResponse.json({
            success: true,
            award,
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

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        await prisma.award.delete({
            where: {
                id: parseInt(id),
            },
        });

        return NextResponse.json({
            success: true,
            message: "Award deleted successfully",
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
