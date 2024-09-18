import nodemailer from 'nodemailer';
import { event } from './event';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// Email notification listener
event.on('imageProcessed', async (image, processedImageKey) => {
    try {
        // List of users to notify (this could come from a database)
        const usersToNotify = ['user1@example.com', 'user2@example.com'];

        const emailPromises = usersToNotify.map((email) => {
            return transporter.sendMail({
                from: `'Snapflow' <${process.env.EMAIL_USER}>`,
                to: email,
                subject: 'New Image Processed',
                text: `An image has been processed. View it here: ${process.env.AWS_S3_BUCKET_URL}/processed-${processedImageKey}`,
            });
        });

        // Send all emails
        await Promise.all(emailPromises);
        console.log('email notifications sent successfully');
    } catch (error) {
        console.error('error sending email:', error);
    }
});