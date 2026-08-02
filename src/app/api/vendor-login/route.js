import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const corsHeaders = {
    "Access-Control-Allow-Origin": "http://localhost:5173",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};


export async function OPTIONS() {

    return new NextResponse(null, {
        status: 200,
        headers: corsHeaders,
    });

}


export async function POST(request) {

    try {

        const body = await request.json();


        const vendor = await prisma.vendorRegistration.findUnique({

            where: {
                email: body.email,
            },

        });


        if (!vendor) {

            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid email.",
                },
                {
                    headers: corsHeaders,
                }
            );

        }


        const matched = await bcrypt.compare(

            body.password,
            vendor.password

        );


        if (!matched) {

            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid password.",
                },
                {
                    headers: corsHeaders,
                }
            );

        }


        return NextResponse.json(
            {
                success: true,
                message: "Login successful.",
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
