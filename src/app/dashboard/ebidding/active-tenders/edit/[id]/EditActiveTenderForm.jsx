"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import ActiveTenderForm from "@/components/dashboard/ActiveTenderForm";

export default function EditActiveTenderForm({ tender }) {

    return (

        <div>

            <Link
                href="/dashboard/ebidding/active-tenders"
                className="mb-6 inline-flex items-center gap-2 text-blue-600 hover:underline"
            >
                <ArrowLeft size={18} />
                Back to Active Tenders
            </Link>

            <div className="mb-8">

                <h1 className="text-3xl font-bold">
                    Edit Active Tender
                </h1>

                <p className="text-slate-500">
                    Update tender information.
                </p>

            </div>

            <ActiveTenderForm tender={tender} />

        </div>

    );

}
