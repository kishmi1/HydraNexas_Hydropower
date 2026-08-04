import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const notifications = await prisma.notification.findMany({
            orderBy: {
                createdAt: "desc",
            },
            take: 10,
        });

        const unreadCount = await prisma.notification.count({
            where: {
                isRead: false,
            },
        });

        return NextResponse.json({
            success: true,
            notifications,
            unreadCount,
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

export async function PATCH(request) {
    try {
        const body = await request.json();
        const { ids } = body;

        await prisma.notification.updateMany({
            where: {
                id: {
                    in: ids,
                },
            },
            data: {
                isRead: true,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Notifications marked as read",
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
