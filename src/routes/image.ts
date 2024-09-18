import { Router } from 'express';
import { upload } from '../services/s3';
import { postUpload } from '../controllers/image';

const router = Router();

router.post('/upload', upload, postUpload);

export default router;