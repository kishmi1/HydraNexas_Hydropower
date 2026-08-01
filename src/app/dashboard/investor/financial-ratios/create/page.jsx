import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import FinancialRatioForm from "@/components/dashboard/FinancialRatioForm";

export default function CreateFinancialRatioPage() {

    return (

        <div>

            <Link
                href="/dashboard/investor/financial-ratios"
                className="mb-6 inline-flex items-center gap-2 text-blue-600 hover:underline"
            >
                <ArrowLeft size={18} />
                Back to Financial Ratios
            </Link>

            <div className="mb-8">

                <h1 className="text-3xl font-bold text-slate-800">
                    Add Financial Ratio
                </h1>

                <p className="mt-2 text-slate-500">
                    Create a new financial ratio.
                </p>

            </div>

            <FinancialRatioForm />

        </div>

    );

}
