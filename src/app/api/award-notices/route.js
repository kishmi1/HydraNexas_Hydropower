import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {

    try {

        const awards = await prisma.awardNotice.findMany({

            orderBy: {
                createdAt: "desc",
            },

        });

        return NextResponse.json({

            success: true,
            awards,

        });

    } catch (error) {

        return NextResponse.json({

            success: false,
            message: error.message,

        });

    }

}

export async function POST(request) {

    try {

        const body = await request.json();

        const award = await prisma.awardNotice.create({

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
            award,

        });

    } catch (error) {

        return NextResponse.json({

            success: false,
            message: error.message,

        });

    }

}
