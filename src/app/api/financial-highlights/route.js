import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {

    try {

        const financialHighlights =
            await prisma.financialHighlight.findMany({

                orderBy: {
                    id: "desc",
                },

            });

        return NextResponse.json({
            success: true,
            financialHighlights,
        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch data",
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

        const financialHighlight =
            await prisma.financialHighlight.create({

                data: {

                    title: body.title,
                    value: body.value,
                    description: body.description,

                },

            });

        return NextResponse.json({
            success: true,
            financialHighlight,
        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to create data",
            },
            {
                status: 500,
            }
        );

    }

}
