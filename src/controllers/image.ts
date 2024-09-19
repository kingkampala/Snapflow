import { Request, Response } from 'express';
import { uploadImageToS3 } from '../services/s3';
import Image from '../models/image';
import { event } from '../services/event';
import sequelize from '../db';

export const postUpload = async (req: Request, res: Response) => {
    const transaction = await sequelize.transaction();

    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'no file uploaded' });
        }

        const imageUrl = await uploadImageToS3(file);

        const { description } = req.body;
        const newImage = await Image.create({ url: imageUrl, description }, { transaction });

        event.emit('imageUploaded', newImage)

        await transaction.commit();

        return res.status(201).json(newImage);
    } catch (error) {
        await transaction.rollback();

        console.error('image uploading error:',error);
        return res.status(500).json({ message: 'server error', details: (error as Error).message });
    }
};

export const getUpload = async (req: Request, res: Response) => {
    try {
        const images = await Image.findAll();

        if (!images || images.length === 0) {
            return res.status(404).json({ message: 'no images found' });
        }

        return res.status(200).json(images);
    } catch (error) {
        console.error('error fetching images:', error);
        return res.status(500).json({ message: 'server error', details: (error as Error).message });
    }
};