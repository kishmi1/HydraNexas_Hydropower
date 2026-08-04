import EventDetails from "@/frontend/pages/news/EventDetails/EventDetails.jsx";
import FrontendLayout from "@/app/frontend-layout";

export default function EventDetailsPage({ params }) {
  return (
    <FrontendLayout>
      <EventDetails id={params.id} />
    </FrontendLayout>
  );
}
