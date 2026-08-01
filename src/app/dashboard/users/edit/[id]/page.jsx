import { prisma } from "@/lib/prisma";
import UserForm from "@/components/dashboard/UserForm";

export default async function EditUserPage({ params }) {

    const { id } = await params;

    const user = await prisma.user.findUnique({

        where: {

            id: Number(id),

        },

    });

    return <UserForm user={user} />;

}
