import sharp from 'sharp';
import { event } from './event';
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { Readable } from 'stream';
import dotenv from 'dotenv';

dotenv.config();

const streamToBuffer = async (stream: Readable): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
        const chunks: Uint8Array[] = [];
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
        stream.on('error', reject);
    });
};

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
    }
});

event.on('imageUploaded', async (image) => {
    try {
        console.log('processing image:', image.url);

        const imageKey = image.url.split('/').pop();

        const getObjectParams = { Bucket: process.env.AWS_S3_BUCKET as string, Key: imageKey! };

        const command = new GetObjectCommand(getObjectParams);
        const { Body } = await s3Client.send(command);

        if (Body instanceof Readable) {
            // convert the S3 ReadableStream to a buffer
            const bodyBuffer = await streamToBuffer(Body);

            const processedImage = await sharp(bodyBuffer)
            .resize(300, 300)
            .toFormat('jpeg')
            .toBuffer();

            const processedImageKey = `processed-${imageKey}`;
            const uploadParams = {
                Bucket: process.env.AWS_S3_BUCKET as string,
                Key: imageKey,
                Body: processedImage,
                ContentType: 'image/jpeg'
            };

            const uploadCommand = new PutObjectCommand(uploadParams);
            await s3Client.send(uploadCommand);

            console.log(`image processed and uploadeed as ${processedImageKey}`);

            event.emit('imageProcessed', image, processedImageKey);
        } else {
            throw new Error('body is not a Readable stream');
        }
    } catch (error) {
        console.error('error processing image:', error);

        event.emit('imageProcessingFailed', error, image);
    }
});

event.on('imageProcessingFailed', async (error, image) => {
    console.error('failed to process image:', image.url);
});