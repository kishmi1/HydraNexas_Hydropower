import ProjectDetails from "@/frontend/pages/Projects/ProjectDetails/ProjectDetails";
import FrontendLayout from "@/app/frontend-layout";

export default async function ProjectDetailsPage({ params }) {
  const { id } = await params;

  return (
    <FrontendLayout>
      <ProjectDetails id={id} />
    </FrontendLayout>
  );
}
