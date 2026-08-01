import { prisma } from "@/lib/prisma";

import TenderDocumentForm from "@/components/dashboard/TenderDocumentForm";

export default async function EditTenderDocumentPage({ params }) {

    const { id } = await params;

    const document = await prisma.tenderDocument.findUnique({

        where: {
            id: Number(id),
        },

    });

    return <TenderDocumentForm document={document} />;

}
