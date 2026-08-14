import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const projects = await prisma.project.findMany({ take: 3 });
        const news = await prisma.news.findMany({ take: 3 });
        const events = await prisma.event.findMany({ take: 3 });
        const tenderNotices = await prisma.tenderNotice.findMany({ take: 3 });
        const users = await prisma.user.findMany({ take: 3 });

        return NextResponse.json({
            success: true,
            sampleData: {
                projects: projects.map(p => ({ id: p.id, name: p.name, location: p.location })),
                news: news.map(n => ({ id: n.id, title: n.title, category: n.category })),
                events: events.map(e => ({ id: e.id, title: e.title, location: e.location })),
                tenderNotices: tenderNotices.map(t => ({ id: t.id, title: t.title, location: t.location })),
                users: users.map(u => ({ id: u.id, name: u.name, email: u.email }))
            }
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}