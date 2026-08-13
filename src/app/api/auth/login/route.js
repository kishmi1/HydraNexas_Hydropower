import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { generateToken } from "@/lib/auth";

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        // Check if email exists
        const admin = await prisma.admin.findUnique({
            where: {
                email,
            },
        });

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

        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "Invalid email or password" },
                { status: 401 }
            );
        }

        // Generate JWT
        const token = generateToken(admin);

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
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });

        return response;
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
