import { getPrivateData } from '../controllers/private.js';
import { protect } from '../middleware/auth.js';
import express from 'express';
const router = express.Router();

router.route('/').get(protect, getPrivateData);

export default router;
