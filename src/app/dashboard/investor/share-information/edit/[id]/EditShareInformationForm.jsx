"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import ShareInformationForm from "@/components/dashboard/ShareInformationForm";

export default function EditShareInformationForm({ share }) {

    return (

        <div>

            <Link
                href="/dashboard/investor/share-information"
                className="mb-6 inline-flex items-center gap-2 text-blue-600 hover:underline"
            >
                <ArrowLeft size={18} />
                Back to Share Information
            </Link>

            <div className="mb-8">

                <h1 className="text-3xl font-bold">
                    Edit Share Information
                </h1>

                <p className="text-slate-500">
                    Update Share Information.
                </p>

            </div>

            <ShareInformationForm share={share} />

        </div>

    );

}
