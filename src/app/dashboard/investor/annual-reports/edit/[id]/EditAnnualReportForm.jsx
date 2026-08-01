"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import AnnualReportForm from "@/components/dashboard/AnnualReportForm";

export default function EditAnnualReportForm({ report }) {

    return (

        <div>

            <Link
                href="/dashboard/investor/annual-reports"
                className="mb-6 inline-flex items-center gap-2 text-blue-600 hover:underline"
            >
                <ArrowLeft size={18} />
                Back to Annual Reports
            </Link>

            <div className="mb-8">

                <h1 className="text-3xl font-bold">
                    Edit Annual Report
                </h1>

                <p className="text-slate-500">
                    Update annual report.
                </p>

            </div>

            <AnnualReportForm report={report} />

        </div>

    );

}
