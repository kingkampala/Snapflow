import nodemailer from 'nodemailer';
import { event } from './event';
import Email from '../models/email';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

event.on('imageProcessed', async (image, signedUrl) => {
    try {
        const notifyEmails = await Email.findAll({ attributes: ['email'] });
        const notifyUsers = notifyEmails.map((emailRecord) => emailRecord.email);

        console.log('emails to notify:', notifyUsers);

        const emailPromises = notifyUsers.map((email) => {
            return transporter.sendMail({
                from: `'Snapflow' <${process.env.EMAIL_USER}>`,
                to: email,
                subject: 'New Image Processed',
                text: `Hello,\n\n\nA new image has been processed. View it here: ${signedUrl}\n\nBest Regards,\nSnapflow Team`,
            });
        });

        await Promise.all(emailPromises);
        console.log('email notifications sent successfully');
    } catch (error) {
        console.error('error sending email:', error);
    }
});