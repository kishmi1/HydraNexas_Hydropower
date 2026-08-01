"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import DownloadForm from "@/components/dashboard/DownloadForm";

export default function EditDownloadForm({ download }) {

    return (

        <div>

            <Link
                href="/dashboard/investor/downloads"
                className="mb-6 inline-flex items-center gap-2 text-blue-600 hover:underline"
            >
                <ArrowLeft size={18} />
                Back to Downloads
            </Link>

            <div className="mb-8">

                <h1 className="text-3xl font-bold">
                    Edit Download
                </h1>

                <p className="text-slate-500">
                    Update Download Information.
                </p>

            </div>

            <DownloadForm download={download} />

        </div>

    );

}
