import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { randomUUID } from "crypto";

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json(
                { message: "No file uploaded" },
                { status: 400 }
            );
        }

        // Check if file is PDF
        if (file.type !== "application/pdf") {
            return NextResponse.json(
                { message: "Only PDF files are allowed" },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create uploads directory if it doesn't exist
        const uploadsDir = path.join(process.cwd(), "public", "uploads", "pdfs");
        if (!existsSync(uploadsDir)) {
            await mkdir(uploadsDir, { recursive: true });
        }

        // Generate unique filename
        const uniqueId = randomUUID();
        const filename = `${uniqueId}.pdf`;
        const filepath = path.join(uploadsDir, filename);

        // Save file locally
        await writeFile(filepath, buffer);

        // Return the public URL
        const publicUrl = `/uploads/pdfs/${filename}`;

        return NextResponse.json({
            success: true,
            url: publicUrl,
            imageUrl: publicUrl,
            videoUrl: publicUrl,
        });

    } catch (error) {
        console.error("Error uploading PDF:", error);
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
