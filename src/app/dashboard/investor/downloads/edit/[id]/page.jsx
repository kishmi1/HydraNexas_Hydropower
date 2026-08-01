import { prisma } from "@/lib/prisma";
import EditDownloadForm from "./EditDownloadForm";

export default async function EditDownloadPage({ params }) {

    const { id } = await params;

    const download = await prisma.download.findUnique({

        where: {

            id: Number(id),

        },

    });

    if (!download) {

        return <h2>Download Not Found</h2>;

    }

    return <EditDownloadForm download={download} />;

}
