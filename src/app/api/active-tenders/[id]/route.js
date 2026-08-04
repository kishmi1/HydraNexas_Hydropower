import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        console.log("ID:", id);

        const tender = await prisma.activeTender.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (!tender) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Tender not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            tender,
        });

    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
}
export async function PUT(request, { params }) {

    try {

        const { id } = await params;

        const body = await request.json();

        await prisma.activeTender.update({

            where: {
                id: Number(id),
            },

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

export async function DELETE(request, { params }) {

    try {

        const { id } = await params;

        await prisma.activeTender.delete({

            where: {
                id: Number(id),
            },

        });

        return NextResponse.json({
            success: true,
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
