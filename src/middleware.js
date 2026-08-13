import { NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // Allow auth API routes (login, logout)
    if (pathname.startsWith("/api/auth")) {
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
        // Public API routes (accessible without authentication)
        const publicRoutes = [
            "/api/news",
            "/api/projects", 
            "/api/job-openings",
            "/api/job-applications",
            "/api/tender-notices",
            "/api/leadership-team",
            "/api/board-directors",
            "/api/financial-highlights",
            "/api/financial-ratios",
            "/api/annual-reports",
            "/api/share-information",
            "/api/dividend-history",
            "/api/governance",
            "/api/downloads",
            "/api/active-tenders",
            "/api/award-notices",
            "/api/tender-documents",
            "/api/awards",
            "/api/events",
            "/api/gallery",
            "/api/press-releases",
            "/api/home-content",
            "/api/internships",
            "/api/weather",
            "/api/chatbot-data",
            "/api/vendor-registrations",
            "/api/vendor-login",
            "/api/contact",
            "/api/settings",
            "/api/notifications",
            "/api/achievement-stats",
            "/api/upload",
            "/api/upload-pdf",
            "/api/view-pdf"
        ];

        const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
        
        if (isPublicRoute) {
            return NextResponse.next();
        }

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
