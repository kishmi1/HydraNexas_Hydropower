import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function PUT(request, { params }) {

    try {

        const { id } = await params;

        const body = await request.json();

        const data = {

            name: body.name,
            email: body.email,
            role: body.role,
            status: body.status,

        };

        // Password update गर्ने भए मात्र hash गर्ने
        if (body.password && body.password.trim() !== "") {

            data.password = await bcrypt.hash(body.password, 10);

        }

        await prisma.user.update({

            where: {
                id: Number(id),
            },

            data,

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

        await prisma.user.delete({

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
