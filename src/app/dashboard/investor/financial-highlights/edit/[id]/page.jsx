import { prisma } from "@/lib/prisma";
import EditFinancialHighlightForm from "./EditFinancialHighlightForm";

export default async function EditFinancialHighlightPage({ params }) {

    const { id } = await params;

    const highlight = await prisma.financialHighlight.findUnique({

        where: {
            id: Number(id),
        },

    });

    if (!highlight) {

        return <h2>Financial Highlight Not Found</h2>;

    }

    return <EditFinancialHighlightForm highlight={highlight} />;

}
