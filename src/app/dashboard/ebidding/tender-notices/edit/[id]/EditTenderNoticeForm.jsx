"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import TenderNoticeForm from "@/components/dashboard/TenderNoticeForm";

export default function EditTenderNoticeForm({ notice }) {

    return (

        <div>

            <Link
                href="/dashboard/ebidding/tender-notices"
                className="mb-6 inline-flex items-center gap-2 text-blue-600 hover:underline"
            >
                <ArrowLeft size={18} />
                Back to Tender Notices
            </Link>

            <div className="mb-8">

                <h1 className="text-3xl font-bold">
                    Edit Tender Notice
                </h1>

                <p className="text-slate-500">
                    Update Tender Notice.
                </p>

            </div>

            <TenderNoticeForm notice={notice} />

        </div>

    );

}
