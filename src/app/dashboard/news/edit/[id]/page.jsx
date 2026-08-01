import { prisma } from "@/lib/prisma";
import NewsForm from "@/components/dashboard/NewsForm";

export default async function EditNewsPage({ params }) {

    const { id } = await params;

    const news = await prisma.news.findUnique({

        where: {

            id: Number(id),

        },

    });

    return <NewsForm news={news} />;

}
