import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
const corsHeaders = {
    "Access-Control-Allow-Origin": "http://localhost:5173",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {

    return NextResponse.json({}, {
        headers: corsHeaders,
    });

}
export async function GET() {

    try {

        const contacts = await prisma.contact.findMany({

            orderBy: {

                createdAt: "desc",

            },

        });

        return NextResponse.json(
            {
                success: true,
                contacts,
            },
            {
                headers: corsHeaders,
            }
        );

    } catch (error) {

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

        console.log("CONTACT DATA:", body);

        const contact = await prisma.contact.create({

            data: {

                name: body.name,

                email: body.email,

                phone: body.phone,

                subject: body.subject,

                message: body.message,

            },

        });
        return NextResponse.json(
            {
                success: true,
                contact,
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
