import cloudinary from "@/lib/cloudinary";

export async function uploadToCloudinary(fileBuffer, folder = "hydranexa") {

    return new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(

            {
                folder,
                resource_type: "auto",
            },

            (error, result) => {

                if (error) {

                    reject(error);

                } else {

                    resolve(result);

                }

            }

        );

        stream.end(fileBuffer);

    });

}
