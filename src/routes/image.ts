import { Router } from 'express';
import { upload } from '../services/s3';
import { postUpload, getUpload } from '../controllers/image';

const router = Router();

router.post('/', upload, postUpload);

router.get('/', getUpload);

export default router;