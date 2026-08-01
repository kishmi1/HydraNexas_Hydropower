import { prisma } from "@/lib/prisma";

import SettingsForm from "@/components/dashboard/SettingsForm";

export default async function SettingsPage() {

    const setting = await prisma.setting.findFirst();

    return (

        <div>

            <div className="mb-8">

                <h1 className="text-3xl font-bold text-slate-800">
                    Website Settings
                </h1>

                <p className="mt-2 text-slate-500">
                    Manage company information, contact details, social media,
                    SEO and footer settings.
                </p>

            </div>

            <SettingsForm setting={setting} />

        </div>

    );

}
