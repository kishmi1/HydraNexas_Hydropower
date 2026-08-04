import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const corsHeaders = {
    "Access-Control-Allow-Origin": "http://localhost:5173",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: corsHeaders,
    });
}

export async function GET() {
    try {
        const vendors = await prisma.vendorRegistration.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(
            {
                success: true,
                vendors,
            },
            {
                headers: corsHeaders,
            }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            {
                status: 500,
                headers: corsHeaders,
            }
        );
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
            return NextResponse.json(
                {
                    success: false,
                    message: "Email already exists.",
                },
                {
                    headers: corsHeaders,
                }
            );
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

        await prisma.notification.create({
            data: {
                title: "New Vendor Registration",
                message: `${body.companyName} has registered as a vendor.`,
                type: "vendor",
            },
        });

        return NextResponse.json(
            {
                success: true,
                vendor,
            },
            {
                headers: corsHeaders,
            }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            {
                status: 500,
                headers: corsHeaders,
            }
        );
    }
}
