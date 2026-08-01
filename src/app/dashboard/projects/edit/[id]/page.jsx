import { prisma } from "@/lib/prisma";
import ProjectForm from "@/components/dashboard/ProjectForm";

export default async function EditProjectPage({ params }) {

    const { id } = await params;

    const project = await prisma.project.findUnique({

        where: {

            id: Number(id),

        },

    });

    return <ProjectForm project={project} />;

}
