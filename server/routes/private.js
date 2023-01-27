import { getPrivateData } from '../controllers/private';
import { protect } from '../middleware/auth';
import express from 'express';
const router = express.Router();

router.route('/').get(protect, getPrivateData);

export { router };
