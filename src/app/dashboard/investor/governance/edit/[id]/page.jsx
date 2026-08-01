import { prisma } from "@/lib/prisma";
import EditGovernanceForm from "./EditGovernanceForm";

export default async function EditGovernancePage({ params }) {

    const { id } = await params;

    const governance = await prisma.governance.findUnique({

        where: {
            id: Number(id),
        },

    });

    if (!governance) {

        return <h2>Governance Not Found</h2>;

    }

    return <EditGovernanceForm governance={governance} />;

}
