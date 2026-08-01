import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {

    try {

        const reports = await prisma.annualReport.findMany({

            orderBy: {
                createdAt: "desc",
            },

        });

        return NextResponse.json({
            success: true,
            reports,
        });

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch annual reports",
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

        const report = await prisma.annualReport.create({

            data: {

                year: body.year,
                title: body.title,
                description: body.description,
                file: body.file,

            },

        });

        return NextResponse.json({

            success: true,
            report,

        });

    } catch (error) {

        console.error(error);

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
