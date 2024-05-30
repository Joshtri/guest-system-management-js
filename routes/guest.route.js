import express from 'express';
import { allGuestController, detailGuestController } from '../controllers/guest.controller.js';
import protect from '../config/auth/protect.js';
const router = express.Router();

router.get('/guests',protect, allGuestController);
router.get('/guests/:id',protect, detailGuestController);

export default router;
