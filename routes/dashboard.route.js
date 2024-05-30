import express from 'express';
import { dashboardController , logout } from '../controllers/dashboard.controller.js';
import protect from '../config/auth/protect.js';

const router = express.Router();

router.get('/dashboard', protect, dashboardController);
router.get('/logout',protect, logout); // Rute untuk logout


export default router;