import { Request, Response } from 'express';
import Email from '../models/email';

export const postNotificationEmail = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'email is required' });
        }

        const newEmail = await Email.create({ email });

        return res.status(201).json(newEmail);
    } catch (error) {
        console.error('error adding email:', error);
        return res.status(500).json({ message: 'server error' });
    }
};

export const getNotificationEmail = async (req: Request, res: Response) => {
    try {
        const emails = await Email.findAll();

        if (emails.length === 0) {
            return res.status(200).json([]);
        }

        return res.status(200).json(emails);
    } catch (error) {
        console.error('error fetching notification emails:', error);
        return res.status(500).json({ message: 'server error' });
    }
};