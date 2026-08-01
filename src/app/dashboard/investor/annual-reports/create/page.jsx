import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import AnnualReportForm from "@/components/dashboard/AnnualReportForm";

export default function CreateAnnualReportPage() {

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

                <h1 className="text-3xl font-bold text-slate-800">
                    Add Annual Report
                </h1>

                <p className="mt-2 text-slate-500">
                    Upload a new annual report.
                </p>

            </div>

            <AnnualReportForm />

        </div>

    );

}
