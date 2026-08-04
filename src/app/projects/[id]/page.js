import ProjectDetails from "@/frontend/pages/Projects/ProjectDetails/ProjectDetails.jsx";
import FrontendLayout from "@/app/frontend-layout";

export default function ProjectDetailsPage({ params }) {
  return (
    <FrontendLayout>
      <ProjectDetails id={params.id} />
    </FrontendLayout>
  );
}
