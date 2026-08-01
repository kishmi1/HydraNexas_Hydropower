import { uploadToCloudinary } from "@/services/uploadService";

export async function POST(request) {
    try {
        const formData = await request.formData();

        const file = formData.get("file");

        if (!file) {
            return Response.json(
                { message: "No file uploaded" },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const result = await uploadToCloudinary(buffer);

        return Response.json({
            success: true,
            url: result.secure_url,
            imageUrl: result.secure_url,
            videoUrl: result.secure_url,
        });

    } catch (error) {
        console.error(error);

        return Response.json(
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
