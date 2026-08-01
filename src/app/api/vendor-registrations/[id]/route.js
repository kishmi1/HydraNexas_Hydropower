import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function PUT(request, { params }) {

    try {

        const { id } = await params;

        const body = await request.json();

        const hashedPassword = await bcrypt.hash(body.password, 10);

        await prisma.vendorRegistration.update({

            where: {
                id: Number(id),
            },

            data: {

                ...(body.companyName && { companyName: body.companyName }),
                ...(body.registrationNumber && { registrationNumber: body.registrationNumber }),
                ...(body.vat && { vat: body.vat }),
                ...(body.businessCategory && { businessCategory: body.businessCategory }),
                ...(body.contactPerson && { contactPerson: body.contactPerson }),
                ...(body.email && { email: body.email }),
                ...(body.phone && { phone: body.phone }),
                ...(body.address && { address: body.address }),

                ...(body.password && {
                    password: await bcrypt.hash(body.password, 10),
                }),

                ...(body.status && { status: body.status }),

            },
        });

        return NextResponse.json({
            success: true,
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

export async function DELETE(request, { params }) {

    try {

        const { id } = await params;

        await prisma.vendorRegistration.delete({

            where: {
                id: Number(id),
            },

        });

        return NextResponse.json({
            success: true,
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
