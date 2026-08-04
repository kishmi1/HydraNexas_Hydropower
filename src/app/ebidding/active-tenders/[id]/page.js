import TenderDetails from "@/frontend/pages/ebidding/TenderDetails/TenderDetails";
import FrontendLayout from "@/app/frontend-layout";

export default async function TenderDetailsPage({ params }) {
    const { id } = await params;

    return (
        <FrontendLayout>
            <TenderDetails id={id} />
        </FrontendLayout>
    );
}
