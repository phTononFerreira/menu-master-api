import { cloudinary, uploadOptions } from '../config/cloudinary.config.js';
import ServiceError from './serviceError.util.js';

export async function uploadImage(file) {
    try {
        const b64 = Buffer.from(file.buffer).toString("base64");
        let dataURI = "data:" + file.mimetype + ";base64," + b64;


        const result = await cloudinary.uploader.upload(dataURI, uploadOptions);

        return result.secure_url;
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        throw new ServiceError('Error uploading image to Cloudinary');
    }
}