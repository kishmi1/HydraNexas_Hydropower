import { prisma } from "@/lib/prisma";
import EditTenderNoticeForm from "./EditTenderNoticeForm";

export default async function EditTenderNoticePage({ params }) {

    const { id } = await params;

    const notice = await prisma.tenderNotice.findUnique({

        where: {
            id: Number(id),
        },

    });

    if (!notice) {

        return <h2>Tender Notice Not Found</h2>;

    }

    return <EditTenderNoticeForm notice={notice} />;

}
