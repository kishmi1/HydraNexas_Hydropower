import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request, { params }) {

    try {

        const { id } = await params;

        const contact = await prisma.contact.findUnique({

            where: {

                id: Number(id),

            },

        });

        return NextResponse.json({

            success: true,
            contact,

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

export async function PUT(request, { params }) {

    try {

        const { id } = await params;

        const body = await request.json();

        const contact = await prisma.contact.update({

            where: {

                id: Number(id),

            },

            data: {

                status: body.status,

            },

        });

        return NextResponse.json({

            success: true,
            contact,

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

        await prisma.contact.delete({

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
