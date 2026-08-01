import { prisma } from "@/lib/prisma";
import EditFinancialRatioForm from "./EditFinancialRatioForm";

export default async function EditFinancialRatioPage({ params }) {

    const { id } = await params;

    const ratio = await prisma.financialRatio.findUnique({

        where: {
            id: Number(id),
        },

    });

    if (!ratio) {

        return <h2>Financial Ratio Not Found</h2>;

    }

    return <EditFinancialRatioForm ratio={ratio} />;

}
