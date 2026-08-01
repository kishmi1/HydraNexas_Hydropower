"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import FinancialHighlightForm from "@/components/dashboard/FinancialHighlightForm";

export default function EditFinancialHighlightForm({ highlight }) {

    return (

        <div>

            <Link
                href="/dashboard/investor/financial-highlights"
                className="mb-6 inline-flex items-center gap-2 text-blue-600 hover:underline"
            >
                <ArrowLeft size={18} />
                Back to Financial Highlights
            </Link>

            <div className="mb-8">

                <h1 className="text-3xl font-bold">
                    Edit Financial Highlight
                </h1>

                <p className="text-slate-500">
                    Update Financial Highlight.
                </p>

            </div>

            <FinancialHighlightForm
                highlight={highlight}
            />

        </div>

    );

}
