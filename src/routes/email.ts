import { Router } from 'express';
import { postNotificationEmail, getNotificationEmail } from '../controllers/email';

const router = Router();

router.post('/', postNotificationEmail);

router.get('/:id', getNotificationEmail);

export default router;