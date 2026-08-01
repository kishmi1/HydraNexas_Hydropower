import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request) {
    const token = request.cookies.get("token")?.value;

    // Login page is always accessible
    if (request.nextUrl.pathname === "/login") {
        return NextResponse.next();
    }

    // Protect dashboard routes
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
        if (!token) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        try {
            jwt.verify(token, process.env.JWT_SECRET);
            return NextResponse.next();
        } catch {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"],
};
