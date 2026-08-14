import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get("q");

        if (!query || query.trim().length < 2) {
            return NextResponse.json({
                success: true,
                results: {
                    projects: [],
                    news: [],
                    events: [],
                    tenderNotices: [],
                    users: []
                }
            });
        }

        const searchTerm = query.trim().toLowerCase();
        console.log("Search term:", searchTerm);

        // If search term is too short, return empty results
        if (searchTerm.length < 2) {
            return NextResponse.json({
                success: true,
                results: {
                    projects: [],
                    news: [],
                    events: [],
                    tenderNotices: [],
                    users: []
                }
            });
        }

        // Search Projects - more flexible search with partial matching
        const projects = await prisma.project.findMany({
            where: {
                OR: [
                    { name: { contains: searchTerm, mode: 'insensitive' } },
                    { location: { contains: searchTerm, mode: 'insensitive' } },
                    { description: { contains: searchTerm, mode: 'insensitive' } },
                    { status: { contains: searchTerm, mode: 'insensitive' } },
                    { capacity: { contains: searchTerm, mode: 'insensitive' } },
                    { details: { contains: searchTerm, mode: 'insensitive' } }
                ]
            },
            take: 5,
            orderBy: { createdAt: 'desc' }
        });
        console.log("Projects found:", projects.length);

        // Search News - more flexible search with partial matching
        const news = await prisma.news.findMany({
            where: {
                OR: [
                    { title: { contains: searchTerm, mode: 'insensitive' } },
                    { description: { contains: searchTerm, mode: 'insensitive' } },
                    { category: { contains: searchTerm, mode: 'insensitive' } },
                    { author: { contains: searchTerm, mode: 'insensitive' } },
                    { content: { contains: searchTerm, mode: 'insensitive' } },
                    { tags: { has: searchTerm } }
                ]
            },
            take: 5,
            orderBy: { createdAt: 'desc' }
        });
        console.log("News found:", news.length);

        // Search Events - more flexible search with partial matching
        const events = await prisma.event.findMany({
            where: {
                OR: [
                    { title: { contains: searchTerm, mode: 'insensitive' } },
                    { location: { contains: searchTerm, mode: 'insensitive' } },
                    { description: { contains: searchTerm, mode: 'insensitive' } },
                    { date: { contains: searchTerm, mode: 'insensitive' } }
                ]
            },
            take: 5,
            orderBy: { createdAt: 'desc' }
        });
        console.log("Events found:", events.length);

        // Search Tender Notices - more flexible search with partial matching
        const tenderNotices = await prisma.tenderNotice.findMany({
            where: {
                OR: [
                    { title: { contains: searchTerm, mode: 'insensitive' } },
                    { description: { contains: searchTerm, mode: 'insensitive' } },
                    { location: { contains: searchTerm, mode: 'insensitive' } },
                    { publishDate: { contains: searchTerm, mode: 'insensitive' } }
                ]
            },
            take: 5,
            orderBy: { createdAt: 'desc' }
        });
        console.log("Tender notices found:", tenderNotices.length);

        // Search Users - more flexible search with partial matching
        const users = await prisma.user.findMany({
            where: {
                OR: [
                    { name: { contains: searchTerm, mode: 'insensitive' } },
                    { email: { contains: searchTerm, mode: 'insensitive' } },
                    { role: { contains: searchTerm, mode: 'insensitive' } },
                    { status: { contains: searchTerm, mode: 'insensitive' } }
                ]
            },
            take: 5,
            orderBy: { createdAt: 'desc' }
        });
        console.log("Users found:", users.length);

        return NextResponse.json({
            success: true,
            results: {
                projects: projects.map(p => ({
                    id: p.id,
                    title: p.name,
                    subtitle: p.location,
                    type: 'project',
                    route: `/dashboard/projects/edit/${p.id}`
                })),
                news: news.map(n => ({
                    id: n.id,
                    title: n.title,
                    subtitle: n.category,
                    type: 'news',
                    route: `/dashboard/news/edit/${n.id}`
                })),
                events: events.map(e => ({
                    id: e.id,
                    title: e.title,
                    subtitle: e.location,
                    type: 'event',
                    route: `/dashboard/events/edit/${e.id}`
                })),
                tenderNotices: tenderNotices.map(t => ({
                    id: t.id,
                    title: t.title,
                    subtitle: t.location,
                    type: 'tender',
                    route: `/dashboard/ebidding/tender-notices/edit/${t.id}`
                })),
                users: users.map(u => ({
                    id: u.id,
                    title: u.name,
                    subtitle: u.email,
                    type: 'user',
                    route: `/dashboard/users/edit/${u.id}`
                }))
            }
        });

    } catch (error) {
        console.error("Search error:", error);
        return NextResponse.json({
            success: false,
            message: error.message,
            results: {
                projects: [],
                news: [],
                events: [],
                tenderNotices: [],
                users: []
            }
        }, {
            status: 500,
        });
    }
}