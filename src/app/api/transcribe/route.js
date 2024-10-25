import cloudinary from 'cloudinary';
import axios from 'axios';

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ASSEMBLYAI_API_KEY = process.env.ASSEMBLYAI_API_KEY;
async function uploadToCloudinary(filename, filePath) {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(filePath, { resource_type: "video" }, (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url); // Secure URL for accessing the uploaded file
        });
    });
}

async function startTranscriptionJob(audioUrl) {
    const response = await axios.post(
        'https://api.assemblyai.com/v2/transcript',
        { audio_url: audioUrl },
        {
            headers: {
                authorization: ASSEMBLYAI_API_KEY,
                'content-type': 'application/json',
            },
        }
    );
    return response.data;
}

async function getTranscriptionStatus(transcriptionId) {
    const response = await axios.get(
        `https://api.assemblyai.com/v2/transcript/${transcriptionId}`,
        {
            headers: {
                authorization: ASSEMBLYAI_API_KEY,
            },
        }
    );
    return response.data;
}
