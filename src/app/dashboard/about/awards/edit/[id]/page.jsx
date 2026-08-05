import AwardForm from "@/components/dashboard/AwardForm";

export default async function EditAwardPage({ params }) {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/awards/${id}`, {
    cache: 'no-store'
  });
  const data = await res.json();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Edit Award
        </h1>
        <p className="text-slate-500">
          Update award information
        </p>
      </div>
      {data.success ? (
        <AwardForm award={data.award} />
      ) : (
        <div className="text-red-600">Award not found</div>
      )}
    </div>
  );
}
