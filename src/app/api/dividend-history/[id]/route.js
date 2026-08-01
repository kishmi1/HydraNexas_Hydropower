import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request, { params }) {

    try {

        const { id } = await params;

        const body = await request.json();

        await prisma.dividendHistory.update({

            where: {
                id: Number(id),
            },

            data: {

                year: body.year,
                dividend: body.dividend,
                bonus: body.bonus,

            },

        });

        return NextResponse.json({
            success: true,
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

        await prisma.dividendHistory.delete({

            where: {
                id: Number(id),
            },

        });

        return NextResponse.json({
            success: true,
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
