import BoardDirectorForm from "@/components/dashboard/BoardDirectorForm";

export default async function EditBoardDirectorPage({ params }) {
  const { id } = await params;
  return <BoardDirectorForm director={{ id }} />;
}
