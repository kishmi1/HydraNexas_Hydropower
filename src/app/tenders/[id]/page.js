import TenderDetails from "@/frontend/pages/ebidding/TenderDetails/TenderDetails.jsx";
import FrontendLayout from "@/app/frontend-layout";

export default function TenderDetailsPage({ params }) {
  return (
    <FrontendLayout>
      <TenderDetails id={params.id} />
    </FrontendLayout>
  );
}
