import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Comment from '../models/comment';
import Image from '../models/image';

export const postComment = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { imageId } = req.params;
        const { content } = req.body;

        const image = await Image.findByPk(Number(imageId));
        if (!image) {
            return res.status(404).json({ message: 'image not found' });
        }

        const comment = await Comment.create({ content, imageId: image.id });

        return res.status(201).json(comment);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'server error' });
    }
};

export const getComment = async (req: Request, res: Response) => {
    try {
        const { imageId } = req.params;

        const image = await Image.findByPk(imageId);
        if (!image) {
            return res.status(404).json({ message: 'image not found' });
        }

        const comments = await Comment.findAll({ where: { imageId: image.id } });

        return res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'server error' });
    }
};