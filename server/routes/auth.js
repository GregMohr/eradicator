import { signUp, signIn, forgotPassword, resetPassword } from '../controllers/auth.js';
import express from 'express';
const router = express.Router();

router.route('/signup').post(signUp);
router.route('/signin').post(signIn);
router.route('/forgotpassword').post(forgotPassword);
router.route('/resetpassword/:resetToken').put(resetPassword);

export default router;