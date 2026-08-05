import AwardForm from "@/components/dashboard/AwardForm";

export default function CreateAwardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Add Award
        </h1>
        <p className="text-slate-500">
          Add a new award or recognition
        </p>
      </div>
      <AwardForm />
    </div>
  );
}
