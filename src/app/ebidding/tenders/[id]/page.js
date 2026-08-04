export default async function TenderDetailsPage({ params }) {
    const { id } = await params;

    return (
        <FrontendLayout>
            <TenderDetails id={id} />
        </FrontendLayout>
    );
}
