import { prisma } from "@/lib/prisma";
import EditShareInformationForm from "./EditShareInformationForm";

export default async function EditShareInformationPage({ params }) {

    const { id } = await params;

    const share = await prisma.shareInformation.findUnique({

        where: {
            id: Number(id),
        },

    });

    if (!share) {

        return <h2>Share Information Not Found</h2>;

    }

    return <EditShareInformationForm share={share} />;

}
