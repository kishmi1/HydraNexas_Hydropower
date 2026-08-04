import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {

        const leadershipTeam = await prisma.leadershipTeam.findMany({

            orderBy: {
                createdAt: "desc",
            },

        });

        return NextResponse.json({

            success: true,
            leadershipTeam,

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

export async function POST(request) {

    try {

        const body = await request.json();

        const leadership = await prisma.leadershipTeam.create({

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
