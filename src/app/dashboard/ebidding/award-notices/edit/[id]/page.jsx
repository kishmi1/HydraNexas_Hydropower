import { prisma } from "@/lib/prisma";

import AwardNoticeForm from "@/components/dashboard/AwardNoticeForm";

export default async function EditAwardNoticePage({ params }) {

    const { id } = await params;

    const award = await prisma.awardNotice.findUnique({

        where: {
            id: Number(id),
        },

    });

    return <AwardNoticeForm award={award} />;

}
