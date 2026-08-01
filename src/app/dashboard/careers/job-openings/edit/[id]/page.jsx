import { prisma } from "@/lib/prisma";

import JobOpeningForm from "@/components/dashboard/JobOpeningForm";

export default async function EditJobPage({ params }) {

    const { id } = await params;

    const job = await prisma.jobOpening.findUnique({

        where: {
            id: Number(id),
        },

    });

    return <JobOpeningForm job={job} />;

}
