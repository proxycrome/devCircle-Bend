import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

const Cloudinary = cloudinary.v2;

export const cloudinaryConfig = (req, res, next) => {
    Cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_IMAGE_API_KEY,
        api_secret: process.env.CLOUD_IMAGE_API_SECRET
    });
    next()
}

export const uploader = Cloudinary.uploader;

