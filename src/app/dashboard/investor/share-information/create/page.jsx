import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import ShareInformationForm from "@/components/dashboard/ShareInformationForm";

export default function CreateShareInformationPage() {

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

                <h1 className="text-3xl font-bold text-slate-800">
                    Add Share Information
                </h1>

                <p className="mt-2 text-slate-500">
                    Create new share information.
                </p>

            </div>

            <ShareInformationForm />

        </div>

    );

}
