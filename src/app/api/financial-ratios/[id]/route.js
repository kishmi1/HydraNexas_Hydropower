import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request, { params }) {

    try {

        const { id } = await params;

        console.log("ID:", id);

        const body = await request.json();

        console.log("BODY:", body);

        const updated = await prisma.financialRatio.update({

            where: {
                id: Number(id),
            },

            data: {
                title: body.title,
                value: body.value,
            },

        });

        console.log(updated);

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
