import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const pdfUrl = searchParams.get("url");

        if (!pdfUrl) {
            return NextResponse.json(
                { message: "PDF URL is required" },
                { status: 400 }
            );
        }

        console.log("Redirecting to PDF:", pdfUrl);

        // Add parameters to force inline viewing
        const inlineUrl = pdfUrl.includes('?') 
            ? `${pdfUrl}&dl=0` 
            : `${pdfUrl}?dl=0`;

        // Redirect to Cloudinary URL with inline parameter
        return NextResponse.redirect(inlineUrl, 307);

    } catch (error) {
        console.error("Error serving PDF:", error);
        return NextResponse.json(
            { 
                message: "Internal Server Error",
                error: error.message 
            },
            { status: 500 }
        );
    }
}
