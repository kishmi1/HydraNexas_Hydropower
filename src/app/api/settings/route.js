import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {

    try {

        const setting = await prisma.setting.findFirst();

        return NextResponse.json({

            success: true,
            setting,

        });

    } catch (error) {

        return NextResponse.json({

            success: false,
            message: error.message,

        }, {

            status: 500,

        });

    }

}

export async function PUT(request) {

    try {

        const body = await request.json();

        const existingSetting = await prisma.setting.findFirst();

        let setting;

        if (existingSetting) {

            setting = await prisma.setting.update({

                where: {

                    id: existingSetting.id,

                },

                data: {

                    companyName: body.companyName,
                    logo: body.logo,

                    email: body.email,
                    phone: body.phone,
                    address: body.address,

                    facebook: body.facebook,
                    linkedin: body.linkedin,
                    youtube: body.youtube,
                    instagram: body.instagram,

                    websiteTitle: body.websiteTitle,
                    metaDescription: body.metaDescription,

                    footerText: body.footerText,

                },

            });

        } else {

            setting = await prisma.setting.create({

                data: {

                    companyName: body.companyName,
                    logo: body.logo,

                    email: body.email,
                    phone: body.phone,
                    address: body.address,

                    facebook: body.facebook,
                    linkedin: body.linkedin,
                    youtube: body.youtube,
                    instagram: body.instagram,

                    websiteTitle: body.websiteTitle,
                    metaDescription: body.metaDescription,

                    footerText: body.footerText,

                },

            });

        }

        return NextResponse.json({

            success: true,
            setting,

        });

    } catch (error) {

        return NextResponse.json({

            success: false,
            message: error.message,

        }, {

            status: 500,

        });

    }

}
