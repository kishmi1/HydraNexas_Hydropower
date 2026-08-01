import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import GovernanceForm from "@/components/dashboard/GovernanceForm";

export default function CreateGovernancePage() {

    return (

        <div>

            <Link
                href="/dashboard/investor/governance"
                className="mb-6 inline-flex items-center gap-2 text-blue-600 hover:underline"
            >
                <ArrowLeft size={18} />
                Back to Governance
            </Link>

            <div className="mb-8">

                <h1 className="text-3xl font-bold">
                    Add Governance
                </h1>

                <p className="text-slate-500">
                    Create Corporate Governance information.
                </p>

            </div>

            <GovernanceForm />

        </div>

    );

}
