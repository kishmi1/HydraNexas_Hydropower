import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import DividendHistoryForm from "@/components/dashboard/DividendHistoryForm";

export default function CreateDividendHistoryPage() {

    return (

        <div>

            <Link
                href="/dashboard/investor/dividend-history"
                className="mb-6 inline-flex items-center gap-2 text-blue-600 hover:underline"
            >
                <ArrowLeft size={18} />
                Back to Dividend History
            </Link>

            <div className="mb-8">

                <h1 className="text-3xl font-bold">
                    Add Dividend History
                </h1>

                <p className="text-slate-500">
                    Create new dividend history.
                </p>

            </div>

            <DividendHistoryForm />

        </div>

    );

}
