import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { generateToken } from "@/lib/auth";

export async function POST(request) {
    try {
        console.log("Login request received");
        const { email, password } = await request.json();
        console.log("Login attempt for email:", email);

        // Check if email exists
        const admin = await prisma.admin.findUnique({
            where: {
                email,
            },
        });

        console.log("Admin found:", !!admin);

        if (!admin) {
            return NextResponse.json(
                { message: "Invalid email or password" },
                { status: 401 }
            );
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(
            password,
            admin.password
        );

        console.log("Password valid:", isPasswordValid);

        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "Invalid email or password" },
                { status: 401 }
            );
        }

        // Generate JWT
        const token = await generateToken(admin);

        console.log("Generated token for admin:", admin.email);

        const response = NextResponse.json({
            message: "Login successful",
            admin: {
                id: admin.id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
            },
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });

        console.log("Cookie set in response");
        console.log("Cookie details:", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 60 * 60 * 24,
            path: "/"
        });
        return response;
    } catch (error) {
        console.error("Login error:", error);
        console.error("Error stack:", error.stack);

        return NextResponse.json(
            { message: "Internal Server Error: " + error.message },
            { status: 500 }
        );
    }
}
