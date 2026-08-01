import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import VendorStatusButtons from "@/components/dashboard/VendorStatusButtons";

export default async function VendorDetailsPage({ params }) {

    const { id } = await params;

    const vendor = await prisma.vendorRegistration.findUnique({

        where: {
            id: Number(id),
        },

    });

    if (!vendor) {

        return <h2>Vendor Not Found</h2>;

    }

    return (

        <div>

            <Link
                href="/dashboard/ebidding/vendor-registrations"
                className="mb-6 inline-flex items-center gap-2 text-blue-600 hover:underline"
            >
                <ArrowLeft size={18} />
                Back
            </Link>

            <div className="rounded-2xl border bg-white p-8">

                <h1 className="mb-8 text-3xl font-bold">
                    Vendor Details
                </h1>

                <div className="grid grid-cols-2 gap-6">

                    <div>
                        <strong>Company Name</strong>
                        <p>{vendor.companyName}</p>
                    </div>

                    <div>
                        <strong>Registration Number</strong>
                        <p>{vendor.registrationNumber}</p>
                    </div>

                    <div>
                        <strong>VAT / PAN</strong>
                        <p>{vendor.vat}</p>
                    </div>

                    <div>
                        <strong>Business Category</strong>
                        <p>{vendor.businessCategory}</p>
                    </div>

                    <div>
                        <strong>Contact Person</strong>
                        <p>{vendor.contactPerson}</p>
                    </div>

                    <div>
                        <strong>Email</strong>
                        <p>{vendor.email}</p>
                    </div>

                    <div>
                        <strong>Phone</strong>
                        <p>{vendor.phone}</p>
                    </div>

                    <div>
                        <strong>Address</strong>
                        <p>{vendor.address}</p>
                    </div>

                    <div>
                        <strong>Status</strong>
                        <p>{vendor.status}</p>
                    </div>

                </div>

                <div className="mt-10">

                    <VendorStatusButtons
                        id={vendor.id}
                        status={vendor.status}
                    />

                </div>

            </div>

        </div>

    );

}
