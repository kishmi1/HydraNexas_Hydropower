import { prisma } from "@/lib/prisma";
import EditDividendHistoryForm from "./EditDividendHistoryForm";

export default async function EditDividendHistoryPage({ params }) {

    const { id } = await params;

    const dividend = await prisma.dividendHistory.findUnique({

        where: {
            id: Number(id),
        },

    });

    if (!dividend) {

        return <h2>Dividend History Not Found</h2>;

    }

    return <EditDividendHistoryForm dividend={dividend} />;

}
