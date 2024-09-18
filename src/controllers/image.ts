import { Request, Response } from 'express';
import { uploadImageToS3 } from '../services/s3';
import Image from '../models/image';
import { event } from '../services/event';

export const postUpload = async (req: Request, res: Response) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'no file uploaded' });
        }

        const imageUrl = await uploadImageToS3(file);

        const { description } = req.body;
        const newImage = await Image.create({ url: imageUrl, description });

        event.emit('imageUploaded', newImage)

        return res.status(201).json(newImage);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'server error', details: (error as Error).message });
    }
};