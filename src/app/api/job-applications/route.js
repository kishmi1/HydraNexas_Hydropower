import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import streamifier from "streamifier";

export async function GET() {
    try {
        const applications = await prisma.jobApplication.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json({
            success: true,
            applications,
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

export async function POST(request) {
    try {
        const formData = await request.formData();

        const fullName = formData.get("fullName");
        const email = formData.get("email");
        const phone = formData.get("phone");
        const address = formData.get("address");
        const position = formData.get("position");
        const qualification = formData.get("qualification");
        const experience = formData.get("experience");
        const company = formData.get("company");
        const salary = formData.get("salary");
        const coverLetter = formData.get("coverLetter");

        const cvFile = formData.get("cv");

        let cvUrl = "";

        if (cvFile) {
            const bytes = await cvFile.arrayBuffer();
            const buffer = Buffer.from(bytes);

            cvUrl = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: "hydranexa/job-applications",
                        resource_type: "raw",
                    },
                    (error, result) => {
                        if (error) {
                            console.error(error);
                            reject(error);
                        } else {
                            console.log(result);
                            resolve(result.secure_url);
                        }
                    }
                );

                streamifier.createReadStream(buffer).pipe(uploadStream);
            });
        }

        const application = await prisma.jobApplication.create({
            data: {
                fullName,
                email,
                phone,
                address,
                position,
                qualification,
                experience,
                company,
                salary,
                coverLetter,
                cv: cvUrl,
            },
        });

        await prisma.notification.create({
            data: {
                title: "New Job Application",
                message: `${fullName} has applied for ${position}.`,
                type: "job",
            },
        });

        return NextResponse.json({
            success: true,
            application,
        });

    } catch (error) {
        console.error(error);

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
