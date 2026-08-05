import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const awards = await prisma.award.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json({
            success: true,
            awards,
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

        const award = await prisma.award.create({
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
