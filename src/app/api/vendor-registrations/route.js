import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {

    try {

        const vendors = await prisma.vendorRegistration.findMany({

            orderBy: {
                createdAt: "desc",
            },

        });

        return NextResponse.json({

            success: true,
            vendors,

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

        const existingVendor = await prisma.vendorRegistration.findUnique({

            where: {
                email: body.email,
            },

        });

        if (existingVendor) {

            return NextResponse.json({

                success: false,
                message: "Email already exists.",

            });

        }

        const hashedPassword = await bcrypt.hash(body.password, 10);

        const vendor = await prisma.vendorRegistration.create({

            data: {

                companyName: body.companyName,
                registrationNumber: body.registrationNumber,
                vat: body.vat,
                businessCategory: body.businessCategory,

                contactPerson: body.contactPerson,
                email: body.email,
                phone: body.phone,
                address: body.address,

                password: hashedPassword,

            },

        });

        return NextResponse.json({

            success: true,
            vendor,

        });

    } catch (error) {

        return NextResponse.json({

            success: false,
            message: error.message,

        });

    }

}
