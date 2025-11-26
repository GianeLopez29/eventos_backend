import express from 'express';
import * as authController from '../controllers/authController.js';
import { validateRegister, validateLogin, handleValidationErrors } from '../middleware/validation.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', validateRegister, handleValidationErrors, authController.register);
router.post('/login', validateLogin, handleValidationErrors, authController.login);
router.get('/verify-email/:token', authController.verifyEmail);
router.get('/profile', authenticate, authController.getProfile);

export default router;