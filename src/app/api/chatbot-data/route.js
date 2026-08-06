import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        console.log("Fetching chatbot data from database...");

        // Fetch all relevant data from database
        const [projects, news, jobOpenings, events, tenderNotices, pressReleases] = await Promise.all([
            prisma.project.findMany({
                select: {
                    name: true,
                    capacity: true,
                    location: true,
                    status: true,
                    description: true,
                    year: true
                }
            }),
            prisma.news.findMany({
                select: {
                    title: true,
                    category: true,
                    description: true,
                    date: true
                },
                take: 10,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.jobOpening.findMany({
                select: {
                    position: true,
                    department: true,
                    location: true,
                    type: true,
                    deadline: true
                }
            }),
            prisma.event.findMany({
                select: {
                    title: true,
                    date: true,
                    location: true,
                    description: true
                }
            }),
            prisma.tenderNotice.findMany({
                select: {
                    title: true,
                    publishDate: true,
                    location: true,
                    description: true
                }
            }),
            prisma.pressRelease.findMany({
                select: {
                    title: true,
                    category: true,
                    summary: true,
                    publishedDate: true
                },
                take: 5,
                orderBy: { createdAt: 'desc' }
            })
        ]);

        const companyInfo = {
            name: "HydraNexa Energy",
            description: "Leading hydropower development company in Nepal",
            contact: "info@hydranexa.com",
            phone: "+977-1-XXXXXXX",
            address: "Kathmandu, Nepal"
        };

        const responseData = {
            success: true,
            data: {
                company: companyInfo,
                projects: projects || [],
                news: news || [],
                careers: jobOpenings || [],
                events: events || [],
                tenderNotices: tenderNotices || [],
                pressReleases: pressReleases || []
            }
        };

        console.log("Chatbot data fetched successfully:", {
            projects: projects.length,
            news: news.length,
            careers: jobOpenings.length,
            events: events.length,
            tenderNotices: tenderNotices.length,
            pressReleases: pressReleases.length
        });

        return NextResponse.json(responseData);

    } catch (error) {
        console.error("Error fetching chatbot data:", error);
        return NextResponse.json({
            success: false,
            message: error.message,
            data: {
                company: { name: "HydraNexa Energy" },
                projects: [],
                news: [],
                careers: [],
                events: [],
                tenderNotices: [],
                pressReleases: []
            }
        }, {
            status: 500,
        });
    }
}