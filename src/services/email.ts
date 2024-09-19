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

event.on('imageProcessed', async (image, processedImageKey) => {
    try {
        const notifyEmails = await Email.findAll({ attributes: ['email'] });
        const notifyUsers = notifyEmails.map((emailRecord) => emailRecord.email);

        console.log('Emails to notify:', notifyUsers);

        const emailPromises = notifyUsers.map((email) => {
            return transporter.sendMail({
                from: `'Snapflow' <${process.env.EMAIL_USER}>`,
                to: email,
                subject: 'New Image Processed',
                text: `An image has been processed. View it here: ${process.env.AWS_S3_BUCKET_URL}/processed-${processedImageKey}`,
            });
        });

        await Promise.all(emailPromises);
        console.log('email notifications sent successfully');
    } catch (error) {
        console.error('error sending email:', error);
    }
});