import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const awardsCount = await prisma.award.count();
        const projectsCount = await prisma.project.count();
        
        const projects = await prisma.project.findMany({
            select: {
                capacity: true,
            },
        });

        let totalCapacity = 0;
        projects.forEach(project => {
            const capacityStr = project.capacity;
            const match = capacityStr.match(/(\d+\.?\d*)/);
            if (match) {
                totalCapacity += parseFloat(match[1]);
            }
        });

        // Calculate homes powered (assuming 1 MW powers approximately 1500 homes)
        const homesPowered = Math.round(totalCapacity * 1500);
        const homesPoweredDisplay = homesPowered >= 1000000 
            ? `${(homesPowered / 1000000).toFixed(1)}M+`
            : homesPowered >= 1000
            ? `${(homesPowered / 1000).toFixed(0)}K+`
            : `${homesPowered}+`;

        const stats = [
            {
                id: 1,
                value: `${totalCapacity} MW`,
                label: "Installed Capacity",
            },
            {
                id: 2,
                value: `${projectsCount}+`,
                label: "Hydropower Projects",
            },
            {
                id: 3,
                value: "30+",
                label: "Years of Experience",
            },
            {
                id: 4,
                value: homesPoweredDisplay,
                label: "Homes Powered",
            },
        ];

        return NextResponse.json({
            success: true,
            stats,
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
