import express from 'express';
import { register, login, checkAuth, logout } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/check-auth', checkAuth);
router.post('/logout', logout);

export default router; 