import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const contents = await prisma.homePageContent.findMany();
        
        // Convert to key-value object
        const contentMap = {};
        contents.forEach(item => {
            contentMap[item.section] = item.content;
        });

        return NextResponse.json({
            success: true,
            content: contentMap,
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

export async function PUT(request) {
    try {
        const body = await request.json();
        const { section, content } = body;

        const updated = await prisma.homePageContent.upsert({
            where: { section },
            update: { content },
            create: { section, content },
        });

        return NextResponse.json({
            success: true,
            content: updated,
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
