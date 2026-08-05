import LeadershipForm from "@/components/dashboard/LeadershipForm";

export default async function EditLeadershipPage({ params }) {
    const { id } = await params;
    return (
        <LeadershipForm leadership={{ id }} />
    );
}
