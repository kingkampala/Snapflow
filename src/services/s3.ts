import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import multer from 'multer';
import { Request } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
    }
});

// Multer setup for file upload
const storage = multer.memoryStorage();
export const upload = multer({ storage }).single('image');

// Function to upload image to S3
export const uploadImageToS3 = async (file: Express.Multer.File): Promise<string> => {
    try {
        const params = {
            Bucket: process.env.AWS_S3_BUCKET as string,
            Key: `${Date.now()}-${file.originalname}`,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        const command = new PutObjectCommand(params);
        const response = await s3Client.send(command);
        
        const url = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
        return url;
    } catch (error) {
        console.error('s3 upload error:', error);
        throw new Error('failed to upload image to s3');
    }
};