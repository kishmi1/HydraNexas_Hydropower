import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {

    try {

        const ratios = await prisma.financialRatio.findMany({

            orderBy: {
                createdAt: "desc",
            },

        });

        return NextResponse.json({
            success: true,
            ratios,
        });

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch financial ratios",
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

        const ratio = await prisma.financialRatio.create({

            data: {

                title: body.title,
                value: body.value,

            },

        });

        return NextResponse.json({
            success: true,
            ratio,
        });

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to create financial ratio",
            },
            {
                status: 500,
            }
        );

    }

}
