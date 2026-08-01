import { prisma } from "@/lib/prisma";
import EditNewsForm from "./EditNewsForm";

export default async function EditNewsPage({ params }) {

    const { id } = await params;

    const news = await prisma.news.findUnique({
        where: {
            id: Number(id),
        },
    });

    if (!news) {
        return (
            <h2 className="p-8 text-2xl font-bold">
                News not found
            </h2>
        );
    }

    return (
        <EditNewsForm news={news} />
    );
}
