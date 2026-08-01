import { prisma } from "@/lib/prisma";
import EditProjectForm from "./EditProjectForm";

export default async function EditProjectPage({ params }) {

    const { id } = await params;

    const project = await prisma.project.findUnique({
        where: {
            id: Number(id),
        },
    });

    if (!project) {
        return <h2>Project not found</h2>;
    }

    return <EditProjectForm project={project} />;
}
