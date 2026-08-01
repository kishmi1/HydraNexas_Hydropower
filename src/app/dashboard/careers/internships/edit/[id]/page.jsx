import { prisma } from "@/lib/prisma";
import InternshipForm from "@/components/dashboard/InternshipForm";

export default async function EditInternshipPage({ params }) {

    const { id } = await params;

    const internship = await prisma.internshipProgram.findUnique({

        where: {
            id: Number(id),
        },

    });

    return <InternshipForm internship={internship} />;

}
