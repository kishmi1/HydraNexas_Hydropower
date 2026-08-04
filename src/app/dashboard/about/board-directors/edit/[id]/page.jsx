import BoardDirectorForm from "@/components/dashboard/BoardDirectorForm";

async function getBoardDirector(id) {
  const res = await fetch(
    `/api/board-directors`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  return data.boardDirectors.find(
    (item) => item.id === Number(id)
  );
}

export default async function EditBoardDirectorPage({ params }) {
  const director = await getBoardDirector(params.id);

  return <BoardDirectorForm director={director} />;
}
