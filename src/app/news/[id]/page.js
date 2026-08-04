import NewsDetails from "@/frontend/pages/news/NewsDetails/NewsDetails";
import FrontendLayout from "@/app/frontend-layout";

export default async function NewsDetailsPage({ params }) {
  const { id } = await params;

  return (
    <FrontendLayout>
      <NewsDetails id={id} />
    </FrontendLayout>
  );
}
