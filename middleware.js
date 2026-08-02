import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request) {

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
        return new NextResponse(null, {
            status: 200,
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:5173",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
        });
    }

    const response = NextResponse.next();

    // Add CORS headers for API routes
    if (request.nextUrl.pathname.startsWith("/api")) {
        response.headers.set(
            "Access-Control-Allow-Origin",
            "http://localhost:5173"
        );
        response.headers.set(
            "Access-Control-Allow-Methods",
            "GET, POST, PUT, DELETE, OPTIONS"
        );
        response.headers.set(
            "Access-Control-Allow-Headers",
            "Content-Type, Authorization"
        );

        return response;
    }

    const token = request.cookies.get("token")?.value;

    if (request.nextUrl.pathname === "/login") {
        return response;
    }

    if (request.nextUrl.pathname.startsWith("/dashboard")) {
        if (!token) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        try {
            jwt.verify(token, process.env.JWT_SECRET);
            return response;
        } catch {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    return response;
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/api/:path*",
    ],
};
