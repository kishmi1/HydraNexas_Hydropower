import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request, { params }) {

    try {

        const { id } = await params;

        const body = await request.json();

        await prisma.jobApplication.update({

            where: {
                id: Number(id),
            },

            data: {

                status: body.status,

            },

        });

        return NextResponse.json({

            success: true,

        });

    } catch (error) {

        return NextResponse.json({

            success: false,
            message: error.message,

        });

    }

}
