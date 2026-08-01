import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request, { params }) {

    const { id } = await params;

    const body = await request.json();

    await prisma.jobOpening.update({

        where: {
            id: Number(id),
        },

        data: {

            position: body.position,
            department: body.department,
            location: body.location,
            type: body.type,
            deadline: body.deadline,

        },

    });

    return NextResponse.json({

        success: true,

    });

}

export async function DELETE(request, { params }) {

    const { id } = await params;

    await prisma.jobOpening.delete({

        where: {
            id: Number(id),
        },

    });

    return NextResponse.json({

        success: true,

    });

}
