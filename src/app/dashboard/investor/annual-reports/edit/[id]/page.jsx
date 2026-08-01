import { prisma } from "@/lib/prisma";
import EditAnnualReportForm from "./EditAnnualReportForm";

export default async function EditAnnualReportPage({ params }) {

    const { id } = await params;

    const report = await prisma.annualReport.findUnique({

        where: {
            id: Number(id),
        },

    });

    if (!report) {

        return <h2>Annual Report Not Found</h2>;

    }

    return <EditAnnualReportForm report={report} />;

}
