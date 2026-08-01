import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {

    try {

        const shares = await prisma.shareInformation.findMany({

            orderBy: {
                createdAt: "desc",
            },

        });

        return NextResponse.json({

            success: true,
            shares,

        });

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch share information",
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

        const share = await prisma.shareInformation.create({

            data: {

                title: body.title,
                value: body.value,

            },

        });

        return NextResponse.json({

            success: true,
            share,

        });

    } catch (error) {

        console.error(error);

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
