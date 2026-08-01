import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {

    try {

        const dividends = await prisma.dividendHistory.findMany({

            orderBy: {
                year: "desc",
            },

        });

        return NextResponse.json({

            success: true,
            dividends,

        });

    } catch (error) {

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

export async function POST(request) {

    try {

        const body = await request.json();

        const dividend = await prisma.dividendHistory.create({

            data: {

                year: body.year,
                dividend: body.dividend,
                bonus: body.bonus,

            },

        });

        return NextResponse.json({

            success: true,
            dividend,

        });

    } catch (error) {

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
