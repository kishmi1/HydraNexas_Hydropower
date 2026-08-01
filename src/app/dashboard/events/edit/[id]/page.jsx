import { prisma } from "@/lib/prisma";

import EventForm from "@/components/dashboard/EventForm";

export default async function EditEventPage({

    params,

}) {

    const { id } = await params;

    const event = await prisma.event.findUnique({

        where: {

            id: Number(id),

        },

    });

    return <EventForm event={event} />;

}
