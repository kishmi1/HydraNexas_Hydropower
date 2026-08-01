import { prisma } from "@/lib/prisma";

import GalleryForm from "@/components/dashboard/GalleryForm";

export default async function EditGalleryPage({

    params,

}) {

    const { id } = await params;

    const gallery = await prisma.mediaGallery.findUnique({

        where: {

            id: Number(id),

        },

    });

    return <GalleryForm gallery={gallery} />;

}
