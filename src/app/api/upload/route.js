import { v2 as cloudinary } from 'cloudinary';
import uniqid from 'uniqid';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(req, res) {
    const formData = await req.formData();
    const file = formData.get("file");

    const { name, type } = file;
    const data = await file.arrayBuffer();

    // Convert arrayBuffer to a readable stream for Cloudinary
    const bufferStream = new ReadableStream({
        start(controller) {
            controller.enqueue(new Uint8Array(data));
            controller.close();
        }
    });

    const id = uniqid();
    const ext = name.split(".").slice(-1);
    const newName = `${id}.${ext}`;

    // Upload the file to Cloudinary
    try {
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    public_id: newName,
                    resource_type: 'auto'  // Automatically detect file type
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            bufferStream.pipe(uploadStream);
        });

        return Response.json({
            name,
            ext,
            newName: result.public_id,
            url: result.secure_url,
            cloudinary_id: result.asset_id
        });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to upload file' });
    }
}
