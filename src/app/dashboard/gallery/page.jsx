import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, Pencil } from "lucide-react";

import DeleteGalleryButton from "@/components/dashboard/DeleteGalleryButton";

export default async function GalleryPage() {

    const gallery = await prisma.mediaGallery.findMany({

        orderBy: {

            createdAt: "desc",

        },

    });

    return (

        <div>

            <div className="mb-8 flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold">
                        Media Gallery
                    </h1>

                    <p className="text-slate-500">
                        Manage Images & Videos
                    </p>

                </div>

                <Link
                    href="/dashboard/gallery/create"
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white"
                >
                    <Plus size={18} />
                    Add Media
                </Link>

            </div>

            <div className="overflow-hidden rounded-2xl border bg-white">

                <table className="w-full">

                  <thead className="bg-slate-100">

<tr>

<th className="p-4 text-left">Preview</th>
<th className="p-4 text-left">Title</th>
<th className="p-4 text-left">Category</th>
<th className="p-4 text-left">Type</th>
<th className="p-4 text-center">Actions</th>

</tr>

</thead>

                    <tbody>

                        {gallery.map((item) => (

                            <tr
                                key={item.id}
                                className="border-t"
                            >
<td className="p-4">

    {item.type === "Image" ? (

        item.image ? (

            <img
                src={item.image}
                alt={item.title}
                className="h-20 w-28 rounded-lg object-cover"
            />

        ) : (

            <span>No Image</span>

        )

    ) : (

        item.video ? (

            <video
                src={item.video}
                controls
                className="h-20 w-28 rounded-lg object-cover"
            />

        ) : (

            <span>No Video</span>

        )

    )}

</td>

                              <td className="max-w-xs p-4 truncate">
    {item.title}
</td>

                                <td className="p-4">
                                    {item.category}
                                </td>

                                <td className="p-4">
                                    {item.type}
                                </td>

                                <td className="flex justify-center gap-3 p-4">

                                    <Link
                                        href={`/dashboard/gallery/edit/${item.id}`}
                                    >
                                        <Pencil
                                            size={18}
                                            className="text-blue-600"
                                        />
                                    </Link>

                                    <DeleteGalleryButton id={item.id} />

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}
