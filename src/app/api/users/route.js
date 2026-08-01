import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {

    try {

        const users = await prisma.user.findMany({

            orderBy: {
                createdAt: "desc",
            },

            select: {

                id: true,
                name: true,
                email: true,
                role: true,
                status: true,
                createdAt: true,

            },

        });

        return NextResponse.json({

            success: true,
            users,

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

export async function POST(request) {

    try {

        const body = await request.json();

        const existingUser = await prisma.user.findUnique({

            where: {
                email: body.email,
            },

        });

        if (existingUser) {

            return NextResponse.json({

                success: false,
                message: "Email already exists",

            }, {

                status: 400,

            });

        }

        const hashedPassword = await bcrypt.hash(body.password, 10);

        const user = await prisma.user.create({

            data: {

                name: body.name,
                email: body.email,
                password: hashedPassword,

                role: body.role,
                status: body.status,

            },

        });

        return NextResponse.json({

            success: true,
            user,

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
