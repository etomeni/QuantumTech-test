import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const uploadToCloudinary = async (base64: string) => {
    try {
        const uploaded = await cloudinary.uploader.upload(base64, {
            folder: 'job-test', // optional
            resource_type: 'image',
            allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        });
        // console.log(uploaded);
        
        return uploaded.secure_url;
    } catch (error) {
        throw new Error('Image upload failed');
    }
};

export const deleteImageFileFromCloudinary = async (url: string) => {
    try {
        // Remove query parameters (everything after '?')
        const cleanUrl = url.split('?')[0];

        // Extract the part after '/upload/' or '/upload/v1/' if version is included
        const uploadIndex = cleanUrl.indexOf('/upload/');
        if (uploadIndex === -1) {
            return false;
            // throw new Error('Invalid Cloudinary URL: Missing /upload/ path');
        }

        // Get everything after '/upload/'
        let publicPath = cleanUrl.substring(uploadIndex + 8); // 8 is length of '/upload/'

        // Remove transformation strings like f_auto,q_auto/
        // They are comma-separated and end at the next slash
        if (publicPath.includes('/')) {
            const parts = publicPath.split('/');
            // Check if first part contains transformations (e.g., f_auto,q_auto)
            if (parts[0].includes(',')) {
                parts.shift(); // Remove the transformations
                publicPath = parts.join('/');
            }
        }

        // Remove versioning (e.g., v1/)
        publicPath = publicPath.replace(/^v\d+\//, '');

        // Remove file extension if present (e.g., .jpg, .webp, etc.)
        const lastSegment = publicPath.split('/').pop();
        const filenameWithoutExt = lastSegment?.split('.')[0] || '';

        // Reconstruct public ID
        const pathSegments = publicPath.split('/');
        pathSegments[pathSegments.length - 1] = filenameWithoutExt;
        const publicId = pathSegments.join('/');


        // Delete the file using the public ID
        const result = await cloudinary.uploader.destroy(publicId, {
            invalidate: true, // optional, invalidates cached CDN copies
        });

        return result.result === 'ok';
        // return publicId;
    } catch (err) {
        return false;
        // throw new Error('Failed to extract public ID from URL');
    }
};


