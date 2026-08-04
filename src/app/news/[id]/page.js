import NewsDetails from "@/frontend/pages/news/NewsDetails/NewsDetails.jsx";
import FrontendLayout from "@/app/frontend-layout";

export default function NewsDetailsPage({ params }) {
  return (
    <FrontendLayout>
      <NewsDetails id={params.id} />
    </FrontendLayout>
  );
}
