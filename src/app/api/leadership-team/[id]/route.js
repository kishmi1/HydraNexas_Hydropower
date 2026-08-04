import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request, { params }) {

    try {

        const { id } = await params;

        const leadership = await prisma.leadershipTeam.findUnique({

            where: {
                id: Number(id),
            },

        });

        if (!leadership) {

            return NextResponse.json({

                success: false,
                message: "Leadership Member Not Found",

            }, {

                status: 404,

            });

        }

        return NextResponse.json({

            success: true,
            leadership,

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

        const leadership = await prisma.leadershipTeam.update({

            where: {
                id: Number(id),
            },

            data: {

                name: body.name,
                position: body.position,
                image: body.image,
                description: body.description,

            },

        });

        return NextResponse.json({

            success: true,
            leadership,

        });

    } catch (error) {

        console.error(error);

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

        await prisma.leadershipTeam.delete({

            where: {
                id: Number(id),
            },

        });

        return NextResponse.json({

            success: true,

        });

    } catch (error) {

        console.error(error);

        return NextResponse.json({

            success: false,
            message: error.message,

        }, {

            status: 500,

        });

    }

}
