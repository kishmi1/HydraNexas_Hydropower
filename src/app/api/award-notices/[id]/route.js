import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request, { params }) {

    try {

        const { id } = await params;

        const body = await request.json();

        await prisma.awardNotice.update({

            where: {
                id: Number(id),
            },

            data: {

                project: body.project,
                contractor: body.contractor,
                awardDate: body.awardDate,
                value: body.value,
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

        }, {

            status: 500,

        });

    }

}

export async function DELETE(request, { params }) {

    try {

        const { id } = await params;

        await prisma.awardNotice.delete({

            where: {
                id: Number(id),
            },

        });

        return NextResponse.json({
            success: true,
        });

    } catch (error) {

        return NextResponse.json({

            success: false,
            message: error.message,

        }, {

            status: 500,

        });

    }

}
