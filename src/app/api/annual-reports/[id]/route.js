import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request, { params }) {

    try {

        const { id } = await params;

        const body = await request.json();

        await prisma.annualReport.update({

            where: {
                id: Number(id),
            },

            data: {

                year: body.year,
                title: body.title,
                description: body.description,
                file: body.file,

            },

        });

        return NextResponse.json({
            success: true,
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

export async function DELETE(request, { params }) {

    try {

        const { id } = await params;

        await prisma.annualReport.delete({

            where: {
                id: Number(id),
            },

        });

        return NextResponse.json({
            success: true,
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
