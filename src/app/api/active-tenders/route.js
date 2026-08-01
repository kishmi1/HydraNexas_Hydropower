import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {

    const tenders = await prisma.activeTender.findMany({

        orderBy: {
            createdAt: "desc",
        },

    });

    return NextResponse.json({

        success: true,
        tenders,

    });

}

export async function POST(request) {

    try {

        const body = await request.json();

        const tender = await prisma.activeTender.create({

            data: {

                title: body.title,
                tenderNo: body.tenderNo,
                closingDate: body.closingDate,
                type: body.type,
                location: body.location,
                status: body.status,

                description: body.description,
                content: body.content,

                scope: body.scope,
                eligibility: body.eligibility,

                contactOfficer: body.contactOfficer,
                contactEmail: body.contactEmail,
                contactPhone: body.contactPhone,

            },

        });

        return NextResponse.json({

            success: true,
            tender,

        });

    } catch (error) {

        return NextResponse.json({

            success: false,
            message: error.message,

        });

    }

}
