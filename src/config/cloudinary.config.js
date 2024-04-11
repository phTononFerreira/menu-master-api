import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOptions = {
    resource_type: 'image',
    quality: 'auto:low', 
    fetch_format: 'auto', 
    folder: 'compressed_images',
    width: 800,
    height: 800,
    crop: 'fill'
};

export { cloudinary, uploadOptions };

