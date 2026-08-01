import { prisma } from "@/lib/prisma";
import EditActiveTenderForm from "./EditActiveTenderForm";

export default async function EditActiveTenderPage({ params }) {

    const { id } = await params;

    const tender = await prisma.activeTender.findUnique({

        where: {
            id: Number(id),
        },

    });

    if (!tender) {

        return <h2>Active Tender Not Found</h2>;

    }

    return <EditActiveTenderForm tender={tender} />;

}
