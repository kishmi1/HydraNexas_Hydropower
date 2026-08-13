import { NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // Allow public routes
    if (
        pathname === "/login" ||
        pathname.startsWith("/api/auth") ||
        pathname.startsWith("/_next") ||
        pathname.startsWith("/static") ||
        pathname.includes(".") || // static files
        // Public API routes (accessible without authentication)
        pathname.startsWith("/api/news") ||
        pathname.startsWith("/api/projects") ||
        pathname.startsWith("/api/job-openings") ||
        pathname.startsWith("/api/job-applications") ||
        pathname.startsWith("/api/tender-notices") ||
        pathname.startsWith("/api/leadership-team") ||
        pathname.startsWith("/api/board-directors") ||
        pathname.startsWith("/api/financial-highlights") ||
        pathname.startsWith("/api/financial-ratios") ||
        pathname.startsWith("/api/annual-reports") ||
        pathname.startsWith("/api/share-information") ||
        pathname.startsWith("/api/dividend-history") ||
        pathname.startsWith("/api/governance") ||
        pathname.startsWith("/api/downloads") ||
        pathname.startsWith("/api/active-tenders") ||
        pathname.startsWith("/api/award-notices") ||
        pathname.startsWith("/api/tender-documents") ||
        pathname.startsWith("/api/awards") ||
        pathname.startsWith("/api/events") ||
        pathname.startsWith("/api/gallery") ||
        pathname.startsWith("/api/press-releases") ||
        pathname.startsWith("/api/home-content") ||
        pathname.startsWith("/api/internships") ||
        pathname.startsWith("/api/weather") ||
        pathname.startsWith("/api/chatbot-data") ||
        pathname.startsWith("/api/vendor-registrations") ||
        pathname.startsWith("/api/vendor-login") ||
        pathname.startsWith("/api/contact") ||
        pathname.startsWith("/api/settings") ||
        pathname.startsWith("/api/notifications") ||
        pathname.startsWith("/api/achievement-stats")
    ) {
        return NextResponse.next();
    }

    // Protect dashboard routes
    if (pathname.startsWith("/dashboard")) {
        const token = request.cookies.get("token")?.value;

        if (!token) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        // Verify token
        const decoded = verifyToken(token);
        if (!decoded) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    // Protect admin API routes (require authentication)
    if (pathname.startsWith("/api/")) {
        const token = request.cookies.get("token")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        // Verify token
        const decoded = verifyToken(token);
        if (!decoded) {
            return NextResponse.json(
                { message: "Invalid token" },
                { status: 401 }
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/api/:path*"],
};
