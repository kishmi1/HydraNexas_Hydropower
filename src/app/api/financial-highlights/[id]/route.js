import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request, { params }) {

    const { id } = await params;

    try {

        const body = await request.json();

        await prisma.financialHighlight.update({

            where: {
                id: Number(id),
            },

            data: {

                title: body.title,
                value: body.value,
                description: body.description,

            },

        });

        return NextResponse.json({
            success: true,
        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to update",
            },
            {
                status: 500,
            }
        );

    }

}

export async function DELETE(request, { params }) {

    const { id } = await params;

    try {

        await prisma.financialHighlight.delete({

            where: {
                id: Number(id),
            },

        });

        return NextResponse.json({
            success: true,
        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to delete",
            },
            {
                status: 500,
            }
        );

    }

}
