import EventDetails from "@/frontend/pages/news/EventDetails/EventDetails";
import FrontendLayout from "@/app/frontend-layout";

export default async function EventDetailsPage({ params }) {
  const { id } = await params;

  return (
    <FrontendLayout>
      <EventDetails id={id} />
    </FrontendLayout>
  );
}
