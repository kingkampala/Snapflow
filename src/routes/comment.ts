import { Router } from 'express';
import { body } from 'express-validator';
import { postComment, getComment } from '../controllers/comment';

const router = Router();

router.post('/:imageId', [body('content').isLength({ min: 1 }).withMessage('content cannot be empty')], postComment);

router.get('/:imageId', getComment);

export default router;