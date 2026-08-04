import LeadershipForm from "@/components/dashboard/LeadershipForm";
async function getLeadership(id) {

    const res = await fetch(

        `/api/leadership-team/${id}`,

        {

            cache: "no-store",

        }

    );

    const data = await res.json();

    return data.leadership;

}

export default async function EditLeadershipPage({ params }) {

    const leadership = await getLeadership(params.id);

    return (

        <LeadershipForm leadership={leadership} />

    );

}
