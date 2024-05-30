import express from'express';
import { loginPage, loginProcess } from'../controllers/login.controller.js';

const router = express.Router();

// Route for displaying the login page
router.get('/', loginPage);
router.post('/post_login', loginProcess);


export default router