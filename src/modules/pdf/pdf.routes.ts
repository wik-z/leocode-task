import express, { Router, } from 'express';
import authMiddleware from '../../middlewares/auth.middleware';
import * as controller from './pdf.controller';

const router : Router = express.Router();

router.post('/encrypt', [authMiddleware, controller.encrypt]);

export default router;