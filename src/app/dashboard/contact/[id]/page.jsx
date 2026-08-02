import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function ContactDetailsPage({ params }) {

    const { id } = await params;

    const contact = await prisma.contact.findUnique({

        where: {

            id: Number(id),

        },

    });

    if (!contact) {

        return (

            <div className="p-10">

                <h1 className="text-2xl font-bold">
                    Message Not Found
                </h1>

            </div>

        );

    }

    // Mark as Read Automatically

    if (contact.status === "Unread") {

        await prisma.contact.update({

            where: {

                id: contact.id,

            },

            data: {

                status: "Read",

            },

        });

    }

    return (

        <div className="space-y-8">

            <Link
                href="/dashboard/contact"
                className="inline-flex items-center gap-2 text-blue-600 hover:underline"
            >

                <ArrowLeft size={18} />

                Back to Messages

            </Link>

            <div className="rounded-2xl border bg-white p-8 shadow-sm">

                <h1 className="mb-8 text-3xl font-bold">

                    Contact Message

                </h1>

                <div className="grid grid-cols-2 gap-6">

                    <div>

                        <h3 className="text-sm text-slate-500">
                            Name
                        </h3>

                        <p className="mt-1 font-semibold">
                            {contact.name}
                        </p>

                    </div>

                    <div>

                        <h3 className="text-sm text-slate-500">
                            Email
                        </h3>

                        <p className="mt-1 font-semibold">
                            {contact.email}
                        </p>

                    </div>

                    <div>

                        <h3 className="text-sm text-slate-500">
                            Phone
                        </h3>

                        <p className="mt-1 font-semibold">
                            {contact.phone || "-"}
                        </p>

                    </div>

                    <div>

                        <h3 className="text-sm text-slate-500">
                            Subject
                        </h3>

                        <p className="mt-1 font-semibold">
                            {contact.subject}
                        </p>

                    </div>

                    <div>

                        <h3 className="text-sm text-slate-500">
                            Status
                        </h3>

                        <span
                            className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                                contact.status === "Read"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                            }`}
                        >
                            {contact.status}
                        </span>

                    </div>

                    <div>

                        <h3 className="text-sm text-slate-500">
                            Date
                        </h3>

                        <p className="mt-1 font-semibold">
                            {new Date(contact.createdAt).toLocaleString()}
                        </p>

                    </div>

                </div>

                <div className="mt-8">

                    <h3 className="mb-3 text-sm text-slate-500">
                        Message
                    </h3>

                    <div className="rounded-xl border bg-slate-50 p-5 leading-7">

                        {contact.message}

                    </div>

                </div>

            </div>

        </div>

    );

}
